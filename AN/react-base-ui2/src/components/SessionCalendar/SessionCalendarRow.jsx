import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { listenKeyDown } from '../../utils';
import { KeyCode } from '../../consts';
import SessionCalendarDateCell from './SessionCalendarDateCell';

const SessionCalendarRowPropTypes = {
  prefixCls: PropTypes.string,
  rowDates: PropTypes.array,
  rowSessionDates: PropTypes.arrayOf(
    PropTypes.shape({
      date: PropTypes.instanceOf(moment),
      waiting: PropTypes.bool
    })
  ),
  rowSelectedDates: PropTypes.arrayOf(PropTypes.instanceOf(moment)),
  rowDisabled: PropTypes.bool,
  today: PropTypes.instanceOf(moment),
  sessionLastDay: PropTypes.instanceOf(moment),
  disableExpired: PropTypes.bool,
  disableFutureUnavailable: PropTypes.bool,
  onDateRowClick: PropTypes.func
};

const SessionCalendarRowDefaultProps = {
  rowSessionDates: [],
  rowSelectedDates: [],
  disableExpired: true,
  disableFutureUnavailable: true
};

class SessionCalendarRow extends Component {
  static propTypes = SessionCalendarRowPropTypes;
  static defaultProps = SessionCalendarRowDefaultProps;

  renderRowDates() {
    const {
      prefixCls, rowDates, rowSessionDates, rowDisabled, today, rowSelectedDates,
      disableExpired, disableFutureUnavailable, sessionFirstDay, sessionLastDay
    } = this.props;
    const count = rowDates.length;
    const rowProps = rowDates.map((date) => {
      const isToday = date.isSame(today, 'day');
      const waiting = rowSessionDates.some(sessionDate => sessionDate.waiting && date.isSame(sessionDate.date, 'day'));
      const selected = rowSelectedDates.some(selectedDate => date.isSame(selectedDate, 'day'));
      const expired = disableExpired && date.isBefore(sessionFirstDay, 'day');
      const futureUnavailable = disableFutureUnavailable && date.isAfter(sessionLastDay, 'day');
      return {
        today: isToday,
        disabled: rowDisabled || expired || futureUnavailable,
        waiting,
        selected
      };
    });

    return rowDates.map((rowDate, index) => {
      const rowProp = rowProps[index];
      const prevRowProp = rowProps[index - 1];
      const selectionStart = index === 0 || rowProp.waiting !== prevRowProp.waiting ||
        (!rowProp.disabled && prevRowProp.disabled);
      const nextRowProp = rowProps[index + 1];
      const selectionEnd = index === count - 1 || rowProp.waiting !== nextRowProp.waiting ||
        (!rowProp.disabled && nextRowProp.disabled);
      return (
        <SessionCalendarDateCell
          key={`sc-day-${rowDate.valueOf()}`}
          prefixCls={prefixCls}
          rowDate={rowDate}
          selectionStart={selectionStart}
          selectionEnd={selectionEnd}
          {...rowProp}
        />
      );
    });
  }

  render() {
    const {
      rowDates, rowSessionDates, rowDisabled, onDateRowClick
    } = this.props;
    const tabIndex = rowDisabled ? '' : '0';
    return (
      <tr
        tabIndex={tabIndex}
        onClick={e => rowDisabled || onDateRowClick(e, rowDates, rowSessionDates)}
        onKeyDown={e => listenKeyDown(e, [KeyCode.ENTER, KeyCode.SPACE],
          () => onDateRowClick(e, rowDates, rowSessionDates))}
      >
        {this.renderRowDates()}
      </tr>
    );
  }
}

export default SessionCalendarRow;
