import React, { PureComponent } from 'react'

import connectForm from './connectForm'
import TextArea from '../TextArea'
import { noop, omit } from '../shared/utils'
import { FormFieldAPIPropTypes } from './types'

const propTypes = { ...FormFieldAPIPropTypes }

class FormTextArea extends PureComponent {
  static displayName = 'TextArea'

  static propTypes = propTypes

  static defaultProps = {
    onChange: noop,
    onBlur: noop,
  }

  handleBlur = e => {
    const { api: { onValidate }, onBlur, value } = this.props

    onValidate(value)
    onBlur(e)
  }

  handleChange = e => {
    const { api: { setValue }, onChange } = this.props

    setValue(e.target.value)
    onChange(e)
  }

  render() {
    const { ...rest } = this.props

    return (
      <TextArea
        type="text"
        {...omit(rest, ['api', 'l10n', 'rules'])}
        onBlur={this.handleBlur}
        onChange={this.handleChange}
      />
    )
  }
}

export default connectForm()(FormTextArea)
