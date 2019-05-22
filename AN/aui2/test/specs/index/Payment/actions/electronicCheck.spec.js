import configureStore from 'redux-mock-store';
import { fromJS } from 'immutable';
import middlewares from 'shared/api/middlewares';
import * as actions from 'index/Payment/actions/paymentOptions/electronicCheck';
import { PAYMENT_OPTIONS_UPDATE_BY_KEY } from 'index/Payment/actions/paymentOptions/options';
import {
  ECHECK_NEW_CHANGE_SAVEINFORMATION,
  ECHECK_NEW_SET_SHOW_MODAL
} from 'index/Payment/actions/modals/NewECheck';
import { newOptions } from 'index/Payment/consts';
import mockAPI from 'utils/mockAPI';

jest.mock('index/Payment/store', () => ({
  getState: jest.fn(),
  dispatch: jest.fn()
}));

describe('index -> payment -> actions -> paymentOptions -> credit',
() => {
  let store = null;
  const initialData = {
    permitID: 12,
    batchID: 0,
    receiptID: 1222,
  };

  beforeEach(() => {
    const mockStore = configureStore(middlewares);
    store = mockStore({
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
      },
      initialData
    });
  });

  afterEach(() => {
    store.clearActions();
  });

  it('changeECheckAmount method should work fine', () => {
    const { changeECheckAmount } = actions;
    store.dispatch(changeECheckAmount({ amount: 100, key: 0, formatECheckAmount: '$100.00' }));
    const storeActions = store.getActions();
    expect(storeActions.some(action => action.type === PAYMENT_OPTIONS_UPDATE_BY_KEY)).toBeTruthy();
  });

  it('loadElectronicCheckList method should work fine', () => {
    const { loadElectronicCheckList, ECHECK_FETCH_CHECKS_SUCCESS } = actions;
    return store.dispatch(loadElectronicCheckList(true)).then(() => {
      const storeActions = store.getActions();
      expect(storeActions.some(action => action.type === ECHECK_FETCH_CHECKS_SUCCESS)).toBeTruthy();
    });
  });

  it('fetchECheckConfig method should work fine', () => {
    const { fetchECheckConfig, ECHECK_FETCH_CONFIG_SUCCESS } = actions;
    return store.dispatch(fetchECheckConfig()).then(() => {
      const storeActions = store.getActions();
      expect(storeActions.some(action => action.type === ECHECK_FETCH_CONFIG_SUCCESS)).toBeTruthy();
    });
  });

  it('fetchECheckConfig method should work fine in different condition', (done) => {
    mockAPI({
      path: '/json/Payment/eCheckConfig.json',
      result: {
        "headers": {
          "response_code": "0000",
          "response_message": "Successful"
        },
        "body": {
          "echeck_config_info": {
            "show_prior_ecp": false,
            "achContent": true
          }
        }
      }
    });
    const {
      fetchECheckConfig,
      ECHECK_FETCH_CONFIG_SUCCESS
     } = actions;
    const store = configureStore(middlewares)({
      initialData,
      paymentOptions: {
        eCheck: fromJS({
          eCheckConfig: {
            show_prior_ecp: false,
            achContent: true
          }
        })
      }
    });
    return store.dispatch(fetchECheckConfig()).then(() => {
      const storeActions = store.getActions();
      expect(storeActions.some(action => action.type === ECHECK_FETCH_CONFIG_SUCCESS)).toBeTruthy();
      expect(storeActions.some(action => action.type === ECHECK_NEW_CHANGE_SAVEINFORMATION)).toBeTruthy();
      done();
    });
  });

  it('resetUseNewECheckSelectedValue method should work fine', () => {
    const { resetUseNewECheckSelectedValue } = actions;
    store.dispatch(resetUseNewECheckSelectedValue(0));
    const storeActions = store.getActions();
    expect(storeActions.some(action => action.type === PAYMENT_OPTIONS_UPDATE_BY_KEY)).toBeTruthy();
    expect(global.isInPendingPayment).toBeFalsy();
  });

  it('addNewToCheckList method should work fine', () => {
    const { addNewToCheckList, ECHECK_ADD_NEW_TO_LIST } = actions;
    store.dispatch(addNewToCheckList(0, { accoutNumber: 1 }));
    const storeActions = store.getActions();
    expect(storeActions.some(action => action.type === ECHECK_ADD_NEW_TO_LIST)).toBeTruthy();
    expect(storeActions.some(action => action.type === PAYMENT_OPTIONS_UPDATE_BY_KEY)).toBeTruthy();
    expect(global.isInPendingPayment).toBeFalsy();
  });
});
