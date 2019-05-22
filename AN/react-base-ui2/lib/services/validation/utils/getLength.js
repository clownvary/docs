'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _isArray = require('lodash/isArray');var _isArray2 = _interopRequireDefault(_isArray);
var _isString = require('lodash/isString');var _isString2 = _interopRequireDefault(_isString);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

var getLength = function getLength(value) {
  var length = 0;
  if ((0, _isArray2.default)(value)) {
    length = value.length;
  } else if ((0, _isString2.default)(value)) {
    length = value.length;
  }

  return length;
};exports.default =

getLength;module.exports = exports['default'];