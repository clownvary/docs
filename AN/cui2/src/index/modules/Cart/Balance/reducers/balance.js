import { fromJS } from 'immutable';
import reducerHandler from 'react-base-ui/lib/utils/reducerHandler';

import {
  BALANCE_UI_LIST,
  BALANCE_ON_VALIDATION,
  BALANCE_ON_CLEAR_INFO,
  BALANCE_ON_UPDATE_LIST
} from '../consts/actionTypes';

const initialState = fromJS({
  outstandingBalances: [],
  subTotal: 0,
  unpaidAmount: 0,
  outstandingAccountBalanceWarning: '',
  customerName: '',
  balanceDate: '',
  errors: {},
  require: false,
  requireMinPaymentAmount: 0
});

const handlers = {
  [BALANCE_UI_LIST](state, { payload: { outstandingBalanceSmmary } }) {
    return state.withMutations((s) => {
      s.set('outstandingBalances', fromJS(outstandingBalanceSmmary.outstanding_balances));
      s.set('subTotal', outstandingBalanceSmmary.sub_total);
      s.set('outstandingAccountBalanceWarning', outstandingBalanceSmmary.outstanding_account_balance_warning);
      s.set('customerName', outstandingBalanceSmmary.customer_name);
      s.set('balanceDate', outstandingBalanceSmmary.balance_date);
      s.set('unpaidAmount', outstandingBalanceSmmary.unpaid_amount);
      s.set('require', outstandingBalanceSmmary.require);
      s.set('requireMinPaymentAmount', outstandingBalanceSmmary.require_min_payment_amount);
    });
  },

  [BALANCE_ON_VALIDATION](state, { payload: { errors } }) {
    return state.withMutations((s) => {
      s.set('errors', fromJS(errors));
    });
  },

  [BALANCE_ON_CLEAR_INFO](state) {
    return state.withMutations((s) => {
      s.set('outstandingAccountBalanceWarning', '');
    });
  },

  [BALANCE_ON_UPDATE_LIST](state, { payload: { index, value } }) {
    return state.withMutations((s) => {
      const outstandingBalances = state.get('outstandingBalances').setIn([index, 'pending_payment'], value);
      const subTotal = outstandingBalances.reduce((prevValue, item) =>
        (parseFloat(prevValue) + parseFloat(item.get('pending_payment'))).toFixed(2), 0);

      s.set('outstandingBalances', outstandingBalances);
      s.set('subTotal', subTotal);
    });
  }
};

export default reducerHandler(initialState, handlers);
