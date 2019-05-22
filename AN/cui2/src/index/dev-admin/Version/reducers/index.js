import { fromJS } from 'immutable';
import reducerHandler from 'react-base-ui/lib/utils/reducerHandler';

import {
  READ_VERSION_UI_LOADING,
  READ_VERSION_UI_READ_SUCCESS,
  READ_VERSION_UI_READ_FAILED
} from '../consts/actionTypes';

const initialState = fromJS({
  data: {},
  loading: false,
  successful: false
});

const handlers = {

  [READ_VERSION_UI_LOADING](state, { payload }) {
    return state.withMutations((s) => {
      s.set('loading', payload);
    });
  },

  [READ_VERSION_UI_READ_SUCCESS](state, {
    payload: { body: version }
  }) {
    return state.withMutations((s) => {
      s.set('data', fromJS(version));
      s.set('successful', true);
    });
  },

  [READ_VERSION_UI_READ_FAILED](state) {
    return state.withMutations((s) => {
      s.set('successful', false);
    });
  }
};

export default reducerHandler(initialState, handlers);
