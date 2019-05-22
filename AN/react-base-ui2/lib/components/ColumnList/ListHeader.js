'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);var _createClass2 = require('babel-runtime/helpers/createClass');var _createClass3 = _interopRequireDefault(_createClass2);var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);var _inherits2 = require('babel-runtime/helpers/inherits');var _inherits3 = _interopRequireDefault(_inherits2);var _react = require('react');var _react2 = _interopRequireDefault(_react);
var _propTypes = require('prop-types');var _propTypes2 = _interopRequireDefault(_propTypes);
var _classnames = require('classnames');var _classnames2 = _interopRequireDefault(_classnames);
var _identity = require('lodash/identity');var _identity2 = _interopRequireDefault(_identity);
var _debounce = require('lodash/debounce');var _debounce2 = _interopRequireDefault(_debounce);

var _Input = require('../Input');var _Input2 = _interopRequireDefault(_Input);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

var ListHeaderPropTypes = {
  disabled: _propTypes2.default.bool,
  onFilter: _propTypes2.default.func,
  refFilterInput: _propTypes2.default.func,
  filterPlaceholder: _propTypes2.default.string };


var ListHeaderProps = {
  disabled: false,
  onFilter: _identity2.default,
  refFilterInput: _identity2.default,
  filterPlaceholder: 'Filter...' };var


ListHeader = function (_React$PureComponent) {(0, _inherits3.default)(ListHeader, _React$PureComponent);function ListHeader() {(0, _classCallCheck3.default)(this, ListHeader);return (0, _possibleConstructorReturn3.default)(this, (ListHeader.__proto__ || (0, _getPrototypeOf2.default)(ListHeader)).apply(this, arguments));}(0, _createClass3.default)(ListHeader, [{ key: 'renderFilter', value: function renderFilter()




    {var _props =
      this.props,disabled = _props.disabled,onFilter = _props.onFilter,filterPlaceholder = _props.filterPlaceholder,refFilterInput = _props.refFilterInput;
      return _react2.default.createElement(_Input2.default, {
        size: 'md',
        preIcon: 'icon-search',
        disabled: disabled,
        placeholder: filterPlaceholder,
        inputRef: refFilterInput,
        onChange: (0, _debounce2.default)(function (e) {return onFilter({ keyword: e.target.value });}, 300) });

    } }, { key: 'render', value: function render()

    {
      return (
        _react2.default.createElement('div', { className: (0, _classnames2.default)('an-columnlist__header') },
          this.renderFilter()));


    } }]);return ListHeader;}(_react2.default.PureComponent);ListHeader.displayName = 'ListHeader';ListHeader.propsType = ListHeaderPropTypes;ListHeader.defaultProps = ListHeaderProps;exports.default =


ListHeader;module.exports = exports['default'];