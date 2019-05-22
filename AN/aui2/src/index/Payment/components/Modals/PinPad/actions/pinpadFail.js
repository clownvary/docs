import { clearError } from 'shared/actions/Error';
import getUrlsForPinpad from './pinpadHelper';

const URL = getUrlsForPinpad();
export const SHOW_OR_HIDE_FAIL_ACTIONS_BTNS = 'SHOW_OR_HIDE_FAIL_ACTIONS_BTNS';
export const CANCEL_CARD_PAYMENT = 'CANCEL_CARD_PAYMENT';
export const CANCEL_CARD_PAYMENT_SUCCESS = 'CANCEL_CARD_PAYMENT_SUCCESS';
export const CANCEL_CARD_PAYMENT_FAILURE = 'CANCEL_CARD_PAYMENT_FAILURE';

export const LEAVE_BALANCE = 'LEAVE_BALANCE';
export const LEAVE_BALANCE_SUCCESS = 'LEAVE_BALANCE_SUCCESS';
export const LEAVE_BALANCE_FAILURE = 'LEAVE_BALANCE_FAILURE';

export function showFailActionBtns(flag) {
  return {
    type: SHOW_OR_HIDE_FAIL_ACTIONS_BTNS,
    payload: {
      shown: flag
    }
  };
}

function _cancelCardPayment({ batchID, receiptID }) {
  return {
    types: [CANCEL_CARD_PAYMENT, CANCEL_CARD_PAYMENT_SUCCESS, CANCEL_CARD_PAYMENT_FAILURE],
    promise: API => API.post(URL.cancelCardPayment, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        receipt_id: receiptID,
        warned: false,
        stop_roll_over: false,
        batch_id: batchID
      })
    }),
    meta: {
      ignoreLoadingbar: true,
      ignoreSystemErrors: true,
      ignoreBusinessErrors: true
    }
  };
}

export function cancelCardPayment(params, cancelSuccess, cancelFail) {
  return dispatch => dispatch(_cancelCardPayment(params)).then(() => {
    dispatch(clearError());
    cancelSuccess && cancelSuccess();
  }, ({ payload: { headers: { response_message } } }) => {
    cancelFail && cancelFail(response_message);
  });
}

function _cardLeaveBlance({ batchID, receiptID }) {
  return {
    types: [LEAVE_BALANCE, LEAVE_BALANCE_SUCCESS, LEAVE_BALANCE_FAILURE],
    promise: API => API.post(URL.cardLeaveBalance, {
      body: {
        receipt_id: receiptID,
        batch_id: batchID
      }
    }),
    meta: {
      ignoreLoadingbar: true,
      ignoreSystemErrors: true,
      ignoreBusinessErrors: true
    }
  };
}

export function cardLeaveBlance(params, leaveBalanceSuccessCallback, leaveBalanceErrorCallback) {
  return dispatch => dispatch(_cardLeaveBlance(params))
    .then(({ payload: { body: { leave_balance_result: { receipt_header_id } } } }) => {
      leaveBalanceSuccessCallback && leaveBalanceSuccessCallback(receipt_header_id);
    }, ({ payload: { headers: { response_message } } }) => {
      leaveBalanceErrorCallback && leaveBalanceErrorCallback(response_message);
    });
}
