import * as RuleName from 'react-base-ui/lib/services/validation/consts/RuleName';

const CustomErrorKey = {
  ...RuleName,

  ZIP_CODE_US_INVALID_CHARACTER: 'zipcode_us_invalidcharacter',
  ZIP_CODE_US_INCORRECT_NUMBER: 'zipcode_us_incorrectnumber',
  ZIP_CODE_CA_INVALID: 'zipcode_ca_invalid',
  ZIP_CODE_CA_TOO_LONG: 'zipcode_ca_toolong',

  PHONE_WHOLE_NUMBER_AREACODE: 'phone_wholenumber_areacode',
  PHONE_WHOLE_NUMBER_EXTNUMBER: 'phone_wholenumber_extnumber',
  PHONE_MISSING_AREACODE: 'phone_missing_areacode',
  PHONE_MISSING_PHONENUMBER: 'phone_missing_phonenumber',
  PHONE_AREACODE_3: 'phone_areacode_3',
  PHONE_AREACODE_2: 'phone_areacode_2',
  PHONE_INVALID_CHARACTERS: 'phone_invalid_characters',
  PHONE_MUST_7: 'phone_must_7',
  PHONE_MUST_10: 'phone_must_10',
  PHONE_MUST_8: 'phone_must_8',
  PHONE_MUST_11: 'phone_must_11',
  PHONE_MUST_20: 'phone_must_20',

  SSN_INVALID_CHARACTERS: 'ssn_invalid_characters',
  SSN_LONG: 'ssn_long'
};

const ShortErrorMessage = {
  [CustomErrorKey.ALPHA]: 'Must only contain alphabetical characters.',
  [CustomErrorKey.DIGITS]: 'Must contain an integer.',
  [CustomErrorKey.EMAIL]: 'Must contain a valid email address.',
  [CustomErrorKey.IP]: 'Must contain a valid IP.',
  [CustomErrorKey.MAX_LENGTH]: 'Must not exceed {maxLength} characters in length.',
  [CustomErrorKey.REQUIRED]: 'Required',

  [CustomErrorKey.ZIP_CODE_US_INVALID_CHARACTER]: 'Contains invalid character in zip code.',
  [CustomErrorKey.ZIP_CODE_US_INCORRECT_NUMBER]: 'Contains an incorrect number of digits.',
  [CustomErrorKey.ZIP_CODE_CA_INVALID]: 'Contains invalid postal code.',
  [CustomErrorKey.ZIP_CODE_CA_TOO_LONG]: 'Too long.',

  [CustomErrorKey.PHONE_WHOLE_NUMBER_AREACODE]: 'Must be a whole number (Area code).',
  [CustomErrorKey.PHONE_WHOLE_NUMBER_EXTNUMBER]: 'Must be a whole number (Ext number).',
  [CustomErrorKey.PHONE_MISSING_AREACODE]: 'Missing the area code.',
  [CustomErrorKey.PHONE_MISSING_PHONENUMBER]: 'Missing the phone number.',
  [CustomErrorKey.PHONE_AREACODE_3]: 'Not 3-digits (Area code).',
  [CustomErrorKey.PHONE_AREACODE_2]: 'Not 2-digits (Area code).',
  [CustomErrorKey.PHONE_INVALID_CHARACTERS]: 'Contains invalid characters.',
  [CustomErrorKey.PHONE_MUST_7]: 'Must be 7 digits.',
  [CustomErrorKey.PHONE_MUST_10]: 'Must be 10 digits.',
  [CustomErrorKey.PHONE_MUST_8]: 'Must be 8 digits.',
  [CustomErrorKey.PHONE_MUST_11]: 'Must be smaller than 11 digits.',
  [CustomErrorKey.PHONE_MUST_20]: 'Must be smaller than 20 digits.',

  [CustomErrorKey.SSN_INVALID_CHARACTERS]: 'Contains invalid characters.',
  [CustomErrorKey.SSN_LONG]: 'Should not be longer than {ssnValidLength} digits.'
};

const ErrorMessage = {
  [CustomErrorKey.ALPHA]: '{name} must only contain alphabetical characters.',
  [CustomErrorKey.DIGITS]: '{name} must contain an integer.',
  [CustomErrorKey.EMAIL]: '{name} must contain a valid email address.',
  [CustomErrorKey.IP]: '{name} must contain a valid IP.',
  [CustomErrorKey.MAX_LENGTH]: '{name} must not exceed {maxLength} characters in length.',
  [CustomErrorKey.REQUIRED]: '"{name}" answer is required.',

  [CustomErrorKey.ZIP_CODE_US_INVALID_CHARACTER]: '{name} contains invalid character in zip code.',
  [CustomErrorKey.ZIP_CODE_US_INCORRECT_NUMBER]: '{name} contains an incorrect number of digits.',
  [CustomErrorKey.ZIP_CODE_CA_INVALID]: '{name} contains invalid postal code.',
  [CustomErrorKey.ZIP_CODE_CA_TOO_LONG]: '{name} is too long.',

  [CustomErrorKey.PHONE_WHOLE_NUMBER_AREACODE]: '{name} must be a whole number (Area code).',
  [CustomErrorKey.PHONE_WHOLE_NUMBER_EXTNUMBER]: '{name} must be a whole number (Ext number).',
  [CustomErrorKey.PHONE_MISSING_AREACODE]: '{name} is missing the area code.',
  [CustomErrorKey.PHONE_MISSING_PHONENUMBER]: '{name} is missing the phone number.',
  [CustomErrorKey.PHONE_AREACODE_3]: '{name} is not 3-digits (Area code).',
  [CustomErrorKey.PHONE_AREACODE_2]: '{name} is not 2-digits (Area code).',
  [CustomErrorKey.PHONE_INVALID_CHARACTERS]: '{name} contains invalid characters.',
  [CustomErrorKey.PHONE_MUST_7]: '{name} must be 7 digits.',
  [CustomErrorKey.PHONE_MUST_10]: '{name} must be 10 digits.',
  [CustomErrorKey.PHONE_MUST_8]: '{name} must be 8 digits.',
  [CustomErrorKey.PHONE_MUST_11]: '{name} must be smaller than 11 digits.',
  [CustomErrorKey.PHONE_MUST_20]: '{name} must be smaller than 20 digits.',

  [CustomErrorKey.SSN_INVALID_CHARACTERS]: '{name} contains invalid characters.',
  [CustomErrorKey.SSN_LONG]: '{name} should not be longer than {ssnValidLength} digits.'
};

export default {
  CustomErrorKey,

  ShortErrorMessage,
  ErrorMessage
};
