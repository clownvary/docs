import { fromJS } from 'immutable';
import getPaymentSummaryReducer from 'index/Payment/reducers/paymentSummary';

const reducer = getPaymentSummaryReducer(__payment__.__initialState__);

describe('index/Payment/reducers/paymentSummary', () => {
  it('Return the expected initial state', () => {
    const expectState = fromJS({
      totalAmount: '10.00',
      paidAmount: '5.00',
      balanceAmount: '5.00',
      hasBalance: true,
      hasPayments: true,
      payers: [{ payerName: 'Flora', paidAmount: 5 }],
      refunds: [{ payerName: 'Flora', paidAmount: 5 }],
      totalBalanceAmount: undefined,
    });
    const state = reducer(undefined, {});
    expect(state).toEqual(expectState);
  });
});
