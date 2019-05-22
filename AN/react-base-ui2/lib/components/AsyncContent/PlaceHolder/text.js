"use strict";Object.defineProperty(exports, "__esModule", { value: true });var _react = require("react");var _react2 = _interopRequireDefault(_react);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}exports.default =

function (placeHolder) {return (
    _react2.default.createElement("div", { className: "text-loader" },
      _react2.default.createElement("span", { className: "text-loader__text" }, placeHolder),
      _react2.default.createElement("span", { className: "text-loader__dot" }, "."),
      _react2.default.createElement("span", { className: "text-loader__dot" }, "."),
      _react2.default.createElement("span", { className: "text-loader__dot" }, ".")));};module.exports = exports['default'];