'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);var _extends2 = require('babel-runtime/helpers/extends');var _extends3 = _interopRequireDefault(_extends2);var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);var _createClass2 = require('babel-runtime/helpers/createClass');var _createClass3 = _interopRequireDefault(_createClass2);var _find = require('lodash/find');var _find2 = _interopRequireDefault(_find);
var _uniqBy = require('lodash/uniqBy');var _uniqBy2 = _interopRequireDefault(_uniqBy);
var _remove = require('lodash/remove');var _remove2 = _interopRequireDefault(_remove);
var _isString = require('lodash/isString');var _isString2 = _interopRequireDefault(_isString);
var _isBoolean = require('lodash/isBoolean');var _isBoolean2 = _interopRequireDefault(_isBoolean);
var _isRegExp = require('lodash/isRegExp');var _isRegExp2 = _interopRequireDefault(_isRegExp);
var _RuleDefs = require('./RuleDefs');var _RuleDefs2 = _interopRequireDefault(_RuleDefs);
var _DataType = require('./consts/DataType');var DataType = _interopRequireWildcard(_DataType);
var _ValidationResult = require('./ValidationResult');var _ValidationResult2 = _interopRequireDefault(_ValidationResult);function _interopRequireWildcard(obj) {if (obj && obj.__esModule) {return obj;} else {var newObj = {};if (obj != null) {for (var key in obj) {if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];}}newObj.default = obj;return newObj;}}function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

var uniq = function uniq(ruleSet) {return (0, _uniqBy2.default)(ruleSet, function (rule) {return rule.name;});};

var moveToTop = function moveToTop(ruleSet, name) {
  var found = null;
  var result = ruleSet.filter(function (rule) {
    if (rule.name === name) {
      found = rule;
      return false;
    }

    return true;
  });

  if (found) {
    result.unshift(found);
  }

  return result;
};var

Validator = function () {
  function Validator(rules, messages) {(0, _classCallCheck3.default)(this, Validator);
    this.ruleSet = Validator.compile(rules, messages);
  }(0, _createClass3.default)(Validator, [{ key: 'validate', value: function validate(








































    filedName, value) {
      for (var i = 0; i < this.ruleSet.length; i += 1) {
        var rule = this.ruleSet[i];
        if (value !== '' || rule.name === 'required') {
          var result = rule.validate(value);
          var valid = (0, _isBoolean2.default)(result) && result === true || result === '';
          if (!valid) {
            var errorRule = (0, _extends3.default)({}, rule);
            var errorCode = (0, _isString2.default)(result) ? result : '';
            return new _ValidationResult2.default(filedName, value, errorCode, errorRule);
          }
        }
      }

      return new _ValidationResult2.default(filedName, value);
    } }, { key: 'getRuleCount', value: function getRuleCount()

    {
      return this.ruleSet.length;
    } }, { key: 'getRuleSet', value: function getRuleSet()

    {
      return this.ruleSet;
    } }, { key: 'findRule', value: function findRule(

    name) {
      return (0, _find2.default)(this.ruleSet, { name: name });
    } }, { key: 'addRule', value: function addRule(

    name, func) {var message = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';var index = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : -1;
      if (index < 0) {
        index = this.getRuleCount();
      }

      index = Math.min(index, this.getRuleCount());

      var rule = {
        name: name,
        validate: func,
        message: message };


      this.ruleSet.splice(index, 0, rule);
      this.ruleSet = uniq(this.ruleSet);
      this.ruleSet = moveToTop(this.ruleSet, 'required');
    } }, { key: 'removeRule', value: function removeRule(

    name) {
      (0, _remove2.default)(this.ruleSet, function (rule) {return rule.name === name;});
    } }], [{ key: 'compile', value: function compile(rules) {var messages = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};var src = rules.split('|');var ruleSet = src.map(function (rule) {var _rule$split = rule.split(':'),_rule$split2 = (0, _slicedToArray3.default)(_rule$split, 2),name = _rule$split2[0],param = _rule$split2[1];var paramValue = param;var paramType = DataType.NUMBER;if (param) {var _param$split = param.split('@');var _param$split2 = (0, _slicedToArray3.default)(_param$split, 2);paramValue = _param$split2[0];paramType = _param$split2[1];}if (_RuleDefs2.default.has(name)) {var ruleDef = _RuleDefs2.default.get(name);var validateFunc = void 0;if ((0, _isRegExp2.default)(ruleDef.validateFunc)) {validateFunc = function validateFunc(value) {return ruleDef.validateFunc.test(value);};} else {validateFunc = function validateFunc(value) {return ruleDef.validateFunc(value, paramValue, paramType);};}var r = { name: name, validate: validateFunc, message: messages[name] || ruleDef.message };if (paramValue) {r.param = paramValue;}return r;}return null;}).filter(function (v) {return v !== null;});return moveToTop(ruleSet, 'required');} }]);return Validator;}();exports.default = Validator;module.exports = exports['default'];