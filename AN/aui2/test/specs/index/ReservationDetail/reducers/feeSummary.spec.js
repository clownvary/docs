import { is, fromJS } from 'immutable';
import convertCasingPropObj from 'shared/utils/convertCasingPropObj';
import getFeeSummaryReducer from 'index/ReservationDetail/reducers/feeSummary';
import * as actions from 'index/ReservationDetail/actions/feeSummary';

const {
  reservationDetail
} = window.__reservationDetail__.__initialState__;

const reservations = convertCasingPropObj(reservationDetail);

const reducer = getFeeSummaryReducer(__reservationDetail__.__initialState__);

describe('index -> ReservationDetail -> reducers -> feeSummary', () => {
  const feeSummary = reservations.feeSummary;
  it('should return the initial state', (done) => {
    const initialState = fromJS({
      feeSummary
    });
    expect(is(initialState, fromJS({feeSummary}))).toBe(true);
    done();
  });

  it('FEE_SUMMARY should work fine', (done) => {
    const feeSummary = reservations.feeSummary;
    const state = reducer(undefined, {
      type: actions.FEE_SUMMARY,
      payload: { feeSummary }
    });
    expect(typeof state.toJS()).toBe('object');
    expect(state.get('feeSummary').get('subTotal')).toBe(feeSummary["subTotal"]);
    expect(state.get('feeSummary').get('total')).toBe(feeSummary["total"]);
    expect(state.get('feeSummary').get('taxes').size).toBe(feeSummary["taxes"].length);
    done();
  });
});
