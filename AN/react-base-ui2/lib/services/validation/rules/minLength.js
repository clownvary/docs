'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _getLength = require('../utils/getLength');var _getLength2 = _interopRequireDefault(_getLength);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

var minLength = function minLength(value, param) {
  param *= 1;
  if (isNaN(param)) {
    throw new Error('Invalid param');
  }

  var length = (0, _getLength2.default)(value);
  return length >= param;
};exports.default =

{
  validateFunc: minLength,
  message: '{name} has minimal length {param}.' };module.exports = exports['default'];