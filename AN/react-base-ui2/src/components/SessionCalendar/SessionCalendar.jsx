import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import classNames from 'classnames';
import Calendar from '../Calendar';

import SessionCalendarRow from './SessionCalendarRow';
import SessionCalendarAction from './SessionCalendarAction';

import { DefaultCSSPrefix } from '../../consts';

const SessionCalendarPropTypes = {
  prefixCls: PropTypes.string,
  /**
   * class names which were applied to component container div.
   */
  className: PropTypes.string,
  /**
   * session date object array determine which month could be displayed.
   */
  sessionDates: PropTypes.arrayOf(
    PropTypes.shape({
      date: PropTypes.instanceOf(moment),
      waiting: PropTypes.bool
    })
  ),
  /**
   * selected session date array determine which date were selected.
   */
  selectedDates: PropTypes.arrayOf(PropTypes.instanceOf(moment)),
  /**
   * today determines which day is today.
   */
  today: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.instanceOf(Date)
  ]),
  /**
   * current date determines the default display date of session calendar.
   */
  currentDate: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.instanceOf(Date)
  ]),
  /**
   * next determines the next month button active state.
   */
  next: PropTypes.bool,
  /**
   * previous determines the previous month button active state.
   */
  previous: PropTypes.bool,
  /**
   * disable expired determines the day before today would be rendered as disabled.
   */
  disableExpired: PropTypes.bool,
  /**
   * expires dates before today.
   */
  expiresBeforeToday: PropTypes.bool,
  /**
   * disabled future unavailable determines the day after the last session date would be rendered
   * as disabled.
   */
  disableFutureUnavailable: PropTypes.bool,
  /**
   * customize action is a react component node which would be rendered at the right side of
   * session calendar control actions.
   */
  customizeAction: PropTypes.node,
  /**
   * the handler function which would be triggered when previous button were clicked.
   */
  onPrevBtnClick: PropTypes.func,
  /**
   * the handler function which would be triggered when next button were clicked.
   */
  onNextBtnClick: PropTypes.func,
  /**
   * the handler function which would be trigger when the row of week date were clicked.
   */
  onDateRowClick: PropTypes.func
};

const SessionCalendarDefaultPropTypes = {
  prefixCls: `${DefaultCSSPrefix}-sc`,
  sessionDates: [],
  selectedDates: [],
  today: new Date(),
  currentDate: new Date(),
  disableExpired: true,
  disableFutureUnavailable: true,
  expiresBeforeToday: false
};

export default class SessionCalendar extends React.Component {
  static displayName = 'SessionCalendar';
  static propTypes = SessionCalendarPropTypes;
  static defaultProps = SessionCalendarDefaultPropTypes;

  constructor(props) {
    super(props);

    const { currentDate, today } = props;
    this.state = {
      currentDate: moment(currentDate),
      today: moment(today)
    };

    this.dateViewRender = this.dateViewRender.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const { currentDate, today } = nextProps;
    const nextState = {};
    if (currentDate !== this.props.currentDate) {
      nextState.currentDate = moment(currentDate);
    }
    if (today !== this.props.today) {
      nextState.today = moment(today);
    }
    this.setState(nextState);
  }

  getSessionLastDay(dates) {
    return dates.length
      ? dates.reduce((acc, cur) => (acc.date.isAfter(cur.date) ? acc : cur)).date
      : null;
  }

  getSessionFirstDay(dates, today, expiresBeforeToday) {
    const sessionFirstDay = dates.length
      ? dates.reduce((acc, cur) => (acc.date.isBefore(cur.date) ? acc : cur)).date
      : null;
    return sessionFirstDay && (
      (!expiresBeforeToday || sessionFirstDay.isAfter(today))
        ? sessionFirstDay
        : today
    );
  }

  dateViewRender(data) {
    const {
      prefixCls, sessionDates, selectedDates, disableExpired, disableFutureUnavailable,
      onDateRowClick, expiresBeforeToday
    } = this.props;
    const { today } = this.state;
    const sessionLastDay = this.getSessionLastDay(sessionDates);
    const sessionFirstDay = this.getSessionFirstDay(sessionDates, today, expiresBeforeToday);
    return data.map((rowDates) => {
      const rowFirstDay = rowDates[0];
      const rowLastDay = rowDates[rowDates.length - 1];
      const rowSessionDates = sessionDates.filter(({ date }) => date.isBetween(rowFirstDay, rowLastDay, 'day', '[]'));
      const rowSelectedDates = selectedDates.filter(date => date.isBetween(rowFirstDay, rowLastDay, 'day', '[]'));
      const notInSession = rowSessionDates.length === 0;
      const sessionExpired = disableExpired && !rowSessionDates.some(({ date }) => date.isSameOrAfter(sessionFirstDay, 'day'));
      const rowDisabled = notInSession || sessionExpired;
      return (
        <SessionCalendarRow
          key={`sc-row-${rowFirstDay.valueOf()}`}
          prefixCls={prefixCls}
          rowDates={rowDates}
          rowSessionDates={rowSessionDates}
          rowSelectedDates={rowSelectedDates}
          rowDisabled={rowDisabled}
          today={today}
          sessionLastDay={sessionLastDay}
          sessionFirstDay={sessionFirstDay}
          disableExpired={disableExpired}
          disableFutureUnavailable={disableFutureUnavailable}
          onDateRowClick={onDateRowClick}
        />
      );
    });
  }

  render() {
    const { currentDate, today } = this.state;
    const {
      prefixCls, className, previous, next, customizeAction,
      onPrevBtnClick, onNextBtnClick
    } = this.props;
    return (
      <div className={classNames(prefixCls, className)}>
        <SessionCalendarAction
          prefixCls={prefixCls}
          currentDate={currentDate}
          previous={previous}
          next={next}
          customizeAction={customizeAction}
          onPrevBtnClick={onPrevBtnClick}
          onNextBtnClick={onNextBtnClick}
        />
        <Calendar
          {...this.props}
          className={`${prefixCls}-body`}
          displayHeader={false}
          dateViewRender={this.dateViewRender}
          value={[currentDate]}
          today={today}
        />
      </div>
    );
  }

}
