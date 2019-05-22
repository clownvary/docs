'use strict';

exports.__esModule = true;
exports.reduceFieldsProp = exports.reduceFields = exports.tryJudgeFieldsValid = undefined;

var _extends3 = require('babel-runtime/helpers/extends');

var _extends4 = _interopRequireDefault(_extends3);

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _utils = require('../shared/utils');

var _types = require('./types');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var tryJudgeFieldsValid = exports.tryJudgeFieldsValid = function tryJudgeFieldsValid() {
  var errors = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return (0, _keys2.default)(errors).every(function (k) {
    var error = errors[k];

    if (error && (typeof error === 'undefined' ? 'undefined' : (0, _typeof3.default)(error)) === 'object') {
      return tryJudgeFieldsValid(error);
    }

    return !errors[k];
  });
};

var reduceFields = exports.reduceFields = function reduceFields() {
  var fields = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  var errors = void 0;
  var values = {};
  var reducerKeys = (0, _keys2.default)(fields);

  for (var i = 0; i < reducerKeys.length; i += 1) {
    var key = reducerKeys[i];
    var field = fields[key] || '';
    var value = (typeof field === 'undefined' ? 'undefined' : (0, _typeof3.default)(field)) === 'object' ? field.value : field;

    // call `reduceFields` recursively on if the `value` is `object`
    values[key] = Object.prototype.toString.call(value) === '[object Object]' ? reduceFields(value).values : value;

    if (field.errMsg) {
      errors = errors || {};
      errors[key] = field.errMsg;
    }
  }

  var isValid = tryJudgeFieldsValid(errors);

  return {
    values: values,
    errors: errors,
    isValid: isValid
  };
};

var formFieldPropTypesKeys = (0, _keys2.default)(_types.FormFieldPropTypes);
var reduceFieldsProp = exports.reduceFieldsProp = function reduceFieldsProp(fields) {
  return (0, _keys2.default)(fields).reduce(function (r, k) {
    var _extends2;

    var field = fields[k];
    var finalField = {
      value: field

      // If `field` is `object` then destructing its value
    };if (Object.prototype.toString.call(field) === '[object Object]') {
      finalField = (0, _extends4.default)({}, (0, _utils.filterProps)(field, formFieldPropTypesKeys), {
        value: 'value' in field ? field.value : field.defaultValue
      });
    }

    return (0, _extends4.default)({}, r, (_extends2 = {}, _extends2[k] = finalField, _extends2));
  }, {});
};