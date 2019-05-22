import React, { PureComponent } from 'react'
import { string } from 'prop-types'

import connectForm from './connectForm'
import DatePicker from '../DatePicker'
import { noop, omit } from '../shared/utils'
import { ValidationResult } from './validation'

import { FormFieldAPIPropTypes } from './types'

const format = (value, l10n, dateFormat = 'yyyy-MM-dd') =>
  value ? l10n.formatDateTime(value, dateFormat) : ''
const parse = (value, l10n) =>
  typeof value === 'string' ? l10n.parseDateTime(value) : value
const parser = (value, { l10n }) =>
  format(parse(value, l10n), l10n, 'SHORT_DATE')

class DateInput extends PureComponent {
  static displayName = 'DateInput'

  static propTypes = { ...FormFieldAPIPropTypes, placeholder: string }

  static defaultProps = {
    onChange: noop,
    onBlur: noop,
  }

  setValue(value) {
    const { api: { setValue }, l10n } = this.props
    const isoFormatDate = format(value, l10n)

    if (typeof setValue === 'function') {
      setValue(isoFormatDate)
    }
  }

  handleBlur = e => {
    const { api: { onValidate }, onBlur } = this.props

    if (typeof onValidate === 'function') {
      onValidate(e.target.value)
    }

    onBlur(e)
  }

  handleChange = value => {
    this.setValue(value)
    this.props.onChange(format(value, this.props.l10n))
  }

  formatDate = value => format(value, this.props.l10n, 'SHORT_DATE')

  render() {
    const { l10n, placeholder, value, ...rest } = this.props
    const {
      FORMAT: { SHORT_DATE },
      MONTHS: monthNames,
      WEEKDAYS: weekdayNames,
      SHORTWEEKDAYS: shortWeekdayNames,
    } = l10n.config.dateTimeSymbol

    return (
      <DatePicker
        placeholder={placeholder || SHORT_DATE}
        value={parse(value, l10n)}
        {...omit(rest, ['api', 'rules'])}
        formatDate={this.formatDate}
        monthNames={monthNames}
        weekdayNames={weekdayNames}
        shortWeekdayNames={shortWeekdayNames}
        onBlur={this.handleBlur}
        onChange={this.handleChange}
      />
    )
  }
}

export const validator = ({ l10n }) => validationResult => {
  const { name, value } = validationResult
  const { VALIDATION_REGEX: { DATE: dateReg } } = l10n.config.dateTimeSymbol

  if (value && !dateReg.test(value)) {
    return new ValidationResult(name, value, l10n.invalid)
  }

  return validationResult
}

export default connectForm({ validator, parser })(DateInput)
