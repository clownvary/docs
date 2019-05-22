import React from 'react';
import PropTypes from 'prop-types';
import CX from 'classnames';
import moment from 'moment';

import { Globalize } from '../../services/i18n';
import { KeyCode } from '../../consts';
import { listenKeyDown } from '../../utils';

const ROW = 3;
const COL = 4;
const YearViewPropTypes = {
  config: PropTypes.shape({
    prefix: PropTypes.string.isRequired,
    currentDate: PropTypes.instanceOf(moment),
    value: PropTypes.arrayOf(PropTypes.instanceOf(moment))
  }),
  onYearClick: PropTypes.func.isRequired
};

class YearView extends React.PureComponent {
  static displayName = 'YearView';
  static propTypes = YearViewPropTypes;

  getYears(currentDate) {
    const currentYear = currentDate.year();

    const firstYear = currentYear - (currentYear % 10) - 1;

    const rows = [];
    let cols;
    let pass = 0;
    for (let iIndex = 0; iIndex < ROW; iIndex += 1) {
      cols = [];
      for (let jIndex = 0; jIndex < COL; jIndex += 1) {
        cols.push({
          year: firstYear + pass,
          index: pass,
          title: firstYear + pass
        });
        pass += 1;
      }
      rows.push(cols);
    }

    return rows;
  }

  renderCell(cell) {
    const {
      config: {
        prefix,
        today,
        value
      },
      onYearClick
    } = this.props;
    const { index, year, title } = cell;
    const isSelected = value && value.some(v => year === v.year());
    const isCurrentYear = year === today.year();

    return (
      <td key={`td_${index}`}>
        <div
          key={`div_${index}`}
          className={CX(
          `${prefix}calendar-table-cell`,
          `${prefix}calendar-year`,
          { [`${prefix}calendar-year-first`]: index === 0 },
          { [`${prefix}calendar-year-last`]: index === (ROW * COL) - 1 },
          { [`${prefix}calendar-year-current`]: isCurrentYear },
          { [`${prefix}calendar-year-selected`]: isSelected },
          { [`${prefix}calendar-year-disable`]: false })}
          onClick={() => onYearClick(year)}
          tabIndex={0}
          onKeyDown={e => listenKeyDown(e,
            [KeyCode.ENTER, KeyCode.SPACE],
            () => onYearClick(year))
          }
        >
          {title}
        </div>
      </td>
    );
  }

  render() {
    const {
      config: {
        prefix,
        currentDate = Globalize.getToday()
      }
    } = this.props;
    const years = this.getYears(currentDate);
    return (
      <table className={`${prefix}calendar-table`}>
        <tbody>
          {years.map((row, rowIndex) => (
            <tr key={`tr${rowIndex}`} className={`${prefix}calendar-table-row`}>
              {row.map((col => this.renderCell(col)))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

export default YearView;

