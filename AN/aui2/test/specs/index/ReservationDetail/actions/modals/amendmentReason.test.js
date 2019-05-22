import { fromJS } from 'immutable';
import configureStore from 'redux-mock-store';
import API from 'shared/api/API';
import promiseMiddleware from 'shared/api/promiseMiddleware';
import middlewares from 'shared/api/middlewares';
import * as actions from 'index/ReservationDetail/actions/modals/amendmentReason';
import _ from 'lodash';

describe('index/ReservationDetail/actions/modals/amendmentReason.js', () => {
  let store = null;
  const initialData = {
    shown: false,
    value: 'test value',
    required: false
  };

  beforeEach(() => {
    const mockStore = configureStore(middlewares);
    store = mockStore(fromJS({
      ...initialData
    }));
  });

  afterEach(() => {
    store.clearActions();
  });

  test('setAmendmentReason', () => {
    const { SET_AMENDMENT_REASON, setAmendmentReason } = actions;
    store.dispatch(setAmendmentReason('new test value'));
    const action = _.first(store.getActions());
    expect(action.type).toBe(SET_AMENDMENT_REASON);
  });

  test('setAmendmentReasonShown', () => {
    const { SET_AMENDMENT_REASON_SHOWN, setAmendmentReasonShown } = actions;
    store.dispatch(setAmendmentReasonShown());
    const action = _.first(store.getActions());
    expect(action.type).toBe(SET_AMENDMENT_REASON_SHOWN);
  });

  test('saveAmendmentReason', () => {
    const { SAVE_AMENDMENT_REASON, saveAmendmentReason } = actions;
    store.dispatch(saveAmendmentReason());
    const action = _.first(store.getActions());
    expect(action.type).toBe(SAVE_AMENDMENT_REASON);
  })
});
