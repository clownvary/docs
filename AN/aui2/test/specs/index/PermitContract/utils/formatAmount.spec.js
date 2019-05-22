import formatAmount from 'index/PermitContract/utils/formatAmount';

it('method formatAmount works fine', () => {
  const fee_1 = 0;
  const fee_2 = -1;
  const fee_3 = -3333.44;
  const fee_4 = '888';
  const fee_5 = 99999.999;
  const invalid_fee = null;

  expect(formatAmount(fee_1)).toEqual('$0.00');
  expect(formatAmount(fee_2)).toEqual('-$1.00');
  expect(formatAmount(fee_3)).toEqual('-$3,333.44');
  expect(formatAmount(fee_4)).toEqual('$888.00');
  expect(formatAmount(fee_5)).toEqual('$100,000.00');

  expect(formatAmount(invalid_fee)).toEqual('');
});
