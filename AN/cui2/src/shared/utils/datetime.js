import moment from 'moment';
import Globalize from 'react-base-ui/lib/services/i18n';

const SYS_DATE_FORMAT_MAP = {
  0: 'MMM D, YYYY',
  1: 'D MMM YYYY',
  2: 'YYYY MMM D'
};

const SYS_TIME_FORMAT_MAP = {
  0: 'h:mm A',
  1: 'H:mm'
};

function getDateFormatById(formatId) {
  return SYS_DATE_FORMAT_MAP[formatId] || SYS_DATE_FORMAT_MAP[0];
}

function getTimeFormatById(formatId) {
  return SYS_TIME_FORMAT_MAP[formatId] || SYS_TIME_FORMAT_MAP[0];
}

function getDateTimeFormatsById(dateFormatId = 0, timeFormatId = 0) {
  const dateFormat = getDateFormatById(dateFormatId)
  const timeFormat = getTimeFormatById(timeFormatId)

  return {
    dateFormat,
    timeFormat
  }
}

export default {
  getDateTimeFormatsById
}
