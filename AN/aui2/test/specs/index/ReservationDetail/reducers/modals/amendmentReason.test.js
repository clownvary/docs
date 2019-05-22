import { is, fromJS } from 'immutable';
import getAmendmentReasonReducer from 'index/ReservationDetail/reducers/modals/amendmentReason';
import * as actions from 'index/ReservationDetail/actions/modals/amendmentReason';

const reducer = getAmendmentReasonReducer({
  amendmentInfo: {
    amendment_notes: 'test value',
    amendment_reason_required: false
  }
});

describe('index/ReservationDetail/reducers/modals/amendmentReason.js', () => {
  test('initial states', () => {
    const initialState = {
      shown: false,
      value: 'test value',
      savedValue: 'test value',
      required: false
    };
    expect(reducer(undefined, {}).toJS()).toEqual(initialState)
  });

  test('SET_AMENDMENT_REASON_SHOWN', () => {
    const state = reducer(undefined, {
      type: actions.SET_AMENDMENT_REASON_SHOWN,
      payload: { shown: true }
    }).toJS();
    expect(state.shown).toBe(true);
  });

  test('SET_AMENDMENT_REASON', () => {
    const state = reducer(undefined, {
      type: actions.SET_AMENDMENT_REASON,
      payload: { value: 'new test value' }
    }).toJS();
    expect(state.value).toBe('new test value');
  });

  test('SAVE_AMENDMENT_REASON', () => {
    const state = reducer(undefined, {
      type: actions.SAVE_AMENDMENT_REASON,
      payload: { value: 'saved value' }
    }).toJS();
    expect(state.savedValue).toBe('saved value');
  });
});
