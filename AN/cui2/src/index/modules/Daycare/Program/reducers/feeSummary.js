import { fromJS } from 'immutable';
import reducerHandler from 'react-base-ui/lib/utils/reducerHandler';

import { ESTIMATE_PRICE } from '../consts/actionTypes';

const initialState = fromJS({
  fetched: false,
  individualSelection: false,
  estimatePrice: 0,
  free: true
});

const handlers = {
  [ESTIMATE_PRICE](state, { payload: { estimate } }) {
    if (estimate) {
      return state.withMutations((s) => {
        s.set('fetched', true);
        s.set('individualSelection', estimate.allow_individual_selection);
        s.set('estimatePrice', estimate.estimate_price);
        s.set('free', estimate.free);
      });
    }
    return state;
  }
};

export default reducerHandler(initialState, handlers);
