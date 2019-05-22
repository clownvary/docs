import { fromJS } from 'immutable';
import configureStore from 'redux-mock-store';
import middlewares from 'shared/api/middlewares';
import * as actions from 'index/Payment/actions/modals/Magtek';
import { IS_CHECKED_FOR_PAY_ACTION } from 'index/Payment/actions/modals/NewCreditCard';
import { mockAPI, cleanMock } from 'utils/mockAPI';

describe('index/Payment/actions/modals/Magtek.js', () => {
  let store = null;
  const mockStore = configureStore(middlewares);
  const initialData = {
    permitID: -1,
    batchID: -1,
    receiptID: -1
  };
  const initState = () => ({
    payment: fromJS({
      permitID: 332,
      receiptID: 1,
      batchID: 1
    }),
    paymentModals: {
      newCreditCard: fromJS({
        cardTypeList: {
          data: [{
            card_type_id: 1,
            card_type: 'visa',
            id: 991
          }]
        }
      }),
      magtek: fromJS({
        AMSAccountInfo: { wallet_id: '221' },
        cardInfo: {
          CCNumberValue: '6224003818130064881',
          cardTypeID: 1,
          ExpirationDateMonthValue: '09',
          ExpirationDateYearValue: '2017',
          saveCardInformation: {}
        }
      })
    },
    initialData
  });

  beforeEach(() => {
    store = mockStore(initState());
  });

  afterEach(() => {
    store.clearActions();
  });

  it('hideMagtekModalAction method should work fine', () => {
    const { hideMagtekModalAction, SHOW_MODAL } = actions;
    store.dispatch(hideMagtekModalAction());
    const storeActions = store.getActions();
    expect(storeActions.some(action => action.type === SHOW_MODAL)).toBeTruthy();
    expect(global.isInPendingPayment).toBeFalsy();
  });

  it('setCardInfo method should work fine', () => {
    const { setCardInfo, SET_CARD_INFO } = actions;
    store.dispatch(setCardInfo());
    const storeActions = store.getActions();
    expect(storeActions.some(action => action.type === SET_CARD_INFO)).toBeTruthy();
  });

  it('setAMSAccountInfo method should work fine', () => {
    const { setAMSAccountInfo, SET_AMS_ACCOUNT_INFO } = actions;
    store.dispatch(setAMSAccountInfo());
    const storeActions = store.getActions();
    expect(storeActions.some(action => action.type === SET_AMS_ACCOUNT_INFO)).toBeTruthy();
  });

  it('setServerError method should work fine', () => {
    const { setServerError, SET_SERVER_ERROR } = actions;
    store.dispatch(setServerError());
    const storeActions = store.getActions();
    expect(storeActions.some(action => action.type === SET_SERVER_ERROR)).toBeTruthy();
  });

  it('fetchAMSAccountIdAction method should work fine', () => {
    const { fetchAMSAccountIdAction, FETCH_AMS_ACCOUNTID } = actions;
    store.dispatch(fetchAMSAccountIdAction());
    const storeActions = store.getActions();
    expect(storeActions.some(action => action.type === FETCH_AMS_ACCOUNTID)).toBeTruthy();
  });

  it('requestAccountHolderAction method should work fine', () => {
    const { requestAccountHolderAction, FETCH_ACCOUNT_HOLDER } = actions;
    store.dispatch(requestAccountHolderAction({}));
    const storeActions = store.getActions();
    expect(storeActions.some(action => action.type === FETCH_ACCOUNT_HOLDER)).toBeTruthy();
  });

  it('fetchAccountHolderAction method should work fine', () => {
    const { proceedMagtekModalPromiseAction } = actions;
    store.dispatch(proceedMagtekModalPromiseAction()).then(() => {
      const storeActions = store.getActions();
      expect(storeActions.some(action => action.type === IS_CHECKED_FOR_PAY_ACTION)).toBeTruthy();
    });
  });

  it('payment method should work fine', () => {
    const { payment } = actions;
    store.dispatch(payment());
    const storeActions = store.getActions();
    expect(storeActions.some(action => action.type === IS_CHECKED_FOR_PAY_ACTION)).toBeTruthy();
  });

  it('generateWalletID method should work fine', () => {
    const {
      generateWalletID,
      FETCH_ACCOUNT_HOLDER_SUCCESS,
      SET_CARD_INFO,
      FETCH_AMS_ACCOUNTID,
      FETCH_AMS_ACCOUNTID_SUCCESS,
      SET_AMS_ACCOUNT_INFO
    } = actions;
    const callback = jest.fn();
    return store.dispatch(generateWalletID({ CCNumberValue: '6224003818130064881' }, {}, callback)).then(() => {
      const storeActions = store.getActions();
      expect(storeActions.some(action => action.type === FETCH_ACCOUNT_HOLDER_SUCCESS)).toBeTruthy();
      expect(storeActions.some(action => action.type === SET_CARD_INFO)).toBeTruthy();
      expect(storeActions.some(action => action.type === FETCH_AMS_ACCOUNTID)).toBeTruthy();
      expect(storeActions.some(action => action.type === FETCH_AMS_ACCOUNTID_SUCCESS)).toBeTruthy();
      expect(storeActions.some(action => action.type === SET_AMS_ACCOUNT_INFO)).toBeTruthy();
      expect(callback).toHaveBeenCalled();
    });
  });

  it('generateWalletID method should work fine if fetch account holder failed', () => {
    cleanMock();
    mockAPI({
      path: '/json/Payment/accountholder.json',
      result: {
        headers: {
          response_code: '0050',
          response_message: 'unknown error'
        }
      }
    });
    const {
      generateWalletID,
      FETCH_ACCOUNT_HOLDER_FAILURE,
      FETCH_ACCOUNT_HOLDER_SUCCESS,
      SET_CARD_INFO,
      FETCH_AMS_ACCOUNTID,
      SET_AMS_ACCOUNT_INFO,
      SET_SERVER_ERROR
    } = actions;
    const callback = jest.fn();
    return store.dispatch(generateWalletID({ CCNumberValue: '6224003818130064881' }, {}, callback)).then(() => {
      const storeActions = store.getActions();
      expect(storeActions.some(action => action.type === FETCH_ACCOUNT_HOLDER_FAILURE)).toBeTruthy();
      expect(storeActions.some(action => action.type === FETCH_ACCOUNT_HOLDER_SUCCESS)).toBeFalsy();
      expect(storeActions.some(action => action.type === SET_CARD_INFO)).toBeFalsy();
      expect(storeActions.some(action => action.type === FETCH_AMS_ACCOUNTID)).toBeFalsy();
      expect(storeActions.some(action => action.type === SET_AMS_ACCOUNT_INFO)).toBeFalsy();
      expect(storeActions.some(action => action.type === SET_SERVER_ERROR)).toBeTruthy();
      expect(callback).not.toHaveBeenCalled();
      cleanMock();
    });
  });

  it('generateWalletID method should work fine if fetch ams account id failed', () => {
    cleanMock();
    mockAPI({
      path: '/json/Payment/amsaccountid.json',
      result: {
        headers: {
          response_code: '0050',
          response_message: 'unknown error'
        }
      }
    });
    const {
      generateWalletID,
      FETCH_ACCOUNT_HOLDER_SUCCESS,
      SET_CARD_INFO,
      FETCH_AMS_ACCOUNTID,
      FETCH_AMS_ACCOUNTID_FAILURE,
      SET_AMS_ACCOUNT_INFO,
      SET_SERVER_ERROR
    } = actions;
    const callback = jest.fn();
    return store.dispatch(generateWalletID({ CCNumberValue: '6224003818130064881' }, {}, callback)).catch(e => {}).then(() => {
      const storeActions = store.getActions();
      expect(storeActions.some(action => action.type === FETCH_ACCOUNT_HOLDER_SUCCESS)).toBeTruthy();
      expect(storeActions.some(action => action.type === SET_CARD_INFO)).toBeTruthy();
      expect(storeActions.some(action => action.type === FETCH_AMS_ACCOUNTID)).toBeTruthy();
      expect(storeActions.some(action => action.type === FETCH_AMS_ACCOUNTID_FAILURE)).toBeTruthy();
      expect(storeActions.some(action => action.type === SET_AMS_ACCOUNT_INFO)).toBeFalsy();
      expect(storeActions.some(action => action.type === SET_SERVER_ERROR)).toBeTruthy();
      expect(callback).not.toHaveBeenCalled();
      cleanMock();
    });
  });
});
