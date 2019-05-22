import { fromJS } from 'immutable';
import { expect } from 'chai';
import * as actionTypes from 'index/modules/Cart/Checkout/consts/actionTypes';
import futureChargesReducer from 'index/modules/Cart/Checkout/reducers/futureCharges';

/* eslint-disable */
import jsonFutureCharges from 'Cart/Checkout/get_futurepayments.json';
/* eslint-enable */

describe('index/modules/Cart/Checkout/reducers/futureCharges', () => {
  const apiCharges = jsonFutureCharges.body.future_payments.payments;
  const charges = apiCharges.map(payment => ({
    id: payment.index,
    desc: payment.description,
    nextDue: payment.next_payment_date_string,
    lastDue: payment.last_payment_date_string,
    checked: payment.automatic_payment,
    disabled: payment.disallow_user_auto_charge_option_modify,
    futurePaymentID: payment.future_payment_id
  }));

  const defaultState = fromJS({
    data: []
  });

  const expectedInitialState = fromJS({
    data: charges
  });

  it('Should get future charges successfully', () => {
    const {
      FUTURECHARGES_UI_LIST
    } = actionTypes;

    const returnState = futureChargesReducer(defaultState, {
      type: FUTURECHARGES_UI_LIST,
      payload: { payments: jsonFutureCharges.body.future_payments.payments }
    });

    expect(returnState.get('data').toJS()).to.deep.eq(expectedInitialState.get('data').toJS());
  });

  it('Should set click info successfully', () => {
    const {
      FUTURECHARGES_UI_CLICK
    } = actionTypes;

    const payload = { id: expectedInitialState.getIn(['data', 0, 'id']), checked: true };

    let returnState = futureChargesReducer(expectedInitialState, {
      type: FUTURECHARGES_UI_CLICK,
      payload
    });

    expect(returnState.get('data').find(c => c.get('id') === payload.id).get('checked')).to.eq(payload.checked);

    payload.checked = false;
    returnState = futureChargesReducer(expectedInitialState, {
      type: FUTURECHARGES_UI_CLICK,
      payload
    });
    expect(returnState.get('data').find(c => c.get('id') === payload.id).get('checked')).to.eq(payload.checked);

    payload.checked = true;
    returnState = futureChargesReducer(expectedInitialState, {
      type: FUTURECHARGES_UI_CLICK,
      payload
    });
    expect(returnState.get('data').find(c => c.get('id') === payload.id).get('checked')).to.eq(payload.checked);
  });
});
