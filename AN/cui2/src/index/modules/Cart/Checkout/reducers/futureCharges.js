import { fromJS } from 'immutable';
import isArray from 'lodash/isArray';
import reducerHandler from 'react-base-ui/lib/utils/reducerHandler';

import {
  FUTURECHARGES_UI_LIST,
  FUTURECHARGES_UI_CLICK
} from '../consts/actionTypes';

const initialState = fromJS({
  data: []
});


const handlers = {
  [FUTURECHARGES_UI_LIST](state, { payload: { payments } }) {
    if (!isArray(payments)) return state;

    const list = payments.map(payment => ({
      id: payment.index,
      desc: payment.description,
      nextDue: payment.next_payment_date_string,
      lastDue: payment.last_payment_date_string,
      checked: payment.automatic_payment,
      disabled: payment.disallow_user_auto_charge_option_modify,
      futurePaymentID: payment.future_payment_id
    }));

    return state.set('data', fromJS(list));
  },

  [FUTURECHARGES_UI_CLICK](state, { payload: { id, checked } }) {
    return state.update('data', charges => charges.map((charge) => {
      if (charge.get('id') === id) {
        return charge.set('checked', checked);
      }
      return charge;
    }));
  }
};

export default reducerHandler(initialState, handlers);
