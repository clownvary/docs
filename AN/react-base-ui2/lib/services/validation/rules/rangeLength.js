'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _getLength = require('../utils/getLength');var _getLength2 = _interopRequireDefault(_getLength);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

var rangeLength = function rangeLength(value, param) {
  var length = (0, _getLength2.default)(value);
  var rangeParam = [];

  try {
    rangeParam = JSON.parse(param);
  } catch (e) {
    rangeParam = param;
  }
  return length >= rangeParam[0] && length <= rangeParam[1];
};exports.default =

{
  validateFunc: rangeLength,
  message: 'Bla bla bla' };module.exports = exports['default'];