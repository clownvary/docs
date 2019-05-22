import { fromJS } from 'immutable';
import reducerHandler from 'shared/utils/reducerHandler';
import { SET_STATUS, SET_DISABLED, FETCH_PERMIT_EVENTS_SUCCESS } from '../actions/actionBar';

const getInitialState = (initData) => {
  const {
    isReservationDetailUpdated,
    hasRefundAmount
  } = initData;
  /* istanbul ignore next*/
  return fromJS({
    status: 0,
    disableActions: isReservationDetailUpdated || hasRefundAmount || false,
    copyPermitEvents: []
  });
};

const handlers = {

  [SET_STATUS](state, { payload: { status } }) {
    return state.set('status', status);
  },

  [SET_DISABLED](state) {
    return state.set('disableActions', true);
  },
  [FETCH_PERMIT_EVENTS_SUCCESS](state, { payload: { body } }) {
    const { events } = body;
    return state.set('copyPermitEvents', fromJS(events));
  }
};

export default function getActionBarReducer(initData) {
  return reducerHandler(getInitialState(initData), handlers);
}
