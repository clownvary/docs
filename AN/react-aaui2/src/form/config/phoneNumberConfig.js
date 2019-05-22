const PHONE_NUMBER_CONFIG = [
  // NORTH_AMERICAN_PHONE_NUMBER_PATTERN
  /^(?:1[-. ]?)?\(?([2-9][0-8][0-9])\)?[-. ]?([2-9][0-9]{2})[-. ]?([0-9]{4})$/,
  // AUSTRALIAN_PHONE_NUMBER_PATTERN
  /^(\(0[23478]\)|0[23478])(\s?\d{4}\s?\d{4}|\d{2}\s?\d{3}\s?\d{3})$/,
  // INTERNATIONAL_PHONE_NUMBER_PATTERN
  /^(?=.{6,32}$)\+?[\d().\- ]*\d[\d().\- ]*$/,
]

export default PHONE_NUMBER_CONFIG
