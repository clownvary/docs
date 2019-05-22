import NumericHelper from 'src/utils/NumericHelper';
import Globalize from 'src/services/i18n/Globalize';
import * as NumericType from 'src/consts/NumericType';

describe('utils/numericHelper', () => {
  it('toFixedString works fine', () => {
    expect(NumericHelper.toFixedString(12)).toEqual('12.00');
    expect(NumericHelper.toFixedString(12.3)).toEqual('12.30');
    expect(NumericHelper.toFixedString(12.34)).toEqual('12.34');
    expect(NumericHelper.toFixedString(12.345)).toEqual('12.35');

    expect(NumericHelper.toFixedString(12.345, false)).toEqual('12.34');
    expect(NumericHelper.toFixedString(12.34567890123, -1)).toEqual('12.34567890123');
  });
  it('toFixedFloat should work fine', () => {
    expect(NumericHelper.toFixedFloat(1.35, 1)).toEqual(1.4);
    expect(NumericHelper.toFixedFloat(1.335, 2)).toEqual(1.34);
    expect(NumericHelper.toFixedFloat(1.3335, 3)).toEqual(1.334);
    expect(NumericHelper.toFixedFloat(1.33335, 4)).toEqual(1.3334);
    expect(NumericHelper.toFixedFloat(1.333335, 5)).toEqual(1.33334);

    expect(NumericHelper.toFixedFloat(1.3, 2)).toEqual(1.30);
    expect(NumericHelper.toFixedFloat(1.35, 3)).toEqual(1.350);
    expect(NumericHelper.toFixedFloat(1.334, 4)).toEqual(1.3340);
  });
  it('applySymbols should work fine', () => {
    const percentContext = Globalize.getNumericContext(NumericType.PERCENT);
    percentContext.percentSymbol = null;
    const result = NumericHelper.applySymbols('123', percentContext);
    expect(result).toEqual('123 %');

    const result2 = NumericHelper.applySymbols('123', percentContext, true);
    expect(result2).toEqual('-123 %');

    percentContext.percentSymbol = 'xx';
    const result3 = NumericHelper.applySymbols('123', percentContext);
    expect(result3).toEqual('123 xx');

    const result4 = NumericHelper.applySymbols('123', percentContext, true);
    expect(result4).toEqual('-123 xx');

    const currencyContext = Globalize.getNumericContext(NumericType.CURRENCY);
    currencyContext.currencySymbol = null;
    const result5 = NumericHelper.applySymbols('123', currencyContext);
    expect(result5).toEqual('$123');

    const result6 = NumericHelper.applySymbols('123', currencyContext, true);
    expect(result6).toEqual('-$123');

    currencyContext.currencySymbol = 'yy';
    const result7 = NumericHelper.applySymbols('123', currencyContext);
    expect(result7).toEqual('yy123');

    const result8 = NumericHelper.applySymbols('123', currencyContext, true);
    expect(result8).toEqual('-yy123');
  });
  it('stripSymbols should work fine', () => {
    const result = NumericHelper.stripSymbols('12.2');
    expect(result).toEqual('12.2');

    const decimalContext = Globalize.getNumericContext(NumericType.DECIMAL);
    const result1 = NumericHelper.stripSymbols('test.45', decimalContext);
    expect(result1).toEqual('.45');

    const result2 = NumericHelper.stripSymbols('12.45', decimalContext);
    expect(result2).toEqual('12.45');
  });

  it('isZero should work fine', () => {
    const result = NumericHelper.isZero('12.2');
    expect(result).toBeFalsy();

    const result1 = NumericHelper.isZero('0');
    expect(result1).toBeTruthy();

    const result2 = NumericHelper.isZero();
    expect(result2).toBeTruthy();
  });

  it('isNegative should work fine', () => {
    const result = NumericHelper.isNegative('12.2');
    expect(result).toBeFalsy();

    const result1 = NumericHelper.isNegative('0');
    expect(result1).toBeFalsy();

    const result2 = NumericHelper.isNegative(-2);
    expect(result2).toBeTruthy();

    const result3 = NumericHelper.isNegative('-2');
    expect(result3).toBeTruthy();
  });

  it('getDecimalPos should work fine', () => {
    const decimalContext = Globalize.getNumericContext(NumericType.DECIMAL);
    const result = NumericHelper.getDecimalPos('12.32', decimalContext);
    expect(result).toEqual(2);

    decimalContext.decimalSep = null;
    const result2 = NumericHelper.getDecimalPos('123.32', decimalContext);
    expect(result2).toEqual(3);

    decimalContext.decimalSep = '!';
    const result3 = NumericHelper.getDecimalPos('12.332', decimalContext);
    expect(result3).toEqual(2);

    decimalContext.decimalSep = '.';
    const result4 = NumericHelper.getDecimalPos('12332', decimalContext);
    expect(result4).toEqual(5);
  });

  it('removeLeadingZero should work fine', () => {
    expect(NumericHelper.removeLeadingZero(12032.000)).toEqual('12032');
    expect(NumericHelper.removeLeadingZero(12032.0003)).toEqual('12032.0003');
  });
});
