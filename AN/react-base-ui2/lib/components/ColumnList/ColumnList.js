'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _promise = require('babel-runtime/core-js/promise');var _promise2 = _interopRequireDefault(_promise);var _extends2 = require('babel-runtime/helpers/extends');var _extends3 = _interopRequireDefault(_extends2);var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);var _createClass2 = require('babel-runtime/helpers/createClass');var _createClass3 = _interopRequireDefault(_createClass2);var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);var _inherits2 = require('babel-runtime/helpers/inherits');var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');var _react2 = _interopRequireDefault(_react);
var _propTypes = require('prop-types');var _propTypes2 = _interopRequireDefault(_propTypes);
var _eq = require('lodash/eq');var _eq2 = _interopRequireDefault(_eq);
var _max = require('lodash/max');var _max2 = _interopRequireDefault(_max);
var _min = require('lodash/min');var _min2 = _interopRequireDefault(_min);
var _size = require('lodash/size');var _size2 = _interopRequireDefault(_size);
var _concat = require('lodash/concat');var _concat2 = _interopRequireDefault(_concat);
var _toUpper = require('lodash/toUpper');var _toUpper2 = _interopRequireDefault(_toUpper);
var _uniqueId = require('lodash/uniqueId');var _uniqueId2 = _interopRequireDefault(_uniqueId);
var _identity = require('lodash/identity');var _identity2 = _interopRequireDefault(_identity);
var _debounce = require('lodash/debounce');var _debounce2 = _interopRequireDefault(_debounce);
var _findIndex = require('lodash/findIndex');var _findIndex2 = _interopRequireDefault(_findIndex);
var _isNil = require('lodash/isNil');var _isNil2 = _interopRequireDefault(_isNil);
var _isArray = require('lodash/isArray');var _isArray2 = _interopRequireDefault(_isArray);
var _isNumber = require('lodash/isNumber');var _isNumber2 = _interopRequireDefault(_isNumber);
var _isBoolean = require('lodash/isBoolean');var _isBoolean2 = _interopRequireDefault(_isBoolean);
var _isFunction = require('lodash/isFunction');var _isFunction2 = _interopRequireDefault(_isFunction);

var _data = require('../../common/data');var _data2 = _interopRequireDefault(_data);
var _popup = require('../../services/popup');
var _consts = require('../../consts');

var _LoadingBar = require('../LoadingBar');var _LoadingBar2 = _interopRequireDefault(_LoadingBar);

var _ListBody = require('./ListBody');var _ListBody2 = _interopRequireDefault(_ListBody);
var _ListHeader = require('./ListHeader');var _ListHeader2 = _interopRequireDefault(_ListHeader);
var _ListFooter = require('./ListFooter');var _ListFooter2 = _interopRequireDefault(_ListFooter);
var _consts2 = require('./consts');
var _columns = require('./columns');var _columns2 = _interopRequireDefault(_columns);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

/** Default PropTypes of ColumnList.
                                                                                                                                                                                    * @memberof ColumnList
                                                                                                                                                                                   */ /* eslint-disable react/no-find-dom-node */
var ColumnListPropTypes = {
  /** defined the unique id for usage of automation test
                             * @type {string}
                             */
  'data-qa-id': _propTypes2.default.string,
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
  dataSource: _propTypes2.default.oneOfType([
  _propTypes2.default.array,
  _propTypes2.default.instanceOf(_data.IDataSource)]),

  /** Disable or enable the entire list
                                                        * @type {boolean}
                                                        */
  disabled: _propTypes2.default.bool,
  /** Enable or disable the page mode of the list
                                       * @type {boolean}
                                       */
  pageMode: _propTypes2.default.bool,
  /** Number of items per page if list is in page mode and dataSource is an array
                                       * @type {number}
                                       */
  pageSize: _propTypes2.default.number,
  /** Specify the width of list
                                         * @type {string}
                                         * @example
                                         * const width = '100px'; // or "auto", "inherit" and so forth;
                                        */
  width: _propTypes2.default.string,
  /** Specify the minWidth of list
                                      * @type {string}
                                      * @example
                                      * const minWidth = '100px'; // or "auto", "inherit" and so forth;
                                     */
  minWidth: _propTypes2.default.string,
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
  maxHeight: _propTypes2.default.string,
  /** Whether or not to show the tip while mouse over items
                                          * @type {boolean}
                                          */
  showTips: _propTypes2.default.bool,
  /** Whether or not to show a sorter icon and change the sort
                                       * of the list by clicks
                                       * @type {boolean}
                                       */
  showSorter: _propTypes2.default.bool,
  /** Whether or not to show a filter on the header of the list
                                         * @type {boolean}
                                         */
  showFilter: _propTypes2.default.bool,
  /** Whether or not to show a current/total counts on the footer of the list
                                         * @type {boolean}
                                         */
  showCount: _propTypes2.default.bool,
  /** Whether or not to show a "Check All" item to control the total seleciton state
                                       * @type {boolean}
                                       */
  showCheckAll: _propTypes2.default.bool,
  /** Specify the field name which it's value will be used
                                           * to sort the list
                                           * @type {string}
                                           */
  sortField: _propTypes2.default.string,
  /** Specify the field name which it's value will be used
                                          * to filter the list
                                          * @type {string}
                                          */
  filterField: _propTypes2.default.string,
  /** A placeholder text for the filter
                                            * @type {string}
                                            */
  filterPlaceholder: _propTypes2.default.string,
  /** The default sort of the list
                                                  * @type {sting}
                                                  * @memberof SortOrder
                                                  */
  defaultSort: _propTypes2.default.string,
  /** Single or multiple mode of selection
                                            * @type {sting}
                                            * @memberof SelectionMode
                                            */
  selectionMode: _propTypes2.default.string,
  /** Whether to enable the advanced WCAG support
                                              * @type {array}
                                              */
  WCAG: _propTypes2.default.bool,
  /** Customize filter func.
                                   * @type {func}
                                   * @param { string } keyword
                                   * @param { object } item
                                   * @example
                                   *  const customFilter = (keyword, item) =>
                                   *    new RegExp(keyword, 'ig').test(item['filterField'])
                                   */
  filter: _propTypes2.default.func,
  /** Fires when check or uncheck the columnlist item.
                                     * @event
                                     * @type {func}
                                     * @example
                                     *  onChange({ data, selectedItems }) {
                                     *    this.setState({ selectedItems })
                                     *  }
                                     */
  onChange: _propTypes2.default.func,
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
  onItemRender: _propTypes2.default.func,
  /** Column configurations
                                           * @type {array}
                                           * @example
                                           * columns: [
                                           *   { field: 'checked', type: ColumnType.CHECKBOX },
                                           *   { field: 'text', type: ColumnType.TEXT },
                                           *   { field: 'icon', type: ColumnType.ICON }
                                           * ]
                                           */
  columns: _propTypes2.default.arrayOf(_propTypes2.default.shape({
    field: _propTypes2.default.string.isRequired,
    type: _propTypes2.default.string.isRequired,
    onRender: _propTypes2.default.func })) };



/** Default Props for List */
var ColumnListProps = {
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
  defaultSort: _consts.SortOrder.ORIGIN,
  selectionMode: _consts.SelectionMode.MULTIPLE,
  columns: [
  { field: 'checked', type: _consts2.ColumnType.CHECKBOX },
  { field: 'text', type: _consts2.ColumnType.TEXT },
  { field: 'icon', type: _consts2.ColumnType.ICON }] };



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

/** ColumnList component provide a full sortable, filterable, pagable and cachable list */var
ColumnList = function (_React$PureComponent) {(0, _inherits3.default)(ColumnList, _React$PureComponent);




  function ColumnList(props) {(0, _classCallCheck3.default)(this, ColumnList);var _this = (0, _possibleConstructorReturn3.default)(this, (ColumnList.__proto__ || (0, _getPrototypeOf2.default)(ColumnList)).call(this,
    props));_initialiseProps.call(_this);var _this$props =

    _this.props,dataSource = _this$props.dataSource,pageSize = _this$props.pageSize,showSorter = _this$props.showSorter,defaultSort = _this$props.defaultSort,columns = _this$props.columns;

    _this.state = {
      data: [],
      page: 1,
      sortOrder: showSorter ? defaultSort : null,
      isLoading: true,
      isFiltering: false,
      activeIndex: _this.initActiveIndex(),
      allChecked: false,
      selectedKeys: [],
      selectedItems: [],
      filterKeyword: '',
      dataSource: _this.setupDataSource(dataSource, pageSize),
      columns: _this.setupRenderers(columns),
      textColumnIndex: _this.findColumnIndex(columns, [{ type: _consts2.ColumnType.TEXT }]),
      checkColumnIndex: _this.findColumnIndex(columns, [{ type: _consts2.ColumnType.CHECKBOX }]) };


    _this.quickFindValue = '';return _this;
  }(0, _createClass3.default)(ColumnList, [{ key: 'componentDidMount', value: function componentDidMount()

    {
      this.reloadData(this.state.dataSource, this.props.pageMode);
      this.focusActiveItem();
    } }, { key: 'componentDidUpdate', value: function componentDidUpdate()































    {
      this.focusActiveItem();
    } }, { key: 'setLoadingStatus', value: function setLoadingStatus(






























































































































    isLoading, callback) {
      this.setState({ isLoading: isLoading }, function () {return (0, _isFunction2.default)(callback) && callback();});
    } }, { key: 'changeAll', value: function changeAll(













    checked) {var _this2 = this;var onChange = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.onChange;var _state =
      this.state,columns = _state.columns,dataSource = _state.dataSource;var _state2 =
      this.state,data = _state2.data,checkColumnIndex = _state2.checkColumnIndex,filterKeyword = _state2.filterKeyword;
      var checkColumn = columns[checkColumnIndex];
      var newState = { allChecked: checked };

      dataSource.filter(null);
      dataSource.getData().then(function (_ref) {var allItems = _ref.data;
        var keyField = dataSource.getKeyField();
        newState.selectedKeys = [];
        newState.selectedItems = [];

        allItems.forEach(function (item) {
          if (checkColumn && (0, _isBoolean2.default)(item[checkColumn.field]) && !item.disabled) {
            item[checkColumn.field] = checked;
          }

          if (checked) {
            newState.selectedKeys.push(item[keyField]);
            newState.selectedItems.push(item);
          }
        });
        /* istanbul ignore else */
        if (checkColumn) {
          newState.data = [].concat((0, _toConsumableArray3.default)(data));
        }
        _this2.filterDataSource(dataSource, filterKeyword);
        _this2.setState(newState, onChange);
      });
    } }, { key: 'setupDataSource', value: function setupDataSource(


































































































    dataSource, pageSize) {
      if ((0, _isArray2.default)(dataSource)) {
        var hasId = dataSource[0] && !(0, _isNil2.default)(dataSource[0].id);
        var keyField = hasId ? 'id' : '__id__';
        if (!hasId) {
          dataSource.forEach(function (item) {item.__id__ = (0, _uniqueId2.default)();});
        }
        return new _data2.default(dataSource, keyField, pageSize);
      } else if (dataSource instanceof _data.IDataSource) {
        return dataSource;
      }
      console.warn('Invalid "dataSource" prop. It should be either an array or an instance of IDataSource');
      return new _data2.default([]);
    } }, { key: 'setupRenderers', value: function setupRenderers(

    columns) {var _this3 = this;
      return columns.map(function (column) {var
        type = column.type,onRender = column.onRender;
        var render = void 0;
        switch (type) {
          case _consts2.ColumnType.CHECKBOX:
            /* istanbul ignore next */
            render = function render(value, props, context) {
              props.tabIndex = (0, _isNumber2.default)(props.tabIndex) ? props.tabIndex : -1;
              props.onChange = function (e, _ref2) {var v = _ref2.value;return (
                  _this3.onCheckboxChange(e, { value: v }, context));};
              return (0, _isBoolean2.default)(value) && _columns2.default.checkbox(value, props, context);
            };
            break;
          case _consts2.ColumnType.ICON:
            render = _columns2.default.icon;
            break;
          case _consts2.ColumnType.TEXT:
            render = _columns2.default.text;
            break;
          default:
            break;}


        render = render || ((0, _isFunction2.default)(onRender) ? onRender : _columns2.default.text);

        return (0, _extends3.default)({},
        column, {
          render: render });

      });
    } }, { key: 'findColumnIndex', value: function findColumnIndex(

    columns) {var conditions = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
      return conditions.reduce(function (columnIndex, condition) {return (
          columnIndex === -1 ?
          (0, _findIndex2.default)(columns, condition) :
          columnIndex);},
      -1);
    } }, { key: 'reloadData', value: function reloadData(







    dataSource, pageMode) {var _this4 = this;var onReload = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : _identity2.default;var
      page = this.state.page;

      var promise = void 0;
      if (pageMode) {
        promise = dataSource.getPage(); // getPage() will fetch page 1 without args
        var nextPage = 2;
        while (nextPage <= page) {
          promise = promise.then(this.concatPage(dataSource, nextPage));
          nextPage += 1;
        }
      } else {
        promise = dataSource.getData();
      }
      promise.then(function (_ref3) {var data = _ref3.data;
        _this4.setState({
          data: data,
          page: pageMode ? page : 1,
          activeIndex: _this4.initActiveIndex(),
          isLoading: false,
          isFiltering: false },
        onReload);
      });
    } }, { key: 'findNextActiveIndex', value: function findNextActiveIndex(

    step, data, activeIndex) {var
      pageMode = this.props.pageMode;var _state3 =
      this.state,page = _state3.page,dataSource = _state3.dataSource;
      var newActiveIndex = activeIndex;

      newActiveIndex += step;
      newActiveIndex = (0, _max2.default)([newActiveIndex, this.shouldRenderCheckAll() ? -1 : 0]);

      if (!(pageMode && page < dataSource.getPageCount())) {
        newActiveIndex = (0, _min2.default)([data.length - 1, newActiveIndex]);
      }

      return newActiveIndex;
    } }, { key: 'shouldRenderCheckAll', value: function shouldRenderCheckAll()

    {var _props =
      this.props,showCheckAll = _props.showCheckAll,selectionMode = _props.selectionMode;
      var isMultipleSelectionMode = selectionMode === _consts.SelectionMode.MULTIPLE;
      return showCheckAll && isMultipleSelectionMode;
    } }, { key: 'render', value: function render()

    {var _this5 = this;var _props2 =





















      this.props,WCAG = _props2.WCAG,width = _props2.width,message = _props2.message,pageMode = _props2.pageMode,showTips = _props2.showTips,disabled = _props2.disabled,minWidth = _props2.minWidth,maxHeight = _props2.maxHeight,showCount = _props2.showCount,showClear = _props2.showClear,showSorter = _props2.showSorter,showFilter = _props2.showFilter,showMessage = _props2.showMessage,onItemRender = _props2.onItemRender,selectionMode = _props2.selectionMode,filterPlaceholder = _props2.filterPlaceholder,isLoading = _props2.isLoading,isFiltering = _props2.isFiltering,_props2$className = _props2.className,className = _props2$className === undefined ? '' : _props2$className,qaId = _props2['data-qa-id'];var _state4 =











      this.state,data = _state4.data,columns = _state4.columns,activeIndex = _state4.activeIndex,allChecked = _state4.allChecked,selectedKeys = _state4.selectedKeys,sortOrder = _state4.sortOrder,dataSource = _state4.dataSource,isLoadingState = _state4.isLoading,isFilteringState = _state4.isFiltering;

      var total = dataSource.getTotalRecords();
      var keyField = dataSource.getKeyField();
      var showCheckAll = this.shouldRenderCheckAll();

      return (
        _react2.default.createElement('div', {
            ref: function ref(container) {_this5.container = container;},
            className: 'an-columnlist an-columnlist__wrapper ' + className + '}',
            role: 'listbox',
            style: { width: width, minWidth: minWidth },
            'data-qa-id': qaId,
            onKeyDown: this.onKeyDown,
            onKeyPress: this.onKeyPress,
            onKeyUp: this.onKeyUp },

          showFilter && _react2.default.createElement(_ListHeader2.default, {
            disabled: disabled,
            refFilterInput: this.refFilterInput,
            filterPlaceholder: filterPlaceholder,
            onFilter: this.onFilter }),

          _react2.default.createElement(_ListBody2.default, {
            data: data,
            WCAG: WCAG,
            showTips: showTips,
            showCheckAll: showCheckAll,
            disabled: disabled,
            keyField: keyField,
            maxHeight: maxHeight,
            selectionMode: selectionMode,
            columns: columns,
            activeIndex: activeIndex,
            allChecked: allChecked,
            selectedKeys: selectedKeys,
            onEndReached: this.onLoadMore,
            onItemClick: this.onItemClick,
            onItemFocus: this.onItemFocus,
            onItemRender: onItemRender,
            onCheckAllChange: this.onCheckAllChange }),

          _react2.default.createElement(_ListFooter2.default, {
            disabled: disabled,
            isLoading: (0, _isBoolean2.default)(isLoading) ? isLoading : isLoadingState,
            showCount: showCount,
            showClear: showClear,
            showSorter: showSorter,
            showMessage: showMessage,
            count: pageMode ? (0, _size2.default)(data) + '/' + total : '' + total,
            message: message,
            sortOrder: sortOrder,
            selectedKeys: selectedKeys,
            onSort: this.onSort,
            onClear: this.onClear }),


          (isFiltering || isFilteringState) &&
          _react2.default.createElement(_LoadingBar2.default, { className: 'filtering' })));



    } }]);return ColumnList;}(_react2.default.PureComponent);ColumnList.displayName = 'ColumnList';ColumnList.propTypes = ColumnListPropTypes;ColumnList.defaultProps = ColumnListProps;var _initialiseProps = function _initialiseProps() {var _this6 = this;this.componentWillReceiveProps = function (nextProps) {var selectionModeChanged = nextProps.selectionMode !== _this6.props.selectionMode;var dataSourceChanged = nextProps.dataSource !== _this6.props.dataSource;if (nextProps.pageSize !== _this6.props.pageSize || nextProps.pageMode !== _this6.props.pageMode || nextProps.showSorter !== _this6.props.showSorter || nextProps.defaultSort !== _this6.props.defaultSort || dataSourceChanged || selectionModeChanged) {var dataSource = nextProps.dataSource,pageMode = nextProps.pageMode,pageSize = nextProps.pageSize,defaultSort = nextProps.defaultSort,sortField = nextProps.sortField;var sortOrder = defaultSort || _consts.SortOrder.ORIGIN;var newDataSource = _this6.setupDataSource(dataSource, pageSize);_this6.setState({ sortOrder: sortOrder, dataSource: newDataSource }, function () {newDataSource.sort([sortField], sortOrder);_this6.reloadData(newDataSource, pageMode, function () {if (selectionModeChanged || dataSourceChanged) {_this6.changeAll(false);}});});}if (!(0, _eq2.default)(nextProps.columns, _this6.props.columns)) {_this6.setState({ columns: _this6.setupRenderers(nextProps.columns) });}};this.onFilter = function (_ref4) {var keyword = _ref4.keyword;var _state5 = _this6.state,dataSource = _state5.dataSource,isFiltering = _state5.isFiltering;if (!isFiltering) {_this6.setState({ isFiltering: true, filterKeyword: keyword }, function () {_this6.reloadData(_this6.filterDataSource(dataSource, keyword), _this6.props.pageMode);});}};this.onSort = function (sortOrder) {var dataSource = _this6.state.dataSource;var _props3 = _this6.props,sortField = _props3.sortField,pageMode = _props3.pageMode;_this6.setState({ sortOrder: sortOrder }, function () {dataSource.sort([sortField], sortOrder);_this6.reloadData(dataSource, pageMode);});};this.onChange = function () {if ((0, _isFunction2.default)(_this6.props.onChange)) {var selectedItems = _this6.state.selectedItems;_this6.props.onChange(selectedItems);}};this.onClear = function () {if (!_this6.props.disabled) {_this6.changeAll(false);}};this.onCheckboxChange = function (e, _ref5, _ref6) {var value = _ref5.value;var item = _ref6.item,index = _ref6.index,column = _ref6.column,columnIndex = _ref6.columnIndex;if (!_this6.props.disabled && index > -1) {_this6.updateSelection(item, index, column, columnIndex, e.target.checked);}};this.onCheckAllChange = function () {var allChecked = _this6.state.allChecked;_this6.changeAll(!allChecked);};this.onItemClick = function (e, _ref7) {var item = _ref7.item,index = _ref7.index;if (!(_this6.props.disabled || item.disabled)) {var _state6 = _this6.state,checkColumnIndex = _state6.checkColumnIndex,selectedKeys = _state6.selectedKeys,columns = _state6.columns,dataSource = _state6.dataSource;var column = columns[checkColumnIndex]; /* istanbul ignore next */var columnIndex = column ? checkColumnIndex : -1;var checked = !(selectedKeys.indexOf(item[dataSource.getKeyField()]) > -1);if (!(e.target && e.target.tagName === 'INPUT' && e.target.getAttribute('type') === 'checkbox')) {_this6.updateSelection(item, index, column, columnIndex, checked);}}};this.onItemFocus = function (e, _ref8) {var index = _ref8.index;_this6.setActiveIndex(index);};this.onKeyDown = function (e) {if (!(e.target.tagName === 'INPUT' && e.target.type === 'text')) {var keyCode = e.keyCode || e.which;var _state7 = _this6.state,data = _state7.data,activeIndex = _state7.activeIndex;switch (keyCode) {case _consts.KeyCode.UP:case _consts.KeyCode.DOWN:{var step = keyCode === _consts.KeyCode.UP ? -1 : 1;_this6.setActiveIndex(_this6.findNextActiveIndex(step, data, activeIndex));e.preventDefault();break;}case _consts.KeyCode.ENTER:case _consts.KeyCode.SPACE:{if (activeIndex > -1) {_this6.onItemClick(e, { item: data[activeIndex], index: activeIndex });} else if (_this6.shouldRenderCheckAll() && activeIndex === -1) {_this6.onCheckAllChange();}e.preventDefault();break;}default:break;}}};this.onKeyPress = function (e) {if (e.target !== _this6.filterInput) {var keyCode = e.keyCode || e.which;var char = String.fromCharCode(keyCode);_this6.triggerQuickFind(char);}};this.onKeyUp = function () {_this6.clearQuickFind();};this.onLoadMore = function () {var _props4 = _this6.props,pageMode = _props4.pageMode,isLoadingProp = _props4.isLoading;var _state8 = _this6.state,page = _state8.page,activeIndex = _state8.activeIndex,isLoadingState = _state8.isLoading,dataSource = _state8.dataSource;if (!(isLoadingProp || isLoadingState) && pageMode && page < dataSource.getPageCount()) {_this6.setLoadingStatus(true, function () {dataSource.getPage(page + 1).then(function (_ref9) {var data = _ref9.data;var newData = _this6.state.data.concat(data);_this6.setState({ activeIndex: (0, _min2.default)([newData.length - 1, activeIndex]), data: newData, isLoading: false, page: page + 1 });});});}};this.setActiveIndex = function (activeIndex) {_this6.setState({ activeIndex: activeIndex });};this.focusActiveItem = function () {var activeItem = _this6.container.querySelector('li.focused'); /* istanbul ignore if */if (activeItem) {activeItem.focus();}};this.filterDataSource = function (dataSource, keyword) {var _props5 = _this6.props,filter = _props5.filter,filterField = _props5.filterField;var filterFunc = (0, _isFunction2.default)(filter) ? function (item) {return filter(keyword, item);} : function (item) {return new RegExp(keyword, 'ig').test(item[filterField]);};dataSource.filter(filterFunc);return dataSource;};this.refFilterInput = function (el) {_this6.filterInput = el;};this.initActiveIndex = function () {return _this6.shouldRenderCheckAll() ? -2 : -1;};this.clearQuickFind = (0, _debounce2.default)(function () {_this6.quickFindValue = '';}, 600);this.triggerQuickFind = function (char) {_this6.quickFindValue += (0, _toUpper2.default)(char);_this6.quickFind(_this6.quickFindValue);};this.quickFind = (0, _debounce2.default)(function (value) {var columns = _this6.state.columns;var _state9 = _this6.state,data = _state9.data,textColumnIndex = _state9.textColumnIndex;var textColumn = columns[textColumnIndex];if (textColumn) {var itemIndex = (0, _findIndex2.default)(data, function (item) {var textValue = (0, _toUpper2.default)(item[textColumn.field]);return textValue.indexOf(value) === 0;});if (itemIndex > -1) {_this6.setState({ activeIndex: itemIndex });}}}, 200);this.updateSelection = function (item, index, column, columnIndex, checked) {var selectionMode = _this6.props.selectionMode;var _state10 = _this6.state,columns = _state10.columns,checkColumnIndex = _state10.checkColumnIndex,dataSource = _state10.dataSource;var checkColumn = columns[checkColumnIndex];var isSingleSelection = selectionMode === _consts.SelectionMode.SINGLE;var newState = { activeIndex: index };var keyField = dataSource.getKeyField();var itemKey = item[keyField];var hasCheckColumn = checkColumn && (0, _isBoolean2.default)(item[checkColumn.field]); // Maintain selected state
    if (isSingleSelection) {if (checkColumn && item[checkColumn.field]) {newState.selectedKeys = checked ? [itemKey] : [];newState.selectedItems = checked ? [item] : [];} else {newState.selectedKeys = [itemKey];newState.selectedItems = [item];}} else {newState.selectedKeys = checked ? (0, _concat2.default)(_this6.state.selectedKeys, [itemKey]) : _this6.state.selectedKeys.filter(function (value) {return value !== itemKey;});newState.selectedItems = checked ? (0, _concat2.default)(_this6.state.selectedItems, [item]) : _this6.state.selectedItems.filter(function (_item) {return _item[keyField] !== itemKey;});}newState.allChecked = newState.selectedKeys.length === dataSource.getTotalRecords(); // Maintain data
    var maintainData = _promise2.default.resolve(); /* istanbul ignore else */if (hasCheckColumn) {if (isSingleSelection) {maintainData = new _promise2.default(function (resolve) {_this6.changeAll(false, function () {item[checkColumn.field] = checked;resolve();});});} else {maintainData = new _promise2.default(function (resolve) {item[checkColumn.field] = checked;resolve();});}}maintainData.then(function () {/* istanbul ignore else */if (column && columnIndex > -1) {newState.data = [].concat((0, _toConsumableArray3.default)(_this6.state.data));}_this6.setState(newState, _this6.onChange);});};this.concatPage = function (dataSource, page) {return function (_ref10) {var data = _ref10.data;return new _promise2.default(function (resolve) {dataSource.getPage(page).then(function (_ref11) {var pageData = _ref11.data;resolve({ data: data.concat(pageData) });});});};};};
var popupService = (0, _popup.createPopupService)(ColumnList);

/**
                                                                * Popup a columnlist.
                                                                * @function popup
                                                                * @param {object} listOptions - Configured options of List
                                                                * when calling the popup.
                                                                * @param {object} popupOptions - Configured options of popup service
                                                                * when calling the popup.
                                                                * @returns {Promise} Returns a promise, from where we can get the selected date or error.
                                                                */
ColumnList.popup = function () {var listOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};var popupOptions = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var po = (0, _extends3.default)({
    closeByEscape: false,
    closeWhenViewChange: true },
  popupOptions);


  return popupService.popup(po, listOptions);
};exports.default =


ColumnList;module.exports = exports['default'];