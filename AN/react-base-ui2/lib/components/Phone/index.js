'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);var _createClass2 = require('babel-runtime/helpers/createClass');var _createClass3 = _interopRequireDefault(_createClass2);var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);var _inherits2 = require('babel-runtime/helpers/inherits');var _inherits3 = _interopRequireDefault(_inherits2);var _react = require('react');var _react2 = _interopRequireDefault(_react);
var _propTypes = require('prop-types');




var _isFunction = require('lodash/isFunction');var _isFunction2 = _interopRequireDefault(_isFunction);
var _consts = require('../../consts');
var _Input = require('../Input');var _Input2 = _interopRequireDefault(_Input);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

/** Default PropTypes of Phone.
                                                                                                                                                                             * @memberof Phone
                                                                                                                                                                            */
var PhonePropTypes = {
  /** The phone number and the format is 'areaCode-mainCode-extendCode'.
                        * @type {string}
                       */
  value: _propTypes.string, // areaCode-mainCode-extendCode
  /** Whether the phone field is disabled.
   * @type {boolean}
  */
  disabled: _propTypes.bool,
  /** The callback function that is triggered when phone field changes.
                              * @type {func}
                             */
  onChange: _propTypes.func };


/** UI component of Phone Number.*/var
Phone = function (_React$PureComponent) {(0, _inherits3.default)(Phone, _React$PureComponent);



  function Phone(props) {(0, _classCallCheck3.default)(this, Phone);var _this = (0, _possibleConstructorReturn3.default)(this, (Phone.__proto__ || (0, _getPrototypeOf2.default)(Phone)).call(this,
    props));_this.






















    onBlur = function () {
      setTimeout(function () {
        var activeElement = document.activeElement;
        var isStayPhone = [_this.areaCode, _this.mainCode, _this.extendCode].
        some(function (v) {return v && v.input === activeElement;});
        if (!isStayPhone) {var
          onChange = _this.props.onChange;
          var phone = _this.areaCode.value + '-' + _this.mainCode.value + '-' + _this.extendCode.value;
          if (phone === '--') {
            phone = '';
          }
          (0, _isFunction2.default)(onChange) && onChange(phone);
        }
      }, 0);
    };_this.

    getCodes = function (codes) {
      var result = {
        areaCode: '',
        mainCode: '',
        extendCode: '' };

      if (codes) {
        var splitCodes = ('' + codes).split('-');
        if (splitCodes.length > 0) result.areaCode = splitCodes[0];
        if (splitCodes.length > 1) result.mainCode = splitCodes[1];
        if (splitCodes.length > 2) result.extendCode = splitCodes[2];
      }

      return result;
    };var _props$value$split = props.value.split('-'),_props$value$split2 = (0, _slicedToArray3.default)(_props$value$split, 3),areaCode = _props$value$split2[0],mainCode = _props$value$split2[1],extendCode = _props$value$split2[2];_this.state = { areaCode: areaCode, mainCode: mainCode, extendCode: extendCode };return _this;}(0, _createClass3.default)(Phone, [{ key: 'componentWillReceiveProps', value: function componentWillReceiveProps(nextProps) {if (nextProps.value !== this.props.value) {var _getCodes = this.getCodes(nextProps.value),areaCode = _getCodes.areaCode,mainCode = _getCodes.mainCode,extendCode = _getCodes.extendCode;this.setState({ areaCode: areaCode, mainCode: mainCode, extendCode: extendCode });this.areaCode.value = areaCode;this.mainCode.value = mainCode;this.extendCode.value = extendCode;}} }, { key: 'render', value: function render()

    {var _this2 = this;var
      disabled = this.props.disabled;var _getCodes2 =
      this.getCodes(this.props.value),areaCode = _getCodes2.areaCode,mainCode = _getCodes2.mainCode,extendCode = _getCodes2.extendCode;

      return (
        _react2.default.createElement('div', { className: _consts.DefaultCSSPrefix + '-phone' },
          _react2.default.createElement('span', { className: 'leftParenthese' }, '('),
          _react2.default.createElement(_Input2.default, {
            ref: function ref(c) {_this2.areaCode = c;},
            maxLength: 3,
            className: 'areacode',
            defaultValue: areaCode,
            formula: /\d/,
            disabled: disabled,
            onChange: function onChange(evt) {
              _this2.setState({ areaCode: evt.target.value });
            },
            onBlur: function onBlur() {return _this2.onBlur();} }),


          _react2.default.createElement('span', { className: 'rightParenthese' }, ')'),
          _react2.default.createElement(_Input2.default, {
            ref: function ref(c) {_this2.mainCode = c;},
            maxLength: 7,
            className: 'mainCode',
            defaultValue: mainCode,
            formula: /\d/,
            disabled: disabled,
            onChange: function onChange(evt) {
              _this2.setState({ mainCode: evt.target.value });
            },
            onBlur: function onBlur() {return _this2.onBlur();} }),

          _react2.default.createElement('span', { className: 'ext' }, 'Ext'),
          _react2.default.createElement(_Input2.default, {
            ref: function ref(c) {_this2.extendCode = c;},
            maxLength: 6,
            className: 'extendCode',
            defaultValue: extendCode,
            formula: /\d/,
            disabled: disabled,
            onChange: function onChange(evt) {
              _this2.setState({ extendCode: evt.target.value });
            },
            onBlur: function onBlur() {return _this2.onBlur();} })));



    } }]);return Phone;}(_react2.default.PureComponent);Phone.displayName = 'Phone';Phone.propTypes = PhonePropTypes;exports.default =



Phone;module.exports = exports['default'];