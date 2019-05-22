'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _stringify = require('babel-runtime/core-js/json/stringify');var _stringify2 = _interopRequireDefault(_stringify);var _keys = require('babel-runtime/core-js/object/keys');var _keys2 = _interopRequireDefault(_keys);exports.default =


getQueryString;var _isObject = require('lodash/isObject');var _isObject2 = _interopRequireDefault(_isObject);var _isArray = require('lodash/isArray');var _isArray2 = _interopRequireDefault(_isArray);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function getQueryString(object) {
  if ((0, _isObject2.default)(object)) {
    return (0, _keys2.default)(object).reduce(function (acc, item) {
      var prefix = !acc ? '' : acc + '&';
      return prefix + encodeURIComponent(item) + '=' + ((0, _isArray2.default)(object[item]) ? encodeURIComponent((0, _stringify2.default)(object[item])) : encodeURIComponent(object[item]));
    }, '');
  }
  return object;
}module.exports = exports['default'];