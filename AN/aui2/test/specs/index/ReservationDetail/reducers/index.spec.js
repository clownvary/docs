import reducer from 'index/ReservationDetail/reducers/index';
import * as actions from 'index/ReservationDetail/actions/index';

describe('index -> ReservationDetail -> reducers -> index', () => {
  it('SHOW_TOTAL_BALANCE_DUE_DETAIL should work fine', (done) => {
    const state = reducer(undefined, {
      type: actions.SHOW_TOTAL_BALANCE_DUE_DETAIL,
      payload: { isShow: true }
    });
    expect(typeof state.toJS()).toBe('object');
    expect(state.toJS().isShowTotalBalanceDueDetail).toBe(true);
    done();
  });

  it('CHANGE_PERMIT_DETAILS should work fine', () => {
    const state = reducer(undefined, {
      type: actions.CHANGE_PERMIT_DETAILS
    });
    expect(state.get('isPermitDetailsChanged')).toBe(true);
  });

  it('should handle SET_WAIVER_ERRORS correctly', () => {
    const state = reducer(undefined, actions.setWaiverErrors());
    const errors = {
      errorsKey: 'Please check all required waivers.'
    };
    expect(state.getIn(['errors', 'waiverErrors']).toJS()).toEqual(errors);
  });

  it('should handle CLEAR_WAIVER_ERRORS correctly', () => {
    const state = reducer(undefined, actions.setWaiverErrors({}));
    expect(state.getIn(['errors', 'waiverErrors']).toJS()).toEqual({});
  });

  it('should handle SAVE_CONFIRM_CHANGE_ERRORS correctly', () => {
    const questionErrors = { 1: 'errors' };
    const waiverErrors = { 2: 'errors' };
    const state = reducer(undefined, actions.saveConfirmChangeErrors(questionErrors, waiverErrors));
    expect(typeof state.get('confirmChangeError')).toEqual('object');
  });

  it('should handle UPDATE_WAIVER_CONFIRM_CHANGE_ERROR correctly', () => {
    const waiverErrors = { 1: 'errors' };
    const state = reducer(undefined, {
      type: actions.UPDATE_WAIVER_CONFIRM_CHANGE_ERROR,
      payload: {
        waiverErrors
      }
    });
    expect(state.getIn(['confirmChangeError', 'waiverErrors']).toJS()).toEqual(waiverErrors);
  });

  it('should handle REMOVE_WAIVER_CONFIRM_CHANGE_ERROR correctly', () => {
    const state = reducer(undefined, actions.removeWaiverConfirmChangeError(1));
    expect(state.getIn(['errors', 'waiverErrors']).toJS()).toEqual({});
  });
});
