import { fromJS } from 'immutable';
import * as actionTypes from 'index/modules/Cart/Checkout/consts/actionTypes';
import orderSummaryReducer from 'index/modules/Cart/Checkout/reducers/orderSummary';

/* eslint-disable */
import agreement from 'Cart/Checkout/get_agreement.json';
import orderSummary from 'Cart/Checkout/get_ordersummary.json';
/* eslint-enable */

describe('index/modules/Cart/Checkout/reducers/orderSummary', () => {
  const summaryData = orderSummary.body.order_summary;

  const defaultState = fromJS({
    data: {}
  });

  const expectedInitialState = fromJS({
    data: summaryData
  });

  it('Should get order summary successfully', () => {
    const {
      ORDERSUMMARY_UI
    } = actionTypes;

    const returnState = orderSummaryReducer(defaultState, {
      type: ORDERSUMMARY_UI,
      payload: summaryData
    });

    expect(returnState.get('data').toJS()).toEqual(expectedInitialState.get('data').toJS());
  });
});
