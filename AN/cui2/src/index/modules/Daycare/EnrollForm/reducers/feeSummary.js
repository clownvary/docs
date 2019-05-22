import { fromJS } from 'immutable';
import reducerHandler from 'react-base-ui/lib/utils/reducerHandler';

import { FEE_SUMMARY_UI, FEE_SUMMARY_UI_RESET } from '../consts/actionTypes';

const initialState = fromJS({
  subTotal: 0,
  tax: 0,
  total: 0,
  refund: 0
});

const handlers = {
  [FEE_SUMMARY_UI](state, { payload: { feeSummary } }) {
    if (feeSummary) {
      return state.withMutations((s) => {
        s.set('subTotal', feeSummary.subtotal);
        s.set('tax', feeSummary.tax);
        s.set('total', feeSummary.total);
        s.set('refund', feeSummary.refund);
      });
    }
    return state;
  },

  [FEE_SUMMARY_UI_RESET]() {
    return initialState;
  }
};

export default reducerHandler(initialState, handlers);
