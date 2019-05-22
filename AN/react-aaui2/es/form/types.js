import PropTypes from 'prop-types';

import Store from './store';

var bool = PropTypes.bool,
    string = PropTypes.string,
    object = PropTypes.object,
    func = PropTypes.func,
    shape = PropTypes.shape,
    instanceOf = PropTypes.instanceOf,
    oneOfType = PropTypes.oneOfType,
    any = PropTypes.any;


export var FormPropTypes = {
  onSubmit: func,
  onFail: func,
  onChange: func,
  defaultValues: object
};

export var FormFieldAPIPropTypes = {
  api: shape({
    setValue: func,
    setError: func,
    getValue: func,
    getError: func,
    onValidate: func
  })
};

export var FormFieldPropTypes = {
  rules: string,
  value: any,
  parser: func,
  formatter: func,
  validator: func,
  errMsg: any,
  required: bool,
  static: bool
};

export var FormStorePropTypes = {
  aauiFormStore: instanceOf(Store)
};

export var addressPropTypes = shape({
  line1: oneOfType([string, object]),
  line2: oneOfType([string, object]),
  city: oneOfType([string, object]),
  stateProvince: oneOfType([string, object]),
  postalCode: oneOfType([string, object])
});