import URL from '../urls';

export const SET_WAIVER_ERRORS = 'SET_WAIVER_ERRORS';
export const PERMIT_DETAILS_CHANGED = 'PERMIT_DETAILS_CHANGED';
export const FETCH_READY4CHECKOUT_SUCCESS = 'FETCH_READY4CHECKOUT_SUCCESS';
export const FETCH_INCART_SUCCESS = 'FETCH_INCART_SUCCESS';

export function setWaiverErrors(waiverErrors) {
  const errors = waiverErrors || {
    errorsKey: 'Please check all required waivers.'
  };
  return {
    type: SET_WAIVER_ERRORS,
    payload: {
      errors
    }
  };
}

export function permitDetailsChanged() {
  return {
    type: PERMIT_DETAILS_CHANGED
  };
}

export function fetchReady4Checkout(batchID, receiptID) {
  return {
    types: ['', FETCH_READY4CHECKOUT_SUCCESS, ''],
    promise: API => API.get(URL.ready4checkout, {
      body: {
        batch_id: batchID,
        receipt_id: receiptID
      }
    })
  };
}

export function fetchInCart(batchID, receiptID) {
  return {
    types: ['', FETCH_INCART_SUCCESS, ''],
    promise: API => API.get(URL.incart, {
      body: {
        batch_id: batchID,
        receipt_id: receiptID
      }
    })
  };
}

