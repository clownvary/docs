'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _isString = require('lodash/isString');var _isString2 = _interopRequireDefault(_isString);
var _isFunction = require('lodash/isFunction');var _isFunction2 = _interopRequireDefault(_isFunction);
var _assign = require('lodash/assign');var _assign2 = _interopRequireDefault(_assign);
var _Validator = require('./Validator');var _Validator2 = _interopRequireDefault(_Validator);
var _RuleDefs = require('./RuleDefs');var _RuleDefs2 = _interopRequireDefault(_RuleDefs);
var _buildErrorMessage = require('./utils/buildErrorMessage');var _buildErrorMessage2 = _interopRequireDefault(_buildErrorMessage);
var _ValidationResult = require('./ValidationResult');function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}


// build the rules and custom messages into a validation context
var createValidator = function createValidator(rules) {var messages = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};return new _Validator2.default(rules, messages);};

var validate = function validate(fieldName, value) {var rules = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';var messages = arguments[3];
  var validator = (0, _isString2.default)(rules) ? createValidator(rules, messages) : rules;
  if (validator && (0, _isFunction2.default)(validator.validate)) {
    return validator.validate(fieldName, value);
  }

  throw new Error('Validation failed');
};

var registerRule = function registerRule() {return _RuleDefs2.default.register.apply(_RuleDefs2.default, arguments);};
var clearRules = function clearRules() {return _RuleDefs2.default.clear.apply(_RuleDefs2.default, arguments);};
var registerErrorMessages = function registerErrorMessages(messages) {
  (0, _assign2.default)(_ValidationResult.ErrorMessageMap, messages);
};exports.default =

{
  buildErrorMessage: _buildErrorMessage2.default,
  registerErrorMessages: registerErrorMessages,
  registerRule: registerRule,
  clearRules: clearRules,
  createValidator: createValidator,
  validate: validate };module.exports = exports['default'];