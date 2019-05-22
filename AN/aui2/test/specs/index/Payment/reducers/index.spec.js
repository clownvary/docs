import { fromJS } from 'immutable';
import getPaymentReducer from 'index/Payment/reducers/index';
import * as actions from 'index/Payment/actions/index';
import { UPDATE_SUCCESS_PAYMENT } from 'index/Payment/components/Modals/PinPad/actions/pinpad';
import { CHANGE_PAYMENTPLAN_AMOUNT } from 'index/Payment/actions/paymentOptions/paymentPlan';

const reducer = getPaymentReducer(__payment__.__initialState__);

jest.mock('index/Payment/store', () => ({
  getState: jest.fn(),
  dispatch: jest.fn()
}));

describe('index/Payment/reducers/index', () => {
  it('CHANGE_REMAINING should work fine', () => {
    const { CHANGE_REMAINING } = actions;
    const remaining = 200;
    const state = reducer(fromJS({}), {
      type: CHANGE_REMAINING,
      payload: { remaining }
    });
    expect(state.get('remaining')).toEqual(remaining);
  });

  it('SHOW_PAYMENT_ERRORS should work fine', () => {
    const { SHOW_PAYMENT_ERRORS } = actions;
    const errors = fromJS([{ message: 'payment error' }]);
    const state = reducer(fromJS({}), {
      type: SHOW_PAYMENT_ERRORS,
      payload: { errors }
    });
    expect(state.getIn(['errors', 0, 'message'])).toEqual('payment error');
  });

  it('CLEAR_PAYMENT_ERRORS should work fine', () => {
    const { CLEAR_PAYMENT_ERRORS } = actions;
    const optionIndex = 0;
    const state = reducer(fromJS({
      errors: [{
        key: 0,
        message: 'payment option 0 error'
      }, {
        key: 1,
        message: 'payment option 1 error'
      }]
    }), {
      type: CLEAR_PAYMENT_ERRORS,
      payload: { optionIndex }
    });
    expect(state.get('errors').size).toEqual(1);
  });
  it('UPDATE_SUCCESS_PAYMENT should work fine', () => {
    const state = reducer(fromJS({}), { type: UPDATE_SUCCESS_PAYMENT });
    expect(state.get('successPay')).toBeTruthy();
    expect(global.isReceiptCantCancel).toBeTruthy();
  });

  it('SHOW_ECP_AUTH_DETAILS should work fine', () => {
    const { SHOW_ECP_AUTH_DETAILS } = actions;
    const ecpAuthDetails = { shown: false };
    const state = reducer(fromJS({}), {
      type: SHOW_ECP_AUTH_DETAILS,
      payload: { ecpAuthDetails }
    });
    expect(state.get('ecpAuthDetails').shown).toBeFalsy();
  });

  it('CHANGE_PAYMENTPLAN_AMOUNT should work fine', () => {
    const amount = 100;
    const state = reducer(fromJS({}), {
      type: CHANGE_PAYMENTPLAN_AMOUNT,
      payload: { amount }
    });
    expect(state.get('paymentPlanAmount')).toEqual(amount);
  });

  it('UPDATE_PAY_NOW_AMOUNT should work fine', () => {
    const { UPDATE_PAY_NOW_AMOUNT } = actions;
    const payNow = 300;
    const state = reducer(fromJS({}), {
      type: UPDATE_PAY_NOW_AMOUNT,
      payload: { payNow }
    });
    expect(state.get('payNow')).toEqual(payNow);
  });

  it('RESIZE should work fine', () => {
    const { RESIZE } = actions;
    const height = 1080;
    const state = reducer(fromJS({}), {
      type: RESIZE,
      payload: { height }
    });
    expect(state.get('resize')).toEqual(height);
  });
});
