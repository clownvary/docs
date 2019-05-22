import { fromJS } from 'immutable';
import reducerHandler from 'shared/utils/reducerHandler';

import {
  FETCH_RUNNINGCART,
  FETCH_RUNNINGCART_SUCCESS,
  FETCH_RUNNINGCART_FAILURE
} from '../actions/runningCart';

const initialState = fromJS({
  cartList: [],
  cartLoading: false,
  error: false
});

const handlers = {
  [FETCH_RUNNINGCART](state) {
    return state.withMutations((s) => {
      s.set('cartLoading', true);
    });
  },

  [FETCH_RUNNINGCART_SUCCESS](state, { payload: { body: data } }) {
    if (data && data.running_cart) {
      return state.withMutations((s) => {
        s.set('cartList', fromJS(data.running_cart));
        s.set('cartLoading', false);
        s.set('error', false);
      });
    }
    return state;
  },

  [FETCH_RUNNINGCART_FAILURE](state, { error: { payload: {
    headers: { response_message, response_code: responseCode } } } }) {
    if (responseCode === '0002') {
      return state.withMutations((s) => {
        s.set('cartLoading', true);
        s.set('error', false);
      });
    }

    return state.withMutations((s) => {
      s.set('cartLoading', false);
      s.set('error', response_message);
    });
  }
};

export default reducerHandler(initialState, handlers);
