import {
  isArray,
  isPlainObject,
  isString,
  compareArr,
  isArrEqual,
  deepMerge,
  deleteCharactorInStr,
  allowMoneyAcountOnly,
  validateThenResetAmountOfPayment,
  randomUUID,
  deserializeJson,
  newWindow,
  getUrlParam,
  filterBy,
  cls
} from 'shared/utils/func';

describe('shared/utils/func', () => {
  test('isArray method should work fine', () => {
    const result = isArray();
    expect(result).toEqual(false);
  });

  test('isPlainObject method should work fine', () => {
    const obj = {};
    const result = isPlainObject(obj);
    expect(result).toEqual(true);
  });

  test('isString method should work fine', () => {
    const testString = 'test';
    const result = isString(testString);
    expect(result).toEqual(true);
  });

  test('isArrEqual method should work fine', () => {
    const a = ['monkey'];
    const b = ['monkey'];
    const result = isArrEqual(a, b);
    expect(result).toEqual(true);
  });

  test('isArrEqual method should work fine, two datas are difference', () => {
    const a = ['monkey'];
    const b = ['dog'];
    const result = isArrEqual(a, b);
    expect(result).toEqual(false);
  });

  test('isArrEqual method should work fine, one of the data is empty array', () => {
    const a = ['monkey'];
    const result = isArrEqual(a, []);
    expect(result).toEqual(false);
  });

  test('deepMerge method should work fine', () => {
    const target = {
      name: 'monkey'
    };
    const sources = [{
      name: 'monkey'
    }];
    const result = deepMerge(target, ...sources);
    expect(result).toEqual({ name: 'monkey' });
  });

  test('deepMerge method should work fine, target is null', () => {
    const target = null;
    const sources = [{
      name: 'monkey'
    }];
    const result = deepMerge(target, ...sources);
    expect(result).toEqual(null);
  });

  test('deepMerge method should work fine, the type of the sources is string', () => {
    const target = {
      name: 'monkey'
    };
    const sources = ['monkey'];
    const result = deepMerge(target, ...sources);
    expect(result).toEqual({ name: 'monkey' });
  });

  test('deleteCharactorInStr method should work fine', () => {
    const str = 'monkey';
    const result = deleteCharactorInStr(str);
    expect(result).toEqual('');
  });

  test('allowMoneyAcountOnly method should work fine', () => {
    const str = 'monkey';
    const result = allowMoneyAcountOnly(str);
    expect(result).toEqual('');
  });

  test('validateThenResetAmountOfPayment method should work fine', () => {
    const e = {
      target: {
        value: '22...00'
      }
    };
    validateThenResetAmountOfPayment(e);
    expect(e.target.value).toEqual('22.00');
  });

  test('validateThenResetAmountOfPayment method should work fine', () => {
    const e = {
      target: {
        value: '22.00'
      }
    };
    validateThenResetAmountOfPayment(e);
    expect(e.target.value).toEqual('22.00');
  });

  test('randomUUID method should work fine', () => {
    const str = 'monkey';
    const result = randomUUID();
    const reg = /(\w{8}-\w{4}-4\w{3}-\w{4}-\w{12})/;
    expect(result.match(reg)).toBeTruthy();
  });

  test('deserializeJson method should work fine', () => {
    const data = {
      name: 'monkey'
    };
    const result = deserializeJson(data);
    expect(result).toEqual(data);
  });

  test('deserializeJson method should work fine, if the data is invalid', () => {
    const data = '';
    const result = deserializeJson(data);
    expect(result).toEqual('');
  });

  test('newWindow method should work fine', () => {
    const result = newWindow('');
  });

  test('getUrlParam method should work fine', () => {
    const param = 'id=2\nsaf';
    const result = getUrlParam('id');
    expect(result).toEqual(null);
  });

  test('getUrlParam method should work fine, if param is null', () => {
    const param = null;
    const result = getUrlParam(param);
    expect(result).toEqual(null);
  });

  test('filterBy method should work fine', () => {
    const obj = {
      name: 'monkey'
    };
    const prefix = 'name';
    const result = filterBy(obj, prefix);
    expect(result).toEqual(obj);
  });

  test('cls method should work fine', () => {
    const template = [{
      1: 'monkey'
    }, {
      2: 'dog'
    }];
    const expressions = [{
      name: 'monkey'
    }];
    const result = cls(template, ...expressions);
    expect(result).toBeTruthy();
  });
});
