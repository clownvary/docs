'use strict';

exports.__esModule = true;
exports.isRegisteredField = exports.registerFormField = undefined;

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _extends3 = require('babel-runtime/helpers/extends');

var _extends4 = _interopRequireDefault(_extends3);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _getDisplayName = require('../shared/getDisplayName');

var _getDisplayName2 = _interopRequireDefault(_getDisplayName);

var _types = require('./types');

var _validation = require('./validation');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var formFields = [];
var propTypes = (0, _extends4.default)({}, _types.FormFieldPropTypes);

var registerFormField = exports.registerFormField = function registerFormField(Field) {
  if (formFields.indexOf(Field) < 0) {
    formFields.push(Field);
  }
};
var isRegisteredField = exports.isRegisteredField = function isRegisteredField(type) {
  return formFields.indexOf(type) >= 0;
};

var createField = function createField(FieldLayout) {
  var WrappedField = function WrappedField(_ref, context) {
    var component = _ref.component,
        rest = (0, _objectWithoutProperties3.default)(_ref, ['component']);

    var name = rest.name;
    var store = context.aauiFormStore;

    var fieldState = store.getState()[name] || {};

    // Consider `props.rules` first then field state
    var rules = rest.rules || fieldState.rules || '';
    var required = Object.prototype.hasOwnProperty.call(rest, 'required') ? rest.required : rules.indexOf('required') !== -1;

    var element = (0, _react.createElement)(component, (0, _extends4.default)({}, rest, fieldState, {
      rules: rules,
      required: required
    }));

    var parsedRules = (0, _validation.parseRules)(rules);
    var l10nMessageValues = parsedRules.reduce(function (r, rule) {
      var _extends2;

      return (0, _extends4.default)({}, r, (_extends2 = {}, _extends2[rule.name] = rule.param, _extends2));
    }, {});

    if (FieldLayout) {
      return _react2.default.createElement(
        FieldLayout,
        (0, _extends4.default)({
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
  WrappedField.contextTypes = _types.FormStorePropTypes;
  WrappedField.displayName = 'WrappedField(' + (0, _getDisplayName2.default)(WrappedField) + ')';

  return WrappedField;
};

exports.default = createField;