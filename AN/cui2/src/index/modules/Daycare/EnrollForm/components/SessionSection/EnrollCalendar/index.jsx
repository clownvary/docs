import React from 'react';
import { injectIntl } from 'react-intl';
import moment from 'moment';
import Button from 'react-base-ui/lib/components/Button';
import Globalize from 'react-base-ui/lib/services/i18n';
import SessionCalendar from 'react-base-ui/lib/components/SessionCalendar';
import { withResponsiveProvider } from 'react-base-ui/lib/services/responsive';
import findIndex from 'lodash/findIndex';
import { Heading } from 'shared/components/Heading';
import { FormattedDyncMessage } from 'shared/translation/formatted';
import { formatI18n } from 'shared/translation/formatI18n';
import selfMessages from './translations';

import './index.less';

export class EnrollCalendar extends React.PureComponent {

  constructor(props) {
    super(props);

    const sessionDates = this.parseSessionDates(this.props.sessionDates);

    this.state = {
      ...this.buildDateStates(sessionDates),
      ...this.buildSelectionStates(
        this.props.selectedSessionDateIds.toJS(),
        sessionDates
      )
    };
  }

  componentWillReceiveProps(nextProps) {
    let newState = {};

    if (
      !nextProps.sessionDates.equals(this.props.sessionDates) ||
      nextProps.participantId !== this.props.participantId
    ) {
      newState = {
        ...newState,
        ...this.buildDateStates(this.parseSessionDates(nextProps.sessionDates))
      };
    }

    if (!nextProps.selectedSessionDateIds.equals(this.props.selectedSessionDateIds)) {
      const sessionDates = newState.sessionDates || this.state.sessionDates;
      newState = {
        ...newState,
        ...this.buildSelectionStates(nextProps.selectedSessionDateIds.toJS(), sessionDates)
      };
    }

    this.setState(newState);
  }

  onPrevBtnClick = () => {
    const { sessionDates, monthDates, currentDate, prevDate } = this.state;
    if (prevDate) {
      const prev = this.getPrevMonthDate(monthDates, prevDate);
      this.setState({
        currentDate: prevDate.toDate(),
        prevDate: prev,
        nextDate: moment(currentDate),
        sessionCount: this.getCurrentSessionCount(sessionDates, prevDate)
      });
    }
  }

  onNextBtnClick = () => {
    const { sessionDates, monthDates, currentDate, nextDate } = this.state;
    if (nextDate) {
      const next = this.getNextMonthDate(monthDates, nextDate);
      this.setState({
        currentDate: nextDate.toDate(),
        prevDate: moment(currentDate),
        nextDate: next,
        sessionCount: this.getCurrentSessionCount(sessionDates, nextDate)
      });
    }
  }

  onDateRowClick = (e, rowDates, rowSessionDates) => {
    const { selectedDates, selectedSessionDates, firstSessionDay, lastSessionDay } = this.state;
    let nextSelectedDates = selectedDates.filter(selectedDate => !rowDates.some(date => date.isSame(selectedDate, 'day')));

    if (nextSelectedDates.length === selectedDates.length) {
      nextSelectedDates = nextSelectedDates.concat(rowDates);
    }

    let validRowSessionDates = rowSessionDates;
    if (firstSessionDay) {
      validRowSessionDates = validRowSessionDates.filter(
        sessionDate => !sessionDate.date.isBefore(firstSessionDay, 'date'));
    }
    if (lastSessionDay) {
      validRowSessionDates = validRowSessionDates.filter(
        sessionDate => !sessionDate.date.isAfter(lastSessionDay, 'date'));
    }

    let nextSelectedSessionDates = selectedSessionDates.filter(
      sessionDate => !rowSessionDates.some(
        rowSessionDate => rowSessionDate.id === sessionDate.id));

    if (nextSelectedSessionDates.length === selectedSessionDates.length) {
      nextSelectedSessionDates = nextSelectedSessionDates.concat(validRowSessionDates);
    }

    this.setState({
      selectedDates: nextSelectedDates,
      selectedSessionDates: nextSelectedSessionDates
    }, this.setSelectedSessionDates);
  }

  setSelectedSessionDates = () => {
    const { onSelect } = this.props;
    const { selectedSessionDates } = this.state;
    onSelect(selectedSessionDates.map(sessionDate => sessionDate.id));
  }

  getLastSessionDay = dates => (
    dates.length
      ? dates.reduce((acc, cur) => (acc.date.isAfter(cur.date, 'date') ? acc : cur)).date
      : null
  );

  getFirstSessionDay = (dates, today, expiresBeforeToday = false) => {
    const sessionFirstDay = dates.length
      ? dates.reduce((acc, cur) => (acc.date.isBefore(cur.date, 'date') ? acc : cur)).date
      : null;
    return sessionFirstDay && (
      (!expiresBeforeToday || sessionFirstDay.isAfter(today, 'date'))
        ? sessionFirstDay
        : today
    );
  }

  getNextMonthDate = (monthDates, currentDate) => {
    const currentDateIndex = findIndex(monthDates, md => currentDate.isSame(md, 'day'));
    return currentDateIndex < monthDates.length - 1 ? monthDates[currentDateIndex + 1] : null;
  }

  getWeekdays = (date) => {
    const current = date.clone().startOf('week');
    const weekdays = [current];
    for (let i = 1; i < 7; i += 1) {
      weekdays.push(current.clone().add(i, 'days'));
    }
    return weekdays;
  }

  getPrevMonthDate = (monthDates, currentDate) => {
    const currentDateIndex = findIndex(monthDates, md => currentDate.isSame(md, 'day'));
    return currentDateIndex > 1 ? monthDates[currentDateIndex - 1] : null;
  }

  getCurrentSessionCount = (sessionDates, currentDate) => {
    const currentSessionDates = sessionDates.filter(({ date }) => date.isSame(currentDate, 'month'));
    const sessionIds = [];
    currentSessionDates.forEach(({ sessionId }) => {
      sessionIds.indexOf(sessionId) < 0 && sessionIds.push(sessionId);
    });
    return sessionIds.length;
  }

  getCalendarDates = (date) => {
    const firstDayOfMonth = moment(date).clone().date(1);
    const firstDayOfWeek = firstDayOfMonth.localeData().firstDayOfWeek();
    const lastMonthTailDays = ((firstDayOfMonth.day() + 7) - firstDayOfWeek) % 7;
    const firstDayOnCalendar = firstDayOfMonth.subtract(lastMonthTailDays, 'days');
    const lastDayOnCalendar = firstDayOnCalendar.clone().add(41, 'days');
    return {
      first: firstDayOnCalendar,
      last: lastDayOnCalendar
    };
  }

  getMonthDates = (sessionDates) => {
    const firstSessionDate = sessionDates[0].date;
    const lastSessionDate = sessionDates[sessionDates.length - 1].date;
    const monthDates = [];
    sessionDates.forEach(({ date }) => {
      const monthDate = date.clone().date(1);
      if (!monthDates.some(md => monthDate.isSame(md, 'day'))) {
        monthDates.push(monthDate);
      }
    });

    monthDates.sort((a, b) => a - b);

    if (this.isInCalendar(firstSessionDate, firstSessionDate.clone().add(1, 'month')) && monthDates.length > 1) {
      monthDates.shift();
    }

    if (this.isInCalendar(lastSessionDate, lastSessionDate.clone().subtract(1, 'month')) && monthDates.length > 1) {
      monthDates.pop();
    }

    return monthDates;
  }

  buildDateStates = (sessionDates) => {
    const today = new Date();
    const monthDates = this.getMonthDates(sessionDates);
    const currentDate = monthDates.length ? monthDates[0] : new Date();

    return {
      today,
      currentDate,
      sessionDates,
      monthDates,
      prevDate: this.getPrevMonthDate(monthDates, currentDate),
      nextDate: this.getNextMonthDate(monthDates, currentDate),
      firstSessionDay: this.getFirstSessionDay(sessionDates, moment(today)),
      lastSessionDay: this.getLastSessionDay(sessionDates),
      sessionCount: this.getCurrentSessionCount(sessionDates, currentDate)
    };
  }

  isInCalendar = (date, calendarDate) => {
    const { first, last } = this.getCalendarDates(calendarDate);
    return date.isBetween(first, last, 'date', '[]');
  }

  isContainedBy = collection => ({ id }) => collection.indexOf(id) > -1;

  buildSelectionStates = (selectedSessionDateIds, sessionDates) => {
    const selectedSessionDates =
      sessionDates.filter(this.isContainedBy(selectedSessionDateIds));

    let selectedDates = [];

    selectedSessionDates.forEach((sessionDate) => {
      const weekdays = this.getWeekdays(sessionDate.date);
      if (!selectedDates.some(date => weekdays.some(weekday => weekday.isSame(date, 'day')))) {
        selectedDates = selectedDates.concat(weekdays);
      }
    });

    return {
      selectedDates,
      selectedSessionDates
    };
  }

  parseSessionDates = sessionDates =>
    sessionDates.toJS().map(({
      dc_session_date_id,
      session_date,
      dc_session_id
    }) => ({
      id: dc_session_date_id,
      date: Globalize.parseDate(session_date),
      sessionId: dc_session_id
    }));

  selectCurrentMonth = () => {
    const { selectedSessionDates, sessionDates, currentDate } = this.state;
    const { first, last } = this.getCalendarDates(currentDate);
    const selectedSessionDateIds = this.props.selectedSessionDateIds.toJS();
    const currentMonthSessionDates = sessionDates.filter(({ date }) => date.isBetween(first, last, 'date', '[]'));
    const nextSelectedSessionDates = [].concat(selectedSessionDates);
    currentMonthSessionDates.forEach((sessionDate) => {
      if (selectedSessionDateIds.indexOf(sessionDate.id) < 0) {
        nextSelectedSessionDates.push(sessionDate);
      }
    });
    this.setState({ selectedSessionDates: nextSelectedSessionDates }, this.setSelectedSessionDates);
  }

  cleanCurrentMonth = () => {
    const { selectedSessionDates, currentDate } = this.state;
    const { first, last } = this.getCalendarDates(currentDate);
    const nextSelectedSessionDates = selectedSessionDates.filter(({ date }) => !date.isBetween(first, last, 'date', '[]'));
    this.setState({ selectedSessionDates: nextSelectedSessionDates }, this.setSelectedSessionDates);
  }

  renderAllSelectionControl() {
    const { intl: { messages }, responsive: { isSm } } = this.props;
    const { selectedDates } = this.state;
    return (
      <div className="customize-actions">
        <Button
          className="select-all-btn"
          type="primary"
          size={isSm ? 'md' : 'sm'}
          onClick={this.selectCurrentMonth}
        >
          {formatI18n(messages[selfMessages.selectAll.id])}
        </Button>
        <Button
          className="remove-all-btn"
          type="secondary"
          size={isSm ? 'md' : 'sm'}
          disabled={selectedDates.length === 0}
          onClick={this.cleanCurrentMonth}
        >
          {formatI18n(messages[selfMessages.removeAll.id])}
        </Button>
      </div>
    );
  }

  render() {
    const { intl: { messages }, selectedSessionDateIds } = this.props;
    const sessionsInMonth = formatI18n(messages[selfMessages.sessionsInMonth.id], {
      count: this.state.sessionCount
    });

    return (
      <div className="enroll-calendar-container">
        <SessionCalendar
          className="enroll-calendar"
          today={this.state.today}
          currentDate={this.state.currentDate}
          previous={!!this.state.prevDate}
          next={!!this.state.nextDate}
          sessionDates={this.state.sessionDates}
          selectedDates={this.state.selectedDates}
          onPrevBtnClick={this.onPrevBtnClick}
          onNextBtnClick={this.onNextBtnClick}
          onDateRowClick={this.onDateRowClick}
          customizeAction={this.renderAllSelectionControl()}
        />
        { selectedSessionDateIds.size === 0 &&
          <Heading level={4} className="sessions-in-month">
            <FormattedDyncMessage value={sessionsInMonth} />
          </Heading>
        }
      </div>
    );
  }
}

export default withResponsiveProvider(injectIntl(EnrollCalendar));
