import isFunction from 'lodash/isFunction';
import { isCheckedForPayAction } from './NewCreditCard';
import URL from '../../urls';
import {
  formatExpirationDate,
  getCardTypeSystemIdByCardTypeId,
  getValidCardTypeId
} from '../../utils/creditCardHelper';
import getSessionIDs from '../../utils/getSessionIDs';

export const SET_CARD_INFO = 'SET_CARD_INFO';
export const SET_AMS_ACCOUNT_INFO = 'SET_AMS_ACCOUNT_INFO';
export const SHOW_MODAL = 'SHOW_MODAL';

export const FETCH_AMS_ACCOUNTID = 'FETCH_AMS_ACCOUNTID';
export const FETCH_AMS_ACCOUNTID_SUCCESS = 'FETCH_AMS_ACCOUNTID_SUCCESS';
export const FETCH_AMS_ACCOUNTID_FAILURE = 'FETCH_AMS_ACCOUNTID_FAILURE';

export const FETCH_ACCOUNT_HOLDER = 'FETCH_ACCOUNT_HOLDER';
export const FETCH_ACCOUNT_HOLDER_SUCCESS = 'FETCH_ACCOUNT_HOLDER_SUCCESS';
export const FETCH_ACCOUNT_HOLDER_FAILURE = 'FETCH_ACCOUNT_HOLDER_FAILURE';

export const SET_SERVER_ERROR = 'SET_SERVER_ERROR';

let _resolve = null;
let _reject = null;

const changeMagtekModalDisplay = (
  isShowModal, totalFee, cardTypeList, isShowSaveCardInformation
) => ({
  type: SHOW_MODAL,
  payload: {
    isShowModal,
    totalFee,
    cardTypeList,
    isShowSaveCardInformation
  }
});

const showMagtekModalAction = (totalFee, cardTypeList, isShowSaveCardInformation) =>
  (dispatch) => {
    window.isInPendingPayment = true;
    dispatch(changeMagtekModalDisplay(true, totalFee, cardTypeList, isShowSaveCardInformation));
  };

const processReject = (err) => {
  /* istanbul ignore if */
  if (isFunction(_reject)) {
    const myError = err || new Error('no Error');
    _resolve = null;
    return _reject(myError);
  }

  return Promise.reject();
};

const processResolve = (result) => {
  /* istanbul ignore next */
  if (isFunction(_resolve)) {
    _reject = null;
    return _resolve(result);
  }

  return Promise.resolve();
};

export const hideMagtekModalAction = (totalFee, cardTypeList) =>
  (dispatch) => {
    window.isInPendingPayment = false;
    dispatch(changeMagtekModalDisplay(false, totalFee, cardTypeList));
    return processReject();
  };

export const setCardInfo = cardInfo => ({
  type: SET_CARD_INFO,
  payload: {
    cardInfo
  }
});

export const setAMSAccountInfo = AMSAccountInfo => ({
  type: SET_AMS_ACCOUNT_INFO,
  payload: {
    AMSAccountInfo
  }
});

export const setServerError = error => ({
  type: SET_SERVER_ERROR,
  payload: {
    error
  }
});

export const fetchAMSAccountIdAction = params => ({
  types: [FETCH_AMS_ACCOUNTID, FETCH_AMS_ACCOUNTID_SUCCESS, FETCH_AMS_ACCOUNTID_FAILURE],
  promise: API => API.get(URL.amsaccountid4magnesafe, {
    body: {
      ...params
    }
  }),
  meta: {
    ignoreLoadingbar: true,
    ignoreBusinessErrors: true,
    ignoreSystemErrors: true
  }
});

export const requestAccountHolderAction = ({ batchID, receiptID }) => ({
  types: [FETCH_ACCOUNT_HOLDER, FETCH_ACCOUNT_HOLDER_SUCCESS, FETCH_ACCOUNT_HOLDER_FAILURE],
  promise: API => API.get(URL.accountholder, {
    body: {
      batch_id: batchID,
      receipt_id: receiptID
    }
  }),
  meta: {
    ignoreLoadingbar: true,
    ignoreBusinessErrors: true,
    ignoreSystemErrors: true
  }
});


const fetchAccountHolderAction = () => (dispatch, getState) => {
  const { batchID, receiptID } = getSessionIDs(getState());
  return dispatch(requestAccountHolderAction({ batchID, receiptID }));
};

export const proceedMagtekModalPromiseAction = (fee, isShowSaveCardInformation) =>
  (dispatch, getState) => new Promise((resolve, reject) => {
    _reject = reject;
    _resolve = resolve;

    const { cardTypeList } = getState().paymentModals.newCreditCard.toJS();

    return dispatch(showMagtekModalAction(fee, cardTypeList, isShowSaveCardInformation));
  });

export const payment = () =>
  (dispatch, getState) => {
    const { magtek, newCreditCard } = getState().paymentModals;
    const { cardTypeList: { data: cardTypeList } } = newCreditCard.toJS();
    const {
      AMSAccountInfo: { wallet_id: walletId },
      cardInfo: {
        CCNumberValue,
        cardTypeID,
        ExpirationDateMonthValue: month,
        ExpirationDateYearValue: year,
        saveCardInformation
      }
    } = magtek.toJS();
    dispatch(isCheckedForPayAction(true));

    const result = {
      walletId,
      ccNumberValue: CCNumberValue,
      cardTypeId: getValidCardTypeId(cardTypeID, cardTypeList),
      cardTypeSystemId: getCardTypeSystemIdByCardTypeId(cardTypeID, cardTypeList),
      expirationDate: formatExpirationDate(month, year),
      saveCardInformation
    };

    return processResolve(result);
  };

export const generateWalletID = (cardInfo, accountIDParams, callBackFun) =>
  (dispatch) => {
    const { CCNumberValue } = cardInfo;

    return dispatch(fetchAccountHolderAction())
      .then(
        ({
          payload: {
            body: {
              account_holder: {
                ams_account_id_modulus: modulus,
                account_holder_zip: zip
              }
            }
          }
        }) => {
          dispatch(setCardInfo(cardInfo));

          const params = { ...accountIDParams,
            zip,
            key_number: CCNumberValue,
            cc_ams_account_id_modulus: modulus,
            cipher_text: '',
            is_ecp: false,
            ams_retention_date: ''
          };

          /* Generate ams_account_id */
          return dispatch(fetchAMSAccountIdAction(params))
            .then(
              ({ payload: { body: { ams_account_info: amsAccountInfo } } }) => {
                const { wallet_id: walletId } = amsAccountInfo;
                /* istanbul ignore else */
                if (walletId && callBackFun) { callBackFun(walletId); }
                return dispatch(setAMSAccountInfo(amsAccountInfo));
              },
              ({ payload: { headers: { response_message: message } } }) => {
                /* istanbul ignore else */
                if (message) {
                  return Promise.reject(dispatch(setServerError(message)));
                }

                return Promise.reject(new Error('error get ams account id'));
              });
        },
        ({ payload: { headers: { response_message: message } } }) => {
          /* istanbul ignore else */
          if (message) {
            dispatch(setServerError(message));
          }
        });
  };
