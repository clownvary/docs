import configureStore from 'redux-mock-store';
import middlewares from 'shared/api/middlewares';
import * as actions from 'index/Payment/actions/paymentOptions/debitCard';
import * as optionsActions from 'index/Payment/actions/paymentOptions/options';
import _ from 'lodash';

jest.mock('index/Payment/store', () => ({
  getState: jest.fn(),
  dispatch: jest.fn()
}));

describe('index -> payment -> actions -> paymentOptions -> DebitCard', () => {
  let store = null;

  beforeEach(() => {
    const mockStore = configureStore(middlewares);
    store = mockStore({});
  });

  afterEach(() => {
    store.clearActions();
  });


  it('changeDebitCardAmount should work fine', () => {
    const { changeDebitCardAmount } = actions;

    const data = { key: 1, amount: 50.00 };
    store.dispatch(changeDebitCardAmount(data));
    const myActions = store.getActions();

    expect(myActions.length).toEqual(1);
    expect(myActions[0].type).toBe(optionsActions.PAYMENT_OPTIONS_UPDATE_BY_KEY);
    expect(myActions[0].payload).toEqual({
      index: data.key,
      key: 'amount',
      value: data.amount
    });
  });
});
