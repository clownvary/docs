import URL from '../../urls';
import getSessionIDs from '../../utils/getSessionIDs';

export const FETCH_CARD_TYPE_ACTION = 'FETCH_CARD_TYPE_ACTION';
export const FETCH_CARD_TYPE_ACTION_SUCCESS = 'FETCH_CARD_TYPE_ACTION_SUCCESS';
export const FETCH_CARD_TYPE_ACTION_FAILURE = 'FETCH_CARD_TYPE_ACTION_FAILURE';
export const SHOW_CC_MODAL_ACTION = 'SHOW_CC_MODAL_ACTION';

export const CHANGE_EXPIRATION_DATE_MONTH_ACTION = 'CHANGE_EXPIRATION_DATE_MONTH_ACTION';
export const CHANGE_EXPIRATION_DATE_YEAR_ACTION = 'CHANGE_EXPIRATION_DATE_YEAR_ACTION';

export const FETCH_CC_ACCOUNT_HOLDER_ACTION = 'FETCH_CC_ACCOUNT_HOLDER_ACTION';
export const FETCH_CC_ACCOUNT_HOLDER_ACTION_SUCCESS = 'FETCH_CC_ACCOUNT_HOLDER_ACTION_SUCCESS';
export const FETCH_CC_ACCOUNT_HOLDER_ACTION_FAILURE = 'FETCH_CC_ACCOUNT_HOLDER_ACTION_FAILURE';

export const IS_CHECKED_FOR_PAY_ACTION = 'IS_CHECKED_FOR_PAY_ACTION';

/* eslint-disable import/no-mutable-exports */
export let _resolve = () => {};
export let _reject = () => {};
/* eslint-enable */


const changeModalDisplay = isDisplay => ({
  type: SHOW_CC_MODAL_ACTION,
  payload: { value: isDisplay }
});

const showNewCreditCardModalAction = () =>
  (dispatch) => {
    window.isInPendingPayment = true;
    return dispatch(changeModalDisplay(true));
  };

export const hideNewCreditCardModalAction = () =>
  (dispatch) => {
    window.isInPendingPayment = false;
    dispatch(changeModalDisplay(false));
    _reject(new Error('Reject By Manual'));
  };

export function fetchCardtypeAction() {
  return {
    types: [FETCH_CARD_TYPE_ACTION, FETCH_CARD_TYPE_ACTION_SUCCESS, FETCH_CARD_TYPE_ACTION_FAILURE],
    promise: API => API.get(URL.cardtype)
  };
}

export function requestAccountHolderAction({ batchID, receiptID }) {
  return {
    types: [FETCH_CC_ACCOUNT_HOLDER_ACTION,
      FETCH_CC_ACCOUNT_HOLDER_ACTION_SUCCESS,
      FETCH_CC_ACCOUNT_HOLDER_ACTION_FAILURE
    ],
    promise: API => API.get(URL.accountholder, {
      body: {
        batch_id: batchID,
        receipt_id: receiptID
      }
    }),
    meta: {
      ignoreLoadingbar: true
    }
  };
}

export const fetchAccountHolderAction = () => (dispatch, getState) => {
  const { batchID, receiptID } = getSessionIDs(getState());

  return dispatch(requestAccountHolderAction({ batchID, receiptID }));
};

export function isCheckedForPayAction(value) {
  return {
    type: IS_CHECKED_FOR_PAY_ACTION,
    payload: { value }
  };
}

export function changeExpirationDateMonthAction(value) {
  return (dispatch) => {
    dispatch({
      type: CHANGE_EXPIRATION_DATE_MONTH_ACTION,
      payload: { value }
    });
  };
}

export function changeExpirationDateYearAction(value) {
  return (dispatch) => {
    dispatch({
      type: CHANGE_EXPIRATION_DATE_YEAR_ACTION,
      payload: { value }
    });
  };
}

export const proceedNewCreditCardModalPromiseAction = () =>
  dispatch =>
  new Promise((resolve, reject) => {
    _resolve = resolve;
    _reject = reject;

    dispatch(showNewCreditCardModalAction());
  });
