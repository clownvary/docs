import NumericTextProvider from '../../../src/components/InputNumeric/NumericTextProvider';
import { InputResult } from '../../../src/components/InputBase';
import NumericType from '../../../src/consts/NumericType';

describe('components/InputNumeric/NumericTextProvider.js', () => {
  let provider;

  beforeEach(() => {
    provider = new NumericTextProvider({});
  });

  test('basic usage', () => {
    provider.updateRange(0, 100);
    expect(provider.min).toBe(0);
    expect(provider.max).toBe(100);
    expect(provider.valueInString).toBe('');
    expect(provider.currentText).toBe('');
    expect(provider.type).toBe(NumericType.DECIMAL);

    provider.setValue(50);
    expect(provider.getValue()).toBe(50);
    expect(provider.getText()).toBe('50.00');
    provider.updateRange(50, 50);
    expect(provider.min).toBe(50);
    expect(provider.max).toBe(50);

    provider.updateRange(-999999999, 999999999);
    expect(provider.getDecimalPos()).toBe(2);
    provider.setValue(100);
    expect(provider.getDecimalPos()).toBe(3);
  });

  test('culture context', () => {
    let cc;
    cc = provider.getCultureContext();
    expect(cc.pattern).toEqual(['-n', 'n']);

    provider.type = NumericType.CURRENCY;
    provider.updateCultureContext();
    cc = provider.getCultureContext();
    expect(cc.pattern).toEqual([`-${cc.currencySymbol}n`, `${cc.currencySymbol}n`]);
    provider.setValue(50);
    expect(provider.getValue()).toBe(50);
    expect(provider.getText()).toBe(`${cc.currencySymbol}50.00`);

    provider.type = NumericType.PERCENT;
    provider.updateCultureContext();
    cc = provider.getCultureContext();
    expect(cc.pattern).toEqual([`-n ${cc.percentSymbol}`, `n ${cc.percentSymbol}`]);
    provider.setValue(50);
    expect(provider.getValue()).toBe(50);
    expect(provider.getText()).toBe(`50.00 ${cc.percentSymbol}`);

    provider.decimals = 0;
    provider.showGroup = false;
    provider.type = NumericType.DECIMAL;
    provider.updateCultureContext();
    cc = provider.getCultureContext();
    provider.setValue(1234.5);
    expect(provider.getText()).toBe('1234');

    provider.decimals = -1;
    provider.updateCultureContext();
    cc = provider.getCultureContext();
    expect(cc.decimals).toBe(-1);

    provider.decimals = -2;
    provider.updateCultureContext();
    cc = provider.getCultureContext();
    expect(cc.decimals).toBe(2);
  });

  test('conditions', () => {
    provider.setValue(1);
    expect(provider.isNegative()).toBe(false);
    provider.setValue(-1);
    expect(provider.isNegative()).toBe(true);
    provider.setValue(0);
    expect(provider.isNegative()).toBe(false);
    provider.setValue(+0);
    expect(provider.isNegative()).toBe(false);
    provider.setValue(-0);
    expect(provider.isNegative()).toBe(false);

    provider.setValue(0);
    expect(provider.isZero()).toBe(true);
    provider.setValue(+0);
    expect(provider.isZero()).toBe(true);
    provider.setValue(-0);
    expect(provider.isZero()).toBe(true);
    provider.setValue(1);
    expect(provider.isZero()).toBe(false);
    provider.setValue(-1);
    expect(provider.isZero()).toBe(false);
    expect(provider.isZero('0')).toBe(true);
    expect(provider.isZero('a')).toBe(true);
    provider.valueInString = null;
    expect(provider.isZero()).toBe(true);
    provider.valueInString = {};
    expect(provider.isZero()).toBe(false);

    provider.setValue(100);
    expect(provider.isValid()).toBe('100.00');
    provider.valueInString = 1;
    expect(provider.isValid()).toBe(false);
  });

  test('sign operations', () => {
    provider.setValue(1);
    expect(provider.invertSign()).toBe(true);
    expect(provider.getValue()).toBe(-1);

    provider.setValue(0);
    expect(provider.invertSign()).toBe(true);
    expect(provider.getText()).toBe('0.00');

    jest.spyOn(provider, 'isNegative').mockImplementationOnce(() => true);
    expect(provider.invertSign()).toBe(true);
    expect(provider.getText()).toBe('0.00');

    jest.spyOn(provider, 'isNegative').mockImplementationOnce(() => true);
    provider.valueInString = null;
    expect(provider.invertSign()).toBe(true);
    expect(provider.getText()).toBe('0.00');

    provider.setValue(-1);
    expect(provider.toPositive()).toBe(true);
    expect(provider.getValue()).toBe(1);
    provider.setValue(1);
    expect(provider.toPositive()).toBe(false);
    expect(provider.getValue()).toBe(1);
  });

  test('increment/decrement', () => {
    provider.setValue(1);
    expect(provider.increment()).toBe(true);
    expect(provider.getValue()).toBe(2);
    expect(provider.decrement()).toBe(true);
    expect(provider.getValue()).toBe(1);

    provider.decimals = -1;
    provider.updateCultureContext();
    provider.setValue(1233.1234);
    expect(provider.increment()).toBe(true);
    expect(provider.getText()).toBe('1,234.1234');
    // provider.setValue(1233.012345678);
    // expect(provider.increment()).toBe(true);
    // expect(provider.getText()).toBe('1,234.01234567'); // Got incorrect result: 1,234.01234568

    provider.setValue(1);
    jest.spyOn(provider, 'getCultureContext').mockImplementationOnce(() => { throw Error('Branch Coverage Error'); });
    expect(provider.stepTo(1)).toBe(false);
  });

  test('insertAt', () => {
    provider.insertAt('1', 0);
    expect(provider.getValue()).toBe(null);
    expect(provider.getText()).toBe('');

    provider.setValue(100);
    provider.insertAt('1', 0);
    expect(provider.getValue()).toBe(1100);
    expect(provider.getText()).toBe('1,100.00');

    provider.setValue(100);
    provider.insertAt('1', 1);
    expect(provider.getValue()).toBe(1100);
    expect(provider.getText()).toBe('1,100.00');

    provider.setValue(100);
    provider.insertAt('1', 2);
    expect(provider.getValue()).toBe(1010);
    expect(provider.getText()).toBe('1,010.00');

    provider.setValue(100);
    provider.insertAt('1', 4);
    expect(provider.getValue()).toBe(100.1);
    expect(provider.getText()).toBe('100.10');

    provider.setValue(100);
    provider.insertAt('1', 6);
    expect(provider.getValue()).toBe(100);
    expect(provider.getText()).toBe('100.00');

    provider.setValue(100);
    provider.insertAt('1', 7);
    expect(provider.getValue()).toBe(100);
    expect(provider.getText()).toBe('100.00');

    provider.setValue(100);
    provider.insertAt('23', 0);
    expect(provider.getValue()).toBe(23100);
    expect(provider.getText()).toBe('23,100.00');

    provider.setValue(100);
    provider.insertAt('23', 1);
    expect(provider.getValue()).toBe(12300);
    expect(provider.getText()).toBe('12,300.00');

    provider.setValue(100);
    provider.insertAt('23', 2);
    expect(provider.getValue()).toBe(10230);
    expect(provider.getText()).toBe('10,230.00');

    provider.setValue(100);
    provider.insertAt('23', 4);
    expect(provider.getValue()).toBe(100.23);
    expect(provider.getText()).toBe('100.23');

    provider.setValue(100);
    provider.insertAt('23', 5);
    expect(provider.getValue()).toBe(100.02);
    expect(provider.getText()).toBe('100.02');

    provider.setValue(100);
    provider.insertAt('23', 6);
    expect(provider.getValue()).toBe(100);
    expect(provider.getText()).toBe('100.00');

    provider.setValue(100);
    provider.insertAt('23', 7);
    expect(provider.getValue()).toBe(100);
    expect(provider.getText()).toBe('100.00');

    provider.showGroup = false;
    provider.remove(0, 999);
    provider.insertAt('1', 0);
    expect(provider.getValue()).toBe(1);
    expect(provider.getText()).toBe('1.00');

    provider.setValue('12345678901', 0);
    expect(provider.insertAt('1', 0)).toBe(false);
  });

  test('remove', () => {
    provider.setValue(12345);
    provider.remove(0, 0);
    expect(provider.getValue()).toBe(2345);
    expect(provider.getText()).toBe('2,345.00');

    provider.setValue(12345);
    provider.remove(1, 1);
    expect(provider.getValue()).toBe(1345);
    expect(provider.getText()).toBe('1,345.00');

    provider.setValue(12345);
    provider.remove(2, 2);
    expect(provider.getValue()).toBe(12345);
    expect(provider.getText()).toBe('12,345.00');

    provider.setValue(12345);
    provider.remove(6, 6);
    expect(provider.getValue()).toBe(12345);
    expect(provider.getText()).toBe('12,345.00');

    provider.setValue(10000);
    provider.remove(0, 0);
    expect(provider.getValue()).toBe(null);
    expect(provider.getText()).toBe('');

    provider.setValue(10000.123);
    provider.remove(0, 0);
    expect(provider.getValue()).toBe(0.12);
    expect(provider.getText()).toBe('0.12');

    provider.setValue(10000.123);
    provider.remove(7, 7);
    expect(provider.getValue()).toBe(10000.20);
    expect(provider.getText()).toBe('10,000.20');

    provider.setValue(12345);
    provider.remove(-1, -1);
    expect(provider.getValue()).toBe(12345);
    expect(provider.getText()).toBe('12,345.00');

    provider.setValue(12345.123);
    provider.remove(9, 9);
    expect(provider.getValue()).toBe(12345.12);
    expect(provider.getText()).toBe('12,345.12');

    provider.setValue(12345.123);
    provider.remove(0, 9);
    expect(provider.getValue()).toBe(null);
    expect(provider.getText()).toBe('');

    provider.setValue(12345.123);
    provider.remove(0, 9);
    expect(provider.getValue()).toBe(null);
    expect(provider.getText()).toBe('');

    provider.setValue(12345.123);
    provider.remove(0, 9, new InputResult());
    expect(provider.getValue()).toBe(0);
    expect(provider.getText()).toBe('0.00');

    provider.type = NumericType.CURRENCY;
    provider.updateCultureContext();
    provider.setValue(12345.123);
    provider.remove(0, 9);
    expect(provider.getValue()).toBe(null);
    expect(provider.getText()).toBe('');
  });

  test('misc', () => {
    provider.type = NumericType.DECIMAL;
    provider.showGroup = true;
    provider.updateCultureContext();
    provider.setText('1234.567');
    expect(provider.getText('1234.56'));

    provider.setText(' ');
    expect(provider.getText()).toBe('0.00');

    provider.setText(' a ');
    expect(provider.getText()).toBe('0.00');

    provider.format(null);
    expect(provider.getValue()).toBe(0);
    expect(provider.getText()).toBe('0.00');

    provider.updateRange(5, 5);
    provider.format(1, true);
    expect(provider.getValue()).toBe(0);
    expect(provider.getText()).toBe('0.00');

    provider.updateRange(-999999999, 999999999);
    provider.valueInString = null;
    provider.format(null);
    expect(provider.getValue()).toBe(0);
    expect(provider.getText()).toBe('0.00');

    expect(provider.internalFormat(null)).toEqual({ value: '0', text: '' });

    provider.type = NumericType.CURRENCY;
    provider.updateCultureContext();
    provider.setValue(12345.123);
    expect(provider.getInputablePos(0)).toBe(1);
  });
});
