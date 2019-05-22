import { filterProps } from '../shared/utils'
import { FormFieldPropTypes } from './types'

export const tryJudgeFieldsValid = (errors = {}) =>
  Object.keys(errors).every(k => {
    const error = errors[k]

    if (error && typeof error === 'object') {
      return tryJudgeFieldsValid(error)
    }

    return !errors[k]
  })

export const reduceFields = (fields = {}) => {
  let errors
  const values = {}
  const reducerKeys = Object.keys(fields)

  for (let i = 0; i < reducerKeys.length; i += 1) {
    const key = reducerKeys[i]
    const field = fields[key] || ''
    const value = typeof field === 'object' ? field.value : field

    // call `reduceFields` recursively on if the `value` is `object`
    values[key] =
      Object.prototype.toString.call(value) === '[object Object]'
        ? reduceFields(value).values
        : value

    if (field.errMsg) {
      errors = errors || {}
      errors[key] = field.errMsg
    }
  }

  const isValid = tryJudgeFieldsValid(errors)

  return {
    values,
    errors,
    isValid,
  }
}

const formFieldPropTypesKeys = Object.keys(FormFieldPropTypes)
export const reduceFieldsProp = fields =>
  Object.keys(fields).reduce((r, k) => {
    const field = fields[k]
    let finalField = {
      value: field,
    }

    // If `field` is `object` then destructing its value
    if (Object.prototype.toString.call(field) === '[object Object]') {
      finalField = {
        ...filterProps(field, formFieldPropTypesKeys),
        value: 'value' in field ? field.value : field.defaultValue,
      }
    }

    return {
      ...r,
      [k]: finalField,
    }
  }, {})
