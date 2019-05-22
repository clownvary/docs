import formatCharge, {
  formatFeeNumber
} from 'shared/utils/formatCharge';

it('shared -> utils -> formatCharge -> formatCharge', () => {
  const fee_1 = 0;
  const fee_2 = -1;
  const fee_3 = -3333.44;
  const fee_4 = 888;
  const fee_5 = 99999.999;

  expect(formatCharge(fee_1)).toEqual('$0.00');
  expect(formatCharge(fee_2)).toEqual('-$1.00');
  expect(formatCharge(fee_3)).toEqual('-$3333.44');
  expect(formatCharge(fee_4)).toEqual('$888.00');
  expect(formatCharge(fee_5)).toEqual('$100000.00');
  expect(formatCharge(null)).toEqual('');
});
