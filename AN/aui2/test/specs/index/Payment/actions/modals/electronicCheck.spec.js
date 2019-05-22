import { fromJS } from 'immutable';
import configureStore from 'redux-mock-store';
import middlewares from 'shared/api/middlewares';
import find from 'lodash/find';
import normalizeData from 'shared/utils/normalizeData';
import * as actions from 'index/Payment/actions/modals/NewECheck';
import  cardTypeList from 'json/Payment/cardtype.json';
import  creditcardlist from 'json/Payment/creditcardlist.json';
import  accountholder_test2 from 'json/Payment/accountholder_test2.json';
import  accountholder_test from 'json/Payment/accountholder_test.json';
import  accountholder from 'json/Payment/accountholder.json';
import  accountholder_test1 from 'json/Payment/accountholder_test1.json';
import  mockAPI from 'utils/mockAPI';
import  some from 'lodash/some';
import  first from 'lodash/first';

describe('index/Payment/actions/modals/ElectronicCheck', () => {
  let store = null;
  const echeckAccountTypeList = [
    {
        selected: true,
        account_type: 'C',
        account_type_name: 'Checking'
    },
    {
        selected: false,
        account_type: 'S',
        account_type_name: 'Savings'
    }
  ];
  const paymentAction = fromJS(
    { 
      paymentActionType: 2, 
      isSelectModifyPaymentPlan: false, 
      isSelectMakeAPayment: false 
    }
  );
  const initialData = {
    permitID: -1,
    batchID: 0,
    receiptID: -1
  };
  const payment = fromJS(
    { 
      isRefund: false, 
      total: '370.00', 
      successPay: false, 
      paymentPlanAmount: 0, 
      depositFee: '15.00', 
      ecpAuthDetails: {}, 
      sourcePageIndex: 3, 
      transactionFee: '5.17', 
      paymentPlanWording: 'Payment Plan', 
      isPaymentActionValid: false, 
      errors: [], 
      allowModifyPaymentPlan: false, 
      makeAPaymentReceipts: { 'permitID': '12' }, 
      payNow: '370.00', 
      isAllowChangePayerForModifyPaymentPlan: true, 
      resize: false, 
      minimumPayNowAmount: 95.12, 
      permitId: '12', 
      isDistributePayment: false, 
      paymentPageIndex: 1 });
  const createPaymentModals = (accountTypeValue) => ({
   
        newECheck:fromJS({
            accountTypeValue: accountTypeValue,
            saveInformation: true,

            showModel: false,
            okButtonAble: true,
            accountTypeList: normalizeData(echeckAccountTypeList, {
                valueField: 'account_type',
                textField: 'account_type_name'
            }),
            newEcheckError: ''
        })
  })
  const currentMonth = new Date().getMonth() + 1;
  const currentYear = new Date().getFullYear();
  beforeEach(() => {
    const mockStore = configureStore(middlewares);
    store = mockStore({paymentModals:createPaymentModals('C'), paymentAction, payment, initialData})
  })

  afterEach(() => {
    store.clearActions();
  });

  it('changeECheckAccountType should work fine', (done) => {
    const { changeECheckAccountType } = actions;
    const value = '01'
    store.dispatch(changeECheckAccountType(value));
    const myActions = store.getActions();
    expect(myActions.length).toEqual(1);
    expect(myActions[0].type).toBe(actions.ECHECK_NEW_CHANGE_ACCOUNT_TYPE);
    expect(typeof myActions[0].payload.value).toEqual('string');
    done();
  });
  it('changeECheckSaveInformation should work fine', (done) => {
    const { changeECheckSaveInformation } = actions;
    const value = true;

    store.dispatch(changeECheckSaveInformation(value));
    const myActions = store.getActions();
    expect(myActions.length).toEqual(1);
    expect(myActions[0].type).toBe(actions.ECHECK_NEW_CHANGE_SAVEINFORMATION);
    expect(typeof myActions[0].payload.value).toEqual('boolean');
    done();
  });

  it('setECheckError should work fine', (done) => {
    const { setECheckError } = actions;
    const error = {
      errorMsg: 'errorMsg'
    };
    store.dispatch(setECheckError(error));
    const myActions = store.getActions();
    expect(myActions.length).toEqual(1);
    expect(myActions[0].type).toBe(actions.ECHECK_NEW_SET_ERROR);
    expect(typeof myActions[0].payload.error).toEqual('object');
    done();
  });
  it('saveNewECheck should work fine', (done) => {
    const accountNumber = '134123412341';
    const routingNumber = '134123412341';
    store.dispatch(actions.saveNewECheck())
      .then(() => {
        const storeActions = store.getActions();
        expect((storeActions instanceof Array)).toBeTruthy();
        expect(storeActions.length).toBeGreaterThanOrEqual(2);
        expect(some(storeActions, ['type', actions.FETCH_ECHECK_ACCOUNT_HOLDER_SUCCESS])).toBe(true);
        expect(some(storeActions, ['type', actions.FETCH_ECHECK_AMS_ACCOUNTID_SUCCESS])).toBe(true);
        const action = first(storeActions.filter(action => action.type === actions.FETCH_ECHECK_ACCOUNT_HOLDER_SUCCESS));
        expect(action.payload.headers.response_code).toBe('0000');
        expect(action.payload.headers.response_message).toEqual('Successful');
        expect(action.payload.body.account_holder.ams_account_id_modulus)
        .toEqual(accountholder.body.account_holder.ams_account_id_modulus);
        done();
      });
  });
  it('cancelAction should work fine', (done) => {
    const { cancelAction } = actions;
    store.dispatch(cancelAction());
    const myActions = store.getActions();
    expect(myActions.length).toEqual(1);
    expect(myActions[0].type).toBe(actions.ECHECK_NEW_SET_SHOW_MODAL);
    done();
  });
  it('showECheckModalPromiseAction should work fine', (done) => {
    const { showECheckModalPromiseAction } = actions;
    store.dispatch(showECheckModalPromiseAction());
    const myActions = store.getActions();
    expect(myActions.length).toEqual(1);
    expect(myActions[0].type).toBe(actions.ECHECK_NEW_SET_SHOW_MODAL);
    done();
  });
  it('saveNewECheck another branch Modulus=error should work fine', (done) => {
    const mockStore = configureStore(middlewares);
    const store = mockStore({paymentModals:createPaymentModals('s'), paymentAction, payment, initialData});
    const accountNumber = '134123412341';
    const routingNumber = '134123412341';
    store.dispatch(actions.saveNewECheck(accountNumber, routingNumber))
      .then(() => {
        const storeActions = store.getActions();
        expect(Array.isArray(storeActions)).toBeTruthy();
        expect(storeActions.length).toBeGreaterThanOrEqual(2);
        expect(some(storeActions, ['type', actions.FETCH_ECHECK_ACCOUNT_HOLDER_SUCCESS])).toBe(true);
        expect(some(storeActions, ['type', actions.FETCH_ECHECK_AMS_ACCOUNTID_SUCCESS])).toBe(true);
        const action = first(storeActions.filter(action => action.type === actions.FETCH_ECHECK_AMS_ACCOUNTID_SUCCESS));
        expect(action.payload.headers.response_code).toBe('0000');
        expect(action.payload.headers.response_message).toEqual('Successful');
        expect(action.payload.body.ams_account_info.key).toEqual('xxx5454');
        done();
      });
  });
  it('saveNewECheck another branch Modulus=localdemo should work fine', (done) => {
   mockAPI({
      path: '/json/Payment/accountholder.json',
      result: accountholder_test
    })
    const mockStore = configureStore(middlewares);
    const store = mockStore({paymentModals: createPaymentModals('s'), paymentAction, payment, initialData});
    const accountNumber = '134123412341';
    const routingNumber = '134123412341';
    store.dispatch(actions.saveNewECheck(accountNumber, routingNumber))
      .then(() => {
        const storeActions = store.getActions();
        expect(Array.isArray(storeActions)).toBeTruthy();
        expect(storeActions.length).toBeGreaterThanOrEqual(2);
        expect(some(storeActions, ['type', actions.FETCH_ECHECK_ACCOUNT_HOLDER_SUCCESS])).toBe(true);
        expect(some(storeActions, ['type', actions.ECHECK_NEW_SAVE_SUCCESS])).toBe(true);
        const action = first(storeActions.filter(action => action.type === actions.FETCH_ECHECK_ACCOUNT_HOLDER_SUCCESS));
        expect(action.payload.headers.response_code).toBe('0000');
        expect(action.payload.headers.response_message).toEqual('Successful');
        expect(action.payload.body.account_holder.ams_account_id_modulus)
        .toEqual(accountholder_test.body.account_holder.ams_account_id_modulus);
        done();
      });
  });
  it.skip('saveNewECheck another branch Modulus="" should work Error', (done) => {
   mockAPI({
      path: '/json/Payment/accountholder.json',
      result: accountholder_test1
    })
    const mockStore = configureStore(middlewares);
    const store = mockStore({paymentModals: createPaymentModals('s'), paymentAction, payment, initialData});
    const accountNumber = '134123412341';
    const routingNumber = '13412341142312';
    store.dispatch(actions.saveNewECheck(accountNumber, routingNumber))
      .catch(() => {
        const storeActions = store.getActions();
        expect(Array.isArray(storeActions)).toBeTruthy();
        expect(storeActions.length).toBeGreaterThanOrEqual(2);
        expect(some(storeActions, ['type', actions.FETCH_ECHECK_ACCOUNT_HOLDER_SUCCESS])).toBe(true);
        expect(some(storeActions, ['type', actions.FETCH_ECHECK_AMS_ACCOUNTID_SUCCESS])).toBe(false);
        const action = first(storeActions.filter(action => action.type === actions.FETCH_ECHECK_ACCOUNT_HOLDER_SUCCESS));
        expect(action.payload.body.account_holder.ams_account_id_modulus)
        .toEqual(accountholder_test1.body.account_holder.ams_account_id_modulus);
        done();
      });
  });
});
