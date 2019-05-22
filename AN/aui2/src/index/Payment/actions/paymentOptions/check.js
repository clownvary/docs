import { updatePaymentOptionByKeyAction } from './options';

export const updateCheckNumber = ({ key, checkNumber }) =>
  dispatch => dispatch(updatePaymentOptionByKeyAction(key, 'checkNumber', checkNumber));


export const changeCheckAmount = ({ amount, key, formatCheckAmount }) =>
  (dispatch) => {
    dispatch(updatePaymentOptionByKeyAction(key, 'amount', amount));
    return dispatch(updatePaymentOptionByKeyAction(key, 'formatCheckAmount', formatCheckAmount));
  };
