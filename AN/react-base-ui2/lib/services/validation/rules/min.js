'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _compare = require('../utils/compare');var _compare2 = _interopRequireDefault(_compare);
var _Operator = require('../consts/Operator');var Operator = _interopRequireWildcard(_Operator);function _interopRequireWildcard(obj) {if (obj && obj.__esModule) {return obj;} else {var newObj = {};if (obj != null) {for (var key in obj) {if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];}}newObj.default = obj;return newObj;}}function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

var min = function min(value, param, type) {return (0, _compare2.default)(value, param, Operator.GREATER_OR_EQUAL, type);};exports.default =

{
  validateFunc: min,
  message: '{name} has the minimal limitation {param}.' };module.exports = exports['default'];