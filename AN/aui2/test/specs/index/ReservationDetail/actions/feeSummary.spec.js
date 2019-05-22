import configureStore from 'redux-mock-store';
import API from 'shared/api/API';
import promiseMiddleware from 'shared/api/promiseMiddleware';
import * as actions from 'index/ReservationDetail/actions/feeSummary';
import _ from 'lodash';

describe('index -> ReservationDetail -> actions -> feeSummary', () => {
  let store = null;

  beforeEach(() => {
    const middlewares = [promiseMiddleware(new API())];
    const mockStore = configureStore(middlewares);
    store = mockStore({});
  });

  afterEach(() => {
    store.clearActions();
  });

  it('updateFeeSummary should work fine', (done) => {
    const { FEE_SUMMARY, updateFeeSummary } = actions;

    store.dispatch(updateFeeSummary({}));
    const action = _.first(store.getActions());

    expect(typeof action).toBe('object');
    expect(action.type).toBe(FEE_SUMMARY);
    done();
  });
});
