import React, { createElement } from 'react'

import getDisplayName from '../shared/getDisplayName'
import { FormFieldPropTypes, FormStorePropTypes } from './types'
import { parseRules } from './validation'

const formFields = []
const propTypes = { ...FormFieldPropTypes }

export const registerFormField = Field => {
  if (formFields.indexOf(Field) < 0) {
    formFields.push(Field)
  }
}
export const isRegisteredField = type => formFields.indexOf(type) >= 0

const createField = FieldLayout => {
  const WrappedField = ({ component, ...rest }, context) => {
    const name = rest.name
    const { aauiFormStore: store } = context
    const fieldState = store.getState()[name] || {}

    // Consider `props.rules` first then field state
    const rules = rest.rules || fieldState.rules || ''
    const required = Object.prototype.hasOwnProperty.call(rest, 'required')
      ? rest.required
      : rules.indexOf('required') !== -1

    const element = createElement(component, {
      ...rest,
      ...fieldState,
      rules,
      required,
    })

    const parsedRules = parseRules(rules)
    const l10nMessageValues = parsedRules.reduce(
      (r, rule) => ({
        ...r,
        [rule.name]: rule.param,
      }),
      {},
    )

    if (FieldLayout) {
      return (
        <FieldLayout
          value={fieldState.value}
          errMsg={fieldState.errMsg}
          required={required}
          l10nMessageValues={l10nMessageValues}
          {...rest}
        >
          {element}
        </FieldLayout>
      )
    }

    return element
  }

  WrappedField.propTypes = propTypes
  WrappedField.contextTypes = FormStorePropTypes
  WrappedField.displayName = `WrappedField(${getDisplayName(WrappedField)})`

  return WrappedField
}

export default createField
