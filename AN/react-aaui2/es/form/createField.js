import _objectWithoutProperties from 'babel-runtime/helpers/objectWithoutProperties';
import _extends from 'babel-runtime/helpers/extends';
import React, { createElement } from 'react';

import getDisplayName from '../shared/getDisplayName';
import { FormFieldPropTypes, FormStorePropTypes } from './types';
import { parseRules } from './validation';

var formFields = [];
var propTypes = _extends({}, FormFieldPropTypes);

export var registerFormField = function registerFormField(Field) {
  if (formFields.indexOf(Field) < 0) {
    formFields.push(Field);
  }
};
export var isRegisteredField = function isRegisteredField(type) {
  return formFields.indexOf(type) >= 0;
};

var createField = function createField(FieldLayout) {
  var WrappedField = function WrappedField(_ref, context) {
    var component = _ref.component,
        rest = _objectWithoutProperties(_ref, ['component']);

    var name = rest.name;
    var store = context.aauiFormStore;

    var fieldState = store.getState()[name] || {};

    // Consider `props.rules` first then field state
    var rules = rest.rules || fieldState.rules || '';
    var required = Object.prototype.hasOwnProperty.call(rest, 'required') ? rest.required : rules.indexOf('required') !== -1;

    var element = createElement(component, _extends({}, rest, fieldState, {
      rules: rules,
      required: required
    }));

    var parsedRules = parseRules(rules);
    var l10nMessageValues = parsedRules.reduce(function (r, rule) {
      var _extends2;

      return _extends({}, r, (_extends2 = {}, _extends2[rule.name] = rule.param, _extends2));
    }, {});

    if (FieldLayout) {
      return React.createElement(
        FieldLayout,
        _extends({
          value: fieldState.value,
          errMsg: fieldState.errMsg,
          required: required,
          l10nMessageValues: l10nMessageValues
        }, rest),
        element
      );
    }

    return element;
  };

  WrappedField.propTypes = propTypes;
  WrappedField.contextTypes = FormStorePropTypes;
  WrappedField.displayName = 'WrappedField(' + getDisplayName(WrappedField) + ')';

  return WrappedField;
};

export default createField;