import { fromJS } from 'immutable';
import reducerHandler from 'shared/utils/reducerHandler';

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
} from '../actions/recurringPattern';

import {
  END_TYPES,
  RECURRING_TYPES,
  MONTHLY_FREQUENCY_TYPES
} from '../consts/recurringPattern';

const initialState = fromJS({
  types: [],
  visible: false,
  base: {},
  // data
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
});

const handlers = {
  [FETCH_RECURRING_PATTERN_OPTIONS_SUCCESS](state, { payload }) {
    const { body: { repeat_types: repeatTypes } } = payload;
    return state.withMutations((s) => {
      s.set('types', repeatTypes.map(t => ({ value: t.id, text: t.name, selected: t.selected })));
      s.set('type', repeatTypes.filter(t => t.selected)[0].id);
    });
  },

  [SET_RECURRING_TYPE](state, { payload: { type } }) {
    return state.set('type', type);
  },

  [SET_BASE_BOOKING](state, { payload: { booking, resource } }) {
    return state.set('base', fromJS({
      booking,
      resource
    }));
  },

  [SHOW_RECURRING_PATTERN_MODAL](state) {
    return state.set('visible', true);
  },

  [CLOSE_RECURRING_PATTERN_MODAL](state) {
    return state.withMutations((s) => {
      s.set('visible', false);
      s.set('errors', null);
    });
  },

  [SET_END](state, { payload: { type, value } }) {
    return state.setIn(['end', ...type], value);
  },

  [SET_END_TYPE](state, { payload: { type } }) {
    return state.set('endType', type);
  },

  [SET_MONTHLY_FREQUENCY_TYPE](state, { payload: { type } }) {
    return state.set('monthlyFrequencyType', type);
  },

  [SET_FREQUENCY](state, { payload: { type, value } }) {
    return state.setIn(['frequency', ...type], value);
  },

  [SET_SELECTED_DATES](state, { payload: { dates } }) {
    return state.set('selectedDates', dates);
  },

  [GENERATE_RECURRING_BOOKINGS_FAIL](state, { error }) {
    const { payload: { headers: { response_message } } } = error;
    return state.set('errors', response_message);
  },

  [GENERATE_RECURRING_BOOKINGS_SUCCESS](state, { payload }) {
    const { body: { errors } } = payload;
    return errors
      ? state.set('errors', errors)
      : state.withMutations((s) => {
        s.set('visible', false);
        s.set('errors', null);
      });
  },

  [CLEAR_ERROR](state) {
    return state.set('errors', null);
  }
};

export default reducerHandler(initialState, handlers);
