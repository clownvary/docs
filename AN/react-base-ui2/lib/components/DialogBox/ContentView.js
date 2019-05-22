'use strict';Object.defineProperty(exports, "__esModule", { value: true });exports.ContentViewDefaultProps = exports.ContentViewPropTypes = undefined;var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);var _createClass2 = require('babel-runtime/helpers/createClass');var _createClass3 = _interopRequireDefault(_createClass2);var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);var _inherits2 = require('babel-runtime/helpers/inherits');var _inherits3 = _interopRequireDefault(_inherits2);var _react = require('react');var _react2 = _interopRequireDefault(_react);
var _propTypes = require('prop-types');var _propTypes2 = _interopRequireDefault(_propTypes);
var _isFunction = require('lodash/isFunction');var _isFunction2 = _interopRequireDefault(_isFunction);
var _SafeText = require('../SafeText');var _SafeText2 = _interopRequireDefault(_SafeText);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

/**
                                                                                                                                                                                         * Default PropTypes of DialogBox
                                                                                                                                                                                        */
var ContentViewPropTypes = exports.ContentViewPropTypes = {
  /**
                                                            * The callback function that is triggered when click the cancel button.
                                                            */
  onCancel: _propTypes2.default.func,
  /**
                                       * The callback function that is triggered when click the confirm button.
                                      */
  onConfirm: _propTypes2.default.func };


/** Default Props for ContentView */
var ContentViewDefaultProps = exports.ContentViewDefaultProps = {
  title: 'Confirm',
  message: '',
  cancelText: 'Cancel',
  confirmText: 'OK',
  showCancel: false };


/** UI component that displays DialogBox with variant settings*/var
ContentView = function (_React$PureComponent) {(0, _inherits3.default)(ContentView, _React$PureComponent);function ContentView() {(0, _classCallCheck3.default)(this, ContentView);return (0, _possibleConstructorReturn3.default)(this, (ContentView.__proto__ || (0, _getPrototypeOf2.default)(ContentView)).apply(this, arguments));}(0, _createClass3.default)(ContentView, [{ key: 'onChange', value: function onChange(





    data) {var
      onChange = this.props.onChange;
      (0, _isFunction2.default)(onChange) && onChange(data, this);
    } }, { key: 'onCancel', value: function onCancel(

    data) {var
      onCancel = this.props.onCancel;
      (0, _isFunction2.default)(onCancel) && onCancel(data, this);
    } }, { key: 'onConfirm', value: function onConfirm(

    data) {var
      onConfirm = this.props.onConfirm;
      (0, _isFunction2.default)(onConfirm) && onConfirm(data, this);
    } }, { key: 'getData', value: function getData()

    {var
      value = this.props.value;
      return value;
    } }, { key: 'update', value: function update()

    {
    } }, { key: 'render', value: function render()

    {var _props =



      this.props,message = _props.message,dangerMode = _props.dangerMode;

      return (
        _react2.default.createElement('div', null,

          dangerMode ?
          _react2.default.createElement(_SafeText2.default, { dangerMode: dangerMode, text: message }) : _react2.default.createElement('div', null, message)));



    } }]);return ContentView;}(_react2.default.PureComponent);ContentView.displayName = 'ContentView';ContentView.propTypes = ContentViewPropTypes;ContentView.defaultProps = ContentViewDefaultProps;exports.default =


ContentView;