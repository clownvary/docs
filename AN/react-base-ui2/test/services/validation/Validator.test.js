import Validator from 'src/services/validation/Validator';

describe('src/services/validation/Validator.js', () => {
  let validator;
  let result;

  test('basic usage', () => {
    validator = new Validator('required|digits');

    result = validator.validate('field');
    expect(result.isValid).toBe(false);
    expect(result.message).toBe('field is required.');

    result = validator.validate('field', '');
    expect(result.isValid).toBe(false);
    expect(result.message).toBe('field is required.');

    result = validator.validate('field', 'a');
    expect(result.isValid).toBe(false);
    expect(result.message).toBe('field only accepts digit characters.');

    result = validator.validate('field', '1');
    expect(result.isValid).toBe(true);

    validator = new Validator('digits|min:2');
    result = validator.validate('field', '1');
    expect(result.isValid).toBe(false);
    expect(result.message).toBe('field has the minimal limitation 2.');

    result = validator.validate('field', '');
    expect(result.isValid).toBe(true);
    expect(result.message).toBe('');

    validator = new Validator('custom');
    expect(validator).toEqual({ ruleSet: [] });
  });

  test('manage rules on the fly', () => {
    validator = new Validator('required');

    expect(validator.getRuleCount()).toBe(1);
    expect(validator.findRule('required').validate).toBeDefined();

    validator.addRule('custom1', () => 'custom rule 1');
    expect(validator.getRuleCount()).toBe(2);
    expect(validator.findRule('custom1').validate).toBeDefined();

    validator.addRule('custom2', () => 'custom rule 2', 'message 2', 0);
    expect(validator.getRuleCount()).toBe(3);
    expect(validator.findRule('custom2').validate).toBeDefined();

    result = validator.validate('field', 'value');
    expect(result.isValid).toBe(false);

    validator.removeRule('custom2');
    result = validator.validate('field', 'value');
    expect(result.isValid).toBe(false);
    expect(result.message).toBe('');
  });
});
