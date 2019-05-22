import { fromJS } from 'immutable';
import configureStore from 'redux-mock-store';
import middlewares from 'shared/api/middlewares';
import * as actions from 'index/Payment/actions/modals/NewECheck';
import { mockAPI, cleanMock } from 'utils/mockAPI';

describe('index/Payment/actions/modals/Magtek.js', () => {
  let store = null;
  const mockStore = configureStore(middlewares);

  const initState = () => ({
    initialData: {
      permitID: 332,
      receiptID: 1,
      batchID: 1
    },
    paymentModals: {
      newECheck: fromJS({
        accountTypeValue: 'C'
      })
    }
  });

  beforeEach(() => {
    store = mockStore(initState());
  });

  afterEach(() => {
    store.clearActions();
  });

  it('changeECheckAccountType method should work fine', () => {
    const { changeECheckAccountType, ECHECK_NEW_CHANGE_ACCOUNT_TYPE } = actions;
    store.dispatch(changeECheckAccountType());
    const storeActions = store.getActions();
    expect(storeActions.some(action => action.type === ECHECK_NEW_CHANGE_ACCOUNT_TYPE)).toBeTruthy();
  });

  it('changeECheckSaveInformation method should work fine', () => {
    const { changeECheckSaveInformation, ECHECK_NEW_CHANGE_SAVEINFORMATION } = actions;
    store.dispatch(changeECheckSaveInformation());
    const storeActions = store.getActions();
    expect(storeActions.some(action => action.type === ECHECK_NEW_CHANGE_SAVEINFORMATION)).toBeTruthy();
  });

  it('setECheckError method should work fine', () => {
    const { setECheckError, ECHECK_NEW_SET_ERROR } = actions;
    store.dispatch(setECheckError());
    const storeActions = store.getActions();
    expect(storeActions.some(action => action.type === ECHECK_NEW_SET_ERROR)).toBeTruthy();
  });

  it('saveNewECheck method should work fine', () => {
    const { saveNewECheck, FETCH_ECHECK_ACCOUNT_HOLDER_SUCCESS, FETCH_ECHECK_AMS_ACCOUNTID_SUCCESS } = actions;
    return store.dispatch(saveNewECheck()).then(() => {
      const storeActions = store.getActions();
      expect(storeActions.some(action => action.type === FETCH_ECHECK_ACCOUNT_HOLDER_SUCCESS)).toBeTruthy();
      expect(storeActions.some(action => action.type === FETCH_ECHECK_AMS_ACCOUNTID_SUCCESS)).toBeTruthy();
    });
  });

  it('saveNewECheck method should work fine if response return empty cipher', () => {
    cleanMock();
    mockAPI({
      path: '/json/Payment/accountholder.json',
      result: {
        headers: {
          response_code: '0000',
          response_message: 'empty'
        },
        body: {
          account_holder: {}
        }
      }
    });
    const { saveNewECheck, FETCH_ECHECK_ACCOUNT_HOLDER_SUCCESS, ECHECK_NEW_SET_ERROR } = actions;
    return store.dispatch(saveNewECheck()).then(() => {
      const storeActions = store.getActions();
      expect(storeActions.some(action => action.type === FETCH_ECHECK_ACCOUNT_HOLDER_SUCCESS)).toBeTruthy();
      expect(storeActions.some(action => action.type === ECHECK_NEW_SET_ERROR)).toBeFalsy();
      cleanMock();
    });
  });

  it('saveNewECheck method should work fine if response return error', () => {
    cleanMock();
    mockAPI({
      path: '/json/Payment/accountholder.json',
      result: {
        headers: {
          response_code: '0000'
        },
        body: {
          account_holder: {
            ams_account_id_modulus: 'error'
          }
        }
      }
    });
    const { saveNewECheck, FETCH_ECHECK_ACCOUNT_HOLDER_SUCCESS, ECHECK_NEW_SET_ERROR } = actions;
    return store.dispatch(saveNewECheck()).then(() => {
      const storeActions = store.getActions();
      expect(storeActions.some(action => action.type === FETCH_ECHECK_ACCOUNT_HOLDER_SUCCESS)).toBeTruthy();
      expect(storeActions.some(action => action.type === ECHECK_NEW_SET_ERROR)).toBeTruthy();
      cleanMock();
    });
  });

  it('saveNewECheck method should work fine if fail to get the account holder information.', () => {
    cleanMock();
    mockAPI({
      path: '/json/Payment/accountholder.json',
      result: {
        headers: {
          response_code: '1111',
          response_message: 'fail to get the account holder.'
        },
        body: {}
      }
    });
    const { saveNewECheck, ECHECK_NEW_SET_ERROR } = actions;
    return store.dispatch(saveNewECheck()).then(() => {
      const storeActions = store.getActions();
      expect(storeActions.length).toBeGreaterThanOrEqual(2);
      expect(storeActions.some(action => action.type === ECHECK_NEW_SET_ERROR)).toBeTruthy();
      cleanMock();
    });
  });

  it('saveNewECheck method should work fine if response return local demo', () => {
    cleanMock();
    mockAPI({
      path: '/json/Payment/accountholder.json',
      result: {
        headers: {
          response_code: '0000'
        },
        body: {
          account_holder: {
            ams_account_id_modulus: 'localdemo'
          }
        }
      }
    });
    const { saveNewECheck, FETCH_ECHECK_ACCOUNT_HOLDER_SUCCESS, ECHECK_NEW_SAVE_SUCCESS, ECHECK_NEW_SET_SHOW_MODAL } = actions;
    return store.dispatch(saveNewECheck()).then(() => {
      const storeActions = store.getActions();
      expect(storeActions.some(action => action.type === FETCH_ECHECK_ACCOUNT_HOLDER_SUCCESS)).toBeTruthy();
      expect(storeActions.some(action => action.type === ECHECK_NEW_SAVE_SUCCESS)).toBeTruthy();
      expect(storeActions.some(action => action.type === ECHECK_NEW_SET_SHOW_MODAL)).toBeTruthy();
      cleanMock();
    });
  });

  it('cancelAction method should work fine', () => {
    const { cancelAction, ECHECK_NEW_SET_SHOW_MODAL } = actions;
    return store.dispatch(cancelAction()).then(() => {
      const storeActions = store.getActions();
      expect(storeActions.some(action => action.type === ECHECK_NEW_SET_SHOW_MODAL)).toBeTruthy();
    }).catch((e) => {
      // keep catch for cancelAction invokes promise.reject()
      e && console.log(e);
    });
  });

  it('showECheckModalPromiseAction method should work fine', (done) => {
    const { showECheckModalPromiseAction, ECHECK_NEW_SET_SHOW_MODAL, } = actions;
    store.dispatch(showECheckModalPromiseAction());
    const storeActions = store.getActions();
    expect(storeActions.some(action => action.type === ECHECK_NEW_SET_SHOW_MODAL)).toBeTruthy();
    done();
  });
});
