'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _keys = require('babel-runtime/core-js/object/keys');var _keys2 = _interopRequireDefault(_keys);var _typeof2 = require('babel-runtime/helpers/typeof');var _typeof3 = _interopRequireDefault(_typeof2);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var shallowEqual = function shallowEqual(objA, objB) {
  if (objA === objB && objA !== 0) {
    return true;
  }

  if (
  (typeof objA === 'undefined' ? 'undefined' : (0, _typeof3.default)(objA)) !== 'object' ||
  objA === null ||
  (typeof objB === 'undefined' ? 'undefined' : (0, _typeof3.default)(objB)) !== 'object' ||
  objB === null)
  {
    return false;
  }

  var keysA = (0, _keys2.default)(objA);
  var keysB = (0, _keys2.default)(objB);

  if (keysA.length !== keysB.length) {
    return false;
  }

  return !keysA.some(function (k) {return !hasOwnProperty.call(objB, k) || objA[k] !== objB[k];});
};exports.default =

shallowEqual;module.exports = exports['default'];