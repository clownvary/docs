'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _defineProperty2 = require('babel-runtime/helpers/defineProperty');var _defineProperty3 = _interopRequireDefault(_defineProperty2);var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);var _createClass2 = require('babel-runtime/helpers/createClass');var _createClass3 = _interopRequireDefault(_createClass2);var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);var _inherits2 = require('babel-runtime/helpers/inherits');var _inherits3 = _interopRequireDefault(_inherits2);var _react = require('react');var _react2 = _interopRequireDefault(_react);
var _classnames = require('classnames');var _classnames2 = _interopRequireDefault(_classnames);
var _isFunction = require('lodash/isFunction');var _isFunction2 = _interopRequireDefault(_isFunction);
var _propTypes = require('prop-types');
require('./index.less');function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var

Toast = function (_Component) {(0, _inherits3.default)(Toast, _Component);function Toast() {var _ref;var _temp, _this, _ret;(0, _classCallCheck3.default)(this, Toast);for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {args[_key] = arguments[_key];}return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = Toast.__proto__ || (0, _getPrototypeOf2.default)(Toast)).call.apply(_ref, [this].concat(args))), _this), _this.
























    onClose = function () {
      _this.clearCloseTimer();
      _this.props.onClose();
    }, _this.

    onClick = function (e) {
      (0, _isFunction2.default)(_this.props.onClick) && _this.props.onClick(e);
    }, _this.

    startCloseTimer = function () {var
      duration = _this.props.duration;
      if (duration) {
        _this.closeTimer = setTimeout(function () {
          _this.onClose();
        }, duration * 1000);
      }
    }, _this.

    clearCloseTimer = function () {
      if (_this.closeTimer) {
        clearTimeout(_this.closeTimer);
        _this.closeTimer = null;
      }
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);}(0, _createClass3.default)(Toast, [{ key: 'componentDidMount', value: function componentDidMount() {this.startCloseTimer();} }, { key: 'componentWillUnmount', value: function componentWillUnmount() {this.clearCloseTimer();} }, { key: 'render', value: function render()

    {var _props =
      this.props,prefixCls = _props.prefixCls,className = _props.className,closable = _props.closable,style = _props.style,children = _props.children,closeIcon = _props.closeIcon;
      var componentClass = prefixCls + '-toast';
      var toastClassName = (0, _classnames2.default)(
      componentClass,
      className, (0, _defineProperty3.default)({},

      componentClass + '--closable', closable));


      return (
        _react2.default.createElement('div', {
            className: toastClassName,
            style: style,
            onMouseEnter: this.clearCloseTimer,
            onMouseLeave: this.startCloseTimer,
            onClick: this.onClick },

          _react2.default.createElement('div', { className: componentClass + '__content' }, children),
          closable &&
          _react2.default.createElement('a', { tabIndex: '0', onClick: this.onClose, className: componentClass + '__close' },
            closeIcon || _react2.default.createElement('span', { className: componentClass + '__close__x' }))));




    } }]);return Toast;}(_react.Component);Toast.propTypes = { duration: _propTypes.number, onClose: _propTypes.func, children: _propTypes.node, closeIcon: _propTypes.node, closable: _propTypes.boolean, prefixCls: _propTypes.string };Toast.defaultProps = { onClose: function onClose() {}, duration: 1.5, closable: true, prefixCls: 'an' };exports.default =



Toast;module.exports = exports['default'];