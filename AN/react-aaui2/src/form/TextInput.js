import React, { PureComponent } from 'react'

import connectForm from './connectForm'
import Input from '../Input'
import { noop, omit } from '../shared/utils'
import { FormFieldAPIPropTypes } from './types'

const propTypes = { ...FormFieldAPIPropTypes }

class TextInput extends PureComponent {
  static displayName = 'TextInput'

  static propTypes = propTypes

  static defaultProps = {
    onChange: noop,
    onBlur: noop,
  }

  setWrappedComponentInstance = input => {
    this.input = input
  }

  handleBlur = e => {
    const { api: { onValidate }, onBlur } = this.props

    onValidate(this.input.value)
    onBlur(e)
  }

  handleChange = e => {
    const { api: { setValue }, onChange } = this.props

    setValue(e.target.value)
    onChange(e)
  }

  render() {
    const { ...rest } = this.props

    return this.props.static ? (
      <span>{rest.value}</span>
    ) : (
      <Input
        ref={this.setWrappedComponentInstance}
        type="text"
        {...omit(rest, ['api', 'l10n', 'rules'])}
        onBlur={this.handleBlur}
        onChange={this.handleChange}
      />
    )
  }
}

export default connectForm()(TextInput)
