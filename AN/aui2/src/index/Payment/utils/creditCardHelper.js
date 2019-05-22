import find from 'lodash/find';
import { isContainNumberOnly } from 'shared/utils/func';
import {
  OtherCreditCard,
  VISA,
  MasterCard,
  AmericanExpress,
  Diners,
  Discover,
  JCB
} from '../consts/ccTypes';

const getCardTypeObjByCardTypeId = (cardTypeId, cardTypeList) =>
  find(cardTypeList, cardType => cardType.card_type_id === cardTypeId);

/**
 * Fix ANE-81412
 * Pinpad AMS give very little info to get the card type id,
 * so need get the card type id by card type name.
 * The info given by pinpad is:
 * {
 *  key: '1',
 *  wallet_id: '154fkjjreq8r90874hjnfdasp98344hjerwoiu34',
 *  cc_masked: 'xxx0119',
 *  cc_card_type: 'Visa',
 *  apd_transaction_key: '12fdsfa-4q34jfdf-234jkjfda-231ejdf',
 *  amount: '0.01',
 *  transaction_description: null,
 *  receipt_commit_error_message: null
 * }
 * Keep same with the legacy which is defined in the
 *  CreditCardInput.htx/function ^CreditCardInputPCI.p2^$setCardTypeStringValue
 */

export const getCardTypeIdByCardTypeName = (cardTypeName) => {
  let cardTypeId = OtherCreditCard;

  if (cardTypeName.toLowerCase() === 'visa') {
    cardTypeId = VISA;
  } else if (cardTypeName.toLowerCase() === 'mastercard') {
    cardTypeId = MasterCard;
  } else if (cardTypeName.toLowerCase() === 'amex' || cardTypeName.toLowerCase().indexOf('american') === 0 || cardTypeName.toLowerCase() === 'ax') {
    cardTypeId = AmericanExpress;
  } else if (cardTypeName.toLowerCase() === 'dinersclub' || cardTypeName.toLowerCase().indexOf('diners') === 0) {
    cardTypeId = Diners;
  } else if (cardTypeName.toLowerCase() === 'discover' || cardTypeName.toLowerCase() === 'di') {
    cardTypeId = Discover;
  } else if (cardTypeName.toLowerCase() === 'jcb') {
    cardTypeId = JCB;
  }

  return cardTypeId;
};

export const getCardTypeSystemIdByCardTypeId = (cardTypeId, cardTypeList) => {
  const foundCardTypeObj = getCardTypeObjByCardTypeId(cardTypeId, cardTypeList);

  if (foundCardTypeObj) {
    return foundCardTypeObj.id;
  }

  return cardTypeId;
};

export const getValidCardTypeId = (cardTypeId, cardTypeList) => {
  const foundCardTypeObj = getCardTypeObjByCardTypeId(cardTypeId, cardTypeList);

  if (foundCardTypeObj) {
    return foundCardTypeObj.card_type_id;
  }

  return 0;
};

export const getCardTypeSystemIdByName = (cardTypeName, cardTypeList) => {
  const cardTypeId = getCardTypeIdByCardTypeName(cardTypeName);
  const foundCardTypeObj = find(cardTypeList, cardType => cardType.card_type_id === cardTypeId);

  if (foundCardTypeObj) {
    return foundCardTypeObj.id;
  }

  return 0;
};

export const formatExpirationDate = (monthString, yearString) =>
  `${monthString.toString().length === 1 ? '0' : ''}${monthString}/${yearString}`;

export const maskCard = (ccNumber) => {
  if (ccNumber) {
    const formattedCCNumber = ccNumber.replace(/\[^\d]+/g, '');
    const showDigitLength = formattedCCNumber.length > 4 ? 4 : formattedCCNumber.length;
    return `xxx${formattedCCNumber.substring(formattedCCNumber.length - showDigitLength)}`;
  }

  return ccNumber;
};

export const validExpiryValue = (expiryValue = '', msg = '', today = new Date()) => {
  if (!expiryValue.length) {
    return {
      isCCExpired: false
    };
  }

  let month = 0;
  let year = 0;
  let errMsg = '';
  const indexOfSeperater = expiryValue.indexOf('/');
  const expireValueLength = expiryValue.length;

  if (indexOfSeperater > 0) {
    month = expiryValue.substring(0, indexOfSeperater);
    year = expiryValue.substring(indexOfSeperater + 1);
  } else if (expireValueLength === 3 || expireValueLength === 5) {
    month = expiryValue.substring(0, 1);
    year = expiryValue.substring(1);
  } else if (expireValueLength === 4 || expireValueLength === 6) {
    month = expiryValue.substring(0, 2);
    year = expiryValue.substring(2);
  } else {
    errMsg = `${msg} contains invalid date`;
    return {
      isCCExpired: true,
      expireMsg: errMsg
    };
  }

  if (!isContainNumberOnly(month) || isNaN(parseInt(month, 10)) || month < 1 || month > 12) {
    errMsg = `${msg} month is invalid`;
    return {
      isCCExpired: true,
      expireMsg: errMsg
    };
  }

  if (!isContainNumberOnly(year) || isNaN(parseInt(year, 10))) {
    errMsg = `${msg} year is invalid`;
    return {
      isCCExpired: true,
      expireMsg: errMsg
    };
  }

  if (year.length === 2) {
    year = `20${year}`;
  }

  const thisYear = new Date().getFullYear();
  if (year > thisYear + 10) {
    errMsg = `${msg} year is more than 10 years in the future`;
    return {
      isCCExpired: true,
      expireMsg: errMsg
    };
  }

  if (parseInt(month, 10) === 12) {
    month = 0;
    year = +year + 1;
  }

  const expdate = new Date(today);
  expdate.setFullYear(year, month, 1); // first day of month following expiration

  if (expdate < today) {
    errMsg = `${msg} is in the past`;
    return {
      isCCExpired: true,
      expireMsg: errMsg
    };
  }

  return {
    isCCExpired: false
  };
};
