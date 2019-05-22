import { fromJS } from 'immutable';
import reducerHandler from 'shared/utils/reducerHandler';
import convertCasingPropObj from 'shared/utils/convertCasingPropObj';
import { FETCH_BALANCEDUEDETAIL } from '../actions/balanceDueDetail';

const initialState = fromJS({
  data: fromJS({})
});

const handlers = {

  [FETCH_BALANCEDUEDETAIL](state, { payload: { body: { balance_due_detail: balanceDueDetail } } }) {
    return state.withMutations((s) => {
      s.set('data', fromJS(convertCasingPropObj(balanceDueDetail)));
    });
  }
};

export default reducerHandler(initialState, handlers);
