'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);var _defineProperties = require('babel-runtime/core-js/object/define-properties');var _defineProperties2 = _interopRequireDefault(_defineProperties);var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);var _extends2 = require('babel-runtime/helpers/extends');var _extends3 = _interopRequireDefault(_extends2);var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);var _createClass2 = require('babel-runtime/helpers/createClass');var _createClass3 = _interopRequireDefault(_createClass2);var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);var _inherits2 = require('babel-runtime/helpers/inherits');var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');var _react2 = _interopRequireDefault(_react);
var _reactDom = require('react-dom');
var _propTypes = require('prop-types');var _propTypes2 = _interopRequireDefault(_propTypes);
var _cloneDeep = require('lodash/cloneDeep');var _cloneDeep2 = _interopRequireDefault(_cloneDeep);
var _isArray = require('lodash/isArray');var _isArray2 = _interopRequireDefault(_isArray);
var _isFunction = require('lodash/isFunction');var _isFunction2 = _interopRequireDefault(_isFunction);
var _sortBy = require('lodash/sortBy');var _sortBy2 = _interopRequireDefault(_sortBy);
var _reverse = require('lodash/reverse');var _reverse2 = _interopRequireDefault(_reverse);
var _findIndex = require('lodash/findIndex');var _findIndex2 = _interopRequireDefault(_findIndex);
var _find = require('lodash/find');var _find2 = _interopRequireDefault(_find);
var _toString = require('lodash/toString');var _toString2 = _interopRequireDefault(_toString);

var _popup = require('../../services/popup');
var _consts = require('../../consts');

var _Body = require('./Body');var _Body2 = _interopRequireDefault(_Body);
var _Header = require('./Header');var _Header2 = _interopRequireDefault(_Header);
var _Bottom = require('./Bottom');var _Bottom2 = _interopRequireDefault(_Bottom);
var _consts2 = require('./consts');function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

var defaultFilter = function defaultFilter(_ref) {var filter = _ref.filter,data = _ref.data,_ref$filterField = _ref.filterField,filterField = _ref$filterField === undefined ? 'text' : _ref$filterField,isFuzzy = _ref.isFuzzy;
  if (filter && (0, _isArray2.default)(data) && filterField) {
    return data.filter(function (row) {
      var text = row[filterField];
      var reg = isFuzzy ? new RegExp(filter, 'ig') : new RegExp('^' + filter, 'g');
      return reg.test(text);
    });
  }

  return data;
};

/** Default PropTypes of List.
    * @memberof List
   */ /* eslint-disable react/no-find-dom-node */
var ListPropTypes = {
  /** defined the unique id for usage of automation test
                       * @type {string}
                       */
  'data-qa-id': _propTypes2.default.string,
  /** Determines the skin prefix of list.
                                             * @type {string}
                                             */
  prefix: _propTypes2.default.string,
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
  data: _propTypes2.default.arrayOf(_propTypes2.default.shape({
    index: _propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.string]).isRequired,
    text: _propTypes2.default.string.isRequired,
    value: _propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.string]).isRequired,
    disabled: _propTypes2.default.bool,
    selected: _propTypes2.default.bool,
    showTips: _propTypes2.default.bool,
    icon: _propTypes2.default.string,
    renderer: _propTypes2.default.func })).
  isRequired,
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
  config: _propTypes2.default.shape({
    selectionMode: _propTypes2.default.oneOf(
    [_consts.SelectionMode.SINGLE, _consts.SelectionMode.MULTIPLE]),
    listType: _propTypes2.default.oneOf(
    [_consts2.ListType.SINGLE, _consts2.ListType.MULTIPLE]),
    disabled: _propTypes2.default.bool,
    maxHeight: _propTypes2.default.string,
    showTips: _propTypes2.default.bool,
    showIcon: _propTypes2.default.bool,
    checkable: _propTypes2.default.bool,
    sortable: _propTypes2.default.bool,
    filterable: _propTypes2.default.bool,
    asyncable: _propTypes2.default.bool,
    isFuzzy: _propTypes2.default.bool,
    sortField: _propTypes2.default.string,
    filterField: _propTypes2.default.string,
    WCAG: _propTypes2.default.bool,
    allowDeselect: _propTypes2.default.bool }).
  isRequired,
  /** Gets or sets the selected Item's index.
               * @type {array}
               */
  selectedIndex: _propTypes2.default.arrayOf(_propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.string])),
  /** Gets or sets the selected Item's value.
                                                                                                                                        * @type {array}
                                                                                                                                        */
  selectedValue: _propTypes2.default.arrayOf(_propTypes2.default.string),
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
  filterer: _propTypes2.default.func,
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
  sorter: _propTypes2.default.func,
  /** Fires when check or uncheck the list item.
                                     * @event
                                     * @type {func}
                                     * @example
                                     *  onChange({ item }) {
                                     *   console.log('clicked item', item);
                                     *   this.val.value = JSON.stringify(this.list.value);
                                     *  }
                                     */
  onChange: _propTypes2.default.func,
  /** Fires when scroll to the list bottom.
                                       * @event
                                       * @type {func}
                                       */
  onScrollToBottom: _propTypes2.default.func,
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
  renderer: _propTypes2.default.func };


/** Default Props for List */
var ListProps = {
  'data-qa-id': '',
  prefix: _consts.DefaultCSSPrefix + '-',
  data: [],
  config: {
    /** Determines the selection mode of list.
             * @type {Number}
             * - 0= SINGLE
             * - 1= MULTIPLE
             */
    selectionMode: _consts.SelectionMode.SINGLE,
    /** Determines the column mode of list.
                                                  * @type {Number}
                                                  * - 0= SINGLE
                                                  * - 1= MULTIPLE
                                                  */
    listType: _consts2.ListType.SINGLE,
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
    filterField: 'text' },

  selectedIndex: [],
  filterer: undefined,
  sorter: undefined,
  onChange: undefined,
  renderer: undefined };


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

/** List Component provide a full list. */var
List = function (_React$PureComponent) {(0, _inherits3.default)(List, _React$PureComponent);




  function List(props) {(0, _classCallCheck3.default)(this, List);var _this = (0, _possibleConstructorReturn3.default)(this, (List.__proto__ || (0, _getPrototypeOf2.default)(List)).call(this,
    props));_initialiseProps.call(_this);var _this$props =

    _this.props,data = _this$props.data,selectedIndex = _this$props.selectedIndex;

    _this.state = {
      data: data, // the orginal data
      dataView: (0, _cloneDeep2.default)(data), // the data used for view, this data can be sorted, filterd.
      sortOrder: _consts.SortOrder.ORIGIN,
      filter: '',
      isLoading: false,
      selectedIndex: (0, _isArray2.default)(selectedIndex) ? selectedIndex : [selectedIndex] };


    _this.state = (0, _extends3.default)({},
    _this.state, {
      activeIndex: _this.findRowIndexByDataIndex(_this.state.selectedIndex[0]) });return _this;

  }(0, _createClass3.default)(List, [{ key: 'componentDidUpdate', value: function componentDidUpdate()


























































    {var
      WCAG = this.props.config.WCAG;
      if (WCAG) {
        var bodyList = (0, _reactDom.findDOMNode)(this.body);
        var activeItem = bodyList.querySelector('.focus');
        if (activeItem) {
          setTimeout(function () {return activeItem.focus();}, 0);
        }
      }
    } }, { key: 'onCheckAll', value: function onCheckAll(

    checked) {var _this2 = this;var
      onChange = this.props.onChange;
      var data = (0, _cloneDeep2.default)(this.state.data).map(
      function (row) {return (0, _extends3.default)({}, row, { selected: row.disabled ? row.selected : checked });});
      this.setData(data, function () {return (0, _isFunction2.default)(onChange) && onChange(_this2.selectedIndex);});
    } }, { key: 'onFilter', value: function onFilter(_ref2)

    {var _this3 = this;var filter = _ref2.filter;var
      data = this.state.data;
      this.setState({ filter: filter }, function () {return _this3.setData(data);});
    } }, { key: 'onSort', value: function onSort(

    sortOrder) {var _this4 = this;var
      data = this.state.data;
      this.setState({ sortOrder: sortOrder }, function () {return _this4.setData(data);});
    } }, { key: 'onChange', value: function onChange(_ref3)

    {var _this5 = this;var item = _ref3.item;var
      selectedIndex = this.state.selectedIndex;var _props =
      this.props,onChange = _props.onChange,_props$config = _props.config,selectionMode = _props$config.selectionMode,allowDeselect = _props$config.allowDeselect;
      var newValue = [];

      if (selectionMode === _consts.SelectionMode.SINGLE) {
        if (allowDeselect && selectedIndex.some(function (idx) {return '' + idx === '' + item.index;})) {
          newValue = [];
        } else {
          newValue = [item.index];
        }
      } else if (selectionMode === _consts.SelectionMode.MULTIPLE) {
        var isExisting = selectedIndex.some(function (idx) {return '' + idx === '' + item.index;});
        if (allowDeselect && isExisting) {
          newValue = selectedIndex.filter(function (idx) {return '' + idx !== '' + item.index;});
        } else {
          newValue = selectedIndex.slice(0);
          if (!isExisting) {
            newValue.push(item.index);
          }
        }
      }

      this.setState({
        selectedIndex: newValue,
        activeIndex: this.findRowIndexByDataIndex(item.index) },

      function () {return (0, _isFunction2.default)(onChange) && onChange(_this5.selectedIndex);});
    } }, { key: 'onScrollToBottom', value: function onScrollToBottom()

    {var _props2 =
      this.props,onScrollToBottom = _props2.onScrollToBottom,asyncable = _props2.config.asyncable;
      if (asyncable && (0, _isFunction2.default)(onScrollToBottom)) {
        this.setLoadingStatus(true, onScrollToBottom);
      }
    } }, { key: 'onFocus', value: function onFocus()

    {
      this.setState({
        activeIndex: this.state.activeIndex === -1 ?
        this.findNextActiveIndex(_consts.KeyCode.DOWN, -1) :
        this.state.activeIndex });

    } }, { key: 'onBlur', value: function onBlur()

    {
    } }, { key: 'onKeyDown', value: function onKeyDown(

    e) {
      var keyCode = e.keyCode || e.which;

      switch (keyCode) {
        case _consts.KeyCode.UP:
        case _consts.KeyCode.DOWN:{var
            activeIndex = this.state.activeIndex;
            var newActiveIndex = this.findNextActiveIndex(keyCode, activeIndex);
            this.setState({ activeIndex: newActiveIndex });
            e.preventDefault();
            break;
          }
        case _consts.KeyCode.ENTER:
        case _consts.KeyCode.SPACE:{var _state =
            this.state,_activeIndex = _state.activeIndex,dataView = _state.dataView;
            this.onChange({ item: dataView[_activeIndex] });
            e.preventDefault();
            break;
          }
        default:
          break;}

    } }, { key: 'setLoadingStatus', value: function setLoadingStatus(

    isLoading, callback) {
      this.setState({ isLoading: isLoading }, function () {return (0, _isFunction2.default)(callback) && callback();});
    } }, { key: 'setData', value: function setData(

    newData, callBack) {var _state2 =
      this.state,_state2$sortOrder = _state2.sortOrder,sortOrder = _state2$sortOrder === undefined ? _consts.SortOrder.ORIGIN : _state2$sortOrder,filter = _state2.filter;var _props$config2 =


      this.props.config,sortable = _props$config2.sortable,sorter = _props$config2.sorter,sortField = _props$config2.sortField,filterable = _props$config2.filterable,filterer = _props$config2.filterer,filterField = _props$config2.filterField,isFuzzy = _props$config2.isFuzzy;
      var dataView = newData;

      if (sortable && sortOrder !== _consts.SortOrder.ORIGIN) {
        if ((0, _isFunction2.default)(sorter)) {
          dataView = (0, _cloneDeep2.default)(dataView).sort(sorter({ orderBy: sortField }));
        } else {
          dataView = (0, _sortBy2.default)((0, _cloneDeep2.default)(dataView), function (row) {return row[sortField];});
        }

        if (sortOrder === _consts.SortOrder.DESC) {
          dataView = (0, _reverse2.default)(dataView);
        }
      }

      if (filterable && filter) {
        var myFilterer = (0, _isFunction2.default)(filterer) ? filterer : defaultFilter;
        dataView = myFilterer({ filter: filter, filterField: filterField, isFuzzy: isFuzzy, data: dataView });
      }

      this.setState({ data: newData, dataView: dataView },
      function () {return (0, _isFunction2.default)(callBack) && callBack();});

    } }, { key: 'findNextActiveIndex', value: function findNextActiveIndex(

    keyCode, activeIndex) {var
      dataView = this.state.dataView;
      var newActiveIndex = activeIndex;
      switch (keyCode) {
        case _consts.KeyCode.UP:
          newActiveIndex -= 1;
          break;
        case _consts.KeyCode.DOWN:
          newActiveIndex += 1;
          break;
        default:
          break;}


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
    } }, { key: 'findRowIndexByDataIndex', value: function findRowIndexByDataIndex(

    dataIndex, dataView) {
      var dv = dataView || this.state.dataView;
      var idx = (0, _findIndex2.default)(dv, function (row) {return (0, _toString2.default)(row.index) === (0, _toString2.default)(dataIndex);});
      return idx;
    } }, { key: 'appendData', value: function appendData(

    newData) {var _this6 = this;
      if ((0, _isArray2.default)(newData)) {
        var data = this.state.data;
        this.setData(data.concat(newData), function () {return _this6.setLoadingStatus(false);});
      }
    } }, { key: 'render', value: function render()

    {var _this7 = this;var _props3 =
      this.props,prefix = _props3.prefix,config = _props3.config,_props3$className = _props3.className,className = _props3$className === undefined ? '' : _props3$className,style = _props3.style,qaId = _props3['data-qa-id'],rest = (0, _objectWithoutProperties3.default)(_props3, ['prefix', 'config', 'className', 'style', 'data-qa-id']);
      return (
        _react2.default.createElement('div', {
            ref: function ref(container) {_this7.container = container;},
            className: prefix + 'list ' + prefix + 'list__wrapper ' + className,
            role: 'listbox',
            style: style,
            'data-qa-id': qaId,
            onFocus: config.WCAG && function () {return _this7.onFocus();},
            onBlur: config.WCAG && function () {return _this7.onBlur();},
            onKeyDown: config.WCAG && function (e) {return _this7.onKeyDown(e);},
            tabIndex: config.WCAG && -1 },

          _react2.default.createElement(_Header2.default, {
            config: (0, _extends3.default)({}, config, { prefix: prefix }),
            onFilter: function onFilter(filter) {return _this7.onFilter(filter);} }),

          _react2.default.createElement(_Body2.default, (0, _extends3.default)({
            ref: function ref(body) {_this7.body = body;} },
          rest, {
            config: (0, _extends3.default)({}, config, { prefix: prefix }),
            data: this.state.dataView,
            activeIndex: this.state.activeIndex,
            selectedIndex: this.state.selectedIndex,
            onChange: function onChange(_ref4) {var item = _ref4.item;return _this7.onChange({ item: item });},
            onScrollToBottom: function onScrollToBottom() {return _this7.onScrollToBottom();} })),

          _react2.default.createElement(_Bottom2.default, {
            config: (0, _extends3.default)({}, config, { prefix: prefix }),
            onCheckAll: function onCheckAll(checked) {return _this7.onCheckAll(checked);},
            data: this.state.dataView,
            onSort: function onSort(sortField) {return _this7.onSort(sortField);},
            isLoading: this.state.isLoading })));



    } }]);return List;}(_react2.default.PureComponent);List.displayName = 'List';List.propTypes = ListPropTypes;List.defaultProps = ListProps;var _initialiseProps = function _initialiseProps() {var _this8 = this;this.componentDidMount = function () {(0, _defineProperties2.default)(_this8, { selectedIndex: { get: function get() {return this.state.selectedIndex;}, set: function set(v) {this.setState({ selectedIndex: v, activeIndex: (0, _isArray2.default)(v) && v.length ? this.findRowIndexByDataIndex(v[0]) : this.state.activeIndex });} } });(0, _defineProperties2.default)(_this8, { selectedValue: { get: function get() {var _state3 = this.state,_state3$selectedIndex = _state3.selectedIndex,selectedIndex = _state3$selectedIndex === undefined ? [] : _state3$selectedIndex,dataView = _state3.dataView;return selectedIndex.map(function (idx) {return (0, _find2.default)(dataView, function (row) {return (0, _toString2.default)(row.index) === (0, _toString2.default)(idx);});});}, set: function set(v) {var _state4 = this.state,dataView = _state4.dataView,selectedIndex = _state4.selectedIndex,selectionMode = _state4.config.selectionMode;var foundRow = (0, _find2.default)(dataView, function (row) {return row.value === v;});if (foundRow && !selectedIndex.some(function (idx) {return (0, _toString2.default)(foundRow) === (0, _toString2.default)(idx);})) {var newSelectedIndex = selectionMode === _consts.SelectionMode.SINGLE ? [foundRow.index] : [].concat((0, _toConsumableArray3.default)(selectedIndex), [foundRow.index]);this.setState({ selectedIndex: newSelectedIndex });}} } });var WCAG = _this8.props.config.WCAG;if (WCAG) {var bodyList = (0, _reactDom.findDOMNode)(_this8.body);var activeItem = bodyList.querySelector('.focus');if (activeItem) {setTimeout(function () {return activeItem.focus();}, 0);} else {setTimeout(function () {return _this8.container.focus();}, 0);}}};this.componentWillReceiveProps = function (nextProps) {if (nextProps.selectedIndex !== _this8.props.selectedIndex) {_this8.selectedIndex = nextProps.selectedIndex;}if (nextProps.data !== _this8.props.data) {_this8.setData(nextProps.data);}};};


var popupService = (0, _popup.createPopupService)(List);

/**
                                                          * Popup a list.
                                                          * @function popup
                                                          * @param {object} listOptions - Configured options of List
                                                          * when calling the popup.
                                                          * @param {object} popupOptions - Configured options of popup service
                                                          * when calling the popup.
                                                          * @returns {Promise} Returns a promise, from where we can get the selected date or error.
                                                          */
List.popup = function () {var listOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};var popupOptions = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var po = (0, _extends3.default)({
    closeByEscape: false,
    closeWhenViewChange: true },
  popupOptions);


  return popupService.popup(po, listOptions);
};exports.default =


List;module.exports = exports['default'];