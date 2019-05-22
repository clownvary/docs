import moment from 'moment';
import isFunction from 'lodash/isFunction';
import isString from 'lodash/isString';
import Globalize from 'react-base-ui/lib/services/i18n';
import { momentHelper } from 'react-base-ui/lib/utils';

moment.suppressDeprecationWarnings = true;

const BO_DATE_TIME_FORMAT = 'MM/DD/YYYY h:mm A';

const SYS_DATE_FORMAT_MAP = {
  'DD/MM/YYYY': 'DD MMM YYYY',
  'MM/DD/YYYY': 'MMM DD, YYYY',
  'YYYY/MM/DD': 'YYYY MMM DD'
};

const SYS_TIME_FORMAT_MAP = {
  'h:mm a': 'h:mm A',
  'H:mm': 'H:mm'
};

function mapToDateFormat(format) {
  return SYS_DATE_FORMAT_MAP[format] || format;
}

function mapToTimeFormat(name) {
  return SYS_TIME_FORMAT_MAP[name] || name;
}

function getSystemDateTimeFormats({ dateFormat, timeFormat, timeZoneOffset } = {}) {
  const systemDateFormat = mapToDateFormat(dateFormat);
  const systemTimeFormat = mapToTimeFormat(timeFormat);
  const systemDateTimeFormat = `${systemDateFormat} ${systemTimeFormat}`;

  return {
    systemDateFormat,
    systemTimeFormat,
    systemDateTimeFormat,
    systemTimeZoneOffset: timeZoneOffset
  };
}

function parseDateTime(dateTime, format) {
  let m = moment(dateTime);
  if (!m.isValid()) {
    m = Globalize.parseDateTime(dateTime, format);
  }

  return m;
}

function formatDateTime(dateTime, format) {
  if (!dateTime) {
    return '';
  }

  if (isString(dateTime)) {
    dateTime = parseDateTime(dateTime, format);
  }

  return Globalize.formatDateTime(dateTime, format);
}

function parseDate(date, format) {
  let m = moment(date);
  if (!m.isValid()) {
    m = Globalize.parseDate(date, format);
  }

  return m;
}

function formatDate(date, format) {
  if (!date) {
    return '';
  }

  if (isString(date)) {
    date = parseDate(date, format);
  }

  return Globalize.formatDate(date, format);
}

function parseTime(time, format) {
  let m = moment(time, 'HH:mm a');
  if (!m.isValid()) {
    m = Globalize.parseTime(time, format);
  }

  return m;
}

function formatTime(time, format) {
  if (!time) {
    return '';
  }

  if (isString(time)) {
    time = parseTime(time, format);
  }

  return Globalize.formatTime(time, format);
}

function toString(dateTime) {
  return formatDateTime(dateTime, BO_DATE_TIME_FORMAT);
}

function fromString(dateTime) {
  let m = moment(dateTime, BO_DATE_TIME_FORMAT);
  if (!m.isValid()) {
    m = moment(dateTime);
  }

  return m;
}

function compose(date, time, specialHandler) {
  const dateTime = `${date} ${time}`;
  let m = moment(dateTime);
  if (!m.isValid()) {
    m = moment(dateTime, `${Globalize.ANDateFormat} h:mm A`);
    if (!m.isValid()) {
      m = moment(dateTime, BO_DATE_TIME_FORMAT);
      if (!m.isValid()) return '';
    }
  }

  if (isFunction(specialHandler)) {
    m = specialHandler(m);
  }

  return toString(m);
}

function getDayRange(date) {
  const m = parseDate(date);
  const dayStart = m.clone().startOf('day');
  const dayEnd = m.clone().endOf('day').add(1, 'ms');

  return { dayStart, dayEnd };
}

function getServerToday(timeZoneOffset) {
  return Globalize.getToday(timeZoneOffset);
}

function getServerTodayDate(timeZoneOffset) {
  const momentToday = getServerToday(timeZoneOffset);
  return momentToday.startOf('day').toDate();
}

function getFullServerTodayDate(timeZoneOffset) {
  const momentToday = getServerToday(timeZoneOffset);
  return momentToday.toDate();
}

function isInDefaultRange(date, minDate, maxDate) {
  const min = minDate || new Date(1900, 0, 1);
  const max = maxDate || getServerToday().endOf('day').add(50, 'year');
  return momentHelper.isInRange(date, min, max);
}

function getDateTimeDuration(start, end, measurement = 'minutes') {
  const parsedEnd = parseDateTime(end);
  const paredStart = parseDateTime(start);

  if (!paredStart.isValid() || !parsedEnd.isValid()) {
    return 0;
  }

  return parsedEnd.diff(paredStart, measurement);
}

function getWeekday(date, isCapitalize) {
  const weekday = formatDate(date, 'ddd');

  if (isCapitalize) {
    return weekday;
  }

  return weekday.toUpperCase();
}

export default {
  toString,
  fromString,
  compose,
  formatDateTime,
  parseDateTime,
  formatDate,
  parseDate,
  formatTime,
  parseTime,
  mapToDateFormat,
  mapToTimeFormat,
  getSystemDateTimeFormats,
  getDayRange,
  isInDefaultRange,
  getServerToday,
  getServerTodayDate,
  getFullServerTodayDate,
  getDateTimeDuration,
  getWeekday,
  BO_DATE_TIME_FORMAT
};
