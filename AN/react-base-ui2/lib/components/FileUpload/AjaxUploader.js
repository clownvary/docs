'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _extends2 = require('babel-runtime/helpers/extends');var _extends3 = _interopRequireDefault(_extends2);var _defineProperty2 = require('babel-runtime/helpers/defineProperty');var _defineProperty3 = _interopRequireDefault(_defineProperty2);var _keys = require('babel-runtime/core-js/object/keys');var _keys2 = _interopRequireDefault(_keys);var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);var _createClass2 = require('babel-runtime/helpers/createClass');var _createClass3 = _interopRequireDefault(_createClass2);var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);var _inherits2 = require('babel-runtime/helpers/inherits');var _inherits3 = _interopRequireDefault(_inherits2);var _react = require('react');var _react2 = _interopRequireDefault(_react);
var _propTypes = require('prop-types');var _propTypes2 = _interopRequireDefault(_propTypes);
var _classnames = require('classnames');var _classnames2 = _interopRequireDefault(_classnames);
var _uniqueId = require('lodash/uniqueId');var _uniqueId2 = _interopRequireDefault(_uniqueId);
var _isArray = require('lodash/isArray');var _isArray2 = _interopRequireDefault(_isArray);
var _isEmpty = require('lodash/isEmpty');var _isEmpty2 = _interopRequireDefault(_isEmpty);
var _isFunction = require('lodash/isFunction');var _isFunction2 = _interopRequireDefault(_isFunction);
var _request = require('./request');var _request2 = _interopRequireDefault(_request);
var _attrAccept = require('./attrAccept');var _attrAccept2 = _interopRequireDefault(_attrAccept);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var

bool = _propTypes2.default.bool,string = _propTypes2.default.string,object = _propTypes2.default.object,oneOfType = _propTypes2.default.oneOfType,func = _propTypes2.default.func;

var propTypes = {
  prefixCls: string,
  multiple: bool,
  disabled: bool,
  headers: object,
  accept: string,
  name: string,
  action: string,
  uploadElemId: string,
  data: oneOfType([object, func]),
  withCredentials: bool,
  onBeforeUpload: func,
  renderContent: func };var


AjaxUploader = function (_React$Component) {(0, _inherits3.default)(AjaxUploader, _React$Component);function AjaxUploader() {var _ref;var _temp, _this, _ret;(0, _classCallCheck3.default)(this, AjaxUploader);for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {args[_key] = arguments[_key];}return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = AjaxUploader.__proto__ || (0, _getPrototypeOf2.default)(AjaxUploader)).call.apply(_ref, [this].concat(args))), _this), _this.










    onFileDrop = function (e) {
      if (e.type === 'dragover') {
        e.preventDefault();
        return;
      }

      var files = Array.prototype.slice.call(e.dataTransfer.files).filter(
      function (file) {return (0, _attrAccept2.default)(file, _this.props.accept);});

      _this.uploadFiles(files);

      e.preventDefault();
    }, _this.

    onChange = function (e) {
      var files = e.target.files;

      _this.uploadFiles(files);
    }, _this.

    onClick = function (e) {var
      uploadElemId = _this.props.uploadElemId;
      if (e.target.getAttribute('id') !== uploadElemId) {
        return;
      }

      var inputElem = _this.fileInput;
      /* istanbul ignore if */
      if (!inputElem) {
        return;
      }

      inputElem.value = '';

      inputElem.click();
    }, _this.

    triggerUpload = function () {
      var inputElem = _this.fileInput;
      /* istanbul ignore if */
      if (!inputElem) {
        return;
      }

      inputElem.value = '';

      inputElem.click();
    }, _this.

    onKeyDown = function (e) {
      if (e.key === 'Enter') {
        _this.onClick(e);
      }
    }, _this.

    reqs = {}, _this.


























































































    saveFileInput = function (node) {
      _this.fileInput = node;
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);}(0, _createClass3.default)(AjaxUploader, [{ key: 'componentDidMount', value: function componentDidMount() {this._isMounted = true;} }, { key: 'componentWillUnmount', value: function componentWillUnmount() {this._isMounted = false;this.abort();} }, { key: 'uploadFiles', value: function uploadFiles(files) {var _this2 = this;var onBeforeUpload = this.props.onBeforeUpload;var postFiles = Array.prototype.slice.call(files);postFiles.forEach(function (file) {file.uid = (0, _uniqueId2.default)(_this2.props.prefixCls);if (!(0, _isFunction2.default)(onBeforeUpload)) {_this2.upload(file, postFiles);}});if ((0, _isFunction2.default)(onBeforeUpload)) {var postfileList = onBeforeUpload(postFiles); /* istanbul ignore else */if ((0, _isArray2.default)(postfileList) && !(0, _isEmpty2.default)(postfileList)) {postfileList.forEach(function (file) {_this2.upload(file, postfileList);});}}} }, { key: 'upload', value: function upload(file) {var _this3 = this; // always async in case use react state to keep fileList
      setTimeout(function () {return _this3.post(file);}, 0);} }, { key: 'post', value: function post(file) {var _this4 = this; /* istanbul ignore if */if (!this._isMounted) {return;}var data = this.props.data;var _props = this.props,onStart = _props.onStart,_onProgress = _props.onProgress,_onSuccess = _props.onSuccess,_onError = _props.onError,action = _props.action,name = _props.name,headers = _props.headers,withCredentials = _props.withCredentials; /* istanbul ignore else */if (typeof data === 'function') {data = data(file);}var uid = file.uid; /* istanbul ignore next */this.reqs[uid] = (0, _request2.default)({ action: action, filename: name, file: file, data: data, headers: headers, withCredentials: withCredentials, onProgress: function onProgress(e) {_onProgress(e, file);}, onSuccess: function onSuccess(ret, xhr) {delete _this4.reqs[uid];_onSuccess(ret, file, xhr);}, onError: function onError(err, ret) {delete _this4.reqs[uid];_onError(err, ret, file);} });onStart(file);} }, { key: 'abort', value: function abort(file) {var reqs = this.reqs;if (file) {var uid = file;if (file && file.uid) {uid = file.uid;} /* istanbul ignore if */if (reqs[uid]) {reqs[uid].abort();delete reqs[uid];}} else {(0, _keys2.default)(reqs).forEach(function (uid) {/* istanbul ignore else */if (reqs[uid]) {reqs[uid].abort();}delete reqs[uid];});}} }, { key: 'render', value: function render()
    {var _classNames;var _props2 =
      this.props,prefixCls = _props2.prefixCls,disabled = _props2.disabled,multiple = _props2.multiple,accept = _props2.accept,renderContent = _props2.renderContent;

      var cls = (0, _classnames2.default)((_classNames = {}, (0, _defineProperty3.default)(_classNames,
      prefixCls + '-container', true), (0, _defineProperty3.default)(_classNames,
      prefixCls + '-disabled', disabled), _classNames));


      var events = disabled ? {} : {
        onClick: this.onClick,
        onDrop: this.onFileDrop,
        onKeyDown: this.onKeyDown,
        onDragOver: this.onFileDrop,
        tabIndex: '0' };


      return (
        _react2.default.createElement('span', (0, _extends3.default)({},
          events, {
            className: cls,
            role: 'button' }),

          _react2.default.createElement('input', {
            type: 'file',
            className: prefixCls + '-input',
            ref: this.saveFileInput,
            accept: accept,
            multiple: multiple,
            onChange: this.onChange }),

          _react2.default.createElement('div', { className: prefixCls + '-drag-container' },

            renderContent && (0, _isFunction2.default)(renderContent) ?
            renderContent(this.triggerUpload) : null)));




    } }]);return AjaxUploader;}(_react2.default.Component);AjaxUploader.propTypes = propTypes;exports.default = AjaxUploader;module.exports = exports['default'];