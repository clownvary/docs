import DateTimeFormat from 'shared/utils/DateTimeFormat';
import { RECURRING_TYPES } from '../consts/recurringPattern';

const RECURRING_TYPES_DESC = {
  [RECURRING_TYPES.Daily]: 'Daily',
  [RECURRING_TYPES.Weekly]: 'Weekly',
  [RECURRING_TYPES.Monthly]: 'Monthly',
  [RECURRING_TYPES.OnSelectedDates]: 'Selected Dates'
};

export const weekOfMonth = m => Math.ceil(m.date() / 7);

/* eslint-disable no-confusing-arrow */
export const getBookingID = (booking) => {
  if (booking.get) {
    return (booking.get('pendingID') && booking.get('pendingID') !== -1)
      ? booking.get('pendingID')
      : booking.get('resourceBookingID');
  }

  return (booking.pendingID && booking.pendingID !== -1)
    ? booking.pendingID
    : booking.resourceBookingID;
};
/* eslint-enable no-confusing-arrow */

export const toExceptionDates = (booking) => {
  const f = 'MM/DD/YYYY';
  return `${DateTimeFormat.formatDate(booking.startEventDate, f)}_${DateTimeFormat.formatDate(booking.endEventDate, f)}`;
};

export const getRecurringPatternDesc = (baseBooking, recurringBookings) => {
  const recurringPattern = baseBooking.get('recurringPattern');
  const recurringBookingsCount = ((recurringBookings && recurringBookings.size) || 0) + 1;
  const recurringPatternType = recurringPattern.get('type');
  const startDate = DateTimeFormat.formatDate(baseBooking.get('startEventDate'));

  return `${RECURRING_TYPES_DESC[recurringPatternType]}, ${recurringBookingsCount} times, from ${startDate}`;
};

