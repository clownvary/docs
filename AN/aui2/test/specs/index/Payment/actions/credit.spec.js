import configureStore from 'redux-mock-store';
import { fromJS } from 'immutable';
import middlewares from 'shared/api/middlewares';
import * as actions from 'index/Payment/actions/paymentOptions/credit';
import * as optionsActions from 'index/Payment/actions/paymentOptions/options';
import jsonCreditAccount from 'json/Payment/creditAccount.json';

import _ from 'lodash';

jest.mock('index/Payment/store', () => ({
  getState: jest.fn(),
  dispatch: jest.fn()
}));

describe('index -> payment -> actions -> paymentOptions -> credit', () => {
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

  it('changeCreditAmount should work fine', (done) => {
    const { changeCreditAmount } = actions;

    const data = { key: 'Credit', amount: 70.00, formatCreditAmount: 70 };
    store.dispatch(changeCreditAmount(data));
    const myActions = store.getActions();

    expect(myActions.length).toEqual(2);
    expect(myActions[0].type).toBe(optionsActions.PAYMENT_OPTIONS_UPDATE_BY_KEY);
    expect(myActions[0].payload).toEqual({
      index: data.key,
      key: 'amount',
      value: data.amount
    });

    expect(myActions[1].type).toBe(optionsActions.PAYMENT_OPTIONS_UPDATE_BY_KEY);
    expect(myActions[1].payload).toEqual({
      index: data.key,
      key: 'formatCreditAmount',
      value: data.formatCreditAmount
    });
    done();
  });

  it('_getCreditAccount should work fine', (done) => {
    const { FETCH_CREDIT_ACCOUNT_SUCCESS, _getCreditAccount } = actions;
    const creditAccount = { overdue: '28.23', available: '120' };

    store.dispatch(_getCreditAccount({ batchID: 1, receiptID: 1 }))
      .then((res) => {
        expect(res.payload.body).toEqual(creditAccount);

        const storeActions = store.getActions();
        expect(Array.isArray(storeActions)).toBeTruthy();
        expect(storeActions.length).toBeGreaterThanOrEqual(2);
        expect(_.some(storeActions, ['type', FETCH_CREDIT_ACCOUNT_SUCCESS])).toBe(true);
        const action = _.first(storeActions.filter(act => act.type === FETCH_CREDIT_ACCOUNT_SUCCESS));
        expect(action.payload.headers.response_code).toBe('0000');
        expect(action.payload.headers.response_message).toEqual('Successful');
        expect(action.payload.body).toEqual(creditAccount);
        done();
      })
  });

  it('getCreditAccount should work fine', (done) => {
    const {
      getCreditAccount,
      FETCH_CREDIT_ACCOUNT_SUCCESS
    } = actions;

    store.dispatch(getCreditAccount())
      .then(() => {
        const myActions = store.getActions();

        expect(myActions.length).toBe(2);
        expect(myActions[0].type).toBe('');
        expect(myActions[0].payload).toBeUndefined();
        expect(myActions[1].type).toBe(FETCH_CREDIT_ACCOUNT_SUCCESS);
        expect(myActions[1].payload).toEqual(jsonCreditAccount);
        done();
      })
  });

  it('changeCreditResetStatus should work fine', (done) => {
    const { changeCreditResetStatus, PAYMENT_CREDIT_CHANGE_RESET_STATUS } = actions;

    store.dispatch(changeCreditResetStatus(false));
    const action = _.first(store.getActions());

    expect(typeof action).toBe('object');
    expect(action.type).toBe(PAYMENT_CREDIT_CHANGE_RESET_STATUS);
    done();
  });
});
