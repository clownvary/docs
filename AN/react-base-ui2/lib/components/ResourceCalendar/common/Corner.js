"use strict";Object.defineProperty(exports, "__esModule", { value: true });var _getPrototypeOf = require("babel-runtime/core-js/object/get-prototype-of");var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);var _createClass2 = require("babel-runtime/helpers/createClass");var _createClass3 = _interopRequireDefault(_createClass2);var _possibleConstructorReturn2 = require("babel-runtime/helpers/possibleConstructorReturn");var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);var _inherits2 = require("babel-runtime/helpers/inherits");var _inherits3 = _interopRequireDefault(_inherits2);var _react = require("react");var _react2 = _interopRequireDefault(_react);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var


Corner = function (_React$PureComponent) {(0, _inherits3.default)(Corner, _React$PureComponent);function Corner() {(0, _classCallCheck3.default)(this, Corner);return (0, _possibleConstructorReturn3.default)(this, (Corner.__proto__ || (0, _getPrototypeOf2.default)(Corner)).apply(this, arguments));}(0, _createClass3.default)(Corner, [{ key: "render", value: function render()

    {var
      cornerLabel = this.props.cornerLabel;
      return (
        _react2.default.createElement("div", { className: "an-rc-grid an-rc-grid-corner" },
          _react2.default.createElement("div", { className: "grid-cell" },
            _react2.default.createElement("div", { className: "cell-content" },
              _react2.default.createElement("span", null, cornerLabel)))));




    } }]);return Corner;}(_react2.default.PureComponent);exports.default =



Corner;module.exports = exports['default'];