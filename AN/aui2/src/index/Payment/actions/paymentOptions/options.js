import { fromJS } from 'immutable';

import { fixedMoneyString } from 'shared/utils/currencyHelper';
import normalizeData from 'shared/utils/normalizeData';
import formatCurrency from '../../utils/formatCurrency';
import URL from '../../urls';
import getSessionIDs from '../../utils/getSessionIDs';
import { showErrors, changeRemaining, updatePayNowAmount } from '../index';
import { fetchGiftCardList, resetGiftCardList } from './giftCard';
import { fetchAccountConfig } from './account';
import { changeCreditResetStatus } from './credit';
import { changePaymentPlanAmount, overrideCcExpiration } from './paymentPlan';
import { getDefaultAmount, getRemaining } from '../../components/PaymentOptions/utils/payment';
import {
  splitOptions,
  paymentOptionsMap,
  getAvailableOptionIds,
  createAvailableOptions,
  resetPaymentOptions,
  getFormatAmount
} from '../../utils/splitOptions';
import { paymentTypes, resetTypes } from '../../consts';

export const PAYMENT_OPTIONS_UPDATE = 'PAYMENT_OPTIONS_UPDATE';
export const PAYMENT_OPTIONS_UPDATE_BY_KEY = 'PAYMENT_OPTIONS_UPDATE_BY_KEY';
export const PAYMENT_OPTIONS_DELETE = 'PAYMENT_OPTIONS_DELETE';
export const PAYMENT_OPTIONS_RESET = 'PAYMENT_OPTIONS_RESET';

export const PAYMENT_OPTIONS_UPDATE_AVAILABLE_OPTIONS = 'PAYMENT_OPTIONS_UPDATE_AVAILABLE_OPTIONS';
export const PAYMENT_OPTIONS_UPDATE_PAYMENT_DELETE_FLAG = 'PAYMENT_OPTIONS_UPDATE_PAYMENT_DELETE_FLAG';

export const PAYMENT_OPTIONS_SET_RESET = 'PAYMENT_OPTIONS_SET_RESET';

let fetchedPaymentOptions = window.__payment__.__initialState__.paymentOptions;


const requestRefundOptions = ({ batchID, receiptID }) => ({
  types: ['', '', ''],
  promise: API => API.get(URL.fetchRefundOptions, {
    body: {
      batch_id: batchID,
      receipt_id: receiptID
    }
  })
});

const fetchRefundOptions = () => (dispatch, getState) => {
  const { batchID, receiptID } = getSessionIDs(getState());
  return dispatch(requestRefundOptions({ batchID, receiptID }));
};

const requestPaymentOptions = ({ batchID, receiptID }) => ({
  types: ['', '', ''],
  promise: API => API.get(URL.fetchPaymentOptions, {
    body: {
      batch_id: batchID,
      receipt_id: receiptID
    }
  })
});

const fetchPaymentOptions = () => (dispatch, getState) => {
  const { batchID, receiptID } = getSessionIDs(getState());
  return dispatch(requestPaymentOptions({ batchID, receiptID }));
};

const updatePaymentOptionByKey = (index, key, value) => ({
  type: PAYMENT_OPTIONS_UPDATE_BY_KEY,
  payload: { index, key, value }
});

const updatePaymentOption = func => ({
  type: PAYMENT_OPTIONS_UPDATE,
  payload: { funcUpdate: func }
});

const updateAvailableSplitIds = optionIds => ({
  type: PAYMENT_OPTIONS_UPDATE_AVAILABLE_OPTIONS,
  payload: { optionIds }
});

const updatePaymentDeleteFlag = isDeleted => ({
  type: PAYMENT_OPTIONS_UPDATE_PAYMENT_DELETE_FLAG,
  payload: { isDeleted }
});

const paymentConfig = {
  [paymentTypes.CHECK]: {
    checkNumber: '',
    formatCheckAmount: 0
  },
  [paymentTypes.CASH]: {
    cashAmountPaid: '',
    cashChange: '',
    formatCashAmount: 0
  },
  [paymentTypes.CREDIT]: {
    creditAvalible: 0,
    creditOverdue: 0,
    formatCreditAmount: 0
  },
  [paymentTypes.CREDITCARD]: {
    formatCreditCardAmount: 0
  },
  [paymentTypes.ELECTRONICCHECK]: {
    formatECheckAmount: 0
  },
  [paymentTypes.GIFTCARD]: {
    formatGiftCardAmount: 0
  },
  [paymentTypes.REFUND_CHECK]: {
    checkNumber: '',
    formatCheckAmount: 0
  },
  [paymentTypes.REFUND_CASH]: {
    cashAmountPaid: '',
    cashChange: '',
    formatCashAmount: 0
  },
  [paymentTypes.REFUND_CREDITCARD]: {
    formatCreditCardAmount: 0
  },
  [paymentTypes.REFUND_ACCOUNT]: {
    formatAccountAmount: 0
  },
  [paymentTypes.REFUND_GIFTCARD]: {
    formatGiftCardAmount: 0
  }
};

const createOptionInfo = () => {
  const defaultOptions = splitOptions();
  const formatOptObj = normalizeData(defaultOptions.avalibleOptions);
  const ComponentId = defaultOptions.defaultId;
  const newOption = {
    list: formatOptObj.data,
    activeVal: ComponentId,
    ComponentName: defaultOptions.componentName
  };

  return newOption;
};

const splitPaymentConfig = (option, amount) => {
  const paymentType = option.activeVal;
  const newOption = Object.assign(option, paymentConfig[paymentType]);
  /* istanbul ignore next */
  switch (paymentType) {
    case paymentTypes.CASH:
    case paymentTypes.REFUND_CASH:
      newOption.formatCashAmount = amount;
      newOption.cashAmountPaid = amount;
      newOption.cashChange = formatCurrency(0);
      break;
    case paymentTypes.CHECK:
    case paymentTypes.REFUND_CHECK:
      newOption.formatCheckAmount = amount;
      break;
    case paymentTypes.CREDIT:
      newOption.formatCreditAmount = amount;
      break;
    case paymentTypes.CREDITCARD:
    case paymentTypes.REFUND_CREDITCARD:
      newOption.formatCreditCardAmount = amount;
      break;
    case paymentTypes.ELECTRONICCHECK:
      newOption.formatECheckAmount = amount;
      break;
    case paymentTypes.GIFTCARD:
    case paymentTypes.REFUND_GIFTCARD:
      newOption.formatGiftCardAmount = amount;
      break;

    case paymentTypes.REFUND_ACCOUNT:
      newOption.formatAccountAmount = amount;
      break;
    default:
      break;
  }

  return newOption;
};

export const updatePaymentOptionByKeyAction = (index, key, value) =>
  dispatch => dispatch(updatePaymentOptionByKey(index, key, value));

export const updatePaymentOptionAction = func =>
  dispatch => dispatch(updatePaymentOption(func));

export const addPaymentOptionAction = newOption =>
  dispatch => dispatch(updatePaymentOption(opts => opts.push(fromJS(newOption))));

export const resetAvailableSplitIdsAction = () =>
  dispatch => dispatch(updateAvailableSplitIds(getAvailableOptionIds()));

export const deletePaymentOptionAction = index =>
  (dispatch, getState) => {
    const optionList = getState().paymentOptions.options.toJS().data;
    optionList.splice(index, 1);
    const lastOption = optionList[optionList.length - 1];
    /* istanbul ignore else */
    if (lastOption.activeVal !== paymentTypes.PAYMENTPLAN) {
      lastOption.list = normalizeData(createAvailableOptions(lastOption.activeVal)).data;
    }

    dispatch(updatePaymentOption(() => fromJS(optionList)));
    dispatch(updateAvailableSplitIds(getAvailableOptionIds()));
    return dispatch(updatePaymentDeleteFlag(true));
  };

export const splitPaymentAction = (amount, isManuallySplit) =>
  (dispatch) => {
    let newOption = createOptionInfo();
    newOption.amount = amount;
    newOption.isManuallySplit = isManuallySplit;
    newOption = splitPaymentConfig(newOption, amount);

    dispatch(addPaymentOptionAction(newOption));
    dispatch(updateAvailableSplitIds(getAvailableOptionIds()));
  };

export const changePaymentAction = ({ newPaymentType, index }) =>
  (dispatch, getState) => {
    const state = getState();
    const option = state.paymentOptions.options.getIn(['data', index]);
    const oldPaymentType = option.get('activeVal');

    const optionList = option.get('list');
    const selectedOption = optionList.find(item => item.get('value') === newPaymentType);
    const paymentName = paymentOptionsMap[selectedOption.get('id')];


    dispatch(updatePaymentOption(opts =>
      opts.update(index,
        opt => opt.withMutations((s) => {
          s.set('activeVal', newPaymentType);
          s.set('ComponentName', paymentName);

          const amount = opt.get('amount');
          const formatAmount = getFormatAmount(opt.toJS(), oldPaymentType);

          switch (newPaymentType) {
            case paymentTypes.CASH:
            case paymentTypes.REFUND_CASH:
              s.set('cashAmountPaid', amount);
              s.set('cashChange', formatCurrency(0));
              s.set('formatCashAmount', formatAmount);
              break;
            case paymentTypes.CHECK:
            case paymentTypes.REFUND_CHECK:
              s.set('formatCheckAmount', formatAmount);
              break;
            case paymentTypes.CREDIT:
              s.set('creditAvalible', s.get('creditAvalible'));
              s.set('creditOverdue', s.get('creditOverdue'));
              s.set('formatCreditAmount', formatAmount);
              break;
            case paymentTypes.CREDITCARD:
            case paymentTypes.REFUND_CREDITCARD:
              s.set('formatCreditCardAmount', formatAmount);
              break;
            case paymentTypes.ELECTRONICCHECK:
              s.set('formatECheckAmount', formatAmount);
              break;
            case paymentTypes.GIFTCARD:
            case paymentTypes.REFUND_GIFTCARD:
              s.set('formatGiftCardAmount', formatAmount);
              break;
            case paymentTypes.REFUND_ACCOUNT:
              s.set('formatAccountAmount', formatAmount);
              break;
            default:
              break;
          }
        }))));
    return dispatch(updateAvailableSplitIds(getAvailableOptionIds()));
  };

export const resetPaymentOptionAction = () =>
  (dispatch, getState) => {
    const overrideCcExpBeforePpLast = getState().paymentOptions.paymentPlan.get('overrideCcExpBeforePpLast');
    overrideCcExpBeforePpLast && dispatch(overrideCcExpiration(false));
    dispatch(updatePaymentOption(() => fromJS([])));
    dispatch(updateAvailableSplitIds(fromJS([])));
    dispatch(changeCreditResetStatus(true));
    dispatch(showErrors([]));
    dispatch(resetGiftCardList());
    return dispatch(changeRemaining({ remaining: 0 }));
  };

export const updatePaymentDeleteFlagAction = isDeleted =>
  dispatch => dispatch(updatePaymentDeleteFlag(isDeleted));

export const resetPaymentDeleteFlagAction = () =>
  dispatch => dispatch(updatePaymentDeleteFlag(false));

export const changePaymentOptionsAction = callback =>
  dispatch => dispatch(fetchPaymentOptions())
  .then(({ payload: { body: { payment_options: paymentOptions } } }) => {
    dispatch(resetPaymentOptionAction());
    fetchedPaymentOptions = paymentOptions;
    dispatch(fetchGiftCardList()).then(() => {
      (typeof callback === 'function') && callback(paymentOptions);
    });
  });

export const fetchAndResetRefundOptionAction = () =>
  dispatch => dispatch(fetchRefundOptions())
  .then(({ payload: { body: { refund_options: refundOptions } } }) => {
    dispatch(resetPaymentOptionAction());
    const refundAccountOption = refundOptions.filter(
      item => item.id === paymentTypes.REFUND_ACCOUNT);
    /* istanbul ignore else */
    if (!!refundAccountOption && refundAccountOption.length) {
      return dispatch(fetchAccountConfig()).then(() => refundOptions);
    }
    return refundOptions;
  })
  .then((refundOptions) => {
    resetPaymentOptions(refundOptions);

    // if the giftCardList is null, need to delete giftCardId from optionIds
    dispatch(fetchGiftCardList()).then(() => {
      let defaultAmount = 0;
      /* istanbul ignore else */
      if (refundOptions.length) {
        defaultAmount = getDefaultAmount();
        dispatch(splitPaymentAction(defaultAmount));
      }

      dispatch(changeRemaining(getRemaining(-1, defaultAmount)));
    });
  });

export const showOptionErrorsAction = (index, errors) =>
  dispatch => dispatch(updatePaymentOptionByKey(index, 'errors', fromJS(errors)));

export const clearOptionErrorAction = index =>
  dispatch => dispatch(updatePaymentOptionByKey(index, 'errors', fromJS([])));

const setResetAction = (type = resetTypes.NONE, context = {}) => ({
  type: PAYMENT_OPTIONS_SET_RESET,
  payload: {
    type,
    context
  }
});

export const catchResetAction = setResetAction;
export const cleanResetAction = () => setResetAction();

export const changePayNowAmountAction = paynowAmount =>
  (dispatch, getState) => {
    const { payment, paymentAction, paymentSummary } = getState();
    const { total, isPaymentActionValid, isRefund } = payment.toJS();
    const defaultAmount = paynowAmount;
    const paymentPlanAmount = parseFloat(total) - parseFloat(paynowAmount);
    const isSelectModifyPaymentPlan = paymentAction.get('isSelectModifyPaymentPlan');

    if (!isSelectModifyPaymentPlan) {
      resetPaymentOptions(fetchedPaymentOptions);
      dispatch(resetPaymentOptionAction());
      dispatch(updatePayNowAmount(paynowAmount));
    } else {
      dispatch(resetPaymentOptionAction());
    }

    setTimeout(() => {
      if (fetchedPaymentOptions.length && paynowAmount > 0) {
        if (isRefund) {
          dispatch(splitPaymentAction(defaultAmount));
          dispatch(cleanResetAction());
        } else {
          dispatch(catchResetAction(resetTypes.CHANGE_AMOUNT, { defaultAmount }));
        }
      } else {
        dispatch(cleanResetAction());
      }

      if (!isPaymentActionValid || isSelectModifyPaymentPlan) {
        const totalBalanceAmount = isSelectModifyPaymentPlan ? paymentSummary.get('totalBalanceAmount') : null;
        dispatch(changePaymentPlanAmount(fixedMoneyString(paymentPlanAmount), totalBalanceAmount));
      }
      dispatch(changeRemaining(0));
    }, 200);
  };

export const releaseResetAction = () => (dispatch, getState) => {
  const { type, context } = getState().paymentOptions.options.get('reset').toJS();

  switch (type) {
    case resetTypes.INIT:
      dispatch(splitPaymentAction(context.defaultAmount, context.isManuallySplit));
      dispatch(changeRemaining(getRemaining(-1, context.defaultAmount)));
      break;
    case resetTypes.CHANGE_AMOUNT:
      dispatch(splitPaymentAction(context.defaultAmount));
      break;
    case resetTypes.CHANGE_PAYER:
      dispatch(splitPaymentAction(context.total));
      dispatch(changeRemaining(getRemaining(-1)));
      break;
    default:
      break;
  }

  dispatch(cleanResetAction());
};

