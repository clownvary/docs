'use strict';Object.defineProperty(exports, "__esModule", { value: true });
var zipcode = function zipcode(value) {var param = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'US';
  var zipCode = value.trim();
  var zip = '';
  var errorMsg = '';
  var varter = true;
  switch (param) {
    case 'US': // US
      zipCode = zipCode.replace(/\s+/g, '');
      for (var i = 0; i < zipCode.length; i += 1) {
        var c = zipCode.charAt(i);
        if (!isNaN(c)) {
          if (zip.length === 5) {
            zip = zip + '-';
          }
          zip += c;
        } else if (isNaN(c) && c !== '-') {
          errorMsg = '{name} contains invalid character in zip code.';
          zip = '';
          break;
        }
      }
      if (zip.length !== 0 && zip.length !== 5 && zip.length !== 10) {
        errorMsg = '{name} contains an incorrect number of digits.';
      }
      break;
    case 'CA': // Canada
      for (var _i = 0; _i < zipCode.length; _i += 1) {
        var _c = zipCode.charAt(_i);
        if (_c === ' ') {
          zip += _c;
        } else {
          if (varter) {
            if (!isNaN(_c)) {
              errorMsg = '{name} contains invalid postal code.';
            }
          } else if (isNaN(_c)) {
            errorMsg = '{name} contains invalid postal code.';
          }
          varter = !varter;
          zip += _c;
        }
      }
      if (zip.length !== 0 && zip.length > 7) {
        errorMsg = '{name} is too long';
      }
      break;
    default: // Free form
      break;}


  return errorMsg;
};exports.default =

{
  validateFunc: zipcode,
  message: '{name} contains invalid postal code.' };module.exports = exports['default'];