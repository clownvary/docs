import URL from '../../urls';
import { updatePaymentOptionByKeyAction } from './options';
import getSessionIDs from '../../utils/getSessionIDs';

export const FETCH_REFUND_ACCOUNT_CONFIG = 'FETCH_REFUND_ACCOUNT_CONFIG';
export const FETCH_REFUND_ACCOUNT_CONFIG_SUCCESS = 'FETCH_REFUND_ACCOUNT_CONFIG_SUCCESS';
export const TOGGLE_REQUEST_REFUND = 'TOGGLE_REQUEST_REFUND';
export const CHANGE_REFUND_REASON = 'CHANGE_REFUND_REASON';
export const CHANGE_REFUND_ACCOUNT_OTHER_REASON = 'CHANGE_REFUND_ACCOUNT_OTHER_REASON';

export const requestAccountConfig = ({ selectedID, batchID, receiptID }) => ({
  types: [FETCH_REFUND_ACCOUNT_CONFIG,
    FETCH_REFUND_ACCOUNT_CONFIG_SUCCESS,
    ''
  ],
  promise: API => API.get(URL.fetchRefundAccountConfig, {
    body: {
      batch_id: batchID,
      receipt_id: receiptID,
      selected_id: selectedID
    }
  })
});

export const fetchAccountConfig = (selectedID = -1) => (dispatch, getState) => {
  const { batchID, receiptID } = getSessionIDs(getState());

  return dispatch(requestAccountConfig({
    selectedID,
    batchID,
    receiptID
  }));
};

export function toggleRequestRefund(checked) {
  return {
    type: TOGGLE_REQUEST_REFUND,
    payload: {
      checked
    }
  };
}

export function changeRefundReason(selected) {
  return {
    type: CHANGE_REFUND_REASON,
    payload: {
      selected
    }
  };
}

export const changeRefundAccountAmount = ({ key, amount, formatAccountAmount }) =>
  (dispatch) => {
    dispatch(updatePaymentOptionByKeyAction(key, 'amount', amount));
    return dispatch(updatePaymentOptionByKeyAction(key, 'formatAccountAmount', formatAccountAmount));
  };


export function changeRefundOtherReason(otherReason) {
  return {
    type: CHANGE_REFUND_ACCOUNT_OTHER_REASON,
    payload: {
      otherReason
    }
  };
}
