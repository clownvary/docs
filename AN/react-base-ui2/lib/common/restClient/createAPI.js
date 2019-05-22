'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _isFunction = require('lodash/isFunction');var _isFunction2 = _interopRequireDefault(_isFunction);
var _isString = require('lodash/isString');var _isString2 = _interopRequireDefault(_isString);
var _isArray = require('lodash/isArray');var _isArray2 = _interopRequireDefault(_isArray);
var _isPlainObject = require('lodash/isPlainObject');var _isPlainObject2 = _interopRequireDefault(_isPlainObject);
var _Request = require('./Request');var _Request2 = _interopRequireDefault(_Request);
var _HttpMethod = require('./consts/HttpMethod');var HttpMethod = _interopRequireWildcard(_HttpMethod);function _interopRequireWildcard(obj) {if (obj && obj.__esModule) {return obj;} else {var newObj = {};if (obj != null) {for (var key in obj) {if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];}}newObj.default = obj;return newObj;}}function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

var _createAPI = void 0;
/* istanbul ignore else */
if (__STATIC__) {
  _createAPI = function _createAPI() {
    var mockedAPI = function mockedAPI() {
    };
    /* istanbul ignore next */
    mockedAPI.mock = function (jsonPath) {return function () {return _Request2.default.instance[HttpMethod.GET](jsonPath);};};
    return mockedAPI;
  };
} else {
  var exp = /\{\{([\s\S]+?)\}\}/;
  var hasTemplate = function hasTemplate(s) {return s.match(exp);};
  var findTemplate = function findTemplate(s) {
    var m = exp.exec(s);
    return m ? m[1] : '';
  };

  var doTemplate = function doTemplate(url, param) {
    if ((0, _isString2.default)(url) && (0, _isPlainObject2.default)(param)) {
      var key = findTemplate(url);
      while (key) {
        var value = param[key];
        if (!value && value !== 0) {
          value = '';
        }
        if ((0, _isArray2.default)(value)) {
          value = value.join(',');
        }
        url = url.replace('{{' + key + '}}', value);
        key = findTemplate(url);
      }
    }

    return url;
  };

  _createAPI = function _createAPI(method, url, fetchConfig, templateHandler) {return function (params, content) {
      if ((0, _isFunction2.default)(fetchConfig)) {
        fetchConfig = null;
        templateHandler = fetchConfig;
      }

      if (hasTemplate(url) && !(0, _isFunction2.default)(templateHandler)) {
        templateHandler = doTemplate;
      }

      var restUrl = url;
      if ((0, _isFunction2.default)(templateHandler)) {
        restUrl = templateHandler(url, params);
      } else {
        content = params;
      }

      return _Request2.default.instance[method](restUrl, content);
    };};
}

var createAPI = _createAPI;exports.default =

createAPI;module.exports = exports['default'];