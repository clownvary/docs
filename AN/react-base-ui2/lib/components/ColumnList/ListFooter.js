'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);var _createClass2 = require('babel-runtime/helpers/createClass');var _createClass3 = _interopRequireDefault(_createClass2);var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);var _inherits2 = require('babel-runtime/helpers/inherits');var _inherits3 = _interopRequireDefault(_inherits2);var _react = require('react');var _react2 = _interopRequireDefault(_react);
var _propTypes = require('prop-types');var _propTypes2 = _interopRequireDefault(_propTypes);
var _identity = require('lodash/identity');var _identity2 = _interopRequireDefault(_identity);
var _isFunction = require('lodash/isFunction');var _isFunction2 = _interopRequireDefault(_isFunction);
var _classnames = require('classnames');var _classnames2 = _interopRequireDefault(_classnames);
var _consts = require('../../consts');function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

var ListFooterPropTypes = {
  disabled: _propTypes2.default.bool,
  isLoading: _propTypes2.default.bool,
  showCount: _propTypes2.default.bool,
  showClear: _propTypes2.default.bool,
  showSorter: _propTypes2.default.bool,
  showMessage: _propTypes2.default.bool,
  count: _propTypes2.default.string,
  message: _propTypes2.default.string,
  sortOrder: _propTypes2.default.string,
  selectedKeys: _propTypes2.default.array,
  onSort: _propTypes2.default.func,
  onClear: _propTypes2.default.func };


var ListFooterProps = {
  disabled: false,
  isLoading: false,
  showClear: false,
  showCount: false,
  showSorter: false,
  showMessage: false,
  count: '',
  message: '',
  sortOrder: _consts.SortOrder.ORIGIN,
  selectedKeys: [],
  onSort: _identity2.default,
  onClear: _identity2.default };var


ListFooter = function (_React$PureComponent) {(0, _inherits3.default)(ListFooter, _React$PureComponent);function ListFooter() {(0, _classCallCheck3.default)(this, ListFooter);return (0, _possibleConstructorReturn3.default)(this, (ListFooter.__proto__ || (0, _getPrototypeOf2.default)(ListFooter)).apply(this, arguments));}(0, _createClass3.default)(ListFooter, [{ key: 'renderSorter', value: function renderSorter()




    {var _props =
      this.props,disabled = _props.disabled,onSort = _props.onSort,sortOrder = _props.sortOrder;
      var sorter = void 0;

      switch (sortOrder) {
        case _consts.SortOrder.ORIGIN:
          sorter = _react2.default.createElement('i', {
            className: 'icon sorter icon-sort',
            disabled: disabled,
            onClick: function onClick() {return !disabled && onSort(_consts.SortOrder.DESC);} });

          break;
        case _consts.SortOrder.DESC:
          sorter = _react2.default.createElement('i', {
            className: 'icon sorter icon-sort-desc',
            disabled: disabled,
            onClick: function onClick() {return !disabled && onSort(_consts.SortOrder.ASC);} });

          break;
        case _consts.SortOrder.ASC:
          sorter = _react2.default.createElement('i', {
            className: 'icon sorter icon-sort-asc',
            disabled: disabled,
            onClick: function onClick() {return !disabled && onSort(_consts.SortOrder.ORIGIN);} });

          break;
        default:
          break;}


      return sorter;
    } }, { key: 'renderClear', value: function renderClear()

    {var _props2 =
      this.props,selectedKeys = _props2.selectedKeys,disabled = _props2.disabled,onClear = _props2.onClear;
      return (
        _react2.default.createElement('div', {
            className: 'clear',
            disabled: disabled || selectedKeys.length <= 0,
            onClick: onClear }, 'Clear'));




    } }, { key: 'renderCount', value: function renderCount()

    {var _props3 =
      this.props,disabled = _props3.disabled,count = _props3.count;
      return _react2.default.createElement('span', { className: 'count', disabled: disabled }, count);
    } }, { key: 'renderLoading', value: function renderLoading()

    {
      return _react2.default.createElement('div', { className: 'loading' },
        _react2.default.createElement('i', { className: 'icon icon-spinner' }),
        _react2.default.createElement('span', null, ' loading...'));

    } }, { key: 'renderMessage', value: function renderMessage()

    {
      return _react2.default.createElement('span', { className: 'message' }, this.props.message);
    } }, { key: 'render', value: function render()

    {var _props4 =







      this.props,onSort = _props4.onSort,isLoading = _props4.isLoading,showCount = _props4.showCount,showClear = _props4.showClear,showSorter = _props4.showSorter,showMessage = _props4.showMessage;

      var _showSorter = showSorter && (0, _isFunction2.default)(onSort);

      var showFooter =
      isLoading ||
      showCount ||
      showClear ||
      showMessage ||
      _showSorter;


      return showFooter &&
      _react2.default.createElement('div', { className: (0, _classnames2.default)('an-columnlist__footer') },
        _react2.default.createElement('div', null,
          isLoading && this.renderLoading(),
          !isLoading && _showSorter && this.renderSorter(),
          !isLoading && showClear && this.renderClear()),

        _react2.default.createElement('div', null,
          showMessage && this.renderMessage(),
          !showMessage && showCount && this.renderCount()));


    } }]);return ListFooter;}(_react2.default.PureComponent);ListFooter.displayName = 'ListFooter';ListFooter.propsType = ListFooterPropTypes;ListFooter.defaultProps = ListFooterProps;exports.default =


ListFooter;module.exports = exports['default'];