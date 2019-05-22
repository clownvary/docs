import { fromJS } from 'immutable';

import reducerHandler from 'shared/utils/reducerHandler';

import {
  FETCH_CREDIT_ACCOUNT_SUCCESS,
  PAYMENT_CREDIT_CHANGE_RESET_STATUS
} from '../../actions/paymentOptions/credit';

const initialState = fromJS({
  creditAvailable: 0,
  creditOverdue: 0,
  creditInitDateShouldReset: true
});

const handlers = {
  [FETCH_CREDIT_ACCOUNT_SUCCESS](state, { payload: { body: { overdue, available } } }) {
    return state.withMutations((s) => {
      s.set('creditAvailable', available);
      s.set('creditOverdue', overdue);
    });
  },

  [PAYMENT_CREDIT_CHANGE_RESET_STATUS](state, { payload: { isReset } }) {
    return state.set('creditInitDateShouldReset', isReset);
  }
};

export default reducerHandler(initialState, handlers);
