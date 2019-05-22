'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _extends2 = require('babel-runtime/helpers/extends');var _extends3 = _interopRequireDefault(_extends2);var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);var _createClass2 = require('babel-runtime/helpers/createClass');var _createClass3 = _interopRequireDefault(_createClass2);var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);var _inherits2 = require('babel-runtime/helpers/inherits');var _inherits3 = _interopRequireDefault(_inherits2);var _react = require('react');var _react2 = _interopRequireDefault(_react);
var _propTypes = require('prop-types');var _propTypes2 = _interopRequireDefault(_propTypes);
var _classnames = require('classnames');var _classnames2 = _interopRequireDefault(_classnames);

var _consts = require('../../../consts');function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

/* eslint-disable no-script-url */

var TabbablePropTypes = {
  prefixCls: _propTypes2.default.string,
  /**
                                          * class names which were applied to component container div.
                                          */
  className: _propTypes2.default.string,
  /**
                                          * the callback function which is triggered when clicking the component.
                                          */
  onClick: _propTypes2.default.func };


var TabbableDefaultProps = {
  prefixCls: _consts.DefaultCSSPrefix + '-tabbable' };var


Tabbable = function (_React$Component) {(0, _inherits3.default)(Tabbable, _React$Component);function Tabbable() {var _ref;var _temp, _this, _ret;(0, _classCallCheck3.default)(this, Tabbable);for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {args[_key] = arguments[_key];}return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = Tabbable.__proto__ || (0, _getPrototypeOf2.default)(Tabbable)).call.apply(_ref, [this].concat(args))), _this), _this.




    handleClick = function (e) {var
      onClick = _this.props.onClick;
      onClick && onClick(e);
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);}(0, _createClass3.default)(Tabbable, [{ key: 'render', value: function render()

    {var _props =
      this.props,prefixCls = _props.prefixCls,className = _props.className,children = _props.children,rest = (0, _objectWithoutProperties3.default)(_props, ['prefixCls', 'className', 'children']);
      return (
        _react2.default.createElement('span', { onClick: this.handleClick, className: (0, _classnames2.default)(prefixCls, className) },
          _react2.default.createElement('a', (0, _extends3.default)({
              href: 'javascript:void(0)',
              role: 'button',
              className: prefixCls + '__fake-link' },
            rest),

            children,
            _react2.default.createElement('span', { style: { display: 'none' } }, 'wcag_hidden_text'))));



    } }]);return Tabbable;}(_react2.default.Component);Tabbable.propTypes = TabbablePropTypes;Tabbable.defaultProps = TabbableDefaultProps;exports.default =


Tabbable;module.exports = exports['default'];