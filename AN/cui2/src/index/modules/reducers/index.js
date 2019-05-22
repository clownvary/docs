import { combineReducers } from 'redux';

import Cart from '../Cart/reducers/';
import Daycare from '../Daycare/reducers/';

// There will be more modules, so keep the combineReducers here
export default combineReducers({
  Cart,
  Daycare
});
