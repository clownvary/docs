import { fromJS } from 'immutable';
import reducerHandler from 'shared/utils/reducerHandler';
import {
  SAVE_AMENDMENT_REASON,
  SET_AMENDMENT_REASON,
  SET_AMENDMENT_REASON_SHOWN
} from '../../actions/modals/amendmentReason';

const handlers = {
  [SET_AMENDMENT_REASON_SHOWN](state, { payload: { shown } }) {
    return state.set('shown', shown);
  },
  [SET_AMENDMENT_REASON](state, { payload: { value } }) {
    return state.set('value', value);
  },
  [SAVE_AMENDMENT_REASON](state, { payload: { value } }) {
    return state.set('savedValue', value);
  }
};

export default function getAmendmentReasonReducer(initData) {
  const {
    amendmentInfo: {
      amendment_notes: value,
      amendment_reason_required: required
    }
  } = initData;

  const initialState = fromJS({
    shown: false,
    savedValue: value,
    value,
    required
  });

  return reducerHandler(initialState, handlers);
}
