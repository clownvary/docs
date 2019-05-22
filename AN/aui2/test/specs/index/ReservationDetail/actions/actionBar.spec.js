import configureStore from 'redux-mock-store';
import API from 'shared/api/API';
import promiseMiddleware from 'shared/api/promiseMiddleware';
import middlewares from 'shared/api/middlewares';
import * as actions from 'index/ReservationDetail/actions/actionBar';
import _ from 'lodash';

describe('index -> ReservationDetail -> actions -> actionBar', () => {
  let store = null;
  const initialData = {
    permitID: '1111111',
    batchID: '1111111',
    receiptID: '2222222',
    receiptEntryID: '3333333'
  };

  beforeEach(() => {
    const mockStore = configureStore(middlewares);
    store = mockStore({
      initialData
    });
  });

  afterEach(() => {
    store.clearActions();
  });

  it('setStatus should work fine', (done) => {
    const { SET_STATUS, setStatus } = actions;

    store.dispatch(setStatus(1));
    const action = _.first(store.getActions());

    expect(typeof action).toBe('object');
    expect(action.type).toBe(SET_STATUS);
    done();
  });

  it('setStatus should work fine', () => {
    const { SET_DISABLED, setActionBarDisabled } = actions;

    store.dispatch(setActionBarDisabled());
    const action = _.first(store.getActions());

    expect(typeof action).toBe('object');
    expect(action.type).toBe(SET_DISABLED);
  });

  it('gotoPaymentModificationPage should work fine', () => {
    const { gotoPaymentModificationPage } = actions;
    const mockStore = configureStore();
    store = mockStore({
      initialData
    });

    gotoPaymentModificationPage({})(store.dispatch, store.getState);
    const action = _.first(store.getActions());
    expect(typeof action).toBe('object');
    expect(action.type).toBe('LOCATION_REDIRECT');
  });

  it('updateExpirationDate should work fine', () => {
    const { updateExpirationDate } = actions;
      return store.dispatch(updateExpirationDate())
      .then(({ payload: { headers } }) => {
        expect(headers.response_code).toBe('0000');
        expect(headers.response_message).toBe('Successful');
      });
  });
  it('fetchPermitEvents should work fine', (done) => {
    const { fetchPermitEvents, FETCH_PERMIT_EVENTS_SUCCESS } = actions;
    return store.dispatch(fetchPermitEvents()).then((data)=>{
      const actions = store.getActions();
      expect(actions.length).toBe(2);
      expect(actions[0].type).toBe('');
      expect(actions[1].type).toBe(FETCH_PERMIT_EVENTS_SUCCESS);
      done();
    });
  });
});
