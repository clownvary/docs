import React from 'react';
import classNames from 'classnames';
import isFunction from 'lodash/isFunction';

class Header extends React.PureComponent {
  onDateHeaderClick(e, date) {
    e.stopPropagation();

    const { onDateHeaderClick } = this.props;
    if (isFunction(onDateHeaderClick)) {
      onDateHeaderClick(e, date);
    }
  }

  renderCell(date) {
    const { dateFormat = 'DD ddd', currentDate, onDateHeaderClick } = this.props;
    const isToday = currentDate ? currentDate.isSame(date.value, 'day') : false;
    const isWeekend = (date.value.day() === 0 || date.value.day() === 6);
    const isSunday = date.value.day() === 0;
    const classes = classNames(
      'grid-cell an-rc-date-header',
      {
        today: isToday,
        weekend: isWeekend,
        'is-sunday': isSunday
      });
    /* istanbul ignore next */
    const text = date ? date.value.format(dateFormat) : '';
    return (
      <th
        className={classes}
        key={`header_${date.key}`}
      >
        <span
          className={classNames({ 'an-rc-clickable': isFunction(onDateHeaderClick) })}
          onClick={e => this.onDateHeaderClick(e, date.value)}
        >
          {isToday ? 'Today' : text}
        </span>
      </th>
    );
  }

  render() {
    const { dates = [] } = this.props;
    return (
      <table className="an-rc-grid an-rc-grid-header">
        <thead>
          <tr className="grid-row">
            {
              dates.map(date => this.renderCell(date))
            }
          </tr>
        </thead>
      </table>
    );
  }
}

export default Header;
