'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);var _createClass2 = require('babel-runtime/helpers/createClass');var _createClass3 = _interopRequireDefault(_createClass2);var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);var _inherits2 = require('babel-runtime/helpers/inherits');var _inherits3 = _interopRequireDefault(_inherits2);var _react = require('react');var _react2 = _interopRequireDefault(_react);
var _propTypes = require('prop-types');var _propTypes2 = _interopRequireDefault(_propTypes);
var _classnames = require('classnames');var _classnames2 = _interopRequireDefault(_classnames);
var _isFunction = require('lodash/isFunction');var _isFunction2 = _interopRequireDefault(_isFunction);

var _Input = require('../Input');var _Input2 = _interopRequireDefault(_Input);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

var HeaderPropTypes = {
  config: _propTypes2.default.shape({
    disabled: _propTypes2.default.bool,
    filterable: _propTypes2.default.bool // can be filter by inputted value
  }),

  onFilter: _propTypes2.default.func };var


Header = function (_React$PureComponent) {(0, _inherits3.default)(Header, _React$PureComponent);function Header() {(0, _classCallCheck3.default)(this, Header);return (0, _possibleConstructorReturn3.default)(this, (Header.__proto__ || (0, _getPrototypeOf2.default)(Header)).apply(this, arguments));}(0, _createClass3.default)(Header, [{ key: 'renderFilter', value: function renderFilter()



    {var _props =
      this.props,_props$config = _props.config,disabled = _props$config.disabled,filterable = _props$config.filterable,onFilter = _props.onFilter;
      return filterable && (0, _isFunction2.default)(onFilter) &&
      _react2.default.createElement(_Input2.default, {
        preIcon: 'icon icon-search',
        disabled: disabled,
        onChange: function onChange(e) {return onFilter({ filter: e.target.value });} });

    } }, { key: 'render', value: function render()

    {var _props2 =
      this.props,_props2$config = _props2.config,prefix = _props2$config.prefix,filterable = _props2$config.filterable,onFilter = _props2.onFilter;

      var isHeaderEmpty = !(filterable && (0, _isFunction2.default)(onFilter));
      return (
        !isHeaderEmpty ?
        _react2.default.createElement('div', { className: (0, _classnames2.default)(prefix + 'list__header', { hidden: isHeaderEmpty }) },
          this.renderFilter()) :
        null);

    } }]);return Header;}(_react2.default.PureComponent);Header.displayName = 'Header';Header.propsType = HeaderPropTypes;exports.default =


Header;module.exports = exports['default'];