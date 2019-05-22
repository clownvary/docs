import URL from '../urls';

export const SET_END = 'SET_END';
export const SET_END_TYPE = 'SET_END_TYPE';
export const SET_FREQUENCY = 'SET_FREQUENCY';
export const SET_BASE_BOOKING = 'SET_BASE_BOOKING';
export const SET_SELECTED_DATES = 'SET_SELECTED_DATES';
export const SET_RECURRING_TYPE = 'SET_RECURRING_TYPE';
export const SET_MONTHLY_FREQUENCY_TYPE = 'SET_MONTHLY_FREQUENCY_TYPE';
export const SET_RECURRING_BASE = 'SET_RECURRING_BASE';
export const CLEAR_ERROR = 'CLEAR_ERROR';
export const SHOW_RECURRING_PATTERN_MODAL = 'SHOW_RECURRING_PATTERN_MODAL';
export const CLOSE_RECURRING_PATTERN_MODAL = 'CLOSE_RECURRING_PATTERN_MODAL';
export const GENERATE_RECURRING_BOOKINGS_FAIL = 'GENERATE_RECURRING_BOOKINGS_FAIL';
export const GENERATE_RECURRING_BOOKINGS_SUCCESS = 'GENERATE_RECURRING_BOOKINGS_SUCCESS';
export const FETCH_RECURRING_PATTERN_OPTIONS_SUCCESS = 'FETCH_RECURRING_PATTERN_OPTIONS_SUCCESS';

export const clearError = () => ({ type: CLEAR_ERROR });
export const showRecurringPatternModal = () => ({ type: SHOW_RECURRING_PATTERN_MODAL });
export const closeRecurringPatternModal = () => ({ type: CLOSE_RECURRING_PATTERN_MODAL });

export const setBaseBooking = ({ booking, resource }) => ({
  type: SET_BASE_BOOKING,
  payload: {
    booking,
    resource
  }
});

export const fetchRecurringPatternOptions = () => ({
  types: ['', FETCH_RECURRING_PATTERN_OPTIONS_SUCCESS, ''],
  promise: API => API.get(URL.recurringPatternOptions)
});

export const setRecurringType = type => ({
  type: SET_RECURRING_TYPE,
  payload: { type }
});

export const setEndType = type => ({
  type: SET_END_TYPE,
  payload: { type }
});

export const setEnd = (type, value) => ({
  type: SET_END,
  payload: { type, value }
});

export const setMonthlyFrequencyType = type => ({
  type: SET_MONTHLY_FREQUENCY_TYPE,
  payload: { type }
});

export const setFrequency = (type, value) => ({
  type: SET_FREQUENCY,
  payload: { type, value }
});

export const setRecurringBase = (resourceIndex, bookingIndex) => ({
  type: SET_RECURRING_BASE,
  payload: {
    resourceIndex,
    bookingIndex
  }
});

export const startRecurringBooking = ({ booking }) => (dispatch, getState) => {
  const fetchOptions = getState().recurringPattern.get('types').size <= 0;
  return Promise.all([
    fetchOptions ? dispatch(fetchRecurringPatternOptions()) : null
  ]).then(() => {
    const resource = getState().configurationData.getIn(['resourceMap', booking.get('resourceID').toString()]);
    dispatch(setBaseBooking({ booking, resource }));
    dispatch(showRecurringPatternModal());
  });
};

export const generateRecurringBookings = payload => ({
  types: ['', GENERATE_RECURRING_BOOKINGS_SUCCESS, GENERATE_RECURRING_BOOKINGS_FAIL],
  promise: API => API.post(URL.generateRecurringBookings, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  }),
  meta: {
    ignoreBusinessErrors: true,
    ignoreSystemErrors: true
  }
});

export const setSelectedDates = dates => ({
  type: SET_SELECTED_DATES,
  payload: {
    dates
  }
});
