import { fromJS } from 'immutable';
import reducerHandler from 'shared/utils/reducerHandler';

import {
  FETCH_ON_BOARDING_SUCCESS,
  UPDATE_ON_BOARDING_SUCCESS,
  READY_ON_BOARDING
} from '../actions/onboarding';

const initialState = fromJS({
  hideIntro: true,
  ready: false
});

const handlers = {
  [FETCH_ON_BOARDING_SUCCESS](state, { payload: { body } }) {
    return state.set('hideIntro', body.result === 'true');
  },

  [UPDATE_ON_BOARDING_SUCCESS](state) {
    return state.set('hideIntro', true);
  },

  [READY_ON_BOARDING](state) {
    return state.set('ready', true);
  }
};

export default reducerHandler(initialState, handlers);
