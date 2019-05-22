import { fromJS } from 'immutable';
import reducerHandler from 'shared/utils/reducerHandler';
import {
  SET_WAIVER_ERRORS,
  PERMIT_DETAILS_CHANGED,
  FETCH_READY4CHECKOUT_SUCCESS,
  FETCH_INCART_SUCCESS
} from '../actions/index';

const getInitialState = (initData) => {
  /* istanbul ignore next */
  const companyLabel = initData.companyWording || 'Company';
  return fromJS({
    resize: false,
    errors: {
      waiverErrors: {}
    },
    hideQuestions: {},
    isPermitDetailsChanged: false,
    ready4Checkout: false, // if current receipt is valid to make payment
    inCart: false, // reservation has added into shopping cart,
    isClickedNextButton: false,
    companyLabel
  });
};

const handlers = {
  [SET_WAIVER_ERRORS](state, { payload: { errors } }) {
    return state.setIn(['errors', 'waiverErrors'], fromJS(errors));
  },

  [PERMIT_DETAILS_CHANGED](state) {
    return state.set('isPermitDetailsChanged', true);
  },

  [FETCH_READY4CHECKOUT_SUCCESS](state, { payload: { body } }) {
    return state.set('ready4Checkout', body.ready4checkout === 'true');
  },

  [FETCH_INCART_SUCCESS](state, { payload: { body } }) {
    return state.set('inCart', body.in_cart === 'true');
  }
};

export default function getMainReducer(initData) {
  return reducerHandler(getInitialState(initData), handlers);
}

