'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);var _createClass2 = require('babel-runtime/helpers/createClass');var _createClass3 = _interopRequireDefault(_createClass2);var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);var _inherits2 = require('babel-runtime/helpers/inherits');var _inherits3 = _interopRequireDefault(_inherits2);var _react = require('react');var _react2 = _interopRequireDefault(_react);
var _ResourceCell = require('../common/ResourceCell');var _ResourceCell2 = _interopRequireDefault(_ResourceCell);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var

Band = function (_React$PureComponent) {(0, _inherits3.default)(Band, _React$PureComponent);function Band() {(0, _classCallCheck3.default)(this, Band);return (0, _possibleConstructorReturn3.default)(this, (Band.__proto__ || (0, _getPrototypeOf2.default)(Band)).apply(this, arguments));}(0, _createClass3.default)(Band, [{ key: 'renderRow', value: function renderRow(
    resource) {var _props =
      this.props,onRemove = _props.onRemove,onResourceHeaderClick = _props.onResourceHeaderClick,rowHeight = _props.rowHeight;
      var style = {};
      if (rowHeight > 0) {
        style.height = rowHeight + 'px';
      }

      return (
        _react2.default.createElement('tr', { className: 'grid-row', style: style, key: resource.id },
          _react2.default.createElement(_ResourceCell2.default, {
            resource: resource,
            onClear: onRemove,
            onResourceHeaderClick: onResourceHeaderClick })));



    } }, { key: 'render', value: function render()

    {var _this2 = this;var _props$resources =
      this.props.resources,resources = _props$resources === undefined ? [] : _props$resources;
      return (
        _react2.default.createElement('table', { className: 'an-rc-grid an-rc-grid-band an-rc-band-resource' },
          _react2.default.createElement('tbody', null,

            resources.map(function (resource) {return (
                _this2.renderRow(resource));}))));





    } }]);return Band;}(_react2.default.PureComponent);exports.default =



Band;module.exports = exports['default'];