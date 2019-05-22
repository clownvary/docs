/** Token Type
 * @enum {string}
 * @memberof InputMoment
*/
const TokenType = {
  LITERAL: 'literal',
  MONTH: 'M',
  MONTH_TWO_DIGITS: 'MM',
  MONTH_SHORT_NAME: 'MMM',
  MONTH_LONG_NAME: 'MMMM',
  DATE: 'D',
  DATE_TWO_DIGITS: 'DD',
  DAY_SHORT_NAME: 'ddd',
  DAY_LONG_NAME: 'dddd',
  YEAR: 'Y',
  YEAR_TWO_DIGITS: 'YY',
  YEAR_FOUR_DIGITS: 'YYYY',
  HOUTR_12: 'h',
  HOUTR_12_TWO_DIGITS: 'hh',
  HOUTR_24: 'H',
  HOUTR_24_TWO_DIGITS: 'HH',
  AMPM: 'a',
  AMPM_UPPER: 'A',
  MINUTE: 'm',
  MINUTE_TWO_DIGITS: 'mm',
  SECOND: 's',
  SECOND_TWO_DIGITS: 'ss'
};

export default TokenType;

