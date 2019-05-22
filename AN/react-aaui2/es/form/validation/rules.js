import { PHONE_NUMBER_CONFIG } from '../config';

var required = function required(val) {
  return !!val;
};
var email = function email(val) {
  return (/[0-9-._a-z]+@[0-9-.a-z]+\.[a-z]+/i.test(val)
  );
};
var min = function min() {
  var val = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var minLen = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  return val.length >= minLen;
};
var max = function max() {
  var val = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var maxLen = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  return val.length <= maxLen;
};
var numeric = function numeric(val) {
  return !isNaN(parseFloat(val)) && isFinite(val);
};
var url = function url(val) {
  return (/^((ht|f)tps?):\/\/[\w-]+(\.[\w-]+)+([\w-.,@?^=%&:/~+#]*[\w-@?^=%&/~+#])?$/i.test(val)
  );
};
var phone = function phone(val) {
  return PHONE_NUMBER_CONFIG.some(function (phoneNumberPattern) {
    return phoneNumberPattern.test(val);
  });
};
var regexp = function regexp(val, regex) {
  return val ? new RegExp(regex).test(val) : true;
};

export default {
  required: required,
  email: email,
  min: min,
  max: max,
  numeric: numeric,
  url: url,
  phone: phone,
  regexp: regexp
};