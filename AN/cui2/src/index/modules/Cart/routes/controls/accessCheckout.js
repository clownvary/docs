import getRoutPathWithOrg from 'shared/utils/getRoutPathWithOrg';
import { fetchOrderSummary } from '../../Checkout/actions/orderSummary';

const accessCheckout = (replace, callback, store) => {
  store.dispatch(fetchOrderSummary()).then((response) => {
    const { body: { order_summary: { checkout_valid: checkoutValid } } } = response;
    if (!checkoutValid) {
      replace(getRoutPathWithOrg('newcart'));
    }
    callback();
  });
};

export default accessCheckout;
