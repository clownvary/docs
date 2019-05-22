'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);var _createClass2 = require('babel-runtime/helpers/createClass');var _createClass3 = _interopRequireDefault(_createClass2);var _Hint = require('./consts/Hint');var Hint = _interopRequireWildcard(_Hint);function _interopRequireWildcard(obj) {if (obj && obj.__esModule) {return obj;} else {var newObj = {};if (obj != null) {for (var key in obj) {if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];}}newObj.default = obj;return newObj;}}function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var

InputResult = function () {
  function InputResult() {var hint = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : Hint.UNKNOWN;var pos = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : -1;(0, _classCallCheck3.default)(this, InputResult);
    this.hint = hint;
    this.testPosition = pos;
  }(0, _createClass3.default)(InputResult, [{ key: 'isSuccess', value: function isSuccess()

    {
      return this.hint >= 0;
    } }, { key: 'clone', value: function clone()

    {
      var rh = new InputResult();
      rh.hint = this.hint;
      rh.testPosition = this.testPosition;
      return rh;
    } }]);return InputResult;}();exports.default = InputResult;module.exports = exports['default'];