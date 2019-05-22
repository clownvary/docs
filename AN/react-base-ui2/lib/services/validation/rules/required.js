'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _isArray = require('lodash/isArray');var _isArray2 = _interopRequireDefault(_isArray);
var _isString = require('lodash/isString');var _isString2 = _interopRequireDefault(_isString);
var _isNil = require('lodash/isNil');var _isNil2 = _interopRequireDefault(_isNil);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

var required = function required(value) {
  if ((0, _isArray2.default)(value) || (0, _isString2.default)(value)) {
    return value.length > 0;
  }

  return !(0, _isNil2.default)(value);
};exports.default =

{
  validateFunc: required,
  message: '{name} is required.' };module.exports = exports['default'];