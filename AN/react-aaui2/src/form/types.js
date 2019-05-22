import PropTypes from 'prop-types'

import Store from './store'

const {
  bool,
  string,
  object,
  func,
  shape,
  instanceOf,
  oneOfType,
  any,
} = PropTypes

export const FormPropTypes = {
  onSubmit: func,
  onFail: func,
  onChange: func,
  defaultValues: object,
}

export const FormFieldAPIPropTypes = {
  api: shape({
    setValue: func,
    setError: func,
    getValue: func,
    getError: func,
    onValidate: func,
  }),
}

export const FormFieldPropTypes = {
  rules: string,
  value: any,
  parser: func,
  formatter: func,
  validator: func,
  errMsg: any,
  required: bool,
  static: bool,
}

export const FormStorePropTypes = {
  aauiFormStore: instanceOf(Store),
}

export const addressPropTypes = shape({
  line1: oneOfType([string, object]),
  line2: oneOfType([string, object]),
  city: oneOfType([string, object]),
  stateProvince: oneOfType([string, object]),
  postalCode: oneOfType([string, object]),
})
