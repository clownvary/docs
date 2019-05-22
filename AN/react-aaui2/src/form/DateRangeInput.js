import React, { PureComponent } from 'react'

import connectForm from './connectForm'
import NestedForm from './NestedForm'
import Form from './Form'
import DateInput from './DateInput'
import { FormFieldAPIPropTypes } from './types'
import { noop } from '../shared/utils'

const propTypes = { ...FormFieldAPIPropTypes }

function isBeforeDay(date, day) {
  return date.getTime() < day.getTime()
}

function isAfterDay(date, day) {
  return date.getTime() > day.getTime()
}

class DateRangeInput extends PureComponent {
  static defaultProps = {
    value: {},
    onChange: noop,
  }

  getStartDateStatus = ({ date }) => {
    const { value: { endDate } } = this.props

    return {
      disabled: (endDate && isAfterDay(date, new Date(endDate))) || false,
    }
  }

  getEndDateStatus = ({ date }) => {
    const { value: { startDate } } = this.props

    return {
      disabled: (startDate && isBeforeDay(date, new Date(startDate))) || false,
    }
  }

  setDateClass = ({ disabled }) => (disabled ? 'date-picker__disabled' : '')

  handleDateClick = ({ disabled }) => !disabled

  render() {
    const { value, ...rest } = this.props

    const { startDate, endDate } = value

    return (
      <div className="range-container">
        <NestedForm {...rest} fields={value}>
          <Form>
            <DateInput
              name="startDate"
              value={startDate}
              getDateStatus={this.getStartDateStatus}
              onClickDate={this.handleDateClick}
              setDateClass={this.setDateClass}
            />
            <span>To</span>
            <DateInput
              name="endDate"
              value={endDate}
              getDateStatus={this.getEndDateStatus}
              onClickDate={this.handleDateClick}
              setDateClass={this.setDateClass}
            />
          </Form>
        </NestedForm>
      </div>
    )
  }
}

DateRangeInput.displayName = 'DateRangeInput'
DateRangeInput.propTypes = propTypes

export default connectForm({})(DateRangeInput)
