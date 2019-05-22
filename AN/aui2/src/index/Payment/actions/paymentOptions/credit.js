import URL from '../../urls';
import { updatePaymentOptionByKeyAction } from './options';
import getSessionIDs from '../../utils/getSessionIDs';

export const CHANGE_CREDIT_AMOUNT = 'CHANGE_CREDIT_AMOUNT';
export const FETCH_CREDIT_ACCOUNT_SUCCESS = 'FETCH_CREDIT_ACCOUNT_SUCCESS';
export const PAYMENT_CREDIT_CHANGE_RESET_STATUS = 'PAYMENT_CREDIT_CHANGE_RESET_STATUS';

export const changeCreditAmount = ({ amount, key, formatCreditAmount }) =>
  (dispatch) => {
    dispatch(updatePaymentOptionByKeyAction(key, 'amount', amount));
    return dispatch(updatePaymentOptionByKeyAction(key, 'formatCreditAmount', formatCreditAmount));
  };

export const _getCreditAccount = ({ batchID, receiptID }) => ({
  types: ['', FETCH_CREDIT_ACCOUNT_SUCCESS, ''],
  promise: API => API.get(URL.creditAccount, {
    body: {
      batch_id: batchID,
      receipt_id: receiptID
    }
  })
});

export const getCreditAccount = callback => (dispatch, getState) => {
  const { batchID, receiptID } = getSessionIDs(getState());

  return dispatch(_getCreditAccount({ batchID, receiptID }))
    .then(({ payload: { body } }) => {
      /* istanbul ignore next */
      (typeof callback === 'function') && callback(body);
    });
};

export const changeCreditResetStatus = isReset => ({
  type: PAYMENT_CREDIT_CHANGE_RESET_STATUS,
  payload: { isReset }
});
