import React, { PureComponent } from 'react'

import connectForm from './connectForm'
import { Select as ResponsiveSelect } from '../Dropdown'
import { omit, noop } from '../shared/utils'
import { FormFieldAPIPropTypes } from './types'

const PLACEHOLDER_SELECT = 'react-aaui.common.dropdown.notice.select'

class Select extends PureComponent {
  static displayName = 'Select'
  static propTypes = {
    ...FormFieldAPIPropTypes,
  }
  static defaultProps = {
    onChange: noop,
  }

  handleChange = ({ value }) => {
    const { api: { setValue, onValidate }, onChange } = this.props

    onValidate(value)
    setValue(value)
    onChange({ value })
  }

  render() {
    const { l10n, ...rest } = this.props

    return (
      <ResponsiveSelect
        placeholder={l10n.formatMessage(PLACEHOLDER_SELECT)}
        {...omit(rest, ['api', 'rules'])}
        onChange={this.handleChange}
      />
    )
  }
}

export default connectForm()(Select)
