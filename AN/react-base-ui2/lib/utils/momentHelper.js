'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _moment = require('moment');var _moment2 = _interopRequireDefault(_moment);
var _isString = require('lodash/isString');var _isString2 = _interopRequireDefault(_isString);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

var isSame = function isSame(momentA, momentB) {
  if (!momentA && !momentB) {
    return true;
  }

  if (momentA && !momentB || !momentA && momentB) {
    return false;
  }

  var a = (0, _moment2.default)(momentA);
  var b = (0, _moment2.default)(momentB);
  return a.isSame(b);
};

var isInRange = function isInRange(momentValue, momentMin, momentMax) {
  var value = momentValue ? (0, _moment2.default)(momentValue) : null;

  if (!value || !value.isValid()) return false;

  var min = momentMin ? (0, _moment2.default)(momentMin) : null;
  if (min && min.isValid()) {
    if (value.isBefore(min)) {
      return false;
    }
  }

  var max = momentMax ? (0, _moment2.default)(momentMax) : null;
  if (max && max.isValid()) {
    if (value.isAfter(max)) {
      return false;
    }
  }

  return true;
};

var isValid = function isValid(momentValue) {
  var value = momentValue ? (0, _moment2.default)(momentValue) : null;
  return value && value.isValid();
};

var isSameTime = function isSameTime(timeA, timeB) {var format = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'HH:mm:ss';
  var defaultYear = '1970-01-01';
  var defaultYearFormat = 'YYYY-MM-DD';
  var defaultTimeFormat = 'HH:mm:ss';

  if (_moment2.default.isMoment(timeA) && _moment2.default.isMoment(timeB)) {
    return timeA.format(defaultTimeFormat) === timeB.format(defaultTimeFormat);
  }

  if ((0, _isString2.default)(timeA) && (0, _isString2.default)(timeB)) {
    if (timeA === timeB) {
      return true;
    }

    var momentTimeA = (0, _moment2.default)(defaultYear + ' ' + timeA, defaultYearFormat + ' ' + format);
    var momentTimeB = (0, _moment2.default)(defaultYear + ' ' + timeB, defaultYearFormat + ' ' + format);

    return momentTimeA.format(defaultTimeFormat) === momentTimeB.format(defaultTimeFormat);
  }

  return false;
};

var createMoment = function createMoment(value) {
  if (value) {
    var val = (0, _moment2.default)(value);

    if (val.isValid()) {
      return val;
    }
  }

  return null;
};exports.default =

{
  isSame: isSame,
  isInRange: isInRange,
  isValid: isValid,
  createMoment: createMoment,
  isSameTime: isSameTime };module.exports = exports['default'];