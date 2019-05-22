import React from 'react'
import { string } from 'prop-types'

import TextInput from './TextInput'

const propTypes = { rules: string }
const NumericInput = props => (
  <TextInput type="number" {...props} rules={`${props.rules}|number`} />
)

NumericInput.propTypes = propTypes
NumericInput.displayName = 'NumericInput'

export default NumericInput
