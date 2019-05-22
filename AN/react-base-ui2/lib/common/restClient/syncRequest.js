'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _keys = require('babel-runtime/core-js/object/keys');var _keys2 = _interopRequireDefault(_keys);var _stringify = require('babel-runtime/core-js/json/stringify');var _stringify2 = _interopRequireDefault(_stringify);exports.default =








































syncAjax;var _processHeaders = require('./processHeaders');var _processHeaders2 = _interopRequireDefault(_processHeaders);var _HttpContentType = require('./consts/HttpContentType');var HttpContentType = _interopRequireWildcard(_HttpContentType);var _HttpMethod = require('./consts/HttpMethod');var HttpMethod = _interopRequireWildcard(_HttpMethod);var _toQueryString = require('../../utils/toQueryString');var _toQueryString2 = _interopRequireDefault(_toQueryString);function _interopRequireWildcard(obj) {if (obj && obj.__esModule) {return obj;} else {var newObj = {};if (obj != null) {for (var key in obj) {if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];}}newObj.default = obj;return newObj;}}function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function parseResponse(xhr) {var result = void 0;try {result = JSON.parse(xhr.statusText);} catch (e) {result = xhr.statusText;}return [xhr, result];}function onloadHandler(xhr, onsuccess, onerror) {return function () {var statusCode = xhr.status; /* istanbul ignore else */if (statusCode >= 200 && statusCode < 300) {/* istanbul ignore else */if (typeof onsuccess === 'function') {onsuccess.apply(xhr, parseResponse(xhr));}} else if (typeof onerror === 'function') {onerror.apply(xhr, parseResponse(xhr));}};}function onerrorHandler(xhr, onerror) {return function () {if (typeof onerror === 'function') {onerror.apply(xhr, parseResponse(xhr));} else {console.log(new TypeError('Network request failed'));}};}function syncAjax(options) {var _options$type =
  options.type,type = _options$type === undefined ? HttpMethod.GET : _options$type,success = options.success,error = options.error,_options$withCredenti = options.withCredentials,withCredentials = _options$withCredenti === undefined ? false : _options$withCredenti;var
  body = options.body,headers = options.headers,url = options.url;
  var xhr = new XMLHttpRequest();

  headers = (0, _processHeaders2.default)(type, headers);

  var params = body;
  if (headers['Content-Type'] !== HttpContentType.JSON) {
    params = (0, _toQueryString2.default)(body);
  }

  if (type !== HttpMethod.GET && type !== HttpMethod.DELETE) {
    body = (0, _stringify2.default)(params);
  } else {
    var paramsString = params ? params + '&' : '';
    url = '' + url + (url.indexOf('?') !== -1 ? '&' : '?') + paramsString + 'ui_random=' + new Date().getTime();
  }

  xhr.open(type, url, false);
  (0, _keys2.default)(headers).forEach(function (name) {
    headers[name] && xhr.setRequestHeader(name, headers[name]);
  });

  if (withCredentials) {
    xhr.withCredentials = true;
  }

  xhr.onload = onloadHandler(xhr, success, error);

  xhr.onerror = onerrorHandler(xhr, error);
  // Note: You may not use a timeout for synchronous requests with an owning window.
  // (https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest)
  if (type !== HttpMethod.GET && type !== HttpMethod.DELETE) {
    xhr.send(body);
  } else {
    xhr.send();
  }
}module.exports = exports['default'];