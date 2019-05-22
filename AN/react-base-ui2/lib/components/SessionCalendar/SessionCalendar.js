'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _extends2 = require('babel-runtime/helpers/extends');var _extends3 = _interopRequireDefault(_extends2);var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);var _createClass2 = require('babel-runtime/helpers/createClass');var _createClass3 = _interopRequireDefault(_createClass2);var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);var _inherits2 = require('babel-runtime/helpers/inherits');var _inherits3 = _interopRequireDefault(_inherits2);var _react = require('react');var _react2 = _interopRequireDefault(_react);
var _propTypes = require('prop-types');var _propTypes2 = _interopRequireDefault(_propTypes);
var _moment = require('moment');var _moment2 = _interopRequireDefault(_moment);
var _classnames = require('classnames');var _classnames2 = _interopRequireDefault(_classnames);
var _Calendar = require('../Calendar');var _Calendar2 = _interopRequireDefault(_Calendar);

var _SessionCalendarRow = require('./SessionCalendarRow');var _SessionCalendarRow2 = _interopRequireDefault(_SessionCalendarRow);
var _SessionCalendarAction = require('./SessionCalendarAction');var _SessionCalendarAction2 = _interopRequireDefault(_SessionCalendarAction);

var _consts = require('../../consts');function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

var SessionCalendarPropTypes = {
  prefixCls: _propTypes2.default.string,
  /**
                                          * class names which were applied to component container div.
                                          */
  className: _propTypes2.default.string,
  /**
                                          * session date object array determine which month could be displayed.
                                          */
  sessionDates: _propTypes2.default.arrayOf(
  _propTypes2.default.shape({
    date: _propTypes2.default.instanceOf(_moment2.default),
    waiting: _propTypes2.default.bool })),


  /**
                                            * selected session date array determine which date were selected.
                                            */
  selectedDates: _propTypes2.default.arrayOf(_propTypes2.default.instanceOf(_moment2.default)),
  /**
                                                                                                 * today determines which day is today.
                                                                                                 */
  today: _propTypes2.default.oneOfType([
  _propTypes2.default.string,
  _propTypes2.default.instanceOf(Date)]),

  /**
                                           * current date determines the default display date of session calendar.
                                           */
  currentDate: _propTypes2.default.oneOfType([
  _propTypes2.default.string,
  _propTypes2.default.instanceOf(Date)]),

  /**
                                           * next determines the next month button active state.
                                           */
  next: _propTypes2.default.bool,
  /**
                                   * previous determines the previous month button active state.
                                   */
  previous: _propTypes2.default.bool,
  /**
                                       * disable expired determines the day before today would be rendered as disabled.
                                       */
  disableExpired: _propTypes2.default.bool,
  /**
                                             * disabled future unavailable determines the day after the last session date would be rendered
                                             * as disabled.
                                             */
  disableFutureUnavailable: _propTypes2.default.bool,
  /**
                                                       * customize action is a react component node which would be rendered at the right side of
                                                       * session calendar control actions.
                                                       */
  customizeAction: _propTypes2.default.node,
  /**
                                              * the handler function which would be triggered when previous button were clicked.
                                              */
  onPrevBtnClick: _propTypes2.default.func,
  /**
                                             * the handler function which would be triggered when next button were clicked.
                                             */
  onNextBtnClick: _propTypes2.default.func,
  /**
                                             * the handler function which would be trigger when the row of week date were clicked.
                                             */
  onDateRowClick: _propTypes2.default.func };


var SessionCalendarDefaultPropTypes = {
  prefixCls: _consts.DefaultCSSPrefix + '-sc',
  sessionDates: [],
  selectedDates: [],
  today: new Date(),
  currentDate: new Date(),
  disableExpired: true,
  disableFutureUnavailable: true };var


SessionCalendar = function (_React$Component) {(0, _inherits3.default)(SessionCalendar, _React$Component);




  function SessionCalendar(props) {(0, _classCallCheck3.default)(this, SessionCalendar);var _this = (0, _possibleConstructorReturn3.default)(this, (SessionCalendar.__proto__ || (0, _getPrototypeOf2.default)(SessionCalendar)).call(this,
    props));var

    currentDate = props.currentDate,today = props.today;
    _this.state = {
      currentDate: (0, _moment2.default)(currentDate),
      today: (0, _moment2.default)(today) };


    _this.dateViewRender = _this.dateViewRender.bind(_this);return _this;
  }(0, _createClass3.default)(SessionCalendar, [{ key: 'componentWillReceiveProps', value: function componentWillReceiveProps(

    nextProps) {var
      currentDate = nextProps.currentDate,today = nextProps.today;
      var nextState = {};
      if (currentDate !== this.props.currentDate) {
        nextState.currentDate = (0, _moment2.default)(currentDate);
      }
      if (today !== this.props.today) {
        nextState.today = (0, _moment2.default)(today);
      }
      this.setState(nextState);
    } }, { key: 'getSessionLastDay', value: function getSessionLastDay(

    dates) {
      return dates.length ?
      dates.reduce(function (acc, cur) {return acc.date.isAfter(cur.date) ? acc : cur;}).date :
      null;
    } }, { key: 'getSessionFirstDay', value: function getSessionFirstDay(

    dates, today) {
      var sessionFirstDay = dates.length ?
      dates.reduce(function (acc, cur) {return acc.date.isBefore(cur.date) ? acc : cur;}).date :
      null;
      return sessionFirstDay && (sessionFirstDay.isAfter(today) ? sessionFirstDay : today);
    } }, { key: 'dateViewRender', value: function dateViewRender(

    data) {var _props =



      this.props,prefixCls = _props.prefixCls,sessionDates = _props.sessionDates,selectedDates = _props.selectedDates,disableExpired = _props.disableExpired,disableFutureUnavailable = _props.disableFutureUnavailable,onDateRowClick = _props.onDateRowClick;var
      today = this.state.today;
      var sessionLastDay = this.getSessionLastDay(sessionDates);
      var sessionFirstDay = this.getSessionFirstDay(sessionDates, today);
      return data.map(function (rowDates) {
        var rowFirstDay = rowDates[0];
        var rowLastDay = rowDates[rowDates.length - 1];
        var rowSessionDates = sessionDates.filter(function (_ref) {var date = _ref.date;return date.isBetween(rowFirstDay, rowLastDay, 'day', '[]');});
        var rowSelectedDates = selectedDates.filter(function (date) {return date.isBetween(rowFirstDay, rowLastDay, 'day', '[]');});
        var notInSession = rowSessionDates.length === 0;
        var sessionExpired = disableExpired && !rowSessionDates.some(function (_ref2) {var date = _ref2.date;return date.isSameOrAfter(today, 'day');});
        var rowDisabled = notInSession || sessionExpired;
        return (
          _react2.default.createElement(_SessionCalendarRow2.default, {
            key: 'sc-row-' + rowFirstDay.valueOf(),
            prefixCls: prefixCls,
            rowDates: rowDates,
            rowSessionDates: rowSessionDates,
            rowSelectedDates: rowSelectedDates,
            rowDisabled: rowDisabled,
            today: today,
            sessionLastDay: sessionLastDay,
            sessionFirstDay: sessionFirstDay,
            disableExpired: disableExpired,
            disableFutureUnavailable: disableFutureUnavailable,
            onDateRowClick: onDateRowClick }));


      });
    } }, { key: 'render', value: function render()

    {var _state =
      this.state,currentDate = _state.currentDate,today = _state.today;var _props2 =



      this.props,prefixCls = _props2.prefixCls,className = _props2.className,previous = _props2.previous,next = _props2.next,customizeAction = _props2.customizeAction,onPrevBtnClick = _props2.onPrevBtnClick,onNextBtnClick = _props2.onNextBtnClick;
      return (
        _react2.default.createElement('div', { className: (0, _classnames2.default)(prefixCls, className) },
          _react2.default.createElement(_SessionCalendarAction2.default, {
            prefixCls: prefixCls,
            currentDate: currentDate,
            previous: previous,
            next: next,
            customizeAction: customizeAction,
            onPrevBtnClick: onPrevBtnClick,
            onNextBtnClick: onNextBtnClick }),

          _react2.default.createElement(_Calendar2.default, (0, _extends3.default)({},
          this.props, {
            className: prefixCls + '-body',
            displayHeader: false,
            dateViewRender: this.dateViewRender,
            value: [currentDate],
            today: today }))));



    } }]);return SessionCalendar;}(_react2.default.Component);SessionCalendar.displayName = 'SessionCalendar';SessionCalendar.propTypes = SessionCalendarPropTypes;SessionCalendar.defaultProps = SessionCalendarDefaultPropTypes;exports.default = SessionCalendar;module.exports = exports['default'];