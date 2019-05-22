'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _extends2 = require('babel-runtime/helpers/extends');var _extends3 = _interopRequireDefault(_extends2);exports.default =


render;var _react = require('react');var _react2 = _interopRequireDefault(_react);var _classnames = require('classnames');var _classnames2 = _interopRequireDefault(_classnames);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function render(value, props) {
  return _react2.default.createElement('span', (0, _extends3.default)({}, props, { className: (0, _classnames2.default)(props.className, 'text') }), value);
}module.exports = exports['default'];