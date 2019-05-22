'use strict';

exports.__esModule = true;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Viewport = require('./Viewport');

var _Viewport2 = _interopRequireDefault(_Viewport);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function HideAt(props) {
  return _react2.default.createElement(_Viewport2.default, (0, _extends3.default)({ not: true }, props));
}

exports.default = HideAt;
module.exports = exports['default'];