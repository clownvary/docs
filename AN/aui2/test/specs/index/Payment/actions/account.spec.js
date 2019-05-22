import { fromJS } from 'immutable';
import configureStore from 'redux-mock-store';
import middlewares from 'shared/api/middlewares';
import * as actions from 'index/Payment/actions/paymentOptions/account';
import * as optionActions from 'index/Payment/actions/paymentOptions/options';

import _ from 'lodash';

jest.mock('index/Payment/store', () => ({
  getState: jest.fn(),
  dispatch: jest.fn()
}));

describe('index -> payment -> actions -> paymentOptions -> account', () => {
  let store = null;
  const initialData = {
    permitID: 12,
    batchID: 0,
    receiptID: 1222
  };

  beforeEach(() => {
    const mockStore = configureStore(middlewares);
    store = mockStore({
      initialData,
      paymentAction: fromJS({
        isSelectMakeAPayment: false
      })
    });
  });

  afterEach(() => {
    store.clearActions();
  });

  it('fetchAccountConfig should work fine', (done) => {
    const selectedID = 5;
    const accountConfigReasons = [
      { id: 1, name: 'reason 1', selected: false, description: 'reason 1 context' },
      { id: 2, name: 'reason 2', selected: false, description: 'reason 2 context' }
    ];
    const accountConfig = { display: true, request_refund: true, reasons: accountConfigReasons };

    store.dispatch(actions.fetchAccountConfig(selectedID))
      .then((res) => {
        expect(Array.isArray(res.payload.body.options.reasons)).toBeTruthy();
        expect(res.payload.body.options).toEqual(accountConfig);

        const storeActions = store.getActions();
        expect(Array.isArray(storeActions)).toBeTruthy();
        expect(storeActions.length).toBeGreaterThanOrEqual(2);
        expect(_.some(storeActions, ['type', actions.FETCH_REFUND_ACCOUNT_CONFIG])).toBe(true);
        expect(_.some(storeActions, ['type', actions.FETCH_REFUND_ACCOUNT_CONFIG_SUCCESS])).toBe(true);
        const action = _.first(storeActions.filter(action => action.type === actions.FETCH_REFUND_ACCOUNT_CONFIG_SUCCESS));
        expect(action.payload.headers.response_code).toBe('0000');
        expect(action.payload.headers.response_message).toEqual('Successful');
        expect(action.payload.body.options).toEqual(accountConfig);
        done();
      })
  });

  it('fetchAccountConfig should work fine when selectedID is undefined', (done) => {
    const accountConfigReasons = [
      { id: 1, name: 'reason 1', selected: false, description: 'reason 1 context' },
      { id: 2, name: 'reason 2', selected: false, description: 'reason 2 context' }
    ];
    const accountConfig = { display: true, request_refund: true, reasons: accountConfigReasons };

    store.dispatch(actions.fetchAccountConfig())
      .then((res) => {
        expect(Array.isArray(res.payload.body.options.reasons)).toBeTruthy();
        expect(res.payload.body.options).toEqual(accountConfig);

        const storeActions = store.getActions();
        expect(Array.isArray(storeActions)).toBeTruthy();
        expect(storeActions.length).toBeGreaterThanOrEqual(2);
        expect(_.some(storeActions, ['type', actions.FETCH_REFUND_ACCOUNT_CONFIG])).toBe(true);
        expect(_.some(storeActions, ['type', actions.FETCH_REFUND_ACCOUNT_CONFIG_SUCCESS])).toBe(true);
        const action = _.first(storeActions.filter(action => action.type === actions.FETCH_REFUND_ACCOUNT_CONFIG_SUCCESS));
        expect(action.payload.headers.response_code).toBe('0000');
        expect(action.payload.headers.response_message).toEqual('Successful');
        expect(action.payload.body.options).toEqual(accountConfig);
        done();
      })
  });

  it('toggleRequestRefund should work fine', (done) => {
    const checked = true;
    store.dispatch(actions.toggleRequestRefund(checked));
    const storeActions = store.getActions();
    expect(Array.isArray(storeActions)).toBeTruthy();
    expect(storeActions.length).toBeGreaterThanOrEqual(1);
    expect(_.some(storeActions, ['type', actions.TOGGLE_REQUEST_REFUND])).toBe(true);
    const action = _.first(storeActions.filter(action => action.type === actions.TOGGLE_REQUEST_REFUND));
    expect(action.payload.checked).toBe(checked);
    done();
  });

  it('changeRefundReason should work fine', (done) => {
    const selectedID = 7;
    store.dispatch(actions.changeRefundReason(selectedID));
    const storeActions = store.getActions();
    expect(Array.isArray(storeActions)).toBeTruthy();
    expect(storeActions.length).toBeGreaterThanOrEqual(1);
    expect(_.some(storeActions, ['type', actions.CHANGE_REFUND_REASON])).toBe(true);
    const action = _.first(storeActions.filter(action => action.type === actions.CHANGE_REFUND_REASON));
    expect(action.payload.selected).toBe(selectedID);
    done();
  });

  it('changeRefundOtherReason should work fine', (done) => {
    const reason = { id: 1, name: 'reason 1', selected: false, description: 'reason 1 context' };
    store.dispatch(actions.changeRefundOtherReason(reason));
    const storeActions = store.getActions();
    expect(Array.isArray(storeActions)).toBeTruthy();
    expect(storeActions.length).toBeGreaterThanOrEqual(1);
    expect(_.some(storeActions, ['type', actions.CHANGE_REFUND_ACCOUNT_OTHER_REASON])).toBe(true);
    const action = _.first(storeActions.filter(action => action.type === actions.CHANGE_REFUND_ACCOUNT_OTHER_REASON));
    expect(action.payload.otherReason).toEqual(reason);
    done();
  });

  it('changeRefundAccountAmount should work fine', (done) => {
    const data = { key: 1, amount: 20.00, formatAccountAmount: 20 };
    store.dispatch(actions.changeRefundAccountAmount(data));
    const storeActions = store.getActions();
    expect(Array.isArray(storeActions)).toBeTruthy();
    expect(storeActions.length).toBeGreaterThanOrEqual(2);
    expect(_.some(storeActions, ['type', optionActions.PAYMENT_OPTIONS_UPDATE_BY_KEY])).toBe(true);
    const myActions = storeActions.filter(action => action.type === optionActions.PAYMENT_OPTIONS_UPDATE_BY_KEY);
    expect(myActions[0].payload).toEqual({ index: data.key, key: 'amount', value: data.amount });
    expect(myActions[1].payload).toEqual(
      { index: data.key, key: 'formatAccountAmount', value: data.formatAccountAmount }
    );
    done();
  });
});
