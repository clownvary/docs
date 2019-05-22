import {
  resetPayerThenOtherSections
} from './payer';
import {
  PAYMENTACTIONS_UPDATE_PAYMENT_TYPE_ON_MODIFICATION
} from '../consts/actionTypes';

export function updatePaymentType(paymentActionType) {
  return {
    type: PAYMENTACTIONS_UPDATE_PAYMENT_TYPE_ON_MODIFICATION,
    payload: {
      paymentActionType
    }
  };
}


export function updatePaymentTypeOnModification(paymentActionType) {
  return (dispatch) => {
    dispatch(updatePaymentType(paymentActionType));
    return dispatch(resetPayerThenOtherSections());
  };
}
