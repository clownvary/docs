import { fromJS } from 'immutable';
import reducerHandler from 'react-base-ui/lib/utils/reducerHandler';

import {
  AGREEMENT_UI,
  AGREEMENT_ON_SIGN,
  AGREEMENT_UI_DISPLAY,
  AGREEMENT_UI_DISPLAY_ERROR,
  AGREEMENT_UI_RESET_STATE
} from '../consts/actionTypes';

const initialState = fromJS({
  data: {},
  isDisplayAgreement: false,
  agreement: {},
  isSignedAgreement: false,
  errors: {}
});

const handlers = {

  [AGREEMENT_UI](state, { payload: ecpAgreement }) {
    return state.withMutations((tempState) => {
      tempState.set('isDisplayAgreement', !state.get('isDisplayAgreement'));
      tempState.set('agreement', fromJS(ecpAgreement));
    });
  },

  [AGREEMENT_UI_DISPLAY](state) {
    return state.set('isDisplayAgreement', !state.get('isDisplayAgreement'));
  },

  [AGREEMENT_ON_SIGN](state) {
    return state.set('isSignedAgreement', !state.get('isSignedAgreement'));
  },

  [AGREEMENT_UI_DISPLAY_ERROR](state, { payload: { moduleName, errorMessage } }) {
    return state.set('errors', fromJS({ moduleName, errorMessage }));
  },

  [AGREEMENT_UI_RESET_STATE](state) {
    return state.withMutations((tempState) => {
      tempState.set('isDisplayAgreement', false);
      tempState.set('isSignedAgreement', false);
      tempState.set('errors', fromJS({}));
    });
  }
};

export default reducerHandler(initialState, handlers);
