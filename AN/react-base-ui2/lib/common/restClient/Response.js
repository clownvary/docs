'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);var _createClass2 = require('babel-runtime/helpers/createClass');var _createClass3 = _interopRequireDefault(_createClass2);var _find = require('lodash/find');var _find2 = _interopRequireDefault(_find);
var _pick = require('lodash/pick');var _pick2 = _interopRequireDefault(_pick);
var _normalizeKeys = require('../../utils/normalizeKeys');var _normalizeKeys2 = _interopRequireDefault(_normalizeKeys);
var _ResponseCode = require('./consts/ResponseCode');var ResponseCode = _interopRequireWildcard(_ResponseCode);function _interopRequireWildcard(obj) {if (obj && obj.__esModule) {return obj;} else {var newObj = {};if (obj != null) {for (var key in obj) {if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];}}newObj.default = obj;return newObj;}}function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

var SuccessCodes = (0, _pick2.default)(ResponseCode, ['SUCCESS', 'NO_RESULT']);var

Response = function () {(0, _createClass3.default)(Response, null, [{ key: 'isSuccess', value: function isSuccess(
    responseCode) {
      var code = (0, _find2.default)(SuccessCodes, function (value) {return value === responseCode;});
      return !!code;
    } }, { key: 'isSystemError', value: function isSystemError(

    responseCode) {
      var code = parseInt(responseCode, 10);
      return code && (code < 1000 || code === 9999);
    } }, { key: 'isValidationError', value: function isValidationError(

    responseCode) {
      var code = parseInt(responseCode, 10);
      return code === 9008;
    } }]);

  function Response(jsonResponse) {var clientKeys = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;(0, _classCallCheck3.default)(this, Response);
    this.rawJson = jsonResponse;

    var headers = jsonResponse.headers || { responseCode: ResponseCode.UNKNOWN_ERROR, responseMessage: '' };
    var body = jsonResponse.body || {};

    this.headers = clientKeys ? (0, _normalizeKeys2.default)(headers) : headers;
    this.body = clientKeys ? (0, _normalizeKeys2.default)(body) : body;

    // Quick access to code and message
    this.code = clientKeys ? this.headers.responseCode : this.headers.response_code;
    this.message = clientKeys ? this.headers.responseMessage : this.headers.response_message;

    this.success = Response.isSuccess(this.code);
    this.isSystemError = Response.isSystemError(this.code);
    this.isBusinessError = !this.isSystemError;
    this.isValidationError = Response.isValidationError(this.code);
  }return Response;}();exports.default = Response;module.exports = exports['default'];