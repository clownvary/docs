import configureStore from 'redux-mock-store';
import middlewares from 'shared/api/middlewares';
import * as actions from 'index/Payment/actions/modals/paymentSchedulesEdit';
import * as optionsActions from 'index/Payment/actions/paymentOptions/options';
import { fromJS } from 'immutable';

jest.mock('index/Payment/store', () => ({
  getState: jest.fn(),
  dispatch: jest.fn()
}));

describe('index/Payment/actions/modals/paymentSchedulesEdit', () => {
  let store = null;

  beforeEach(() => {
    const mockStore = configureStore(middlewares);
    store = mockStore({});
  });

  afterEach(() => {
    store.clearActions();
  });

  it('showModalAction should work fine', (done) => {
    const { showModalAction } = actions;

    store.dispatch(showModalAction(true, 1));
    const myActions = store.getActions();

    expect(myActions.length).toEqual(1);
    expect(myActions[0].type).toBe(optionsActions.PAYMENT_OPTIONS_UPDATE);
    expect(typeof myActions[0].payload.funcUpdate).toEqual('function');
    myActions[0].payload.funcUpdate(fromJS({}));
    done();
  });

  it('showError should work fine', (done) => {
    const { showError } = actions;

    store.dispatch(showError('abc', 1));
    const myActions = store.getActions();

    expect(myActions.length).toEqual(1);
    expect(myActions[0].type).toBe(optionsActions.PAYMENT_OPTIONS_UPDATE);
    expect(typeof myActions[0].payload.funcUpdate).toEqual('function');
    myActions[0].payload.funcUpdate(fromJS({}));
    done();
  });
});
