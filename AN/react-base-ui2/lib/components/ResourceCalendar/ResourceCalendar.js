'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _extends2 = require('babel-runtime/helpers/extends');var _extends3 = _interopRequireDefault(_extends2);var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);var _createClass2 = require('babel-runtime/helpers/createClass');var _createClass3 = _interopRequireDefault(_createClass2);var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);var _inherits2 = require('babel-runtime/helpers/inherits');var _inherits3 = _interopRequireDefault(_inherits2);var _react = require('react');var _react2 = _interopRequireDefault(_react);
var _propTypes = require('prop-types');
var _horizontal = require('./horizontal');var _horizontal2 = _interopRequireDefault(_horizontal);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

/**
                                                                                                                                                                                                * Default PropTypes of ResourceCalendar.
                                                                                                                                                                                                */
var ResourceCalendarPropTypes = {
  /**
                                   * events data list.
                                   */
  /* eslint-disable  react/no-unused-prop-types */
  events: (0, _propTypes.arrayOf)((0, _propTypes.shape)({
    id: _propTypes.string,
    resourceId: _propTypes.string,
    resourceID: _propTypes.number,
    resourceBookingID: _propTypes.number,
    pendingID: _propTypes.string,
    start: _propTypes.string,
    end: _propTypes.string,
    title: _propTypes.string,
    state: _propTypes.object,
    type: _propTypes.string,
    detail: _propTypes.string,
    permitID: _propTypes.number,
    permitNumber: _propTypes.string,
    isAllDay: _propTypes.bool,
    customerType: _propTypes.string,
    resourceType: _propTypes.number,
    startEventDate: _propTypes.string,
    startEventTime: _propTypes.string,
    startScheduleTime: _propTypes.string,
    startScheduleDay: _propTypes.string,
    startScheduleDate: _propTypes.string,
    endEventDate: _propTypes.string,
    endEventTime: _propTypes.string,
    endScheduleTime: _propTypes.string,
    endScheduleDay: _propTypes.string,
    endScheduleDate: _propTypes.string,
    eventType: _propTypes.string,
    eventName: _propTypes.string,
    attendance: _propTypes.number,
    permitStatusDescription: _propTypes.string,
    scheduleType: _propTypes.string,
    reservationScope: _propTypes.string,
    activityIgnoreMaximum: _propTypes.bool,
    bookingAssignment: _propTypes.number,
    editable: _propTypes.bool,
    currentEvent: _propTypes.object,
    customBlockStyle: _propTypes.object, // Should be used when event duration >= 24 hours
    customIconStyle: _propTypes.object // Should be used when event duration < 24 hours
  })) };


/** Default Props for ResourceCalendar */
var ResourceCalendarProps = {
  events: [] };var

ResourceCalendar = function (_React$PureComponent) {(0, _inherits3.default)(ResourceCalendar, _React$PureComponent);function ResourceCalendar() {(0, _classCallCheck3.default)(this, ResourceCalendar);return (0, _possibleConstructorReturn3.default)(this, (ResourceCalendar.__proto__ || (0, _getPrototypeOf2.default)(ResourceCalendar)).apply(this, arguments));}(0, _createClass3.default)(ResourceCalendar, [{ key: 'render', value: function render()





    {var _this2 = this;
      var View = _horizontal2.default;

      return (
        _react2.default.createElement(View, (0, _extends3.default)({}, this.props, { ref: function ref(c) {_this2.view = c;} })));

    } }]);return ResourceCalendar;}(_react2.default.PureComponent);ResourceCalendar.displayName = 'ResourceCalendar';ResourceCalendar.defaultProps = ResourceCalendarProps;ResourceCalendar.propTypes = ResourceCalendarPropTypes;exports.default =


ResourceCalendar;module.exports = exports['default'];