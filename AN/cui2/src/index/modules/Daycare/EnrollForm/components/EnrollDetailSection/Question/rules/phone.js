import isString from 'lodash/isString';
import truncate from 'lodash/truncate';
import { ErrorMessage } from '../consts';

const checkPhone = phone => /[^\s.\-\d]/.test(phone);

/**
 * validate whether the phone is valid.
 * @param {string} areaVal user input for area code
 * @param {string} phoneVal user input for phone number
 * @param {string} extVal user input for ext number
 * @param {string} systemCountryCode system setting for country
 * @param {string} systemAreaCode system setting for area
 * @returns {string} empty means valid, otherwise, means invalid.
 */
const validatePhone = (areaVal, phoneVal, extVal, systemCountryCode) => {
  const phone = phoneVal || '';
  let ext = extVal || '';
  const area = areaVal || '';
  const countryCode = isString(systemCountryCode) ?
    truncate(systemCountryCode, { length: 2, omission: '' }) :
    '';

  if (countryCode === '' || countryCode === 'US' || countryCode === 'CA') {
    if (ext) {
      if (!/\d+/.test(ext)) {
        return ErrorMessage.CustomErrorKey.PHONE_WHOLE_NUMBER_EXTNUMBER;
      }

      if (ext.length === 4 && phone.length === 3) {
        ext = '';
      }
    }

    if (area.length === 0) {
      if (phone.length === 0) return '';

      return ErrorMessage.CustomErrorKey.PHONE_MISSING_AREACODE;
    }

    if (area.length !== 3) {
      return ErrorMessage.CustomErrorKey.PHONE_AREACODE_3;
    }

    if (!/\d+/.test(area)) {
      return ErrorMessage.CustomErrorKey.PHONE_WHOLE_NUMBER_AREACODE;
    }

    if (phone.length === 0) {
      return ErrorMessage.CustomErrorKey.PHONE_MISSING_PHONENUMBER;
    }

    if (checkPhone(phone)) {
      return ErrorMessage.CustomErrorKey.PHONE_INVALID_CHARACTERS;
    }

    if (phone.replace(/[^\d]/g, '').length !== 7) {
      return ErrorMessage.CustomErrorKey.PHONE_MUST_7;
    }
  } else if (countryCode === 'AU') {
    // If it's a cell phone number
    // We just need check phone value
    if (ext) {
      if (!/\d+/.test(ext)) {
        return ErrorMessage.CustomErrorKey.PHONE_WHOLE_NUMBER_EXTNUMBER;
      }

      if (ext.length === 4 && phone.length === 4) {
        ext = '';
      }
    }

    if (area.length === 0) {
      if (phone.length === 0) return '';
      return ErrorMessage.CustomErrorKey.PHONE_MISSING_AREACODE;
    }

    if (area.length !== 2) {
      return ErrorMessage.CustomErrorKey.PHONE_AREACODE_2;
    }

    if (!/\d+/.test(area)) {
      return ErrorMessage.CustomErrorKey.PHONE_WHOLE_NUMBER_AREACODE;
    }

    if (phone.length === 0) {
      return ErrorMessage.CustomErrorKey.PHONE_MISSING_PHONENUMBER;
    }

    if (checkPhone(phone)) {
      return ErrorMessage.CustomErrorKey.PHONE_INVALID_CHARACTERS;
    }

    if (phone.replace(/[^\d]/g, '').length !== 8) {
      return ErrorMessage.CustomErrorKey.PHONE_MUST_8;
    }
  } else if (countryCode === 'NZ') {
    // If it's a cell phone number
    // We just need check phone value
    if (ext) {
      if (!/\d+/.test(ext)) {
        return ErrorMessage.CustomErrorKey.PHONE_WHOLE_NUMBER_EXTNUMBER;
      }

      if (ext.length === 4 && phone.length === 4) {
        ext = '';
      }
    }

    if (area.length === 0) {
      if (phone.length === 0) return '';
      return ErrorMessage.CustomErrorKey.PHONE_MISSING_AREACODE;
    }
    if (area.length !== 2) {
      return ErrorMessage.CustomErrorKey.PHONE_AREACODE_2;
    }

    if (!/\d+/.test(area)) {
      return ErrorMessage.CustomErrorKey.PHONE_WHOLE_NUMBER_AREACODE;
    }

    if (phone.length === 0) {
      return ErrorMessage.CustomErrorKey.PHONE_MISSING_PHONENUMBER;
    }

    if (checkPhone(phone)) {
      return ErrorMessage.CustomErrorKey.PHONE_INVALID_CHARACTERS;
    }

    if (phone.replace(/[^\d]/g, '').length !== 7) {
      return ErrorMessage.CustomErrorKey.PHONE_MUST_7;
    }
  } else {
    if (phone.length === 0) return '';

    if (checkPhone(phone)) {
      return ErrorMessage.CustomErrorKey.PHONE_INVALID_CHARACTERS;
    }

    if (phone.replace(/[^\d]/g, '').length > 20) {
      return ErrorMessage.CustomErrorKey.PHONE_MUST_20;
    }

    if (ext && !/\d+/.test(ext)) {
      return ErrorMessage.CustomErrorKey.PHONE_WHOLE_NUMBER_EXTNUMBER;
    }
  }

  return '';
};

export default validatePhone;
