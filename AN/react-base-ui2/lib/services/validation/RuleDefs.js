'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _extends2 = require('babel-runtime/helpers/extends');var _extends3 = _interopRequireDefault(_extends2);var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);var _createClass2 = require('babel-runtime/helpers/createClass');var _createClass3 = _interopRequireDefault(_createClass2);var _isNil = require('lodash/isNil');var _isNil2 = _interopRequireDefault(_isNil);
var _rules = require('./rules');var _rules2 = _interopRequireDefault(_rules);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

/*
                                                                                                                                                                            * `required|min[value:2]|max[value:10]` =>
                                                                                                                                                                            * [{"name":"required"},{"name":"min","value":"2"},{"name":"max","value":"10"}]
                                                                                                                                                                            */var

RuleDefs = function () {
  function RuleDefs() {(0, _classCallCheck3.default)(this, RuleDefs);
    this.rules = (0, _extends3.default)({}, _rules2.default);
  }(0, _createClass3.default)(RuleDefs, [{ key: 'has', value: function has(

    name) {
      return !(0, _isNil2.default)(this.rules[name]);
    } }, { key: 'get', value: function get(

    name) {
      return this.rules[name];
    } }, { key: 'register', value: function register(

    name, func) {var message = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';var replace = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
      if (!name) {
        throw new Error('Register needs a name.');
      }

      if (this.has(name) && !replace) {
        throw new Error('Duplicated rule (' + name + ').');
      }

      this.rules[name] = {
        validateFunc: func,
        message: message };

    } }, { key: 'clear', value: function clear(

    name) {
      delete this.rules[name];
    } }]);return RuleDefs;}();


var globalRuleDefs = new RuleDefs();exports.default =

globalRuleDefs;module.exports = exports['default'];