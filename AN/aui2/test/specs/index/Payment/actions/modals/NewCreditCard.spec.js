import { fromJS } from 'immutable';
import configureStore from 'redux-mock-store';
import middlewares from 'shared/api/middlewares';
import * as actions from 'index/Payment/actions/modals/NewCreditCard';
import  cardTypeList from 'json/Payment/cardtype.json';
import  some from 'lodash/some';
import  first from 'lodash/first';

describe('index/Payment/actions/modals/NewCreditCard', () => {
  let store = null;

  const currentMonth = new Date().getMonth() + 1;
  const currentYear = new Date().getFullYear();
  let initialState = (CCNumberValue) => ({
    paymentAction: fromJS(
      { paymentActionType: 2,
        isSelectModifyPaymentPlan: false,
        isSelectMakeAPayment: false
      }),

    payment: fromJS({
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
      paymentPageIndex: 1 }),
    paymentModals: {
      newCreditCard: fromJS(
        {
          ExpirationDateMonth: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(item => ({ value: item, text: item })),
          cardTypeValidation: {
            validation: 1,
            showIcon: true,
            showDropDown: false
          },
          cardTypeID: 1,
          ccApdDeviceType: '',
          cardTypeValue: null,
          cardTypeList: { 'data': cardTypeList.body.card_type_list, 'selected': [] },
          CCNumberValue: CCNumberValue,
          ccTypeDropdown: false,
          showModel: true,
          ExpirationDateMonthValue: currentMonth,
          ccMagesafeDeviceType: 'MagtekDynamag',
          cardTypeName: null,
          ExpirationDateYearValue: currentYear + 1,
          ExpirationDateYear: Array(...{ length: 11 }).map((v, i) => {
            const val = i + currentYear;
            return { value: val, text: val };
          }),
          errorMsgs: { 'ccNumber': '', 'ccNumber_cardType': '', 'ccExpiry': '', 'savedCard': '' },
          isCheckedForPay: false,
          saveCardInformation: true })
    },
    paymentOptions: {
      creditCard: fromJS({})
    },
    initialData: {
      permitID: 12,
      batchID: 0,
      receiptID: 1222,
      ccScanWithApdDevice: false,
      ccScanWithMagesafeDevice: false
    }
  })
  beforeEach(() => {
    const mockStore = configureStore(middlewares);
    store = mockStore(initialState('4110144110144115'))
  })

  afterEach(() => {
    store.clearActions();
  });

  it('fetchCardtypeAction should work fine', (done) => {
    const { fetchCardtypeAction } = actions;
    store.dispatch(fetchCardtypeAction()).then(() => {
      const myActions = store.getActions();
      expect(myActions.length).toEqual(3);
      expect(myActions[2].type).toBe(actions.FETCH_CARD_TYPE_ACTION_SUCCESS);
      expect(typeof myActions[2].payload).toEqual('object');
      done();
    });
  });

  it('isCheckedForPayAction should work fine', (done) => {
    const { isCheckedForPayAction } = actions;
    const value = false;
    store.dispatch(isCheckedForPayAction(value));
    const myActions = store.getActions();
    expect(myActions.length).toEqual(1);
    expect(myActions[0].type).toBe(actions.IS_CHECKED_FOR_PAY_ACTION);
    expect(typeof myActions[0].payload.value).toEqual('boolean');
    done();
  });


  it('changeExpirationDateMonthAction should work fine', (done) => {
    const { changeExpirationDateMonthAction } = actions;
    const value = '123123'
    store.dispatch(changeExpirationDateMonthAction(value));
    const myActions = store.getActions();

    expect(myActions.length).toEqual(1);
    expect(myActions[0].type).toBe(actions.CHANGE_EXPIRATION_DATE_MONTH_ACTION);
    expect(typeof myActions[0].payload.value).toEqual('string');
    done();
  });
  it('changeExpirationDateYearAction should work fine', (done) => {
    const { changeExpirationDateYearAction } = actions;
    const value = '123123'
    store.dispatch(changeExpirationDateYearAction(value));
    const myActions = store.getActions();

    expect(myActions.length).toEqual(1);
    expect(myActions[0].type).toBe(actions.CHANGE_EXPIRATION_DATE_YEAR_ACTION);
    expect(typeof myActions[0].payload.value).toEqual('string');
    done();
  });


  it('proceedNewCreditCardModalPromiseAction should work fine', (done) => {
    const { proceedNewCreditCardModalPromiseAction } = actions;
    const promise = store.dispatch(proceedNewCreditCardModalPromiseAction());
    actions._resolve();
    promise.then(() => {
        const myActions = store.getActions();
        expect(myActions.length).toEqual(1);
        expect(myActions[0].type).toBe(actions.SHOW_CC_MODAL_ACTION);
        expect(typeof myActions[0].payload.value).toEqual('boolean');
        done();
      });
  });

  it('hideNewCreditCardModalAction should work fine', (done) => {
    const { hideNewCreditCardModalAction } = actions;
    store.dispatch(hideNewCreditCardModalAction());
    const myActions = store.getActions();
    expect(myActions.length).toEqual(1);
    expect(myActions[0].type).toBe(actions.SHOW_CC_MODAL_ACTION);
    expect(typeof myActions[0].payload.value).toEqual('boolean');
    done();
  });

  it('requestAccountHolderAction should work fine', (done) => {
    const { requestAccountHolderAction } = actions;
    const batchID = '1111111';
    const receiptID = '2222222';
    store.dispatch(requestAccountHolderAction(batchID, receiptID)).then(() => {
      const storeActions = store.getActions();
      expect((storeActions instanceof Array)).toBeTruthy();
      expect(storeActions.length).toBeGreaterThanOrEqual(2);
      expect(some(storeActions, ['type', actions.FETCH_CC_ACCOUNT_HOLDER_ACTION])).toBe(true);
      expect(some(storeActions, ['type', actions.FETCH_CC_ACCOUNT_HOLDER_ACTION_SUCCESS])).toBe(true);
      const action = first(storeActions.filter(action => action.type === actions.FETCH_CC_ACCOUNT_HOLDER_ACTION_SUCCESS));
      expect(action.payload.headers.response_code).toBe('0000');
      expect(action.payload.headers.response_message).toEqual('Successful');
      expect(action.payload.body.account_holder.ams_account_id_exponent).toEqual('10001');
      done();
    });
  });
});
