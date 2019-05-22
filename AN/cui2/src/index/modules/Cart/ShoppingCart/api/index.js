import { HttpMethod, createAPI } from 'react-base-ui/lib/common/restClient';

const path = `${window.__siteBaseName}/rest`;
const orderPath = `${window.__siteBaseName}/rest/order`;

const apiSet = {};

apiSet.checkout = createAPI(HttpMethod.POST, `${path}/checkout`);
apiSet.getQuickDonation = createAPI(HttpMethod.GET, `${path}/donation`);
apiSet.setQuickDonation = createAPI(HttpMethod.POST, `${path}/donation`);
apiSet.getTransactions = createAPI(HttpMethod.GET, `${path}/transaction`);
apiSet.deleteOutStandingBalance = createAPI(HttpMethod.DELETE, `${path}/outstanding/balance`);
apiSet.deleteTransaction = createAPI(HttpMethod.POST, `${path}/transaction/{{id}}`);
apiSet.getWaivers = createAPI(HttpMethod.GET, `${path}/waiver`);
apiSet.preparation = createAPI(HttpMethod.GET, `${path}/preparation`);
apiSet.getOrderSummary = createAPI(HttpMethod.GET, `${orderPath}/summary?from={{from}}`);
apiSet.getCoupons = createAPI(HttpMethod.GET, `${path}/coupons`);
apiSet.applyCoupon = createAPI(HttpMethod.POST, `${path}/coupon`);
apiSet.deleteCoupon = createAPI(HttpMethod.DELETE, `${path}/coupon/?coupon_ids={{ids}}`);
apiSet.getPaymentPlan = createAPI(HttpMethod.GET, `${path}/program/paymentplan?reno={{id}}`);
apiSet.enablePaymentPlan = createAPI(HttpMethod.POST, `${path}/program/enablepaymentplan`);


// istanbul ignore else
if (__STATIC__) {
  const testPath = '/test/json/Cart/ShoppingCart';
  const testPathCheckout = '/test/json/Cart/Checkout';

  apiSet.checkout = apiSet.checkout.mock(`${testPath}/post_checkout.json`);
  apiSet.getQuickDonation = apiSet.getQuickDonation.mock(`${testPath}/get_quickdonation.json`);
  apiSet.setQuickDonation = apiSet.setQuickDonation.mock(`${testPath}/post_quickdonation.json`);
  apiSet.getTransactions = apiSet.getTransactions.mock(`${testPath}/get_transactions.json`);
  apiSet.deleteOutStandingBalance = apiSet.deleteOutStandingBalance.mock(`${testPath}/delete_outstandingbalance.json`);
  apiSet.deleteTransaction = apiSet.deleteTransaction.mock(`${testPath}/delete_transaction.json`);
  apiSet.getWaivers = apiSet.getWaivers.mock(`${testPath}/get_waivers.json`);
  apiSet.preparation = apiSet.preparation.mock(`${testPath}/get_preparation.json`);
  apiSet.getOrderSummary = apiSet.getOrderSummary.mock(`${testPathCheckout}/get_ordersummary.json`);
  apiSet.getCoupons = apiSet.getCoupons.mock(`${testPath}/get_coupons.json`);
  apiSet.applyCoupon = apiSet.applyCoupon.mock(`${testPath}/apply_coupon.json`);
  apiSet.deleteCoupon = apiSet.deleteCoupon.mock(`${testPath}/delete_coupon.json`);
  apiSet.getPaymentPlan = apiSet.getPaymentPlan.mock(`${testPath}/get_paymentplan.json`);
  apiSet.enablePaymentPlan = apiSet.enablePaymentPlan.mock(`${testPath}/post_enablepaymentplan.json`);
}

export default apiSet;
