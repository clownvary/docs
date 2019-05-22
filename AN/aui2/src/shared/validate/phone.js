import { getCurrentInitState } from 'shared/utils/initStateHelper';

//* *****************************************************************
//
//  Validate a phone number
//
//* *****************************************************************

function leavePhone(areaCode, phone) {
  const initialState = getCurrentInitState();
  const localAreaCode = initialState.area_code;
  if (typeof (areaCode) === 'undefined') return '';
  if (phone.length === 0) {
    if (localAreaCode !== null && areaCode === localAreaCode) {
      return '';
    }
  }

  return areaCode;
}

function wholeNumber(field, msg, fieldName) {
  if (!/\d+/.test(field)) {
    return `${fieldName} must be a whole number (${msg}).`;
  }
  return '';
}

export default function validatePhone(area, phoneVal, extVal, fieldName, countryCodeVal) {
  const phone = phoneVal || '';
  let ext = extVal || '';
  let countryCode = countryCodeVal || '';
  let isNumber = '';
  leavePhone(area, phone);

  let numberDigits = 0;

  if (typeof (countryCode) === 'undefined') countryCode = '';
  if (countryCode.length > 2) countryCode = countryCode.substring(countryCode.length - 2);
  if (countryCode === '' || countryCode === 'US' || countryCode === 'CA') {
    if (ext) {
      isNumber = wholeNumber(ext, 'Ext number', fieldName);
      if (isNumber === '') {
        if (ext.length === 4 && phone.length === 3) {
          ext = '';
        }
      } else {
        return isNumber;
      }
    }

    if (area.length === 0) {
      if (phone.length === 0) return '';
      return `${fieldName} is missing the area code.`;
    }
    if (area.length !== 3) {
      return `${fieldName} is not 3-digits (Area code).`;
    }

    isNumber = wholeNumber(area, ' Area code', fieldName);
    if (isNumber !== '') return isNumber;
    if (phone.length === 0) {
      return `${fieldName} is missing phone number.`;
    }

    // var numberDigits = 0;
    for (let i = 0; i < phone.length; i += 1) {
      const c = phone.charAt(i);
      if (!(c === ' ' || c === '.' || c === '-')) {
        if (isNaN(parseInt(c, 10))) {
          return `${fieldName} contains invalid characters.`;
        }
        numberDigits += 1;
      }
    }

    if (numberDigits !== 7) {
      return `${fieldName} must be 7 digits.`;
    }
  } else if (countryCode === 'AU') {
        // If it's a cell phone number
        // We just need check phone value
    if (phone.name.indexOf('c') > -1) {
      if (phone.length === 0) return '';

      // var numberDigits = 0;
      for (let i = 0; i < phone.length; i += 1) {
        const c = phone.charAt(i);
        if (!(c === ' ' || c === '.' || c === '-')) {
          if (isNaN(parseInt(c, 10))) {
            return `${fieldName} contains invalid characters.`;
          }

          numberDigits += 1;
        }
      }

      if (numberDigits !== 10) {
        return `${fieldName} must be 10 digits.`;
      }
    } else {
      if (ext) {
        isNumber = wholeNumber(ext, 'Ext number', fieldName);
        if (isNumber === '') {
          if (ext.length === 4 && phone.length === 4) {
            ext = '';
          }
        } else {
          return isNumber;
        }
      }

      if (area.length === 0) {
        if (phone.length === 0) return '';
        return `${fieldName} is missing the area code.`;
      }
      if (area.length !== 2) {
        return `${fieldName}  is not 2-digits (Area code).`;
      }

      isNumber = wholeNumber(area, ' Area code', fieldName);
      if (isNumber !== '') return isNumber;
      if (phone.length === 0) {
        return `${fieldName} is missing phone number.`;
      }

      // var numberDigits = 0;
      for (let i = 0; i < phone.length; i += 1) {
        const c = phone.charAt(i);
        if (!(c === ' ' || c === '.' || c === '-')) {
          if (isNaN(parseInt(c, 10))) {
            return `${fieldName} contains invalid characters.`;
          }
          numberDigits += 1;
        }
      }

      if (numberDigits !== 8) {
        return `${fieldName} must be 8 digits.`;
      }
    }
  } else if (countryCode === 'NZ') {
        // If it's a cell phone number
        // We just need check phone value
    if (phone.name.indexOf('c') > -1) {
      if (phone.length === 0) return '';

      // var numberDigits = 0;
      for (let i = 0; i < phone.length; i += 1) {
        const c = phone.charAt(i);
        if (!(c === ' ' || c === '.' || c === '-')) {
          if (isNaN(parseInt(c, 10))) {
            return `${fieldName} contains invalid characters.`;
          }

          numberDigits += 1;
        }
      }

      if (numberDigits > 11) {
        return `${fieldName} must be smaller than 11 digits.`;
      }
    } else {
      if (ext) {
        isNumber = wholeNumber(ext, 'Ext number', fieldName);
        if (isNumber === '') {
          if (ext.length === 4 && phone.length === 4) {
            ext = '';
          }
        } else {
          return isNumber;
        }
      }

      if (area.length === 0) {
        if (phone.length === 0) return '';
        return `${fieldName} is missing the area code.`;
      }
      if (area.length !== 2) {
        return `${fieldName}  is not 2-digits (Area code).`;
      }

      isNumber = wholeNumber(area, 'Area code', fieldName);
      if (isNumber !== '') return isNumber;
      if (phone.length === 0) {
        return `${fieldName} is missing phone number.`;
      }

      // var numberDigits = 0;
      for (let i = 0; i < phone.length; i += 1) {
        const c = phone.charAt(i);
        if (!(c === ' ' || c === '.' || c === '-')) {
          if (isNaN(parseInt(c, 10))) {
            return `${fieldName} contains invalid characters.`;
          }

          numberDigits += 1;
        }
      }

      if (numberDigits !== 7) {
        return `${fieldName} must be 7 digits.`;
      }
    }
  } else {
    if (phone.length === 0) return '';

    // var numberDigits = 0;
    for (let i = 0; i < phone.length; i += 1) {
      const c = phone.charAt(i);
      if (!(c === ' ' || c === '.' || c === '-')) {
        if (isNaN(parseInt(c, 10))) {
          return `${fieldName} contains invalid characters.`;
        }

        numberDigits += 1;
      }
    }

    if (numberDigits > 20) {
      return `${fieldName} must be smaller than 20 digits.`;
    }

    isNumber = wholeNumber(ext, 'Ext number', fieldName);
    if (ext && isNumber !== '') return isNumber;
  }

  return '';
}
