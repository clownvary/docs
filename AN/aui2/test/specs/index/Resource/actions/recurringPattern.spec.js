import configureStore from 'redux-mock-store';
import middlewares from 'shared/api/middlewares';
import { fromJS } from 'immutable';
import first from 'lodash/first';
import find from 'lodash/find';
import * as actions from 'index/Resource/actions/recurringPattern';
import { mockDispatch, getMockActions, clearMockActions } from '../../../../utils/mockDispatch';

describe('index/Resource/actions/recurringPattern', () => {
  let store = null;
  let API = {
    get: null,
    post: null
  };

  beforeEach(() => {
    const mockStore = configureStore(middlewares);
    store = mockStore({
      recurringPattern: fromJS({
        types: [1, 2]
      })
    });
    API.get = jest.fn();
    API.post = jest.fn();
  });

  afterEach(() => {
    store.clearActions();
    clearMockActions();
    API = {
      get: null,
      post: null
    };
  });

  it('clearError should work fine', () => {
    const { CLEAR_ERROR, clearError } = actions;

    store.dispatch(clearError());
    const action = first(store.getActions());

    expect(typeof action).toBe('object');
    expect(action.type).toBe(CLEAR_ERROR);
  });

  it('showRecurringPatternModal should work fine', () => {
    const { SHOW_RECURRING_PATTERN_MODAL, showRecurringPatternModal } = actions;

    store.dispatch(showRecurringPatternModal());
    const action = first(store.getActions());

    expect(typeof action).toBe('object');
    expect(action.type).toBe(SHOW_RECURRING_PATTERN_MODAL);
  });

  it('closeRecurringPatternModal should work fine', () => {
    const { CLOSE_RECURRING_PATTERN_MODAL, closeRecurringPatternModal } = actions;

    store.dispatch(closeRecurringPatternModal());
    const action = first(store.getActions());

    expect(typeof action).toBe('object');
    expect(action.type).toBe(CLOSE_RECURRING_PATTERN_MODAL);
  });

  it('setBaseBooking should work fine', () => {
    const { setBaseBooking, SET_BASE_BOOKING } = actions;

    store.dispatch(setBaseBooking({ baseBooking: {}, resourceItem: {} }));
    const action = first(store.getActions());

    expect(typeof action).toBe('object');
    expect(action.type).toBe(SET_BASE_BOOKING);
  });

  it('fetchRecurringPatternOptions should work fine', () => {
    const {
      fetchRecurringPatternOptions,
      FETCH_RECURRING_PATTERN_OPTIONS_SUCCESS
    } = actions;

    return store.dispatch(fetchRecurringPatternOptions())
      .then(() => {
        const storeActions = store.getActions();

        expect(storeActions.some(action => action.type
           === 'FETCH_RECURRING_PATTERN_OPTIONS_SUCCESS')).toBeTruthy();
      });
  });

  it('setRecurringType should work fine', () => {
    const { setRecurringType, SET_RECURRING_TYPE } = actions;

    store.dispatch(setRecurringType({ type: '' }));
    const action = first(store.getActions());

    expect(typeof action).toBe('object');
    expect(action.type).toBe(SET_RECURRING_TYPE);
  });

  it('setEndType should work fine', () => {
    const { setEndType, SET_END_TYPE } = actions;

    store.dispatch(setEndType({ type: '' }));
    const action = first(store.getActions());

    expect(typeof action).toBe('object');
    expect(action.type).toBe(SET_END_TYPE);
  });

  it('setEnd should work fine', () => {
    const { setEnd, SET_END } = actions;

    store.dispatch(setEnd({ type: '', value: '' }));
    const action = first(store.getActions());

    expect(typeof action).toBe('object');
    expect(action.type).toBe(SET_END);
  });

  it('setMonthlyFrequencyType should work fine', () => {
    const { setMonthlyFrequencyType, SET_MONTHLY_FREQUENCY_TYPE } = actions;

    store.dispatch(setMonthlyFrequencyType({ type: '' }));
    const action = first(store.getActions());

    expect(typeof action).toBe('object');
    expect(action.type).toBe(SET_MONTHLY_FREQUENCY_TYPE);
  });

  it('setFrequency should work fine', () => {
    const { setFrequency, SET_FREQUENCY } = actions;

    store.dispatch(setFrequency({ type: '', value: '' }));
    const action = first(store.getActions());

    expect(typeof action).toBe('object');
    expect(action.type).toBe(SET_FREQUENCY);
  });

  it('setRecurringBase should work fine', () => {
    const { setRecurringBase, SET_RECURRING_BASE } = actions;

    store.dispatch(setRecurringBase({ resourceIndex: '', bookingIndex: '' }));
    const action = first(store.getActions());

    expect(typeof action).toBe('object');
    expect(action.type).toBe(SET_RECURRING_BASE);
  });

  it('startRecurringBooking should work fine, the types-length > 0 in recurringPattern', () => {
    const {
      startRecurringBooking
    } = actions;

    const info = {
      baseBooking: {
        resourceID: 0
      },
      resourceItem: [{
        resourceID: 0
      }],
      resourceIndex: 0,
      bookingIndex: 0
    };

    return store.dispatch(startRecurringBooking(info))
      .then(() => {
        const storeActions = store.getActions();

        expect(storeActions.some(action => action.type
          === 'SET_RECURRING_BASE')).toBeTruthy();
        expect(storeActions.some(action => action.type
          === 'SET_BASE_BOOKING')).toBeTruthy();
        expect(storeActions.some(action => action.type
          === 'SHOW_RECURRING_PATTERN_MODAL')).toBeTruthy();
      });
  });

  it('startRecurringBooking should work fine, the types-length = 0 in recurringPattern', () => {
    const {
      startRecurringBooking
    } = actions;

    const info = {
      baseBooking: {
        resourceID: 0
      },
      resourceItem: [{
        resourceID: 0
      }],
      resourceIndex: 0,
      bookingIndex: 0
    };

    const mockStore = configureStore(middlewares);
    store = mockStore({
      recurringPattern: fromJS({
        types: []
      })
    });

    return store.dispatch(startRecurringBooking(info))
      .then(() => {
        const storeActions = store.getActions();

        expect(storeActions.some(action => action.type
          === 'FETCH_RECURRING_PATTERN_OPTIONS_SUCCESS')).toBeTruthy();
      });
  });

  it('generateRecurringBookings should work fine', () => {
    const {
      generateRecurringBookings,
      GENERATE_RECURRING_BOOKINGS_SUCCESS,
      GENERATE_RECURRING_BOOKINGS_FAIL
    } = actions;

    return store.dispatch(generateRecurringBookings({ payload: {} }))
      .then(() => {
        const storeActions = store.getActions();
        const noTypeAction = find(storeActions, action => action.type === '');

        expect(noTypeAction.meta).toEqual({
          ignoreBusinessErrors: true,
          ignoreSystemErrors: true
        });
        expect(storeActions.some(action => action.type
           === 'GENERATE_RECURRING_BOOKINGS_SUCCESS')).toBeTruthy();
      });
  });

  it('setSelectedDates should work fine', () => {
    const { setSelectedDates, SET_SELECTED_DATES } = actions;

    store.dispatch(setSelectedDates({ dates: '' }));
    const action = first(store.getActions());

    expect(typeof action).toBe('object');
    expect(action.type).toBe(SET_SELECTED_DATES);
  });

});
