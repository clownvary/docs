import { fromJS } from 'immutable';
import reducerHandler from 'shared/utils/reducerHandler';

import {
  PERMIT_ADD_TO_CART_SUCCESS,
  PERMIT_ADD_TO_CART_FAILURE
} from '../actions/addToCart';

const initialState = fromJS({
  autoCompeleteReceipt: '',
  nocharge: '',
  receiptHeaderId: -1,
  gotoCartPage: true
});

const handlers = {

  [PERMIT_ADD_TO_CART_SUCCESS](state, { payload: { body: data } }) {
    return state.withMutations((s) => {
      s.set('nocharge', data.no_charge);
      s.set('autoCompeleteReceipt', data.auto_compelete_receipt);
      s.set('receiptHeaderId', data.receipt_header_id);
    });
  },

  [PERMIT_ADD_TO_CART_FAILURE](state) {
    return state.withMutations((s) => {
      s.set('nocharge', '');
      s.set('autoCompeleteReceipt', '');
      s.set('receiptHeaderId', -1);
    });
  }
};

export default reducerHandler(initialState, handlers);
