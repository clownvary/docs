import React from 'react'
import { string } from 'prop-types'

import TextInput from './TextInput'

const propTypes = { rules: string }
const EmailInput = props => (
  <TextInput type="email" {...props} rules={`${props.rules}|email`} />
)

EmailInput.propTypes = propTypes
EmailInput.displayName = 'EmailInput'

export default EmailInput
