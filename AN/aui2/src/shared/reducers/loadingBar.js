import { fromJS } from 'immutable';
import reducerHandler from 'shared/utils/reducerHandler';

import {
  LOADING_BAR_SHOW,
  LOADING_BAR_HIDE
} from '../actions/loadingBar';

const initialState = fromJS({
  display: false,
  text: ''
});

const handlers = {
  [LOADING_BAR_SHOW](state, { payload = {} }) {
    const { text = '' } = payload;

    return state.withMutations((s) => {
      s.set('display', true);
      s.set('text', text);
    });
  },

  [LOADING_BAR_HIDE](state) {
    return state.withMutations((s) => {
      s.set('text', '');
      s.set('display', false);
    });
  }
};

export default reducerHandler(initialState, handlers);
