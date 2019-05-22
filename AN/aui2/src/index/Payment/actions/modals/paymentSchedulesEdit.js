import { updatePaymentOptionAction } from '../paymentOptions/options';

export const showModalAction = (value, index) =>
  dispatch => dispatch(updatePaymentOptionAction(opts =>
    opts.setIn([index, 'schedulesEdit', 'showModel'], value)));


export const showError = (value, index) =>
  dispatch => dispatch(updatePaymentOptionAction(opts =>
    opts.setIn([index, 'schedulesEdit', 'error'], value)));
