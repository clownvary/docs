'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _defineProperty2 = require('babel-runtime/helpers/defineProperty');var _defineProperty3 = _interopRequireDefault(_defineProperty2);var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);var _createClass2 = require('babel-runtime/helpers/createClass');var _createClass3 = _interopRequireDefault(_createClass2);var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);var _inherits2 = require('babel-runtime/helpers/inherits');var _inherits3 = _interopRequireDefault(_inherits2);var _react = require('react');var _react2 = _interopRequireDefault(_react);
var _propTypes = require('prop-types');var _propTypes2 = _interopRequireDefault(_propTypes);
var _classnames = require('classnames');var _classnames2 = _interopRequireDefault(_classnames);
var _moment = require('moment');var _moment2 = _interopRequireDefault(_moment);

var _i18n = require('../../services/i18n');
var _consts = require('../../consts');
var _utils = require('../../utils');
var _consts2 = require('./consts');
var _utils2 = require('./utils');function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

var ROW = 6;
var COL = 7;
var DateViewPropTypes = {
  config: _propTypes2.default.shape({
    prefix: _propTypes2.default.string.isRequired,
    currentDate: _propTypes2.default.instanceOf(_moment2.default),
    firstDayofWeek: _propTypes2.default.number,
    min: _propTypes2.default.instanceOf(_moment2.default),
    max: _propTypes2.default.instanceOf(_moment2.default),
    disabledDates: _propTypes2.default.arrayOf(_propTypes2.default.instanceOf(_moment2.default)),
    value: _propTypes2.default.arrayOf(_propTypes2.default.instanceOf(_moment2.default)),
    selectMode: _propTypes2.default.oneOf(
    [_consts2.SelectionMode.SINGLE, _consts2.SelectionMode.MULTIPLE]) }),

  onDateClick: _propTypes2.default.func.isRequired };var


DateView = function (_React$PureComponent) {(0, _inherits3.default)(DateView, _React$PureComponent);function DateView() {(0, _classCallCheck3.default)(this, DateView);return (0, _possibleConstructorReturn3.default)(this, (DateView.__proto__ || (0, _getPrototypeOf2.default)(DateView)).apply(this, arguments));}(0, _createClass3.default)(DateView, [{ key: 'getHeaders', value: function getHeaders(



    currentDate) {
      var now = _i18n.Globalize.getToday();
      var veryShortWeekdays = [];
      var weekDays = [];
      var localeData = currentDate.localeData();
      for (var dateColIndex = 0; dateColIndex < COL; dateColIndex += 1) {
        var index = (this.props.config.firstDayOfWeek + dateColIndex) % COL;
        now.day(index);
        weekDays[dateColIndex] = localeData.weekdays(now);
        veryShortWeekdays[dateColIndex] = weekDays[dateColIndex].substring(0, 1);
      }

      return { veryShortWeekdays: veryShortWeekdays, weekDays: weekDays };
    }

    // return the array filled with date
  }, { key: 'getDates', value: function getDates(currentDate) {
      var cd = (0, _moment2.default)(currentDate);
      var tcd = cd.clone().date(1);
      var dateTable = [];
      var current = void 0;

      var lastMonthDiffDay = (tcd.day() + 7 - this.props.config.firstDayOfWeek) % 7;
      tcd.add(0 - lastMonthDiffDay, 'days');

      var passed = 0;
      for (var iIndex = 0; iIndex < ROW; iIndex += 1) {
        for (var jIndex = 0; jIndex < COL; jIndex += 1) {
          current = tcd;
          if (passed) {
            current = current.clone();
            current.add(passed, 'days');
          }
          dateTable.push(current);
          passed += 1;
        }
      }

      return dateTable;
    } }, { key: 'getDateTable', value: function getDateTable(

    currentDate) {
      var dates = this.getDates(currentDate);
      var rows = [];
      var row = [];
      var pass = 0;
      for (var iIndex = 0; iIndex < ROW; iIndex += 1) {
        row = [];
        for (var jIndex = 0; jIndex < COL; jIndex += 1) {
          row.push(dates[pass]);
          pass += 1;
        }
        rows.push(row);
      }

      return rows;
    } }, { key: 'renderDate', value: function renderDate(

    date) {var _props =











      this.props,_props$config = _props.config,prefix = _props$config.prefix,today = _props$config.today,_props$config$current = _props$config.currentDate,currentDate = _props$config$current === undefined ? _i18n.Globalize.getToday() : _props$config$current,value = _props$config.value,disabledDates = _props$config.disabledDates,min = _props$config.min,max = _props$config.max,onDateClick = _props.onDateClick;

      var isOutOfRange = min && date.isBefore(min, 'day') ||
      max && date.isAfter(max, 'day');
      var isOtherMonth = date.month() !== currentDate.month();
      var isWeekend = date.weekday() === 0 || date.weekday() === 6;
      var isSelected = value && value.some(function (v) {return (0, _utils2.compareByFormat)(v, date, _consts2.DateFormat.MMDDYYYY);});
      var isToday = (0, _utils2.compareByFormat)(today, date, _consts2.DateFormat.MMDDYYYY);
      var isDisable = isOutOfRange || disabledDates && disabledDates.some(function (d) {return (
          (0, _utils2.compareByFormat)((0, _moment2.default)(d), date, _consts2.DateFormat.MMDDYYYY));});

      return (
        _react2.default.createElement('td', { key: 'td_' + date },
          _react2.default.createElement('div', {
              key: 'div_' + date,
              className: (0, _classnames2.default)(
              prefix + 'calendar-table-cell',
              prefix + 'calendar-day', (0, _defineProperty3.default)({},
              prefix + 'calendar-day-today', isToday), (0, _defineProperty3.default)({},
              prefix + 'calendar-day-othermonth', isOtherMonth && !isDisable), (0, _defineProperty3.default)({},
              prefix + 'calendar-day-weekend', isWeekend), (0, _defineProperty3.default)({},
              prefix + 'calendar-day-selected', isSelected), (0, _defineProperty3.default)({},
              prefix + 'calendar-day-disable', isDisable)),

              onClick: function onClick() {return onDateClick(date);},
              tabIndex: 0,
              onKeyDown: function onKeyDown(e) {return (0, _utils.listenKeyDown)(e, [_consts.KeyCode.ENTER, _consts.KeyCode.SPACE], function () {return onDateClick(date);});} },

            date.format('D'))));



    } }, { key: 'componentDidUpdate', value: function componentDidUpdate()

    {var
      prevViewMode = this.props.config.prevViewMode;
      if (prevViewMode === _consts2.ViewMode.MONTHVIEW) {
        var tds = this.dateViewTable.querySelectorAll('td');
        tds.length > 0 && tds[0].firstChild && tds[0].firstChild.focus();
      }
    } }, { key: 'render', value: function render()

    {var _this2 = this;var _props2 =







      this.props,_props2$config = _props2.config,_props2$config$curren = _props2$config.currentDate,currentDate = _props2$config$curren === undefined ? _i18n.Globalize.getToday() : _props2$config$curren,prefix = _props2$config.prefix,firstDayOfWeek = _props2$config.firstDayOfWeek,dateViewRender = _props2.dateViewRender;
      var dtTable = this.getDateTable(currentDate);
      var heads = (0, _utils2.getWeeks)(currentDate, firstDayOfWeek);
      return (
        _react2.default.createElement('table', {
            className: prefix + 'calendar-table',
            ref: function ref(table) {_this2.dateViewTable = table;} },

          _react2.default.createElement('tbody', null,
            _react2.default.createElement('tr', { className: prefix + 'calendar-table-header' },
              heads.veryShortWeekdays.map(function (head, index) {return (
                  _react2.default.createElement('th', { key: 'th' + index, className: prefix + 'calendar-table-header-cell', title: heads.weekDays[index] },
                    head));})),




            dateViewRender ?
            dateViewRender(dtTable) :
            dtTable.map(function (row, index) {return (
                _react2.default.createElement('tr', { key: 'td' + index, className: prefix + 'calendar-table-row' },
                  row.map(function (col) {return _this2.renderDate(col);})));}))));






    } }]);return DateView;}(_react2.default.PureComponent);DateView.displayName = 'DateView';DateView.propTypes = DateViewPropTypes;exports.default =


DateView;module.exports = exports['default'];