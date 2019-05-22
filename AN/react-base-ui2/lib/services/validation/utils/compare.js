'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _isNaN = require('lodash/isNaN');var _isNaN2 = _interopRequireDefault(_isNaN);
var _moment = require('moment');var _moment2 = _interopRequireDefault(_moment);
var _DataType = require('../consts/DataType');var DataType = _interopRequireWildcard(_DataType);
var _Operator = require('../consts/Operator');var Operator = _interopRequireWildcard(_Operator);function _interopRequireWildcard(obj) {if (obj && obj.__esModule) {return obj;} else {var newObj = {};if (obj != null) {for (var key in obj) {if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];}}newObj.default = obj;return newObj;}}function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}


var compareNumber = function compareNumber(
value1,
value2)

{var operator = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : Operator.EQUAL;
  switch (operator) {
    case Operator.EQUAL:
      return value1 === value2;

    case Operator.LESS:
      return value1 < value2;

    case Operator.LESS_OR_EQUAL:
      return value1 <= value2;

    case Operator.GREATER:
      return value1 > value2;

    case Operator.GREATER_OR_EQUAL:
      return value1 >= value2;

    default:
      throw new Error('Validation comparation needs operator');}

};

var compareDateTime = function compareDateTime(
m1,
m2)


{var operator = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : Operator.EQUAL;var dateOnly = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;
  var factor = dateOnly ? 'day' : '';
  switch (operator) {
    case Operator.EQUAL:
      return m1.isSame(m2, factor);

    case Operator.LESS:
      return m1.isBefore(m2, factor);

    case Operator.LESS_OR_EQUAL:
      return m1.isSameOrBefore(m2, factor);

    case Operator.GREATER:
      return m1.isAfter(m2, factor);

    case Operator.GREATER_OR_EQUAL:
      return m1.isSameOrAfter(m2, factor);

    default:
      throw new Error('Validation comparation needs operator');}

};

var compareTime = function compareTime(
m1,
m2)

{var operator = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : Operator.EQUAL;
  var t1 = m1.format('HH:mm:ss');
  var t2 = m2.format('HH:mm:ss');
  switch (operator) {
    case Operator.EQUAL:
      return t1 === t2;

    case Operator.LESS:
      return t1 < t2;

    case Operator.LESS_OR_EQUAL:
      return t1 <= t2;

    case Operator.GREATER:
      return t1 > t2;

    case Operator.GREATER_OR_EQUAL:
      return t1 >= t2;

    default:
      throw new Error('Validation comparation needs operator');}

};

var compare = function compare(value1, value2) {var operator = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : Operator.EQUAL;var type = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : DataType.NUMBER;
  var m1 = void 0;
  var m2 = void 0;
  var format = void 0;
  var dateOnly = type === DataType.DATE;
  switch (type) {
    case DataType.NUMBER:
      value1 *= 1;
      value2 *= 1;

      if ((0, _isNaN2.default)(value1) || (0, _isNaN2.default)(value2)) {
        throw new Error('Validation can not convert to number');
      }

      return compareNumber(value1, value2, operator);

    case DataType.DATE:
    case DataType.DATETIME:
      format = dateOnly ? 'YYYY-MM-DD' : 'YYYY-MM-DDThh:mm:ss';
      m1 = (0, _moment2.default)(value1, format);
      m2 = (0, _moment2.default)(value2, format);
      if (!m1.isValid() || !m2.isValid()) {
        throw new Error('Validation can not convert to date');
      }

      return compareDateTime(m1, m2, operator, dateOnly);

    case DataType.TIME:
      format = 'hh:mm:ss';
      m1 = (0, _moment2.default)(value1, format);
      m2 = (0, _moment2.default)(value2, format);
      if (!m1.isValid() || !m2.isValid()) {
        throw new Error('Validation can not convert to time');
      }

      return compareTime(m1, m2, operator);

    default:
      throw new Error('Validation type not supported');}

};exports.default =


compare;module.exports = exports['default'];