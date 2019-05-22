import { fromJS } from 'immutable';
import reducerHandler from 'shared/utils/reducerHandler';
import { SHOW_OR_HIDE_FAIL_ACTIONS_BTNS } from '../actions/pinpadFail';

const initialState = fromJS({
  shown: false
});

const handlers = {
  [SHOW_OR_HIDE_FAIL_ACTIONS_BTNS](state, { payload: { shown } }) {
    return state.set('shown', shown);
  }
};

export default reducerHandler(initialState, handlers);
