import {
  getPureNumber,
  formatCardNumber
} from 'shared/utils/formatNumber';

describe('shared/utils/formatNumber', () => {
  test('getPureNumber method should work fine', () => {
    const number = 'f123';
    const result = getPureNumber(number);
    expect(result).toEqual('123');
  });

  test('formatCardNumber method should work fine', () => {
    const number = '123456';
    const result = formatCardNumber(number);
    expect(result).toEqual('1234 56');
  });

  test('formatCardNumber method should work fine, if cardNumber.length < maxLength', () => {
    const number = '123456';
    const result = formatCardNumber(number, 8);
    expect(result).toEqual('1234 56');
  });

  test('formatCardNumber method should work fine, if cardNumber.length > maxLength and maxLength <= 4', () => {
    const number = '123456';
    const result = formatCardNumber(number, 4);
    expect(result).toEqual('1234');
  });
});
