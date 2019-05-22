import Validation from 'src/services/validation';
import RuleDefs from 'src/services/validation/RuleDefs';


describe('Validation Service', () => {
  it('require works fine', () => {
    const rules = 'required';
    let result = Validation.validate('First name', '', rules);
    expect(result.isValid).toEqual(false);
    expect(result.message).toEqual('First name is required.');

    result = Validation.validate('First name', 'James', rules);
    expect(result.isValid).toEqual(true);
  });

  it('maxLength works fine', () => {
    const rules = 'required|maxLength:8';
    let result = Validation.validate('Address', '', rules);
    expect(result.isValid).toEqual(false);
    expect(result.message).toEqual('Address is required.');

    result = Validation.validate('Address', 'Fort', rules);
    expect(result.isValid).toEqual(true);

    result = Validation.validate('Address', 'Fort Qu Applele', rules);
    expect(result.isValid).toEqual(false);
    expect(result.message).toEqual('Address has maximum length 8.');
  });

  it('minLength works fine', () => {
    const rules = 'required|minLength:4';
    let result = Validation.validate('Password', '', rules);
    expect(result.isValid).toEqual(false);
    expect(result.message).toEqual('Password is required.');

    result = Validation.validate('Password', 'safari', rules);
    expect(result.isValid).toEqual(true);

    result = Validation.validate('Password', 'sam', rules);
    expect(result.isValid).toEqual(false);
    expect(result.message).toEqual('Password has minimal length 4.');
  });

  it('max works fine on numeric', () => {
    const rules = 'required|max:10';
    let result = Validation.validate('Attendee', '', rules);
    expect(result.isValid).toEqual(false);
    expect(result.message).toEqual('Attendee is required.');

    result = Validation.validate('Attendee', '6', rules);
    expect(result.isValid).toEqual(true);

    result = Validation.validate('Attendee', '12', rules);
    expect(result.isValid).toEqual(false);
    expect(result.message).toEqual('Attendee has the maximum limitation 10.');
  });

  it('min works fine on numeric', () => {
    const rules = 'required|min:4';
    let result = Validation.validate('Attendee', '', rules);
    expect(result.isValid).toEqual(false);
    expect(result.message).toEqual('Attendee is required.');

    result = Validation.validate('Attendee', '6', rules);
    expect(result.isValid).toEqual(true);

    result = Validation.validate('Attendee', '3', rules);
    expect(result.isValid).toEqual(false);
    expect(result.message).toEqual('Attendee has the minimal limitation 4.');
  });

  it('max works fine on date', () => {
    const rules = 'required|max:2017-12-24@date';
    let result = Validation.validate('Start date', '', rules);
    expect(result.isValid).toEqual(false);
    expect(result.message).toEqual('Start date is required.');

    result = Validation.validate('Start date', new Date('2017/12/21'), rules);
    expect(result.isValid).toEqual(true);

    result = Validation.validate('Start date', new Date('2017/12/26'), rules);
    expect(result.isValid).toEqual(false);
    expect(result.message).toEqual('Start date has the maximum limitation 2017-12-24.');
  });

  it('min works fine on date', () => {
    const rules = 'required|min:2017-12-24@date';
    let result = Validation.validate('Start date', '', rules);
    expect(result.isValid).toEqual(false);
    expect(result.message).toEqual('Start date is required.');

    result = Validation.validate('Start date', new Date('2017/12/24'), rules);
    expect(result.isValid).toEqual(true);

    result = Validation.validate('Start date', new Date('2017/12/21'), rules);
    expect(result.isValid).toEqual(false);
    expect(result.message).toEqual('Start date has the minimal limitation 2017-12-24.');
  });

  it('digits works fine', () => {
    const rules = 'digits';
    let result = Validation.validate('SSN', '1234', rules);
    expect(result.isValid).toEqual(true);

    result = Validation.validate('SSN', '123.45', rules);
    expect(result.isValid).toEqual(false);
    expect(result.message).toEqual('SSN only accepts digit characters.');
  });

  it('zipcode works fine', () => {
    const rules = 'zipcode:US';
    let result = Validation.validate('Zip code', 'a1234', rules);
    expect(result.isValid).toEqual(false);
    expect(result.message).toEqual('Zip code contains invalid postal code.');

    result = Validation.validate('Zip code', '1234', rules);
    expect(result.isValid).toEqual(false);
    expect(result.message).toEqual('Zip code contains invalid postal code.');

    result = Validation.validate('Zip code', '12345-6789', rules);
    expect(result.isValid).toEqual(true);
  });

  it('alpha works fine', () => {
    const rules = 'alpha';
    let result = Validation.validate('Name', '1', rules);
    expect(result.isValid).toBe(false);
    expect(result.message).toBe('Name must only contain alphabetical characters.');

    result = Validation.validate('Name', 'TestName', rules);
    expect(result.isValid).toBe(true);
  });

  it('digits works fine', () => {
    const rules = 'digits';
    let result = Validation.validate('Number', 'a', rules);
    expect(result.isValid).toBe(false);
    expect(result.message).toBe('Number only accepts digit characters.');

    result = Validation.validate('Name', '123', rules);
    expect(result.isValid).toBe(true);
  });

  it('RuleDefs works fine', () => {
    expect(RuleDefs.has('min')).toEqual(true);
    expect(RuleDefs.has('custom')).toEqual(false);

    RuleDefs.register('custom', () => {}, 'This is a test');
    expect(RuleDefs.has('custom')).toEqual(true);
    const customRule = RuleDefs.get('custom');
    expect(customRule.message).toEqual('This is a test');
    Validation.clearRules('custom');
    expect(RuleDefs.has('custom')).toBe(false);
  });

  it('Validator works fine', () => {
    const rules = 'required|maxLength:8';
    const validator = Validation.createValidator(rules);
    let result = validator.validate('Address', '');
    expect(result.isValid).toEqual(false);
    expect(result.message).toEqual('Address is required.');

    result = validator.validate('Address', 'Fort');
    expect(result.isValid).toEqual(true);

    result = validator.validate('Address', 'Fort Qu Applele');
    expect(result.isValid).toEqual(false);
    expect(result.message).toEqual('Address has maximum length 8.');
  });

  it('Register regEx rule works fine', () => {
    const reg = /^\d{5}(-\d{4})?$/;
    Validation.registerRule('zipcode2', reg, 'Incorrect zip code.');

    const rules = 'required|zipcode2';
    const validator = Validation.createValidator(rules);
    let result = validator.validate('Zipcode', '');
    expect(result.isValid).toEqual(false);
    expect(result.message).toEqual('Zipcode is required.');

    result = validator.validate('Zipcode', 'abc');
    expect(result.isValid).toEqual(false);
    expect(result.message).toEqual('Incorrect zip code.');

    result = validator.validate('Zipcode', '12345-6789');
    expect(result.isValid).toEqual(true);
  });

  it('Register function rule works fine', () => {
    const validate = value => value === 'Male' || value === 'Female';

    Validation.registerRule('gender', validate, 'Incorrect gender value.');

    const rules = 'required|gender';
    const validator = Validation.createValidator(rules);

    let result = validator.validate('Gender', 'Man');
    expect(result.isValid).toEqual(false);
    expect(result.message).toEqual('Incorrect gender value.');

    result = validator.validate('Gender', 'Male');
    expect(result.isValid).toEqual(true);
  });

  it('Register function rule with params works fine', () => {
    const validate = (value, param = 18) => value >= param;

    Validation.registerRule('adult', validate, 'Only adult is permited.');

    const rules = 'required|adult:20@number';
    const validator = Validation.createValidator(rules);

    let result = validator.validate('Age', 18);
    expect(result.isValid).toEqual(false);
    expect(result.message).toEqual('Only adult is permited.');

    result = validator.validate('Age', 22);
    expect(result.isValid).toEqual(true);
  });

  it('Add rule in validator works fine', () => {
    const rules = 'required|maxLength:8';
    const validator = Validation.createValidator(rules);

    let result = validator.validate('Address', 'Fort');
    expect(result.isValid).toEqual(true);

    validator.addRule('contains', value => value.indexOf('Rd.') >= 0, 'Is it a road?');

    result = validator.validate('Address', 'Fort');
    expect(result.isValid).toEqual(false);
    expect(result.message).toEqual('Is it a road?');

    result = validator.validate('Address', 'Rd. Fort');
    expect(result.isValid).toEqual(true);
  });

  it('Register custom error map works fine', () => {
    const messages = {
      required: {
        short: 'Required',
        long: 'This is a must given field.'
      }
    };
    Validation.registerErrorMessages(messages);
    const rules = 'required';
    const validator = Validation.createValidator(rules);
    const result = validator.validate('Address', '');
    expect(result.isValid).toEqual(false);
    expect(result.message.long).toEqual(messages.required.long);
  });

  it('empty rules works fine', () => {
    let result = Validation.validate('Other');
    expect(result.isValid).toBe(true);

    result = Validation.validate('Other', 'any value 123 should be valid');
    expect(result.isValid).toBe(true);
  });

  it('throws error while validation field', () => {
    const rules = {};
    try {
      Validation.validate('Object Rule', 'any value', rules);
    } catch (e) {
      expect(e.message).toBe('Validation failed');
    }
  });
});
