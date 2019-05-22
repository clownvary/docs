import { combineReducers } from 'redux';

import paymentManager from './paymentManager';
import billingAddress from './billingAddress';
import orderSummary from './orderSummary';
import applyGiftCard from './applyGiftCard';
import futureCharges from './futureCharges';
import agreement from './agreement';

export default combineReducers({
  paymentManager,
  billingAddress,
  orderSummary,
  applyGiftCard,
  futureCharges,
  agreement
});
