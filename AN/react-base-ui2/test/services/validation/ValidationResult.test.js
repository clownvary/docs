import Validation from 'src/services/validation';
import ValidationResult from 'src/services/validation/ValidationResult';
import rules from 'src/services/validation/rules';

let result;

describe('services/validation/ValidationResult.js', () => {
  test('basic usage', () => {
    result = new ValidationResult('test field');
    expect(result.isValid).toBe(true);
    expect(result.message).toBe('');

    result = new ValidationResult('test field', '', '', rules.required);
    expect(result.isValid).toBe(false);

    try {
      result = new ValidationResult();
    } catch (e) {
      expect(e.message).toBe('Name should not be empty!');
    }
  });

  test('messages', () => {
    Validation.registerErrorMessages({
      required: {
        long: 'This is a must given field.',
        short: 'Required'
      }
    });

    result = new ValidationResult('test field', 'test value', 'test error code', { message: 1 });
    expect(result.message).toBe('');

    result = new ValidationResult('test field', 'test value', '', { message: 'string error message' });
    expect(result.message).toBe('string error message');

    result = new ValidationResult('test field', 'test value', 'required', { });
    expect(result.message.long).toBe('This is a must given field.');
    expect(result.message.short).toBe('Required');

    Validation.registerErrorMessages({ edge: { test: 1 } });
    result = new ValidationResult('test field', 'test value', 'edge', {});
    expect(result.message.test).toBe(1);
  });
});
