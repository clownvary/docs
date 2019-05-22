import createFSA from 'react-base-ui/lib/utils/createFSA';
import { clearAll, showWarning, showError } from 'shared/utils/messages';
import { isValidationErrorFromApi } from 'shared/utils/apiError';
import { confirm } from 'react-base-ui/lib/services/dialog';
import { formatI18n } from 'shared/translation/formatI18n';
import uniqBy from 'lodash/uniqBy';
// import ExtraTealiumService from 'shared/config/extraTealiumService';
import { uiClearWaiverErrors } from './checkout';
import { initCartPageAsyncAction, fetchCartPageDataAsyncAction } from './common';
import selfMessages from '../components/Transactions/translations';

import API from '../api';
import {
  TRANSACTIONS_UI_LIST,
  TRANSACTIONS_UI_EXPAND_STATUS,
  TRANSACTIONS_UI_REMOVE_EXPAND_STATUS,
  TRANSACTIONS_UI_CLEAR_EXPAND_STATUS,
  TRANSACTIONS_UI_GET_PAYMENT_PLAN
 } from '../consts/actionTypes';

const uiTransactionsListAction = createFSA(TRANSACTIONS_UI_LIST);
const uiTransactionsExpandStatustAction = createFSA(TRANSACTIONS_UI_EXPAND_STATUS);
const uiTransactionsRemoveExpandStatustAction = createFSA(TRANSACTIONS_UI_REMOVE_EXPAND_STATUS);
const uiTransactionPaymentPlanAction = createFSA(TRANSACTIONS_UI_GET_PAYMENT_PLAN);

export const clearExpandStatustAction =
        createFSA(TRANSACTIONS_UI_CLEAR_EXPAND_STATUS);

export const setTransactionExpandStatus = receiptEntryIdentity => dispatch =>
  dispatch(uiTransactionsExpandStatustAction(receiptEntryIdentity));


export const fetchTransactionsAction = () => (dispatch, getState) =>
  API.getTransactions().then((response) => {
    const {
      body: {
        pay_on_account: payOnAccount,
        required_outstanding_balances: isRequired,
        pay_on_account_amount: payOnAccountWarning,
        participants,
        order_summary: orderSummary,
        warnings
      }
    } = response;
    const intl = getState().intl;
    const messages = intl.get('messages');
    const currentIntl = messages.get(intl.get('currentLocale'));
    const warningTip = formatI18n(
      currentIntl.get(selfMessages.payOnAccountWarning.id)
    );

    payOnAccountWarning && showWarning(warningTip);
    warnings.length && showWarning(warnings, { appendMode: true });

    dispatch(uiTransactionsListAction({ payOnAccount, isRequired, participants, orderSummary }));
    uiClearWaiverErrors();
    // const tealiumID = getState().configurations.get('tealium_service_mode');
    const Arr = [];
    participants.forEach((item) => {
      item.transactions.forEach((_item) => {
        Arr.push(_item.item_id);
      });
    });
    // ExtraTealiumService(tealiumID, Arr);
  });

export const deleteTransactionClusterAction = (id, receiptEntryIdentity) =>
  (dispatch) => {
    clearAll();
    return API.deleteTransaction({ id })
      .catch((error) => {
        if (isValidationErrorFromApi(error)) {
          showError(error.message.details);
          dispatch(initCartPageAsyncAction());
          return Promise.reject(new Error(error.message.details));
        }
        return Promise.reject(error);
      })
      .then(() => {
        dispatch(uiTransactionsRemoveExpandStatustAction(receiptEntryIdentity));
        return dispatch(initCartPageAsyncAction());
      });
  };

export const deleteOutStandingBalanceClusterAction = id =>
  (dispatch) => {
    clearAll();
    return API.deleteOutStandingBalance({ id })
      .catch((error) => {
        isValidationErrorFromApi(error) && dispatch(initCartPageAsyncAction());
        return Promise.reject(error);
      })
      .then(() => dispatch(initCartPageAsyncAction()));
  };

export const confirmDelete = (id, receiptEntryIdentity) => dispatch => id && confirm(
  'Are you sure you want to remove this transaction from the cart?', {
    title: 'Delete Transaction',
    showCancel: true,
    cancelText: 'No',
    confirmText: 'Yes'
  }
).then(
  () => dispatch(deleteTransactionClusterAction(id, receiptEntryIdentity))
);

export const confirmBalanceDeleteAction = id => dispatch => id && confirm(
  'Are you sure you want to remove this transaction from the cart?', {
    title: 'Delete Transaction',
    showCancel: true,
    cancelText: 'No',
    confirmText: 'Yes'
  }
).then(
  () => dispatch(deleteOutStandingBalanceClusterAction(id))
);

const fetchPaymentPlanAsyncAction = id => (dispatch, getState) =>
  API.getPaymentPlan({ id }).then((response) => {
    const { body: { payment_plan: paymentPlan } } = response;
    const prePaymentPlans = getState().modules.Cart.ShoppingCart.transactions.get('paymentPlans').toJS();
    prePaymentPlans.unshift(paymentPlan);
    const paymentPlans = uniqBy(prePaymentPlans, 'reno');
    return dispatch(uiTransactionPaymentPlanAction({ paymentPlans }));
  });

export const fetchAllPaymentPlansAsyncAction = () => (dispatch, getState) => {
  const promiseQueue = [];
  const transactionsPaymentPlan = [];
  const participants = getState().modules.Cart.ShoppingCart.transactions.get('participants');
  participants.map(pItem => pItem.get('transactions').map((item) => {
    if (item.get('check_payment_plan') && item.get('show_payment_plan')) {
      transactionsPaymentPlan.push(item);
    }
    return item;
  }));
  transactionsPaymentPlan.map(item => promiseQueue.push(dispatch(fetchPaymentPlanAsyncAction(item.get('reno')))));

  return Promise.all(promiseQueue);
};

export const enablePaymentPlanAction = (id, enable) => dispatch =>
API.enablePaymentPlan({ reno: id, enable }).then((response) => {
  const { body: { success } } = response;

  if (success === 'true') {
    return dispatch(fetchCartPageDataAsyncAction());
  }
  return Promise.reject();
});
