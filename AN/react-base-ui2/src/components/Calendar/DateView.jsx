import React from 'react';
import PropTypes from 'prop-types';
import CX from 'classnames';
import moment from 'moment';

import { Globalize } from '../../services/i18n';
import { KeyCode } from '../../consts';
import { listenKeyDown } from '../../utils';
import { SelectionMode, DateFormat, ViewMode } from './consts';
import { getWeeks, compareByFormat } from './utils';

const ROW = 6;
const COL = 7;
const DateViewPropTypes = {
  config: PropTypes.shape({
    prefix: PropTypes.string.isRequired,
    currentDate: PropTypes.instanceOf(moment),
    firstDayofWeek: PropTypes.number,
    min: PropTypes.instanceOf(moment),
    max: PropTypes.instanceOf(moment),
    disabledDates: PropTypes.arrayOf(PropTypes.instanceOf(moment)),
    value: PropTypes.arrayOf(PropTypes.instanceOf(moment)),
    selectMode: PropTypes.oneOf(
      [SelectionMode.SINGLE, SelectionMode.MULTIPLE])
  }),
  onDateClick: PropTypes.func.isRequired
};

class DateView extends React.PureComponent {
  static displayName = 'DateView';
  static propTypes = DateViewPropTypes;

  getHeaders(currentDate) {
    const now = Globalize.getToday();
    const veryShortWeekdays = [];
    const weekDays = [];
    const localeData = currentDate.localeData();
    for (let dateColIndex = 0; dateColIndex < COL; dateColIndex += 1) {
      const index = (this.props.config.firstDayOfWeek + dateColIndex) % COL;
      now.day(index);
      weekDays[dateColIndex] = localeData.weekdays(now);
      veryShortWeekdays[dateColIndex] = weekDays[dateColIndex].substring(0, 1);
    }

    return { veryShortWeekdays, weekDays };
  }

  // return the array filled with date
  getDates(currentDate) {
    const cd = moment(currentDate);
    const tcd = cd.clone().date(1);
    const dateTable = [];
    let current;

    const lastMonthDiffDay = ((tcd.day() + 7) - this.props.config.firstDayOfWeek) % 7;
    tcd.add(0 - lastMonthDiffDay, 'days');

    let passed = 0;
    for (let iIndex = 0; iIndex < ROW; iIndex += 1) {
      for (let jIndex = 0; jIndex < COL; jIndex += 1) {
        current = tcd;
        if (passed) {
          current = current.clone();
          current.add(passed, 'days');
        }
        dateTable.push(current);
        passed += 1;
      }
    }

    return dateTable;
  }

  getDateTable(currentDate) {
    const dates = this.getDates(currentDate);
    const rows = [];
    let row = [];
    let pass = 0;
    for (let iIndex = 0; iIndex < ROW; iIndex += 1) {
      row = [];
      for (let jIndex = 0; jIndex < COL; jIndex += 1) {
        row.push(dates[pass]);
        pass += 1;
      }
      rows.push(row);
    }

    return rows;
  }

  renderDate(date) {
    const {
      config: {
        prefix,
      today,
      currentDate = Globalize.getToday(),
      value,
      disabledDates,
      min,
      max
      },
      onDateClick
    } = this.props;

    const isOutOfRange = (min && date.isBefore(min, 'day')) ||
      (max && date.isAfter(max, 'day'));
    const isOtherMonth = date.month() !== currentDate.month();
    const isWeekend = date.weekday() === 0 || date.weekday() === 6;
    const isSelected = value && value.some(v => compareByFormat(v, date, DateFormat.MMDDYYYY));
    const isToday = compareByFormat(today, date, DateFormat.MMDDYYYY);
    const isDisable = isOutOfRange || (disabledDates && disabledDates.some(d =>
      compareByFormat(moment(d), date, DateFormat.MMDDYYYY)));

    return (
      <td key={`td_${date}`}>
        <div
          key={`div_${date}`}
          className={CX(
            `${prefix}calendar-table-cell`,
            `${prefix}calendar-day`,
            { [`${prefix}calendar-day-today`]: isToday },
            { [`${prefix}calendar-day-othermonth`]: isOtherMonth && !isDisable },
            { [`${prefix}calendar-day-weekend`]: isWeekend },
            { [`${prefix}calendar-day-selected`]: isSelected },
            { [`${prefix}calendar-day-disable`]: isDisable },
          )}
          onClick={() => onDateClick(date)}
          tabIndex={0}
          onKeyDown={e => listenKeyDown(e, [KeyCode.ENTER, KeyCode.SPACE], () => onDateClick(date))}
        >
          {date.format('D')}
        </div>
      </td>
    );
  }

  componentDidUpdate() {
    const { config: { prevViewMode } } = this.props;
    if (prevViewMode === ViewMode.MONTHVIEW) {
      const tds = this.dateViewTable.querySelectorAll('td');
      tds.length > 0 && tds[0].firstChild && tds[0].firstChild.focus();
    }
  }

  render() {
    const {
      config: {
        currentDate = Globalize.getToday(),
        prefix,
        firstDayOfWeek
      },
      dateViewRender
    } = this.props;
    const dtTable = this.getDateTable(currentDate);
    const heads = getWeeks(currentDate, firstDayOfWeek);
    return (
      <table
        className={`${prefix}calendar-table`}
        ref={(table) => { this.dateViewTable = table; }}
      >
        <tbody>
          <tr className={`${prefix}calendar-table-header`}>
            {heads.veryShortWeekdays.map((head, index) => (
              <th key={`th${index}`} className={`${prefix}calendar-table-header-cell`} title={heads.weekDays[index]}>
                {head}
              </th>
            ))}
          </tr>
          {
            dateViewRender ?
            dateViewRender(dtTable) :
            dtTable.map((row, index) => (
              <tr key={`td${index}`} className={`${prefix}calendar-table-row`}>
                {row.map(col => this.renderDate(col))}
              </tr>
            ))
          }
        </tbody>
      </table>
    );
  }
}

export default DateView;
