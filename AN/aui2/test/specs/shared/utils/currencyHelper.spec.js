import {
  formatCurrency,
  fixedMoney,
  fixedMoneyString
} from 'shared/utils/currencyHelper';

describe('shared/utils/currencyHelper', () => {
  test('formatCurrency method should work fine', () => {
    const money = 10.223;
    const result = formatCurrency(money);
    expect(result).toEqual('$10.22');
  });

  test('formatCurrency method should work fine, if money is < 0', () => {
    const money = -10.223;
    const result = formatCurrency(money);
    expect(result).toEqual('-$10.22');
  });

  test('fixedMoney method should work fine', () => {
    const money = 10.223;
    const result = fixedMoney(money);
    expect(result).toEqual(10.22);
  });

  test('fixedMoney method should work fine, if money is NaN', () => {
    const money = NaN;
    const result = fixedMoney(money);
    expect(result).toEqual(0);
  });

  test('fixedMoneyString method should work fine', () => {
    const money = 10.223;
    const result = fixedMoneyString(money);
    expect(result).toEqual('10.22');
  });

  test('fixedMoneyString method should work fine, if money is NaN', () => {
    const money = NaN;
    const result = fixedMoneyString(money);
    expect(result).toEqual('0.00');
  });
});
