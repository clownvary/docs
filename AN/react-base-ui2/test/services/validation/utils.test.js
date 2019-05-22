import getLength from 'src/services/validation/utils/getLength';
import compare from 'src/services/validation/utils/compare';
import * as DataType from 'src/services/validation/consts/DataType';
import * as Operator from 'src/services/validation/consts/Operator';

describe('services/validation/utils', () => {
  test('compare numbers', () => {
    expect(compare(1, 2)).toBe(false);
    expect(compare(1, '2')).toBe(false);
    expect(compare(1, 2, Operator.LESS)).toBe(true);
    expect(compare(1, 2, Operator.LESS_OR_EQUAL)).toBe(true);
    expect(compare(1, 2, Operator.GREATER)).toBe(false);
    expect(compare(1, 2, Operator.GREATER_OR_EQUAL)).toBe(false);

    try {
      compare(1, 'a');
    } catch (e) {
      expect(e.message).toBe('Validation can not convert to number');
    }

    try {
      compare(1, 2, 'unknown operator');
    } catch (e) {
      expect(e.message).toBe('Validation comparation needs operator');
    }
  });

  test('compare datetimes', () => {
    const d1 = '2018-01-01T00:00:00';
    const d2 = '2018-01-02T00:00:00';

    expect(compare(d1, d2, Operator.EQUAL, DataType.DATE)).toBe(false);
    expect(compare(d1, d2, Operator.LESS, DataType.DATETIME)).toBe(true);
    expect(compare(d1, d2, Operator.LESS_OR_EQUAL, DataType.DATETIME)).toBe(true);
    expect(compare(d1, d2, Operator.GREATER, DataType.DATETIME)).toBe(false);
    expect(compare(d1, d2, Operator.GREATER_OR_EQUAL, DataType.DATETIME)).toBe(false);

    try {
      compare(d1, 'invalid datetime', Operator.GREATER_OR_EQUAL, DataType.DATETIME);
    } catch (e) {
      expect(e.message).toBe('Validation can not convert to date');
    }

    try {
      compare(d1, d2, 'unknown operator', DataType.DATETIME);
    } catch (e) {
      expect(e.message).toBe('Validation comparation needs operator');
    }
  });

  test('compare times', () => {
    const t1 = '2018-01-01T00:00:00';
    const t2 = '2018-01-01T00:00:01';

    expect(compare(t1, t2, Operator.EQUAL, DataType.TIME)).toBe(false);
    expect(compare(t1, t2, Operator.LESS, DataType.TIME)).toBe(true);
    expect(compare(t1, t2, Operator.LESS_OR_EQUAL, DataType.TIME)).toBe(true);
    expect(compare(t1, t2, Operator.GREATER, DataType.TIME)).toBe(false);
    expect(compare(t1, t2, Operator.GREATER_OR_EQUAL, DataType.TIME)).toBe(false);

    try {
      compare(t1, 'invalid datetime', Operator.GREATER_OR_EQUAL, DataType.TIME);
    } catch (e) {
      expect(e.message).toBe('Validation can not convert to time');
    }

    try {
      compare(t1, t2, 'unknown operator', DataType.TIME);
    } catch (e) {
      expect(e.message).toBe('Validation comparation needs operator');
    }
  });

  test('compare misc', () => {
    try {
      compare(1, 2, Operator.EQUAL, 'unknown type');
    } catch (e) {
      expect(e.message).toBe('Validation type not supported');
    }
  });

  test('getLength', () => {
    expect(getLength([])).toBe(0);
    expect(getLength(0)).toBe(0);
  });
});
