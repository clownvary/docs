import moment from 'moment';
import DateTimeFormat from 'shared/utils/DateTimeFormat';
import Globalize from 'react-base-ui/lib/services/i18n';
import { deepMerge } from 'shared/utils/func';

export function isRangeCovered(rangeStart, rangeEnd, start, end) {
  return !(rangeStart.isAfter(end) || rangeEnd.isBefore(start));
}

export function checkRangeBookingOverlap(a, b) {
  return !(a.rangeStartTime.isSameOrAfter(b.rangeEndTime) ||
    a.rangeEndTime.isSameOrBefore(b.rangeStartTime));
}

export function compareRangeIndexBooking(a, b) {
  // compare by start time > duration > index
  if (a.rangeBooking.rangeStartTime.isSame(b.rangeBooking.rangeStartTime)) {
    if (a.rangeBooking.rangeDiff === b.rangeBooking.rangeDiff) {
      return a.index <= b.index ? a : b;
    }
    return a.rangeBooking.rangeDiff > b.rangeBooking.rangeDiff ? a : b;
  }
  return a.rangeBooking.rangeStartTime.isBefore(b.rangeBooking.rangeStartTime) ? a : b;
}

export function selectAllRangeIndexBooking(rangeIndexBookings, rangeStartTime) {
  let result;
  rangeIndexBookings.forEach((booking) => {
    if (!rangeStartTime || booking.rangeBooking.rangeStartTime.isSameOrAfter(rangeStartTime)) {
      // compare with previous available range booking
      result = result ? compareRangeIndexBooking(booking, result) : booking;
    }
  });

  if (result) {
    const resultRangeBooking = result.rangeBooking;
    const nextAvailableRangeBookings =
      selectAllRangeIndexBooking(rangeIndexBookings, resultRangeBooking.rangeEndTime);
    nextAvailableRangeBookings.unshift(resultRangeBooking);
    return nextAvailableRangeBookings;
  }
  return [];
}

const RU = 'reservationUnit';
const RUValidate = {
  [`${RU}1`](resource, startDateTime, endDateTime) { // minute
    const start = startDateTime;
    let end = endDateTime;
    const startEventDate = DateTimeFormat.formatDate(start);
    let endEventDate = DateTimeFormat.formatDate(end);
    const startEventTime = DateTimeFormat.formatTime(start);
    let endEventTime = DateTimeFormat.formatTime(end);
    let minimum = resource.minimumTime;
    let maximum = resource.maximumTime;
    let timeslot = end.diff(start, 'minutes');

    if (timeslot < 0) {
      end = end.add(1, 'days');
      endEventDate = DateTimeFormat.formatDate(end);
      endEventTime = DateTimeFormat.formatTime(end);
      timeslot = end.diff(start, 'minutes');
    }

    minimum && (minimum = Math.ceil(minimum / 15) * 15);
    maximum && (maximum = Math.floor(maximum / 15) * 15);
    if (minimum && timeslot < minimum) {
      end = start.clone().add(minimum, 'minutes');
      endEventDate = DateTimeFormat.formatDate(end);
      endEventTime = DateTimeFormat.formatTime(end);
    }

    if (maximum && timeslot > maximum) {
      end = start.clone().add(maximum, 'minutes');
      endEventDate = DateTimeFormat.formatDate(end);
      endEventTime = DateTimeFormat.formatTime(end);
    }

    return Object.assign({}, resource, {
      startEventDate,
      endEventDate,
      startEventTime,
      endEventTime
    });
  },

  [`${RU}2`](resource, startDateTime, endDateTime) { // hour
    const start = startDateTime;
    let end = endDateTime;
    const startEventDate = DateTimeFormat.formatDate(start);
    let endEventDate = '';
    const startEventTime = DateTimeFormat.formatTime(start.set('minute', 0));
    let endEventTime = '';
    const minimum = resource.minimumTime;
    const maximum = resource.maximumTime;
    let timeslot = '';

    end = end.minutes() ? end.set('minute', 0).add(1, 'hours') : end;
    endEventDate = DateTimeFormat.formatDate(end);
    timeslot = end.diff(start, 'hours');
    endEventTime = DateTimeFormat.formatTime(end);

    if (timeslot < 0) {
      end = end.add(1, 'days');
      endEventDate = DateTimeFormat.formatDate(end);
      endEventTime = DateTimeFormat.formatTime(end);
      timeslot = end.diff(start, 'hours');
    }

    if (minimum && timeslot < minimum) {
      end = start.clone().add(minimum, 'hours');
      endEventDate = DateTimeFormat.formatDate(end);
      endEventTime = DateTimeFormat.formatTime(end);
    }

    if (maximum && timeslot > maximum) {
      end = start.clone().add(maximum, 'hours');
      endEventDate = DateTimeFormat.formatDate(end);
      endEventTime = DateTimeFormat.formatTime(end);
    }

    return Object.assign({}, resource, {
      startEventDate,
      endEventDate,
      startEventTime,
      endEventTime
    });
  },

  [`${RU}3`](resource, startDateTime, endDateTime) { // day
    const start = startDateTime;
    const end = endDateTime;
    const startEventDate = DateTimeFormat.formatDate(start);
    let endEventDate = '';
    const startEventTime = DateTimeFormat.formatTime(moment('000', 'hmm'));
    const endEventTime = startEventTime;
    const minimum = resource.minimumTime;
    const maximum = resource.maximumTime;
    let timeslot = end.diff(start, 'days') + 1;

    if (timeslot > 1 && start.clone().startOf('day').toLocaleString() === start.toLocaleString() && end.clone().startOf('day').toLocaleString() === end.toLocaleString()) {
      timeslot -= 1;
    }

    endEventDate = DateTimeFormat.formatDate(start.clone().add(timeslot, 'days'));

    if (minimum && timeslot < minimum) {
      endEventDate = DateTimeFormat.formatDate(start.add(minimum, 'days'));
    }

    if (maximum && timeslot > maximum) {
      endEventDate = DateTimeFormat.formatDate(start.add(maximum, 'days'));
    }

    return Object.assign({}, resource, {
      startEventDate,
      endEventDate,
      startEventTime,
      endEventTime
    });
  },

  [`${RU}4`](resource, startDateTime, endDateTime) { // week
    const systemDateTimeFormat = Globalize.ANDateTimeFormat;
    const startDay = resource.weeklyReservationStartOn - 1;// Sun is 1,Satur is 7
    moment.updateLocale('en', { week: { dow: startDay } });
    const start = moment(startDateTime.format(systemDateTimeFormat), systemDateTimeFormat);
    const end = moment(endDateTime.format(systemDateTimeFormat), systemDateTimeFormat);
    const isBeginOfTheDay = end.diff(end.clone().startOf('day'), 'ms') === 0;

    start.startOf('day');
    end.startOf('day');
    const startWeekDate = start.clone().startOf('week');
    const startEventDate = DateTimeFormat.formatDate(startWeekDate);
    const endWeekDate = (isBeginOfTheDay ? end.clone().subtract(1, 'ms') : end.clone()).endOf('week').add(1, 'days');
    let endEventDate = DateTimeFormat.formatDate(endWeekDate);
    const startEventTime = DateTimeFormat.formatTime(moment('000', 'hmm'));
    const endEventTime = startEventTime;
    const minimum = resource.minimumTime;
    const maximum = resource.maximumTime;
    const timeslot = endWeekDate.diff(startWeekDate, 'weeks');

    if (minimum && timeslot < minimum) {
      endEventDate = DateTimeFormat.formatDate(startWeekDate.add(minimum, 'weeks'));
    }

    if (maximum && timeslot > maximum) {
      endEventDate = DateTimeFormat.formatDate(startWeekDate.add(maximum, 'weeks'));
    }

    return Object.assign({}, resource, {
      startEventDate,
      endEventDate,
      startEventTime,
      endEventTime
    });
  },

  [`${RU}5`](resource, startDateTime, endDateTime) { // month
    const start = startDateTime;
    const end = endDateTime;
    const startMonthDate = start.startOf('month');
    const startEventDate = DateTimeFormat.formatDate(startMonthDate);
    const endMonthDate = end.add(-1, 'seconds').endOf('month').add(1, 'days');
    let endEventDate = DateTimeFormat.formatDate(endMonthDate);
    const startEventTime = DateTimeFormat.formatTime(moment('000', 'hmm'));
    const endEventTime = startEventTime;
    const minimum = resource.minimumTime;
    const maximum = resource.maximumTime;
    const timeslot = endMonthDate.diff(startMonthDate, 'months');

    if (minimum && timeslot < minimum) {
      endEventDate = DateTimeFormat.formatDate(startMonthDate.add(minimum, 'months'));
    }

    if (maximum && timeslot > maximum) {
      endEventDate = DateTimeFormat.formatDate(startMonthDate.add(maximum, 'months'));
    }

    return Object.assign({}, resource, {
      startEventDate,
      endEventDate,
      startEventTime,
      endEventTime
    });
  },

  [`${RU}6`](resource, startDateTime, endDateTime) { // defined_date_range
    const start = startDateTime;
    const end = endDateTime;
    const bookings = [];
    const definedDateRange = resource.definedDateRange;
    const cloneData = deepMerge([], definedDateRange);
    const isBeginOfTheDay = end.diff(end.clone().startOf('day'), 'ms') === 0;

    start.startOf('day').set('minute', 1);
    isBeginOfTheDay ? end.add('-1', 'd') : end.startOf('day');
    cloneData.forEach((data) => {
      const item = data;
      const rangeArr = item.name.split('to');
      const rangeStart = DateTimeFormat.parseDate(rangeArr[0]).startOf('day');
      const rangeEnd = DateTimeFormat.parseDate(rangeArr[1]).endOf('day');
      const isInRange = isRangeCovered(rangeStart, rangeEnd, start, end);
      item.rangeStart = rangeStart;
      item.rangeEnd = rangeEnd;

      if (isInRange) {
        bookings.push(deepMerge({}, resource, {
          dateRangeID: item.id,
          dateRangeName: item.name
        }));
      }
    });
    if (!bookings.length) {
      let closestId = 0;
      let closestName = '';
      let closestDiff = null;
      cloneData.forEach((item) => {
        const diffStartHour = Math.abs(item.rangeStart.diff(start, 'hours'));
        const diffEndHour = Math.abs(item.rangeEnd.diff(start, 'hours'));
        const minDiff = Math.min(diffStartHour, diffEndHour);
        closestDiff == null && (closestDiff = minDiff);
        if (minDiff <= closestDiff) {
          closestId = item.id;
          closestName = item.name;
          closestDiff = minDiff;
        }
      });

      bookings.push(deepMerge({}, resource, {
        dateRangeID: closestId,
        dateRangeName: closestName
      }));
    }

    return bookings;
  },

  [`${RU}7`](resource, startDateTime, endDateTime) { // rental_block
    const start = startDateTime;
    const end = endDateTime;
    const bookings = [];
    const rentalBlock = resource.rentalBlock || [];
    const rangeBookings = [];

    // it must use the moment to transfer the start and end,
    // because we need the moment api 'isRangeCovered',
    // or they may be inconsist and calculate wrong result.
    const startTime = DateTimeFormat.parseTime(DateTimeFormat.formatTime(start));
    let endTime = DateTimeFormat.parseTime(DateTimeFormat.formatTime(end));
    const selectedDays = end.diff(start, 'days');

    if (selectedDays > 0) {
      endTime = DateTimeFormat.parseTime(DateTimeFormat.formatTime(start.clone().endOf('day')));
    }
    rentalBlock.forEach((data) => {
      const item = data;
      const rangeArr = item.name.split('to');
      const rangeStartTime = DateTimeFormat.parseTime(rangeArr[0]);
      const rangeEndTime = DateTimeFormat.parseTime(rangeArr[1]);
      const isInRange = isRangeCovered(rangeStartTime, rangeEndTime, startTime, endTime);
      item.rangeStartTime = rangeStartTime;
      item.rangeEndTime = rangeEndTime;
      if (isInRange) {
        item.rangeDiff = item.rangeEndTime.diff(item.rangeStartTime, 'minutes');
        rangeBookings.push(item);
      }
    });

    if (rangeBookings.length) {
      const afterRangeStartBookings = rangeBookings.filter(booking =>
        booking.rangeStartTime.isSameOrAfter(startTime));
      const hasAfterStartRangeBooking = afterRangeStartBookings.length > 0;
      const nominationRangeBookings = hasAfterStartRangeBooking ?
        afterRangeStartBookings : rangeBookings;

      const overlapIndexBookings = [];
      nominationRangeBookings.forEach((rangeBooking, index) => {
        for (let i = index + 1; i < nominationRangeBookings.length; i += 1) {
          const nextRangeBooking = nominationRangeBookings[i];
          const overlap = checkRangeBookingOverlap(rangeBooking, nextRangeBooking);
          if (overlap) {
            !overlapIndexBookings.some(booking => booking.index === index) &&
            overlapIndexBookings.push({
              rangeBooking,
              index
            });
            !overlapIndexBookings.some(booking => booking.index === i) &&
            overlapIndexBookings.push({
              rangeBooking: nextRangeBooking,
              index: i
            });
          }
        }
      });

      const notOverlapBookings = nominationRangeBookings.filter((booking, index) =>
        !overlapIndexBookings.some(indexBooking => indexBooking.index === index));
      notOverlapBookings.forEach((booking) => {
        bookings.push(deepMerge({}, resource, {
          startEventDate: DateTimeFormat.formatDate(start),
          rentalBlockID: booking.id,
          rentalBlockName: booking.name
        }));
      });

      const selectedOverlapBookings = selectAllRangeIndexBooking(overlapIndexBookings);
      selectedOverlapBookings.forEach((booking) => {
        bookings.push(deepMerge({}, resource, {
          startEventDate: DateTimeFormat.formatDate(start),
          rentalBlockID: booking.id,
          rentalBlockName: booking.name
        }));
      });

      if (hasAfterStartRangeBooking) {
        const beforeRangeStartBookings = rangeBookings.filter(booking =>
          startTime.isAfter(booking.rangeStartTime));
        if (beforeRangeStartBookings.length > 0) {
          // get earliest after range start booking
          const highestPriorityInRangeBooking = notOverlapBookings.concat(selectedOverlapBookings)
            .reduce((result, booking) =>
              (result.rangeStartTime.isBefore(booking.rangeStartTime) ? result : booking));

          let beforeRangeStartBooking;
          beforeRangeStartBookings.forEach((rangeBooking, index) => {
            const overlap = checkRangeBookingOverlap(rangeBooking, highestPriorityInRangeBooking);
            if (!overlap) {
              if (beforeRangeStartBooking) {
                beforeRangeStartBooking = beforeRangeStartBooking ?
                  compareRangeIndexBooking(beforeRangeStartBooking, {
                    rangeBooking,
                    index
                  }) : rangeBooking;
              } else {
                beforeRangeStartBooking = {
                  rangeBooking,
                  index
                };
              }
            }
          });
          beforeRangeStartBooking && bookings.push(deepMerge({}, resource, {
            startEventDate: DateTimeFormat.formatDate(start),
            rentalBlockID: beforeRangeStartBooking.rangeBooking.id,
            rentalBlockName: beforeRangeStartBooking.rangeBooking.name
          }));
        }
      }
    }

    if (!bookings.length) {
      let closestId = 0;
      let closestDiff = null;
      let closestName = '';
      rentalBlock.forEach((item) => {
        const diffStartMinutes = Math.abs(item.rangeStartTime.diff(startTime, 'minutes'));
        const diffEndMinutes = Math.abs(item.rangeEndTime.diff(startTime, 'minutes'));
        const minDiff = Math.min(diffStartMinutes, diffEndMinutes);
        closestDiff == null && (closestDiff = minDiff);
        if (minDiff <= closestDiff) {
          closestId = item.id;
          closestDiff = minDiff;
          closestName = item.name;
        }
      });
      bookings.push(deepMerge({}, resource, {
        startEventDate: DateTimeFormat.formatDate(start),
        rentalBlockID: closestId,
        rentalBlockName: closestName
      }));
    }

    // For multiple days of month view
    const bookingsForSingleDay = [...bookings];
    for (let i = 2; i <= selectedDays; i += 1) {
      bookings.push(...bookingsForSingleDay.map(booking => deepMerge(
        {},
        booking,
        {
          startEventDate: DateTimeFormat.formatDate(start.clone().add(i - 1, 'days'))
        }
      )));
    }

    return bookings;
  },

  [`${RU}8`](resource, start, end) { // overnight
    const startEventDate = DateTimeFormat.formatDate(start);
    let endEventDate = '';
    const checkInTime = resource.defaultCheckinTime; // system format,but null when no input.
    const checkOutTime = resource.defaultCheckoutTime;
    const startEventTime = checkInTime || DateTimeFormat.formatTime(moment('000', 'hmm'));
    const endEventTime = checkOutTime || DateTimeFormat.formatTime(moment('000', 'hmm'));

    const minimum = resource.minimumTime;
    const maximum = resource.maximumTime;
    let timeslot = end.diff(start, 'days') + 1;

    if (timeslot > 1 && start.clone().startOf('day').toLocaleString() === start.toLocaleString() && end.clone().startOf('day').toLocaleString() === end.toLocaleString()) {
      timeslot -= 1;
    }

    endEventDate = DateTimeFormat.formatDate(start.clone().add(timeslot, 'days'));

    if (minimum && timeslot < minimum) {
      endEventDate = DateTimeFormat.formatDate(start.add(minimum, 'days'));
    }

    if (maximum && timeslot > maximum) {
      endEventDate = DateTimeFormat.formatDate(start.add(maximum, 'days'));
    }

    return Object.assign({}, resource, {
      startEventDate,
      endEventDate,
      startEventTime,
      endEventTime
    });
  }
};

function validateBookingByTimeslot(booking) {
  const resource = booking.resource;
  const start = booking.start;
  const end = booking.end;
  const reservationUnit = resource.reservationPeriodUnit;

  return RUValidate[RU + reservationUnit](resource, start, end);
}

export default function validateBookingsByTimeslot(bookings, callback) {
  let finalBookings = [];

  bookings.forEach((booking) => {
    const validatedBookingInfo = validateBookingByTimeslot(booking);
    finalBookings = finalBookings.concat(validatedBookingInfo);
  });

  if (callback && typeof callback === 'function') {
    callback(finalBookings);
  }

  return finalBookings;
}
