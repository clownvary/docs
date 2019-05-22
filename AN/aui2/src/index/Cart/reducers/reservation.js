import { fromJS } from 'immutable';
import reducerHandler from 'shared/utils/reducerHandler';

import {
  FETCH_RESERVATION_SUCCESS,
  RESERVATION_CHECK_OUT_SUCCESS,
  RESERVATION_CHECK_OUT_FAILURE
} from '../actions/reservation';

const initialState = fromJS({
  reservationFees: [],
  isLoadedData: false,
  subTotal: null,
  transactionFee: null,
  total: null,
  checkout: false
});

const handlers = {
  [FETCH_RESERVATION_SUCCESS](state, { payload: { body: data } }) {
    let subTotal = 0;

    data.cart.reservation_fees.forEach((facilityFees) => {
      subTotal += facilityFees.total;
    });

    return state.withMutations((s) => {
      s.set('reservationFees', fromJS(data.cart.reservation_fees));
      s.set('isLoadedData', true);
      s.set('subTotal', subTotal);
      s.set('transactionFee', data.cart.transaction_fee);
      s.set('total', data.cart.total_amount);
    });
  },

  [RESERVATION_CHECK_OUT_SUCCESS](state) {
    return state.withMutations((s) => {
      s.set('checkout', true);
    });
  },

  [RESERVATION_CHECK_OUT_FAILURE](state) {
    return state.withMutations((s) => {
      s.set('checkout', false);
    });
  }
};

export default reducerHandler(initialState, handlers);
