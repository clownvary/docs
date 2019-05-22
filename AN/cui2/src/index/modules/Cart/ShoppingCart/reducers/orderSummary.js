import { fromJS } from 'immutable';
import reducerHandler from 'react-base-ui/lib/utils/reducerHandler';

import { ORDERSUMMARY_UI } from '../consts/actionTypes';

const initialState = fromJS({
  data: {}
});

const handlers = {

  [ORDERSUMMARY_UI](state, { payload: orderSummary }) {
    return state.withMutations((s) => {
      s.set('data', fromJS(orderSummary));
    });
  }
};

export default reducerHandler(initialState, handlers);
