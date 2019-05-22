import { is, fromJS } from 'immutable';
import reducer from 'index/ReservationDetail/reducers/balanceDueDetail';
import { FETCH_BALANCEDUEDETAIL } from 'index/ReservationDetail/actions/balanceDueDetail';
import jsonfBalanceDueDetail from 'json/ReservationDetail/fetchBalanceDueDetail.json';

describe('index -> ReservationDetail -> reducers -> balanceDueDetail', () => {
  it('should return the initial state', (done) => {
    const initialState = fromJS({
      data: {}
    });
    expect(is(initialState, reducer(undefined, {}))).toBe(true);
    done();
  });

  it('FETCH_BALANCEDUEDETAIL should work fine', (done) => {
    const state = reducer(undefined, {
      type: FETCH_BALANCEDUEDETAIL,
      payload: jsonfBalanceDueDetail 
    });
    expect(typeof state.toJS()).toBe('object');
    expect(state.toJS().data.taxes).toEqual(jsonfBalanceDueDetail.body.balance_due_detail.taxes);
    done();
  });
});
