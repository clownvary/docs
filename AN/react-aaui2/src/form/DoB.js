import React, { Component } from 'react'
import classNames from 'classnames'
import { string, object, instanceOf } from 'prop-types'

import connectForm from './connectForm'
import Dropdown from '../Dropdown'
import { FormFieldAPIPropTypes } from './types'

import './dob.less'

const minYear = 1900
const maxYear = new Date().getFullYear()

function splitDate(date) {
  let year
  let month
  let day

  if (date && !Number.isNaN(date.getDate())) {
    year = date.getFullYear()
    month = date.getMonth()
    day = date.getDate()
  }

  return { year, month, day }
}

function getDropdownDataFromDateSize(from, to) {
  const data = []
  if (from < to) {
    for (let i = from; i <= to; i += 1) {
      data.push({
        text: `${i}`,
        value: `${i}`,
      })
    }
  } else {
    for (let i = from; i >= to; i -= 1) {
      data.push({
        text: `${i}`,
        value: `${i}`,
      })
    }
  }

  return data
}

function getYears() {
  return getDropdownDataFromDateSize(maxYear, minYear)
}

function getDays(year = maxYear, month) {
  if (!month) {
    return getDropdownDataFromDateSize(1, 31)
  }

  return getDropdownDataFromDateSize(1, new Date(year, month + 1, 0).getDate())
}

function filterDate({ year, month, day }) {
  const newDays = getDays(year, month)
  const newDay = day > newDays.length ? newDays.length : day
  const newDate = new Date(year, month, newDay)
  const newValue = (!Number.isNaN(newDate.getDate()) && newDate) || undefined

  return { newValue, newDay, newDays }
}

function calculateOrder(format) {
  return format
    .split(/[^YyMmDd]/)
    .map(v => v.split('')[0].toUpperCase())
    .map(v => {
      if (v === 'Y') {
        return 'year'
      } else if (v === 'M') {
        return 'month'
      }
      return 'day'
    })
}

class DoB extends Component {
  static propTypes = {
    maxHeight: string,
    size: string,
    className: string,

    style: object, // eslint-disable-line

    value: instanceOf(Date),
    defaultValue: instanceOf(Date),

    ...FormFieldAPIPropTypes,
  }

  static defaultProps = {
    maxHeight: '320px',
  }

  constructor(props) {
    super(props)

    const { value, defaultValue } = props
    const initValue = value || defaultValue
    const values = splitDate(initValue)

    this.state = {
      value: initValue,
      values,
      datum: {
        year: getYears(),
        day: getDays(values.year, values.month),
      },
    }
  }

  handleChange = name => ({ value }) => {
    const { api: { onValidate, setValue }, onChange } = this.props

    const newState = {
      ...this.state,
      values: {
        ...this.state.values,
        [name]: parseInt(value, 10),
      },
    }
    const { newValue, newDays, newDay } = filterDate(newState.values)

    this.setState({
      ...newState,
      value: newValue,
      datum: {
        ...this.state.datum,
        day: newDays,
      },
      values: {
        ...newState.values,
        day: newDay,
      },
    })

    onValidate(newValue)
    setValue(newValue)

    if (typeof onChange === 'function') {
      onChange(newValue)
    }
  }

  render() {
    const { l10n, size, className, style, maxHeight } = this.props
    const { datum, values } = this.state
    const wrapperClassName = classNames('dob', className)

    const {
      config: { dateTimeSymbol: { MONTHS, FORMAT: { SHORT_DATE } } },
    } = l10n

    const data = {
      ...datum,
      month: MONTHS.map((month, key) => ({ text: month, value: `${key}` })),
    }

    const order = calculateOrder(SHORT_DATE)

    return (
      <div className={wrapperClassName} style={style}>
        {order.map(v => (
          <Dropdown
            maxHeight={maxHeight}
            size={size}
            key={`${v}`}
            tabIndex={0}
            value={`${values[v]}`}
            onChange={this.handleChange(`${v}`)}
            placeholder={l10n.formatMessage(`react-aaui.form.dob.${v}`)}
            data={data[v]}
          />
        ))}
      </div>
    )
  }
}

export default connectForm()(DoB)
