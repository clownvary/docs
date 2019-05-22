/* eslint-disable react/no-find-dom-node */

import React from 'react';
import PropTypes from 'prop-types';
import eq from 'lodash/eq';
import max from 'lodash/max';
import min from 'lodash/min';
import size from 'lodash/size';
import concat from 'lodash/concat';
import toUpper from 'lodash/toUpper';
import uniqueId from 'lodash/uniqueId';
import identity from 'lodash/identity';
import debounce from 'lodash/debounce';
import findIndex from 'lodash/findIndex';
import isNil from 'lodash/isNil';
import isArray from 'lodash/isArray';
import isNumber from 'lodash/isNumber';
import isBoolean from 'lodash/isBoolean';
import isFunction from 'lodash/isFunction';

import ClientSource, { IDataSource } from '../../common/data';
import { createPopupService } from '../../services/popup';
import { SortOrder, KeyCode, SelectionMode } from '../../consts';

import LoadingBar from '../LoadingBar';

import ListBody from './ListBody';
import ListHeader from './ListHeader';
import ListFooter from './ListFooter';
import { ColumnType } from './consts';
import columnRenderers from './columns';

/** Default PropTypes of ColumnList.
 * @memberof ColumnList
*/
const ColumnListPropTypes = {
  /** defined the unique id for usage of automation test
   * @type {string}
   */
  'data-qa-id': PropTypes.string,
  /** Either an array or an instance of IDataSource
   * @type {IDataSource}
   * @example
   * const dataSource1 = [
   *  { text: 'resource 1', checked: true, icon: 'icon-adjust'}
   *  { text: 'resource 2', checked: true, icon: 'icon-adjust'}
   *  { text: 'resource 3', checked: true, icon: 'icon-adjust'}
   *  { text: 'resource 4', checked: true, icon: 'icon-adjust'},
   * ]
   *
   * const dataSource2 = new ClientSource([
   *  { id: 1, text: 'resource 1', checked: true, icon: 'icon-adjust'}
   *  { id: 2, text: 'resource 2', checked: true, icon: 'icon-adjust'}
   *  { id: 3, text: 'resource 3', checked: true, icon: 'icon-adjust'}
   *  { id: 4, text: 'resource 4', checked: true, icon: 'icon-adjust'},
   * ]);
   */
  dataSource: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.instanceOf(IDataSource)
  ]),
  /** Disable or enable the entire list
   * @type {boolean}
   */
  disabled: PropTypes.bool,
  /** Enable or disable the page mode of the list
   * @type {boolean}
   */
  pageMode: PropTypes.bool,
  /** Number of items per page if list is in page mode and dataSource is an array
   * @type {number}
   */
  pageSize: PropTypes.number,
  /** Specify the width of list
   * @type {string}
   * @example
   * const width = '100px'; // or "auto", "inherit" and so forth;
  */
  width: PropTypes.string,
  /** Specify the minWidth of list
   * @type {string}
   * @example
   * const minWidth = '100px'; // or "auto", "inherit" and so forth;
  */
  minWidth: PropTypes.string,
  /** Specify the maxHeight of the list body
   * (excluding the list header and footer)
   * @type {string}
   * @example
   * const maxHeight = '150px';
   *
   * const list = <ColumnList
   *  {...otherProps}
   *  maxHeight={maxHeight}
   * />
   */
  maxHeight: PropTypes.string,
  /** Whether or not to show the tip while mouse over items
   * @type {boolean}
   */
  showTips: PropTypes.bool,
  /** Whether or not to show a sorter icon and change the sort
   * of the list by clicks
   * @type {boolean}
   */
  showSorter: PropTypes.bool,
  /** Whether or not to show a filter on the header of the list
   * @type {boolean}
   */
  showFilter: PropTypes.bool,
  /** Whether or not to show a current/total counts on the footer of the list
   * @type {boolean}
   */
  showCount: PropTypes.bool,
    /** Whether or not to show a "Check All" item to control the total seleciton state
   * @type {boolean}
   */
  showCheckAll: PropTypes.bool,
  /** Specify the field name which it's value will be used
   * to sort the list
   * @type {string}
   */
  sortField: PropTypes.string,
  /** Specify the field name which it's value will be used
   * to filter the list
   * @type {string}
   */
  filterField: PropTypes.string,
  /** A placeholder text for the filter
   * @type {string}
   */
  filterPlaceholder: PropTypes.string,
  /** The default sort of the list
   * @type {sting}
   * @memberof SortOrder
   */
  defaultSort: PropTypes.string,
  /** Single or multiple mode of selection
   * @type {sting}
   * @memberof SelectionMode
   */
  selectionMode: PropTypes.string,
  /** Whether to enable the advanced WCAG support
   * @type {array}
   */
  WCAG: PropTypes.bool,
  /** Customize filter func.
   * @type {func}
   * @param { string } keyword
   * @param { object } item
   * @example
   *  const customFilter = (keyword, item) =>
   *    new RegExp(keyword, 'ig').test(item['filterField'])
   */
  filter: PropTypes.func,
  /** Fires when check or uncheck the columnlist item.
   * @event
   * @type {func}
   * @example
   *  onChange({ data, selectedItems }) {
   *    this.setState({ selectedItems })
   *  }
   */
  onChange: PropTypes.func,
  /** Customize func which render the columnlist item by self.
   * @type {func}
   * @example
   *  onItemRender({ item, index }) {
   *    const { index, disabled, selected, text } = item;
   *    return
   *     <Checkbox disabled={disabled} checked={selected}>
   *      <SafeText key={`formatter_${index}`} text={`custom ${text}`} />
   *      <span className="row-icon icon-columnlist" />
   *    </Checkbox>;
   *  }
   */
  onItemRender: PropTypes.func,
  /** Column configurations
   * @type {array}
   * @example
   * columns: [
   *   { field: 'checked', type: ColumnType.CHECKBOX },
   *   { field: 'text', type: ColumnType.TEXT },
   *   { field: 'icon', type: ColumnType.ICON }
   * ]
   */
  columns: PropTypes.arrayOf(PropTypes.shape({
    field: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    onRender: PropTypes.func
  }))
};

/** Default Props for List */
const ColumnListProps = {
  'data-qa-id': '',
  WCAG: true,
  disabled: false,
  pageMode: false,
  showTips: true,
  showSorter: false,
  showFilter: false,
  showCount: false,
  showCheckAll: false,
  sortField: 'text',
  filterField: 'text',
  defaultSort: SortOrder.ORIGIN,
  selectionMode: SelectionMode.MULTIPLE,
  columns: [
    { field: 'checked', type: ColumnType.CHECKBOX },
    { field: 'text', type: ColumnType.TEXT },
    { field: 'icon', type: ColumnType.ICON }
  ]
};

/**
 * @desc
 * The List is including single column columnlist and multiple columns columnlist, and including
 * sortable and showFilter etc. feature.
 *
 * @example
 * const dataSource = new ClientSource([
 *  { id: 1, text: 'resource 1', checked: true, icon: 'icon-adjust'}
 *  { id: 2, text: 'resource 2', checked: true, icon: 'icon-adjust'}
 *  { id: 3, text: 'resource 3', checked: true, icon: 'icon-adjust'}
 *  { id: 4, text: 'resource 4', checked: true, icon: 'icon-adjust'},
 * ]);
 *
 * <ColumnList
 *   ref={(columnlist) => { this.columnlist = columnlist; }}
 *   dataSource={dataSource}
 *   selectionMode: SelectionMode.SINGLE,
 *   disabled: false,
 *   showTips: true,
 *   showSorter: true,
 *   showFilter: true,
 *   onChange={(selectedItems) => this.setState(selectedItems)})}
 * />
 */

/** ColumnList component provide a full sortable, filterable, pagable and cachable list */
class ColumnList extends React.PureComponent {
  static displayName = 'ColumnList';
  static propTypes = ColumnListPropTypes;
  static defaultProps = ColumnListProps;

  constructor(props) {
    super(props);

    const { dataSource, pageSize, showSorter, defaultSort, columns } = this.props;

    this.state = {
      data: [],
      page: 1,
      sortOrder: showSorter ? defaultSort : null,
      isLoading: true,
      isFiltering: false,
      activeIndex: this.initActiveIndex(),
      allChecked: false,
      selectedKeys: [],
      selectedItems: [],
      filterKeyword: '',
      dataSource: this.setupDataSource(dataSource, pageSize),
      columns: this.setupRenderers(columns),
      textColumnIndex: this.findColumnIndex(columns, [{ type: ColumnType.TEXT }]),
      checkColumnIndex: this.findColumnIndex(columns, [{ type: ColumnType.CHECKBOX }])
    };

    this.quickFindValue = '';
  }

  componentDidMount() {
    this.reloadData(this.state.dataSource, this.props.pageMode);
    this.focusActiveItem();
  }

  componentWillReceiveProps = (nextProps) => {
    const selectionModeChanged = nextProps.selectionMode !== this.props.selectionMode;
    const dataSourceChanged = nextProps.dataSource !== this.props.dataSource;

    if (
      (nextProps.pageSize !== this.props.pageSize) ||
      (nextProps.pageMode !== this.props.pageMode) ||
      (nextProps.showSorter !== this.props.showSorter) ||
      (nextProps.defaultSort !== this.props.defaultSort) ||
      dataSourceChanged ||
      selectionModeChanged
    ) {
      const { dataSource, pageMode, pageSize, defaultSort, sortField } = nextProps;
      const sortOrder = defaultSort || SortOrder.ORIGIN;
      const newDataSource = this.setupDataSource(dataSource, pageSize);
      this.setState({ sortOrder, dataSource: newDataSource }, () => {
        newDataSource.sort([sortField], sortOrder);
        this.reloadData(newDataSource, pageMode, () => {
          if (selectionModeChanged || dataSourceChanged) {
            this.changeAll(false);
          }
        });
      });
    }

    if (!eq(nextProps.columns, this.props.columns)) {
      this.setState({ columns: this.setupRenderers(nextProps.columns) });
    }
  }

  componentDidUpdate() {
    this.focusActiveItem();
  }

  onFilter = ({ keyword }) => {
    const { dataSource, isFiltering } = this.state;
    if (!isFiltering) {
      this.setState({ isFiltering: true, filterKeyword: keyword }, () => {
        this.reloadData(
          this.filterDataSource(dataSource, keyword),
          this.props.pageMode
        );
      });
    }
  }

  onSort = (sortOrder) => {
    const { dataSource } = this.state;
    const { sortField, pageMode } = this.props;
    this.setState({ sortOrder }, () => {
      dataSource.sort([sortField], sortOrder);
      this.reloadData(dataSource, pageMode);
    });
  }

  onChange = () => {
    if (isFunction(this.props.onChange)) {
      const { selectedItems } = this.state;
      this.props.onChange(selectedItems);
    }
  }

  onClear = () => {
    if (!this.props.disabled) {
      this.changeAll(false);
    }
  }

  onCheckboxChange = (e, { value }, { item, index, column, columnIndex }) => {
    if (!this.props.disabled && index > -1) {
      this.updateSelection(item, index, column, columnIndex, e.target.checked);
    }
  }

  onCheckAllChange = () => {
    const { allChecked } = this.state;
    this.changeAll(!allChecked);
  }

  onItemClick = (e, { item, index }) => {
    if (!(this.props.disabled || item.disabled)) {
      const { checkColumnIndex, selectedKeys, columns, dataSource } = this.state;
      const column = columns[checkColumnIndex];
      /* istanbul ignore next */
      const columnIndex = column ? checkColumnIndex : -1;
      const checked = !(selectedKeys.indexOf(item[dataSource.getKeyField()]) > -1);
      if (!(
        e.target &&
        e.target.tagName === 'INPUT' &&
        e.target.getAttribute('type') === 'checkbox'
      )) {
        this.updateSelection(item, index, column, columnIndex, checked);
      }
    }
  }

  onItemFocus = (e, { index }) => {
    this.setActiveIndex(index);
  }

  onKeyDown = (e) => {
    if (!(e.target.tagName === 'INPUT' && e.target.type === 'text')) {
      const keyCode = e.keyCode || e.which;
      const { data, activeIndex } = this.state;

      switch (keyCode) {
        case KeyCode.UP:
        case KeyCode.DOWN: {
          const step = keyCode === KeyCode.UP ? -1 : 1;
          this.setActiveIndex(this.findNextActiveIndex(step, data, activeIndex));
          e.preventDefault();
          break;
        }
        case KeyCode.ENTER:
        case KeyCode.SPACE: {
          if (activeIndex > -1) {
            this.onItemClick(e, { item: data[activeIndex], index: activeIndex });
          } else if (this.shouldRenderCheckAll() && activeIndex === -1) {
            this.onCheckAllChange();
          }
          e.preventDefault();
          break;
        }
        default:
          break;
      }
    }
  }

  onKeyPress = (e) => {
    if (e.target !== this.filterInput) {
      const keyCode = e.keyCode || e.which;
      const char = String.fromCharCode(keyCode);
      this.triggerQuickFind(char);
    }
  }

  onKeyUp = () => {
    this.clearQuickFind();
  }

  onLoadMore = () => {
    const { pageMode, isLoading: isLoadingProp } = this.props;
    const { page, activeIndex, isLoading: isLoadingState, dataSource } = this.state;
    if (!(isLoadingProp || isLoadingState) && pageMode && page < dataSource.getPageCount()) {
      this.setLoadingStatus(true, () => {
        dataSource.getPage(page + 1).then(({ data }) => {
          const newData = this.state.data.concat(data);
          this.setState({
            activeIndex: min([newData.length - 1, activeIndex]),
            data: newData,
            isLoading: false,
            page: page + 1
          });
        });
      });
    }
  }

  setLoadingStatus(isLoading, callback) {
    this.setState({ isLoading }, () => isFunction(callback) && callback());
  }

  setActiveIndex = (activeIndex) => {
    this.setState({ activeIndex });
  }

  focusActiveItem = () => {
    const activeItem = this.container.querySelector('li.focused');
    /* istanbul ignore if */
    if (activeItem) {
      activeItem.focus();
    }
  }

  changeAll(checked, onChange = this.onChange) {
    const { columns, dataSource } = this.state;
    const { data, checkColumnIndex, filterKeyword } = this.state;
    const checkColumn = columns[checkColumnIndex];
    const newState = { allChecked: checked };

    dataSource.filter(null);
    dataSource.getData().then(({ data: allItems }) => {
      const keyField = dataSource.getKeyField();
      newState.selectedKeys = [];
      newState.selectedItems = [];

      allItems.forEach((item) => {
        if (checkColumn && isBoolean(item[checkColumn.field]) && !item.disabled) {
          item[checkColumn.field] = checked;
        }

        if (checked) {
          newState.selectedKeys.push(item[keyField]);
          newState.selectedItems.push(item);
        }
      });
      /* istanbul ignore else */
      if (checkColumn) {
        newState.data = [...data];
      }
      this.filterDataSource(dataSource, filterKeyword);
      this.setState(newState, onChange);
    });
  }

  filterDataSource = (dataSource, keyword) => {
    const { filter, filterField } = this.props;
    const filterFunc = isFunction(filter)
      ? item => filter(keyword, item)
      : item => new RegExp(keyword, 'ig').test(item[filterField]);
    dataSource.filter(filterFunc);
    return dataSource;
  }

  refFilterInput = (el) => {
    this.filterInput = el;
  }

  initActiveIndex = () => (this.shouldRenderCheckAll() ? -2 : -1);

  clearQuickFind = debounce(() => {
    this.quickFindValue = '';
  }, 600);

  triggerQuickFind = (char) => {
    this.quickFindValue += toUpper(char);
    this.quickFind(this.quickFindValue);
  }

  quickFind = debounce((value) => {
    const { columns } = this.state;
    const { data, textColumnIndex } = this.state;
    const textColumn = columns[textColumnIndex];
    if (textColumn) {
      const itemIndex = findIndex(data, (item) => {
        const textValue = toUpper(item[textColumn.field]);
        return textValue.indexOf(value) === 0;
      });

      if (itemIndex > -1) {
        this.setState({ activeIndex: itemIndex });
      }
    }
  }, 200);

  updateSelection = (item, index, column, columnIndex, checked) => {
    const { selectionMode } = this.props;
    const { columns, checkColumnIndex, dataSource } = this.state;
    const checkColumn = columns[checkColumnIndex];
    const isSingleSelection = selectionMode === SelectionMode.SINGLE;
    const newState = { activeIndex: index };
    const keyField = dataSource.getKeyField();
    const itemKey = item[keyField];
    const hasCheckColumn = checkColumn && isBoolean(item[checkColumn.field]);

    // Maintain selected state
    if (isSingleSelection) {
      if (checkColumn && item[checkColumn.field]) {
        newState.selectedKeys = checked ? [itemKey] : [];
        newState.selectedItems = checked ? [item] : [];
      } else {
        newState.selectedKeys = [itemKey];
        newState.selectedItems = [item];
      }
    } else {
      newState.selectedKeys = checked
        ? concat(this.state.selectedKeys, [itemKey])
        : this.state.selectedKeys.filter(value => value !== itemKey);
      newState.selectedItems = checked
        ? concat(this.state.selectedItems, [item])
        : this.state.selectedItems.filter(_item => _item[keyField] !== itemKey);
    }
    newState.allChecked = newState.selectedKeys.length === dataSource.getTotalRecords();

    // Maintain data
    let maintainData = Promise.resolve();
    /* istanbul ignore else */
    if (hasCheckColumn) {
      if (isSingleSelection) {
        maintainData = new Promise((resolve) => {
          this.changeAll(false, () => {
            item[checkColumn.field] = checked;
            resolve();
          });
        });
      } else {
        maintainData = new Promise((resolve) => {
          item[checkColumn.field] = checked;
          resolve();
        });
      }
    }

    maintainData.then(() => {
      /* istanbul ignore else */
      if (column && columnIndex > -1) {
        newState.data = [...this.state.data];
      }
      this.setState(newState, this.onChange);
    });
  }

  setupDataSource(dataSource, pageSize) {
    if (isArray(dataSource)) {
      const hasId = dataSource[0] && !isNil(dataSource[0].id);
      const keyField = hasId ? 'id' : '__id__';
      if (!hasId) {
        dataSource.forEach((item) => { item.__id__ = uniqueId(); });
      }
      return new ClientSource(dataSource, keyField, pageSize);
    } else if (dataSource instanceof IDataSource) {
      return dataSource;
    }
    console.warn('Invalid "dataSource" prop. It should be either an array or an instance of IDataSource');
    return new ClientSource([]);
  }

  setupRenderers(columns) {
    return columns.map((column) => {
      const { type, onRender } = column;
      let render;
      switch (type) {
        case ColumnType.CHECKBOX:
          /* istanbul ignore next */
          render = (value, props, context) => {
            props.tabIndex = isNumber(props.tabIndex) ? props.tabIndex : -1;
            props.onChange = (e, { value: v }) =>
              this.onCheckboxChange(e, { value: v }, context);
            return isBoolean(value) && columnRenderers.checkbox(value, props, context);
          };
          break;
        case ColumnType.ICON:
          render = columnRenderers.icon;
          break;
        case ColumnType.TEXT:
          render = columnRenderers.text;
          break;
        default:
          break;
      }

      render = render || (isFunction(onRender) ? onRender : columnRenderers.text);

      return {
        ...column,
        render
      };
    });
  }

  findColumnIndex(columns, conditions = []) {
    return conditions.reduce((columnIndex, condition) => (
      columnIndex === -1
        ? findIndex(columns, condition)
        : columnIndex
    ), -1);
  }

  concatPage = (dataSource, page) => ({ data }) => new Promise((resolve) => {
    dataSource.getPage(page).then(({ data: pageData }) => {
      resolve({ data: data.concat(pageData) });
    });
  });

  reloadData(dataSource, pageMode, onReload = identity) {
    const { page } = this.state;

    let promise;
    if (pageMode) {
      promise = dataSource.getPage(); // getPage() will fetch page 1 without args
      let nextPage = 2;
      while (nextPage <= page) {
        promise = promise.then(this.concatPage(dataSource, nextPage));
        nextPage += 1;
      }
    } else {
      promise = dataSource.getData();
    }
    promise.then(({ data }) => {
      this.setState({
        data,
        page: pageMode ? page : 1,
        activeIndex: this.initActiveIndex(),
        isLoading: false,
        isFiltering: false
      }, onReload);
    });
  }

  findNextActiveIndex(step, data, activeIndex) {
    const { pageMode } = this.props;
    const { page, dataSource } = this.state;
    let newActiveIndex = activeIndex;

    newActiveIndex += step;
    newActiveIndex = max([newActiveIndex, this.shouldRenderCheckAll() ? -1 : 0]);

    if (!(pageMode && page < dataSource.getPageCount())) {
      newActiveIndex = min([data.length - 1, newActiveIndex]);
    }

    return newActiveIndex;
  }

  shouldRenderCheckAll() {
    const { showCheckAll, selectionMode } = this.props;
    const isMultipleSelectionMode = selectionMode === SelectionMode.MULTIPLE;
    return showCheckAll && isMultipleSelectionMode;
  }

  render() {
    const {
      WCAG,
      width,
      message,
      pageMode,
      showTips,
      disabled,
      minWidth,
      maxHeight,
      showCount,
      showClear,
      showSorter,
      showFilter,
      showMessage,
      onItemRender,
      selectionMode,
      filterPlaceholder,
      isLoading,
      isFiltering,
      className = '',
      'data-qa-id': qaId
    } = this.props;

    const {
      data,
      columns,
      activeIndex,
      allChecked,
      selectedKeys,
      sortOrder,
      dataSource,
      isLoading: isLoadingState,
      isFiltering: isFilteringState
    } = this.state;

    const total = dataSource.getTotalRecords();
    const keyField = dataSource.getKeyField();
    const showCheckAll = this.shouldRenderCheckAll();

    return (
      <div
        ref={(container) => { this.container = container; }}
        className={`an-columnlist an-columnlist__wrapper ${className}}`}
        role="listbox"
        style={{ width, minWidth }}
        data-qa-id={qaId}
        onKeyDown={this.onKeyDown}
        onKeyPress={this.onKeyPress}
        onKeyUp={this.onKeyUp}
      >
        {showFilter && <ListHeader
          disabled={disabled}
          refFilterInput={this.refFilterInput}
          filterPlaceholder={filterPlaceholder}
          onFilter={this.onFilter}
        />}
        <ListBody
          data={data}
          WCAG={WCAG}
          showTips={showTips}
          showCheckAll={showCheckAll}
          disabled={disabled}
          keyField={keyField}
          maxHeight={maxHeight}
          selectionMode={selectionMode}
          columns={columns}
          activeIndex={activeIndex}
          allChecked={allChecked}
          selectedKeys={selectedKeys}
          onEndReached={this.onLoadMore}
          onItemClick={this.onItemClick}
          onItemFocus={this.onItemFocus}
          onItemRender={onItemRender}
          onCheckAllChange={this.onCheckAllChange}
        />
        <ListFooter
          disabled={disabled}
          isLoading={isBoolean(isLoading) ? isLoading : isLoadingState}
          showCount={showCount}
          showClear={showClear}
          showSorter={showSorter}
          showMessage={showMessage}
          count={pageMode ? `${size(data)}/${total}` : `${total}`}
          message={message}
          sortOrder={sortOrder}
          selectedKeys={selectedKeys}
          onSort={this.onSort}
          onClear={this.onClear}
        />
        {
          (isFiltering || isFilteringState) &&
          <LoadingBar className="filtering" />
        }
      </div>
    );
  }
}

const popupService = createPopupService(ColumnList);

/**
 * Popup a columnlist.
 * @function popup
 * @param {object} listOptions - Configured options of List
 * when calling the popup.
 * @param {object} popupOptions - Configured options of popup service
 * when calling the popup.
 * @returns {Promise} Returns a promise, from where we can get the selected date or error.
 */
ColumnList.popup = (listOptions = {}, popupOptions = {}) => {
  const po = {
    closeByEscape: false,
    closeWhenViewChange: true,
    ...popupOptions
  };

  return popupService.popup(po, listOptions);
};


export default ColumnList;
