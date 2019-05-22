'use strict';

exports.__esModule = true;

var _utils = require('./utils');

var DEFAULT_FLOAT_LENGTH = 2;

/**
 * Example: { number: '123456', separationCount: 3, separator: ',' }
 * 1. Split number string to array. ['1', '2', '3', '4', '5', '6']
 * 2. Reverse the array. ['6', '5', '4', '3', '2', '1']
 * 3. Add separator to item by separationCount. ['6', '5', ',4', '3', '2', '1']
 * 4. Reverse again. ['1', '2', '3', ',4', '5', '6']
 * 5. Join the array to string. '123,456'
 */
var addSeparatorsForIntPart = function addSeparatorsForIntPart(number, separationCount, separator) {
  return number.split('').reverse().map(function (n, i) {
    return (i !== number.length - 1 && i % separationCount === separationCount - 1 ? separator : '') + n;
  }).reverse().join('');
};

var addSeparators = function addSeparators(number, separationCount, separator) {
  var numberStrArr = number.toString().split('.');

  var integerPart = addSeparatorsForIntPart(numberStrArr[0].replace(/-/, ''), separationCount, separator);
  var floatPart = numberStrArr.length > 1 ? '.' + numberStrArr[1] : '';

  return '' + integerPart + floatPart;
};

var currencyFormatter = function currencyFormatter(amount, formatConfig) {
  var template = formatConfig.template,
      integerOnly = formatConfig.integerOnly,
      separationCount = formatConfig.separationCount,
      separator = formatConfig.separator,
      negativeMark = formatConfig.negativeMark;

  var number = integerOnly ? parseInt(amount, 10) : parseFloat(amount).toFixed(DEFAULT_FLOAT_LENGTH);

  if (isNaN(number)) {
    return '';
  }

  return (0, _utils.interpolate)(template, {
    amount: addSeparators(number, separationCount, separator),
    negative: amount < 0 ? negativeMark : ''
  });
};

exports.default = currencyFormatter;
module.exports = exports['default'];