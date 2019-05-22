import React from 'react';
import moment from 'moment';
import SessionCalendar from 'src/components/SessionCalendar';
import Button from 'src/components/Button';
import SessionCalendarMD from 'doc/api/components/SessionCalendar/SessionCalendar.md';
import DemoPage from '../../App/components/DemoPage';
import pickProps from '../../App/utils/pickProps';
import initSettings from './initSettings';

import './index.less';

const sessionDates = [
  { date: moment('2018-10-01'), waiting: false },
  { date: moment('2018-11-01'), waiting: false },
  { date: moment('2018-11-24'), waiting: true },
  { date: moment('2018-11-25'), waiting: true },
  { date: moment('2018-11-30'), waiting: false },
  { date: moment('2018-12-01'), waiting: false },
  { date: moment('2018-12-04'), waiting: false },
  { date: moment('2018-12-05'), waiting: false },
  { date: moment('2018-12-06'), waiting: false },
  { date: moment('2018-12-24'), waiting: true },
  { date: moment('2018-12-25'), waiting: true },
  { date: moment('2018-12-26'), waiting: false },
  { date: moment('2018-12-27'), waiting: false },
  { date: moment('2018-12-28'), waiting: false },
  { date: moment('2019-01-01'), waiting: false },
  { date: moment('2019-01-02'), waiting: false },
  { date: moment('2019-01-03'), waiting: false },
  { date: moment('2019-01-04'), waiting: false },
  { date: moment('2019-01-11'), waiting: false },
  { date: moment('2019-01-12'), waiting: false },
  { date: moment('2019-01-13'), waiting: false },
  { date: moment('2019-01-14'), waiting: false },
  { date: moment('2019-01-15'), waiting: false },
  { date: moment('2019-01-16'), waiting: false },
  { date: moment('2019-01-17'), waiting: true },
  { date: moment('2019-01-18'), waiting: false },
  { date: moment('2019-01-19'), waiting: true },
  { date: moment('2019-01-20'), waiting: true },
  { date: moment('2019-01-21'), waiting: true },
  { date: moment('2019-01-22'), waiting: true },
  { date: moment('2019-01-23'), waiting: true },
  { date: moment('2019-01-24'), waiting: false },
  { date: moment('2019-01-25'), waiting: true },
  { date: moment('2019-01-26'), waiting: false },
  { date: moment('2019-01-28'), waiting: false },
  { date: moment('2019-01-31'), waiting: false },
  { date: moment('2019-03-01'), waiting: false },
  { date: moment('2019-03-02'), waiting: false },
  { date: moment('2019-03-03'), waiting: false },
  { date: moment('2019-03-04'), waiting: false }
];

const today = moment('2018-11-23');

export default class Page extends DemoPage {
  constructor(props) {
    super(props);

    const currentDate = moment('2018-11-23');

    const prevDate = this.getPrevMonthDate(currentDate);
    const nextDate = this.getNextMonthDate(currentDate);

    this.state = {
      ...this.state,
      currentDate,
      prevDate,
      nextDate,
      selectedDates: []
    };

    this.onPrevBtnClick = this.onPrevBtnClick.bind(this);
    this.onNextBtnClick = this.onNextBtnClick.bind(this);
    this.onDateRowClick = this.onDateRowClick.bind(this);
  }

  static meta = {
    name: 'Session Calendar',
    icon: 'icon-calendar',
    documents: [SessionCalendarMD],
    description: 'This example demonstrates the features of SessionCalendar.'
  }

  getInitSettings() {
    return initSettings;
  }

  getPrevMonthDate(currentDate) {
    let result = null;
    if (today.isBefore(currentDate, 'month')) {
      let previous = null;
      sessionDates.forEach(({ date }) => {
        if (!result &&
          currentDate.isSame(date, 'month') &&
          previous && previous.isSameOrAfter(today, 'month')) {
          result = currentDate.clone().year(previous.year()).month(previous.month());
        }
        previous = date;
      });
    }
    return result;
  }

  onPrevBtnClick() {
    const { currentDate, prevDate } = this.state;
    if (prevDate) {
      const prev = this.getPrevMonthDate(prevDate);
      this.setState({ currentDate: prevDate, prevDate: prev, nextDate: currentDate });
    }
  }

  getNextMonthDate(currentDate) {
    let result = null;
    sessionDates.forEach(({ date }) => {
      if (!result && currentDate.isBefore(date, 'month')) {
        result = currentDate.clone().year(date.year()).month(date.month());
      }
    });
    return result;
  }

  onNextBtnClick() {
    const { currentDate, nextDate } = this.state;
    if (nextDate) {
      const next = this.getNextMonthDate(nextDate);
      this.setState({ currentDate: nextDate, prevDate: currentDate, nextDate: next });
    }
  }

  onDateRowClick(e, rowDates) {
    const { selectedDates } = this.state;
    let nextSelectedDates = selectedDates.filter(selectedDate => !rowDates.some(date => date.isSame(selectedDate, 'day')));
    if (nextSelectedDates.length === selectedDates.length) {
      nextSelectedDates = nextSelectedDates.concat(rowDates);
    }
    this.setState({
      selectedDates: nextSelectedDates
    });
  }

  renderAllSelectionControl() {
    const { selectedDates } = this.state;
    return (
      <div className="customize-actions">
        <Button
          className="select-all-btn"
          type="primary"
          size="sm"
        >
          Select all
        </Button>
        <Button
          className="remove-all-btn"
          type="secondary"
          size="sm"
          disabled={selectedDates.length === 0}
          onClick={() => {
            this.setState({ selectedDates: [] });
          }}
        >
          Remove all
        </Button>
      </div>
    );
  }

  renderContent() {
    const { settings, currentDate, prevDate, nextDate, selectedDates } = this.state;
    const props = pickProps(settings, ['disableExpired', 'disableFutureUnavailable']);
    return (
      <SessionCalendar
        className="sc-sample"
        {...props}
        currentDate={currentDate.format('YYYY-MM-DD')}
        today={today.format('YYYY-MM-DD')}
        previous={!!prevDate}
        next={!!nextDate}
        sessionDates={sessionDates}
        selectedDates={selectedDates}
        onPrevBtnClick={this.onPrevBtnClick}
        onNextBtnClick={this.onNextBtnClick}
        onDateRowClick={this.onDateRowClick}
        customizeAction={this.renderAllSelectionControl()}
      />
    );
  }

}
