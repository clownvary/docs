import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import ReactDOM from 'react-dom';
import xor from 'lodash/xor';
import isFunction from 'lodash/isFunction';
import SelectChoice from './SelectChoice';
import SelectOptionMenu from './SelectOptionMenu';
import Portal from './../Portal';
import { addClass, removeClass } from '../../utils/dom';
import { DefaultCSSPrefix, KeyCode } from '../../consts';

const SelectPropTypes = {
  /**
   * aria label (for assistive tech)
   */
  'aria-label': PropTypes.string,
  /**
   * HTML ID of an element that should be used as the label (for assistive tech)
   */
  'aria-labelledby': PropTypes.string,
  prefixCls: PropTypes.string,
  /**
   * select option object array to render as option item list by default
   */
  optionData: PropTypes.array,
  /**
   * option value array to determine which were selected
   */
  choiceValues: PropTypes.array,
  /**
   * placeholder of search input
   */
  placeholder: PropTypes.string,
  /**
   * function returns the parent of rendering menu, default is document.body
   */
  getMenuContainer: PropTypes.func,
  /**
   * clean filter character after select or deselect an option and reset option item list
   */
  resetFilterAfterSelect: PropTypes.bool,
  /**
   * Enables users to create new options along with choosing existing options.
   */
  creatable: PropTypes.bool,
  /**
   * set filter input value, Only applies when creatable is set to true .
   */
  inputValue: PropTypes.string,
  /**
   * function to customize rendering a single option item
   */
  optionItemRenderer: PropTypes.func,
  /**
   * function to customize rendering the footer section below all option item
   */
  optionFooterRenderer: PropTypes.func,
  /**
   * function to customize rendering the menu of option
   */
  optionMenuRenderer: PropTypes.func,
  /**
   * function to customize the filter logic by inputted search characters
   */
  optionFilterFn: PropTypes.func,
  /**
   * onSelect callback function triggered by user select/deselect an option
   */
  onSelect: PropTypes.func,
  /**
   * onChange callback function triggered by user change selection
   */
  onChange: PropTypes.func,
  /**
   * onClick callback function triggered by user click on an option
   */
  onOptionItemClick: PropTypes.func,
  /**
   * function to customize menu width
   */
  menuWidth: PropTypes.string,
  /**
   * The enable/disable state
   */
  disabled: PropTypes.bool,
  /**
   * Determines the maximum length of the input value.
   */
  inputMaxLength: PropTypes.number,
  /**
   * Handler to be called when the input loses focus.
   */
  onInputBlur: PropTypes.func,
  /**
   * Handler to be called when the input get focus.
   */
  onInputFocus: PropTypes.func,
  /**
   * Handler to be called before onChange triggered
   * and return a value as real new input value.
   */
  setInputValue: PropTypes.func
};

const SelectDefaultProps = {
  prefixCls: `${DefaultCSSPrefix}-select`,
  creatable: false,
  placeholder: '',
  getMenuContainer: () => window.document.body,
  optionMenuRenderer: menu => menu,
  optionFilterFn: (options, value = '') => options.filter(({ text }) => text.toLowerCase()
    .indexOf(value.toLowerCase()) > -1),
  resetFilterAfterSelect: true
};

class Select extends React.Component {
  static propTypes = SelectPropTypes;
  static defaultProps = SelectDefaultProps;

  constructor(props) {
    super(props);

    const { choiceValues, inputValue = '' } = this.props;

    this.state = {
      choiceValues: choiceValues || [],
      open: false,
      inputValue
    };

    this._focused = false;
    this._lastInputValue = '';
  }

  componentWillReceiveProps(nextProps) {
    const { choiceValues, inputValue } = nextProps;
    const { creatable } = this.props;

    if (creatable && inputValue !== this.state.inputValue) {
      this.setInputValue(inputValue);
    }

    if (xor(choiceValues, this.props.choiceValues).length > 0) {
      this.setState({ choiceValues });
    }
  }

  componentDidUpdate() {
    if (this._inputRef && this._inputRef.value && this._inputMirrorRef) {
      this._inputRef.style.width = '';
      this._inputRef.style.width = `${this._inputMirrorRef.clientWidth + 10}px`;
    } else if (this._inputRef) {
      this._inputRef.style.width = '';
    }
    const { inputValue } = this.state;
    this._lastInputValue = inputValue;
  }

  onPlaceholderClick = () => {
    this.focus(true);
  };

  onOptionItemSelect = (e, value, selectedValues) => {
    clearTimeout(this._blurTimer);
    this._blurTimer = null;

    const { resetFilterAfterSelect, onSelect, creatable, onChange } = this.props;
    onSelect && onSelect(value);

    if (!creatable) {
      this.setChoiceValues(selectedValues, () => {
        this.focus(true);
      });
    } else {
      this.setInputValue(selectedValues[0], true);
      this.setOpenState(false);
      return;
    }

    onChange && onChange(selectedValues);
    resetFilterAfterSelect && this.setInputValue('');
  };

  onOptionItemDeselect = this.onOptionItemSelect;

  onOptionItemClick = (e, itemInfo) => {
    e.stopPropagation();
    const { onOptionItemClick } = this.props;
    onOptionItemClick && onOptionItemClick(e, itemInfo);
  };

  onChoiceRemove = (removedValue) => {
    const { onChange } = this.props;
    const { choiceValues } = this.state;
    const nextChoiceValues = choiceValues.filter(value => value !== removedValue);
    this.setChoiceValues(nextChoiceValues, () => {
      clearTimeout(this._blurTimer);
      this._blurTimer = null;
      this.focus(true);
    });
    onChange && onChange(nextChoiceValues);
  };

  onInputChange = (e) => {
    const newInputValue = e.target.value;
    this.setInputValue(newInputValue);
    this.setOpenState(true);
  };

  onInputKeyDown = (e) => {
    const keyCode = e.keyCode;
    const { onChange } = this.props;
    const { open, choiceValues } = this.state;
    if (!e.target.value && keyCode === KeyCode.BACKSPACE) {
      e.preventDefault();
      if (choiceValues.length) {
        choiceValues.splice(-1, 1);
        const nextChoiceValues = choiceValues.slice(0);
        this.setChoiceValues(nextChoiceValues);
        onChange && onChange(nextChoiceValues);
        return;
      }
    }
    if (keyCode === KeyCode.DOWN) {
      if (!open) {
        this.setOpenState(true);
        e.preventDefault();
        e.stopPropagation();
      }
    } else if (keyCode === KeyCode.ENTER) {
      e.preventDefault();
    } else if (keyCode === KeyCode.ESCAPE) {
      if (open) {
        this.setOpenState(false);
        e.preventDefault();
        e.stopPropagation();
      }
    }
    if (open && this._selectionMenuRef) {
      if (this._selectionMenuRef.onKeyDown(e)) {
        e.preventDefault();
        e.stopPropagation();
      }
    }
  };

  onSelectionRendererClick = () => {
    clearTimeout(this._blurTimer);
    this._blurTimer = null;

    const { open } = this.state;
    const { disabled } = this.props;
    const nextOpen = !open;

    if (!disabled) {
      if (nextOpen && !this._focused) {
        this.onInputFocus();
      }
      this.setOpenState(nextOpen);
    }
  };

  onInputBlur = () => {
    if (this._focused) {
      const selectionMenuDom = ReactDOM.findDOMNode(this._selectionMenuRef);// eslint-disable-line
      if (selectionMenuDom && selectionMenuDom.contains(document.activeElement)) {
        this._inputRef.focus();
        this._focused = true;
        return;
      }
      this._blurTimer = window.setTimeout(() => {
        this._focused = false;
        this.setOpenState(false);
        this.updateFocusClassName();
        const { onInputBlur, creatable } = this.props;
        (creatable && isFunction(onInputBlur)) &&
          onInputBlur(this.state.selectedVal, this.state.inputValue);
      }, 200);
    }
  };

  setInputValue = (nextInputValue, isItemSelected) => {
    const { inputValue } = this.state;
    const { onChange, creatable, setInputValue } = this.props;
    const newInputValue = (isItemSelected && isFunction(setInputValue))
      ? setInputValue(nextInputValue) : nextInputValue;
    const selectedVal = isItemSelected ? nextInputValue : null;
    if (nextInputValue !== inputValue) {
      this.setState({
        inputValue: newInputValue,
        selectedVal
      }, () => {
        creatable && onChange && onChange(nextInputValue);
      });
    }
  };

  setOpenState = (nextOpen) => {
    const { open } = this.state;
    const { creatable } = this.props;

    if (nextOpen === open) {
      this.focus(nextOpen);
      return;
    }

    const nextState = { open: nextOpen };
    if (!nextOpen && !creatable) {
      this.setInputValue('');
    }
    this.setState(nextState, () => {
      nextOpen && this.focus(nextOpen);
    });
  };

  setChoiceValues = (nextChoiceValues, callback) => {
    if ('choiceValues' in this.props) {
      return callback && callback();
    }
    return this.setState({
      choiceValues: nextChoiceValues
    }, callback);
  };

  getPlaceholderHiddenState = () => {
    const { choiceValues, inputValue } = this.state;
    return choiceValues.length || inputValue;
  };

  getPortalContainer = () => {
    const { getMenuContainer } = this.props;
    const parent = getMenuContainer();
    const portalContainer = document.createElement('div');
    portalContainer.style.position = 'absolute';
    portalContainer.style.top = '0';
    portalContainer.style.left = '0';
    portalContainer.style.width = '100%';
    parent && parent.appendChild(portalContainer);
    return portalContainer;
  };

  updateFocusClassName = () => {
    const { prefixCls } = this.props;
    const focusClass = `${prefixCls}-renderer__focused`;
    if (this._focused) {
      addClass(this._selectionRendererRef, focusClass);
    } else {
      removeClass(this._selectionRendererRef, focusClass);
    }
  };

  onInputFocus = () => {
    const { creatable, onInputFocus } = this.props;
    this._focused = true;
    this.updateFocusClassName();
    creatable && isFunction(onInputFocus) && onInputFocus();
  };

  filterOption = () => {
    const { inputValue } = this.state;
    const { optionData, optionFilterFn } = this.props;
    return optionFilterFn(optionData, inputValue);
  };


  saveContainerRef = (node) => {
    this._containerRef = node;
  };

  saveSelectionRendererRef = (node) => {
    this._selectionRendererRef = node;
  };

  saveSelectionMenuRef = (node) => {
    this._selectionMenuRef = node;
  };

  saveInputRef = (node) => {
    this._inputRef = node;
  };

  saveInputMirrorRef = (node) => {
    this._inputMirrorRef = node;
  };

  focus = (open) => {
    if (open) {
      const { activeElement } = document;
      if (this._inputRef && this._inputRef !== activeElement) {
        this._inputRef.focus();
        this._focused = true;
      }
    }
  };

  calculateOptionMenuPosition = () => {
    const { getMenuContainer } = this.props;
    const containerRect = this._containerRef.getBoundingClientRect();
    const scroller = getMenuContainer();
    const scrollerRect = scroller.getBoundingClientRect();
    const top = (containerRect.top + containerRect.height + scroller.scrollTop) - scrollerRect.top;
    const left = (containerRect.left + scroller.scrollLeft) - scrollerRect.left;
    return {
      top: `${top}px`,
      left: `${left}px`
    };
  };

  renderPlaceholder = () => {
    const { prefixCls, placeholder } = this.props;
    const hidden = this.getPlaceholderHiddenState();
    return !hidden && (
      <div
        className={`${prefixCls}-placeholder`}
        onClick={this.onPlaceholderClick}
      >
        {placeholder}
      </div>
    );
  };

  renderChoices = () => {
    const { prefixCls, optionData } = this.props;
    const { choiceValues } = this.state;
    const availableChoiceValues = choiceValues.filter(value =>
      optionData.filter(option => option.value === value).length);
    const choiceOptions = availableChoiceValues.map(value =>
      optionData.filter(option => option.value === value)[0]);
    return choiceOptions.map((choice, index) => (
      <SelectChoice
        key={`choice-${choice.value}`}
        prefixCls={prefixCls}
        last={index + 1 === choiceOptions.length}
        {...choice}
        onChoiceRemove={this.onChoiceRemove}
      />
    ));
  };

  renderFilterInput = () => {
    const { prefixCls, disabled, inputMaxLength } = this.props;
    const { inputValue } = this.state;
    const filterInputPrefixCls = `${prefixCls}-search`;
    const ariaAttributes = {
      'aria-autocomplete': 'list',
      'aria-label': this.props['aria-label'],
      'aria-labelledby': this.props['aria-labelledby']
    };

    return (
      <li className={`${filterInputPrefixCls}`}>
        <div className={`${filterInputPrefixCls}__container`}>
          <input
            ref={this.saveInputRef}
            value={inputValue}
            type="text"
            className={`${filterInputPrefixCls}__field`}
            autoComplete={false}
            onChange={this.onInputChange}
            onKeyDown={disabled ? undefined : this.onInputKeyDown}
            onFocus={this.onInputFocus}
            onBlur={this.onInputBlur}
            disabled={disabled}
            {...ariaAttributes}
            maxLength={inputMaxLength}
          />
          <span
            className={`${filterInputPrefixCls}__field-mirror`}
            ref={this.saveInputMirrorRef}
          >
            {inputValue}&nbsp;
          </span>
        </div>
      </li>
    );
  };

  renderSelection = () => {
    const { prefixCls } = this.props;
    const choiceNodes = this.renderChoices();
    const inputNode = this.renderFilterInput();
    return (
      <div className={`${prefixCls}-selection`}>
        <ul>
          {choiceNodes}
          {inputNode}
        </ul>
      </div>
    );
  };

  renderOptionMenu = () => {
    const {
      prefixCls,
      menuWidth,
      optionItemRenderer,
      optionFooterRenderer,
      optionMenuRenderer
    } = this.props;
    const { choiceValues, open, inputValue } = this.state;
    const filteredOptionData = this.filterOption();
    /* istanbul ignore next */
    const popupMenuWidth = this._containerRef && !menuWidth ?
      this._containerRef.offsetWidth : menuWidth;
    const menuProps = {
      prefixCls,
      hidden: !open,
      optionData: filteredOptionData,
      selectedValues: choiceValues,
      optionItemRenderer,
      optionFooterRenderer,
      ref: this.saveSelectionMenuRef,
      onOptionItemSelect: this.onOptionItemSelect,
      onOptionItemDeselect: this.onOptionItemDeselect,
      onOptionItemClick: this.onOptionItemClick,
      calculateOptionMenuPosition: this.calculateOptionMenuPosition
    };
    if (inputValue !== this._lastInputValue && filteredOptionData.length) {
      menuProps.activeValue = filteredOptionData[0].value;
    }
    menuProps.style = { width: popupMenuWidth };

    const menuNode = (
      <SelectOptionMenu
        {...menuProps}
      />
    );

    if (optionMenuRenderer) {
      return optionMenuRenderer(menuNode, menuProps);
    }
    return null;
  };

  renderOptionMenusByPortal = () => {
    const { open } = this.state;
    if (open) {
      return (
        <Portal getContainer={this.getPortalContainer}>
          {this.renderOptionMenu()}
        </Portal>);
    }
    return null;
  };

  render() {
    const { prefixCls, className, creatable, disabled } = this.props;
    const placeholderNode = this.renderPlaceholder();
    const selectionNode = this.renderSelection();
    const optionListNode = this.renderOptionMenusByPortal();
    return (
      <div
        className={
          classNames(prefixCls, className, {
            [`${prefixCls}--creatable`]: creatable
          })
        }
        ref={this.saveContainerRef}
        onClick={this.onSelectionRendererClick}
      >
        <div
          className={classNames(`${prefixCls}-renderer`, {
            [`${prefixCls}-renderer__focused`]: this._focused,
            [`${prefixCls}-renderer__empty`]: !this.getPlaceholderHiddenState(),
            'is-disabled': disabled
          })}
          ref={this.saveSelectionRendererRef}
        >
          {selectionNode}
          {placeholderNode}
        </div>
        {optionListNode}
      </div>
    );
  }
}

export default Select;
