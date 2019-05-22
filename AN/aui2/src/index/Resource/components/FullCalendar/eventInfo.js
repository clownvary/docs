import moment from 'moment';
import isArray from 'lodash/isArray';
import DateTimeFormat from 'shared/utils/DateTimeFormat';
import decodeHtmlStr from 'react-base-ui/lib/utils/decodeHtmlStr';
import Globalize from 'react-base-ui/lib/services/i18n';

function getStartDateTime(startDate) {
  const m = DateTimeFormat.parseDate(startDate);
  return DateTimeFormat.formatDateTime(m.startOf('day'));
}

function getEndDateTime(endDate) {
  const m = DateTimeFormat.parseDate(endDate);
  return DateTimeFormat.formatDateTime(m.endOf('day').add(1, 'ms'));
}

function isAllDayHandler(start, end) {
  let isAllDay = false;

  if (DateTimeFormat.parseDateTime(end).diff(DateTimeFormat.parseDateTime(start), 'hour') >= 24
    && DateTimeFormat.parseDateTime(start).format('H:mm') === '0:00') {
    isAllDay = true;
  }

  return isAllDay;
}

export function isShowInfoHandler(event, selectedDate) {
  let isShowInfo = false;

  if (event.type === 'closed') {
    isShowInfo = event.end.diff(event.start, 'minutes') >= 30;
  } else {
    const isSkipType = event.type === 'skip';

    const startDateData = isSkipType ? event.startDate : event.startScheduleDate;
    const startDateMoment = isSkipType && event.disregardYear && selectedDate ?
      DateTimeFormat.parseDate(startDateData).set('year', DateTimeFormat.parseDate(selectedDate).get('year')) :
      DateTimeFormat.parseDate(startDateData);
    const startDate = DateTimeFormat.formatDate(startDateMoment);

    const endDateData = isSkipType ? event.endDate : event.endScheduleDate;
    const endDate = DateTimeFormat.formatDate(endDateData);

    const startTime = isSkipType ? event.startTime : event.startEventTime;
    const endTime = isSkipType ? event.endTime : event.endEventTime;

    if (startDate === endDate) {
      if (startTime && endTime) {
        isShowInfo = DateTimeFormat.parseTime(endTime).diff(DateTimeFormat.parseTime(startTime), 'minutes') >= 30;
      } else {
        isShowInfo = false;
      }
    } else if (selectedDate === startDate && startTime) {
      isShowInfo = moment('24:00', 'H:mm').diff(DateTimeFormat.parseTime(startTime), 'minutes') >= 30;
    } else if (selectedDate === endDate && endTime) {
      isShowInfo = DateTimeFormat.parseTime(endTime).diff(moment('0:00', 'H:mm'), 'minutes') >= 30;
    } else {
      isShowInfo = true;
    }
  }

  return isShowInfo;
}

export function getPrepTimeSetPadding(prepTime,
  startDate, startTime, endDate, endTime, direnction) {
  let diffTime = 0;

  if (DateTimeFormat.parseDate(endDate).diff(DateTimeFormat.parseDate(startDate), 'days') === 0) {
    diffTime = DateTimeFormat.parseTime(endTime).diff(DateTimeFormat.parseTime(startTime), 'minutes');
  } else if (direnction === 'top') {
    diffTime = moment('24:00', 'HH:mm').diff(DateTimeFormat.parseTime(startTime), 'minutes');
  } else if (direnction === 'bottom') {
    diffTime = DateTimeFormat.parseTime(endTime).diff(moment('00:00', 'HH:mm'), 'minutes');
  }

  return prepTime / diffTime;
}

const hasDuration = ({ startEventDate, startEventTime, endEventDate, endEventTime }) =>
  `${startEventDate} ${startEventTime}` !== `${endEventDate} ${endEventTime}`;

const isBetween = ({ selectedDateMoment, startEventDate, endEventDate }, mode) =>
  selectedDateMoment.isBetween(startEventDate, endEventDate, mode, '[]');

function setupSkipEvent(event, datetimes, isMonthView) {
  const { selectedDate, startEventDate, startEventTime, endEventDate, endEventTime } = datetimes;

  if (startEventDate === endEventDate) {
    event.start = `${startEventDate} ${startEventTime}`;
    event.end = `${endEventDate} ${endEventTime}`;
    event.isAllDay = isAllDayHandler(event.start, event.end);
  } else if (selectedDate === startEventDate) {
    event.start = `${startEventDate} ${startEventTime}`;
    event.end = isMonthView ? `${endEventDate} ${endEventTime}` : getEndDateTime(endEventDate);
    event.isAllDay = isAllDayHandler(event.start, getEndDateTime(selectedDate));
  } else if (selectedDate === endEventDate) {
    event.start = getStartDateTime(startEventDate);
    event.end = `${endEventDate} ${endEventTime}`;
    event.isAllDay = isAllDayHandler(getStartDateTime(endEventDate), event.end);
  } else {
    event.start = isMonthView ? `${startEventDate} ${startEventTime}` : getStartDateTime(selectedDate);
    event.end = isMonthView ? `${endEventDate} ${endEventTime}` : getEndDateTime(selectedDate);
    event.isAllDay = true;
  }

  return event;
}

export function getSkipEvents(skips = [], resourceID, selectedDate, isMonthView = false) {
  const skipEvents = [];
  const skipDatetimes = [];
  const mSelDate = DateTimeFormat.parseDate(selectedDate);
  const year = mSelDate.get('year');

  if (skips.length) {
    skips.forEach((skip) => {
      if (isMonthView && moment(skip.startDate).date() !== moment(selectedDate).date()) {
        return;
      }
      const startEventDateMoment = DateTimeFormat.parseDate(skip.startDate);
      const endEventDateMoment = DateTimeFormat.parseDate(skip.endDate);
      const startEventDateOfSelectedYear = startEventDateMoment.clone().set('year', year);
      const endEventDateOfSelectedYear = endEventDateMoment.clone().set('year', year);

      const datetimes = {
        selectedDate,
        selectedDateMoment: mSelDate,
        startEventTime: DateTimeFormat.formatTime(skip.startTime),
        endEventTime: DateTimeFormat.formatTime(skip.endTime),
        startEventDate: DateTimeFormat.formatDate(startEventDateMoment),
        endEventDate: DateTimeFormat.formatDate(endEventDateMoment)
      };

      if (skip.disregardYear) {
        // skip every year
        if (endEventDateMoment.diff(startEventDateMoment, 'years') >= 1) {
          // skip duration over 1 year
          skipDatetimes.push({
            skip,
            datetimes: {
              ...datetimes,
              startEventDate: DateTimeFormat.formatDate(mSelDate.clone().startOf('year')),
              endEventDate: DateTimeFormat.formatDate(mSelDate.clone().endOf('year'))
            }
          });
        } else if (startEventDateOfSelectedYear > endEventDateOfSelectedYear) {
          // skip startDate > endDate when adjust them into the same year
          // split skip dates to two pieces: 1. year begin -> endDate 2. startDate -> year end
          [
            [mSelDate.clone().startOf('year'), endEventDateOfSelectedYear],
            [startEventDateOfSelectedYear, mSelDate.clone().add(1, 'year').startOf('year')]
          ].forEach(([start, end]) => {
            skipDatetimes.push({
              skip,
              datetimes: {
                ...datetimes,
                startEventDate: DateTimeFormat.formatDate(start),
                endEventDate: DateTimeFormat.formatDate(end)
              }
            });
          });
        } else {
          // regular skips
          skipDatetimes.push({
            skip,
            datetimes: {
              ...datetimes,
              startEventDate: DateTimeFormat.formatDate(startEventDateOfSelectedYear),
              endEventDate: DateTimeFormat.formatDate(endEventDateOfSelectedYear)
            }
          });
        }
      } else {
        // skip for specified years and dates
        skipDatetimes.push({ skip, datetimes });
      }
    });

    skipDatetimes.forEach(({ skip, datetimes }, index) => {
      const { endDate, endTime, startDate, startTime } = skip;
      const event = {
        ...skip,
        id: `${resourceID}_skipTime_${index}`,
        eventName: decodeHtmlStr(skip.description),
        type: 'skip',
        end: `${endDate} ${endTime}`,
        start: `${startDate} ${startTime}`,
        resourceID
      };
      if (hasDuration(datetimes) && isBetween(datetimes, isMonthView ? 'month' : 'day')) {
        skipEvents.push(setupSkipEvent(event, datetimes, isMonthView));
      }
    });
  }

  return skipEvents;
}

export function getCloseEvent(closeTimes = [], resourceID, selectedDate, isMonthView) {
  let closeEvents = [];
  let date = selectedDate;
  if (isArray(closeTimes) && closeTimes.length) {
    closeEvents = closeTimes.map((closeTime, index) => {
      const closeEvent = {};
      if (isMonthView) {
        const dayOfMonth = closeTime.dayOfMonth;
        const tempDate = moment(date).date(dayOfMonth);
        date = DateTimeFormat.formatDate(tempDate);
      }

      closeEvent.type = 'closed';
      closeEvent.eventName = 'Closed';
      closeEvent.isAllDay = closeTime.closedAllDay;
      closeEvent.id = `${resourceID}_closeTime_${index}`;
      closeEvent.resourceID = resourceID;

      if (closeEvent.isAllDay) {
        closeEvent.start = getStartDateTime(date);
        closeEvent.end = getEndDateTime(date);
      } else {
        const startTime = DateTimeFormat.formatTime(closeTime.startTime, 'HH:mm') || '00:00';
        const endTime = DateTimeFormat.formatTime(closeTime.endTime, 'HH:mm') || '00:00';
        closeEvent.start = `${date} ${startTime}`;
        closeEvent.end = endTime === '00:00'
          ? getEndDateTime(date)
          : `${date} ${endTime}`;
      }

      return closeEvent;
    });
  }

  return closeEvents;
}

export function getCloseSkipEventHtml(event) {
  const timeStart = DateTimeFormat.formatTime(DateTimeFormat.parseDateTime(event.start));
  const timeEnd = DateTimeFormat.formatTime(DateTimeFormat.parseDateTime(event.end));

  return `${timeStart} - ${timeEnd}`;
}
export function getNoYearFormatHtml(event) {
  const skipDateFormat = Globalize.ANDateTimeFormat.replace(/Y+/g, '');
  const dateTimeStart = DateTimeFormat.formatDateTime(DateTimeFormat.parseDateTime(event.start),
    skipDateFormat);
  const dateTimeEnd = DateTimeFormat.formatDateTime(DateTimeFormat.parseDateTime(event.end),
    skipDateFormat);

  return `${dateTimeStart} - ${dateTimeEnd}`;
}

export function getDateTimeFormatString(event, isShowToday = false) {
  const startDate = DateTimeFormat.formatDate(event.startDate);
  const endDate = DateTimeFormat.formatDate(event.endDate);
  const startTime = DateTimeFormat.formatTime(event.startTime);
  const endTime = DateTimeFormat.formatTime(event.endTime);

  const todayDate = isShowToday ? startDate : '';
  const startTodayWeek = isShowToday ? event.startScheduleDay : '';
  const endTodayWeek = isShowToday ? event.endScheduleDay : '';

  let DateTime = '';
  if (event.startDate === event.endDate) {
    DateTime = `${startTodayWeek} ${todayDate} ${startTime} - ${endTime}`;
  } else {
    DateTime = `${startTodayWeek} ${startDate} ${startTime} - <br> ${endTodayWeek} ${endDate} ${endTime}`;
  }

  return DateTime;
}
