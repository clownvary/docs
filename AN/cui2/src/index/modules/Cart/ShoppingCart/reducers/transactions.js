import { fromJS } from 'immutable';
import forEach from 'lodash/forEach';
import reducerHandler from 'react-base-ui/lib/utils/reducerHandler';
import {
  TRANSACTIONS_UI_LIST,
  TRANSACTIONS_UI_EXPAND_STATUS,
  TRANSACTIONS_UI_REMOVE_EXPAND_STATUS,
  TRANSACTIONS_UI_CLEAR_EXPAND_STATUS,
  TRANSACTIONS_UI_GET_PAYMENT_PLAN
} from '../consts/actionTypes';

const initialState = fromJS({
  participants: fromJS([]),
  payOnAccount: fromJS([]),
  isRequired: null,
  payOnAccountWarning: null,
  orderSummary: null,
  expandedStatus: fromJS({}),
  hasExpandedStatus: fromJS({}),
  paymentPlans: fromJS([])
});

const handlers = {

  [TRANSACTIONS_UI_LIST](state, {
    payload: { payOnAccount, isRequired, payOnAccountWarning, participants, orderSummary }
  }) {
    const status = {};
    const hasExpandedStatus = {};
    const expandedStatusState = state.get('expandedStatus');
    const hasExpandedStatusState = state.get('hasExpandedStatus');

    forEach(participants, participant =>
      forEach(participant.transactions, (transaction) => {
        status[transaction.receipt_entry_identity] = false;
        hasExpandedStatus[transaction.receipt_entry_identity] = false;
      }));

    return state.withMutations((s) => {
      s.set('payOnAccount', fromJS(payOnAccount));
      s.set('isRequired', fromJS(isRequired));
      s.set('payOnAccountWarning', fromJS(payOnAccountWarning));
      s.set('participants', fromJS(participants));
      s.set('orderSummary', fromJS(orderSummary));

      expandedStatusState.size > 0 ? s.set('expandedStatus', fromJS(Object.assign(status, expandedStatusState.toJS())))
      : s.set('expandedStatus', fromJS(status));

      expandedStatusState.size > 0 ? s.set('hasExpandedStatus', fromJS(Object.assign(hasExpandedStatus, hasExpandedStatusState.toJS())))
      : s.set('hasExpandedStatus', fromJS(hasExpandedStatus));
    });
  },

  [TRANSACTIONS_UI_EXPAND_STATUS](state, { payload: receiptEntryIdentity }) {
    return state.withMutations((s) => {
      s.setIn(['expandedStatus', receiptEntryIdentity], !s.getIn(['expandedStatus', receiptEntryIdentity]));
      s.setIn(['hasExpandedStatus', receiptEntryIdentity], true);
    });
  },

  [TRANSACTIONS_UI_REMOVE_EXPAND_STATUS](state, { payload: receiptEntryIdentity }) {
    return state.withMutations((s) => {
      s.deleteIn(['expandedStatus', receiptEntryIdentity]);
      s.deleteIn(['hasExpandedStatus', receiptEntryIdentity]);
    });
  },

  [TRANSACTIONS_UI_CLEAR_EXPAND_STATUS](state) {
    return state.withMutations((s) => {
      s.set('expandedStatus', fromJS({}));
      s.set('hasExpandedStatus', fromJS({}));
    });
  },

  [TRANSACTIONS_UI_GET_PAYMENT_PLAN](state, { payload: { paymentPlans } }) {
    return state.withMutations((s) => {
      s.set('paymentPlans', fromJS(paymentPlans));
    });
  }
};

export default reducerHandler(initialState, handlers);
