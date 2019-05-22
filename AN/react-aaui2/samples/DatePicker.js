import React from 'react'
import ReactDOM from 'react-dom'
/* eslint-disable import/no-extraneous-dependencies */
import moment from 'moment'
import { Button, DatePicker } from '../src/index'
import './datepicker.less'

const dateFormatMap = {
  'DD/MM/YYYY': 'DD MMM YYYY',
  'MM/DD/YYYY': 'MMM DD, YYYY',
  'YYYY/MM/DD': 'YYYY MMM DD',
}

const dateFormat = 'YYYY/MM/DD'

function formatDate(d) {
  if (d == null) return ''
  return moment(d).format(dateFormatMap[dateFormat])
}

function formatDate1(d) {
  if (d == null) return ''
  return moment(d).format(dateFormat)
}

function transformDate(d) {
  if (d == null) return ''
  return moment(d, dateFormat).format()
}

function isBeforeDay(date, day) {
  return date.getTime() < day.getTime()
}

function isAfterDay(date, day) {
  return date.getTime() > day.getTime()
}

class App extends React.Component {
  state = {
    d2: new Date(2015, 1, 1),
    dshirly: null,
    ds: null,
    ds_end: null,
  }

  onD2Change = val => {
    this.setState({
      d2: val,
    })
  }

  onClickDate = ({ disabled }) =>
    // do not want peole click the date to choose the date
    !disabled

  onClickDateDsEnd = ({ disabled }) => !disabled

  setDateClass = ({ disabled }) => (disabled ? 'date-picker__disabled' : '')

  setDateDsEndClass = ({ disabled }) =>
    disabled ? 'date-picker__disabled' : ''

  getDateStatus = ({ date }) => {
    const dsEnd = this.state.ds_end

    return {
      disabled: (dsEnd && isAfterDay(date, dsEnd)) || false,
    }
  }

  getDateDsEndStatus = ({ date }) => {
    const ds = this.state.ds

    return {
      disabled: (ds && isBeforeDay(date, ds)) || false,
    }
  }

  changeDateDs = val => {
    this.setState({
      ds: val,
    })
  }

  changeDateDsEnd = val => {
    this.setState({
      ds_end: val,
    })
  }

  resetDshirly = () => {
    this.setState({
      dshirly: null,
    })
  }

  showValue = val => {
    console.log(val)
  }

  changeDate = val => {
    this.setState({
      dshirly: val,
    })
  }

  render() {
    return (
      <div className="container">
        <DatePicker
          ref={input => {
            this.d1 = input
          }}
          onFocus={e => console.log(e)}
          onBlur={e => console.log(e)}
          onChange={this.showValue}
        />
        <DatePicker defaultValue={new Date()} />
        <DatePicker
          value={new Date(2015, 1, 1)}
          onChange={this.showValue}
          showIcon
          today={new Date(2015, 1, 11)}
        />
        <DatePicker
          ref={input => {
            this.d2 = input
          }}
          value={this.state.d2}
          onChange={this.onD2Change}
        />
        <DatePicker value={new Date(2015, 11, 31)} disabled />
        <h2>customed date format</h2>
        <DatePicker
          defaultValue={new Date()}
          onChange={this.showValue}
          formatDate={formatDate}
        />
        <DatePicker
          defaultValue={new Date()}
          onChange={this.showValue}
          transformDate={transformDate}
          formatDate={formatDate1}
        />
        <h2>make it possible to reset datepicker null</h2>
        <DatePicker
          value={this.state.dshirly}
          onChange={this.changeDate}
          formatDate={formatDate}
        />
        <Button onClick={this.resetDshirly}>reset dshirly</Button>
        <h2>limit the date selectable area</h2>
        <div className="datepicker-disabled-area-demo">
          <DatePicker
            ref={input => {
              this.ds = input
            }}
            value={this.state.ds}
            style={{ width: '200px' }}
            onChange={this.changeDateDs}
            getDateStatus={this.getDateStatus}
            onClickDate={dateStatusObj => this.onClickDate(dateStatusObj)}
            setDateClass={dateStatusObj => this.setDateClass(dateStatusObj)}
          />
          -
          <DatePicker
            ref={input => {
              this.ds_end = input
            }}
            value={this.state.ds_end}
            style={{ width: '200px' }}
            onChange={this.changeDateDsEnd}
            getDateStatus={this.getDateDsEndStatus}
            onClickDate={dateStatusObj => this.onClickDateDsEnd(dateStatusObj)}
            setDateClass={dateStatusObj =>
              this.setDateDsEndClass(dateStatusObj)}
          />
        </div>
        <p>
          Sit amet illo cupiditate nam vitae tenetur nobis. Ut vel quaerat
          cupiditate itaque alias. Exercitationem ipsam quam rem exercitationem
          ut sunt a nemo, harum, aspernatur quod? Cupiditate inventore culpa
          ipsum.
        </p>
        <p>
          Sit amet illo cupiditate nam vitae tenetur nobis. Ut vel quaerat
          cupiditate itaque alias. Exercitationem ipsam quam rem exercitationem
          ut sunt a nemo, harum, aspernatur quod? Cupiditate inventore culpa
          ipsum.
        </p>
        <p>
          Sit amet illo cupiditate nam vitae tenetur nobis. Ut vel quaerat
          cupiditate itaque alias. Exercitationem ipsam quam rem exercitationem
          ut sunt a nemo, harum, aspernatur quod? Cupiditate inventore culpa
          ipsum.
        </p>
        <p>
          Sit amet illo cupiditate nam vitae tenetur nobis. Ut vel quaerat
          cupiditate itaque alias. Exercitationem ipsam quam rem exercitationem
          ut sunt a nemo, harum, aspernatur quod? Cupiditate inventore culpa
          ipsum.
        </p>
        <p>
          Sit amet illo cupiditate nam vitae tenetur nobis. Ut vel quaerat
          cupiditate itaque alias. Exercitationem ipsam quam rem exercitationem
          ut sunt a nemo, harum, aspernatur quod? Cupiditate inventore culpa
          ipsum.
        </p>
        <p>
          Sit amet illo cupiditate nam vitae tenetur nobis. Ut vel quaerat
          cupiditate itaque alias. Exercitationem ipsam quam rem exercitationem
          ut sunt a nemo, harum, aspernatur quod? Cupiditate inventore culpa
          ipsum.
        </p>
        <p>
          Sit amet illo cupiditate nam vitae tenetur nobis. Ut vel quaerat
          cupiditate itaque alias. Exercitationem ipsam quam rem exercitationem
          ut sunt a nemo, harum, aspernatur quod? Cupiditate inventore culpa
          ipsum.
        </p>
        <p>
          Sit amet illo cupiditate nam vitae tenetur nobis. Ut vel quaerat
          cupiditate itaque alias. Exercitationem ipsam quam rem exercitationem
          ut sunt a nemo, harum, aspernatur quod? Cupiditate inventore culpa
          ipsum.
        </p>
        <p>
          Sit amet illo cupiditate nam vitae tenetur nobis. Ut vel quaerat
          cupiditate itaque alias. Exercitationem ipsam quam rem exercitationem
          ut sunt a nemo, harum, aspernatur quod? Cupiditate inventore culpa
          ipsum.
        </p>
        <p>
          Sit amet illo cupiditate nam vitae tenetur nobis. Ut vel quaerat
          cupiditate itaque alias. Exercitationem ipsam quam rem exercitationem
          ut sunt a nemo, harum, aspernatur quod? Cupiditate inventore culpa
          ipsum.
        </p>
        <p>
          Sit amet illo cupiditate nam vitae tenetur nobis. Ut vel quaerat
          cupiditate itaque alias. Exercitationem ipsam quam rem exercitationem
          ut sunt a nemo, harum, aspernatur quod? Cupiditate inventore culpa
          ipsum.
        </p>
        <DatePicker errored style={{ width: '200px', float: 'right' }} />
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'))
