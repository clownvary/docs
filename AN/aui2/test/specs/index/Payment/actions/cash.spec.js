import configureStore from 'redux-mock-store';
import middlewares from 'shared/api/middlewares';
import * as actions from 'index/Payment/actions/paymentOptions/cash';
import * as optionsActions from 'index/Payment/actions/paymentOptions/options';

jest.mock('index/Payment/store', () => ({
  getState: jest.fn(),
  dispatch: jest.fn()
}));

describe('index -> payment -> actions -> paymentOptions -> cash', () => {
  let store = null;

  beforeEach(() => {
    const mockStore = configureStore(middlewares);
    store = mockStore({});
  });

  afterEach(() => store.clearActions());

  it('changeCashAmount should work fine', (done) => {
    const { changeCashAmount } = actions;

    const data = { index: 1, amount: 80.00, formatCashAmount: 80 };
    store.dispatch(changeCashAmount(data));
    const myActions = store.getActions();

    expect(myActions.length).toEqual(2);

    expect(myActions[0].type).toBe(optionsActions.PAYMENT_OPTIONS_UPDATE_BY_KEY);
    expect(myActions[0].payload).toEqual({
      index: data.index,
      key: 'amount',
      value: data.amount
    });

    expect(myActions[1].type).toBe(optionsActions.PAYMENT_OPTIONS_UPDATE_BY_KEY);
    expect(myActions[1].payload).toEqual({
      index: data.index,
      key: 'formatCashAmount',
      value: data.formatCashAmount
    });
    done();
  });

  it('calculateChange should work fine', (done) => {
    const { calculateCashChange } = actions;

    const data = { index: 1, change: 20, paidAmount: 80 };
    store.dispatch(calculateCashChange(data));
    const myActions = store.getActions();

    expect(myActions.length).toEqual(2);

    expect(myActions[0].type).toBe(optionsActions.PAYMENT_OPTIONS_UPDATE_BY_KEY);
    expect(myActions[0].payload).toEqual({
      index: data.index,
      key: 'cashChange',
      value: data.change
    });

    expect(myActions[1].type).toBe(optionsActions.PAYMENT_OPTIONS_UPDATE_BY_KEY);
    expect(myActions[1].payload).toEqual({
      index: data.index,
      key: 'cashAmountPaid',
      value: data.paidAmount
    });
    done();
  });
});
