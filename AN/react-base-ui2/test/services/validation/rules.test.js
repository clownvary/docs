import { maxLength, minLength, range, rangeLength, zipcode } from 'src/services/validation/rules';

describe('services/validation/rules', () => {
  test('maxLength/minLength', () => {
    try {
      maxLength.validateFunc(1, 'a');
    } catch (e) {
      expect(e.message).toBe('Invalid param');
    }

    try {
      minLength.validateFunc(1, 'a');
    } catch (e) {
      expect(e.message).toBe('Invalid param');
    }
  });

  test('range/rangeLength', () => {
    expect(range.validateFunc(2, [1, 3])).toBe(true);

    expect(rangeLength.validateFunc('abcdefg', [1, 3])).toBe(false);
  });

  test('zipcode', () => {
    expect(zipcode.validateFunc('94107')).toBe('');
    expect(zipcode.validateFunc('V5K 1A1', 'CA')).toBe('');
    expect(zipcode.validateFunc('V5K 1A111', 'CA')).toBe('{name} is too long');
    expect(zipcode.validateFunc('V5K AA1', 'CA')).toBe('{name} contains invalid postal code.');
    expect(zipcode.validateFunc('100000', 'China')).toBe('');
  });
});
