import queryString from 'query-string';
import isUndefined from 'lodash/isUndefined';

import { formatDate, mapToDateFormat } from 'shared/utils/DateTimeFormat';

const globalState = {};

export const getQueryParams = () => queryString.parse(location.search);

export const setEntryPageIndex = () => {
  const queryParams = getQueryParams();

  // The entry page index that comes to the reservation detail page
  globalState.entryPageIndex = queryParams.entry_page_index;
};

/*  ---------------booking type from different entry page---------------  */
export const NEW_RESERVATION = 1;
export const EDIT_EXISTING_EVENT = 2;
export const EDIT_EXISTING_EVENT_WITH_NEW_RESOURCE = 3;
export const EDIT_NEW_ADDED_EVENT = 4;
export const ADD_EVENT = 5;
export const COPY_PERMIT = 6;


export const CALENDAR_VIEW_DAY = 1;
export const CALENDAR_VIEW_MONTH = 2;

// record the view date and the view type
export const initResourceViewState = (
  bookingType, currentDate, permitStartEventDate, dateFormat
) => {
  const queryParams = getQueryParams();
  const lastCalendarMonthDate = queryParams.calendar_month_date;
  const lastCalendarDayDate = queryParams.calendar_day_date;
  const lastCalendarView = queryParams.calendar_view_type;
  const lastDateFormat = queryParams.calendar_date_format;
  let calendarMonthDate = lastCalendarMonthDate;
  let calendarDayDate = lastCalendarDayDate;
  let calendarView = lastCalendarView;

  if (
    ((isUndefined(lastDateFormat) || lastDateFormat === 'undefined') && (bookingType === NEW_RESERVATION)) ||
    (bookingType === ADD_EVENT) ||
    (bookingType === COPY_PERMIT)
  ) {
    calendarDayDate = currentDate;
    calendarView = CALENDAR_VIEW_DAY;
  } else if (
    (bookingType === EDIT_EXISTING_EVENT) ||
    (bookingType === EDIT_EXISTING_EVENT_WITH_NEW_RESOURCE) ||
    (bookingType === EDIT_NEW_ADDED_EVENT)
  ) {
    calendarDayDate = permitStartEventDate;
    calendarView = CALENDAR_VIEW_DAY;
  } else if (+calendarView === CALENDAR_VIEW_DAY) {
    calendarDayDate = formatDate(lastCalendarDayDate, mapToDateFormat(lastDateFormat));
  } else {
    calendarMonthDate = formatDate(lastCalendarMonthDate, mapToDateFormat(lastDateFormat));
  }

  globalState.calendarMonthDate = calendarMonthDate;
  globalState.calendarDayDate = calendarDayDate;
  globalState.calendarView = calendarView;
  globalState.calendarDateFormat = dateFormat;
};

export const updateResourceViewState = (viewDate, isDayView) => {
  if (isDayView) {
    globalState.calendarView = CALENDAR_VIEW_DAY;
    globalState.calendarDayDate = viewDate;
  } else {
    globalState.calendarMonthDate = viewDate;
    globalState.calendarView = CALENDAR_VIEW_MONTH;
  }
};

export const getGlobalState = () => globalState;
