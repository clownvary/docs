'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _moment = require('moment');var _moment2 = _interopRequireDefault(_moment);
var _isArray = require('lodash/isArray');var _isArray2 = _interopRequireDefault(_isArray);
var _uniqWith = require('lodash/uniqWith');var _uniqWith2 = _interopRequireDefault(_uniqWith);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

var getTenYearRange = function getTenYearRange(mmomentDate) {
  var year = mmomentDate.year();
  var begin = year - year % 10;
  var end = begin + 9;
  return begin + '-' + end;
};

var getWeeks = function getWeeks(currentDate, firstDayOfWeek) {
  var now = currentDate.clone();
  var veryShortWeekdays = [];
  var weekDays = [];
  var localeData = currentDate.localeData();
  for (var dateColIndex = 0; dateColIndex < 7; dateColIndex += 1) {
    var index = (firstDayOfWeek + dateColIndex) % 7;
    now.day(index);
    weekDays[dateColIndex] = localeData.weekdays(now);
    veryShortWeekdays[dateColIndex] = weekDays[dateColIndex].substring(0, 1);
  }

  return { veryShortWeekdays: veryShortWeekdays, weekDays: weekDays };
};

var compareByFormat = function compareByFormat(date1, date2, format) {return (
    date1.format(format) === date2.format(format));};

var getSafeValue = function getSafeValue(value) {
  if (!(0, _isArray2.default)(value)) {
    value = [value];
  }
  var safeValue = value.map(function (v) {return v && (0, _moment2.default)(v);}).filter(function (v) {return v && v.isValid();});

  return (0, _uniqWith2.default)(safeValue, function (m1, m2) {return m1.isSame(m2, 'day');});
};

var sortedDates = function sortedDates(value) {return value.map(function (d) {return d.clone();}).
  sort(function (a, b) {
    if (a.isAfter(b, 'day')) {
      return 1;
    }
    if (a.isBefore(b, 'day')) {
      return -1;
    }
    return 0;
  });};exports.default =

{
  getTenYearRange: getTenYearRange,
  getWeeks: getWeeks,
  compareByFormat: compareByFormat,
  getSafeValue: getSafeValue,
  sortedDates: sortedDates };module.exports = exports['default'];