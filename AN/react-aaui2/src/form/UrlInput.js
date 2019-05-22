import React from 'react'
import { string } from 'prop-types'

import TextInput from './TextInput'

const propTypes = { rules: string }
const UrlInput = props => (
  <TextInput type="url" {...props} rules={`${props.rules}|url`} />
)

UrlInput.propTypes = propTypes
UrlInput.displayName = 'UrlInput'

export default UrlInput
