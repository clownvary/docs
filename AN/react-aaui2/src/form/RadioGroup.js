import React, { PureComponent } from 'react'
import { node } from 'prop-types'

import connectForm from './connectForm'
import { noop, omit } from '../shared/utils'
import { RadioGroup } from '../radio'
import { FormFieldAPIPropTypes } from './types'

class FormRadioGroup extends PureComponent {
  static displayName = 'AUIRadioGroup'

  static propTypes = {
    ...FormFieldAPIPropTypes,
    children: node,
  }

  static defaultProps = {
    onChange: noop,
  }

  handleChange = e => {
    const { api: { setValue }, onChange } = this.props

    setValue(e.target.value)
    onChange(e)
  }

  render() {
    const { children, ...rest } = this.props

    return (
      <RadioGroup
        {...omit(rest, ['api', 'rules'])}
        onChange={this.handleChange}
      >
        {children}
      </RadioGroup>
    )
  }
}

export default connectForm()(FormRadioGroup)
