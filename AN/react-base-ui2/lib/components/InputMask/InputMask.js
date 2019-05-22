'use strict';Object.defineProperty(exports, "__esModule", { value: true });exports.InputMask = undefined;var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);var _createClass2 = require('babel-runtime/helpers/createClass');var _createClass3 = _interopRequireDefault(_createClass2);var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);var _get2 = require('babel-runtime/helpers/get');var _get3 = _interopRequireDefault(_get2);var _inherits2 = require('babel-runtime/helpers/inherits');var _inherits3 = _interopRequireDefault(_inherits2);var _extends2 = require('babel-runtime/helpers/extends');var _extends3 = _interopRequireDefault(_extends2);var _InputBase2 = require('../InputBase');var _InputBase3 = _interopRequireDefault(_InputBase2);
var _MaskTextProvider = require('./MaskTextProvider');var _MaskTextProvider2 = _interopRequireDefault(_MaskTextProvider);
var _consts = require('../../consts');function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}


/**
                                                                                                                                     * Default Props for InputMask
                                                                                                                                     * @name InputMaskProps
                                                                                                                                     * @const
                                                                                                                                     */
var InputMaskProps = {
  /**
                        * Determines the input mask to use at run time.
                        * Mask must be a string composed of one or more of the masking elements.
                        *
                        * The supported mask characters are:
                        *
                        * - 0= Digit
                        * - 9= Digit or space
                        * - #= Digit, sign, or space
                        * - L= Letter
                        * - l= Letter or space
                        * - A= Alphanumeric
                        * - a= Alphanumeric or space
                        * - .= Localized decimal point
                        * - ,= Localized thousand separator
                        * - := Localized time separator
                        * - /= Localized date separator
                        * - $= Localized currency symbol
                        * - <= Converts characters that follow to lowercase
                        * - \>= Converts characters that follow to uppercase
                        * - |= Disables case conversion
                        * - \= scapes any character, turning it into a literal
                        *
                        */
  mask: '',
  /**
             * Determines the character used to represent the absence of user input.
             */
  promptChar: '_',
  /**
                    * Determines the character to be substituted for the actual input characters in password mode.
                    */
  passwordChar: '*',
  /**
                      * Determines whether password char is used.
                      */
  passwordMode: false,
  /**
                        * Indicates whether the prompt characters in the input mask are hidden
                        * when the input loses focus.
                        */
  hidePromptOnLeave: false,
  /**
                             * Indicates whether promptChar can be entered as valid data by the user.
                             */
  allowPromptAsInput: false };


var defaultProps = (0, _extends3.default)({}, _InputBase2.defaultProps, InputMaskProps);

/**
                                                                                          * @description
                                                                                          * InputMask component allows you to validate and format user input
                                                                                          * while typing, this will prevent invalid data been input.
                                                                                          *
                                                                                          * To use the InputMask component, set the mask property to a string that specifies
                                                                                          * the valid character classes for each field.
                                                                                          *
                                                                                          * @class
                                                                                          */var
InputMask = exports.InputMask = function (_InputBase) {(0, _inherits3.default)(InputMask, _InputBase);function InputMask() {(0, _classCallCheck3.default)(this, InputMask);return (0, _possibleConstructorReturn3.default)(this, (InputMask.__proto__ || (0, _getPrototypeOf2.default)(InputMask)).apply(this, arguments));}(0, _createClass3.default)(InputMask, [{ key: 'createTextProvider', value: function createTextProvider()











    {
      return new _MaskTextProvider2.default(this.props);
    } /**
       * Default Props of InputMask.
       *
       * Please see InputMaskProps for details.
       *
       * @see InputMaskProps
       */ }, { key: 'getProviderOptions', value: function getProviderOptions() {var _props = this.props,hidePromptOnLeave = _props.hidePromptOnLeave,passwordMode = _props.passwordMode;var includePrompt = hidePromptOnLeave ? this.isFocused() : true;var includeLiterals = true;return {
        includePrompt: includePrompt,
        includeLiterals: includeLiterals,
        passwordMode: passwordMode };

    } }, { key: 'getContainerClassName', value: function getContainerClassName()

    {
      return _consts.DefaultCSSPrefix + '-input-mask';
    } }, { key: 'onInputFocus', value: function onInputFocus(

    e) {
      if (this.textProvider && this.allowEdit()) {var
        hidePromptOnLeave = this.props.hidePromptOnLeave;
        if (hidePromptOnLeave) {
          this.updateText({ start: 0, end: 0 });
        }
      }

      (0, _get3.default)(InputMask.prototype.__proto__ || (0, _getPrototypeOf2.default)(InputMask.prototype), 'onInputFocus', this).call(this, e);
    } }, { key: 'onInputBlur', value: function onInputBlur(

    e) {var _this2 = this;
      if (this.textProvider && this.allowEdit()) {var
        hidePromptOnLeave = this.props.hidePromptOnLeave;
        if (hidePromptOnLeave) {
          setTimeout(function () {return _this2.updateText();}, 1);
        }
      }

      (0, _get3.default)(InputMask.prototype.__proto__ || (0, _getPrototypeOf2.default)(InputMask.prototype), 'onInputBlur', this).call(this, e);
    } }, { key: 'getTextWithPrompts', value: function getTextWithPrompts()

    {
      return !this.textProvider ? this.input.value :
      this.textProvider.getText({
        includePrompt: true,
        includeLiterals: false });

    } }, { key: 'getTextWithLiterals', value: function getTextWithLiterals()

    {
      return !this.textProvider ? this.input.value :
      this.textProvider.getText({
        includePrompt: false,
        includeLiterals: true });

    } }, { key: 'getTextWithPromptAndLiterals', value: function getTextWithPromptAndLiterals()

    {
      return !this.textProvider ? this.input.value :
      this.textProvider.getText({
        includePrompt: true,
        includeLiterals: true });

    } }]);return InputMask;}(_InputBase3.default);


/**
                                                    * @react-component
                                                    */InputMask.displayName = 'InputMask';InputMask.defaultProps = defaultProps;exports.default =
InputMask;