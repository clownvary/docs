'use strict';

exports.__esModule = true;
exports.addressPropTypes = exports.FormStorePropTypes = exports.FormFieldPropTypes = exports.FormFieldAPIPropTypes = exports.FormPropTypes = undefined;

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _store = require('./store');

var _store2 = _interopRequireDefault(_store);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var bool = _propTypes2.default.bool,
    string = _propTypes2.default.string,
    object = _propTypes2.default.object,
    func = _propTypes2.default.func,
    shape = _propTypes2.default.shape,
    instanceOf = _propTypes2.default.instanceOf,
    oneOfType = _propTypes2.default.oneOfType,
    any = _propTypes2.default.any;
var FormPropTypes = exports.FormPropTypes = {
  onSubmit: func,
  onFail: func,
  onChange: func,
  defaultValues: object
};

var FormFieldAPIPropTypes = exports.FormFieldAPIPropTypes = {
  api: shape({
    setValue: func,
    setError: func,
    getValue: func,
    getError: func,
    onValidate: func
  })
};

var FormFieldPropTypes = exports.FormFieldPropTypes = {
  rules: string,
  value: any,
  parser: func,
  formatter: func,
  validator: func,
  errMsg: any,
  required: bool,
  static: bool
};

var FormStorePropTypes = exports.FormStorePropTypes = {
  aauiFormStore: instanceOf(_store2.default)
};

var addressPropTypes = exports.addressPropTypes = shape({
  line1: oneOfType([string, object]),
  line2: oneOfType([string, object]),
  city: oneOfType([string, object]),
  stateProvince: oneOfType([string, object]),
  postalCode: oneOfType([string, object])
});