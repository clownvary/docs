import React from 'react'
import { string } from 'prop-types'

import TextInput from './TextInput'

const propTypes = { rules: string }
const PhoneInput = props => (
  <TextInput type="phone" {...props} rules={`${props.rules}|phone`} />
)

PhoneInput.propTypes = propTypes
PhoneInput.displayName = 'PhoneInput'

export default PhoneInput
