import { updatePaymentOptionByKeyAction } from './options';

export const changeCashAmount = ({ index, amount, formatCashAmount }) =>
  (dispatch) => {
    dispatch(updatePaymentOptionByKeyAction(index, 'amount', amount));
    return dispatch(updatePaymentOptionByKeyAction(index, 'formatCashAmount', formatCashAmount));
  };

export const calculateCashChange = ({ index, change, paidAmount }) =>
  (dispatch) => {
    dispatch(updatePaymentOptionByKeyAction(index, 'cashChange', change));
    return dispatch(updatePaymentOptionByKeyAction(index, 'cashAmountPaid', paidAmount));
  };
