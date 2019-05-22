'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _typeof2 = require('babel-runtime/helpers/typeof');var _typeof3 = _interopRequireDefault(_typeof2);exports.default = isPromise;function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function isPromise(value) {
  if (value !== null && (typeof value === 'undefined' ? 'undefined' : (0, _typeof3.default)(value)) === 'object') {
    return value && typeof value.then === 'function';
  }

  return false;
}module.exports = exports['default'];