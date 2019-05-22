import { ErrorMessage } from '../consts';

const validateZipCode = (zipCodeVal, zipCodeType, systemCountryCode) => {
  const countryCode = zipCodeType || systemCountryCode || 'US';

  let zipCode = zipCodeVal.trim();
  let zip = '';
  let varter = true;
  switch (countryCode) {
    case 'US':
      zipCode = zipCode.replace(/\s+/g, '');
      for (let i = 0; i < zipCode.length; i += 1) {
        const c = zipCode.charAt(i);
        if (!isNaN(c)) {
          if (zip.length === 5) {
            zip = `${zip}-`;
          }
          zip += c;
        } else if (isNaN(c) && c !== '-') {
          return ErrorMessage.CustomErrorKey.ZIP_CODE_US_INVALID_CHARACTER;
        }
      }
      if (zip.length !== 0 && zip.length !== 5 && zip.length !== 10) {
        return ErrorMessage.CustomErrorKey.ZIP_CODE_US_INCORRECT_NUMBER;
      }

      break;
    case 'CA':
      for (let i = 0; i < zipCode.length; i += 1) {
        const c = zipCode.charAt(i);
        if (c === ' ') {
          zip += c;
        } else {
          if (varter) {
            if (!isNaN(c)) {
              return ErrorMessage.CustomErrorKey.ZIP_CODE_CA_INVALID;
            }
          } else if (isNaN(c)) {
            return ErrorMessage.CustomErrorKey.ZIP_CODE_CA_INVALID;
          }
          varter = !varter;
          zip += c;
        }
      }
      if (zip.length !== 0 && zip.length > 7) {
        return ErrorMessage.CustomErrorKey.ZIP_CODE_CA_TOO_LONG;
      }
      break;
    default: // Free form
      break;
  }

  return '';
};

export default validateZipCode;
