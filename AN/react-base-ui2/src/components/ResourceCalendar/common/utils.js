import moment from 'moment';
import times from 'lodash/times';

export const getDaysInMonth = (date) => {
  const daysInMonth = [];

  let monthDate = moment(date).startOf('month');
  times(monthDate.daysInMonth(), () => {
    daysInMonth.push(monthDate);
    monthDate = monthDate.clone().add(1, 'd');
  });

  return daysInMonth;
};

export const dateIntersect = (date, start, end) => {
  const dateStart = moment(date).startOf('day');
  const dateEnd = moment(date).endOf('day');

  if (start.isSameOrBefore(dateEnd) && end.isSameOrAfter(dateStart)) {
    return {
      start: moment.max(dateStart, start).clone(),
      end: moment.min(dateEnd, end).clone()
    };
  }

  return null;
};

export const getEndOfDay = (date, exclusiveMode) => {
  const end = date.clone().endOf('day');
  if (exclusiveMode) {
    return end.add(1, 'ms');
  }
  return end;
};

export const DATE_KEY_FORMAT = 'YYYY-MM-DD';
export const getDateKey = date => date.format(DATE_KEY_FORMAT);
export const toDate = key => moment(key, DATE_KEY_FORMAT);

export const getDateText = (date, format = 'DD ddd') => date.format(format);
