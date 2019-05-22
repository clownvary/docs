import React, { PureComponent } from 'react';
import { string, bool, func, object, oneOf, number, oneOfType, shape, arrayOf } from 'prop-types';
import uuidv4 from 'uuid/v4';
import classNames from 'classnames';
import debounce from 'lodash/debounce';
import isFuncion from 'lodash/isFunction';
import { filterValidCustomProps, DataAccess as da } from '../../utils';

/**
 * Default PropTypes of Dropdown.
 */
const DropdownPropTypes = {
  /**
   * Custom class name.
   */
  className: string,
  /**
   * Dropdown value.
   */
  value: oneOfType([string, number]),
  /**
   * Dropdown default value.
   */
  defaultValue: oneOfType([string, number]),
  /**
   * The max height of dropdown list.
   */
  maxHeight: string,
  /**
   * Dropdown place holder, and the default value is 'Select one...'.
   */
  placeholder: string,
  /**
   * Filter place holder, and the default value is 'Filter...'.
   */
  filterPlaceholder: string,
  /**
   * Display which icon inside of dropdown.
   */
  preIcon: string,
  /**
   * Dropdown size such as m, lg. And the default value is m.
   */
  size: oneOf(['m', 'lg']),
  /**
   * Dropdown theme such as flat, gradient and borderless. And the default value is flat.
   */
  theme: oneOf(['flat', 'gradient', 'borderless']),
  /**
   * Whether or not to show more buttons.
   */
  isMoreButton: bool,
  /**
   * Whether or not to change dropdown.
   */
  disabled: bool,
  /**
   * Whether or not to show filter.
   */
  filter: bool,
  /**
   * Whether or not to show highlight.
   */
  highlight: bool,
  /**
   * The data list of dropdown options.
   */
  data: arrayOf(shape({ text: string, value: oneOfType([string, number]) })),
  /**
   * Custom style object.
   */
  style: object, // eslint-disable-line
  /**
   * Fires when value change.
   */
  onChange: func,
  /**
   * Render footer
   */
  renderFooter: func
};

/** Default Props for Dropdown */
const DropdownProps = {
  placeholder: 'Select one...',
  filterPlaceholder: 'Filter...',
  size: 'm',
  theme: 'flat',
  filter: false,
  highlight: false,
  data: []
};

/** UI component that displays Dropdown with variant settings.*/
class Dropdown extends PureComponent {
  static displayName = 'AAUIDropdown'
  static defaultProps = DropdownProps;
  static propTypes = DropdownPropTypes;

  constructor(props) {
    super(props);

    const { data, value, defaultValue, highlight } = this.props;
    const val = value || defaultValue;
    const activeItemIndex = highlight ?
      this.getActiveIndex(data, val) : -1;

    this.uuid = uuidv4();
    this.state = {
      isExpanded: false,
      value: val,
      dataView: data,
      activeItemIndex
    };
  }

  componentWillMount = () => {
    this.keyboardValue = '';
    this.clearKeyboardValue = debounce(() => {
      this.keyboardValue = '';
    }, 600);
  }

  componentDidMount = () => {
    Object.defineProperties(this, {
      value: {
        get() {
          return this.state.value;
        },
        set(v) {
          if (this.props.value === undefined) {
            this.setState({ value: v });
          }
        }
      }
    });

    this.updateMaxHeight();
    this.updateFooterTop();
  }

  componentWillReceiveProps = (nextProps) => {
    const newState = {};
    if (nextProps.value !== this.props.value) {
      newState.value = nextProps.value;
    } else if (nextProps.defaultValue !== this.props.defaultValue) {
      newState.value = this.state.value === undefined
        ? nextProps.defaultValue
        : this.state.value;
    }
    if (nextProps.data !== this.props.data) {
      newState.dataView = nextProps.data;
    }
    if (Object.keys(newState).length > 0) {
      const value = newState.value || nextProps.value || nextProps.defaultValue;
      newState.activeItemIndex = nextProps.highlight ?
        this.getActiveIndex(nextProps.data, value) : -1;
      this.setState(newState);
    }
  }

  componentDidUpdate = () => {
    if (this.state.isExpanded) {
      if (this.props.filter) {
        this.filterInput.focus();
      } else {
        this.itemMenu.focus();
      }

      const itemMenu = this.listContainer;
      const activeItem = itemMenu.querySelector('.selected');
      if (activeItem) {
        const itemMenuHeight = itemMenu.offsetHeight;
        const itemMenuScrollTop = itemMenu.scrollTop;
        const activeItemTop = activeItem.offsetTop;
        const activeItemHeight = activeItem.offsetHeight;
        /* eslint no-mixed-operators: 0 */
        if (activeItemTop + activeItemHeight - itemMenuHeight - itemMenuScrollTop > 0) {
          itemMenu.scrollTop = activeItemTop + activeItemHeight - itemMenuHeight;
        } else if (activeItemTop < itemMenuScrollTop) {
          itemMenu.scrollTop = activeItemTop;
        }
      }

      this.updateMaxHeight();
      this.updateFooterTop();
    }
  }

  getActiveIndex = (data, val) => Array.findIndex(data, item => item.value === val)

  getIndex = (str) => {
    const dataArray = this.props.data.toJS ? this.props.data.toJS() : this.props.data;
    let index = 0;
    let value = '';
    const length = da.count(dataArray);
    let isFound = false;
    let keyWords = '';
    let i = 0;
    if (this.state.keyWords && str.toUpperCase().indexOf(this.state.keyWords) === 0) {
      i = this.state.activeItemIndex + 1;
    }

    for (; i < length; i += 1) {
      value = da.get(dataArray[i], 'text');
      if (value.toUpperCase().indexOf(str) === 0) {
        index = i;
        isFound = true;
        keyWords = str;
        break;
      }
    }

    if (this.state.keyWords && str.toUpperCase().indexOf(this.state.keyWords) === 0) {
      if (!isFound) {
        for (i = 0; i < length; i += 1) {
          value = da.get(dataArray[i], 'text');
          if (value.toUpperCase().indexOf(str) === 0) {
            index = i;
            isFound = true;
            keyWords = str;
            break;
          }
        }
      }
    }

    return { index, isFound, keyWords };
  }

  updateMaxHeight = () => {
    const { renderFooter, maxHeight } = this.props;
    if (maxHeight && isFuncion(renderFooter)) {
      this.listContainer.style.maxHeight = `${maxHeight - this.footer.offsetHeight}px`;
    }
  }

  updateFooterTop = () => {
    const { renderFooter } = this.props;
    if (isFuncion(renderFooter)) {
      this.footer.style.top = `${this.listContainer.offsetTop + this.listContainer.offsetHeight}px`;
    }
  }

  tryCollapse = () => {
    if (this.state.isExpanded) {
      const { dataView, value } = this.state;
      this._timer = setTimeout(() => {
        this.setState({
          isExpanded: false,
          activeItemIndex: this.getActiveIndex(dataView, value)
        });
      }, 100);
    }
  }

  cancelCollapseTimeout = () => {
    clearTimeout(this._timer);
  }

  giveFocus = (e) => {
    if (e.target === this.itemMenu) {
      this.itemMenu.focus();
    }
  }

  navigateByKeys = (e) => {
    if (e.keyCode === 9) {
      return;
    } //  focus next component if there are many input, dropdown
    // or others component on the screen when pressing tab.
    let isExpanded = false;
    e.preventDefault();
    /* eslint no-case-declarations: 0 */
    switch (e.keyCode) {
      case 38: // up (Previous item)
        const { activeItemIndex: prevIndex, dataView: prevData } = this.state;
        this.state.isExpanded ? this.setState({
          activeItemIndex: this.getPrevActiveIndex(prevIndex - 1, prevData),
          isExpanded: true
        }) : this.setState({ isExpanded: true });
        break;
      case 40: // down (Next item)
        const { activeItemIndex: nextIndex, dataView: nextData } = this.state;
        this.state.isExpanded ? this.setState({
          activeItemIndex: this.getNextActiveIndex(nextIndex + 1, nextData),
          isExpanded: true
        }) : this.setState({ isExpanded: true });
        break;
      case 13: // enter (Select the active item)
        isExpanded = this.state.isExpanded;
        if (isExpanded) {
          const { dataView, activeItemIndex } = this.state;
          let value = da.get(dataView, activeItemIndex);
          const disabled = da.get(value, 'disabled');
          if (!disabled) {
            value = da.get(value, 'value');
            this.select(value, true);
            this.dropdownButton.focus();
          }
        } else { /* eslint no-else-return: 0 */
          this.setState({
            isExpanded: true,
            activeItemIndex: this.state.activeItemIndex
          });
        }
        break;
      case 27: // escape (Hide dropdown menu)
        this.setState({
          isExpanded: false,
          activeItemIndex: this.state.activeItemIndex
        });
        this.dropdownButton.focus();
        break;
      case 32: // blank (Show dropdown menu)
        isExpanded = this.state.isExpanded;
        if (isExpanded) {
          return; /* eslint no-useless-return: 0 */
        } else { /* eslint no-else-return: 0 */
          this.setState({
            isExpanded: true,
            activeItemIndex: this.state.activeItemIndex
          });
        }
        break;
      default: // Filter dropdown list by the key word
        if (!this.props.filter) {
          const charStr = String.fromCharCode(e.keyCode);
          this.keyboardValue = this.keyboardValue + charStr;
          this.filterFromKeyboard();
        }
    }
  }


  getNextActiveIndex = (activeIndex, data) => {
    const dataCount = da.count(data);
    return activeIndex < dataCount ? activeIndex : this.getNextActiveIndex(0, data);
  }

  getPrevActiveIndex = (activeIndex, data) => {
    const dataCount = da.count(data);
    return activeIndex >= 0 ? activeIndex : this.getPrevActiveIndex(dataCount - 1, data);
  }

  applyFilter = (e) => {
    this.setState({
      dataView: this.filterData(e.target.value, this.props.data)
    });
  }

  handleKeys = (e) => {
    // Delegate up, down, and escape to itemMenu.
    if ([38, 40, 27].indexOf(e.keyCode) > -1) return;
    // Delegate enter to itemMenu if up/down selections are already made.
    if (e.keyCode === 13 && this.state.activeItemIndex > -1) return;
    e.stopPropagation();
  }

  select = (value) => {
    const val = value;
    const { highlight } = this.props;
    const activeItemIndex = highlight ?
      this.getActiveIndex(this.state.dataView, val) : -1;

    this.setState({
      value: val,
      isExpanded: false,
      activeItemIndex
    }, () => {
      if (this.props.onChange) this.props.onChange({ value });
    });
  }

  findItemByValue = (value) => {
    /* eslint no-restricted-syntax: 0 */
    for (const item of this.props.data) {
      if (da.get(item, 'value') === value) {
        return item;
      }
    }
    return undefined;
  }

  findTextByValue = (value) => {
    const item = this.findItemByValue(value);
    if (item) {
      return da.get(item, 'text');
    } else {
      return undefined;
    }
  }

  filterData = (key, dataset) => {
    const k = key.trim().toLowerCase();
    const klen = k.length;

    function matcher(item) {
      const t = da.get(item, 'text').trim().toLowerCase();
      let i = 0;
      let kc = k.charAt(i);
      for (const tc of t) {
        if (tc === kc) {
          i += 1;
          if (i >= klen) {
            return true;
          }
          kc = k.charAt(i);
        }
      }
      return false;
    }

    return (!k ? dataset : dataset.filter(matcher));
  }

  clearKeyboard = (e) => {
    e.persist();
    this.clearKeyboardValue(e);
  }

  filterFromKeyboard = () => {
    const result = this.getIndex(this.keyboardValue);
    if (result.isFound) {
      this.setState({
        activeItemIndex: result.index,
        keyWords: result.keyWords
      });
    }
  }

  toggleMenu = () => {
    clearTimeout(this._timer);

    this.setState({
      isExpanded: !this.state.isExpanded
    });
  }

  handleInputOnclick = value => () => {
    this.select(value);
  }

  render = () => {
    const {
      className, maxHeight, placeholder, filterPlaceholder, size, theme, preIcon,
      disabled, filter, isMoreButton, renderFooter, renderItem,
      style,
      ...rest
    } = this.props;
    const { isExpanded, value, dataView, activeItemIndex } = this.state;
    const hasFooter = isFuncion(renderFooter);
    const validProps = filterValidCustomProps(rest);
    const classes = classNames({
      dropdown: true,
      'dropdown--with-footer': hasFooter,
      'dropdown--with-search': filter,
      [`dropdown--${theme}`]: theme,
      [`dropdown--${size}`]: size
    }, className);
    const buttonClasses = classNames({
      dropdown__button: true,
      show: isMoreButton && isExpanded,
      expand: !isMoreButton && isExpanded,
      collapse: !isMoreButton && !isExpanded,
      input__field: true,
      disabled
    });
    const listClasses = classNames({
      dropdown__menu: true,
      show: isExpanded && !disabled,
      'has-footer': hasFooter
    });
    const itemMenuStyle = hasFooter ? undefined : { maxHeight };

    return (
      <div
        className={classes}
        style={style}
        ref={(ref) => { this.itemMenu = ref; }}
        tabIndex={0}
        role="listbox"
        aria-activedescendant={`${this.uuid}_${activeItemIndex}`}
        onBlur={this.tryCollapse}
        onKeyUp={disabled ? undefined : this.clearKeyboard}
        onKeyDown={disabled ? undefined : this.navigateByKeys}
        onMouseDown={this.giveFocus}
        onFocus={this.cancelCollapseTimeout}
      >
        <button
          type="button"
          ref={(ref) => { this.dropdownButton = ref; }}
          role="combobox"
          {...validProps}
          aria-expanded={isExpanded && !disabled}
          aria-haspopup="listbox"// eslint-disable-line
          aria-label={this.findTextByValue(value) || placeholder}
          className={buttonClasses}
          onMouseDown={e => e.preventDefault()}
          onClick={disabled ? undefined : this.toggleMenu}
        >
          {preIcon && <i className={`dropdown__prefix-icon ${preIcon}`} />}
          <span
            className="dropdown__button-text"
            role="textbox"
          >
            {this.findTextByValue(value) || placeholder}
          </span>
          {isMoreButton ?
            <span className={'icon icon-caret-down'} /> :
            <span className={`${isExpanded ? 'icon icon-chevron-up' : 'icon icon-chevron-down'}`} />
          }
        </button>
        <div>
          <ul
            className={listClasses}
            ref={(ref) => { this.listContainer = ref; }}
            style={itemMenuStyle}
          >
            {filter
              ? (
                <li>
                  <div className="dropdown__menu__search-box">
                    <i className="icon icon-search" />
                    <input
                      type="text"
                      className="input"
                      ref={(ref) => { this.filterInput = ref; }}
                      role="textbox"
                      aria-label="Search"
                      autoComplete="off"
                      placeholder={filterPlaceholder}
                      onKeyDown={this.handleKeys}
                      onChange={this.applyFilter}
                    />
                  </div>
                </li>
              )
              : undefined}
            {filter
              ? (
                <li className="dropdown__menu-divider" role="separator" />
              )
              : undefined}
            {dataView.map((item, i) => {
              const content = !isFuncion(renderItem)
                ? <a>{da.get(item, 'text')}</a>
                : renderItem(item, {
                  selected: i === activeItemIndex,
                  disabled: da.get(item, 'disabled')
                });

              return (
                <li
                  id={`${this.uuid}_${i}`}
                  key={da.get(item, 'value')}
                  role="option"
                  aria-selected={i === activeItemIndex ? true : undefined}
                  onClick={!da.get(item, 'disabled') && this.handleInputOnclick(da.get(item, 'value'))}
                  className={classNames({
                    selected: i === activeItemIndex,
                    disabled: da.get(item, 'disabled')
                  })}
                  aria-disabled={da.get(item, 'disabled')}
                >
                  {content}
                </li>
              );
            },
            )}
          </ul>
          {
            hasFooter &&
            <div
              className={classNames('dropdown__footer', { show: isExpanded && !disabled })}
              ref={(ref) => { this.footer = ref; }}
            >
              {renderFooter({ toggleMenu: this.toggleMenu })}
            </div>
          }
        </div>
      </div>
    );
  }
}


export default Dropdown;
