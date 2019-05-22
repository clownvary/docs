import * as billingAddress from './billingAddress';
import * as orderSummary from './orderSummary';
import * as paymentManager from './paymentManager';
import * as applyGiftCard from './applyGiftCard';
import * as futureCharges from './futureCharges';

export default {
  ...billingAddress,
  ...orderSummary,
  ...paymentManager,
  ...applyGiftCard,
  ...futureCharges
};
