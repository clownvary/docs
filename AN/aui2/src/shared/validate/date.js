import { momentHelper } from 'react-base-ui/lib/utils';
import DateTimeFormat from 'shared/utils/DateTimeFormat';

export function dateFormat(value, msg, monthDayFormat) {
  if (value === '') return '';

  let result = '';
  const date = DateTimeFormat.parseDate(value);
  if (monthDayFormat) {
    result = DateTimeFormat.formatDate(date, 'MMM DD');
  } else {
    result = DateTimeFormat.formatDate(date);
  }
  return result;
}

export default function validDate(value, msg) {
  if (value === '') return '';

  const date = DateTimeFormat.parseDate(value);
  if (!date.isValid()) {
    return `${msg} is invalid.`;
  }

  const momentMin = momentHelper.createMoment(new Date(1900, 0, 1));
  const momentMax = DateTimeFormat.getServerToday().add(50, 'year');

  if (date < momentMin) {
    return `${msg} is too old (earlier than 1900).`;
  }
  if (date > momentMax) {
    return `${msg} is too far in the future (more than fifty years).`;
  }

  return '';
}
