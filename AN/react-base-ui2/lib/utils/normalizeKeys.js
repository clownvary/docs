'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _keys = require('babel-runtime/core-js/object/keys');var _keys2 = _interopRequireDefault(_keys);var _camelCase = require('lodash/camelCase');var _camelCase2 = _interopRequireDefault(_camelCase);
var _isObject = require('lodash/isObject');var _isObject2 = _interopRequireDefault(_isObject);
var _isArray = require('lodash/isArray');var _isArray2 = _interopRequireDefault(_isArray);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

function normalizeKeys(object) {
  if ((0, _isArray2.default)(object)) {
    var arr = [];
    (0, _keys2.default)(object).forEach(function (key) {
      var value = normalizeKeys(object[key]);
      arr[(0, _camelCase2.default)(key)] = value;
    });
    return arr;
  } else if ((0, _isObject2.default)(object)) {
    var obj = {};
    (0, _keys2.default)(object).forEach(function (key) {
      var value = normalizeKeys(object[key]);
      obj[(0, _camelCase2.default)(key)] = value;
    });
    return obj;
  }
  return object;
}exports.default =

normalizeKeys;module.exports = exports['default'];