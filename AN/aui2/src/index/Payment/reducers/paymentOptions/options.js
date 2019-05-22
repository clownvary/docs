import { fromJS } from 'immutable';
import reducerHandler from 'shared/utils/reducerHandler';

import { getAvailableOptionIds } from '../../utils/splitOptions';

import {
  PAYMENT_OPTIONS_UPDATE,
  PAYMENT_OPTIONS_UPDATE_BY_KEY,

  PAYMENT_OPTIONS_UPDATE_AVAILABLE_OPTIONS,
  PAYMENT_OPTIONS_UPDATE_PAYMENT_DELETE_FLAG,

  PAYMENT_OPTIONS_SET_RESET
} from '../../actions/paymentOptions/options';

import {
  UPDATE_SUCCESS_PAYMENT
} from '../../components/Modals/PinPad/actions/pinpad';

import {
  resetTypes
} from '../../consts';

const initialState = fromJS({
  data: [],
  availableSplitIds: getAvailableOptionIds(),
  deleteAPayment: false,
  reset: {
    type: resetTypes.NONE,
    context: {}
  }
});

const handlers = {
  [PAYMENT_OPTIONS_UPDATE_AVAILABLE_OPTIONS](state, { payload: { optionIds } }) {
    return state.set('availableSplitIds', optionIds);
  },

  [PAYMENT_OPTIONS_UPDATE_PAYMENT_DELETE_FLAG](state, { payload: { isDeleted } }) {
    return state.set('deleteAPayment', isDeleted);
  },

  [PAYMENT_OPTIONS_UPDATE](state, { payload: { funcUpdate } }) {
    if (funcUpdate && typeof funcUpdate === 'function') {
      return state.update('data', funcUpdate);
    }
    return state;
  },

  [PAYMENT_OPTIONS_UPDATE_BY_KEY](state, { payload: { index, key, value } }) {
    return state.setIn(['data', index, key], value);
  },

  [UPDATE_SUCCESS_PAYMENT](state, { payload: { index } }) {
    return state.setIn(['data', index, 'disabled'], true);
  },
  [PAYMENT_OPTIONS_SET_RESET](state, { payload: { type, context } }) {
    return state.set('reset', fromJS({ type, context }));
  }
};

export default reducerHandler(initialState, handlers);
