import { getCurrentInitState } from 'shared/utils/initStateHelper';

export default function psotalCode(name, msg, postalCodeType) {
  const initialState = getCurrentInitState();
  const countryCode = postalCodeType || (initialState.country_code || 'US');
  let zipCode = name.trim();
  let zip = '';
  let errorMsg = '';
  let varter = true;
  switch (countryCode) {
    case 'US': // US
      zipCode = zipCode.replace(/\s+/g, '');
      for (let i = 0; i < zipCode.length; i += 1) {
        const c = zipCode.charAt(i);
        if (!isNaN(c)) {
          if (zip.length === 5) {
            zip = `${zip}-`;
          }
          zip += c;
        } else if (isNaN(c) && c !== '-') {
          errorMsg = `${msg} contains invalid character in zip code.`;
          zip = '';
          break;
        }
      }
      if (zip.length !== 0 && zip.length !== 5 && zip.length !== 10) {
        errorMsg = `${msg} contains an incorrect number of digits.`;
      }
      break;
    case 'CA': // Canada
      for (let i = 0; i < zipCode.length; i += 1) {
        const c = zipCode.charAt(i);
        if (c === ' ') {
          zip += c;
        } else {
          if (varter) {
            if (!isNaN(c)) {
              errorMsg = `${msg} contains invalid postal code.`;
            }
          } else if (isNaN(c)) {
            errorMsg = `${msg} contains invalid postal code.`;
          }
          varter = !varter;
          zip += c;
        }
      }
      if (zip.length !== 0 && zip.length > 7) {
        errorMsg = `${msg} is too long`;
      }
      break;
    default:// Free form
      break;
  }

  return errorMsg;
}
