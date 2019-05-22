import React, { PureComponent } from 'react'

import connectForm from './connectForm'
import Dropdown from '../Dropdown'
import { omit } from '../shared/utils'
import { FormFieldAPIPropTypes } from './types'

const PLACEHOLDER_SELECT = 'react-aaui.common.dropdown.notice.select'
const PLACEHOLDER_FILTER_SELECT =
  'react-aaui.common.dropdown.notice.filterSelect'

class Combobox extends PureComponent {
  static displayName = 'Combobox'
  static propTypes = {
    ...FormFieldAPIPropTypes,
  }

  handleChange = ({ value }) => {
    const { api: { setValue, onValidate }, onChange } = this.props

    onValidate(value)
    setValue(value)

    if (typeof onChange === 'function') {
      onChange({ value })
    }
  }

  render() {
    const { l10n, ...rest } = this.props

    return (
      <Dropdown
        placeholder={l10n.formatMessage(PLACEHOLDER_SELECT)}
        filterPlaceholder={l10n.formatMessage(PLACEHOLDER_FILTER_SELECT)}
        {...omit(rest, ['api', 'rules'])}
        onChange={this.handleChange}
      />
    )
  }
}

export default connectForm()(Combobox)
