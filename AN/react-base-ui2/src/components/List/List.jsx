/* eslint-disable react/no-find-dom-node */

import React from 'react';
import { findDOMNode } from 'react-dom';
import PropTypes from 'prop-types';
import cloneDeep from 'lodash/cloneDeep';
import isArray from 'lodash/isArray';
import isFunction from 'lodash/isFunction';
import sortBy from 'lodash/sortBy';
import reverse from 'lodash/reverse';
import findIndex from 'lodash/findIndex';
import find from 'lodash/find';
import toString from 'lodash/toString';

import { createPopupService } from '../../services/popup';
import { DefaultCSSPrefix, SelectionMode, SortOrder, KeyCode } from '../../consts';

import Body from './Body';
import Header from './Header';
import Bottom from './Bottom';
import { ListType } from './consts';

const defaultFilter = ({ filter, data, filterField = 'text', isFuzzy }) => {
  if (filter && isArray(data) && filterField) {
    return data.filter((row) => {
      const text = row[filterField];
      const reg = isFuzzy ? new RegExp(filter, 'ig') : new RegExp(`^${filter}`, 'g');
      return reg.test(text);
    });
  }

  return data;
};

/** Default PropTypes of List.
 * @memberof List
*/
const ListPropTypes = {
  /** defined the unique id for usage of automation test
   * @type {string}
   */
  'data-qa-id': PropTypes.string,
  /** Determines the skin prefix of list.
   * @type {string}
   */
  prefix: PropTypes.string,
  /** Array of list. Each item is an object.
   * @type {array}
   * @example
   * [
   *  {
   *    index: 1,
   *    text: 'resource 1',
   *    value: 23,
   *    disabled: false,
   *    selected: true,
   *    showTips: false,
   *    icon: 'icon-list',
   *    renderer: ({ item }) => {
   *      const { index, disabled, selected } = item;
   *      return (
   *        <Checkbox disabled={disabled} checked={selected}>
   *          {index}
   *          <span className="row-icon icon-list" />
   *        </Checkbox>
   *      );
   *    }
   *  }
   * ]
   */
  data: PropTypes.arrayOf(PropTypes.shape({
    index: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    text: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    disabled: PropTypes.bool,
    selected: PropTypes.bool,
    showTips: PropTypes.bool,
    icon: PropTypes.string,
    renderer: PropTypes.func
  })).isRequired,
  /** Config the list.
   * @namespace
   * @property {SelectionMode} config.selectionMode
   * @property {List.ListType}  config.listType
   * @property {boolean} config.disabled
   * @property {string} config.maxHeight
   * @property {boolean} config.showTips
   * @property {boolean} config.showIcon
   * @property {boolean} config.checkable
   * @property {boolean} config.sortable
   * @property {boolean} config.filterable
   * @property {boolean} config.asyncable
   * @property {boolean} config.isFuzzy
   * @property {string} config.sortField
   * @property {string} config.filterField
   * @property {boolean} config.WCAG
   * @property {boolean} config.allowDeselect
   * @example
   *  {
   *    selectionMode: SelectionMode.SINGLE,
   *    listType: ListType.SINGLE,
   *    disabled: false,
   *    maxHeight: '120px',
   *    showTips: false, // determine whether show the tips when mouse hover the list item.
   *    showIcon: true, // determine whether show the icon after the list item
   *    checkable: false, // determine whether show the checkbox before list item
   *    sortable: false, // can be sorted
   *    filterable: true, // can be filter by inputted value
   *    asyncable: false, // determine whether the data can be loaded asyncable.
   *    isFuzzy: false,
   *    sortField: 'text',
   *    filterField: 'text',
   *    WCAG: false,
   *    allowDeselect: true
   *  }
   */
  config: PropTypes.shape({
    selectionMode: PropTypes.oneOf(
      [SelectionMode.SINGLE, SelectionMode.MULTIPLE]),
    listType: PropTypes.oneOf(
      [ListType.SINGLE, ListType.MULTIPLE]),
    disabled: PropTypes.bool,
    maxHeight: PropTypes.string,
    showTips: PropTypes.bool,
    showIcon: PropTypes.bool,
    checkable: PropTypes.bool,
    sortable: PropTypes.bool,
    filterable: PropTypes.bool,
    asyncable: PropTypes.bool,
    isFuzzy: PropTypes.bool,
    sortField: PropTypes.string,
    filterField: PropTypes.string,
    WCAG: PropTypes.bool,
    allowDeselect: PropTypes.bool
  }).isRequired,
  /** Gets or sets the selected Item's index.
   * @type {array}
   */
  selectedIndex: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.number, PropTypes.string])),
  /** Gets or sets the selected Item's value.
   * @type {array}
   */
  selectedValue: PropTypes.arrayOf(PropTypes.string),
  /** Customize filter func.
   * @type {func}
   * @param {object} filterInformation
   * @param { boolean } filterInformation.filter
   * @param { array } filterInformation.data
   * @param { string } filterInformation.filterField
   * @param { boolean } filterInformation.isFuzzy
   * @example
   *     const defaultFilter = ({ filter, data, filterField = 'text', isFuzzy }) => {
   *       if (filter && isArray(data) && filterField) {
   *         return data.filter((row) => {
   *           const text = row[filterField];
   *           const reg = isFuzzy ? new RegExp(filter, 'ig') : new RegExp(`^${filter}`, 'g');
   *           return reg.test(text);
   *         });
   *       }
   *
   *       return data;
   *    };
   */
  filterer: PropTypes.func,
  /** Customize sort func in ascending order.
   * @type {func}
   * @example
   *  function({ orderBy = 'text' }) => (a, b) => {
   *   const aValue = a && a[orderBy];
   *   const bValue = b && b[orderBy];
   *
   *   return aValue - bValue;
   *  };
   */
  sorter: PropTypes.func,
  /** Fires when check or uncheck the list item.
   * @event
   * @type {func}
   * @example
   *  onChange({ item }) {
   *   console.log('clicked item', item);
   *   this.val.value = JSON.stringify(this.list.value);
   *  }
   */
  onChange: PropTypes.func,
  /** Fires when scroll to the list bottom.
   * @event
   * @type {func}
   */
  onScrollToBottom: PropTypes.func,
  /** Customize func which render the list item by self.
   * @type {func}
   * @example
   *  renderer({ config, item }) {
   *    const { index, disabled, selected, text } = item;
   *    return
   *     <Checkbox disabled={disabled} checked={selected}>
   *      <SafeText key={`formatter_${index}`} text={`custom ${text}`} />
   *      <span className="row-icon icon-list" />
   *    </Checkbox>;
   *  }
   */
  renderer: PropTypes.func
};

/** Default Props for List */
const ListProps = {
  'data-qa-id': '',
  prefix: `${DefaultCSSPrefix}-`,
  data: [],
  config: {
    /** Determines the selection mode of list.
     * @type {Number}
     * - 0= SINGLE
     * - 1= MULTIPLE
     */
    selectionMode: SelectionMode.SINGLE,
    /** Determines the column mode of list.
     * @type {Number}
     * - 0= SINGLE
     * - 1= MULTIPLE
     */
    listType: ListType.SINGLE,
    disabled: false,
    maxHeight: undefined,
    showTips: true,
    showIcon: true,
    checkable: true,
    sortable: false,
    filterable: false,
    asyncable: false,
    isFuzzy: true,
    WCAG: true,
    allowDeselect: false,
    /** The default sort data field. default value is 'text'
     * @type {String}
     */
    sortField: 'text',
    /** The default filter data field. default value is 'text'
     * @type {String}
     */
    filterField: 'text'
  },
  selectedIndex: [],
  filterer: undefined,
  sorter: undefined,
  onChange: undefined,
  renderer: undefined
};

/**
 * @desc
 * The List is including single column list and multiple columns list, and including
 * sortable, filterable, checkable and asyncable etc. feature.
 *
 * @example
 *  <List
 *   ref={(list) => { this.list = list; }}
 *   data={[
 *     { index: 10, text: 'this is a test9999999999;lkfj', value: 1, disabled: true },
 *     { index: 1, text: 'this is a test111111111111111111111111111111111111111111111',
 *         value: 1, disabled: true },
 *     { index: 2, text: 'this is a test222222222222222222222222222222222222222222222',
 *         value: 2, selected: true },
 *     { index: 3, text: 'this is a test333333333333333333333333333333333333333333333', value: 3 },
 *     { index: 4, text: 'this is a test333333333333333333333333333333333333333333333', value: 4 },
 *     { index: 5, text: 'this is a test333333333333333333333333333333333333333333333', value: 5 },
 *     { index: 6, text: 'this is a test333333333333333333333333333333333333333333333', value: 6 }
 *     ]}
 *   config={{
 *     selectionMode: SelectionMode.SINGLE,
 *     listType: ListType.SINGLE,
 *     disabled: false,
 *     showTips: true,
 *     showIcon: true,
 *     showCheckAll: true,
 *     checkable: true,
 *     sortable: false,
 *     filterable: true,
 *     isFuzzy: true,
 *     asyncable: false,
 *     icon: 'icon-list'
 *   }}
 *   onChange={({ item }) => this.customChange({ item })}
 *   renderer={({ data }) => this.customRender({ data })}
 *   selectedIndex={[1, 2]}
 *  />
 */

/** List Component provide a full list. */
class List extends React.PureComponent {
  static displayName = 'List';
  static propTypes = ListPropTypes;
  static defaultProps = ListProps;

  constructor(props) {
    super(props);

    const { data, selectedIndex } = this.props;

    this.state = {
      data, // the orginal data
      dataView: cloneDeep(data), // the data used for view, this data can be sorted, filterd.
      sortOrder: SortOrder.ORIGIN,
      filter: '',
      isLoading: false,
      selectedIndex: isArray(selectedIndex) ? selectedIndex : [selectedIndex]
    };

    this.state = {
      ...this.state,
      activeIndex: this.findRowIndexByDataIndex(this.state.selectedIndex[0])
    };
  }

  componentDidMount = () => {
    Object.defineProperties(this, {
      selectedIndex: {
        get() {
          return this.state.selectedIndex;
        },
        set(v) {
          this.setState({
            selectedIndex: v,
            activeIndex: isArray(v) && v.length ?
              this.findRowIndexByDataIndex(v[0]) : this.state.activeIndex
          });
        }
      }
    });

    Object.defineProperties(this, {
      selectedValue: {
        get() {
          const { selectedIndex = [], dataView } = this.state;
          return selectedIndex.map(idx =>
            find(dataView, row => toString(row.index) === toString(idx))
          );
        },
        set(v) {
          const { dataView, selectedIndex, config: { selectionMode } } = this.state;
          const foundRow = find(dataView, row => row.value === v);
          if (foundRow && !selectedIndex.some(idx => toString(foundRow) === toString(idx))) {
            const newSelectedIndex = selectionMode === SelectionMode.SINGLE ?
              [foundRow.index] : [...selectedIndex, foundRow.index];
            this.setState({ selectedIndex: newSelectedIndex });
          }
        }
      }
    });

    const { config: { WCAG } } = this.props;
    if (WCAG) {
      const bodyList = findDOMNode(this.body);
      const activeItem = bodyList.querySelector('.focus');
      if (activeItem) {
        setTimeout(() => activeItem.focus(), 0);
      } else {
        setTimeout(() => this.container.focus(), 0);
      }
    }
  }

  componentWillReceiveProps = (nextProps) => {
    if (nextProps.selectedIndex !== this.props.selectedIndex) {
      this.selectedIndex = nextProps.selectedIndex;
    }
    if (nextProps.data !== this.props.data) {
      this.setData(nextProps.data);
    }
  }

  componentDidUpdate() {
    const { config: { WCAG } } = this.props;
    if (WCAG) {
      const bodyList = findDOMNode(this.body);
      const activeItem = bodyList.querySelector('.focus');
      if (activeItem) {
        setTimeout(() => activeItem.focus(), 0);
      }
    }
  }

  onCheckAll(checked) {
    const { onChange } = this.props;
    const data = cloneDeep(this.state.data).map(
      row => ({ ...row, selected: row.disabled ? row.selected : checked }));
    this.setData(data, () => isFunction(onChange) && onChange(this.selectedIndex));
  }

  onFilter({ filter }) {
    const { data } = this.state;
    this.setState({ filter }, () => this.setData(data));
  }

  onSort(sortOrder) {
    const { data } = this.state;
    this.setState({ sortOrder }, () => this.setData(data));
  }

  onChange({ item }) {
    const { selectedIndex } = this.state;
    const { onChange, config: { selectionMode, allowDeselect } } = this.props;
    let newValue = [];

    if (selectionMode === SelectionMode.SINGLE) {
      if (allowDeselect && selectedIndex.some(idx => `${idx}` === `${item.index}`)) {
        newValue = [];
      } else {
        newValue = [item.index];
      }
    } else if (selectionMode === SelectionMode.MULTIPLE) {
      const isExisting = selectedIndex.some(idx => `${idx}` === `${item.index}`);
      if (allowDeselect && isExisting) {
        newValue = selectedIndex.filter(idx => `${idx}` !== `${item.index}`);
      } else {
        newValue = selectedIndex.slice(0);
        if (!isExisting) {
          newValue.push(item.index);
        }
      }
    }

    this.setState({
      selectedIndex: newValue,
      activeIndex: this.findRowIndexByDataIndex(item.index)
    },
      () => isFunction(onChange) && onChange(this.selectedIndex));
  }

  onScrollToBottom() {
    const { onScrollToBottom, config: { asyncable } } = this.props;
    if (asyncable && isFunction(onScrollToBottom)) {
      this.setLoadingStatus(true, onScrollToBottom);
    }
  }

  onFocus() {
    this.setState({
      activeIndex: this.state.activeIndex === -1 ?
        this.findNextActiveIndex(KeyCode.DOWN, -1) :
        this.state.activeIndex
    });
  }

  onBlur() {
  }

  onKeyDown(e) {
    const keyCode = e.keyCode || e.which;

    switch (keyCode) {
      case KeyCode.UP:
      case KeyCode.DOWN: {
        const { activeIndex } = this.state;
        const newActiveIndex = this.findNextActiveIndex(keyCode, activeIndex);
        this.setState({ activeIndex: newActiveIndex });
        e.preventDefault();
        break;
      }
      case KeyCode.ENTER:
      case KeyCode.SPACE: {
        const { activeIndex, dataView } = this.state;
        this.onChange({ item: dataView[activeIndex] });
        e.preventDefault();
        break;
      }
      default:
        break;
    }
  }

  setLoadingStatus(isLoading, callback) {
    this.setState({ isLoading }, () => isFunction(callback) && callback());
  }

  setData(newData, callBack) {
    const { sortOrder = SortOrder.ORIGIN, filter } = this.state;
    const { config: {
      sortable, sorter, sortField, filterable, filterer, filterField, isFuzzy
    } } = this.props;
    let dataView = newData;

    if (sortable && sortOrder !== SortOrder.ORIGIN) {
      if (isFunction(sorter)) {
        dataView = cloneDeep(dataView).sort(sorter({ orderBy: sortField }));
      } else {
        dataView = sortBy(cloneDeep(dataView), row => row[sortField]);
      }

      if (sortOrder === SortOrder.DESC) {
        dataView = reverse(dataView);
      }
    }

    if (filterable && filter) {
      const myFilterer = isFunction(filterer) ? filterer : defaultFilter;
      dataView = myFilterer({ filter, filterField, isFuzzy, data: dataView });
    }

    this.setState({ data: newData, dataView },
      () => isFunction(callBack) && callBack()
    );
  }

  findNextActiveIndex(keyCode, activeIndex) {
    const { dataView } = this.state;
    let newActiveIndex = activeIndex;
    switch (keyCode) {
      case KeyCode.UP:
        newActiveIndex -= 1;
        break;
      case KeyCode.DOWN:
        newActiveIndex += 1;
        break;
      default:
        break;
    }

    if (newActiveIndex < 0) {
      newActiveIndex = dataView.length - 1;
    }

    if (newActiveIndex > dataView.length - 1) {
      newActiveIndex = 0;
    }

    if (dataView[newActiveIndex] && dataView[newActiveIndex].disabled) {
      return this.findNextActiveIndex(keyCode, newActiveIndex);
    }

    return newActiveIndex;
  }

  findRowIndexByDataIndex(dataIndex, dataView) {
    const dv = dataView || this.state.dataView;
    const idx = findIndex(dv, row => toString(row.index) === toString(dataIndex));
    return idx;
  }

  appendData(newData) {
    if (isArray(newData)) {
      const data = this.state.data;
      this.setData(data.concat(newData), () => this.setLoadingStatus(false));
    }
  }

  render() {
    const { prefix, config, className = '', style, 'data-qa-id': qaId, ...rest } = this.props;
    return (
      <div
        ref={(container) => { this.container = container; }}
        className={`${prefix}list ${prefix}list__wrapper ${className}`}
        role="listbox"
        style={style}
        data-qa-id={qaId}
        onFocus={config.WCAG && (() => this.onFocus())}
        onBlur={config.WCAG && (() => this.onBlur())}
        onKeyDown={config.WCAG && (e => this.onKeyDown(e))}
        tabIndex={config.WCAG && -1}
      >
        <Header
          config={{ ...config, prefix }}
          onFilter={filter => this.onFilter(filter)}
        />
        <Body
          ref={(body) => { this.body = body; }}
          {...rest}
          config={{ ...config, prefix }}
          data={this.state.dataView}
          activeIndex={this.state.activeIndex}
          selectedIndex={this.state.selectedIndex}
          onChange={({ item }) => this.onChange({ item })}
          onScrollToBottom={() => this.onScrollToBottom()}
        />
        <Bottom
          config={{ ...config, prefix }}
          onCheckAll={checked => this.onCheckAll(checked)}
          data={this.state.dataView}
          onSort={sortField => this.onSort(sortField)}
          isLoading={this.state.isLoading}
        />
      </div>
    );
  }
}

const popupService = createPopupService(List);

/**
 * Popup a list.
 * @function popup
 * @param {object} listOptions - Configured options of List
 * when calling the popup.
 * @param {object} popupOptions - Configured options of popup service
 * when calling the popup.
 * @returns {Promise} Returns a promise, from where we can get the selected date or error.
 */
List.popup = (listOptions = {}, popupOptions = {}) => {
  const po = {
    closeByEscape: false,
    closeWhenViewChange: true,
    ...popupOptions
  };

  return popupService.popup(po, listOptions);
};


export default List;
