import getCalculatedChange from 'index/Payment/components/PaymentOptions/Cash/calculate';

describe('index/Payment/components/PaymentOptions/Cash/calculate', () => {
  it('method getCalculatedChange should round cash amount correctly', () => {
      const result1 = getCalculatedChange('500', '300');
      expect(result1).toEqual('200.00');

      const result2 = getCalculatedChange('233.333', '555.555');
      expect(result2).toEqual('0.00');
  });
});
