import moment from 'moment';
import isArray from 'lodash/isArray';
import uniqWith from 'lodash/uniqWith';

const getTenYearRange = (mmomentDate) => {
  const year = mmomentDate.year();
  const begin = year - (year % 10);
  const end = begin + 9;
  return `${begin}-${end}`;
};

const getWeeks = (currentDate, firstDayOfWeek) => {
  const now = currentDate.clone();
  const veryShortWeekdays = [];
  const weekDays = [];
  const localeData = currentDate.localeData();
  for (let dateColIndex = 0; dateColIndex < 7; dateColIndex += 1) {
    const index = (firstDayOfWeek + dateColIndex) % 7;
    now.day(index);
    weekDays[dateColIndex] = localeData.weekdays(now);
    veryShortWeekdays[dateColIndex] = weekDays[dateColIndex].substring(0, 1);
  }

  return { veryShortWeekdays, weekDays };
};

const compareByFormat = (date1, date2, format) =>
  date1.format(format) === date2.format(format);

const getSafeValue = (value) => {
  if (!isArray(value)) {
    value = [value];
  }
  const safeValue = value.map(v => v && moment(v)).filter(v => v && v.isValid());

  return uniqWith(safeValue, (m1, m2) => m1.isSame(m2, 'day'));
};

const sortedDates = value => (value.map(d => d.clone())
  .sort((a, b) => {
    if (a.isAfter(b, 'day')) {
      return 1;
    }
    if (a.isBefore(b, 'day')) {
      return -1;
    }
    return 0;
  }));

export default {
  getTenYearRange,
  getWeeks,
  compareByFormat,
  getSafeValue,
  sortedDates
};
