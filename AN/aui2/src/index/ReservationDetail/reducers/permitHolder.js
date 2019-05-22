import { fromJS } from 'immutable';
import reducerHandler from 'shared/utils/reducerHandler';
import { wrapEventIndex } from '../utils/eventKeymanager';
import { extractHolderInfo } from '../utils/permitHolder';
import { UPDATE_HOLDER_INFO, SET_ALLOW_RESET_FEE } from '../actions/permitHolder';


export const getInitialState = (initData) => {
  const permitHolder = extractHolderInfo(initData.reservationDetail);

  return fromJS({
    ...permitHolder,
    allowResetFees: {},
    isPermitHolderBeDropIn: initData.cashCustomerId === +permitHolder.customerId
  });
};

const handlers = {
  [UPDATE_HOLDER_INFO](state, { payload: { holderInfo } }) {
    return holderInfo;
  },

  [SET_ALLOW_RESET_FEE](state, { payload: { eventIndex, value } }) {
    return state.setIn(['allowResetFees', wrapEventIndex(eventIndex)], value);
  }
};

export default function getPermitHolderReducer(initData) {
  return reducerHandler(getInitialState(initData), handlers);
}
