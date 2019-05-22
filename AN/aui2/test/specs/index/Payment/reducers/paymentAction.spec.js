import { fromJS } from 'immutable';
import getPaymentActionReducer from 'index/Payment/reducers/paymentAction';
import { PAY_NOW_KEY } from 'index/Payment/consts/paymentActionTypesOnModification';
import { PAYMENTACTIONS_UPDATE_PAYMENT_TYPE_ON_MODIFICATION } from 'index/Payment/consts/actionTypes';
import { allowModifyPaymentPlan, isPaymentActionValid } from "../../../../../src/index/Payment/reducers";

const reducer = getPaymentActionReducer(__payment__.__initialState__);

jest.mock('index/Payment/reducers/index', () => ({
  isPaymentActionValid: true,
  allowModifyPaymentPlan: true
}));

describe('index/Payment/reducers/paymentAction', () => {
  it('PAYMENTACTIONS_UPDATE_PAYMENT_TYPE_ON_MODIFICATION should work fine', () => {
    const state = reducer(fromJS({}), {
      type: PAYMENTACTIONS_UPDATE_PAYMENT_TYPE_ON_MODIFICATION,
      payload: { paymentActionType: PAY_NOW_KEY }
    });
    expect(state.get('paymentActionType')).toEqual(PAY_NOW_KEY);
    expect(state.get('isSelectModifyPaymentPlan')).toBeFalsy();
    expect(state.get('isSelectMakeAPayment')).toBeTruthy();
  });
});
