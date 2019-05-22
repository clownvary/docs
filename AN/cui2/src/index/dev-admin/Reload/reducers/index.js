import { fromJS } from 'immutable';
import reducerHandler from 'react-base-ui/lib/utils/reducerHandler';

import {
  RELOAD_UI_LOADING,
  RELOAD_UI_RELOAD_SITES_SUCCESS,
  RELOAD_UI_RELOAD_SITES_FAILED
} from '../consts/actionTypes';

const initialState = fromJS({
  loading: false,
  successful: false
});

const handlers = {

  [RELOAD_UI_LOADING](state, { payload }) {
    return state.withMutations((s) => {
      s.set('loading', payload);
    });
  },

  [RELOAD_UI_RELOAD_SITES_SUCCESS](state) {
    return state.withMutations((s) => {
      s.set('successful', true);
    });
  },

  [RELOAD_UI_RELOAD_SITES_FAILED](state) {
    return state.withMutations((s) => {
      s.set('successful', false);
    });
  }
};

export default reducerHandler(initialState, handlers);
