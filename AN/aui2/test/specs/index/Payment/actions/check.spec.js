import configureStore from 'redux-mock-store';
import middlewares from 'shared/api/middlewares';
import * as actions from 'index/Payment/actions/paymentOptions/check';
import { PAYMENT_OPTIONS_UPDATE_BY_KEY } from 'index/Payment/actions/paymentOptions/options';

jest.mock('index/Payment/store', () => ({
  getState: jest.fn(),
  dispatch: jest.fn()
}));

describe('index -> payment -> actions -> paymentOptions -> check', () => {
  let store = null;

  beforeEach(() => {
    const mockStore = configureStore(middlewares);
    store = mockStore({});
  });

  afterEach(() => store.clearActions());

  it('updateCheckNumber should work fine', (done) => {
    const { updateCheckNumber } = actions;

    const data = { key: 1, checkNumber: 115 };
    store.dispatch(updateCheckNumber(data));
    const myActions = store.getActions();

    expect(myActions.length).toEqual(1);

    expect(myActions[0].type).toBe(PAYMENT_OPTIONS_UPDATE_BY_KEY);
    expect(myActions[0].payload).toEqual({
      index: data.key,
      key: 'checkNumber',
      value: data.checkNumber
    });
    done();
  });

  it('changeCheckAmount should work fine', (done) => {
    const { changeCheckAmount } = actions;

    const data = { key: 'Check', amount: 50.00, formatCheckAmount: 50 };
    store.dispatch(changeCheckAmount(data));
    const myActions = store.getActions();

    expect(myActions.length).toEqual(2);

    expect(myActions[0].type).toBe(PAYMENT_OPTIONS_UPDATE_BY_KEY);
    expect(myActions[0].payload).toEqual({
      index: data.key,
      key: 'amount',
      value: data.amount
    });

    expect(myActions[1].type).toBe(PAYMENT_OPTIONS_UPDATE_BY_KEY);
    expect(myActions[1].payload).toEqual({
      index: data.key,
      key: 'formatCheckAmount',
      value: data.formatCheckAmount
    });
    done();
  });
});
