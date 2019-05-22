import isFunction from 'lodash/isFunction';
import DateTimeFormat from 'shared/utils/DateTimeFormat';
import { maskCard } from '../../utils/creditCardHelper';
import AMS from '../../utils/ams-security-api';
import URL from '../../urls';
import getSessionIDs from '../../utils/getSessionIDs';

export const ECHECK_NEW_CHANGE_ACCOUNT_NUMBER = 'ECHECK_NEW_CHANGE_ACCOUNT_NUMBER';
export const ECHECK_NEW_CHANGE_ROUTING_NUMBER = 'ECHECK_NEW_CHANGE_ROUTING_NUMBER';
export const ECHECK_NEW_CHANGE_ACCOUNT_TYPE = 'ECHECK_NEW_CHANGE_ACCOUNT_TYPE';
export const ECHECK_NEW_CHANGE_SAVEINFORMATION = 'ECHECK_NEW_CHANGE_SAVEINFORMATION';

export const ECHECK_NEW_SAVE_SUCCESS = 'ECHECK_NEW_SAVE_SUCCESS';
export const FETCH_ECHECK_ACCOUNT_HOLDER_SUCCESS = 'FETCH_ECHECK_ACCOUNT_HOLDER_SUCCESS';
export const FETCH_ECHECK_AMS_ACCOUNTID_SUCCESS = 'FETCH_ECHECK_AMS_ACCOUNTID_SUCCESS';

export const ECHECK_NEW_RESET = 'ECHECK_NEW_RESET';
export const ECHECK_NEW_SET_ERROR = 'ECHECK_NEW_SET_ERROR';
export const ECHECK_NEW_SET_SHOW_MODAL = 'ECHECK_NEW_SET_SHOW_MODAL';

let _resolve = null;
let _reject = null;

const getCipher = (accountTypeValue,
  accountNumber,
  routingNumber,
  accountHolderName,
  amsAccountIdModulus,
  amsAccountIdExponent) => {
  const request = new AMS.AccountInfo();
  request.setAccountType(accountTypeValue);
  request.setAccountNumber(accountNumber);
  request.setBankID(routingNumber);
  request.setAccountOwner(accountHolderName);
  request.setModulus(amsAccountIdModulus || '');
  request.setExponent(amsAccountIdExponent || '');

  return AMS.getCipher(request);
};

const changECheckDisplay = display => ({
  type: ECHECK_NEW_SET_SHOW_MODAL,
  payload: { display }
});

const processReject = (err) => {
  // istanbul ignore if
  if (isFunction(_reject)) {
    const myError = err || new Error('no Error');
    _resolve = null;
    return _reject(myError);
  }

  return Promise.reject();
};

const processResolve = (result) => {
  // istanbul ignore if
  if (isFunction(_resolve)) {
    _reject = null;
    return _resolve(result);
  }

  return Promise.resolve();
};

export function changeECheckAccountType(value) {
  return {
    type: ECHECK_NEW_CHANGE_ACCOUNT_TYPE,
    payload: { value }
  };
}

export function changeECheckSaveInformation(value) {
  return {
    type: ECHECK_NEW_CHANGE_SAVEINFORMATION,
    payload: { value }
  };
}

export function setECheckError(error) {
  return {
    type: ECHECK_NEW_SET_ERROR,
    payload: { error }
  };
}

const requestECheckAccountHolder = ({ batchID, receiptID }) => ({
  types: ['', FETCH_ECHECK_ACCOUNT_HOLDER_SUCCESS, ''],
  promise: API => API.get(URL.accountholder, {
    body: {
      batch_id: batchID,
      receipt_id: receiptID
    }
  }),
  meta: {
    ignoreLoadingbar: true,
    ignoreBusinessErrors: true
  }
});


const fetchECheckAccountHolder = () => (dispatch, getState) => {
  const { batchID, receiptID } = getSessionIDs(getState());
  return dispatch(requestECheckAccountHolder({ batchID, receiptID }));
};

function fetchECheckAMSAccountId(params) {
  return {
    types: ['', FETCH_ECHECK_AMS_ACCOUNTID_SUCCESS, ''],
    promise: API => API.get(URL.amsaccountid, {
      body: params
    }),
    meta: {
      ignoreLoadingbar: true,
      ignoreBusinessErrors: true
    }
  };
}

const requestNewECheckInformation = (args, { batchID, receiptID }) => ({
  types: ['', ECHECK_NEW_SAVE_SUCCESS, ''],
  promise: API => API.post(URL.addNewECheck, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      ...args,
      batch_id: batchID,
      receipt_id: receiptID
    })
  })
});

const saveNewECheckInformation = args => (dispatch, getState) => {
  const { batchID, receiptID } = getSessionIDs(getState());
  return dispatch(requestNewECheckInformation(args, { batchID, receiptID }));
};

function saveAndSetNewECheck(params) {
  return dispatch =>
    dispatch(saveNewECheckInformation(params))
    .then(({
      payload: {
        body: {
          echeck_obj: {
            echeck_id: echeckId
          }
        }
      }
    }) => {
      dispatch(changECheckDisplay(false));
      return processResolve({
        ...params,
        echeck_id: echeckId
      });
    });
}

function makeECheckPayment(walletId, accountNumber, routingNumber) {
  return (dispatch, getState) => {
    const {
      accountTypeValue,
      saveInformation
    } = getState().paymentModals.newECheck.toJS();

    /* istanbul ignore next */
    const params = {
      eft_account_number: maskCard(accountNumber),
      eft_routing_number: maskCard(routingNumber),
      eft_account_type: accountTypeValue,
      eft_account_type_name: accountTypeValue === 'C' ? 'Checking' : 'Savings',
      eft_ams_account_id: walletId,
      is_add_to_customer_ecp: saveInformation
    };
    return dispatch(saveAndSetNewECheck(params));
  };
}

export function saveNewECheck(accountNumber, routingNumber) {
  return (dispatch, getState) => {
    const { accountTypeValue } = getState().paymentModals.newECheck.toJS();

    return dispatch(fetchECheckAccountHolder())
      .then(({
        payload: {
          body: {
            account_holder: {
              account_holder_name: accountHolderName,
              ams_account_id_modulus: amsAccountIdModulus,
              ams_account_id_exponent: amsAccountIdExponent
            }
          }
        }
      }) => {
        switch (amsAccountIdModulus) {
          case 'error':
            dispatch(
              setECheckError('A communication error with payment services is preventing your data from being processed at this time')
            );
            return processReject();
          case 'localdemo':
            return dispatch(makeECheckPayment('Demo AccountID', accountNumber, routingNumber));
          default:
            /* Generate ams_account_id */
            return dispatch(fetchECheckAMSAccountId({
              key_number: accountNumber,
              cc_ams_account_id_modulus: amsAccountIdModulus,
              time: DateTimeFormat.getFullServerTodayDate().getTime(),
              cipher_text: getCipher(accountTypeValue,
                accountNumber,
                routingNumber,
                accountHolderName,
                amsAccountIdModulus,
                amsAccountIdExponent),
              is_ecp: true,
              ams_retention_date: ''
            })).then(
              ({ payload: { body: { ams_account_info: { wallet_id: walletId } } } }) =>
              dispatch(makeECheckPayment(walletId, accountNumber, routingNumber))
            );
        }
      })
      .catch((error) => {
        error && error.payload && dispatch(setECheckError(error.payload.headers.response_message));
      });
  };
}

export const cancelAction = () =>
  (dispatch) => {
    dispatch(changECheckDisplay(false));
    return processReject();
  };

export const showECheckModalPromiseAction = () =>
  dispatch => new Promise((resolve, reject) => {
    _resolve = resolve;
    _reject = reject;

    dispatch(changECheckDisplay(true));
  });
