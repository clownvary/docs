'use strict';Object.defineProperty(exports, "__esModule", { value: true });exports.getDateText = exports.toDate = exports.getDateKey = exports.DATE_KEY_FORMAT = exports.getEndOfDay = exports.dateIntersect = exports.getDaysInMonth = undefined;var _moment = require('moment');var _moment2 = _interopRequireDefault(_moment);
var _times = require('lodash/times');var _times2 = _interopRequireDefault(_times);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

var getDaysInMonth = exports.getDaysInMonth = function getDaysInMonth(date) {
  var daysInMonth = [];

  var monthDate = (0, _moment2.default)(date).startOf('month');
  (0, _times2.default)(monthDate.daysInMonth(), function () {
    daysInMonth.push(monthDate);
    monthDate = monthDate.clone().add(1, 'd');
  });

  return daysInMonth;
};

var dateIntersect = exports.dateIntersect = function dateIntersect(date, start, end) {
  var dateStart = (0, _moment2.default)(date).startOf('day');
  var dateEnd = (0, _moment2.default)(date).endOf('day');

  if (start.isSameOrBefore(dateEnd) && end.isSameOrAfter(dateStart)) {
    return {
      start: _moment2.default.max(dateStart, start).clone(),
      end: _moment2.default.min(dateEnd, end).clone() };

  }

  return null;
};

var getEndOfDay = exports.getEndOfDay = function getEndOfDay(date, exclusiveMode) {
  var end = date.clone().endOf('day');
  if (exclusiveMode) {
    return end.add(1, 'ms');
  }
  return end;
};

var DATE_KEY_FORMAT = exports.DATE_KEY_FORMAT = 'YYYY-MM-DD';
var getDateKey = exports.getDateKey = function getDateKey(date) {return date.format(DATE_KEY_FORMAT);};
var toDate = exports.toDate = function toDate(key) {return (0, _moment2.default)(key, DATE_KEY_FORMAT);};

var getDateText = exports.getDateText = function getDateText(date) {var format = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'DD ddd';return date.format(format);};