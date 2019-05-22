import moment from 'moment';
import isString from 'lodash/isString';

const isSame = (momentA, momentB) => {
  if (!momentA && !momentB) {
    return true;
  }

  if ((momentA && !momentB) || (!momentA && momentB)) {
    return false;
  }

  const a = moment(momentA);
  const b = moment(momentB);
  return a.isSame(b);
};

const isInRange = (momentValue, momentMin, momentMax) => {
  const value = momentValue ? moment(momentValue) : null;

  if (!value || !value.isValid()) return false;

  const min = momentMin ? moment(momentMin) : null;
  if (min && min.isValid()) {
    if (value.isBefore(min)) {
      return false;
    }
  }

  const max = momentMax ? moment(momentMax) : null;
  if (max && max.isValid()) {
    if (value.isAfter(max)) {
      return false;
    }
  }

  return true;
};

const isValid = (momentValue) => {
  const value = momentValue ? moment(momentValue) : null;
  return value && value.isValid();
};

const isSameTime = (timeA, timeB, format = 'HH:mm:ss') => {
  const defaultYear = '1970-01-01';
  const defaultYearFormat = 'YYYY-MM-DD';
  const defaultTimeFormat = 'HH:mm:ss';

  if (moment.isMoment(timeA) && moment.isMoment(timeB)) {
    return timeA.format(defaultTimeFormat) === timeB.format(defaultTimeFormat);
  }

  if (isString(timeA) && isString(timeB)) {
    if (timeA === timeB) {
      return true;
    }

    const momentTimeA = moment(`${defaultYear} ${timeA}`, `${defaultYearFormat} ${format}`);
    const momentTimeB = moment(`${defaultYear} ${timeB}`, `${defaultYearFormat} ${format}`);

    return momentTimeA.format(defaultTimeFormat) === momentTimeB.format(defaultTimeFormat);
  }

  return false;
};

const createMoment = (value) => {
  if (value) {
    const val = moment(value);

    if (val.isValid()) {
      return val;
    }
  }

  return null;
};

export default {
  isSame,
  isInRange,
  isValid,
  createMoment,
  isSameTime
};
