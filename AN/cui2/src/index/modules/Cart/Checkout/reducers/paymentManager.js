import { fromJS } from 'immutable';
import reducerHandler from 'react-base-ui/lib/utils/reducerHandler';

import {
  PAYMENT_UI_UPDATE_MODULES
} from '../consts/actionTypes';

const initialState = fromJS({
  modules: {}
});

export const handlers = {
  [PAYMENT_UI_UPDATE_MODULES](state, { payload: modules }) {
    return state.set('modules', modules);
  }
};

export default reducerHandler(initialState, handlers);
