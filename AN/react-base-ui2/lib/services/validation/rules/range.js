'use strict';Object.defineProperty(exports, "__esModule", { value: true });var range = function range(value, param) {
  var rangeParam = [];

  try {
    rangeParam = JSON.parse(param);
  } catch (e) {
    rangeParam = param;
  }

  return value >= rangeParam[0] && value <= rangeParam[1];
};exports.default =

{
  validateFunc: range,
  message: 'Bla bla bla' };module.exports = exports['default'];