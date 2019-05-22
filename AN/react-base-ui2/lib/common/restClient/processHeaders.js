'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _stringify = require('babel-runtime/core-js/json/stringify');var _stringify2 = _interopRequireDefault(_stringify);var _typeof2 = require('babel-runtime/helpers/typeof');var _typeof3 = _interopRequireDefault(_typeof2);var _keys = require('babel-runtime/core-js/object/keys');var _keys2 = _interopRequireDefault(_keys);var _assign = require('babel-runtime/core-js/object/assign');var _assign2 = _interopRequireDefault(_assign);exports.default =


processHeaders;var _HttpMethod = require('./consts/HttpMethod');var HttpMethod = _interopRequireWildcard(_HttpMethod);var _HttpContentType = require('./consts/HttpContentType');var HttpContentType = _interopRequireWildcard(_HttpContentType);function _interopRequireWildcard(obj) {if (obj && obj.__esModule) {return obj;} else {var newObj = {};if (obj != null) {for (var key in obj) {if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];}}newObj.default = obj;return newObj;}}function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function processHeaders(method, headers) {
  /* istanbul ignore next */
  var contentType = {
    'Content-Type': __STATIC__ || method === HttpMethod.POST || method === HttpMethod.PUT ? HttpContentType.JSON : HttpContentType.URL_ENCODED };


  var requestedWidth = {
    'X-Requested-With': 'XMLHttpRequest' };


  var pageInfo = {
    page_info: {
      page_number: 1,
      total_records_per_page: 20 } };



  // const pgInfo = Object.assign({}, pageInfo, headers.page_info);
  var finalHeaders = (0, _assign2.default)({}, contentType, requestedWidth, pageInfo, headers);

  (0, _keys2.default)(finalHeaders).forEach(function (key) {
    if ((0, _typeof3.default)(finalHeaders[key]) === 'object') {
      finalHeaders[key] = (0, _stringify2.default)(finalHeaders[key]);
    }
  });

  return finalHeaders;
}module.exports = exports['default'];