import getCreditCardReducer, { USE_NEW_CARD_ENTITY } from 'index/Payment/reducers/paymentOptions/creditCard';

const reducer = getCreditCardReducer(__payment__.__initialState__);

// blocked by index/Payment/components/PaymentOptions/utils/payment.js
// which should not import store to do changes
jest.mock('index/Payment/store', () => ({}));

describe('index/Payment/reducers/paymentOptions/creditCard', () => {
  it('initial reducer should work fine with new option', () => {
    const payload = { value: '1112', text: '8812#visa' };
    const state = reducer(undefined, {});
    expect(state.toJS()).toEqual({
      creditCardLabel: "Credit Card",
      defaultOtherNumber: "",
      isRefund: undefined
    });
  });
});
