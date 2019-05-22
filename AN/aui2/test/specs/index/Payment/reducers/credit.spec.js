import { fromJS } from 'immutable';
import {
  FETCH_CREDIT_ACCOUNT_SUCCESS,
  PAYMENT_CREDIT_CHANGE_RESET_STATUS
} from 'index/Payment/actions/paymentOptions/credit';
import reducer from 'index/Payment/reducers/paymentOptions/credit';

// blocked by index/Payment/components/PaymentOptions/utils/payment.js
// which should not import store to do changes
jest.mock('index/Payment/store', () => ({}));

describe('index -> payment -> reducers -> paymentOptions -> credit', () => {

  it('PAYMENT_CREDIT_CHANGE_RESET_STATUS should work fine', () => {
    const isReset = false;
    const state = reducer(fromJS({}), {
      type: PAYMENT_CREDIT_CHANGE_RESET_STATUS,
      payload: { isReset }
    });
    expect(state.get('creditInitDateShouldReset')).toEqual(isReset);
  });

  it('FETCH_CREDIT_ACCOUNT_SUCCESS', () => {
    const data = { overdue: 23.28, available: 210 };
    const state = reducer(fromJS({}), {
      type: FETCH_CREDIT_ACCOUNT_SUCCESS,
      payload: { body: data }
    });
    expect(state.get('creditOverdue')).toEqual(data.overdue);
    expect(state.get('creditAvailable')).toEqual(data.available);
  });
});
