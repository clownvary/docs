import { is, fromJS } from 'immutable';
import reducer from 'index/Resource/reducers/recurringPattern';
import {

  SET_END,
  SET_END_TYPE,
  SET_FREQUENCY,
  SET_BASE_BOOKING,
  SET_SELECTED_DATES,
  SET_RECURRING_TYPE,
  SET_MONTHLY_FREQUENCY_TYPE,
  CLEAR_ERROR,
  SHOW_RECURRING_PATTERN_MODAL,
  CLOSE_RECURRING_PATTERN_MODAL,
  GENERATE_RECURRING_BOOKINGS_FAIL,
  GENERATE_RECURRING_BOOKINGS_SUCCESS,
  FETCH_RECURRING_PATTERN_OPTIONS_SUCCESS
} from 'index/Resource/actions/recurringPattern';

import {
  END_TYPES,
  RECURRING_TYPES,
  MONTHLY_FREQUENCY_TYPES
} from 'index/Resource/consts/recurringPattern'

const defaultStates = {
  types: [],
  visible: false,
  base: {},
  type: RECURRING_TYPES.Daily,
  monthlyFrequencyType: MONTHLY_FREQUENCY_TYPES.Day,
  frequency: {
    [RECURRING_TYPES.Daily]: 1,
    [RECURRING_TYPES.Weekly]: 1,
    [RECURRING_TYPES.Monthly]: {
      [MONTHLY_FREQUENCY_TYPES.Day]: 1,
      [MONTHLY_FREQUENCY_TYPES.Weekday]: ''
    }
  },
  endType: END_TYPES.AfterRecurrence,
  end: {
    [RECURRING_TYPES.Daily]: {
      [END_TYPES.AfterRecurrence]: '',
      [END_TYPES.ByDate]: null
    },
    [RECURRING_TYPES.Weekly]: {
      [END_TYPES.AfterRecurrence]: '',
      [END_TYPES.ByDate]: null
    },
    [RECURRING_TYPES.Monthly]: {
      [END_TYPES.AfterRecurrence]: '',
      [END_TYPES.ByDate]: null
    }
  },
  selectedDates: [],
  errors: null
}

const setup = (initalStates) => {
  const state = reducer(fromJS(initalStates), {});
  const jsState = state.toJS();
  return { state, jsState };
}

describe('index/Resource/reducers/recurringPattern', () => {
  test('has expect inital states', () => {
    const { jsState } = setup();
    expect(jsState).toEqual(defaultStates);
  });

  test('FETCH_RECURRING_PATTERN_OPTIONS_SUCCESS set recurring pattern options as expect', () => {
    const { state, jsState } = setup();

    expect(jsState.type).toBe(RECURRING_TYPES.Daily);

    const newState = reducer(state, {
      type: FETCH_RECURRING_PATTERN_OPTIONS_SUCCESS,
      payload: {
        body: {
          repeat_types: [
            {
              id: RECURRING_TYPES.Daily,
              name: 'Daily',
              selected: false
            },
            {
              id: RECURRING_TYPES.Weekly,
              name: 'Weekly',
              selected: false
            },
            {
              id: RECURRING_TYPES.Monthly,
              name: 'Monthly',
              selected: true
            }
          ]
        }
      }
    });

    expect(newState.get('type')).toBe(RECURRING_TYPES.Monthly);
  });

  test('SET_RECURRING_TYPE set recurring type correctly', () => {
    const { state, jsState } = setup();

    expect(jsState.type === defaultStates.type).toBe(true);

    const newState = reducer(state, {
      type: SET_RECURRING_TYPE,
      payload: { type: RECURRING_TYPES.Monthly }
    });
    expect(newState.get('type')).toBe(RECURRING_TYPES.Monthly);
  });

  test('SET_BASE_BOOKING set base booking as expect', () => {
    const mockBase = {
      booking: 'base booking value',
      resource: 'resource item value',
    }

    const { state, jsState } = setup();

    expect(jsState.base).toEqual(defaultStates.base);

    const newState = reducer(state, {
      type: SET_BASE_BOOKING,
      payload: {
        baseBooking: mockBase.booking,
        resourceItem: mockBase.resource
      }
    });
    const newBase = newState.get('base').toJS();

    expect(newBase).toEqual(mockBase);
  });

  test('SHOW_RECURRING_PATTERN_MODAL set visible state to true', () => {
    const { state, jsState } = setup();

    expect(jsState.visible).toBe(false);

    const newState = reducer(state, {
      type: SHOW_RECURRING_PATTERN_MODAL
    });

    expect(newState.get('visible')).toBe(true);
  });

  test('CLOSE_RECURRING_PATTERN_MODAL set visisble to false and clear errors', () => {
    const mockErrorMessage = 'mock error message';
    const { state, jsState } = setup({
      ...defaultStates,
      visible: true,
      errors: mockErrorMessage
    });

    expect(jsState.visible).toBe(true);
    expect(jsState.errors).toBe(mockErrorMessage);

    const newState = reducer(state, {
      type: CLOSE_RECURRING_PATTERN_MODAL
    });

    expect(newState.get('visible')).toBe(false);
    expect(newState.get('errors')).toBeNull();
  });

  test('SET_END set end as expect', () => {
    const mockEndValue = 'mock end value';
    const { state, jsState } = setup();

    expect(jsState.endType).toBe(defaultStates.endType);

    const newState = reducer(state, {
      type: SET_END,
      payload: {
        type: [jsState.type, jsState.endType],
        value: mockEndValue
      }
    });

    expect(newState.getIn(['end', jsState.type, jsState.endType])).toBe(mockEndValue);
  });

  test('SET_END_TYPE set end type as expect', () => {
    const { state } = setup();

    expect(state.get('endType')).toBe(END_TYPES.AfterRecurrence);

    const newState = reducer(state, {
      type: SET_END_TYPE,
      payload: {
        type: END_TYPES.ByDate
      }
    });

    expect(newState.get('endType')).toBe(END_TYPES.ByDate);
  });

  test('SET_MONTHLY_FREQUENCY_TYPE set monthly frequency type as expect', () => {
    const { state } = setup();

    expect(state.get('monthlyFrequencyType')).toBe(MONTHLY_FREQUENCY_TYPES.Day);

    const newState = reducer(state, {
      type: SET_MONTHLY_FREQUENCY_TYPE,
      payload: {
        type: MONTHLY_FREQUENCY_TYPES.Weekday
      }
    });

    expect(newState.get('monthlyFrequencyType')).toBe(MONTHLY_FREQUENCY_TYPES.Weekday);
  });

  test('SET_FREQUENCY set frequency as expect', () => {
    const { state, jsState } = setup();

    const newState = reducer(state, {
      type: SET_FREQUENCY,
      payload: {
        type: [RECURRING_TYPES.Monthly, MONTHLY_FREQUENCY_TYPES.Day],
        value: 2
      }
    });

    expect(newState.getIn(['frequency', RECURRING_TYPES.Monthly, MONTHLY_FREQUENCY_TYPES.Day])).toBe(2);
  });

  test('SET_SELECTED_DATES set selected dates as expect', () => {
    const newDates = [new Date()];
    const { state, jsState } = setup();

    const newState = reducer(state, {
      type: SET_SELECTED_DATES,
      payload: {
        dates: newDates
      }
    });

    expect(newState.get('selectedDates')).toEqual(newDates);
  });

  test('GENERATE_RECURRING_BOOKINGS_FAIL set errors as expect', () => {
    const errorMessage = 'mock error message';
    const { state, jsState } = setup();
    const newState = reducer(state, {
      type: GENERATE_RECURRING_BOOKINGS_FAIL,
      error: { payload: { headers: { response_message: errorMessage } } }
    })

    expect(newState.get('errors')).toBe(errorMessage);
  });

  test('GENERATE_RECURRING_BOOKINGS_SUCCESS handle recurring booking generation results correctly', () => {
    const mockErrorMessage = 'mock error message';
    const { state, jsState } = setup({
      ...defaultStates,
      visible: true,
      errors: mockErrorMessage
    });

    expect(jsState.visible).toBe(true);
    expect(jsState.errors).toBe(mockErrorMessage);

    let newState = reducer(state, {
      type: GENERATE_RECURRING_BOOKINGS_SUCCESS,
      payload: { body: 'success' }
    });

    expect(newState.get('visible')).toBe(false);
    expect(newState.get('errors')).toBeNull();

    const errorMessage = 'new error message';
    newState = reducer(newState, {
      type: GENERATE_RECURRING_BOOKINGS_SUCCESS,
      payload: { body: { errors: errorMessage } }
    });

    expect(newState.get('errors')).toBe(errorMessage);
  });

  test('CLEAR_ERROR clear errors', () => {
    const errorMessage = 'mock error message';
    const { state, jsState } = setup({
      ...defaultStates,
      errors: errorMessage
    });

    expect(jsState.errors).toBe(errorMessage);

    const newState = reducer(state, {
      type: CLEAR_ERROR
    });

    expect(newState.get('errors')).toBeNull();
  });
});
