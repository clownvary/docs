'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _extends2 = require('babel-runtime/helpers/extends');var _extends3 = _interopRequireDefault(_extends2);var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);var _createClass2 = require('babel-runtime/helpers/createClass');var _createClass3 = _interopRequireDefault(_createClass2);var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);var _inherits2 = require('babel-runtime/helpers/inherits');var _inherits3 = _interopRequireDefault(_inherits2);var _react = require('react');var _react2 = _interopRequireDefault(_react);
var _classnames = require('classnames');var _classnames2 = _interopRequireDefault(_classnames);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var


ErrorList = function (_PureComponent) {(0, _inherits3.default)(ErrorList, _PureComponent);function ErrorList() {(0, _classCallCheck3.default)(this, ErrorList);return (0, _possibleConstructorReturn3.default)(this, (ErrorList.__proto__ || (0, _getPrototypeOf2.default)(ErrorList)).apply(this, arguments));}(0, _createClass3.default)(ErrorList, [{ key: 'render', value: function render()
    {var _props =
      this.props,messages = _props.messages,className = _props.className,props = (0, _objectWithoutProperties3.default)(_props, ['messages', 'className']);
      return (
        _react2.default.createElement('div', (0, _extends3.default)({}, props, { className: (0, _classnames2.default)('an-error-list', className) }),
          messages.map(function (msg, i) {return (
              _react2.default.createElement('div', { key: i, className: 'an-error' },
                _react2.default.createElement('span', { className: 'icon aaui-alert-error-icon icon-times-circle' }),
                _react2.default.createElement('span', null, msg)));})));






    } }]);return ErrorList;}(_react.PureComponent);exports.default = ErrorList;module.exports = exports['default'];