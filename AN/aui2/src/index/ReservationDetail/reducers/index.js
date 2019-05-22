import { fromJS } from 'immutable';
import reducerHandler from 'shared/utils/reducerHandler';
import {
  SHOW_TOTAL_BALANCE_DUE_DETAIL,
  CHANGE_PERMIT_DETAILS,
  SET_WAIVER_ERRORS,
  SAVE_CONFIRM_CHANGE_ERRORS,
  UPDATE_WAIVER_CONFIRM_CHANGE_ERROR,
  REMOVE_WAIVER_CONFIRM_CHANGE_ERROR
} from '../actions/index';

const initialState = fromJS({
  isShowTotalBalanceDueDetail: false,
  isPermitDetailsChanged: false,
  errors: {
    waiverErrors: {}
  },
  confirmChangeError: {
    waiverErrors: {}
  }
});

const handlers = {

  [SHOW_TOTAL_BALANCE_DUE_DETAIL](state, { payload: { isShow } }) {
    return state.withMutations((s) => {
      s.set('isShowTotalBalanceDueDetail', isShow);
    });
  },

  [CHANGE_PERMIT_DETAILS](state) {
    window.isPermitDetailsChanged = true;
    return state.set('isPermitDetailsChanged', true);
  },

  [SET_WAIVER_ERRORS](state, { payload: { errors } }) {
    return state.setIn(['errors', 'waiverErrors'], fromJS(errors));
  },

  [SAVE_CONFIRM_CHANGE_ERRORS](state, { payload: { waiverErrors } }) {
    return state.set('confirmChangeError', fromJS({ waiverErrors }));
  },

  [UPDATE_WAIVER_CONFIRM_CHANGE_ERROR](state, { payload: { waiverErrors } }) {
    return state.setIn(['confirmChangeError', 'waiverErrors'],
      state.getIn(['confirmChangeError', 'waiverErrors']).merge(fromJS(waiverErrors)));
  },

  [REMOVE_WAIVER_CONFIRM_CHANGE_ERROR](state, { payload: { waiverIndex } }) {
    return state.updateIn(['confirmChangeError', 'waiverErrors'], waiverErrors => waiverErrors.remove(waiverIndex));
  }

};

export default reducerHandler(initialState, handlers);
