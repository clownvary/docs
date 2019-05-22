import { fromJS } from 'immutable';
import reducerHandler from 'react-base-ui/lib/utils/reducerHandler';

import {
  READ_CONFIGURATION_UI_LOADING,
  READ_CONFIGURATION_UI_READ_SUCCESS,
  READ_CONFIGURATION_UI_READ_FAILED
} from '../consts/actionTypes';

const initialState = fromJS({
  data: {},
  loading: false,
  successful: false,
  siteId: null
});

const handlers = {

  [READ_CONFIGURATION_UI_LOADING](state, { payload }) {
    return state.withMutations((s) => {
      s.set('loading', payload);
    });
  },

  [READ_CONFIGURATION_UI_READ_SUCCESS](state, {
    payload: { body: { configuration, site_id: siteId } }
  }) {
    return state.withMutations((s) => {
      s.set('siteId', siteId);
      s.set('data', fromJS(configuration));
      s.set('successful', true);
    });
  },

  [READ_CONFIGURATION_UI_READ_FAILED](state) {
    return state.withMutations((s) => {
      s.set('successful', false);
    });
  }
};

export default reducerHandler(initialState, handlers);
