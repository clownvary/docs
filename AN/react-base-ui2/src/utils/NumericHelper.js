import isBoolean from 'lodash/isBoolean';
import _round from 'lodash/round';

const toFixedString = (value, decimals = 2, round = true) => {
  if (isBoolean(decimals)) {
    round = decimals;
    decimals = 2;
  }
  if (round && decimals >= 0) {
    value = value.toFixed(decimals);
  }

  let txtValue = `${value}`;
  if (decimals < 0) {
    return txtValue;
  }

  const re = new RegExp(`(\\d+\\.\\d{${decimals}})(\\d)`);
  const m = txtValue.match(re);

  txtValue = m ? m[1] : txtValue;
  return (txtValue * 1).toFixed(decimals);
};

const applySymbols = (value, cultureContext, neg = false) => {
  let result = cultureContext.pattern[neg ? 0 : 1];
  result = result.replace(/[n]/g, value);
  result = result.replace(/[%]/g, cultureContext.percentSymbol || '%');
  result = result.replace(/[$]/g, cultureContext.currencySymbol || '$');

  return result;
};

const stripSymbols = (value, cultureContext = {}) => {
  let result = value;
  let r = new RegExp(`[${cultureContext.decimalSep || '.'}]`, 'g');
  result = result.replace(r, '.');

  r = new RegExp('[^0-9.]', 'g');
  result = result.replace(r, '');

  return result;
};

const isZero = (value, cultureContext) => {
  try {
    let txtValue = value ? `${value}` : '';
    txtValue = stripSymbols(txtValue, cultureContext);

    return txtValue.length === 0 ? true : parseFloat(txtValue) === 0;
  } catch (e) {
    // do nothing
  }
  return false;
};

const isNegative = (value) => {
  const txtValue = `${value}`;
  return txtValue.indexOf('-') !== -1 || txtValue.indexOf('(') !== -1;
};

const getDecimalPos = (value, cultureContext) => {
  const decimalSep = cultureContext.decimalSep || '.';
  let pos = value.indexOf(decimalSep);
  if (pos === -1 && decimalSep !== '.') {
    pos = value.indexOf('.');
  }

  if (pos === -1) {
    pos = value.length;
  }

  return pos;
};

const removeLeadingZero = (value) => {
  const result = `${value}`;
  const re = /^(-|\+)?0+(?=\d)/;
  return result.replace(re, '$1');
};

const toFixedFloat = (number, digits) => {
  const des = _round(number, digits);
  return parseFloat(des.toFixed(digits));
};

export default {
  toFixedString,
  toFixedFloat,
  applySymbols,
  stripSymbols,
  isZero,
  isNegative,
  removeLeadingZero,
  getDecimalPos
};

