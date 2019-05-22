'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);var _createClass2 = require('babel-runtime/helpers/createClass');var _createClass3 = _interopRequireDefault(_createClass2);var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);var _inherits2 = require('babel-runtime/helpers/inherits');var _inherits3 = _interopRequireDefault(_inherits2);var _react = require('react');var _react2 = _interopRequireDefault(_react);
var _propTypes = require('prop-types');
var _classnames = require('classnames');var _classnames2 = _interopRequireDefault(_classnames);
var _isArray = require('lodash/isArray');var _isArray2 = _interopRequireDefault(_isArray);
var _isEmpty = require('lodash/isEmpty');var _isEmpty2 = _interopRequireDefault(_isEmpty);
var _DropdownMenu = require('./DropdownMenu');var _DropdownMenu2 = _interopRequireDefault(_DropdownMenu);
var _consts = require('../../consts');function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

/**
                                                                                                                                     * Default PropTypes for FileGallery
                                                                                                                                     */
var propTypes = {
  /**
                   * additional css class of root dom node.
                  */
  className: _propTypes.string,
  /**
                                 * The prefix of FileGallery component element class name.
                                */
  prefix: _propTypes.string,
  /**
                              * Data record array to be displayed.
                             */
  items: _propTypes.array,
  /**
                            * set the handler to handle deleteFile event.
                           */
  deleteFile: _propTypes.func };var


FileGallery = function (_React$PureComponent) {(0, _inherits3.default)(FileGallery, _React$PureComponent);function FileGallery() {(0, _classCallCheck3.default)(this, FileGallery);return (0, _possibleConstructorReturn3.default)(this, (FileGallery.__proto__ || (0, _getPrototypeOf2.default)(FileGallery)).apply(this, arguments));}(0, _createClass3.default)(FileGallery, [{ key: 'download', value: function download(_ref)











    {var url = _ref.url;
      window.open(url);
    } }, { key: 'render', value: function render()

    {var _this2 = this;var _props =
      this.props,items = _props.items,prefix = _props.prefix,className = _props.className,readonly = _props.readonly;

      if (!(0, _isArray2.default)(items) || (0, _isEmpty2.default)([items])) {
        return null;
      }

      var galleryClassName = prefix + '-file-gallery';
      var fileGalleryCls = (0, _classnames2.default)(galleryClassName, className);

      return (
        _react2.default.createElement('div', { className: fileGalleryCls },

          items.map(function (item, index) {var
            name = item.name;
            if (name) {
              return (
                _react2.default.createElement('div', { key: index, className: galleryClassName + '-item' },
                  _react2.default.createElement('span', null,
                    _react2.default.createElement('i', { className: 'icon icon-file-solid-m' }),
                    _react2.default.createElement('span', { className: galleryClassName + '-item-name', title: name }, name)),

                  _react2.default.createElement(_DropdownMenu2.default, {
                    fileIndex: index,
                    item: item,
                    prefix: galleryClassName,
                    download: _this2.download,
                    deleteFile: function deleteFile() {return _this2.props.deleteFile(index);},
                    readonly: readonly })));



            }
            return null;
          })));



    } }]);return FileGallery;}(_react2.default.PureComponent);FileGallery.displayName = 'FileGallery';FileGallery.propTypes = propTypes;FileGallery.defaultProps = { prefix: '' + _consts.DefaultCSSPrefix, items: [], readonly: false, deleteFile: function deleteFile() {} };exports.default = FileGallery;module.exports = exports['default'];