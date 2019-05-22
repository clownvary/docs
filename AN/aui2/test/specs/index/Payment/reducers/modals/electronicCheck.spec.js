import { fromJS } from 'immutable';
import * as actions from 'index/Payment/actions/modals/NewECheck';
import reducer from 'index/Payment/reducers/modals/newECheck';

describe('index -> payment -> reducers -> modals -> credit', () => {
  const changeCheckAmountState = fromJS({
    options: {
      Credit: { amount: 0.00, formatCreditAmount: 0 }
    }
  });

  const creditInitState = fromJS({ creditInitDateShouldReset: true });

  const creditAccountState = fromJS({ creditOverdue: 0, creditAvailable: 120 });

  it('ECHECK_NEW_CHANGE_ACCOUNT_TYPE', (done) => {
    const value = '123123123';
    const state = reducer(creditAccountState, {
      type: actions.ECHECK_NEW_CHANGE_ACCOUNT_TYPE,
      payload: { value }
    });
    expect(state.toJS().accountTypeValue).toEqual(value);
    done();
  });
  it('ECHECK_NEW_CHANGE_SAVEINFORMATION', (done) => {
    const value = true;
    const state = reducer(creditAccountState, {
      type: actions.ECHECK_NEW_CHANGE_SAVEINFORMATION,
      payload: { value }
    });
    expect(state.toJS().saveInformation).toEqual(value);
    done();
  });
  it('ECHECK_NEW_SET_ERROR', (done) => {
    const error = true;
    const state = reducer(creditAccountState, {
      type: actions.ECHECK_NEW_SET_ERROR,
      payload: { error }
    });
    expect(state.toJS().newEcheckError).toEqual(error);
    done();
  });
   it('ECHECK_NEW_SET_SHOW_MODAL', (done) => {
    const display = true;
    const state = reducer(creditAccountState, {
      type: actions.ECHECK_NEW_SET_SHOW_MODAL,
      payload: { display }
    });
    expect(state.toJS().showModel).toEqual(display);
    done();
  });
});
