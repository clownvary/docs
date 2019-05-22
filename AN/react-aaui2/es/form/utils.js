import _extends from 'babel-runtime/helpers/extends';
import _typeof from 'babel-runtime/helpers/typeof';
import _Object$keys from 'babel-runtime/core-js/object/keys';
import { filterProps } from '../shared/utils';
import { FormFieldPropTypes } from './types';

export var tryJudgeFieldsValid = function tryJudgeFieldsValid() {
  var errors = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return _Object$keys(errors).every(function (k) {
    var error = errors[k];

    if (error && (typeof error === 'undefined' ? 'undefined' : _typeof(error)) === 'object') {
      return tryJudgeFieldsValid(error);
    }

    return !errors[k];
  });
};

export var reduceFields = function reduceFields() {
  var fields = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  var errors = void 0;
  var values = {};
  var reducerKeys = _Object$keys(fields);

  for (var i = 0; i < reducerKeys.length; i += 1) {
    var key = reducerKeys[i];
    var field = fields[key] || '';
    var value = (typeof field === 'undefined' ? 'undefined' : _typeof(field)) === 'object' ? field.value : field;

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

var formFieldPropTypesKeys = _Object$keys(FormFieldPropTypes);
export var reduceFieldsProp = function reduceFieldsProp(fields) {
  return _Object$keys(fields).reduce(function (r, k) {
    var _extends2;

    var field = fields[k];
    var finalField = {
      value: field

      // If `field` is `object` then destructing its value
    };if (Object.prototype.toString.call(field) === '[object Object]') {
      finalField = _extends({}, filterProps(field, formFieldPropTypesKeys), {
        value: 'value' in field ? field.value : field.defaultValue
      });
    }

    return _extends({}, r, (_extends2 = {}, _extends2[k] = finalField, _extends2));
  }, {});
};