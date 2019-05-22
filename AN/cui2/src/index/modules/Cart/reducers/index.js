import { combineReducers } from 'redux';

import ShoppingCart from '../ShoppingCart/reducers/';
import Checkout from '../Checkout/reducers/';
import Confirmation from '../Confirmation/reducers/';
import Balance from '../Balance/reducers/';

export default combineReducers({
  ShoppingCart,
  Checkout,
  Confirmation,
  Balance
});
