import { fromJS } from 'immutable';
import reducerHandler from 'shared/utils/reducerHandler';
import {
  CHANGE_PERMIT_STATUS_SUCCESS,
  CHANGE_PERMIT_STATUS_FAILURE
} from 'shared/actions/cancelPermit';

import {
  SELECT_PERMIT,
  FETCH_PERMIT_STATUS_LIST_SUCCESS
} from '../actions/permitGrid';

const initialState = fromJS({
  statusInfo: {},
  statusList: []
});

const handlers = {
  [CHANGE_PERMIT_STATUS_SUCCESS](state, { payload: { body: data } }) {
    let i = -1;
    data.statusitems.forEach((item) => {
      i += 1;
      Object.assign(item, {
        text: item.status_text,
        value: String(i)
      });
    });
    return state.withMutations((s) => {
      s.set('statusInfo', fromJS(data.extrainfo));
      s.set('statusList', fromJS(data.statusitems));
    });
  },

  [CHANGE_PERMIT_STATUS_FAILURE](state) {
    return state.withMutations((s) => {
      s.set('statusInfo', fromJS({}));
      s.set('statusList', fromJS([]));
    });
  },

  [SELECT_PERMIT](state, { payload: { value } }) {
    return (value && value.permit_id) ? state : state.withMutations((s) => {
      s.set('statusInfo', fromJS({}));
      s.set('statusList', fromJS([]));
    });
  },

  [FETCH_PERMIT_STATUS_LIST_SUCCESS](state, { payload: { body: data } }) {
    let i = -1;
    data.statusitems.forEach((item) => {
      i += 1;
      Object.assign(item, {
        text: item.status_text,
        value: String(i)
      });
    });
    return state.withMutations((s) => {
      s.set('statusInfo', fromJS(data.extrainfo));
      s.set('statusList', fromJS(data.statusitems));
    });
  }
};

export default reducerHandler(initialState, handlers);
