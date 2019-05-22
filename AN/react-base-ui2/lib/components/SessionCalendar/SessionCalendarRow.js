'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _extends2 = require('babel-runtime/helpers/extends');var _extends3 = _interopRequireDefault(_extends2);var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);var _createClass2 = require('babel-runtime/helpers/createClass');var _createClass3 = _interopRequireDefault(_createClass2);var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);var _inherits2 = require('babel-runtime/helpers/inherits');var _inherits3 = _interopRequireDefault(_inherits2);var _react = require('react');var _react2 = _interopRequireDefault(_react);
var _propTypes = require('prop-types');var _propTypes2 = _interopRequireDefault(_propTypes);
var _moment = require('moment');var _moment2 = _interopRequireDefault(_moment);
var _utils = require('../../utils');
var _consts = require('../../consts');
var _SessionCalendarDateCell = require('./SessionCalendarDateCell');var _SessionCalendarDateCell2 = _interopRequireDefault(_SessionCalendarDateCell);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

var SessionCalendarRowPropTypes = {
  prefixCls: _propTypes2.default.string,
  rowDates: _propTypes2.default.array,
  rowSessionDates: _propTypes2.default.arrayOf(
  _propTypes2.default.shape({
    date: _propTypes2.default.instanceOf(_moment2.default),
    waiting: _propTypes2.default.bool })),


  rowSelectedDates: _propTypes2.default.arrayOf(_propTypes2.default.instanceOf(_moment2.default)),
  rowDisabled: _propTypes2.default.bool,
  today: _propTypes2.default.instanceOf(_moment2.default),
  sessionLastDay: _propTypes2.default.instanceOf(_moment2.default),
  disableExpired: _propTypes2.default.bool,
  disableFutureUnavailable: _propTypes2.default.bool,
  onDateRowClick: _propTypes2.default.func };


var SessionCalendarRowDefaultProps = {
  rowSessionDates: [],
  rowSelectedDates: [],
  disableExpired: true,
  disableFutureUnavailable: true };var


SessionCalendarRow = function (_Component) {(0, _inherits3.default)(SessionCalendarRow, _Component);function SessionCalendarRow() {(0, _classCallCheck3.default)(this, SessionCalendarRow);return (0, _possibleConstructorReturn3.default)(this, (SessionCalendarRow.__proto__ || (0, _getPrototypeOf2.default)(SessionCalendarRow)).apply(this, arguments));}(0, _createClass3.default)(SessionCalendarRow, [{ key: 'renderRowDates', value: function renderRowDates()



    {var _props =



      this.props,prefixCls = _props.prefixCls,rowDates = _props.rowDates,rowSessionDates = _props.rowSessionDates,rowDisabled = _props.rowDisabled,today = _props.today,rowSelectedDates = _props.rowSelectedDates,disableExpired = _props.disableExpired,disableFutureUnavailable = _props.disableFutureUnavailable,sessionFirstDay = _props.sessionFirstDay,sessionLastDay = _props.sessionLastDay;
      var count = rowDates.length;
      var rowProps = rowDates.map(function (date) {
        var isToday = date.isSame(today, 'day');
        var waiting = rowSessionDates.some(function (sessionDate) {return sessionDate.waiting && date.isSame(sessionDate.date, 'day');});
        var selected = rowSelectedDates.some(function (selectedDate) {return date.isSame(selectedDate, 'day');});
        var expired = disableExpired && date.isBefore(sessionFirstDay, 'day');
        var futureUnavailable = disableFutureUnavailable && date.isAfter(sessionLastDay, 'day');
        return {
          today: isToday,
          disabled: rowDisabled || expired || futureUnavailable,
          waiting: waiting,
          selected: selected };

      });

      return rowDates.map(function (rowDate, index) {
        var rowProp = rowProps[index];
        var prevRowProp = rowProps[index - 1];
        var selectionStart = index === 0 || rowProp.waiting !== prevRowProp.waiting ||
        !rowProp.disabled && prevRowProp.disabled;
        var nextRowProp = rowProps[index + 1];
        var selectionEnd = index === count - 1 || rowProp.waiting !== nextRowProp.waiting ||
        !rowProp.disabled && nextRowProp.disabled;
        return (
          _react2.default.createElement(_SessionCalendarDateCell2.default, (0, _extends3.default)({
            key: 'sc-day-' + rowDate.valueOf(),
            prefixCls: prefixCls,
            rowDate: rowDate,
            selectionStart: selectionStart,
            selectionEnd: selectionEnd },
          rowProp)));


      });
    } }, { key: 'render', value: function render()

    {var _props2 =


      this.props,rowDates = _props2.rowDates,rowSessionDates = _props2.rowSessionDates,rowDisabled = _props2.rowDisabled,onDateRowClick = _props2.onDateRowClick;
      var tabIndex = rowDisabled ? '' : '0';
      return (
        _react2.default.createElement('tr', {
            tabIndex: tabIndex,
            onClick: function onClick(e) {return rowDisabled || onDateRowClick(e, rowDates, rowSessionDates);},
            onKeyDown: function onKeyDown(e) {return (0, _utils.listenKeyDown)(e, [_consts.KeyCode.ENTER, _consts.KeyCode.SPACE],
              function () {return onDateRowClick(e, rowDates, rowSessionDates);});} },

          this.renderRowDates()));


    } }]);return SessionCalendarRow;}(_react.Component);SessionCalendarRow.propTypes = SessionCalendarRowPropTypes;SessionCalendarRow.defaultProps = SessionCalendarRowDefaultProps;exports.default =


SessionCalendarRow;module.exports = exports['default'];