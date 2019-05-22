import { fromJS } from 'immutable';
import reducerHandler from 'react-base-ui/lib/utils/reducerHandler';

import {
  CHECKOUT_UI_VALIDATION
} from '../consts/actionTypes';

const initialState = fromJS({
  validatePass: true,
  needValidate: false
});

const handlers = {

  [CHECKOUT_UI_VALIDATION](state, { payload: { isPass } }) {
    return state.withMutations((tempState) => {
      tempState.set('validatePass', isPass);
      tempState.set('needValidate', true);
    });
  }
};

export default reducerHandler(initialState, handlers);
