'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _defineProperty2 = require('babel-runtime/helpers/defineProperty');var _defineProperty3 = _interopRequireDefault(_defineProperty2);var _extends2 = require('babel-runtime/helpers/extends');var _extends3 = _interopRequireDefault(_extends2);var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);var _createClass2 = require('babel-runtime/helpers/createClass');var _createClass3 = _interopRequireDefault(_createClass2);var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);var _inherits2 = require('babel-runtime/helpers/inherits');var _inherits3 = _interopRequireDefault(_inherits2);var _react = require('react');var _react2 = _interopRequireDefault(_react);
var _propTypes = require('prop-types');var _propTypes2 = _interopRequireDefault(_propTypes);
var _classnames = require('classnames');var _classnames2 = _interopRequireDefault(_classnames);
var _findIndex = require('lodash/findIndex');var _findIndex2 = _interopRequireDefault(_findIndex);
var _dialog = require('../../services/dialog');
var _AjaxUploader = require('./AjaxUploader');var _AjaxUploader2 = _interopRequireDefault(_AjaxUploader);
var _UploadList = require('./UploadList');var _UploadList2 = _interopRequireDefault(_UploadList);
var _Modal = require('../Modal');var _Modal2 = _interopRequireDefault(_Modal);
var _DefaultCSSPrefix = require('../../consts/DefaultCSSPrefix');var _DefaultCSSPrefix2 = _interopRequireDefault(_DefaultCSSPrefix);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

function fileToObject(file) {
  return {
    lastModified: file.lastModified,
    lastModifiedDate: file.lastModifiedDate,
    name: file.filename || file.name,
    size: file.size,
    type: file.type,
    uid: file.uid,
    response: file.response,
    error: file.error,
    errorMessage: file.errorMessage,
    percent: 0,
    originFileObj: file };

}

function getFileItem(file, fileList) {
  var matchKey = file.uid !== undefined ? 'uid' : 'name';
  return fileList.filter(function (item) {return item[matchKey] === file[matchKey];})[0];
}

function getFileIndex(file, fileList) {
  /* istanbul ignore next */
  var matchKey = file.uid !== undefined ? 'uid' : 'name';
  return (0, _findIndex2.default)(fileList, function (item) {return item[matchKey] === file[matchKey];});
}

function removeFileItem(file, fileList) {
  var matchKey = file.uid !== undefined ? 'uid' : 'name';
  var removed = fileList.filter(function (item) {return item[matchKey] !== file[matchKey];});
  /* istanbul ignore next */
  if (removed.length === fileList.length) {
    return null;
  }
  return removed;
}var

bool = _propTypes2.default.bool,string = _propTypes2.default.string,object = _propTypes2.default.object,oneOfType = _propTypes2.default.oneOfType,func = _propTypes2.default.func,element = _propTypes2.default.element;

/**
                                                                                                                                                                                                                          * Default PropTypes for FileUpload
                                                                                                                                                                                                                          */
var FileUploadPropTypes = {
  /**
                             * The prefix of file upload component element class name.
                             */
  prefixCls: string,
  /**
                      * The title of file upload modal. It's could be a react element.
                      */
  modalTitle: oneOfType([string, element]),
  /**
                                             * A list of class names to pass along to the file upload modal container.
                                             */
  modalClassName: string,
  /**
                           * The inline style for file upload container element.
                           */
  style: object,
  /**
                  * A list of class names to pass along to the file upload container element.
                  */
  className: string,
  /**
                      * Determines displaying the upload file list.
                      */
  showUploadList: bool,
  /**
                         * Determines enable select the upload file by dragging.
                         */
  drag: bool,
  /**
               * The Upload file list configs which contains showRemoveIcon, errorMessage, className.
               */
  uploadListConfig: object,
  /**
                             * Determines enable upload multiple files.
                             */
  multiple: bool,
  /**
                   * Determines disable state of file upload component.
                   */
  disabled: bool,
  /**
                   * The heads of upload file http request.
                   */
  headers: object,
  /**
                    * Determines the types of files that the file upload accepts.
                    */
  accept: string,
  /**
                   * Determines the file name which was sent to server.
                   */
  name: string,
  /**
                 * Determines the URL where to send the upload file to.
                 */
  action: string,
  /**
                   * Determines the upload file dom element id.
                   */
  uploadElemId: string,
  /**
                         * Determines the upload form data. It could be function to do post process works.
                         */
  data: oneOfType([object, func]),
  /**
                                    * The function to return child nodes for file upload component
                                    */
  renderContent: func,
  /**
                        * Determines withCredentials attribute when uploading file by xhr.
                        */
  withCredentials: bool };


var FileUploadProps = {
  prefixCls: _DefaultCSSPrefix2.default + '-upload',
  modalTitle: 'Upload Files',
  modalClassName: '',
  style: {},
  className: '',
  showUploadList: true,
  headers: {},
  drag: false,
  name: 'file',
  multiple: false,
  action: '',
  data: {},
  accept: '',
  disabled: false,
  renderContent: null };var


FileUpload = function (_React$Component) {(0, _inherits3.default)(FileUpload, _React$Component);




  function FileUpload(props) {(0, _classCallCheck3.default)(this, FileUpload);var _this = (0, _possibleConstructorReturn3.default)(this, (FileUpload.__proto__ || (0, _getPrototypeOf2.default)(FileUpload)).call(this,
    props));_this.

















    onStart = function (file) {
      var nextFileList = _this.state.fileList;
      var targetItem = fileToObject(file);

      targetItem.status = 'uploading';
      nextFileList.unshift(targetItem);

      _this.onChange({
        file: targetItem,
        fileList: nextFileList });

    };_this.

    onSuccess = function (response, file) {
      try {
        if (typeof response === 'string') {
          response = JSON.parse(response);
        }
      } catch (e) {/* do nothing */}var

      fileList = _this.state.fileList;
      var targetItem = getFileItem(file, fileList);
      // removed
      if (!targetItem) {
        return;
      }

      targetItem.status = 'done';
      targetItem.response = response;

      var targetIndex = getFileIndex(file, fileList);
      fileList[targetIndex] = targetItem;

      _this.onChange({
        file: targetItem,
        fileList: fileList });

    };_this.

    onProgress = function (e, file) {var
      fileList = _this.state.fileList;
      var targetItem = getFileItem(file, fileList);
      if (!targetItem) {
        return;
      }
      targetItem.percent = e.percent;

      var targetIndex = getFileIndex(file, fileList);
      fileList[targetIndex].percent = e.percent;

      _this.onChange({
        event: e,
        file: targetItem,
        fileList: _this.state.fileList });

    };_this.

    onError = function (error, response, file) {var
      fileList = _this.state.fileList;
      var targetItem = getFileItem(file, fileList);
      // removed
      if (!targetItem) {
        return;
      }
      targetItem.error = error;
      targetItem.response = response;
      targetItem.status = 'error';

      _this.onChange({
        file: targetItem,
        fileList: fileList });

    };_this.

    onChange = function (info) {
      /* istanbul ignore if */
      if (!('fileList' in _this.props)) {
        _this.setState({ fileList: info.fileList });
      }var

      onChange = _this.props.onChange;
      /* istanbul ignore next */
      if (onChange) {
        onChange(info);
      }
    };_this.

    onFileDrop = function (e) {
      _this.setState({
        dragState: e.type });

    };_this.

    onClose = function () {var _this$props =
      _this.props,onClose = _this$props.onClose,cancelModalContent = _this$props.cancelModalContent;var
      fileList = _this.state.fileList;

      /* istanbul ignore next */
      if ((0, _findIndex2.default)(fileList, { status: 'uploading' }) !== -1) {
        var defaultOptions = {
          title: 'Cancel Upload',
          showCancel: true,
          cancelText: 'No',
          confirmText: 'Yes' };


        (0, _dialog.confirm)(
        _react2.default.createElement('div', null,
          _react2.default.createElement('p', null, cancelModalContent || 'you sure you want to cancel the upload?', ' ')), (0, _extends3.default)({},


        defaultOptions)).
        then(function () {
          _this.upload.abort();
          onClose && onClose();
        });
      } else {
        onClose && onClose();
      }
    };_this.

    handleManualRemove = function (file) {var
      onRemove = _this.props.onRemove;

      _this.upload.abort(file);

      file.status = 'removed';
      var removedFileList = removeFileItem(file, _this.state.fileList);

      /* istanbul ignore if */
      if (removedFileList) {
        _this.onChange({
          file: file,
          fileList: removedFileList });

      }

      onRemove && onRemove(file);
    };_this.

    saveUpload = function (node) {
      _this.upload = node;
    };_this.

    renderUploadList = function () {var
      uploadListConfig = _this.props.uploadListConfig;var
      showRemoveIcon = uploadListConfig.showRemoveIcon,errorMessage = uploadListConfig.errorMessage,className = uploadListConfig.className;

      return (
        _react2.default.createElement(_UploadList2.default, {
          items: _this.state.fileList,
          onRemove: _this.handleManualRemove,
          showRemoveIcon: showRemoveIcon,
          errorMessage: errorMessage,
          className: className }));


    };_this.state = { fileList: props.fileList || props.defualtFileList || [], dragState: 'drop' };return _this;}(0, _createClass3.default)(FileUpload, [{ key: 'componentWillReceiveProps', value: function componentWillReceiveProps(nextProps) {/* istanbul ignore next */if ('fileList' in nextProps) {this.setState({ fileList: nextProps.fileList || [] });}} }, { key: 'render', value: function render()

    {var _props =



      this.props,prefixCls = _props.prefixCls,className = _props.className,showUploadList = _props.showUploadList,modalClassName = _props.modalClassName,drag = _props.drag,visible = _props.visible,modalTitle = _props.modalTitle,style = _props.style,multiple = _props.multiple,disabled = _props.disabled,headers = _props.headers,accept = _props.accept,name = _props.name,action = _props.action,data = _props.data,withCredentials = _props.withCredentials,uploadElemId = _props.uploadElemId,onBeforeUpload = _props.onBeforeUpload,renderContent = _props.renderContent;

      var uploadProps = {
        prefixCls: prefixCls,
        uploadElemId: uploadElemId,
        multiple: multiple,
        disabled: disabled,
        headers: headers,
        accept: accept,
        name: name,
        action: action,
        data: data,
        withCredentials: withCredentials,
        onStart: this.onStart,
        onError: this.onError,
        onProgress: this.onProgress,
        onSuccess: this.onSuccess,
        onBeforeUpload: onBeforeUpload,
        renderContent: renderContent };


      /* istanbul ignore next */
      var uploadList = showUploadList ? this.renderUploadList() : null;

      var uploadConentNode = void 0;

      if (drag) {var _classNames;
        var dragCls = (0, _classnames2.default)(prefixCls, (_classNames = {}, (0, _defineProperty3.default)(_classNames,
        prefixCls + '-drag', true), (0, _defineProperty3.default)(_classNames,
        prefixCls + '-drag-uploading', this.state.fileList.some(function (file) {return file.status === 'uploading';})), (0, _defineProperty3.default)(_classNames,
        prefixCls + '-drag-hover', this.state.dragState === 'dragover'), (0, _defineProperty3.default)(_classNames,
        prefixCls + '-disabled', disabled), _classNames));


        uploadConentNode =
        _react2.default.createElement('div', { className: className, style: style },
          _react2.default.createElement('div', {
              className: dragCls,
              onDrop: this.onFileDrop,
              onDragOver: this.onFileDrop,
              onDragLeave: this.onFileDrop },

            _react2.default.createElement(_AjaxUploader2.default, (0, _extends3.default)({}, uploadProps, { ref: this.saveUpload }))),

          uploadList);


      } else {var _classNames2;
        var uploadButtonCls = (0, _classnames2.default)(prefixCls, (_classNames2 = {}, (0, _defineProperty3.default)(_classNames2,
        prefixCls + '-select', true), (0, _defineProperty3.default)(_classNames2,
        prefixCls + '-disabled', disabled), (0, _defineProperty3.default)(_classNames2, 'hidden',
        !renderContent), _classNames2));

        /* istanbul ignore next */
        if (renderContent) {
          uploadConentNode =
          _react2.default.createElement('div', { className: className, style: style },
            _react2.default.createElement('div', { className: uploadButtonCls },
              _react2.default.createElement(_AjaxUploader2.default, (0, _extends3.default)({}, uploadProps, { ref: this.saveUpload }))),

            uploadList);


        }
      }

      return (
        _react2.default.createElement(_Modal2.default, {
            className: 'modal-upload-file ' + modalClassName,
            title: modalTitle,
            shown: visible,
            onClose: this.onClose },

          _react2.default.createElement('div', { className: 'modal-body ' },
            uploadConentNode)));



    } }]);return FileUpload;}(_react2.default.Component);FileUpload.displayName = 'FileUpload';FileUpload.propTypes = FileUploadPropTypes;FileUpload.defaultProps = FileUploadProps;exports.default = FileUpload;module.exports = exports['default'];