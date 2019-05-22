'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _keys = require('babel-runtime/core-js/object/keys');var _keys2 = _interopRequireDefault(_keys);exports.default =












isFSA;var _isPlainObject = require('lodash/isPlainObject');var _isPlainObject2 = _interopRequireDefault(_isPlainObject);var _isString = require('lodash/isString');var _isString2 = _interopRequireDefault(_isString);var _isSymbol = require('lodash/isSymbol');var _isSymbol2 = _interopRequireDefault(_isSymbol);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function isValidKey(key) {return ['type', 'payload', 'error', 'meta'].indexOf(key) > -1;}function isFSA(action) {
  return (
    (0, _isPlainObject2.default)(action) && (
    (0, _isString2.default)(action.type) || (0, _isSymbol2.default)(action.type)) &&
    (0, _keys2.default)(action).every(isValidKey));

}module.exports = exports['default'];