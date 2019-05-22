import account from './account';
import credit from './credit';
import getCreditCardReducer from './creditCard';
import eCheck from './electronicCheck';
import getGiftCardReducer from './giftCard';
// import options from './options';
import options from './options';
import paymentPlan from './paymentPlan';

export default function getPaymentOptionsReducer(initData) {
  return {
    account,
    credit,
    creditCard: getCreditCardReducer(initData),
    eCheck,
    giftCard: getGiftCardReducer(initData),
    options,
    paymentPlan
  };
}
