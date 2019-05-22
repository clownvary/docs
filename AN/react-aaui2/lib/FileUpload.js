'use strict';

exports.__esModule = true;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var propTypes = {
  className: _propTypes.string,
  style: _propTypes.object,
  onChange: _propTypes.func,
  defaultText: _propTypes.string,
  text: _propTypes.string,
  size: _propTypes.string,
  ForImage: _propTypes.bool,
  formatInfo: _propTypes.string,
  sizeInfo: _propTypes.string,
  dimensions: _propTypes.string,
  invalidSizeError: _propTypes.string,
  invalidFormatError: _propTypes.string,
  removeConfirmMessage: _propTypes.string,
  dropOnDocument: _propTypes.bool,
  thumbnailPercentage: _propTypes.string
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
  (0, _inherits3.default)(FileUpload, _PureComponent);

  function FileUpload(prop) {
    (0, _classCallCheck3.default)(this, FileUpload);

    var _this = (0, _possibleConstructorReturn3.default)(this, _PureComponent.call(this, prop));

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

    var classes = (0, _classnames2.default)((_classNames = {
      'file-upload': true
    }, _classNames['file-upload--' + size] = size, _classNames));
    var labelClasses = (0, _classnames2.default)((_classNames2 = {
      btn: true
    }, _classNames2['btn-' + size] = size, _classNames2), className);

    var fileError = '';
    if (this.state.showInvalidFormat) {
      fileError = this.props.invalidFormatError;
    } else if (this.state.showInvalidSize) {
      fileError = this.props.invalidSizeError;
    }
    /* eslint-disable jsx-a11y/label-has-for */
    return _react2.default.createElement(
      'div',
      {
        ref: function ref(fileUpload) {
          _this2.fileUpload = fileUpload;
        },
        className: classes,
        style: style
      },
      _react2.default.createElement(
        'div',
        { className: 'upload-componet' },
        _react2.default.createElement(
          'label',
          { className: labelClasses },
          _react2.default.createElement('input', { type: 'file', onChange: this.onChange }),
          this.props.text
        ),
        _react2.default.createElement('input', {
          disabled: true,
          className: 'file-upload__text input',
          value: this.state.selectedFile ? this.state.selectedFile.name : this.props.defaultText
        }),
        _react2.default.createElement(
          'span',
          { className: 'file-error' },
          fileError
        )
      ),
      this.props.ForImage ? _react2.default.createElement(
        'div',
        { className: 'format-text' },
        _react2.default.createElement(
          'div',
          null,
          this.props.formatInfo,
          ' ',
          this.props.sizeInfo
        ),
        _react2.default.createElement(
          'div',
          null,
          this.props.dimensions,
          ' '
        )
      ) : undefined,
      this.props.ForImage && this.state.selectedFile ? _react2.default.createElement(
        'div',
        { className: 'file-preview' },
        _react2.default.createElement('img', {
          alt: '',
          width: this.props.thumbnailPercentage + '%',
          height: this.props.thumbnailPercentage + '%',
          src: this.state.filePreviewSrc
        }),
        _react2.default.createElement('span', { className: 'icon-delete', onClick: this.cancelSelete })
      ) : undefined
    );
  };

  return FileUpload;
}(_react.PureComponent);

exports.default = FileUpload;


FileUpload.displayName = 'AAUIFileUpload';
FileUpload.propTypes = propTypes;
FileUpload.defaultProps = defaultProps;
module.exports = exports['default'];