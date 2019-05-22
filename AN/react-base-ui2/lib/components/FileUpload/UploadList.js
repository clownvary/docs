'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _defineProperty2 = require('babel-runtime/helpers/defineProperty');var _defineProperty3 = _interopRequireDefault(_defineProperty2);var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);var _createClass2 = require('babel-runtime/helpers/createClass');var _createClass3 = _interopRequireDefault(_createClass2);var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);var _inherits2 = require('babel-runtime/helpers/inherits');var _inherits3 = _interopRequireDefault(_inherits2);var _react = require('react');var _react2 = _interopRequireDefault(_react);
var _propTypes = require('prop-types');var _propTypes2 = _interopRequireDefault(_propTypes);
var _classnames = require('classnames');var _classnames2 = _interopRequireDefault(_classnames);
var _Progress = require('../Progress');var _Progress2 = _interopRequireDefault(_Progress);
var _DefaultCSSPrefix = require('../../consts/DefaultCSSPrefix');var _DefaultCSSPrefix2 = _interopRequireDefault(_DefaultCSSPrefix);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var

bool = _propTypes2.default.bool,string = _propTypes2.default.string,array = _propTypes2.default.array,func = _propTypes2.default.func;

var propTypes = {
  prefixCls: string,
  showRemoveIcon: bool,
  items: array,
  onRemove: func };var


UploadList = function (_React$Component) {(0, _inherits3.default)(UploadList, _React$Component);function UploadList() {var _ref;var _temp, _this, _ret;(0, _classCallCheck3.default)(this, UploadList);for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {args[_key] = arguments[_key];}return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = UploadList.__proto__ || (0, _getPrototypeOf2.default)(UploadList)).call.apply(_ref, [this].concat(args))), _this), _this.








    handleClose = function (file) {var
      onRemove = _this.props.onRemove;

      onRemove && onRemove(file);
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);}(0, _createClass3.default)(UploadList, [{ key: 'renderError', value: function renderError()

    {var _props =
      this.props,errorMessage = _props.errorMessage,prefixCls = _props.prefixCls;

      if (!errorMessage) {
        return null;
      }

      return (
        _react2.default.createElement('div', { className: prefixCls + '-list-error' },
          _react2.default.createElement('span', { className: 'icon icon-times-circle' }),
          _react2.default.createElement('span', null, errorMessage)));


    } }, { key: 'render', value: function render()

    {var _this2 = this;var _props2 =
      this.props,prefixCls = _props2.prefixCls,items = _props2.items,showRemoveIcon = _props2.showRemoveIcon,className = _props2.className;

      if (!items.length) {
        return null;
      }

      var listNode = items.map(function (file) {var _classNames;
        var progress = void 0;

        if (file.status === 'uploading') {
          var loadingProgress = 'percent' in file ?
          _react2.default.createElement(_Progress2.default, { percent: file.percent, showInfo: false, size: 'sm' }) : null;

          progress =
          _react2.default.createElement('div', { className: prefixCls + '-list-item-progress' },
            loadingProgress);


        }

        var removeIconCross = showRemoveIcon && file.status !== 'error' ?
        _react2.default.createElement('i', {
          className: 'icon icon-close',
          onClick: function onClick() {return _this2.handleClose(file);} }) :

        null;

        var infoUploadingClass = (0, _classnames2.default)((_classNames = {}, (0, _defineProperty3.default)(_classNames,
        prefixCls + '-list-item', true), (0, _defineProperty3.default)(_classNames,
        prefixCls + '-list-item-' + file.status, file.status), _classNames));


        return (
          _react2.default.createElement('div', { className: infoUploadingClass, key: file.uid },
            _react2.default.createElement('div', { className: prefixCls + '-list-item-content' },
              _react2.default.createElement('span', {
                  className: prefixCls + '-list-item-content__name',
                  title: file.name },

                _react2.default.createElement('i', { className: 'icon icon-file-solid-m' }),
                _react2.default.createElement('span', null, file.name)),

              file.status === 'done' ? _react2.default.createElement('i', { className: 'icon icon-check' }) : removeIconCross),

            file.status === 'error' &&
            _react2.default.createElement('div', { className: prefixCls + '-list-item-error-info' },
              _react2.default.createElement('span', { className: 'icon icon-times-circle' }),
              file.errorInfo || 'unknown error'),


            progress));


      });

      var listClassNames = (0, _classnames2.default)((0, _defineProperty3.default)({},
      prefixCls + '-list', true),
      className);

      return (
        _react2.default.createElement('div', {
            className: listClassNames },

          this.renderError(),
          listNode));


    } }]);return UploadList;}(_react2.default.Component);UploadList.propTypes = propTypes;UploadList.defaultProps = { prefixCls: _DefaultCSSPrefix2.default + '-upload', showRemoveIcon: true, items: [] };exports.default = UploadList;module.exports = exports['default'];