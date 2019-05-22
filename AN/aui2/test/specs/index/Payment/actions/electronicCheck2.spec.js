import configureStore from 'redux-mock-store';
import { fromJS } from 'immutable';
import middlewares from 'shared/api/middlewares';
import * as actions from 'index/Payment/actions/paymentOptions/electronicCheck';
import { PAYMENT_OPTIONS_UPDATE_BY_KEY } from 'index/Payment/actions/paymentOptions/options';
import { ECHECK_NEW_SET_SHOW_MODAL } from 'index/Payment/actions/modals/NewECheck';
import { newOptions } from 'index/Payment/consts';

jest.mock('index/Payment/store', () => ({
  getState: jest.fn(),
  dispatch: jest.fn()
}));

jest.mock('index/Payment/actions/modals/NewECheck', () => ({
  showECheckModalPromiseAction: jest.fn()
    .mockReturnValueOnce(Promise.resolve())
    .mockReturnValue(Promise.reject())
}));

describe('index -> payment -> actions -> paymentOptions -> credit',
() => {
  let store = null;
  const initialData = {
    permitID: 12,
    batchID: 0,
    receiptID: 1222
  };

  beforeEach(() => {
    const mockStore = configureStore(middlewares);
    store = mockStore({
      initialData,
      payment: fromJS({
        errors: [{ value: 88 }]
      }),
      paymentOptions: {
        eCheck: fromJS({
          eCheckConfig: {
            show_prior_ecp: true,
            achContent: true
          },
          eCheckListDropDown: {
            data: []
          }
        })
      }
    });
  });

  afterEach(() => {
    store.clearActions();
  });

  it('changeElectronicCheckOpiton method should work fine when add new ecp success.', (done) => {
    const { changeElectronicCheckOpiton } = actions;
    store.dispatch(changeElectronicCheckOpiton(0, newOptions.NEW_OPTION_VALUE));
    const storeActions = store.getActions();
    expect(storeActions.some(action => action.type === PAYMENT_OPTIONS_UPDATE_BY_KEY)).toBeTruthy();
    expect(storeActions.some(action => action.type === ECHECK_NEW_SET_SHOW_MODAL)).toBeTruthy();
    expect(global.isInPendingPayment).toBeTruthy();

    done();
  });

  it('changeElectronicCheckOpiton method should work fine when add new ecp fail.', (done) => {
    const { changeElectronicCheckOpiton } = actions;
    store.dispatch(changeElectronicCheckOpiton(0, newOptions.NEW_OPTION_VALUE));
    const storeActions = store.getActions();

    expect(storeActions.some(action => action.type === PAYMENT_OPTIONS_UPDATE_BY_KEY)).toBeTruthy();
    expect(storeActions.some(action => action.type === ECHECK_NEW_SET_SHOW_MODAL)).toBeTruthy();
    expect(global.isInPendingPayment).toBeTruthy();

    done();
  });
});
