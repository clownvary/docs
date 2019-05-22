import React from 'react'
import { string, object } from 'prop-types'

import TextInput from './TextInput'

export const POSTAL_CODE_FIELD_KEY = 'postalCode'

const propTypes = {
  countryConfig: object.isRequired,
  rules: string,
}

const getPostalCode = countryConfig => {
  let regexp
  if (
    countryConfig &&
    countryConfig.addressForm &&
    countryConfig.addressForm.addressFields
  ) {
    const { addressForm: { addressFields } } = countryConfig
    const postalCodeFieldKey = Object.keys(addressFields).filter(
      field => addressFields[field].addressPart === POSTAL_CODE_FIELD_KEY,
    )[0]
    if (addressFields[postalCodeFieldKey]) {
      regexp = addressFields[postalCodeFieldKey].validationRegex || ''
    }
  } else {
    regexp = ''
  }
  return regexp
}

const PostalCodeInput = props => {
  const { countryConfig, rules, ...rest } = props
  const regexp = getPostalCode(countryConfig)
  return (
    <TextInput
      type="postalCode"
      {...rest}
      rules={`${rules}|regexp:(${regexp})`}
    />
  )
}

PostalCodeInput.displayName = 'PostalCodeInput'
PostalCodeInput.propTypes = propTypes

export default PostalCodeInput
