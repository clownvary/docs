import { fromJS } from 'immutable';
import configureStore from 'redux-mock-store';
import _ from 'lodash';

import middlewares from 'shared/api/middlewares';
import * as testActions from 'index/ReservationDetail/actions/balanceDueDetail';

describe('index -> Reseravtion Detail -> actions -> balanceDueDetail', () => {
  let store = null;
  const mockStore = configureStore(middlewares);
  const initialData = {
    batchID: '1111111',
    receiptID: '2222222'
  };

  beforeEach(() => {
    store = mockStore({
      balanceDueDetail: fromJS({}),
      initialData
    });
  });

  afterEach(() => {
    store.clearActions();
  });

  it('fetchBalanceDueDetailAsyncAction should works fine ', (done) => {
    store.dispatch(testActions.fetchBalanceDueDetailAsyncAction()).then((data) => {
      const actions = store.getActions();
      expect(actions.length).toBe(2);
      expect(actions[0].type).toBe('');
      expect(actions[1].type).toBe(testActions.FETCH_BALANCEDUEDETAIL);
      expect(actions[1].payload).toEqual(data.payload);
      done();
    }, done);
  });
});
