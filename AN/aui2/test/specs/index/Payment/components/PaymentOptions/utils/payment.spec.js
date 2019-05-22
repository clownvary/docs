import {
  getTotalAssignExceptKey,
  getTotal,
  getTotalAssign,
  getDefaultAmount,
  getRemaining,
  getPrevRemaining
} from 'index/Payment/components/PaymentOptions/utils/payment';

jest.mock('index/Payment/utils/splitOptions', () => ({
  getFormatAmount: jest.fn((option, val) => val)
}));

jest.mock('index/Payment/store', () => {
  const configuareStore = require('redux-mock-store');
  const { fromJS } = require('immutable');
  return configuareStore()({
    paymentOptions: {
      options: fromJS({
        data: [
          { activeVal: 0 },
          { activeVal: 100 },
          { activeVal: 200 },
          { activeVal: 300 },
          { activeVal: 500 }
        ]
      })
    },
    payment: fromJS({
      isPaymentActionValid: true,
      payNow: 1050,
      remaining: 130
    })
  });
});

describe('index/Payment/components/PaymentOptions/utils/payment', () => {
  it('method getTotalAssignExceptKey should work fine', () => {
    expect(getTotalAssignExceptKey(0)).toEqual(1100);
    expect(getTotalAssignExceptKey(3)).toEqual(800);
  });

  it('method getTotalAssign should work fine', () => {
    expect(getTotalAssign(2, 300)).toEqual(1200);
  });

  it('method getDefaultAmount should work fine', () => {
    expect(getDefaultAmount(0)).toEqual('-50.00');
  });

  it('method getRemaining should work fine', () => {
    expect(getRemaining(0)).toEqual(-50);
    expect(getRemaining(1, 50)).toEqual({ remaining: '0.00' });
  });

  it('method getPrevRemaining should work fine', () => {
    expect(getPrevRemaining()).toEqual(130);
  });
});
