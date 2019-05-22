import React, { PureComponent } from 'react'
import { node } from 'prop-types'

import connectForm from './connectForm'
import { noop, omit } from '../shared/utils'
import { CheckboxGroup } from '../Checkbox'
import { FormFieldAPIPropTypes } from './types'

class FormCheckboxGroup extends PureComponent {
  static displayName = 'AUICheckboxGroup'

  static propTypes = {
    ...FormFieldAPIPropTypes,
    children: node,
  }

  static defaultProps = {
    onChange: noop,
  }

  handleChange = value => {
    const { api: { setValue }, onChange } = this.props

    setValue(value)
    onChange(value)
  }

  render() {
    const { children, ...rest } = this.props

    return (
      <CheckboxGroup
        {...omit(rest, ['api', 'rules'])}
        onChange={this.handleChange}
      >
        {children}
      </CheckboxGroup>
    )
  }
}

export default connectForm()(FormCheckboxGroup)
