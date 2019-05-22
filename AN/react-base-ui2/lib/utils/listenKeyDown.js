'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _isArray = require('lodash/isArray');var _isArray2 = _interopRequireDefault(_isArray);
var _isFunction = require('lodash/isFunction');var _isFunction2 = _interopRequireDefault(_isFunction);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}exports.default =

function (e, keyCodes, handler) {
  if (e && (0, _isArray2.default)(keyCodes) && keyCodes.length > 0 && (0, _isFunction2.default)(handler)) {
    var keyCode = e.keyCode || e.which;

    if (keyCodes.indexOf(keyCode) > -1) {
      handler();
      e.preventDefault();
    }
  }
};module.exports = exports['default'];