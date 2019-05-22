import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import moment from 'moment';
import { DateFormat } from '../Calendar/consts';

const SessionCalendarAction = (props) => {
  const {
    prefixCls, currentDate, previous, next, customizeAction,
    onPrevBtnClick, onNextBtnClick
  } = props;
  return (
    <div className={`${prefixCls}-action`}>
      <div className={`${prefixCls}-action__control`}>
        <button
          type="button"
          disabled={!previous}
          className={classNames(
            `${prefixCls}-action-btn`,
            {
              [`${prefixCls}-action-btn__disabled`]: !previous
            }
          )}
          onClick={e => onPrevBtnClick(e, currentDate)}
        >
          <i className="icon icon-chevron-left" />
        </button>
        <div className={`${prefixCls}-action-date`}>
          {currentDate.format(DateFormat.MMMYYYY)}
        </div>
        <button
          type="button"
          disabled={!next}
          className={classNames(
            `${prefixCls}-action-btn`,
            {
              [`${prefixCls}-action-btn__disabled`]: !next
            }
          )}
          onClick={e => onNextBtnClick(e, currentDate)}
        >
          <i className="icon icon-chevron-right" />
        </button>
      </div>
      {
        customizeAction &&
        <div className={`${prefixCls}-action-customize`}>
          {customizeAction}
        </div>
      }
    </div>
  );
};

SessionCalendarAction.propTypes = {
  prefixCls: PropTypes.string,
  currentDate: PropTypes.instanceOf(moment),
  previous: PropTypes.bool,
  next: PropTypes.bool,
  customizeAction: PropTypes.node,
  onPrevBtnClick: PropTypes.func,
  onNextBtnClick: PropTypes.func
};

export default SessionCalendarAction;
