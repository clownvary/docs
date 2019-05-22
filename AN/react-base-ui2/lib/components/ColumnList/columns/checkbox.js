'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _extends2 = require('babel-runtime/helpers/extends');var _extends3 = _interopRequireDefault(_extends2);exports.default =


render;var _react = require('react');var _react2 = _interopRequireDefault(_react);var _Checkbox = require('../../Checkbox');var _Checkbox2 = _interopRequireDefault(_Checkbox);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function render(value, props) {
  return _react2.default.createElement(_Checkbox2.default, (0, _extends3.default)({}, props, { checked: value }));
}module.exports = exports['default'];