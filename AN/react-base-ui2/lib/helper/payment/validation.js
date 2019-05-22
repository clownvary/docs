'use strict';Object.defineProperty(exports, "__esModule", { value: true });var trimString = function trimString(sInString) {return sInString.replace(/\s+$/g, '');};

var maskCard = exports.maskCard = function maskCard(ccNumber) {
  ccNumber = trimString(ccNumber);
  var digitsToShow = ccNumber.length > 4 ? 4 : ccNumber.length;
  return 'xxx' + ccNumber.substring(ccNumber.length - digitsToShow);
};

// //////////////////////////////////////////////////////////////////
//
//  Determine credit card types
//
// //////////////////////////////////////////////////////////////////
var ccValidationVisa = 1;
var ccValidationMc = 2;
var ccValidationAmex = 3;
var ccValidationDiners = 4;
var ccValidationDiscover = 5;
var ccValidationJcb = 6;

var validChecksum = function validChecksum(myCcNumber) {
  var checkSum = 0;
  var oddToggle = false;
  for (var i = myCcNumber.length - 1; i >= 0; i -= 1, oddToggle = !oddToggle) {
    var digit = parseInt(myCcNumber.charAt(i), 10);
    if (isNaN(digit)) return false;
    if (oddToggle) {
      if (digit * 2 > 9) {
        checkSum += 1 + digit * 2 % 10;
      } else {
        checkSum += digit * 2;
      }
    } else {
      checkSum += digit;
    }
  }

  return checkSum % 10 === 0;
};

var masterCard = function masterCard(cc) {
  if (!validChecksum(cc)) return false;
  if (cc.length !== 16) return false;
  return cc.indexOf('51') === 0 ||
  cc.indexOf('52') === 0 ||
  cc.indexOf('53') === 0 ||
  cc.indexOf('54') === 0 ||
  cc.indexOf('55') === 0;
};

var amexCard = exports.amexCard = function amexCard(cc) {
  if (!validChecksum(cc)) return false;
  if (cc.length !== 15) return false;
  return cc.indexOf('34') === 0 ||
  cc.indexOf('37') === 0;
};

var visaCard = exports.visaCard = function visaCard(cc) {
  if (!validChecksum(cc)) return false;
  if (cc.length !== 13 && cc.length !== 16) return false;
  return cc.indexOf('4') === 0;
};

var dinersCard = exports.dinersCard = function dinersCard(cc) {
  if (!validChecksum(cc)) return false;
  if (cc.length !== 14) return false;
  return cc.indexOf('300') === 0 ||
  cc.indexOf('301') === 0 ||
  cc.indexOf('302') === 0 ||
  cc.indexOf('303') === 0 ||
  cc.indexOf('304') === 0 ||
  cc.indexOf('305') === 0 ||
  cc.indexOf('36') === 0 ||
  cc.indexOf('38') === 0;
};

var discoverCard = exports.discoverCard = function discoverCard(cc) {
  if (!validChecksum(cc)) return false;
  if (cc.length !== 16) return false;
  return cc.indexOf('6011') === 0 ||
  cc.indexOf('622') === 0 ||
  cc.indexOf('64') === 0 ||
  cc.indexOf('65') === 0;
};

var jcbCard = exports.jcbCard = function jcbCard(cc) {
  if (!validChecksum(cc)) return false;
  if (cc.length === 16 && cc.indexOf('3') === 0) return true;
  if (cc.length !== 15) return false;
  return cc.indexOf('2131') === 0 || cc.indexOf('1800') === 0;
};

var cardValidation = exports.cardValidation = function cardValidation(cc) {
  // remove all space in the credit card number
  cc = cc.replace(/\s/g, '');
  if (masterCard(cc)) return ccValidationMc;
  if (amexCard(cc)) return ccValidationAmex;
  if (visaCard(cc)) return ccValidationVisa;
  if (dinersCard(cc)) return ccValidationDiners;
  if (discoverCard(cc)) return ccValidationDiscover;
  if (jcbCard(cc)) return ccValidationJcb;
  return 0;
};