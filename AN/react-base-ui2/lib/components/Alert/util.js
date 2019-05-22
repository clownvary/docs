'use strict';Object.defineProperty(exports, "__esModule", { value: true });exports.clear = exports.alert = undefined;var _extends2 = require('babel-runtime/helpers/extends');var _extends3 = _interopRequireDefault(_extends2);var _map = require('babel-runtime/core-js/map');var _map2 = _interopRequireDefault(_map);var _noop = require('lodash/noop');var _noop2 = _interopRequireDefault(_noop);
var _react = require('react');var _react2 = _interopRequireDefault(_react);
var _reactDom = require('react-dom');var _reactDom2 = _interopRequireDefault(_reactDom);

var _AlertBar = require('./AlertBar');var _AlertBar2 = _interopRequireDefault(_AlertBar);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}


var alertMap = new _map2.default();

function clear() {
  alertMap.forEach(function (_ref) {var close = _ref.close;return close();});
  alertMap.clear();
}

function alert(options) {
  var props = (0, _extends3.default)({
    onClose: _noop2.default,
    multiple: false,
    inverse: true },
  options);

  var originalOnClose = props.onClose;
  var div = document.createElement('div');

  if (!props.multiple) {
    clear();
  }

  document.body.appendChild(div);

  function close() {
    alertMap.delete(div);
    // Refer to https://facebook.github.io/react/docs/react-dom.html#unmountcomponentatnode
    var unmountResult = _reactDom2.default.unmountComponentAtNode(div);

    unmountResult && div.parentNode && div.parentNode.removeChild(div);

    originalOnClose.apply(undefined, arguments);
  }

  props.onClose = close;
  alertMap.set(div, { close: close });
  _reactDom2.default.render(_react2.default.createElement(_AlertBar2.default, props), div);

  return {
    close: close };

}exports.

alert = alert;exports.clear = clear;