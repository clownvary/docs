import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React, { PureComponent } from 'react';
import { string, object, func, bool } from 'prop-types';
import classNames from 'classnames';

var propTypes = {
  className: string,
  style: object,
  onChange: func,
  defaultText: string,
  text: string,
  size: string,
  ForImage: bool,
  formatInfo: string,
  sizeInfo: string,
  dimensions: string,
  invalidSizeError: string,
  invalidFormatError: string,
  removeConfirmMessage: string,
  dropOnDocument: bool,
  thumbnailPercentage: string
};
var defaultProps = {
  size: 'sm',
  text: 'Choose File',
  defaultText: 'No file chosen',
  ForImage: false,
  formatInfo: 'Format: JPG, JPEG, PNG or GIF.',
  sizeInfo: 'Size: Less than 3 MB.',
  dimensions: 'Dimensions: 2048 px width, 1536 px height maximum.',
  showInvalidSize: false,
  showInvalidFormat: false,
  invalidSizeError: 'Invalid file size',
  invalidFormatError: 'Invalid file type',
  removeConfirmMessage: 'Are you sure removing the selected file?',
  dropOnDocument: false,
  thumbnailPercentage: '5'
};

var FileUpload = function (_PureComponent) {
  _inherits(FileUpload, _PureComponent);

  function FileUpload(prop) {
    _classCallCheck(this, FileUpload);

    var _this = _possibleConstructorReturn(this, _PureComponent.call(this, prop));

    _this.onChange = function (e) {
      e.preventDefault();
      var files = void 0;
      if (e.dataTransfer) {
        files = e.dataTransfer.files;
      } else if (e.target) {
        files = e.target.files;
      }
      if (files && files.length > 0) {
        if (files[0].type.indexOf('image') === -1) {
          _this.setState({
            selectedFile: '',
            showInvalidFormat: true,
            showInvalidSize: false,
            filePreviewSrc: ''
          });
        } else {
          var img = window.URL.createObjectURL(files[0]);
          var filesize = Math.floor(files[0].size / 1024);
          if (filesize > 3000) {
            _this.setState({
              selectedFile: '',
              showInvalidSize: true,
              showInvalidFormat: false,
              filePreviewSrc: ''
            });
          } else {
            _this.setState({
              selectedFile: files[0],
              showInvalidSize: false,
              showInvalidFormat: false,
              filePreviewSrc: img
            });
          }
        }
      } else {
        _this.setState({
          selectedFile: null,
          filePreviewSrc: ''
        });
      }

      if (_this.props.onChange && typeof _this.props.onChange === 'function') {
        _this.props.onChange(e);
      }
    };

    _this.cancelSelete = function () {
      if (window.confirm(_this.props.removeConfirmMessage)) {
        _this.setState({
          selectedFile: null,
          showInvalidSize: false,
          showInvalidFormat: false,
          filePreviewSrc: ''
        });
      }
    };

    _this.state = {
      selectedFile: null,
      filePreviewSrc: '',
      showInvalidSize: false,
      showInvalidFormat: false
    };
    return _this;
  }

  FileUpload.prototype.componentDidMount = function componentDidMount() {
    document.addEventListener('dragleave', function (e) {
      e.preventDefault();
    });
    document.addEventListener('drop', function (e) {
      e.preventDefault();
    });
    document.addEventListener('dragenter', function (e) {
      e.preventDefault();
    });
    document.addEventListener('dragover', function (e) {
      e.preventDefault();
    });
    this.props.dropOnDocument ? document.addEventListener('drop', this.onChange, false) : this.fileUpload.addEventListener('drop', this.onChange, false);
  };
  /* eslint no-alert: "off"*/


  FileUpload.prototype.render = function render() {
    var _classNames,
        _classNames2,
        _this2 = this;

    var _props = this.props,
        className = _props.className,
        style = _props.style,
        size = _props.size;

    var classes = classNames((_classNames = {
      'file-upload': true
    }, _classNames['file-upload--' + size] = size, _classNames));
    var labelClasses = classNames((_classNames2 = {
      btn: true
    }, _classNames2['btn-' + size] = size, _classNames2), className);

    var fileError = '';
    if (this.state.showInvalidFormat) {
      fileError = this.props.invalidFormatError;
    } else if (this.state.showInvalidSize) {
      fileError = this.props.invalidSizeError;
    }
    /* eslint-disable jsx-a11y/label-has-for */
    return React.createElement(
      'div',
      {
        ref: function ref(fileUpload) {
          _this2.fileUpload = fileUpload;
        },
        className: classes,
        style: style
      },
      React.createElement(
        'div',
        { className: 'upload-componet' },
        React.createElement(
          'label',
          { className: labelClasses },
          React.createElement('input', { type: 'file', onChange: this.onChange }),
          this.props.text
        ),
        React.createElement('input', {
          disabled: true,
          className: 'file-upload__text input',
          value: this.state.selectedFile ? this.state.selectedFile.name : this.props.defaultText
        }),
        React.createElement(
          'span',
          { className: 'file-error' },
          fileError
        )
      ),
      this.props.ForImage ? React.createElement(
        'div',
        { className: 'format-text' },
        React.createElement(
          'div',
          null,
          this.props.formatInfo,
          ' ',
          this.props.sizeInfo
        ),
        React.createElement(
          'div',
          null,
          this.props.dimensions,
          ' '
        )
      ) : undefined,
      this.props.ForImage && this.state.selectedFile ? React.createElement(
        'div',
        { className: 'file-preview' },
        React.createElement('img', {
          alt: '',
          width: this.props.thumbnailPercentage + '%',
          height: this.props.thumbnailPercentage + '%',
          src: this.state.filePreviewSrc
        }),
        React.createElement('span', { className: 'icon-delete', onClick: this.cancelSelete })
      ) : undefined
    );
  };

  return FileUpload;
}(PureComponent);

export default FileUpload;


FileUpload.displayName = 'AAUIFileUpload';
FileUpload.propTypes = propTypes;
FileUpload.defaultProps = defaultProps;