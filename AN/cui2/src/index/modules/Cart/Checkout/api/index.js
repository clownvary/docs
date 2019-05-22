import { HttpMethod, createAPI } from 'react-base-ui/lib/common/restClient';

const checkoutPath = `${window.__siteBaseName}/rest/checkout`;
const systemPath = `${window.__siteBaseName}/rest/system`;
const orderPath = `${window.__siteBaseName}/rest/order`;

const apiSet = {};

apiSet.getCountryState = createAPI(HttpMethod.GET, `${systemPath}/country?default={{isDefault}}`);
apiSet.getBillingAddress = createAPI(HttpMethod.GET, `${checkoutPath}/billing`);
apiSet.createBillingAddress = createAPI(HttpMethod.POST, `${checkoutPath}/billing`);
apiSet.updateBillingAddress = createAPI(HttpMethod.PUT, `${checkoutPath}/billing`);

apiSet.changePayer = createAPI(HttpMethod.POST, `${checkoutPath}/payer/selection`);

apiSet.getCreditCardTypes = createAPI(HttpMethod.GET, `${checkoutPath}/creditcardtype`);
apiSet.getSavedCreditCards = createAPI(HttpMethod.GET, `${checkoutPath}/creditcard?types={{types}}`);
apiSet.getSavedEChecks = createAPI(HttpMethod.GET, `${checkoutPath}/echeck`);
apiSet.getAMSToken = createAPI(HttpMethod.GET, `${checkoutPath}/amstoken`);
apiSet.getAMSAccountId = createAPI(HttpMethod.GET, `${checkoutPath}/amsaccountid`);
apiSet.saveCreditCard = createAPI(HttpMethod.POST, `${checkoutPath}/creditcard`);
apiSet.saveECheck = createAPI(HttpMethod.POST, `${checkoutPath}/echeck`);

apiSet.getGiftCard = createAPI(HttpMethod.GET, `${checkoutPath}/giftcard`);

apiSet.applyGiftCard = createAPI(HttpMethod.POST, `${checkoutPath}/giftcard`);
apiSet.removeGiftCard = createAPI(HttpMethod.DELETE, `${checkoutPath}/giftcard/{{id}}`);

apiSet.getOrderSummary = createAPI(HttpMethod.GET, `${orderPath}/summary?from={{from}}`);

apiSet.getFuturePayments = createAPI(HttpMethod.GET, `${checkoutPath}/payment/future`);

apiSet.getAgreement = createAPI(HttpMethod.GET, `${checkoutPath}/echeck/agreement`);
apiSet.commitOrder = createAPI(HttpMethod.POST, `${checkoutPath}/order/commit`);
apiSet.needPay = createAPI(HttpMethod.GET, `${checkoutPath}/needpay`);
apiSet.getPCILocationOfCC = createAPI(HttpMethod.GET, `${checkoutPath}/payment/iframeurl`);

// istanbul ignore else
if (__STATIC__) {
  const testPath = '/test/json/Cart/Checkout';

  apiSet.getCountryState = apiSet.getCountryState.mock(`${testPath}/get_countrystates.json`);

  apiSet.getBillingAddress = apiSet.getBillingAddress.mock(`${testPath}/get_billingaddresses.json`);
  apiSet.createBillingAddress = apiSet.createBillingAddress.mock(`${testPath}/post_createbillingaddress.json`);
  apiSet.updateBillingAddress = apiSet.updateBillingAddress.mock(`${testPath}/post_updatebillingaddress.json`);

  apiSet.changePayer = apiSet.changePayer.mock(`${testPath}/post_changepayer.json`);

  apiSet.getCreditCardTypes = apiSet.getCreditCardTypes.mock(`${testPath}/get_creditcardtypes.json`);
  apiSet.getSavedCreditCards = apiSet.getSavedCreditCards.mock(`${testPath}/get_creditcards.json`);
  apiSet.getSavedEChecks = apiSet.getSavedEChecks.mock(`${testPath}/get_echeck.json`);
  apiSet.getAMSToken = apiSet.getAMSToken.mock(`${testPath}/get_amstoken.json`);
  apiSet.getAMSAccountId = apiSet.getAMSAccountId.mock(`${testPath}/get_amsaccountid.json`);
  apiSet.saveCreditCard = apiSet.saveCreditCard.mock(`${testPath}/post_creditcards.json`);
  apiSet.saveECheck = apiSet.saveECheck.mock(`${testPath}/post_echeck.json`);

  apiSet.getGiftCard = apiSet.getGiftCard.mock(`${testPath}/get_giftcard.json`);

  apiSet.applyGiftCard = apiSet.applyGiftCard.mock(`${testPath}/post_applygiftcard.json`);
  apiSet.removeGiftCard = apiSet.removeGiftCard.mock(`${testPath}/post_removegiftcard.json`);

  apiSet.getOrderSummary = apiSet.getOrderSummary.mock(`${testPath}/get_ordersummary.json`);

  apiSet.getFuturePayments = apiSet.getFuturePayments.mock(`${testPath}/get_futurepayments.json`);
  apiSet.getAgreement = apiSet.getAgreement.mock(`${testPath}/get_agreement.json`);
  apiSet.commitOrder = apiSet.commitOrder.mock(`${testPath}/post_order.json`);
  apiSet.needPay = apiSet.needPay.mock(`${testPath}/get_needpay.json`);
  apiSet.getPCILocationOfCC = apiSet.getPCILocationOfCC.mock(`${testPath}/get_pcilocaltionofcc.json`);
}

export default apiSet;
