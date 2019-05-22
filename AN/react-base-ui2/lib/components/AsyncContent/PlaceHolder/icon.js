"use strict";Object.defineProperty(exports, "__esModule", { value: true });var _react = require("react");var _react2 = _interopRequireDefault(_react);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}exports.default =

function (placeHolder) {return (
    _react2.default.createElement("div", { className: "icon-loader" },
      _react2.default.createElement("div", { className: "icon-loader__icon" },
        _react2.default.createElement("i", { className: "icon icon-loading-m icon-spin" }),
        _react2.default.createElement("div", { className: "icon-loader__text" }, placeHolder, "..."))));};module.exports = exports['default'];