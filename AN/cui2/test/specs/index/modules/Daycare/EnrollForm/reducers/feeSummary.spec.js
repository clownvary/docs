import { is, fromJS } from 'immutable';
import * as actionTypes from 'index/modules/Daycare/EnrollForm/consts/actionTypes';
import feeSummaryReducer from 'index/modules/Daycare/EnrollForm/reducers/feeSummary';

describe('index/modules/Daycare/EnrollForm/reducers/feeSummary', () => {
  const initialState = fromJS({
    subTotal: 0,
    tax: 0,
    total: 0,
    refund: 0
  });

  it('Should return the expected initial state', () => {
    expect(is(initialState, feeSummaryReducer(undefined, {}))).toBeTruthy();

    const { FEE_SUMMARY_UI } = actionTypes;
    expect(is(initialState, feeSummaryReducer(initialState, { type: FEE_SUMMARY_UI, payload: {} })))
      .toBeTruthy();
  });

  it('Should save fetched fee summary result correctly', () => {
    const { FEE_SUMMARY_UI } = actionTypes;
    const returnState = feeSummaryReducer(initialState, {
      type: FEE_SUMMARY_UI,
      payload: {
        feeSummary: {
          subtotal: 10.0,
          tax: 0.95,
          total: 10.95,
          refund: -1
        }
      }
    });
    const expectState = fromJS({
      subTotal: 10.0,
      tax: 0.95,
      total: 10.95,
      refund: -1
    });
    expect(is(expectState, returnState)).toBeTruthy();
  });

  it('Should reset fee summary correctly', () => {
    const { FEE_SUMMARY_UI_RESET } = actionTypes;
    expect(is(initialState, feeSummaryReducer(initialState, { type: FEE_SUMMARY_UI_RESET })))
      .toBeTruthy();
  });
});
