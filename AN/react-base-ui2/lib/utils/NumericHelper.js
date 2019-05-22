'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _isBoolean = require('lodash/isBoolean');var _isBoolean2 = _interopRequireDefault(_isBoolean);
var _round2 = require('lodash/round');var _round3 = _interopRequireDefault(_round2);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

var toFixedString = function toFixedString(value) {var decimals = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2;var round = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
  if ((0, _isBoolean2.default)(decimals)) {
    round = decimals;
    decimals = 2;
  }
  if (round && decimals >= 0) {
    value = value.toFixed(decimals);
  }

  var txtValue = '' + value;
  if (decimals < 0) {
    return txtValue;
  }

  var re = new RegExp('(\\d+\\.\\d{' + decimals + '})(\\d)');
  var m = txtValue.match(re);

  txtValue = m ? m[1] : txtValue;
  return (txtValue * 1).toFixed(decimals);
};

var applySymbols = function applySymbols(value, cultureContext) {var neg = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  var result = cultureContext.pattern[neg ? 0 : 1];
  result = result.replace(/[n]/g, value);
  result = result.replace(/[%]/g, cultureContext.percentSymbol || '%');
  result = result.replace(/[$]/g, cultureContext.currencySymbol || '$');

  return result;
};

var stripSymbols = function stripSymbols(value) {var cultureContext = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var result = value;
  var r = new RegExp('[' + (cultureContext.decimalSep || '.') + ']', 'g');
  result = result.replace(r, '.');

  r = new RegExp('[^0-9.]', 'g');
  result = result.replace(r, '');

  return result;
};

var isZero = function isZero(value, cultureContext) {
  try {
    var txtValue = value ? '' + value : '';
    txtValue = stripSymbols(txtValue, cultureContext);

    return txtValue.length === 0 ? true : parseFloat(txtValue) === 0;
  } catch (e) {
    // do nothing
  }
  return false;
};

var isNegative = function isNegative(value) {
  var txtValue = '' + value;
  return txtValue.indexOf('-') !== -1 || txtValue.indexOf('(') !== -1;
};

var getDecimalPos = function getDecimalPos(value, cultureContext) {
  var decimalSep = cultureContext.decimalSep || '.';
  var pos = value.indexOf(decimalSep);
  if (pos === -1 && decimalSep !== '.') {
    pos = value.indexOf('.');
  }

  if (pos === -1) {
    pos = value.length;
  }

  return pos;
};

var removeLeadingZero = function removeLeadingZero(value) {
  var result = '' + value;
  var re = /^(-|\+)?0+(?=\d)/;
  return result.replace(re, '$1');
};

var toFixedFloat = function toFixedFloat(number, digits) {
  var des = (0, _round3.default)(number, digits);
  return parseFloat(des.toFixed(digits));
};exports.default =

{
  toFixedString: toFixedString,
  toFixedFloat: toFixedFloat,
  applySymbols: applySymbols,
  stripSymbols: stripSymbols,
  isZero: isZero,
  isNegative: isNegative,
  removeLeadingZero: removeLeadingZero,
  getDecimalPos: getDecimalPos };module.exports = exports['default'];