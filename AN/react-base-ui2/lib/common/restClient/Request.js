'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _stringify = require('babel-runtime/core-js/json/stringify');var _stringify2 = _interopRequireDefault(_stringify);var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);var _promise = require('babel-runtime/core-js/promise');var _promise2 = _interopRequireDefault(_promise);var _isomorphicFetch = require('isomorphic-fetch');var _isomorphicFetch2 = _interopRequireDefault(_isomorphicFetch);
var _isFunction = require('lodash/isFunction');var _isFunction2 = _interopRequireDefault(_isFunction);
var _isString = require('lodash/isString');var _isString2 = _interopRequireDefault(_isString);
var _isPlainObject = require('lodash/isPlainObject');var _isPlainObject2 = _interopRequireDefault(_isPlainObject);
var _has = require('lodash/has');var _has2 = _interopRequireDefault(_has);
var _message = require('../message');
var _loading = require('../../services/loading');
var _HttpContentType = require('./consts/HttpContentType');var HttpContentType = _interopRequireWildcard(_HttpContentType);
var _toQueryString = require('../../utils/toQueryString');var _toQueryString2 = _interopRequireDefault(_toQueryString);
var _processHeaders = require('./processHeaders');var _processHeaders2 = _interopRequireDefault(_processHeaders);
var _Response = require('./Response');var _Response2 = _interopRequireDefault(_Response);
var _error = require('../error');function _interopRequireWildcard(obj) {if (obj && obj.__esModule) {return obj;} else {var newObj = {};if (obj != null) {for (var key in obj) {if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];}}newObj.default = obj;return newObj;}}function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

/* istanbul ignore next */
var parseResponse = function parseResponse(jsonResponse, path) {
  var response = new _Response2.default(jsonResponse);
  _loading.pageLoading.hide();
  if (response.success) {
    return _promise2.default.resolve(response);
  }

  var msgGroup = new _message.Message(_message.MessageType.ERROR, response.message, 'Service Error');
  return _promise2.default.reject(new _error.ErrorObj(_error.ErrorType.SERVICE, msgGroup, {
    code: response.code,
    url: path,
    response: response }));

};var

Request =



function Request() {var _this = this;(0, _classCallCheck3.default)(this, Request);
  ['get', 'post', 'put', 'patch', 'delete', 'head'].forEach(function (method) {
    _this[method] = function (path, data) {
      var headers = {};
      var body = void 0;
      if (data) {
        if (data.body) {
          headers = data.headers || {};
          body = data.body;
        } else {
          body = data;
        }
      }

      var fetchConfig = {
        method: method,
        headers: (0, _processHeaders2.default)(method, headers),
        credentials: 'include' };

      /* istanbul ignore next */
      if (!__STATIC__) {
        var params = body;
        if (fetchConfig.headers['Content-Type'] !== HttpContentType.JSON) {
          params = (0, _toQueryString2.default)(body);
        }

        if (method !== 'get' && method !== 'delete') {
          fetchConfig.body = (0, _stringify2.default)(params);
        } else {
          var paramsString = params ? params + '&' : '';
          path = '' + path + (path.indexOf('?') !== -1 ? '&' : '?') + paramsString + 'ui_random=' + new Date().getTime();
        }
      }

      _loading.pageLoading.show();
      /* istanbul ignore next */
      if (__TESTING__) {
        if (window.__API_Hook__ && (0, _isFunction2.default)(window.__API_Hook__)) {
          var result = window.__API_Hook__(path);
          if ((0, _isPlainObject2.default)(result) && (0, _has2.default)(result, 'headers')) {
            return parseResponse(result, path);
          } else if ((0, _isString2.default)(result)) {
            path = result;
          }

          var leading = path.substr(0, 1) === '/';
          // eslint-disable-next-line
          path = 'http://' + __TESTINGHOST__ + ':' + __TESTINGPORT__ + (leading ? '' : '/') + path;
        }
      }
      /* istanbul ignore next */
      return (0, _isomorphicFetch2.default)(path, fetchConfig).
      then(function () {var httpResponse = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};var
        status = httpResponse.status,_httpResponse$statusT = httpResponse.statusText,statusText = _httpResponse$statusT === undefined ? '' : _httpResponse$statusT,ok = httpResponse.ok;
        if (ok) {
          return httpResponse.json();
        }
        _loading.pageLoading.hide();
        var msgGroup = new _message.Message(_message.MessageType.ERROR, statusText, 'HTTP Error');
        return _promise2.default.reject(new _error.ErrorObj(_error.ErrorType.HTTP, msgGroup, {
          code: status,
          url: path,
          response: httpResponse }));

      }).
      then(function (jsonResponse) {return parseResponse(jsonResponse, path);});
    };
  });
};Request.instance = new Request();exports.default = Request;module.exports = exports['default'];