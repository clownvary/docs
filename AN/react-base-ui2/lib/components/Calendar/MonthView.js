'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _defineProperty2 = require('babel-runtime/helpers/defineProperty');var _defineProperty3 = _interopRequireDefault(_defineProperty2);var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);var _createClass2 = require('babel-runtime/helpers/createClass');var _createClass3 = _interopRequireDefault(_createClass2);var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);var _inherits2 = require('babel-runtime/helpers/inherits');var _inherits3 = _interopRequireDefault(_inherits2);var _react = require('react');var _react2 = _interopRequireDefault(_react);
var _propTypes = require('prop-types');var _propTypes2 = _interopRequireDefault(_propTypes);
var _classnames = require('classnames');var _classnames2 = _interopRequireDefault(_classnames);
var _moment = require('moment');var _moment2 = _interopRequireDefault(_moment);

var _consts = require('../../consts');
var _utils = require('../../utils');
var _consts2 = require('./consts');
var _utils2 = require('./utils');function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

var ROW = 3;
var COL = 4;
var MonthViewPropTypes = {
  config: _propTypes2.default.shape({
    prefix: _propTypes2.default.string.isRequired,
    currentDate: _propTypes2.default.instanceOf(_moment2.default).isRequired,
    value: _propTypes2.default.arrayOf(_propTypes2.default.instanceOf(_moment2.default)) }),

  onMonthClick: _propTypes2.default.func.isRequired };var


MonthView = function (_React$PureComponent) {(0, _inherits3.default)(MonthView, _React$PureComponent);function MonthView() {(0, _classCallCheck3.default)(this, MonthView);return (0, _possibleConstructorReturn3.default)(this, (MonthView.__proto__ || (0, _getPrototypeOf2.default)(MonthView)).apply(this, arguments));}(0, _createClass3.default)(MonthView, [{ key: 'getMonthName', value: function getMonthName(



    month) {
      var localeData = month.localeData();
      return localeData.monthsShort(month);
    } }, { key: 'months', value: function months()

    {var
      currentDate = this.props.config.currentDate;
      var current = currentDate.clone();
      var months = [];
      var index = 0;
      for (var rowIndex = 0; rowIndex < ROW; rowIndex += 1) {
        months[rowIndex] = [];
        for (var colIndex = 0; colIndex < COL; colIndex += 1) {
          current.month(index);
          var content = this.getMonthName(current);
          months[rowIndex][colIndex] = {
            index: index,
            month: current.clone(),
            title: content };

          index += 1;
        }
      }
      return months;
    } }, { key: 'renderCell', value: function renderCell(

    cell) {var _props =
      this.props,_props$config = _props.config,value = _props$config.value,today = _props$config.today,prefix = _props$config.prefix,onMonthClick = _props.onMonthClick;var
      index = cell.index,month = cell.month,title = cell.title;
      var isSelected = value && value.some(function (v) {return (0, _utils2.compareByFormat)(v, month, _consts2.DateFormat.MMMYYYY);});
      var isCurrentMonth = (0, _utils2.compareByFormat)(month, today, _consts2.DateFormat.MMMYYYY);

      return (
        _react2.default.createElement('td', { key: 'td_' + index },
          _react2.default.createElement('div', {
              key: 'div_' + index,
              className: (0, _classnames2.default)(
              this.props.prefix + 'calendar-table-cell',
              prefix + 'calendar-month', (0, _defineProperty3.default)({},
              prefix + 'calendar-month-current', isCurrentMonth), (0, _defineProperty3.default)({},
              prefix + 'calendar-month-selected', isSelected), (0, _defineProperty3.default)({},
              prefix + 'calendar-month-disable', false)),

              onClick: function onClick() {return onMonthClick(month);},
              tabIndex: 0,
              onKeyDown: function onKeyDown(e) {return (0, _utils.listenKeyDown)(e,
                [_consts.KeyCode.ENTER, _consts.KeyCode.SPACE],
                function () {return onMonthClick(month);});} },


            title)));



    } }, { key: 'renderRow', value: function renderRow(

    cells, rowIndex) {var _this2 = this;
      return (
        _react2.default.createElement('tr', { key: 'tr' + rowIndex, className: this.props.config.prefix + 'calendar-row' },

          cells && cells.map(function (cell) {return _this2.renderCell(cell);})));



    } }, { key: 'componentDidUpdate', value: function componentDidUpdate()

    {var
      prevViewMode = this.props.config.prevViewMode;
      if (prevViewMode === _consts2.ViewMode.YEARVIEW) {
        var tds = this.monthViewTable.querySelectorAll('td');
        tds.length > 0 && tds[0].firstChild && tds[0].firstChild.focus();
      }
    } }, { key: 'render', value: function render()


    {var _this3 = this;
      var months = this.months();

      return (
        _react2.default.createElement('table', {
            className: this.props.config.prefix + 'calendar-table',
            ref: function ref(table) {_this3.monthViewTable = table;} },

          _react2.default.createElement('tbody', null,
            months.map(function (row, rowIndex) {return _this3.renderRow(row, rowIndex);}))));



    } }]);return MonthView;}(_react2.default.PureComponent);MonthView.displayName = 'MonthView';MonthView.propTypes = MonthViewPropTypes;exports.default =


MonthView;module.exports = exports['default'];