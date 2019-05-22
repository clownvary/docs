import React from 'react';
import PropTypes from 'prop-types';
import CX from 'classnames';
import moment from 'moment';

import { KeyCode } from '../../consts';
import { listenKeyDown } from '../../utils';
import { DateFormat, ViewMode } from './consts';
import { compareByFormat } from './utils';

const ROW = 3;
const COL = 4;
const MonthViewPropTypes = {
  config: PropTypes.shape({
    prefix: PropTypes.string.isRequired,
    currentDate: PropTypes.instanceOf(moment).isRequired,
    value: PropTypes.arrayOf(PropTypes.instanceOf(moment))
  }),
  onMonthClick: PropTypes.func.isRequired
};

class MonthView extends React.PureComponent {
  static displayName = 'MonthView';
  static propTypes = MonthViewPropTypes;

  getMonthName(month) {
    const localeData = month.localeData();
    return localeData.monthsShort(month);
  }

  months() {
    const { config: { currentDate } } = this.props;
    const current = currentDate.clone();
    const months = [];
    let index = 0;
    for (let rowIndex = 0; rowIndex < ROW; rowIndex += 1) {
      months[rowIndex] = [];
      for (let colIndex = 0; colIndex < COL; colIndex += 1) {
        current.month(index);
        const content = this.getMonthName(current);
        months[rowIndex][colIndex] = {
          index,
          month: current.clone(),
          title: content
        };
        index += 1;
      }
    }
    return months;
  }

  renderCell(cell) {
    const { config: { value, today, prefix }, onMonthClick } = this.props;
    const { index, month, title } = cell;
    const isSelected = value && value.some(v => compareByFormat(v, month, DateFormat.MMMYYYY));
    const isCurrentMonth = compareByFormat(month, today, DateFormat.MMMYYYY);

    return (
      <td key={`td_${index}`}>
        <div
          key={`div_${index}`}
          className={CX(
            `${this.props.prefix}calendar-table-cell`,
            `${prefix}calendar-month`,
            { [`${prefix}calendar-month-current`]: isCurrentMonth },
            { [`${prefix}calendar-month-selected`]: isSelected },
            { [`${prefix}calendar-month-disable`]: false },
          )}
          onClick={() => onMonthClick(month)}
          tabIndex={0}
          onKeyDown={e => listenKeyDown(e,
            [KeyCode.ENTER, KeyCode.SPACE],
            () => onMonthClick(month))
          }
        >
          {title}
        </div>
      </td>
    );
  }

  renderRow(cells, rowIndex) {
    return (
      <tr key={`tr${rowIndex}`} className={`${this.props.config.prefix}calendar-row`}>
        {
          cells && cells.map(cell => this.renderCell(cell))
        }
      </tr>
    );
  }

  componentDidUpdate() {
    const { config: { prevViewMode } } = this.props;
    if (prevViewMode === ViewMode.YEARVIEW) {
      const tds = this.monthViewTable.querySelectorAll('td');
      tds.length > 0 && tds[0].firstChild && tds[0].firstChild.focus();
    }
  }


  render() {
    const months = this.months();

    return (
      <table
        className={`${this.props.config.prefix}calendar-table`}
        ref={(table) => { this.monthViewTable = table; }}
      >
        <tbody>
          {months.map((row, rowIndex) => this.renderRow(row, rowIndex))}
        </tbody>
      </table>
    );
  }
}

export default MonthView;
