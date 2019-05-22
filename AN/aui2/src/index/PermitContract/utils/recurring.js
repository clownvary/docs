import { RECURRING_TYPES, ORDINAL_WEEK_OF_MONTH } from 'index/Resource/consts/recurringPattern';
import { weekOfMonth } from 'index/Resource/utils/recurring';
import DateTimeFormat from 'shared/utils/DateTimeFormat';

export const buildSummary = ({
  startDate,
  startTime,
  endDate,
  endTime,
  type,
  frequency,
  selectedDates,
  isDayOfMonth = false
}) => {
  let summary;

  if (type === RECURRING_TYPES.Daily) {
    if (frequency > 1) {
      summary = `Occurs every ${frequency} days effective ${startDate} until ${endDate} from ${startTime} to ${endTime}`;
    } else {
      summary = `Occurs every day effective ${startDate} until ${endDate} from ${startTime} to ${endTime}`;
    }
  } else if (type === RECURRING_TYPES.Weekly) {
    const weekday = DateTimeFormat.parseDate(startDate).format('dddd');
    if (frequency > 1) {
      summary = `Occurs every ${frequency} weeks on ${weekday} effective ${startDate} until ${endDate} from ${startTime} to ${endTime}`;
    } else {
      summary = `Occurs every ${weekday} effective ${startDate} until ${endDate} from ${startTime} to ${endTime}`;
    }
  } else if (type === RECURRING_TYPES.Monthly) {
    const monthlyStartDate = DateTimeFormat.parseDate(startDate);
    if (isDayOfMonth) {
      summary = `Occurs day ${monthlyStartDate.date()} of every ${frequency} month(s) effective ${startDate} until ${endDate} from ${startTime} to ${endTime}`;
    } else {
      const weekdayOfMonth = `${ORDINAL_WEEK_OF_MONTH[weekOfMonth(monthlyStartDate)]} ${monthlyStartDate.format('dddd')}`;
      summary = `Occurs the ${weekdayOfMonth} of every ${frequency} month(s) effective ${startDate} until ${endDate} from ${startTime} to ${endTime}`;
    }
  } else if (type === RECURRING_TYPES.OnSelectedDates) {
    summary = `Occurs on selected dates: ${selectedDates.join(', ')}`;
  }

  return summary;
};
