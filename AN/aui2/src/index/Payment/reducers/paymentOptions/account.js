import { fromJS } from 'immutable';

import reducerHandler from 'shared/utils/reducerHandler';
import normalizeData from 'shared/utils/normalizeData';

import {
  FETCH_REFUND_ACCOUNT_CONFIG_SUCCESS,
  TOGGLE_REQUEST_REFUND,
  CHANGE_REFUND_REASON,
  CHANGE_REFUND_ACCOUNT_OTHER_REASON
} from '../../actions/paymentOptions/account';

const initialState = fromJS({
  display: true,
  requestRefund: false,
  reasons: {
    otherReason: '',
    selected: -1,
    data: []
  }
});

const handlers = {
  [FETCH_REFUND_ACCOUNT_CONFIG_SUCCESS](state, { payload: { body: { options } } }) {
    const reasons = normalizeData(options.reasons);

    reasons.otherReason = '';
    /* istanbul ignore else */
    if (reasons.selected && !reasons.selected.length) {
      reasons.selected = -1;
    }

    return state.withMutations((s) => {
      s.set('display', options.display);
      s.set('requestRefund', options.request_refund);
      s.set('reasons', fromJS(reasons));
    });
  },

  [TOGGLE_REQUEST_REFUND](state, { payload: { checked } }) {
    return state.set('requestRefund', checked);
  },

  [CHANGE_REFUND_REASON](state, { payload: { selected } }) {
    let otherReason = '';
    const data = state.getIn(['reasons', 'data']).toJS();
    /* istanbul ignore else */
    if (selected !== -1) {
      const [{ description } = { description: '' }] = data.filter(item => item.id === selected);
      otherReason = description;
    }

    return state.withMutations((s) => {
      s.setIn(['reasons', 'otherReason'], otherReason);
      s.setIn(['reasons', 'selected'], selected);
    });
  },

  [CHANGE_REFUND_ACCOUNT_OTHER_REASON](state, { payload: { otherReason } }) {
    return state.setIn(['reasons', 'otherReason'], otherReason);
  }
};

export default reducerHandler(initialState, handlers);
