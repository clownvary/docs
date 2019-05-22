import { is, fromJS } from 'immutable';
import * as actionTypes from 'index/modules/Daycare/Program/consts/actionTypes';
import feeSummaryReducer from 'index/modules/Daycare/Program/reducers/feeSummary';

import estimatePriceJson from 'Daycare/Program/get_estimate_price.json';

describe('index/modules/Daycare/Program/reducers/feeSummary', () => {
  const initialState = fromJS({
    fetched: false,
    individualSelection: false,
    estimatePrice: 0,
    free: true
  });

  const estimate = estimatePriceJson.body;

  it('Should return the expected initial state', () => {
    const { ESTIMATE_PRICE } = actionTypes;

    expect(is(initialState, feeSummaryReducer(undefined, {}))).toBeTruthy();
    expect(is(initialState, feeSummaryReducer(initialState, {
      type: ESTIMATE_PRICE,
      payload: {}
    }))).toBeTruthy();
  });

  it('Should return the estimate price state for action ESTIMATE_PRICE', () => {
    const { ESTIMATE_PRICE } = actionTypes;

    const returnState = feeSummaryReducer(initialState, {
      type: ESTIMATE_PRICE,
      payload: { estimate }
    });

    expect(returnState.get('fetched')).toBeTruthy();
    expect(returnState.get('individualSelection')).toBeTruthy();
    expect(returnState.get('estimatePrice')).toEqual(110);
    expect(returnState.get('free')).toBeFalsy();
  });
});
