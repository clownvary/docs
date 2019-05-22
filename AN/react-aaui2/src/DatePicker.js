import React, { PureComponent } from 'react'
import { bool, string, func, array, object } from 'prop-types'
import classNames from 'classnames'

import { noop, filterValidProps } from './shared/utils'
import Input from './Input'

const MONTH_NAMES = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

const DAY_SPAN = 1000 * 60 * 60 * 24

function findOutDays(d) {
  const firstDayOfMonth = new Date(d.getFullYear(), d.getMonth(), 1)
  const startDate = new Date(
    firstDayOfMonth.getTime() - DAY_SPAN * firstDayOfMonth.getDay(),
  )

  function addDay(date, n) {
    const offset = date.getTimezoneOffset()
    const nextDay = new Date(date.getTime() + n * DAY_SPAN)
    const nextDayOffset = nextDay.getTimezoneOffset()
    if (nextDayOffset !== offset) {
      nextDay.setTime(nextDay.getTime() + (nextDayOffset - offset) * 60 * 1000)
    }
    return nextDay
  }

  const days = new Array(6)
  for (let i = 0; i < 6; i += 1) {
    days[i] = new Array(7)
    for (let j = 0; j < 7; j += 1) {
      days[i][j] = addDay(startDate, i * 7 + j)
    }
  }
  return days
}

function formatDate(d) {
  if (d == null) return ''
  return `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()}`
}

function isOtherMonth(x, y) {
  return x.getMonth() !== y.getMonth()
}

function isSameDay(x, y) {
  if (x === y) return true
  if (x == null || y == null) return false

  return (
    x.getFullYear() === y.getFullYear() &&
    x.getMonth() === y.getMonth() &&
    x.getDate() === y.getDate()
  )
}

const propTypes = {
  className: string,
  style: object,
  placeholder: string,
  name: string,
  showIcon: bool,
  errored: bool,
  disabled: bool,
  onFocus: func,
  onBlur: func,
  transformDate: func,
  value: object,
  defaultValue: object,
  formatDate: func,
  today: object,
  getDateStatus: func,
  setDateClass: func,
  onClickDate: func,
  onChange: func,
  monthNames: array,
  weekdayNames: array,
  shortWeekdayNames: array,
}

export default class DatePicker extends PureComponent {
  static displayName = 'AUIDatePicker'
  static propTypes = propTypes
  static defaultProps = {
    onBlur: noop,
    onFocus: noop,
    loseFocus: noop,
    getDateStatus: noop,
    setDateClass: noop,
    monthNames: MONTH_NAMES,
    weekdayNames: [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ],
    shortWeekdayNames: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
  }

  constructor(props) {
    super(props)

    this.state = {
      isDisplayed: false,
      showOnTop: false,
      showOnLeft: false,
      value: props.value || props.defaultValue,
      calendarDate: props.value || props.defaultValue || new Date(),
    }
  }

  componentDidMount = () => {
    Object.defineProperties(this, {
      value: {
        get() {
          return this.state.value
        },
        set(v) {
          if (this.props.value === undefined) {
            this.setState({ value: v })
          }
        },
      },
    })
  }

  componentWillReceiveProps = nextProps => {
    const newState = {
      value:
        nextProps.value !== this.props.value // eslint-disable-line no-nested-ternary
          ? nextProps.value
          : // eslint-disable-next-line no-nested-ternary
            nextProps.defaultValue !== this.props.defaultValue
            ? this.state.value === undefined
              ? nextProps.defaultValue
              : this.state.value
            : this.state.value,
    }

    if (newState.value !== this.state.value) {
      this.setState(newState)
    }
  }

  componentDidUpdate = () => {
    const formatDateProps = this.props.formatDate
    const { value } = this.state

    if (formatDateProps) {
      this.input.value = formatDateProps(value)
    } else if (value) {
      this.input.value = formatDate(value)
    }
  }

  onClickDate = (d, dateStatusObj) => {
    let onClickDate = this.props.onClickDate
    onClickDate = typeof onClickDate === 'function' ? onClickDate : null

    if (onClickDate) {
      if (onClickDate(dateStatusObj)) {
        this.selectDate(d)
      }
      return false
    }

    this.selectDate(d)
    return false
  }

  setDateClass = (c, calendarDate, today, dateStatusObj) =>
    classNames(
      {
        'date-picker--other-month': isOtherMonth(c, calendarDate),
        'date-picker--today': isSameDay(c, today),
        'date-picker--selected': isSameDay(c, this.state.value),
      },
      this.props.setDateClass(dateStatusObj),
    )

  setRef = ref => {
    this.input = ref
  }

  setInputNodeRef = node => {
    this.inputNode = node
  }

  goPrevMonth = () => {
    const calendarDate = this.state.calendarDate
    const prevMonth = new Date(
      new Date(
        calendarDate.getFullYear(),
        calendarDate.getMonth(),
        1,
      ).getTime() - DAY_SPAN,
    )
    this.setState({
      calendarDate: prevMonth,
    })
  }

  goNextMonth = () => {
    const calendarDate = this.state.calendarDate
    const nextMonth = new Date(
      new Date(
        calendarDate.getFullYear(),
        calendarDate.getMonth(),
        1,
      ).getTime() +
        DAY_SPAN * 31,
    )
    this.setState({
      calendarDate: nextMonth,
    })
  }

  selectDate = d => {
    const date = this.props.value !== undefined ? this.state.value : d

    this.setState(
      {
        value: d && date,
        isDisplayed: false,
      },
      () => {
        if (this.props.onChange) this.props.onChange(d, this.input.value)
      },
    )
  }

  handleFocus = e => {
    const { onFocus } = this.props

    this.gainFocus()
    onFocus(e)
  }

  handleBlur = e => {
    const { onBlur } = this.props

    this.loseFocus()
    onBlur(e)
  }

  gainFocus = () => {
    const rect = this.inputNode.getBoundingClientRect()
    const verDistance =
      document.documentElement.clientHeight - (rect.top + rect.height)
    const horDistance =
      document.documentElement.clientWidth - (rect.left + rect.width)

    this.setState({
      isDisplayed: true,
      showOnTop: verDistance < 216.75 && rect.top >= 216.75, // TODO: Magic number???
      showOnLeft: horDistance < 246 && rect.width <= 246, // TODO: Magic number???
      calendarDate: this.state.value || new Date(),
    })
  }

  loseFocus = () => {
    const input = this.input
    const value = this.state.value

    const transformDate = this.props.transformDate
    const d = new Date(transformDate ? transformDate(input.value) : input.value)

    if (isNaN(d.getTime())) {
      this.selectDate(null)
    } else if (value == null || d.getTime() !== value.getTime()) {
      this.selectDate(d)
    } else {
      this.setState({
        isDisplayed: false,
      })
    }
  }

  preventStealingFocus = e => {
    e.preventDefault()
  }

  displayIfNotAlready = () => {
    if (
      !this.state.isDisplayed &&
      document.activeElement === this.input.input
    ) {
      this.setState({ isDisplayed: true })
    }
  }

  render = () => {
    const {
      placeholder,
      className,
      style,
      name,
      showIcon,
      errored,
      disabled,
      monthNames,
      weekdayNames,
      shortWeekdayNames,
      ...rest
    } = this.props
    const { isDisplayed, showOnTop, showOnLeft } = this.state
    const calendarDate = this.state.calendarDate
    const calendarDateStr = `${monthNames[
      calendarDate.getMonth()
    ]} ${calendarDate.getFullYear()}`
    const days = findOutDays(calendarDate)
    const today = this.props.today || new Date()

    // set input element default value.
    let inputDefaultValue = this.props.value
      ? this.state.value
      : this.props.defaultValue
    inputDefaultValue = this.props.formatDate
      ? this.props.formatDate(inputDefaultValue)
      : formatDate(inputDefaultValue)
    const validProps = filterValidProps(rest)
    const classes = classNames('date-picker', className)
    const calendarClasses = classNames({
      'date-picker__calendar': true,
      'u-hidden': !isDisplayed,
      'date-picker__calendar--show-on-top': showOnTop,
      'date-picker__calendar--show-on-left': showOnLeft,
    })

    return (
      <div className={classes} style={style}>
        <Input
          ref={this.setRef}
          {...validProps}
          placeholder={placeholder}
          name={name}
          postIcon={showIcon ? 'icon-calendar' : undefined}
          errored={errored}
          disabled={disabled}
          defaultValue={inputDefaultValue}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          onClick={this.displayIfNotAlready}
          inputRef={this.setInputNodeRef}
        />
        <div
          className={calendarClasses}
          onMouseDown={this.preventStealingFocus}
        >
          <header className="date-picker__header">
            <span
              className="icon-chevron-left date-picker__left-arrow"
              title="Previous month"
              onClick={this.goPrevMonth}
            />
            <span
              className="icon-chevron-right date-picker__right-arrow"
              title="Next month"
              onClick={this.goNextMonth}
            />
            <div className="date-picker__calendar-title">
              <strong>{calendarDateStr}</strong>
            </div>
          </header>
          <table className="date-picker__table">
            <thead>
              <tr>
                {shortWeekdayNames.map((v, k) => (
                  <th key={k} title={weekdayNames[k]}>
                    {v}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {days.map((r, i) => (
                <tr key={i}>
                  {r.map((c, j) => {
                    const dateStatusObj = this.props.getDateStatus({
                      date: c,
                      calendarDate,
                      today,
                    })

                    return (
                      <td
                        key={j}
                        className={this.setDateClass(
                          c,
                          calendarDate,
                          today,
                          dateStatusObj,
                        )}
                        onClick={() => this.onClickDate(c, dateStatusObj)}
                      >
                        {c.getDate()}
                      </td>
                    )
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}
