'use strict';Object.defineProperty(exports, "__esModule", { value: true });exports.ValidationResult = exports.ErrorMessageMap = undefined;var _defineProperties = require('babel-runtime/core-js/object/define-properties');var _defineProperties2 = _interopRequireDefault(_defineProperties);var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);var _isNil = require('lodash/isNil');var _isNil2 = _interopRequireDefault(_isNil);
var _isPlainObject = require('lodash/isPlainObject');var _isPlainObject2 = _interopRequireDefault(_isPlainObject);
var _isString = require('lodash/isString');var _isString2 = _interopRequireDefault(_isString);
var _mapValues = require('lodash/mapValues');var _mapValues2 = _interopRequireDefault(_mapValues);
var _buildErrorMessage = require('./utils/buildErrorMessage');var _buildErrorMessage2 = _interopRequireDefault(_buildErrorMessage);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

var ErrorMessageMap = exports.ErrorMessageMap = {};var
ValidationResult = exports.ValidationResult =
function ValidationResult(fieldName) {var value = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';var errorCode = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';var errorRule = arguments[3];(0, _classCallCheck3.default)(this, ValidationResult);
  if (!fieldName) {
    throw new Error('Name should not be empty!');
  }

  this.fieldName = fieldName;
  this.value = value;
  this.errorCode = errorCode || (!(0, _isNil2.default)(errorRule) ? errorRule.name : 'unknown');
  this.messageDef = ErrorMessageMap[this.errorCode] || (!(0, _isNil2.default)(errorRule) ? errorRule.message : '');
  this.errorRule = errorRule;

  (0, _defineProperties2.default)(this, {
    isValid: {
      get: function get() {
        return (0, _isNil2.default)(this.errorRule);
      } } });



  (0, _defineProperties2.default)(this, {
    message: {
      get: function get() {var _this = this;
        if (!this.messageDef) return '';

        var result = '';
        if ((0, _isString2.default)(this.messageDef)) {
          result = (0, _buildErrorMessage2.default)(this.messageDef, this.fieldName, this.errorRule.param);
        } else if ((0, _isPlainObject2.default)(this.messageDef)) {
          result = (0, _mapValues2.default)(this.messageDef,
          function (s) {return (0, _isString2.default)(s) ? (0, _buildErrorMessage2.default)(s, _this.fieldName, _this.errorRule.param) : s;});
        }

        return result;
      } } });


};exports.default =


ValidationResult;