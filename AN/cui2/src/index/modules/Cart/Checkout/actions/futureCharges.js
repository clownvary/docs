import createFSA from 'react-base-ui/lib/utils/createFSA';
import { clearError } from 'shared/utils/messages';
import API from '../api';
import PaymentModules from '../consts/paymentModules';
import {
  FUTURECHARGES_UI_LIST,
  FUTURECHARGES_UI_CLICK
} from '../consts/actionTypes';


const uiFutureCharges = createFSA(FUTURECHARGES_UI_LIST);
const uiFutureChargesClick = createFSA(FUTURECHARGES_UI_CLICK);

export const getFutureChargesAction = () => dispatch =>
  API.getFuturePayments()
  .then(({ body: { future_payments: { payments } } }) => {
    dispatch(uiFutureCharges({ payments }));
  });

export const clickChargeAction = ({ id, checked }) => (dispatch, getState) => {
  if (!checked) {
    const checkout = getState().modules.Cart.Checkout;
    const futureChargesData = checkout.futureCharges.get('data');
    let isAllUnchecked = true;

    futureChargesData.toJS().forEach((item) => {
      if (item.id !== id && item.checked) {
        isAllUnchecked = false;
      }
    });

    if (isAllUnchecked) {
      const errors = checkout.agreement.get('errors');
      if (errors.get('errorMessage') && errors.get('moduleName') === PaymentModules.SECONDARY) {
        clearError(errors.get('errorMessage'));
      }
    }
  }
  return dispatch(uiFutureChargesClick({ id, checked }));
};
