'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);var _createClass2 = require('babel-runtime/helpers/createClass');var _createClass3 = _interopRequireDefault(_createClass2);var _isNil = require('lodash/isNil');var _isNil2 = _interopRequireDefault(_isNil);
var _moment = require('moment');var _moment2 = _interopRequireDefault(_moment);
var _i18n = require('../../../services/i18n');var _i18n2 = _interopRequireDefault(_i18n);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var

EventSeg = function () {
  function EventSeg(resource, event, start, end)
  {var index = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0;var exclusiveMode = arguments[5];var eventOrder = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : 'title';var customBlockStyle = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : {};var customIconStyle = arguments.length > 8 && arguments[8] !== undefined ? arguments[8] : {};(0, _classCallCheck3.default)(this, EventSeg);
    this.resource = resource;
    this.event = event;
    this.eventStart = event.start;
    this.eventEnd = event.end;
    this.eventOrder = event[eventOrder] || '';
    this.start = start;
    this.end = end;
    this.exclusiveMode = exclusiveMode;
    this.display = false;

    this.eventKey = resource.id + '/' + event.id;
    this.key = this.eventKey + '-' + index;

    // Cache the states
    this.isCrossDays = this.isCrossDays();
    this.isStartOfDay = this.isStartOfDay();
    this.isEndOfDay = this.isEndOfDay();
    this.span = this.getSpan((0, _moment2.default)(this.start), (0, _moment2.default)(this.end));
    this.isAllDay = this.isStartOfDay &&
    this.isEndOfDay &&
    this.getSpan((0, _moment2.default)(this.eventStart), (0, _moment2.default)(this.eventEnd)) === 0;
    this.text = this.getText();
    this.state = this.getState();
    this.type = this.getType();
    this.icon = this.type === 'short' ? 'icon-seg-state icon-circle' : null;
    this.editable = this.isEditable();
    this.customBlockStyle = customBlockStyle;
    this.customIconStyle = customIconStyle;
  }(0, _createClass3.default)(EventSeg, [{ key: 'isCrossDays', value: function isCrossDays()

    {
      if ((0, _isNil2.default)(this.eventEnd)) {
        return false;
      }

      var eventEnd = (0, _moment2.default)(this.eventEnd);
      this.exclusiveMode && eventEnd.subtract(1, 'ms');
      var isSameDay = eventEnd.isSame(this.eventStart, 'day');
      return eventEnd.diff((0, _moment2.default)(this.eventStart), 'days') > 0 || !isSameDay;
    } }, { key: 'isStartOfDay', value: function isStartOfDay()

    {
      var eventStart = (0, _moment2.default)(this.eventStart);
      return eventStart.isSame((0, _moment2.default)(eventStart).startOf('day'));
    } }, { key: 'isEndOfDay', value: function isEndOfDay()

    {
      if ((0, _isNil2.default)(this.eventEnd)) {
        return true;
      }

      var eventEnd = (0, _moment2.default)(this.eventEnd);

      this.exclusiveMode && eventEnd.subtract(1, 'ms');
      return eventEnd.isSame((0, _moment2.default)(eventEnd).endOf('day'));
    } }, { key: 'getSpan', value: function getSpan(

    start, end) {
      if ((0, _isNil2.default)(this.eventEnd)) {
        return 0;
      }

      this.exclusiveMode && end.subtract(1, 'ms');
      var span = end.diff(start, 'days');
      var isSameDay = end.isSame(start, 'day');
      /**
                                                 * span > 0
                                                 *   2018-06-01 01:00PM - 2016-06-03 11:00AM
                                                 *
                                                 * span === 0
                                                 *   2018-06-01 12:00AM - 2016-06-01 4:00PM
                                                 *   2018-06-01 12:00AM - 2016-06-02 12:00AM
                                                 *   2018-06-01 04:00AM - 2016-06-02 12:00AM
                                                 *   2018-06-01 01:00PM - 2016-06-02 11:00AM(!isSameDay -> should cross days)
                                                 */
      var isCrossDays = span > 0;

      if (isCrossDays || !isSameDay) {
        span = end.clone().endOf('day').diff((0, _moment2.default)(start).startOf('day'), 'days');
      }

      return span;
    } }, { key: 'getText', value: function getText()

    {
      var text = '';
      var timeFormat = _i18n2.default.ANTimeFormat;

      if (this.isAllDay) {
        text = this.event.title;
      } else if (this.isCrossDays) {
        if (this.isStartOfDay && this.isEndOfDay) {
          text = this.event.title + ' ' + (this.event.detail || '');
        } else {
          text = this.eventStart.format(timeFormat) + ' ' + this.event.title + ' ' + (this.event.detail || '');
        }
      } else {
        text = '' + this.eventStart.format(timeFormat);
      }

      return text;
    } }, { key: 'getState', value: function getState()

    {
      return this.event.state || 'none';
    } }, { key: 'getType', value: function getType()

    {
      return !this.isAllDay && !this.isCrossDays ? 'short' : 'long';
    } }, { key: 'isEditable', value: function isEditable()
    {
      return this.event.editable;
    } }]);return EventSeg;}();exports.default =


EventSeg;module.exports = exports['default'];