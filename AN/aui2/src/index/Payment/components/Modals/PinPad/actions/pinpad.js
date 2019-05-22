import { deepMerge } from 'shared/utils/func';
import { addError } from 'shared/actions/Error';

import getUrlsForPinpad from './pinpadHelper';
import { showModal, updateModalTitle } from './pinpadModal';
import { showFailActionBtns } from './pinpadFail';
import { titles, actionTypes } from '../consts';
import { getCardTypeSystemIdByName, getCardTypeIdByCardTypeName } from '../../../../utils/creditCardHelper';

const URL = getUrlsForPinpad();
export const GO_TO_NEXT_PAGE = 'GO_TO_NEXT_PAGE';
export const INIT_DATA_OF_PINPAD = 'INIT_DATA_OF_PINPAD';

// Only use in new device logic
export const GET_APD_INFORMATION = 'GET_APD_INFORMATION';
export const GET_APD_INFORMATION_SUCCESS = 'GET_APD_INFORMATION_SUCCESS';
export const GET_APD_INFORMATION_FAILURE = 'GET_APD_INFORMATION_FAILURE';

// Only use in new device logic
export const GET_APD_SERVER_STATUS = 'GET_APD_SERVER_STATUS';
export const GET_APD_SERVER_STATUS_SUCCESS = 'GET_APD_SERVER_STATUS_SUCCESS';
export const GET_APD_SERVER_STATUS_FAILURE = 'GET_APD_SERVER_STATUS_FAILURE';

// Only use in new device logic
export const PROCESS_APD_RESPONSE = 'PROCESS_APD_RESPONSE';
export const PROCESS_APD_RESPONSE_SUCCESS = 'PROCESS_APD_RESPONSE_SUCCESS';
export const PROCESS_APD_RESPONSE_FAILURE = 'PROCESS_APD_RESPONSE_FAILURE';

export const GET_APD_PAYMENT_INFO = 'GET_APD_PAYMENT_INFO';
export const GET_APD_PAYMENT_INFO_SUCCESS = 'GET_APD_PAYMENT_INFO_SUCCESS';
export const GET_APD_PAYMENT_INFO_FAILURE = 'GET_APD_PAYMENT_INFO_FAILURE';

export const COMMUNICATE_WITH_DEVICE = 'COMMUNICATE_WITH_DEVICE';
export const UPDATE_PROMPT_MESSAGE = 'UPDATE_PROMPT_MESSAGE';
export const UPDATE_ERROR_MESSAGE = 'UPDATE_ERROR_MESSAGE';
export const UPDATE_SUCCESS_MESSAGE = 'UPDATE_SUCCESS_MESSAGE';
export const ACCOUNT_HOLDER_INFO = 'ACCOUNT_HOLDER_INFO';
export const CLEAR_PINPAD_PAYS = 'CLEAR_PINPAD_PAYS';
export const UPDATE_CURRENT_PAY_INDEX = 'UPDATE_CURRENT_PAY_INDEX';
export const UPDATE_SUCCESS_PAYMENT = 'UPDATE_SUCCESS_PAYMENT';

export const PINPAD_SET_IS_NEW_CARD_FLAG = 'PINPAD_SET_IS_NEW_CARD_FLAG';

let nextPageFunc = () => ({
  type: GO_TO_NEXT_PAGE,
  payload: {
    value: false
  }
});

let _resolve = () => {};
let _reject = () => {};

const setIsNewCard = bFlag => ({
  type: PINPAD_SET_IS_NEW_CARD_FLAG,
  payload: { bFlag }
});

export function initDataOfPinpad(data) {
  return {
    type: INIT_DATA_OF_PINPAD,
    payload: { data }
  };
}

// Only use in new device logic
export function getAPDInformation() {
  return {
    types: [GET_APD_INFORMATION, GET_APD_INFORMATION_SUCCESS, GET_APD_INFORMATION_FAILURE],
    promise: API => API.get(URL.getAPDInfo, {
      body: { is_test: true }
    })
  };
}

const getCreditCardexpireInfo = walletId => ({
  types: ['', '', ''],
  promise: API => API.get(URL.ccexpireinfo, {
    body: { wallet_id: walletId }
  })
});

// Only use in new device logic
function _getAPDServerStatus({ batchID, receiptID }) {
  return {
    types: [GET_APD_SERVER_STATUS, GET_APD_SERVER_STATUS_SUCCESS, GET_APD_SERVER_STATUS_FAILURE],
    promise: API => API.get(URL.getAPDServerStatus, {
      body: {
        batch_id: batchID,
        receipt_id: receiptID,
        is_wallet_save: false
      }
    }),
    meta: {
      ignoreLoadingbar: true
    }
  };
}

function _receiptCommitError(value) {
  // Set error on the payment page. Use random error code > 1000
  // so error will be detected as business error
  // and will display at page top rather than as system error which will display in popup
  return (dispatch) => {
    dispatch(addError({
      payload: {
        code: '3000',
        message: value
      }
    }));
  };
}

// Only use in new device logic
export function getAPDServerStatus(params, successCallback, errorCallback) {
  return dispatch => dispatch(_getAPDServerStatus(params))
    .then(({ payload: { body: { apd_server_status } } }) => {
      successCallback && successCallback(apd_server_status);
    }, ({ payload: { headers: { response_code: responseCode } } }) => {
      // istanbul ignore else
      if (responseCode === '0002') {
        errorCallback && errorCallback();
      }
    });
}

// Only use in new device logic
function _processAPDResponse(params) {
  return {
    types: [PROCESS_APD_RESPONSE, PROCESS_APD_RESPONSE_SUCCESS, PROCESS_APD_RESPONSE_FAILURE],
    promise: API => API.post(URL.processAPDResponse, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(params)
    }),
    meta: {
      ignoreLoadingbar: true
    }
  };
}

// Only use in new device logic
export function processAPDResponse(params, successCallback, failCallback) {
  return dispatch => dispatch(_processAPDResponse(params))
    .then(({ payload: { body: { apd_process_response } } }) => {
      successCallback && successCallback(apd_process_response);
    }, () => {
      failCallback && failCallback();
    });
}

export function getAPDPaymentInfo({ batchID, receiptID }) {
  return {
    types: [GET_APD_PAYMENT_INFO, GET_APD_PAYMENT_INFO_SUCCESS, GET_APD_PAYMENT_INFO_FAILURE],
    promise: API => API.get(URL.getAPDPaymentInfo, {
      body: {
        batch_id: batchID,
        receipt_id: receiptID
      }
    })
  };
}

export function setAccountHolder({ payload: { body: { account_holder } } }) {
  return {
    type: ACCOUNT_HOLDER_INFO,
    payload: {
      value: account_holder
    }
  };
}

export function communicatingWithDevice(flag) {
  return {
    type: COMMUNICATE_WITH_DEVICE,
    payload: {
      value: flag
    }
  };
}

export function gotoNextPage(receiptHeaderId) {
  return dispatch => dispatch(nextPageFunc(receiptHeaderId));
}

// Always keep the credit card above the debit card if have both.
function sortPays(initPinpadData) {
  const pinpadData = deepMerge({}, initPinpadData);
  const { pays, debitCardId } = pinpadData;
  const finalPays = deepMerge([], pays);

  if ((pays.length > 1) && (pays[0].paymentTypeId === debitCardId)) {
    finalPays[0] = pays[1];
    finalPays[1] = pays[0];
  }

  pinpadData.pays = finalPays;

  return pinpadData;
}

export function swipeCardInPinpadModal(dataObj, actions) {
  const { fetchAccountHolderAction, gotoNextPage: next } = actions;
  nextPageFunc = next;
  const data = sortPays(deepMerge({}, dataObj));

  return dispatch => Promise.all([
    dispatch(initDataOfPinpad(data)),
    __STATIC__ ? dispatch(getAPDInformation()) : null, // Only use in new device logic
    dispatch(getAPDPaymentInfo(data)),
    dispatch(fetchAccountHolderAction())
  ]).then((args) => {
    const accrountHolderResult = args[3];
    dispatch(setAccountHolder(accrountHolderResult));
    dispatch(setIsNewCard(false));
    dispatch(updateModalTitle(titles.TRANSACTION_TITLE));
    dispatch(showModal(true));
    dispatch(communicatingWithDevice(true));
  });
}

export const processResolveAction = ({ walletId, ccMasked, ccCardTypeName }) =>
  (dispatch, getState) => dispatch(getCreditCardexpireInfo(walletId))
  .then(({
    payload: {
      body: { cc_exp: expirationDate }
    }
  }) => {
    const { cardTypeList } = getState().paymentModals.newCreditCard.toJS();
    const cardTypeSystemId = getCardTypeSystemIdByName(ccCardTypeName, cardTypeList.data);
    const cardTypeId = getCardTypeIdByCardTypeName(ccCardTypeName, cardTypeList.data);

    dispatch(showModal(false));

    _resolve({
      walletId,
      ccNumberValue: ccMasked,
      cardTypeId,
      cardTypeSystemId,
      expirationDate
    });
  });

export function getCardInfoByPinPadPromiseAction(dataObj, actions) {
  const { fetchAccountHolderAction, gotoNextPage: next } = actions;
  nextPageFunc = next;
  const data = sortPays(deepMerge({}, dataObj));

  return dispatch => Promise.all(
    [
      dispatch(initDataOfPinpad(data)),
      dispatch(fetchAccountHolderAction())
    ])
    .then(args => new Promise(
      (resolve, reject) => {
        _resolve = resolve;
        _reject = reject;

        const accrountHolderResult = args[1];
        dispatch(setAccountHolder(accrountHolderResult));
        dispatch(setIsNewCard(true));
        dispatch(updateModalTitle(titles.NEW_CARD_TITLE));
        dispatch(showModal(true));
        dispatch(communicatingWithDevice(true));
      }));
}

export const processRejectAction = () =>
  () => _reject();

export function updateCurrentPayIndex(index) {
  return {
    type: UPDATE_CURRENT_PAY_INDEX,
    payload: {
      value: index
    }
  };
}

export function updatePromptMessage(message, actionType = actionTypes.HIDE_RETRY) {
  return {
    type: UPDATE_PROMPT_MESSAGE,
    payload: {
      message,
      actionType
    }
  };
}

function updateErrMsg({ message, isServerErr, hasError, actionType = actionTypes.SHOW_RETRY }) {
  return {
    type: UPDATE_ERROR_MESSAGE,
    payload: {
      message,
      isServerErr,
      actionType,
      hasError // should set hasError to false when retry
    }
  };
}

export function updateErrorMessage(obj) {
  return (dispatch, getState) => Promise.all([
    dispatch(updateErrMsg(obj))
  ]).then(() => {
    const {
      pays,
      errorMessage
    } = getState().paymentModals.pinpad.payment.toJS();

    const paysNotSwipe = pays.filter(item => !item.init);

    // istanbul ignore else
    if (paysNotSwipe.length) {
      if (errorMessage) {
        dispatch(updateErrMsg({
          message: '',
          isServerErr: true
        }));
      }

      dispatch(showFailActionBtns(false));
      dispatch(communicatingWithDevice(true));
      dispatch(updateCurrentPayIndex(pays.indexOf(paysNotSwipe[0])));
    }
  });
}

export function notifySuccessPayment({ index }) {
  return {
    type: UPDATE_SUCCESS_PAYMENT,
    payload: {
      index
    }
  };
}

function updateSuccessMsg(message) {
  return {
    type: UPDATE_SUCCESS_MESSAGE,
    payload: {
      message
    }
  };
}


export function updateSuccessMessage({ message, finishReceiptErrorMessage }) {
  return (dispatch, getState) => {
    const {
      currentPayIndex,
      pays: oldPays
    } = getState().paymentModals.pinpad.payment.toJS();
    const curPay = oldPays[currentPayIndex];

    return Promise.all([
      dispatch(updateSuccessMsg(message)),
      dispatch(notifySuccessPayment(curPay))
    ]).then(() => {
      const {
        pays,
        receiptHeaderId
      } = getState().paymentModals.pinpad.payment.toJS();

      const isAllPaysSuccess = pays.every(item => item.swipeSuccess);

      if (isAllPaysSuccess) {
        if (finishReceiptErrorMessage && finishReceiptErrorMessage.length) {
          // Close the pinpad modal window now and return to the payment page
          dispatch(showModal(false));
          dispatch(_receiptCommitError(finishReceiptErrorMessage));
        } else {
          // Continue on to the permit confirmation page
          dispatch(gotoNextPage(receiptHeaderId));
        }
      }

      const paysNotSwipe = pays.filter(item => !item.init);

      if (paysNotSwipe.length) {
        dispatch(communicatingWithDevice(true));
        dispatch(updateCurrentPayIndex(pays.indexOf(paysNotSwipe[0])));
      } else {
        dispatch(showFailActionBtns(true));
      }

      return false;
    });
  };
}


export function clearPinpadPays() {
  return {
    type: CLEAR_PINPAD_PAYS
  };
}
