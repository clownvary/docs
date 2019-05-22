import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import moment from 'moment';

const SessionCalendarDateCell = (props) => {
  const {
    prefixCls, rowDate, today, disabled, waiting, selected,
    selectionStart, selectionEnd
  } = props;
  return (
    <td
      className={classNames(
        `${prefixCls}-day`,
        {
          [`${prefixCls}-day__today`]: today,
          [`${prefixCls}-day__disabled`]: disabled,
          [`${prefixCls}-day__waiting`]: waiting,
          [`${prefixCls}-day__selected`]: selected,
          [`${prefixCls}-day__block-start`]: selectionStart,
          [`${prefixCls}-day__block-end`]: selectionEnd
        })}
    >
      <div>
        {rowDate.format('D')}
      </div>
    </td>
  );
};

SessionCalendarDateCell.propTypes = {
  prefixCls: PropTypes.string,
  rowDate: PropTypes.instanceOf(moment),
  today: PropTypes.bool,
  disabled: PropTypes.bool,
  waiting: PropTypes.bool,
  selected: PropTypes.bool,
  selectionStart: PropTypes.bool,
  selectionEnd: PropTypes.bool
};

export default SessionCalendarDateCell;
