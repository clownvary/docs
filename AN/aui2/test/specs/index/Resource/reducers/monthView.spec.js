import {is, fromJS} from 'immutable';
import getMonthViewReducer from 'index/Resource/reducers/monthView';
import * as actions  from 'index/Resource/actions/monthView';

const reducer = getMonthViewReducer();
describe('index -> Resource -> reducers -> monthView', () => {
  const initialState = fromJS({
    showDayView: true,
    lastDateOfDayView: ''
  });

  it('should return the initial state', () => {
    expect(is(initialState, reducer(undefined, {}))).toBe(true);
  });


  it('SWITCH_VIEW should work fine', () => {
    const isDayView = false;
    const state = reducer(undefined, {type: actions.SWITCH_VIEW, payload: { isDayView }});

    expect(typeof state.toJS()).toBe('object');
    expect(state.toJS().showDayView).toBe(isDayView);
  });

  it('SET_LAST_DATE_OF_DAY_VIEW should work fine', () => {
    const lastDateOfDayView = '2018-07-04';
    const state = reducer(undefined, {type: actions.SET_LAST_DATE_OF_DAY_VIEW, payload: { lastDateOfDayView }});

    expect(typeof state.toJS()).toBe('object');
    expect(state.toJS().lastDateOfDayView).toBe(lastDateOfDayView);
  });
});

