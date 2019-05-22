'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);var _createClass2 = require('babel-runtime/helpers/createClass');var _createClass3 = _interopRequireDefault(_createClass2);var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);var _inherits2 = require('babel-runtime/helpers/inherits');var _inherits3 = _interopRequireDefault(_inherits2);var _react = require('react');var _react2 = _interopRequireDefault(_react);
var _classnames = require('classnames');var _classnames2 = _interopRequireDefault(_classnames);
var _isFunction = require('lodash/isFunction');var _isFunction2 = _interopRequireDefault(_isFunction);
var _decoration = require('../../../services/decoration');
var _consts = require('../../../consts');function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var

ResourceCell = function (_React$PureComponent) {(0, _inherits3.default)(ResourceCell, _React$PureComponent);function ResourceCell() {(0, _classCallCheck3.default)(this, ResourceCell);return (0, _possibleConstructorReturn3.default)(this, (ResourceCell.__proto__ || (0, _getPrototypeOf2.default)(ResourceCell)).apply(this, arguments));}(0, _createClass3.default)(ResourceCell, [{ key: 'componentDidMount', value: function componentDidMount()

    {var _props =
      this.props,_onClear = _props.onClear,resource = _props.resource;

      (0, _decoration.enableClearable)(this.cell, {
        trigger: _consts.Trigger.HOVER,
        noEffect: true,
        onClear: function onClear() {
          (0, _isFunction2.default)(_onClear) && _onClear(resource);
        } });

    } }, { key: 'componentWillUnmount', value: function componentWillUnmount()

    {
      (0, _decoration.disableClearable)(this.cell);
    } }, { key: 'onResourceHeaderClick', value: function onResourceHeaderClick(

    e, resource) {
      e.stopPropagation();var

      onResourceHeaderClick = this.props.onResourceHeaderClick;
      if ((0, _isFunction2.default)(onResourceHeaderClick)) {
        onResourceHeaderClick(e, resource);
      }
    } }, { key: 'render', value: function render()

    {var _this2 = this;var _props2 =
      this.props,resource = _props2.resource,_props2$isHeader = _props2.isHeader,isHeader = _props2$isHeader === undefined ? true : _props2$isHeader,onResourceHeaderClick = _props2.onResourceHeaderClick;var _resource$type =
      resource.type,type = _resource$type === undefined ? 'facility' : _resource$type,label = resource.label;
      var t = type.toLowerCase();
      var l = (label || type).toUpperCase().split('')[0];
      return (
        isHeader ?

        _react2.default.createElement('th', {
            className: 'grid-cell resource-cell',
            ref: function ref(c) {_this2.cell = c;} },

          _react2.default.createElement('div', { className: 'cell-content' },
            _react2.default.createElement('span', { className: 'resource-tag resource-tag-' + t },
              l),

            _react2.default.createElement('span', {
                className: (0, _classnames2.default)('resource-name', { 'an-rc-clickable': (0, _isFunction2.default)(onResourceHeaderClick) }),
                onClick: function onClick(e) {return _this2.onResourceHeaderClick(e, resource);} },

              resource.name))) :





        _react2.default.createElement('td', {
            className: 'grid-cell',
            ref: function ref(c) {_this2.cell = c;} },

          _react2.default.createElement('span', { className: 'resource-tag resource-tag-' + t },
            l),

          _react2.default.createElement('span', {
              className: (0, _classnames2.default)('resource-name', { 'an-rc-clickable': (0, _isFunction2.default)(onResourceHeaderClick) }),
              onClick: function onClick(e) {return _this2.onResourceHeaderClick(e, resource);} },

            resource.name)));




    } }]);return ResourceCell;}(_react2.default.PureComponent);exports.default =



ResourceCell;module.exports = exports['default'];