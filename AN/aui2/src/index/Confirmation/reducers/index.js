import { fromJS } from 'immutable';
import reducerHandler from 'shared/utils/reducerHandler';

import {
  WINDOW_RESIZE
} from '../actions/index';

const initialState = fromJS({
  resize: false
});

const handlers = {
  [WINDOW_RESIZE](state, { payload: { value } }) {
    return state.set('resize', value);
  }
};

export default reducerHandler(initialState, handlers);
