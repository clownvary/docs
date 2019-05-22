import React from 'react';
import { OrderedMap } from 'immutable';
import { string, bool, func, object, oneOf, number, oneOfType, shape, arrayOf, array } from 'prop-types';
import find from 'lodash/find';
import debounce from 'lodash/debounce';
import throttle from 'lodash/throttle';
import isFunction from 'lodash/isFunction';
import difference from 'lodash/difference';
import uniqueId from 'lodash/uniqueId';
import Checkbox from '../Checkbox';
import LoadingBar from '../LoadingBar';
import { KeyCode } from '../../consts';
import { cls, filterBy, DataAccess as da, decodeHtmlStr } from '../../utils';


import Item from './Item';

/**
 * Default PropTypes of Dropdown.
 */
const DropdownPropTypes = {
  /**
   * Custom class name.
   */
  className: string,
  /**
   * Custom style object.
   */
  style: object, // eslint-disable-line
  /**
   * Whether or not to change dropdown.
   */
  disabled: bool,
  /**
   * Dropdown place holder, and the default value is 'Select one...'.
   */
  placeholder: string,
  /**
   * The max height of dropdown list.
   */
  maxHeight: shape({ maxHeight: string }),
  /**
   * Whether or not to show filter.
   */
  filter: bool,
  /**
   * Filter place holder, and the default value is 'Filter...'.
   */
  filterPlaceholder: string,
  /**
   * Whether or not to show filter.
   */
  serverFilter: bool,
  /**
   * Whether or not to show data list when init.
   */
  autoOpen: bool,
  /**
   * Dropdown theme such as flat, gradient and borderless. And the default value is flat.
   */
  theme: oneOf(['flat', 'gradient', 'borderless']),
  /**
   * Whether or not to show error style.
   */
  errored: bool,
  /**
   * Whether or not to display checkbox of each option.
   */
  showCheckbox: bool,
  /**
   * Whether or not to dispaly check all option.
   */
  showAllCheckbox: bool,
  /**
   * Whether or not to show text tip when hovering the option.
   */
  showTextTip: bool,
  /**
   * Whether or not to show spiner when loading data.
   */
  showSpiner: bool,
  /**
   * Error message.
   */
  errorInfo: string,
  /**
   * Whether or not to show the count of data list.
   */
  showResults: bool,
  /**
   * Customize how to render Count of data list.
   */
  results: func,
  /**
   * Whether or not to show error message.
   */
  showError: bool,
  /**
   * Error infomation template.
   */
  errorInfoTemplate: string,
  /**
   * Whether or not to onlyt show text as default place holder.
   */
  onlyDefaultPlaceholder: bool,
  /**
   * The prefix of text.
   */
  prefix: string,
  /**
   * Dropdown value.
   */
  value: oneOfType([string, number, object, array]),
  /**
   * Dropdown default value.
   */
  defaultValue: oneOfType([string, number, object]),
  /**
   * Display which icon inside of dropdown.
   */
  data: arrayOf(shape({ text: string, value: oneOfType([string, number, object]) })),
  /**
   * Fires when value change.
   */
  onChange: func,
  /**
   * Whether or not to get data with fuzzy query.
   */
  fuzzyQuery: bool,
  /**
   * Whether or not to show checked items text just checked one item.
   */
  showTxtOnlyCheckedOneItem: bool,
  /**
   * Whether or not to show the menu list of Dropdown.
   */
  visible: bool,
  /**
   * Whether or not to show the icon of deselectting all items .
   */
  showDeselectall: bool,
  /**
   * The suffix text of button.
   */
  txtSuffix: string,
  /**
   * The text when length of data list is 0.
   */
  noResult: string,
  /**
   * Customize aria-label.
  */
  ariaLabel: string,
  /**
   * Add extral text to the end of aria-lable.
   */
  ariaLabelExtraEndText: string,
  /**
   * Customize aria-labelledby.
  */
  ariaLabelledbyProvider: func
};

/** Default Props for Dropdown */
const DropdownProps = {
  placeholder: 'Select one...',
  txtSuffix: 'selected',
  filterPlaceholder: 'Filter...',
  showDeselectall: false,
  showAll: true,
  noResult: 'No results found.',
  fuzzyQuery: false,
  autoOpen: false,
  showTxtOnlyCheckedOneItem: true,
  visible: true,
  theme: 'flat',
  data: []
};


/** UI component that displays Dropdown with variant settings.*/
class Dropdown extends React.PureComponent {
  static displayName = 'Dropdown'
  static defaultProps = DropdownProps;
  static propTypes = DropdownPropTypes;

  constructor(props) {
    super(props);

    const rowState = {};
    if (this.props.showCheckbox) {
      this.checkboxArray = OrderedMap({});

      this.state = {
        isExpanded: false,
        value: this.props.value || this.props.defaultValue || [],
        initValue: this.props.value || this.props.defaultValue || [],
        dataView: this.props.data,
        activeItemIndex: -1,
        rowState,
        showSpiner: this.props.showSpiner || false,
        errorInfo: this.props.errorInfo,
        checkAll: false,
        showClearFilterIcon: false,
        keyWords: '',
        serverFilterLoading: false
      };
    } else {
      this.state = {
        isExpanded: false,
        value: this.props.value || this.props.defaultValue,
        dataView: this.props.data,
        activeItemIndex: -1,
        showClearFilterIcon: false,
        keyWords: '',
        serverFilterLoading: false
      };
    }

    this.select = this.select.bind(this);
    this.serverFilterKeyword = '';

    this._refs = {};
    this._uniqueId = uniqueId('an-dropdown-');
  }

  getButtonId() {
    return `${this._uniqueId}_button`;
  }

  onAriaLabelledbyProvider = () => {
    const { ariaLabelledbyProvider } = this.props;
    const buttonId = this.getButtonId();
    return ariaLabelledbyProvider && ariaLabelledbyProvider(buttonId);
  }

  render() {
    const {
      className, style,
      disabled, placeholder,
      // eslint-disable-next-line no-unused-vars
      maxHeight, name, flexibleMenu,
      filter, filterPlaceholder, serverFilter, autoOpen,
      theme, errored, showCheckbox, showAllCheckbox, showTextTip,
      showSpiner, errorInfo, showResults, results, showError, errorInfoTemplate, showDeselectall,
      onlyDefaultPlaceholder, prefix, visible,
      ariaLabel, ariaLabelExtraEndText,
      ...rest
    } = this.props;
    const { value, dataView, activeItemIndex, serverFilterLoading } = this.state;
    const isExpanded = this.state.isExpanded && !disabled;
    const dataProps = filterBy(rest, 'data-');

    let dropdownBtnTitle = '';
    let dropdownBtnInnerHTML;
    if (showCheckbox) {
      if (onlyDefaultPlaceholder) {
        dropdownBtnTitle = placeholder;
        dropdownBtnInnerHTML = placeholder;
      } else {
        dropdownBtnTitle += showTextTip ? decodeHtmlStr(`${this.findMutiTextByValue() || placeholder}`) : '';
        dropdownBtnInnerHTML = this.findMutiTextByValue() || placeholder;
      }
    } else {
      const prefixText = prefix || '';
      const text = `${prefixText} ${this.findTextByValue(value) || placeholder}`;
      dropdownBtnTitle += showTextTip ? decodeHtmlStr(text) : '';
      dropdownBtnInnerHTML = text;
    }
    const menuStyle = { ...maxHeight };
    if (flexibleMenu && this._refs.node) {
      menuStyle.width = this._refs.node.offsetWidth;
    }

    return (
      <div
        className={cls`aaui-dropdown ${className || ''}`}
        ref={(c) => { this._refs.node = c; }}
        style={style} {...dataProps}
        onKeyUp={disabled ? undefined : this.clearKeyboard}
        onKeyDown={disabled ? undefined : this.navigateByKeys}
        onKeyPress={disabled ? undefined : this.applyActive}
      >
        <button
          type="button"
          id={this.getButtonId()}
          ref={(ref) => { this.dropdownButton = ref; }}
          role="button"
          aria-haspopup="listbox"// eslint-disable-line
          aria-label={`${ariaLabel ? `${ariaLabel} ` : ''}${this.findTextByValue(value)}`}
          aria-labelledby={this.onAriaLabelledbyProvider()}
          className={cls`aaui-dropdown__button ${theme ? `aaui-dropdown-btn-${theme}` : ''}
                            ${isExpanded ? 'is-expanded' : ''}
                            ${disabled ? 'is-disabled' : ''}
                            ${errored ? 'is-error' : ''}`}
          onFocus={() => {
            if (!autoOpen) {
              return;
            }
            if (this.ignoreFocus) {
              this.ignoreFocus = false;
              return;
            }

            !disabled && !isExpanded && this.toggleMenu();
          }}
          onClick={() => {
            if (autoOpen) {
              return;
            }

            !disabled && this.toggleMenu();
          }}
          onMouseDown={(e) => {
            e.preventDefault();
            if (!autoOpen) {
              return;
            }
            this.ignoreFocus = true;
          }}
          onMouseUp={(e) => {
            if (!autoOpen) {
              return;
            }

            e.button === 0 && !disabled && this.toggleMenu();
            this.ignoreFocus = false;
          }}
        >
          {
            <div
              className="aaui-dropdown__button-text"
              title={dropdownBtnTitle}
            >
              {decodeHtmlStr(dropdownBtnInnerHTML)}
            </div>
          }
          <i
            className={cls`icon aaui-dropdown__button-icon
                         ${isExpanded ? 'icon-chevron-up' : 'icon-chevron-down'}`}
          />
        </button>
        {
          (visible || this.menuWrapper) &&
          <div
            className={`aaui-dropdown__menu-wrapper ${this.props.menuLocateRight ? 'is-right-align' : ''} ${isExpanded ? '' : 'u-hidden'}`}
            ref={(c) => { this.menuWrapper = c; }}
            role="combobox"
            tabIndex={0}
            aria-label="Select option box"
            aria-expanded={isExpanded && !disabled}
            aria-activedescendant={`${this._uniqueId}_${activeItemIndex}`}
            onMouseDown={this.giveFocus}
            onFocus={this.cancelCollapseTimeout}
            onBlur={this.tryCollapse}
          >
            {filter && (da.count(dataView) > 0 || this.isFilterInputKeydown || serverFilter)
              ? (
                <div
                  className={`aaui-dropdown__filter ${this.state.showClearFilterIcon ? 'is-remove' : ''}`}
                >
                  <i className="icon icon-search" />
                  <input
                    type="text"
                    ref={(c) => { this.filterInput = c; }}
                    role="textbox"
                    aria-label="Search"
                    className="aaui-dropdown__filter-input"
                    autoComplete="off"
                    placeholder={filterPlaceholder}
                    onFocus={this.cleanActivedItem}
                    onKeyDown={this.handleKeys}
                    onInput={this.applyFilter}
                  />
                  <i
                    className={`icon icon-close ${this.state.showClearFilterIcon ? '' : 'u-hidden'}`}
                    onClick={this.clearFilter}
                  />
                </div>
              )
              : undefined}
            <div className="aaui-dropdown__menu">
              <ul
                ref={(c) => { this.dropdownMenu = c; }}
                role="listbox"
                aria-expanded={isExpanded && !disabled}
                style={menuStyle}
                className={`${da.count(dataView) > 0 ? '' : 'u-hidden'}`}
              >
                {
                  showCheckbox && showAllCheckbox && da.count(this.state.dataView) > 0 &&
                  (
                    <li className={this.state.checkAll ? 'is-selected' : ''}>
                      <Checkbox
                        checked={this.state.checkAll}
                        onChange={this.checkAll}
                      > {this.props.allTxt || 'All'} </Checkbox>
                    </li>
                  )
                }
                {dataView.map((item, i) => {
                  const key = da.get(item, 'value');
                  const text = decodeHtmlStr(da.get(item, 'text'));
                  const active = i === activeItemIndex;
                  const optionId = `${this._uniqueId}_${i}`;
                  const ariaLabelValue = `${da.get(item, 'text')} ${ariaLabelExtraEndText}`;
                  const selected = showCheckbox ?
                    this.state.rowState[key] : key === this.state.value;
                  let css = active ? 'is-active' : '';
                  css += selected ? ' is-selected' : '';

                  if (showCheckbox) {
                    return (
                      this.props.itemTemplate ? this.decorate(item, i) :
                      <Item
                        id={optionId}
                        key={key}
                        role="option"
                        showTextTip={showTextTip}
                        data={item}
                        isCheck={selected}
                        click={this.check}
                        index={i}
                        aria-label={ariaLabelValue}
                        errorInfo={errorInfo || ''}
                        ccs={css}
                      />
                    );
                  } else if (showTextTip) {
                    return (
                      this.props.deleteitemTemplate ? this.decorateDeleleTmplate(item, i) :
                      <li
                        id={optionId}
                        key={key}
                        title={text}
                        role="option"
                        className={css}
                        aria-selected={active ? true : undefined}
                        aria-label={ariaLabelValue}
                        onClick={() => { this.select(key); }}
                      >
                        <span>{text}</span>
                      </li>
                    );
                  }
                  return (
                    <li
                      id={optionId}
                      key={key}
                      role="option"
                      className={css}
                      aria-selected={active ? true : undefined}
                      aria-label={ariaLabelValue}
                      onClick={() => { this.select(key); }}
                    >
                      <span>{text}</span>
                    </li>
                  );
                })}
              </ul>
              <div>
                <div className={`aaui-dropdown__menu-footer${(showDeselectall || !this.props.showAll) ? ' dropdown-status' : ''}`}>
                  <div className={showSpiner ? 'dropdown-spiner' : 'u-hidden'}><i
                    className="icon icon-spinner"
                  />{' Loading...'}</div>
                  {
                    (showDeselectall || !this.props.showAll) &&
                    (da.count(dataView) > 0 || this.isFilterInputKeydown) && !showSpiner ?
                    (<div
                      disabled={!!this.props.deselectAll}
                      onClick={this.deSelectAll}
                      className={`deSelectAll ${this.props.deselectAll ? '' : 'enabledDeSelectAll'}`}
                    >
                      Clear
                    </div>) : (<div />)
                  }
                  {
                    showError && errorInfo && !showSpiner &&
                    (da.count(dataView) > 0 || this.isFilterInputKeydown) &&
                    (errorInfoTemplate ? errorInfoTemplate() :
                    <div className="dropdown-error">{ errorInfo }</div>)
                  }
                  {
                    (showResults && (da.count(dataView) > 0 ||
                      this.isFilterInputKeydown) && !(showError && errorInfo)) &&
                    (results ? results(da.count(dataView)) :
                    <div className="dropdown-results">{`${da.count(dataView)} results`}</div>)
                  }
                  { da.count(dataView) === 0 && !showSpiner && !this.isFilterInputKeydown ?
                    <div className="dropdown-noResult">{this.props.noResult}</div> : undefined}
                </div>
              </div>
              {
                serverFilter && (
                  <LoadingBar spinSize="md" className={`aaui-dropdown__menu-loading ${!serverFilterLoading && 'u-hidden'}`} />
                )
              }
            </div>
          </div>
        }
      </div>
    );
  }

  decorate = (item, index) => {
    const isCheck = () => this.state.rowState[da.get(item, 'value')];
    const ccs = index === this.state.activeItemIndex ? 'is-active ' : '';
    const errorInfo = this.props.errorInfo ? this.props.errorInfo : '';
    return this.props.itemTemplate(item, ccs, isCheck, this.check, errorInfo);
  }


  decorateDeleleTmplate = (item, index) => {
    const ccs = index === this.state.activeItemIndex ? 'is-active ' : '';
    return this.props.deleteitemTemplate(item, ccs, () => { this.select(da.get(item, 'value')); });
  }

  maxItems = (nextValues) => {
    const stateValues = this.state.value;
    const rowState = this.state.rowState;
    for (let len = da.count(stateValues), i = 0; i < len; i += 1) {
      if (nextValues.indexOf(stateValues[i]) === -1) {
        rowState[stateValues[i]] = false;
        this.setCheckboxArray(stateValues[i], '');
      }
    }

    this.setState({
      rowState,
      isExpanded: true,
      value: nextValues,
      checkAll: false,
      activeItemIndex: -1
    });
  }

  componentWillUpdate(nextProps, nextState) {
    if (this.props.showCheckbox && nextState.value &&
      da.count(this.checkboxArray) > da.count(nextState.value)) {
      if (this.state.isExpanded) {
        this.maxItems(nextState.value);
      }
    }

    if (nextProps.data.size > this.props.data.size) {
      const rowState = this.state.rowState;
      nextProps.data.forEach((item) => {
        if (typeof rowState[da.get(item, 'value')] === 'undefined') {
          rowState[da.get(item, 'value')] = false;
        }
      });
      this.setState({
        rowState,
        checkAll: false
      });
    }

    this.state.serverFilterLoading &&
      this.props.serverFilterTimestamp !== nextProps.serverFilterTimestamp &&
      this.setState({ serverFilterLoading: false });
  }

  componentDidMount() {
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

    if (this.props.serverFilter && isFunction(this.props.serverFilterHandler)) {
      this.debouncedServerFilterHandler = debounce((keyword) => {
        const keywordUpdated = this.serverFilterKeyword !== keyword;
        if (keywordUpdated) {
          this.serverFilterKeyword = keyword;
          this.setState({ serverFilterLoading: true });
          this.props.serverFilterHandler(keyword);
        }
      }, 400);
    }
  }

  componentWillReceiveProps(nextProps) {
    const newState = {};
    if (nextProps.value !== this.props.value) {
      newState.value = nextProps.value;
    } else if (nextProps.defaultValue !== this.props.defaultValue) {
      newState.value = this.state.value === undefined
        ? nextProps.defaultValue
        : this.state.value;
    }
    if (!da.is(nextProps.data, this.props.data)) {
      newState.dataView = nextProps.data;
    }
    if (Object.keys(newState).length > 0) this.setState(newState);
    if (this.filterInput && !this.props.isFetchData && nextProps.isFetchData) {
      this.filterInput.value = '';
    }

    if (this.props.showCheckbox && da.count(this.props.data) > 0) {
      const rowState = {};
      const values = nextProps.value || [];
      let status = false;

      values.forEach((item) => {
        this.checkboxArray = this.checkboxArray.set(item, item);
      });

      this.props.data.forEach((item) => {
        if (values.indexOf(da.get(item, 'value')) > -1) {
          status = true;
          this.checkboxArray = this.checkboxArray.set(da.get(item, 'value'), da.get(item, 'value'));
        } else {
          status = false;
        }
        rowState[da.get(item, 'value')] = status;
      });
      this.props.serverFilter && nextProps.data.forEach((item) => {
        if (values.indexOf(da.get(item, 'value')) > -1) {
          status = true;
          this.checkboxArray = this.checkboxArray.set(da.get(item, 'value'), da.get(item, 'value'));
        } else {
          status = false;
        }
        rowState[da.get(item, 'value')] = status;
      });
      this.setState({ rowState });
    }
  }

  componentDidUpdate() {
    if (this.state.isExpanded) {
      // this.isFilterInputKeydown is used for judging
      // whether is inputting in filter input at the current time.
      if (!this.isFilterInputKeydown) this.menuWrapper && this.menuWrapper.focus();

      const itemMenu = this.dropdownMenu;
      const activeItem = itemMenu && itemMenu.querySelector('.is-active');
      if (activeItem) {
        const itemMenuHeight = itemMenu.offsetHeight;
        const itemMenuScrollTop = itemMenu.scrollTop;
        const activeItemTop = activeItem.offsetTop;
        const activeItemHeight = activeItem.offsetHeight;
        if ((activeItemTop + activeItemHeight) - itemMenuHeight - itemMenuScrollTop > 0) {
          itemMenu.scrollTop = (activeItemTop + activeItemHeight) - itemMenuHeight;
        } else if (activeItemTop < itemMenuScrollTop) {
          itemMenu.scrollTop = activeItemTop;
        }
      }

      if (this.props.showCheckbox) {
        const rowState = this.state.rowState;
        const values = this.state.value || [];
        this.props.data.forEach((item) => {
          if (values.indexOf(da.get(item, 'value')) > -1) {
            rowState[da.get(item, 'value')] = true;
          } else {
            rowState[da.get(item, 'value')] = false;
          }
        });
        // eslint-disable-next-line react/no-did-update-set-state
        this.setState({
          rowState
        });
      }

      const self = this;
      if (this.props.ajaxLoading && this.dropdownMenu && !this.dropdownMenu.onscroll) {
        /* eslint-disable func-names */
        this.dropdownMenu.onscroll = throttle(function () {
          const height = this.clientHeight;
          const scrollHeight = this.scrollHeight;
          if (scrollHeight - height - 6 <= this.scrollTop) {
            self.props.ajaxLoading();
          }
        }, 400);
      }
    }
  }

  filterCheckItems = (checkes) => {
    const vlaue = this.state.value || '';
    let checkboxArray = null;
    checkes.forEach((item) => {
      if (Object.prototype.toString.call(item) === '[object Object]') {
        checkes.push(item);
      } else if (vlaue.indexOf(item) === -1) {
        checkboxArray = this.setCheckboxArray(item, '');
      }
    });
    return checkboxArray == null ? checkes : checkboxArray;
  }

  getCheckValue = (checkes) => {
    const result = [];
    checkes.forEach((item) => {
      if (Object.prototype.toString.call(item) === '[object Object]') {
        result.push(item.value);
      } else if (item !== '') {
        result.push(item);
      }
    });
    return { value: result, checkedItems: this.findCheckedItemsByValue(checkes) };
  }

  findCheckedItemsByValue = (checkes) => {
    if (da.count(this.props.data) === 0) return undefined;
    const data = this.props.data.filter(item => checkes.get(da.get(item, 'value')) !== undefined);
    return data;
  }

  findMutiTextByValue = () => {
    const values = this.props.value || [];
    const dataViewLength = da.count(this.props.data);
    const len = this.props.selectedFilteredItems ? da.count(this.props.selectedFilteredItems) :
      da.count(values);
    if (this.props.showDeselectall && this.props.deselectAll && dataViewLength > 0) {
      return 'All';
    } else if (len === 1 && this.props.showTxtOnlyCheckedOneItem) {
      return this.findTextByValue(values[0]);
    }
    return len ? (`${len} ${this.props.txtSuffix}`) : undefined;
  }

  isAllChecked = (checkedState) => {
    const rowState = checkedState || this.state.rowState;
    const items = Object.keys(rowState);

    if (items.some(item => !this.state.rowState[item])) {
      return false;
    }
    return items.length > 0;
  }

  setCheckboxArray = (key, value) => {
    if (this.checkboxArray.has(key)) {
      if (value === '') {
        this.checkboxArray = this.checkboxArray.delete(key);
      } else {
        this.checkboxArray = this.checkboxArray.update(key, val => val);
      }
    } else {
      this.checkboxArray = this.checkboxArray.set(key, value);
    }
    return this.checkboxArray;
  }

  isAllFilterDataViewChecked = (dataView) => {
    if (dataView.some(item => !this.state.rowState[da.get(item, 'value')])) {
      return false;
    }
    return dataView.length > 0;
  }

  check = (val, index) => {
    this.state.rowState[val] = !this.state.rowState[val];
    const tempVal = this.state.rowState[val] ? val : '';
    this.checkboxArray = this.setCheckboxArray(val, tempVal);
    const checkedObj = this.getCheckValue(this.checkboxArray);
    let checkAll = false;
    // just for judge the filter list, and then set filter conditionally
    if (this.state.dataView.size !== this.props.data.size) {
      checkAll = this.isAllFilterDataViewChecked(this.state.dataView);
    } else {
      checkAll = !this.state.rowState[val] ? false : this.isAllChecked();
    }

    this.setState({
      value: checkedObj.value,
      isExpanded: true,
      activeItemIndex: index !== undefined ? this.state.activeItemIndex : -1,
      rowState: this.state.rowState,
      checkAll
    }, () => { if (this.props.onChange) this.props.onChange(checkedObj); });
  }

  getAllValues = (isCheckAll) => {
    if (isCheckAll !== 'deSelectAll' && this.state.checkAll) {
      this.state.dataView.forEach((item) => {
        this.checkboxArray = this.setCheckboxArray(da.get(item, 'value'), da.get(item, 'value'));
      });
    } else if (this.props.selectedFilteredItems) {
      const params = this.props.selectedFilteredItems.toJS();
      for (let i = 0, len = params.length; i < len; i += 1) {
        this.checkboxArray = this.checkboxArray.delete(params[i]);
      }
    } else if ((this.state.dataView.size !== this.props.data.size) ||
      (this.state.value.length > this.state.dataView.size)) {
      // just for judge the filter list, and then set filter conditionally
      this.state.dataView.forEach((item) => {
        this.checkboxArray = this.checkboxArray.delete(da.get(item, 'value'));
      });
    } else {
      this.checkboxArray = OrderedMap({});
    }

    return this.checkboxArray;
  }

  deSelectAll = () => {
    const rowState = {};
    Object.keys(this.state.rowState).forEach((item) => {
      if (this.props.selectedFilteredItems) {
        const deSelectAllParams = this.props.selectedFilteredItems.toJS();
        if (deSelectAllParams.indexOf(item) > -1) {
          rowState[item] = false;
        }
      }
      if (!this.props.selectedFilteredItems) {
        rowState[item] = false;
      }
    });

    const checkedObj = this.getCheckValue(this.getAllValues('deSelectAll'));

    this.setState({
      isExpanded: true,
      value: checkedObj.value,
      rowState
    }, () => { if (this.props.onChange) this.props.onChange(checkedObj); });
  }

  checkAll = () => {
    if (this.props.errorInfo && this.props.errorInfo.length > 0) return false;
    const rowState = {};
    const checkState = !this.state.checkAll;
    // just for judge the filter list, and then set filter conditionally
    if (this.state.dataView.size !== this.props.data.size) {
      this.state.dataView.forEach((item) => {
        rowState[da.get(item, 'value')] = checkState;
      });
    } else if (this.state.value.length > this.state.dataView.size) {
      // just for judge resource dropdownlist
      let isValueInDataView = false;
      const dataView = this.state.dataView.toJS();
      Object.keys(this.state.rowState).forEach((item) => {
        isValueInDataView = Dropdown.checkValueInDataView(item, dataView);
        if (isValueInDataView) {
          rowState[item] = checkState;
        }
      });
    } else {
      Object.keys(this.state.rowState).forEach((item) => {
        rowState[item] = checkState;
      });
    }

    this.state.checkAll = checkState;

    const checkedObj = this.getCheckValue(this.getAllValues());
    this.setState({
      value: checkedObj.value,
      rowState,
      checkAll: this.state.checkAll
    }, () => { if (this.props.onChange) this.props.onChange(checkedObj); });
    return false;
  }

  static checkValueInDataView(value, dataView) {
    let result = false;
    for (let len = dataView.length, i = 0; i < len; i += 1) {
      if (da.get(dataView[i], 'value') === value) {
        result = true;
      }
    }
    return result;
  }

  resetRowState = () => {
    const { value, rowState } = this.state;
    Object.keys(rowState).forEach((item) => {
      if (value.indexOf(parseInt(item, 10)) === -1) {
        rowState[item] = false;
      }
    });
  }

  isValueChanged = () => {
    let { initValue, value } = this.state;
    const { showCheckbox } = this.props;

    // for case:  initValue = '1'   value = '2'
    if (!showCheckbox) {
      return initValue !== value;
    }

    initValue = initValue || [];
    value = value || [];

    // for case: same length and not same squence => initValue = [1, 2, 3]   value = [2, 3, 1]
    if (initValue.length === value.length) {
      const diff = difference(initValue, value);
      return !!diff.length;
    }

    return true;
  }

  onMenuHide = () => {
    const { isExpanded } = this.state;
    const isValueChanged = this.isValueChanged();

    if (!isExpanded && this.props.onMenuHide) {
      this.props.onMenuHide.call(this, isValueChanged);
    }

    if (isExpanded && this.filterInput) {
      this.filterInput.focus();
    }
  }

  toggleMenu = () => {
    clearTimeout(this._timer);

    if (this.filterInput) {
      if (this.props.isFetchData) {
        this.filterInput.value = '';
      }
      if (this.state.isExpanded) {
        this.isFilterInputKeydown = false;
      }
    }
    let rowState = {};
    let checkAll = false;
    const self = this;

    const { showCheckbox, data } = this.props;

    if (showCheckbox) {
      if (da.count(data) > 0) {
        const values = this.props.value || [];
        let checked = false;
        data.forEach((item) => {
          const val = da.get(item, 'value');
          if (values.indexOf(val) >= 0) {
            checked = true;
            self.checkboxArray = self.checkboxArray.set(val, val);
          } else {
            checked = false;
          }
          rowState[val] = checked;
        });
        checkAll = this.isAllChecked();
      } else {
        this.resetRowState();
        rowState = this.state.rowState;
      }

      let dataView;
      if (this.filterInput && !this.props.serverFilter) {
        dataView = this.filterData(this.filterInput.value, this.props.data);
      } else {
        dataView = this.props.data;
      }
      rowState = this.checkedRowstate(rowState);

      // for loading resources with ajax;
      if (this.checkboxArray && this.checkboxArray.size < this.state.value.length) {
        const val = this.state.value;
        for (let len = val.length, i = 0; i < len; i += 1) {
          this.setCheckboxArray(val[i], val[i]);
        }
        if (dataView.size < this.state.value.length) {
          checkAll = Dropdown.isCheckAllByValueAndDataView(dataView, rowState);
        }
      }
      // end
      this.checkboxArray = this.filterCheckItems(this.checkboxArray);
      if (this.state.isExpanded) {
        this.setState({
          isExpanded: !this.state.isExpanded,
          dataView,
          rowState,
          checkAll,
          value: this.state.value
        }, this.onMenuHide);
      } else {
        this.setState({
          isExpanded: !this.state.isExpanded,
          dataView,
          rowState,
          checkAll,
          value: this.state.value,
          initValue: this.state.value
        });
      }
    } else if (this.state.isExpanded) {
      this.setState({
        isExpanded: !this.state.isExpanded
      }, this.onMenuHide);
    } else {
      this.setState({
        isExpanded: !this.state.isExpanded,
        initValue: this.state.value
      });
    }
  }

  static isCheckAllByValueAndDataView(immutableDataView, rowState) {
    const dataView = immutableDataView.toJS();
    let result = false;
    for (let len = dataView.length, i = 0; i < len; i += 1) {
      if (rowState[dataView[i].id]) {
        result = true;
      } else {
        result = false;
        break;
      }
    }
    return result;
  }

  checkedRowstate = (rowState) => {
    const val = this.state.value || [];
    const checkedRowState = rowState;
    for (let len = val.length, i = 0; i < len; i += 1) {
      if (!checkedRowState[val[i]]) {
        checkedRowState[val[i]] = true;
      }
    }

    return checkedRowState;
  }

  tryCollapse = () => {
    if (this.state.isExpanded) {
      this._timer = setTimeout(() => {
        this.setState({
          isExpanded: false
        }, this.onMenuHide);
      }, 100);
    }
  }

  cancelCollapseTimeout = () => {
    clearTimeout(this._timer);
  }

  giveFocus = (e) => {
    if (e.target === this.menuWrapper) {
      this.menuWrapper.focus();
    }
  }

  navigateByKeys = (e) => {
    const keyCode = e.keyCode || e.which;
    //  focus next component if there are many input,
    // dropdown or others component on the screen when pressing tab.
    if (keyCode === 9 || ([38, 40, 13, 27, 32].indexOf(keyCode) === -1)) {
      return;
    }

    e.preventDefault();
    const isExpanded = this.state.isExpanded;
    switch (keyCode) {
      case KeyCode.UP:
        this.setState({
          activeItemIndex: this.state.activeItemIndex - 1 >= 0
            ? this.state.activeItemIndex - 1
            : da.count(this.state.dataView) - 1,
          isExpanded: true
        });
        break;
      case KeyCode.DOWN:
        this.setState({
          activeItemIndex: this.state.activeItemIndex + 1 < da.count(this.state.dataView)
            ? this.state.activeItemIndex + 1
            : 0,
          isExpanded: true
        });
        break;
      case KeyCode.ENTER: {
        if (isExpanded) {
          const { dataView, activeItemIndex } = this.state;
          if (this.props.showCheckbox) {
            this.setState({
              isExpanded: false,
              activeItemIndex: this.state.activeItemIndex
            }, this.onMenuHide);
            this.ignoreFocus = true;
            this.dropdownButton.focus();
          } else if (activeItemIndex >= 0) {
            const item = da.get(dataView, activeItemIndex);
            const value = item ? da.get(item, 'value') : null;
            if (value !== null) {
              this.select(value);
            }
            this.ignoreFocus = true;
            this.dropdownButton.focus();
          }
        } else {
          this.setState({
            isExpanded: true,
            activeItemIndex: this.state.activeItemIndex
          });
        }
        break;
      }
      case KeyCode.ESCAPE:
        this.setState({
          isExpanded: false,
          activeItemIndex: this.state.activeItemIndex
        }, this.props.showCheckbox ? this.onMenuHide : undefined);
        this.ignoreFocus = true;
        this.dropdownButton.focus();
        break;
      case KeyCode.SPACE:
        if (isExpanded) {
          return; /* eslint no-useless-return: 0 */
        } else { /* eslint no-else-return: 0 */
          this.setState({
            isExpanded: true,
            activeItemIndex: this.state.activeItemIndex
          });
        }
        break;
      default:
        break;
    }
  }

  applyActive = (e) => {
    if (this.props.filter && e.target === this.filterInput) return false;
    const keyCode = e.keyCode || e.which;
    const charStr = String.fromCharCode(keyCode);
    this.keyboardValue = this.keyboardValue + charStr.toUpperCase();
    this.filterFromKeyboard();
    return false;
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

  getIndex = (str) => {
    const dataArray = this.state.dataView.toJS ? this.state.dataView.toJS() : this.state.dataView;
    let index = 0;
    let value = '';
    const length = da.count(dataArray);
    let isFound = false;
    let keyWords = '';
    let i = 0;

    for (; i < length; i += 1) {
      value = da.get(dataArray[i], 'text');
      if (value.toUpperCase().indexOf(str) === 0) {
        index = i;
        isFound = true;
        keyWords = str;
        break;
      }
    }

    return { index, isFound, keyWords };
  }

  applyFilter = (e) => {
    const keyword = e.target.value;

    if (!this.props.serverFilter) {
      return this.doClientFilter(keyword);
    }

    // do server filter
    return this.debouncedServerFilterHandler(keyword);
  }

  doClientFilter = (key) => {
    const dataView = this.filterData(key, this.props.data);
    let showClearFilterIcon = false;
    if (key.length > 0) {
      showClearFilterIcon = true;
    }
    if (this.props.showCheckbox) {
      const rowState = {};
      dataView.forEach((item) => {
        rowState[da.get(item, 'value')] = this.state.rowState[da.get(item, 'value')];
      });
      this.setState({
        dataView,
        checkAll: this.isAllChecked(rowState),
        showClearFilterIcon
      });
    } else {
      this.setState({
        dataView,
        showClearFilterIcon
      });
    }
  }

  clearFilter = () => {
    this.filterInput.value = '';
    if (this.props.onClearFilter) {
      this.props.onClearFilter();
    }
    const rowState = {};
    const values = this.props.value;
    let status = false;
    const self = this;
    this.props.data.forEach((item) => {
      if (values.indexOf(da.get(item, 'value')) > -1) {
        status = true;
        self.checkboxArray = self.checkboxArray.set(da.get(item, 'value'), da.get(item, 'value'));
      } else {
        status = false;
      }
      rowState[da.get(item, 'value')] = status;
    });
    const checkAll = this.isAllChecked();
    this.checkboxArray = this.filterCheckItems(this.checkboxArray);
    this.setState({
      dataView: this.props.data,
      rowState,
      checkAll,
      value: this.state.value,
      showClearFilterIcon: false
    });
  }

  handleKeys = (e) => {
    this.isFilterInputKeydown = true;
    if (this.props.filterKeyDown) {
      this.props.filterKeyDown();
    }
    // Delegate up, down, and escape to itemMenu.
    if ([38, 40, 27].indexOf(e.keyCode) > -1) return;
    // Delegate enter to itemMenu if up/down selections are already made.
    if (e.keyCode === 13 && this.state.activeItemIndex > -1) return;
    e.stopPropagation();
  }

  select = (value) => {
    const val = this.props.value !== undefined ? this.state.value : value;
    this.setState({
      value: val,
      isExpanded: false,
      activeItemIndex: -1
    }, () => {
      if (this.props.onChange) this.props.onChange({ value });
    });
  }

  findItemByValue = (value) => {
    if (da.count(this.props.data) === 0) return undefined;
    const data = this.props.data.toJS ? this.props.data.toJS() : this.props.data;
    return find(data, item => da.get(item, 'value') === value);
  }

  findTextByValue = (value) => {
    const item = this.findItemByValue(value);
    if (item) {
      return da.get(item, 'text');
    }
    return undefined;
  }

  filterData = (key, dataset) => {
    const k = key.trim().toLowerCase();
    const klen = k.length;
    let matcher;
    if (!this.props.fuzzyQuery) {
      matcher = (item) => {
        const t = da.get(item, 'text').trim().toLowerCase();
        if (t.indexOf(k) > -1) return true;
        return false;
      };
    } else {
      matcher = (item) => {
        const t = da.get(item, 'text').trim().toLowerCase();
        const tlen = t.length;
        if (tlen < klen) {
          return false;
        }
        for (let i = 0; i < tlen; i += 1) {
          if (t.charAt(i) === k.charAt(i) && i + 1 >= klen) {
            return true;
          }
        }
        return false;
      };
    }


    return (!k ? dataset : dataset.filter(matcher));
  }

  componentWillMount() {
    this.keyboardValue = '';
    this.clearKeyboardValue = debounce(() => { this.keyboardValue = ''; }, 600);
  }

  cleanActivedItem = () => {
    this.setState({
      activeItemIndex: -1
    }, this.get);
  }
}

export default Dropdown;
