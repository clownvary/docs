import { updatePaymentOptionByKeyAction } from './options';

/* eslint-disable import/prefer-default-export */
export const changeDebitCardAmount = ({ amount, key }) =>
  dispatch => dispatch(updatePaymentOptionByKeyAction(key, 'amount', amount));
/* eslint-enable import/prefer-default-export */
