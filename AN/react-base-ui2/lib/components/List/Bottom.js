'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);var _createClass2 = require('babel-runtime/helpers/createClass');var _createClass3 = _interopRequireDefault(_createClass2);var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);var _inherits2 = require('babel-runtime/helpers/inherits');var _inherits3 = _interopRequireDefault(_inherits2);var _react = require('react');var _react2 = _interopRequireDefault(_react);
var _propTypes = require('prop-types');var _propTypes2 = _interopRequireDefault(_propTypes);
var _isFunction = require('lodash/isFunction');var _isFunction2 = _interopRequireDefault(_isFunction);
var _classnames = require('classnames');var _classnames2 = _interopRequireDefault(_classnames);

var _Checkbox = require('../Checkbox');var _Checkbox2 = _interopRequireDefault(_Checkbox);

var _consts = require('../../consts');function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

var BottomPropTypes = {
  config: _propTypes2.default.shape({
    disabled: _propTypes2.default.bool,
    checkable: _propTypes2.default.bool, // determine whether show the checkbox before list item
    showCheckAll: _propTypes2.default.bool, // determine whether show the checkbox before list item
    sortable: _propTypes2.default.bool // can be sorted
  }),

  onSort: _propTypes2.default.func,
  onCheckAll: _propTypes2.default.func };var


Bottom = function (_React$PureComponent) {(0, _inherits3.default)(Bottom, _React$PureComponent);function Bottom() {(0, _classCallCheck3.default)(this, Bottom);return (0, _possibleConstructorReturn3.default)(this, (Bottom.__proto__ || (0, _getPrototypeOf2.default)(Bottom)).apply(this, arguments));}(0, _createClass3.default)(Bottom, [{ key: 'renderCheckbox', value: function renderCheckbox()



    {var _props =
      this.props,_props$config = _props.config,disabled = _props$config.disabled,checkable = _props$config.checkable,showCheckAll = _props$config.showCheckAll,onCheckAll = _props.onCheckAll;
      return checkable && showCheckAll &&
      _react2.default.createElement(_Checkbox2.default, {
        disabled: disabled,
        onChange: function onChange(e) {return onCheckAll(e.target.checked);} });

    } }, { key: 'renderSort', value: function renderSort()

    {var _props2 =
      this.props,_props2$config = _props2.config,disabled = _props2$config.disabled,sortable = _props2$config.sortable,onSort = _props2.onSort;
      return sortable && (0, _isFunction2.default)(onSort) &&
      _react2.default.createElement('span', null,
        _react2.default.createElement('i', { className: 'icon icon-caret-up', onClick: function onClick() {return !disabled && onSort(_consts.SortOrder.ASC);} }),
        _react2.default.createElement('span', null, 'test'),
        _react2.default.createElement('i', { className: 'icon icon-caret-down', onClick: function onClick() {return !disabled && onSort(_consts.SortOrder.DESC);} }));


    } }, { key: 'renderPageCount', value: function renderPageCount()

    {var _props3 =
      this.props,asyncable = _props3.config.asyncable,data = _props3.data;
      return (
        asyncable && _react2.default.createElement('span', null, ' ', data.length, ' '));

    } }, { key: 'renderLoading', value: function renderLoading()

    {var
      isLoading = this.props.isLoading;
      return (
        isLoading && _react2.default.createElement('div', { className: 'icon icon-loading-m icon-spin' }, 'loading...'));

    } }, { key: 'render', value: function render()

    {var _props4 =








      this.props,_props4$config = _props4.config,prefix = _props4$config.prefix,checkable = _props4$config.checkable,showCheckAll = _props4$config.showCheckAll,sortable = _props4$config.sortable,asyncable = _props4$config.asyncable,onSort = _props4.onSort,isLoading = _props4.isLoading;

      var isBottomEmpty = !(checkable && showCheckAll ||
      sortable && (0, _isFunction2.default)(onSort) ||
      asyncable || isLoading);

      return (
        !isBottomEmpty ?
        _react2.default.createElement('div', { className: (0, _classnames2.default)(prefix + 'list__bottom', { hidden: isBottomEmpty }) },
          this.renderCheckbox(),
          this.renderSort(),
          this.renderPageCount(),
          this.renderLoading()) :
        null);

    } }]);return Bottom;}(_react2.default.PureComponent);Bottom.displayName = 'Bottom';Bottom.propsType = BottomPropTypes;exports.default =


Bottom;module.exports = exports['default'];