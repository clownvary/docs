'use strict';Object.defineProperty(exports, "__esModule", { value: true });exports.ResponseCode = exports.HttpMethod = exports.HttpContentType = exports.cleanMock = exports.mockAPI = exports.createAPI = exports.Response = exports.Request = undefined;var _Request = require('./Request');var _Request2 = _interopRequireDefault(_Request);
var _Response = require('./Response');var _Response2 = _interopRequireDefault(_Response);
var _createAPI = require('./createAPI');var _createAPI2 = _interopRequireDefault(_createAPI);
var _mockAPI = require('./mockAPI');
var _HttpContentType = require('./consts/HttpContentType');var HttpContentType = _interopRequireWildcard(_HttpContentType);
var _HttpMethod = require('./consts/HttpMethod');var HttpMethod = _interopRequireWildcard(_HttpMethod);
var _ResponseCode = require('./consts/ResponseCode');var ResponseCode = _interopRequireWildcard(_ResponseCode);function _interopRequireWildcard(obj) {if (obj && obj.__esModule) {return obj;} else {var newObj = {};if (obj != null) {for (var key in obj) {if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];}}newObj.default = obj;return newObj;}}function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}exports.



Request = _Request2.default;exports.
Response = _Response2.default;exports.
createAPI = _createAPI2.default;exports.
mockAPI = _mockAPI.mockAPI;exports.
cleanMock = _mockAPI.cleanMock;exports.
HttpContentType = HttpContentType;exports.
HttpMethod = HttpMethod;exports.
ResponseCode = ResponseCode;