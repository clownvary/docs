import { combineReducers } from 'redux';

import transactions from './transactions';
import quickdonation from './quickdonation';
import waiver from './waiver';
import checkout from './checkout';
import ordersummary from './orderSummary';
import coupon from './coupon';

export default combineReducers({
  transactions,
  quickdonation,
  waiver,
  checkout,
  ordersummary,
  coupon
});
