'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _extends2 = require('babel-runtime/helpers/extends');var _extends3 = _interopRequireDefault(_extends2);var _defineProperty2 = require('babel-runtime/helpers/defineProperty');var _defineProperty3 = _interopRequireDefault(_defineProperty2);var _keys = require('babel-runtime/core-js/object/keys');var _keys2 = _interopRequireDefault(_keys);var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);var _createClass2 = require('babel-runtime/helpers/createClass');var _createClass3 = _interopRequireDefault(_createClass2);var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);var _inherits2 = require('babel-runtime/helpers/inherits');var _inherits3 = _interopRequireDefault(_inherits2);var _react = require('react');var _react2 = _interopRequireDefault(_react);
var _propTypes = require('prop-types');var _propTypes2 = _interopRequireDefault(_propTypes);
var _isFunction = require('lodash/isFunction');var _isFunction2 = _interopRequireDefault(_isFunction);
var _cloneDeep = require('lodash/cloneDeep');var _cloneDeep2 = _interopRequireDefault(_cloneDeep);
var _isArray = require('lodash/isArray');var _isArray2 = _interopRequireDefault(_isArray);
var _isEqual = require('lodash/isEqual');var _isEqual2 = _interopRequireDefault(_isEqual);
var _isString = require('lodash/isString');var _isString2 = _interopRequireDefault(_isString);
var _isObject = require('lodash/isObject');var _isObject2 = _interopRequireDefault(_isObject);
var _isNil = require('lodash/isNil');var _isNil2 = _interopRequireDefault(_isNil);
var _isNaN = require('lodash/isNaN');var _isNaN2 = _interopRequireDefault(_isNaN);
var _isNumber = require('lodash/isNumber');var _isNumber2 = _interopRequireDefault(_isNumber);
var _uniqueId = require('lodash/uniqueId');var _uniqueId2 = _interopRequireDefault(_uniqueId);
var _isNull = require('lodash/isNull');var _isNull2 = _interopRequireDefault(_isNull);
var _isUndefined = require('lodash/isUndefined');var _isUndefined2 = _interopRequireDefault(_isUndefined);
var _moment = require('moment');
var _classnames = require('classnames');var _classnames2 = _interopRequireDefault(_classnames);
var _Tabbable = require('../../services/wcag/Tabbable');var _Tabbable2 = _interopRequireDefault(_Tabbable);
var _consts = require('../../consts');
var _consts2 = require('./consts');function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

/**
                                                                                                                                  * Default Props for Table
                                                                                                                                  * @name defaultTableProps
                                                                                                                                  * @const
                                                                                                                                  */
var defaultTableProps = {
  /**
                           * @type {String}
                           * @desc Determines the skin prefix of table.
                           */
  prefix: _consts.DefaultCSSPrefix + '-',
  /**
                                           * @type {String}
                                           * @desc Specified class name for the table.
                                           */
  className: '',
  /**
                  * @type {Boolean}
                  * @desc Determines the table is sortable or not.
                  */
  sortable: false,
  /**
                    * @type {Boolean}
                    * @desc Determines the table is resizable or not.
                    */
  resizable: false,
  /**
                     * @type {Boolean}
                     * @desc Determines the table has borders between rows or not.
                     */
  rowSeperator: false,
  /**
                        * @type {Boolean}
                        * @desc Determines the table is striped or not.
                        */
  striped: true,
  /**
                  * @type {Number}
                  * @desc Determines the min width of the column.
                  */
  minWidth: 30,
  /**
                 * @type {String}
                 * @desc Determines the default fixed row's position in the table.
                 */
  fixed: _consts2.FixedPosition.BOTTOM,
  /**
                                         * @type {String}
                                         * @desc Expand control aria-label text
                                         */
  ariaLableExpand: '',
  /**
                        * @type {String}
                        * @desc Collapse control aria-label text
                        */
  ariaLableCollapse: '',
  /**
                          * @type {Function}
                          * @desc Callback when row expanding.
                          */
  onExpand: function onExpand(row) {return row;},
  /**
                                                   * @type {Function}
                                                   * @desc Callback when row collapsing.
                                                   */
  onCollapse: function onCollapse(row) {return row;} };

var TablePropTypes =
{
  /**
   * Determines the class prefix of table.
   */
  prefix: _propTypes2.default.string,
  /**
                                       * Specified class name for the table.
                                       */
  className: _propTypes2.default.string,
  /**
                                          * Determines the table is sortable or not.
                                          */
  sortable: _propTypes2.default.bool,
  /**
                                       * Determines the table is resizable or not.
                                       */
  resizable: _propTypes2.default.bool,
  /**
                                        * Determines the table has borders between rows or not.
                                        */
  rowSeperator: _propTypes2.default.bool,
  /**
                                           * Determines the table is striped or not.
                                           */
  striped: _propTypes2.default.bool,
  /**
                                      * Determines the min width of the column.
                                      */
  minWidth: _propTypes2.default.number,
  /**
                                         * Determines the default fixed row's position in the table.
                                         */
  fixed: _propTypes2.default.oneOf([_consts2.FixedPosition.TOP, _consts2.FixedPosition.BOTTOM]),
  /**
                                                                                                  * Determines the aria-label text on expanded
                                                                                                  */
  ariaLableExpand: _propTypes2.default.string,
  /**
                                                * Determines the aria-label text on collapsed
                                                */
  ariaLableCollapse: _propTypes2.default.string,
  /**
                                                  *  Callback when row expanding.
                                                  */
  onExpand: _propTypes2.default.func,
  /**
                                       * Callback when row collapsing.
                                       */
  onCollapse: _propTypes2.default.func,
  /**
                                         * Collection of structured data to render.
                                         * @typedef {Object} RowData
                                         * @property {Object} data Plain Javascript object hold the row's data
                                         * @property {Boolean} expanded Determines the child rows expanded or not
                                         * @property {Boolean} hidden Determins the row is hidden or not
                                         * @property {String} className Specify row specified class name
                                         * @property {Number} fixed Fix row at specified position in the table
                                         * - 'top'
                                         * - 'bottom'
                                         * @property {String} expandControl Key name determines which column
                                         *                                  should be the expand control
                                         * @property {Array.<RowData>} extraRows An array of RowData contains extra rows for current row
                                         * @property {Array.<RowData>} children
                                         * An object array of RowData contains child rows for current row,
                                         * and the child rows could be expanded or collapsed
                                         */
  rows: _propTypes2.default.arrayOf(
  _propTypes2.default.shape({
    data: _propTypes2.default.object.isRequired,
    expanded: _propTypes2.default.bool,
    hidden: _propTypes2.default.bool,
    className: _propTypes2.default.string,
    fixed: _propTypes2.default.number,
    expandControl: _propTypes2.default.string,
    extraRows: _propTypes2.default.array,
    children: _propTypes2.default.shape(_propTypes2.default.arrayOf(_propTypes2.default.object)) })).

  isRequired,
  /**
               * Data rendering descriptions.
               * @type {Array.<ColumnDef>}
               * @desc Data rendering descriptions.
               * @typedef {Object} ColumnDef
               * @property {String} title Title of this column
               * @property {String} keyName Data's key name for this column in RowData's data property
               * @property {String} className Specify column specified class name
               * @property {Number} colSpan Specify cell to cross columns
               * @property {Function} format Function to format cell date
               * @property {Function} render Function to customize the cell rendering
               * @property {Function({*}, {*}):Number} sorter Customer sort function for sorting column
               */
  columns: _propTypes2.default.arrayOf(
  _propTypes2.default.shape({
    title: _propTypes2.default.string.isRequired,
    keyName: _propTypes2.default.string.isRequired,
    className: _propTypes2.default.string,
    colSpan: _propTypes2.default.number,
    format: _propTypes2.default.func,
    render: _propTypes2.default.func,
    sorter: _propTypes2.default.oneOfType([_propTypes2.default.func, _propTypes2.default.bool]) })).

  isRequired };


/**
                 * @desc
                 * Table to render a collection of structured data
                 * with nested rows and sorting support
                 *
                 * @example
                 * const rows = [
                 *  { data: { a: 'hello', b: 'world', c: 'row 1' } },
                 *  { data: { a: 'hello', b: 'world', c: 'row 2' } },
                 *  { data: { a: 'hello', b: 'world', c: 'row 3' } }
                 * ]
                 *
                 * const columns = [
                 *  { title: 'Column A', keyName: 'a' },
                 *  { title: 'Column B', keyName: 'b' },
                 *  { title: 'Column C', keyName: 'c' },
                 * ]
                 *
                 * <Table rows={rows} columns={columns} />
                 */var
Table = function (_Component) {(0, _inherits3.default)(Table, _Component);







  function Table(props) {(0, _classCallCheck3.default)(this, Table);var _this = (0, _possibleConstructorReturn3.default)(this, (Table.__proto__ || (0, _getPrototypeOf2.default)(Table)).call(this,
    props));_initialiseProps.call(_this);
    _this.tableKey = (0, _uniqueId2.default)();
    var rows = _this.prepareRows(props.rows);

    _this.state = {
      rows: rows,
      originalRows: (0, _cloneDeep2.default)(rows),
      columns: (0, _cloneDeep2.default)(props.columns) };return _this;

  }(0, _createClass3.default)(Table, [{ key: 'componentWillReceiveProps', value: function componentWillReceiveProps(

    nextProps) {
      var newState = {};

      if (!(0, _isEqual2.default)(this.props.rows, nextProps.rows)) {
        var rows = this.prepareRows(nextProps.rows);
        newState.rows = rows;
        newState.originalRows = (0, _cloneDeep2.default)(rows);
      }

      if (!(0, _isEqual2.default)(this.props.columns, nextProps.columns)) {
        newState.columns = (0, _cloneDeep2.default)(nextProps.columns);
      }

      if ((0, _keys2.default)(newState).length) {
        this.setState(newState);
      }
    } }, { key: 'render', value: function render()
































































































































































































































































































































































    {var _props =
      this.props,prefix = _props.prefix,className = _props.className,resizable = _props.resizable;
      return (
        _react2.default.createElement('table', { role: 'grid', className: (0, _classnames2.default)('table', 'an-table', 'noMarginBottom', className, prefix + 'table', { resizable: resizable }) },
          this.renderTableHead(),
          this.renderTableBody()));


    } }]);return Table;}(_react.Component);Table.displayName = 'Table';Table.defaultProps = defaultTableProps;Table.propTypes = TablePropTypes;var _initialiseProps = function _initialiseProps() {var _this2 = this;this.getSorter = function (_ref) {var sortOrder = _ref.sortOrder,columnSorter = _ref.sorter;var sorter = (0, _isFunction2.default)(columnSorter) ? columnSorter : _this2.defaultSorter;return sortOrder === _consts.SortOrder.DESC ? function () {return -sorter.apply(undefined, arguments);} : sorter;};this.prepareRows = function (propRows) {var rows = (0, _cloneDeep2.default)(propRows);_this2.patchKeys(rows);return rows;};this.patchKeys = function (rows) {var hasChildren = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;var rowKey = arguments[2];rows.forEach(function (row, rowIndex) {row._key = hasChildren ? rowKey + '_child' + rowIndex : _this2.tableKey + '_row' + rowIndex;if ((0, _isArray2.default)(row.extraRows)) {row.extraRows.forEach(function (extraRow, extraRowIndex) {extraRow._key = row._key + '_extra' + extraRowIndex;});}if ((0, _isObject2.default)(row.children) && (0, _isArray2.default)(row.children.rows)) {_this2.patchKeys(row.children.rows, true, row._key);}});};this.toggleRowExpandState = function (rowIndexes) {var rows = (0, _cloneDeep2.default)(_this2.state.rows);var _props2 = _this2.props,onExpand = _props2.onExpand,onCollapse = _props2.onCollapse;var row = void 0;var children = void 0;rowIndexes.forEach(function (rowIndex) {row = (0, _isObject2.default)(children) && (0, _isArray2.default)(children.rows) ? children.rows[rowIndex] : rows[rowIndex];children = row.children;});row.expanded = !row.expanded;if (row.expanded) {if ((0, _isFunction2.default)(onExpand)) {onExpand(row);}} else if ((0, _isFunction2.default)(onCollapse)) {onCollapse(row);}_this2.setState({ rows: rows });};this.loopSortOrder = function (column, index) {var _column$sortOrder = column.sortOrder,sortOrder = _column$sortOrder === undefined ? _consts.SortOrder.ORIGIN : _column$sortOrder;var newSortOrder = void 0;if (sortOrder === _consts.SortOrder.ORIGIN) {newSortOrder = _consts.SortOrder.DESC;} else if (sortOrder === _consts.SortOrder.DESC) {newSortOrder = _consts.SortOrder.ASC;} else {newSortOrder = _consts.SortOrder.ORIGIN;}var columns = (0, _cloneDeep2.default)(_this2.state.columns);columns.forEach(function (col, i) {if (i === index) {col.sortOrder = newSortOrder;} else {delete col.sortOrder;}});var rows = _this2.sortRows(columns[index]);_this2.setState({ columns: columns, rows: rows });};this.defaultSorter = function (_ref2, _ref3) {var a = _ref2.value;var b = _ref3.value;if ((0, _moment.isMoment)(a) && (0, _moment.isMoment)(b)) {return a.diff(b);} else if ((0, _isString2.default)(a) && (0, _isString2.default)(b)) {var aa = a.toLowerCase();var bb = b.toLowerCase();if (aa < bb) return -1;if (aa > bb) return 1;return 0;} else if ((0, _isNil2.default)(a) && !(0, _isNil2.default)(b)) {return -1;} else if ((0, _isNil2.default)(a) && (0, _isNil2.default)(b)) {return 0;} else if (!(0, _isNil2.default)(a) && (0, _isNil2.default)(b)) {return 1;} // Number, Date and Boolean support sub operator
    // Different types comparison returns 0
    var result = a - b;return !(0, _isNumber2.default)(result) || (0, _isNaN2.default)(result) ? 0 : result;};this.sortRows = function (column) {var _fixedRows;var sortOrder = column.sortOrder,keyName = column.keyName;var _props$fixed = _this2.props.fixed,defaultFixedPosition = _props$fixed === undefined ? _consts2.FixedPosition.BOTTOM : _props$fixed;var originalRows = (0, _cloneDeep2.default)(_this2.state.originalRows);if (sortOrder === _consts.SortOrder.ORIGIN) {return originalRows;}var sortableRows = [];var fixedRows = (_fixedRows = {}, (0, _defineProperty3.default)(_fixedRows, _consts2.FixedPosition.TOP, []), (0, _defineProperty3.default)(_fixedRows, _consts2.FixedPosition.BOTTOM, []), _fixedRows);originalRows.forEach(function (row) {var fixedRowContainer = fixedRows[row.fixed]; // Row could be fixed at the top or the bottom of the rows,
      // this could be controlled by the row "fixed" property.
      // RowData: { data: {...}, fixed: FixedPosition.TOP }
      if ((0, _isArray2.default)(fixedRowContainer)) {fixedRowContainer.push(row);} else if (Object.prototype.hasOwnProperty.call(row.data, keyName)) {sortableRows.push(row);} else {fixedRows[defaultFixedPosition].push(row);}});var mappedSortableRows = sortableRows.map(function (row, index) {var value = row.data[keyName + 'Sort'];if ((0, _isNull2.default)(value) || (0, _isUndefined2.default)(value) || (0, _isNaN2.default)(value)) {value = row.data[keyName];}return { index: index, row: row, value: value };});mappedSortableRows.sort(_this2.getSorter(column));return fixedRows[_consts2.FixedPosition.TOP].concat(mappedSortableRows.map(function (_ref4) {var index = _ref4.index;return sortableRows[index];})).concat(fixedRows[_consts2.FixedPosition.BOTTOM]);};this.renderSorterIcon = function (column) {var sortOrder = column.sortOrder;var sortOrderIcon = 'icon-sort';if ([_consts.SortOrder.ASC, _consts.SortOrder.DESC].indexOf(sortOrder) >= 0) {sortOrderIcon = 'icon-sort-' + sortOrder;}return _react2.default.createElement('i', { className: (0, _classnames2.default)('icon', sortOrderIcon), 'aria-label': _this2.getSortLabel(sortOrder) });};this.getSortLabel = function () {var sortOrder = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _consts.SortOrder.ORIGIN;var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'aria-label';var sortLabel = void 0;var ariaSort = type === 'aria-sort';switch (sortOrder) {case _consts.SortOrder.ORIGIN:sortLabel = ariaSort ? 'none' : ' ';break;case _consts.SortOrder.ASC:sortLabel = ariaSort ? 'ascending' : 'sort up';break;case _consts.SortOrder.DESC:sortLabel = ariaSort ? 'descending' : 'sort down';break;default:break;}return sortLabel;};this.renderHeaderCell = function (column, index) {var _props3 = _this2.props,defaultSortable = _props3.sortable,defaultMinWidth = _props3.minWidth;var sorter = column.sorter,className = column.className,title = column.title,columnMinWidth = column.minWidth,sortOrder = column.sortOrder;var sortable = !!(defaultSortable && sorter);var minWidth = columnMinWidth || defaultMinWidth;return _react2.default.createElement('th', { className: (0, _classnames2.default)(className, { sortable: sortable }), 'data-min-width': minWidth, 'aria-sort': sortable ? _this2.getSortLabel(sortOrder, 'aria-sort') : null }, _react2.default.createElement('div', null, sortable ? _react2.default.createElement(_Tabbable2.default, { onClick: function onClick() {return sortable && _this2.loopSortOrder(column, index);} }, title, _this2.renderSorterIcon(column, index)) : title));};this.renderTableHead = function () {var columns = _this2.state.columns;return _react2.default.createElement('thead', null, _react2.default.createElement('tr', { className: 'striped' }, columns.map(function (column, index) {return _this2.renderHeaderCell(column, index);})));};this.renderExpandControl = function (expanded, rowIndexes) {var _props4 = _this2.props,ariaLableExpand = _props4.ariaLableExpand,ariaLableCollapse = _props4.ariaLableCollapse;var icon = expanded ? 'icon-chevron-up' : 'icon-chevron-down';return _react2.default.createElement(_Tabbable2.default, { 'aria-label': expanded ? ariaLableCollapse : ariaLableExpand, 'aria-expanded': expanded, onClick: function onClick() {return _this2.toggleRowExpandState(rowIndexes);} }, _react2.default.createElement('i', { className: (0, _classnames2.default)('icon', 'expand-control', icon) }));};this.renderCell = function (row, column, rowIndexes) {var render = column.render,className = column.className,keyName = column.keyName,format = column.format,colSpan = column.colSpan;var value = row.data[keyName];var isExpandControl = keyName === row.expandControl;var formatedValue = (0, _isFunction2.default)(format) ? format(value) : value;var content = [formatedValue];if (isExpandControl) {content.push(_this2.renderExpandControl(row.expanded, rowIndexes));}if ((0, _isFunction2.default)(render)) {content = render(content, row, keyName);}return _react2.default.createElement('td', { className: className, colSpan: colSpan }, _react2.default.createElement('div', null, content));};this.renderRow = function (row, _ref5, rowIndexes) {var defaultColumns = _ref5.columns,rowSeperator = _ref5.rowSeperator,striped = _ref5.striped,isStripedRow = _ref5.isStripedRow,isExtraRow = _ref5.isExtraRow;var _key = row._key,className = row.className,rowColumns = row.columns,hidden = row.hidden;var columns = rowColumns || defaultColumns;var cellsToRender = [];columns.forEach(function (column) {cellsToRender.push(_this2.renderCell(row, column, rowIndexes));});return _react2.default.createElement('tr', { key: _key, className: (0, _classnames2.default)(className, { rowSeperator: rowSeperator, 'u-hidden': hidden, 'extra-row': isExtraRow, striped: striped && isStripedRow }) }, cellsToRender);};this.renderRows = function (rows, config) {var rowIndexes = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];var initStripedStatus = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;var rowsToRender = [];var isStripedRow = initStripedStatus;rows.forEach(function (row, index) {var currentIndexes = rowIndexes.concat([index]);rowsToRender.push(_this2.renderRow(row, (0, _extends3.default)({}, config, { isStripedRow: isStripedRow }), currentIndexes));if ((0, _isArray2.default)(row.extraRows)) {row.extraRows.forEach(function (extraRow) {rowsToRender.push(_this2.renderRow(extraRow, (0, _extends3.default)({}, config, { isStripedRow: isStripedRow, isExtraRow: true }), currentIndexes));});}isStripedRow = !isStripedRow;if ((0, _isObject2.default)(row.children) && (0, _isArray2.default)(row.children.rows)) {var _row$children = row.children,childColumns = _row$children.columns,childRows = _row$children.rows;rowsToRender = rowsToRender.concat(_this2.renderRows(childRows.map(function (r) {return (0, _extends3.default)({}, r, { hidden: !row.expanded });}), // Drop back to table columns definition
        (0, _extends3.default)({}, config, { columns: childColumns || config.tableColumns }), currentIndexes, isStripedRow));}});return rowsToRender;};this.renderTableBody = function () {var _state = _this2.state,rows = _state.rows,columns = _state.columns;var _props5 = _this2.props,rowSeperator = _props5.rowSeperator,striped = _props5.striped;var rowsToRender = _this2.renderRows(rows, { tableColumns: columns, columns: columns, rowSeperator: rowSeperator, striped: striped });return _react2.default.createElement('tbody', null, rowsToRender);};};exports.default = Table;module.exports = exports['default'];