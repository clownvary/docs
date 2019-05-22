'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _extends2 = require('babel-runtime/helpers/extends');var _extends3 = _interopRequireDefault(_extends2);var _defineProperty2 = require('babel-runtime/helpers/defineProperty');var _defineProperty3 = _interopRequireDefault(_defineProperty2);var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);var _createClass2 = require('babel-runtime/helpers/createClass');var _createClass3 = _interopRequireDefault(_createClass2);var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);var _inherits2 = require('babel-runtime/helpers/inherits');var _inherits3 = _interopRequireDefault(_inherits2);var _react = require('react');var _react2 = _interopRequireDefault(_react);
var _propTypes = require('prop-types');
var _classnames = require('classnames');var _classnames2 = _interopRequireDefault(_classnames);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

var icons = {
  success: 'check-circle',
  warning: 'exclamation-circle',
  danger: 'times-circle',
  error: 'times-circle',
  info: 'info-circle' };


var arias = {
  success: 'success icon',
  warning: 'warning icon',
  danger: 'alert icon',
  error: 'error icon',
  info: 'info icon' };var


Alert = function (_PureComponent) {(0, _inherits3.default)(Alert, _PureComponent);function Alert() {(0, _classCallCheck3.default)(this, Alert);return (0, _possibleConstructorReturn3.default)(this, (Alert.__proto__ || (0, _getPrototypeOf2.default)(Alert)).apply(this, arguments));}(0, _createClass3.default)(Alert, [{ key: 'render', value: function render()


















    {var _classNames;var _props =









      this.props,className = _props.className,style = _props.style,type = _props.type,noClose = _props.noClose,inverse = _props.inverse,onClose = _props.onClose,children = _props.children,rest = (0, _objectWithoutProperties3.default)(_props, ['className', 'style', 'type', 'noClose', 'inverse', 'onClose', 'children']);

      var classes = (0, _classnames2.default)((_classNames = {
        alert: true }, (0, _defineProperty3.default)(_classNames, 'alert-' +
      type, type), (0, _defineProperty3.default)(_classNames, 'alert-' +
      type + '--inverse', type && inverse), (0, _defineProperty3.default)(_classNames,
      'alert-dismissable', !noClose), _classNames),

      className);


      return (
        _react2.default.createElement('div', (0, _extends3.default)({}, rest, { className: classes, style: style, role: 'alert' }),
          _react2.default.createElement('span', { className: 'icon icon-' + icons[type], 'aria-label': '' + arias[type] }),
          children,
          noClose ?
          undefined :

          _react2.default.createElement('button', { type: 'button', className: 'close', onClick: onClose }, '\xD7')));





    } }]);return Alert;}(_react.PureComponent);Alert.displayName = 'Alert';Alert.propTypes = { type: (0, _propTypes.oneOf)(['success', 'warning', 'danger', 'error', 'info']).isRequired, // `error` is an alias for `danger`
  className: _propTypes.string, style: _propTypes.object, // eslint-disable-line
  noClose: _propTypes.bool, inverse: _propTypes.bool, onClose: _propTypes.func, children: _propTypes.node };Alert.defaultProps = { type: 'info', noClose: false, inverse: false };exports.default = Alert;module.exports = exports['default'];