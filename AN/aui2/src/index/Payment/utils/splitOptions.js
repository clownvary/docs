import { deepMerge } from 'shared/utils/func';

import { paymentTypes } from '../consts';

export const paymentOptionsMap = {
  [paymentTypes.CASH]: 'Cash',
  [paymentTypes.CHECK]: 'Check',
  [paymentTypes.CREDITCARD]: 'CreditCard',
  [paymentTypes.DEBITCARD]: 'DebitCard',
  [paymentTypes.ELECTRONICCHECK]: 'ElectronicCheck',
  [paymentTypes.CREDIT]: 'Credit',
  [paymentTypes.GIFTCARD]: 'GiftCard',

  [paymentTypes.REFUND_CASH]: 'Cash',
  [paymentTypes.REFUND_CHECK]: 'Check',
  [paymentTypes.REFUND_CREDITCARD]: 'CreditCard',
  [paymentTypes.REFUND_ACCOUNT]: 'Account',
  [paymentTypes.REFUND_GIFTCARD]: 'GiftCard',
  [paymentTypes.REFUND_DEBITCARD]: 'DebitCard'
};

const remainIds = [paymentTypes.GIFTCARD, paymentTypes.REFUND_GIFTCARD];
let optionsMap = {};
let defaultOptionId = -1;
let optionIds = [];
let optionIdsClone = [];

export function resetPaymentOptions(options) {
  optionsMap = {};
  defaultOptionId = -1;
  optionIds = [];

  options.forEach((itemObj) => {
    const item = itemObj;
    const optionId = item.id;
    optionsMap[optionId] = item;
    if (item.selected) {
      defaultOptionId = optionId;
      item.selected = false;
    }
    optionIds.push(optionId);
  });

  optionIdsClone = [].concat(optionIds);
}

function createNewOrderedOptionIds(optIdsArr) {
  const optIds = optIdsArr || optionIds;
  const newOptions = [];

  optionIdsClone.forEach((id) => {
    optIds.indexOf(id) > -1 && newOptions.push(id);
  });

  return newOptions;
}

resetPaymentOptions(window.__payment__.__initialState__.paymentOptions);

export function splitOptions(defaultIdNum = optionIds[0]) {
  let defaultId = defaultIdNum;
  if (defaultOptionId > -1) {
    defaultId = defaultOptionId;
    defaultOptionId = -1;
  }

  const optIds = [].concat(optionIds);
  let componentName = '';
  let selectedIndex = -1;

  const avalibleOptions = optIds.map((id, index) => {
    const option = deepMerge({}, optionsMap[id]);
    if (id === defaultId) {
      componentName = paymentOptionsMap[id];
      option.selected = true;
      if (remainIds.indexOf(id) === -1) {
        selectedIndex = index;
      }
    }
    return option;
  });

  if (selectedIndex > -1) {
    optionIds.splice(selectedIndex, 1);
  }
  return {
    defaultId,
    avalibleOptions,
    componentName
  };
}

export function deleteOption(deleteId) {
  if (remainIds.indexOf(deleteId) === -1) {
    optionIds.push(deleteId);
    optionIds = createNewOrderedOptionIds();
  }
}

export function changeOption(deleteId, addId) {
  if (remainIds.indexOf(deleteId) === -1) {
    const deleteIdIndex = optionIds.indexOf(deleteId);
    optionIds.splice(deleteIdIndex, 1);
    optionIds.push(addId);
  }

  if (remainIds.indexOf(addId) === -1) {
    optionIds.push(addId);
  }

  optionIds = createNewOrderedOptionIds();
}


export function createAvailableOptions(defaultId) {
  let optIds = [].concat(optionIds);
  optIds.push(defaultId);
  optIds = createNewOrderedOptionIds(optIds);

  const avalibleOptions = optIds.map((id) => {
    const option = deepMerge({}, optionsMap[id]);
    if (id === defaultId) {
      option.selected = true;
    }
    return option;
  });

  return avalibleOptions;
}


export function getAvailableOptionIds() {
  return optionIds;
}

export function getDefaultOptionId() {
  return defaultOptionId;
}

export function setDefaultOptionId(id) {
  defaultOptionId = id;
}

export function deleteGiftCardId(giftCardId) {
  optionIds = optionIds.filter(id => id !== giftCardId);
}

export function pushGiftCardId(giftCardId) {
  if (!optionIds.some(id => id === giftCardId)) {
    optionIds.push(giftCardId);
  }
}

export function getFormatAmount(option, paymentType) {
  let formatAmount = 0;

  switch (paymentType) {
    case paymentTypes.CASH:
    case paymentTypes.REFUND_CASH:
      formatAmount = option.formatCashAmount;
      break;
    case paymentTypes.CHECK:
    case paymentTypes.REFUND_CHECK:
      formatAmount = option.formatCheckAmount;
      break;
    case paymentTypes.CREDIT:
      formatAmount = option.formatCreditAmount;
      break;
    case paymentTypes.CREDITCARD:
    case paymentTypes.REFUND_CREDITCARD:
      formatAmount = option.formatCreditCardAmount;
      break;
    case paymentTypes.ELECTRONICCHECK:
      formatAmount = option.formatECheckAmount;
      break;
    case paymentTypes.GIFTCARD:
    case paymentTypes.REFUND_GIFTCARD:
      formatAmount = option.formatGiftCardAmount;
      break;
    case paymentTypes.PAYMENTPLAN:
    case paymentTypes.DEBITCARD:
    case paymentTypes.REFUND_DEBITCARD:
      formatAmount = option.amount;
      break;

    case paymentTypes.REFUND_ACCOUNT:
      formatAmount = option.formatAccountAmount;
      break;
    default:
      break;
  }

  return formatAmount;
}

/**
 * Filter options:
 *  Condition 1: amount > 0.
 * @param  {Array} Payment/reducers/paymentOptions/index.js
 *                  - options(reducer state) - not immutable
 * @return {Array}
 */
export function filterOptions(options = []) {
  const finalOptions = [];

  options.forEach((opt, index) => {
    const option = Object.assign({}, opt);

    if (+option.amount > 0) {
      option.indexInOrgArr = index;
      finalOptions.push(option);
    }
  });

  return finalOptions;
}

