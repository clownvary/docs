import { fromJS } from 'immutable';
import moment from 'moment';
import configureStore from 'redux-mock-store';
import middlewares from 'shared/api/middlewares';
import Globalize from 'react-base-ui/lib/services/i18n';
import * as optionsActions from 'index/Payment/actions/paymentOptions/options';
import * as actions from 'index/Payment/actions/paymentOptions/paymentPlan';
import { SHOW_PAYMENT_ERRORS } from 'index/Payment/actions/index';
import jsonAutoplandetails from 'json/Payment/autoplandetails.json';
import jsonBackupPaymentInfo from 'json/Payment/backupPaymentInfo.json';
import { newOptions } from 'index/Payment/consts';
import {
  ECHECK_ADD_NEW_TO_LIST
} from 'index/Payment/actions/paymentOptions/electronicCheck';
import { paymentPlanPaymentTypes } from 'index/Payment/consts';
import { SHOW_CC_MODAL_ACTION } from 'index/Payment/actions/modals/NewCreditCard';
import { SHOW_MODAL } from 'index/Payment/actions/modals/Magtek';

jest.mock('index/Payment/store', () => ({
  getState: jest.fn(),
  dispatch: jest.fn()
}));

jest.mock('index/Payment/components/Modals/PinPad/actions/pinpad', () => ({
  getCardInfoByPinPadPromiseAction: jest.fn(() => Promise.resolve({ ccNumberValue: '6627003818130164661' }))
}));

jest.mock('index/Payment/actions/modals/NewECheck', () => ({
  showECheckModalPromiseAction: jest.fn(() => Promise.resolve({ }))
}));

function getSystemDateFormat(y, m, d) {
  return moment(new Date(y, m, d)).format(Globalize.ANDateFormat);
}

const firstPaymentDate = '2017-01-24';
const paymentSchedules = [{
  dueDate: getSystemDateFormat(2017, 0, 24),
  amount: 3.33
}, {
  dueDate: getSystemDateFormat(2017, 0, 31),
  amount: 3.33
}, {
  dueDate: getSystemDateFormat(2017, 1, 7),
  amount: 3.34
}];


describe('index -> Payment -> actions -> paymentOptions -> paymentPlan', () => {
  let store = null;
  const paymentErrors = [{
    key: 2,
    name: 'checkNumber',
    message: 'Please enter a Check Number.'
  }];
  const initialData = {
    permitID: 12,
    batchID: 0,
    receiptID: 1222,
    ccScanWithApdDevice: true,
    paymentPlanInitData: __initialState__.paymentPlanInitData
  };
  const mockStore = configureStore(middlewares);
  beforeEach(() => {
    store = mockStore({
      payment: fromJS({
        payNow: 123,
        errors: paymentErrors
      }),
      paymentOptions: {
        options: fromJS({
          data: [{
            index: 0,
            amount: 10,
            frequecys: {
              data: [{
                value: 1,
                text: 'Weekly'
              },
              {
                value: 2,
                text: 'Every other week'
              }
              ],
              selected: 1
            },
            numOfPayments: {
              data: [{
                value: 1,
                text: '1'
              },
              {
                value: 3,
                text: '3'
              }
              ],
              selected: 3
            }
          }]
        }),
        paymentPlan: fromJS({
          overrideCcExpBeforePpLast: true,
          ppAutoCCList: {
            data: [{
              text: 'MasterCard ends in 5454',
              value: '5454',
              card_expiration: '12/2016'
            }],
            selected: '5454'
          },
          ppAutoEcpList: {
            data: [{
              text: 'MasterCard ends in 5454',
              value: '5454',
              card_expiration: '12/2016'
            }],
            selected: '5454'
          }
        }),
        eCheck: fromJS({
          eCheckListDropDown: {
            data: []
          }
        })
      },
      paymentAction: fromJS({
        isSelectModifyPaymentPlan: false
      }),
      paymentSummary: fromJS({}),
      paymentModals: {
        newCreditCard: fromJS({})
      },
      payer: fromJS({
        params: {}
      }),
      initialData
    });
  });

  afterEach(() => {
    store.clearActions();
  });

  it('generatePaymentSchedules should return the right payment schedules', () => {
    const predefinedSchedules = [{
      due_date: '2017 Feb 05',
      amount: 7.52
    }];
    const { generatePaymentSchedules } = actions;
    const schedules = generatePaymentSchedules(predefinedSchedules);

    expect(schedules).toEqual([{
      due_date: '2017 Feb 05',
      dueDate: '2017 Feb 05',
      amount: 7.52
    }]);
  });

  it('isCCExpireForPaymentSchedule should return the right expiration information when payment schedules is not empty and cc do expire', () => {
    const { isCCExpireForPaymentSchedule } = actions;
    const ccExpireInfo = isCCExpireForPaymentSchedule({
      paymentPlan: {
        ppAutoCCList: {
          data: [{
            text: 'MasterCard ends in 5454',
            value: '5454',
            card_expiration: '12/2016'
          }],
          selected: '5454'
        }
      }
    }, [{
      dueDate: '2017 Feb 05',
      amount: 7.52
    }], {
      submitBtn: 'Pay'
    });
    const ppErrorMsg = [
      'Credit card expires before date of final scheduled charge ',
      '(2017 Feb 05). ',
      'Click the \'Pay\' button again ',
      'if you want to proceed using the specified date.'
    ].join('');
    expect(ccExpireInfo).toEqual({
      isCCExpireBeforeLastPaySchedule: true,
      ppErrorMsg,
      isErrTypeWarning: true
    });
  });

  it('isCCExpireForPaymentSchedule should return the right expiration information when payment schedules is not empty and cc doesn`t expire', () => {
    const { isCCExpireForPaymentSchedule } = actions;
    const ccExpireInfo = isCCExpireForPaymentSchedule({
      paymentPlan: {
        ppAutoCCList: {
          data: [{
            text: 'MasterCard ends in 5454',
            value: '5454',
            card_expiration: '12/2016'
          }],
          selected: '5454'
        }
      }
    }, [{
      dueDate: '2014 Feb 05',
      amount: 7.52
    }]);

    expect(ccExpireInfo).toEqual({
      isCCExpireBeforeLastPaySchedule: false
    });
  });

  it('isCCExpireForPaymentSchedule should return the right expiration information when auto credit card list is empty', () => {
    const { isCCExpireForPaymentSchedule } = actions;
    const ccExpireInfo = isCCExpireForPaymentSchedule({ paymentPlan: {
      ppAutoCCList: {
        data: [],
        selected: '-1'
      }
    } }, []);

    expect(ccExpireInfo).toEqual({
      isCCExpireBeforeLastPaySchedule: false
    });
  });

  it('isCCExpireForPaymentSchedule should return the right expiration information when payment schedules is empty', () => {
    const { isCCExpireForPaymentSchedule } = actions;
    const ccExpireInfo = isCCExpireForPaymentSchedule({
      paymentPlan: {
        ppAutoCCList: {
          data: [{
            text: 'MasterCard ends in 5454',
            value: '5454',
            card_expiration: '12/2016'
          }],
          selected: '5454'
        }
      }
    }, []);

    expect(ccExpireInfo).toEqual({
      isCCExpireBeforeLastPaySchedule: false
    });
  });


  it('changePaymentPlanAmount should return right action', () => {
    const { changePaymentPlanAmount } = actions;
    const amount = '123';
    let action = null;

    store.dispatch(changePaymentPlanAmount(amount));
    action = store.getActions()[0];
    expect(typeof action).toBe('object');
    expect(action.type).toBe(optionsActions.PAYMENT_OPTIONS_UPDATE);
    expect(typeof action.payload.funcUpdate).toEqual('function');
  });

  it('setPaymenPlanSchedule should return right action', () => {
    const { setPaymenPlanSchedule } = actions;
    let action = null;

    store.dispatch(setPaymenPlanSchedule(paymentSchedules, 0));
    action = store.getActions()[0];
    expect(typeof action).toBe('object');
    expect(action.type).toBe(optionsActions.PAYMENT_OPTIONS_UPDATE_BY_KEY);
    expect(action.payload).toEqual({
      value: paymentSchedules,
      index: 0,
      key: 'paymentSchedules'
    });
  });

  it('setPaymentSchedule should return right actions when cc doesn`t expire', () => {
    const {
      setPaymentSchedule,
      OVERRIDE_CC_EXPIRATION
    } = actions;

    const predefinedSchedules = [{
      dueDate: '2014 Feb 05',
      amount: 7.52
    }];

    let myActions = null;
    store.dispatch(setPaymentSchedule(predefinedSchedules, 0));

    myActions = store.getActions();
    expect(myActions.length).toBe(3);
    expect(myActions[0].type).toBe(OVERRIDE_CC_EXPIRATION);
    expect(myActions[0].payload).toEqual({
      flag: false
    });

    expect(myActions[1].type).toBe(SHOW_PAYMENT_ERRORS);
    expect(myActions[1].payload).toEqual({
      errors: paymentErrors
    });

    expect(myActions[2].type).toBe(optionsActions.PAYMENT_OPTIONS_UPDATE_BY_KEY);
    expect(myActions[2].payload).toEqual({
      value: predefinedSchedules,
      index: 0,
      key: 'paymentSchedules'
    });
  });

  it('setPaymentSchedule should return right actions when cc do expire', () => {
    const {
      setPaymentSchedule
    } = actions;
    const predefinedSchedules = [{
      dueDate: '2018 Feb 05',
      amount: 7.52
    }];

    let myActions = null;

    store.dispatch(setPaymentSchedule(predefinedSchedules, 0));
    myActions = store.getActions();
    expect(myActions.length).toBe(1);

    expect(myActions[0].type).toBe(optionsActions.PAYMENT_OPTIONS_UPDATE_BY_KEY);
    expect(myActions[0].payload).toEqual({
      value: predefinedSchedules,
      index: 0,
      key: 'paymentSchedules'
    });
  });

  it('changePaymentPlanFields should return right action', () => {
    const { changePaymentPlanFields } = actions;
    const fieldInfo = {
      index: 0,
      field: 'frequecys',
      val: 2
    };
    let action = null;

    store.dispatch(changePaymentPlanFields(fieldInfo));
    action = store.getActions()[0];
    expect(typeof action).toBe('object');
    expect(action.type).toBe(optionsActions.PAYMENT_OPTIONS_UPDATE);
    expect(typeof action.payload.funcUpdate).toEqual('function');
  });

  it('changePaymentPlanSection should dispatch right action when filed is "frequecys"', (done) => {
    const {
      changePaymentPlanSection
    } = actions;
    const fieldInfo = {
      index: 0,
      field: 'frequecys',
      val: 1
    };
    store.dispatch(changePaymentPlanSection(fieldInfo));
    const myActions = store.getActions();
    expect(myActions.length).toBe(4);
    expect(myActions[0].type).toBe(optionsActions.PAYMENT_OPTIONS_UPDATE);
    expect(typeof myActions[0].payload.funcUpdate).toEqual('function');

    expect(myActions.some(action => action.type === optionsActions.PAYMENT_OPTIONS_UPDATE_BY_KEY)).toBeTruthy();
    done();
  });

  it('changePaymentPlanSection should dispatch right action when filed is "numOfPayments"', () => {
    const {
      changePaymentPlanSection
    } = actions;
    const fieldInfo = {
      index: 0,
      field: 'numOfPayments',
      val: 3
    };

    store.dispatch(changePaymentPlanSection(fieldInfo));
    const myActions = store.getActions();
    expect(myActions.length).toBe(4);
    expect(myActions[0].type).toBe(optionsActions.PAYMENT_OPTIONS_UPDATE);
    expect(typeof myActions[0].payload.funcUpdate).toEqual('function');

    expect(myActions.some(action => action.type === optionsActions.PAYMENT_OPTIONS_UPDATE_BY_KEY)).toBeTruthy();
  });

  it('changePaymentPlanSection should dispatch right action when filed is "firstPaymentDate"', () => {
    const {
      changePaymentPlanSection
    } = actions;
    const sectionInfo = {
      index: 0,
      field: 'firstPaymentDate',
      val: '01/01/2000',
    };
    store.dispatch(changePaymentPlanSection(sectionInfo));
    const myActions = store.getActions();
    expect(myActions.length).toBe(4);
    expect(myActions[0].type).toBe(optionsActions.PAYMENT_OPTIONS_UPDATE_BY_KEY);
    expect(myActions[0].payload).toEqual({
      index: sectionInfo.index,
      key: sectionInfo.field,
      value: sectionInfo.val
    });

    expect(myActions.some(action => action.type === optionsActions.PAYMENT_OPTIONS_UPDATE_BY_KEY)).toBeTruthy();
  });

  it('changePaymentPlanSection should dispatch right action when filed is "reservationPPs" and pre-defined payment plan is selected', (done) => {
    const {
      changePaymentPlanSection,
      GET_PAYMENT_SCHEDULE,
      GET_PAYMENT_SCHEDULE_SUCCESS
    } = actions;
    const fieldInfo = {
      index: 0,
      field: 'reservationPPs',
      val: 3
    };
    let myActions = null;

    store.dispatch(changePaymentPlanSection(fieldInfo)).then(() => {
      myActions = store.getActions();
      expect(myActions.length).toBe(5);
      expect(myActions[0].type).toBe(optionsActions.PAYMENT_OPTIONS_UPDATE);
      expect(myActions[0].payload).toEqual(expect.objectContaining({
        funcUpdate: expect.any(Function)
      }));

      expect(myActions[1].type).toBe(GET_PAYMENT_SCHEDULE);
      expect(myActions[1].payload).toBeUndefined();

      expect(myActions[3].type).toBe(GET_PAYMENT_SCHEDULE_SUCCESS);
      expect(myActions[3].payload).toEqual(jsonAutoplandetails);

      expect(myActions[4].type).toBe(optionsActions.PAYMENT_OPTIONS_UPDATE_BY_KEY);
      expect(myActions[4].payload).toEqual({
        index: 0,
        key: 'paymentSchedules',
        value: [{"amount": 7.52, "dueDate": "2017 Feb 05", "due_date": "2017 Feb 05"}]
      });
      done();
    })
  });

  it('changePaymentPlanSection should dispatch right action when filed is "reservationPPs" and customer payment plan is selected', () => {
    const {
      changePaymentPlanSection
    } = actions;
    const fieldInfo = {
      index: 0,
      field: 'reservationPPs',
      val: 0
    };

    store.dispatch(changePaymentPlanSection(fieldInfo));
    const myActions = store.getActions();
    expect(myActions.length).toBe(4);
    expect(myActions[0].type).toBe(optionsActions.PAYMENT_OPTIONS_UPDATE);
    expect(typeof myActions[0].payload.funcUpdate).toEqual('function');

    expect(myActions.some(action => action.type === optionsActions.PAYMENT_OPTIONS_UPDATE_BY_KEY)).toBeTruthy();
  });

  it('changePaymentPlanSection should dispatch no action when filed is not "reservationPPs", "firstPaymentDate", "frequecys", "numOfPayments"', () => {
    const { changePaymentPlanSection } = actions;
    const fieldInfo = {
      index: 0,
      field: 'test',
      val: 3
    };

    store.dispatch(changePaymentPlanSection(fieldInfo));
    const myActions = store.getActions();
    expect(myActions.length).toBe(0);
  });

  it('changeAutoPaymentStatus should return right action', () => {
    const { CHANGE_AUTO_PAYMENT_STATUS, changeAutoPaymentStatus } = actions;
    const status = false;
    const index = 0;
    let action = null;

    store.dispatch(changeAutoPaymentStatus(status, index));
    action = store.getActions()[0];
    expect(typeof action).toBe('object');
    expect(action.type).toBe(optionsActions.PAYMENT_OPTIONS_UPDATE_BY_KEY);
    expect(action.payload).toEqual({
      index,
      key: 'showAutoPaymentMethod',
      value: status
    });
  });

  it('getBackupPayment should return right action', (done) => {
    const {
      UPDATE_BACKUP_PAYMENT,
      UPDATE_BACKUP_PAYMENT_SUCCESS,
      getBackupPayment
    } = actions;

    store.dispatch(getBackupPayment())
      .then(() => {
        const myActions = store.getActions();
        expect(myActions.length).toBe(2);
        expect(myActions[0].type).toBe(UPDATE_BACKUP_PAYMENT);
        expect(myActions[1].type).toBe(UPDATE_BACKUP_PAYMENT_SUCCESS);
        expect(myActions[1].payload).toEqual(jsonBackupPaymentInfo);
        done();
      })
  });

  it('updateAutoPaymentType should return right action', () => {
    const { updateAutoPaymentType } = actions;
    const selectedPayType = 1;
    const index = 0;
    let action = null;

    store.dispatch(updateAutoPaymentType(selectedPayType, index));
    action = store.getActions()[0];

    expect(typeof action).toBe('object');
    expect(action.type).toBe(optionsActions.PAYMENT_OPTIONS_UPDATE);
    expect(typeof action.payload.funcUpdate).toEqual('function');

    const updatedOptions = action.payload.funcUpdate(fromJS({}));
    expect(updatedOptions.toJS()).toEqual({
      [index]: {
        autoPaymentTypes: {
          selected: selectedPayType
        }
      }
    });
  });

  it('updateAutoPaymentTypeAndCCExpStatus should return right action', () => {
    const {
      updateAutoPaymentTypeAndCCExpStatus,
      OVERRIDE_CC_EXPIRATION
    } = actions;
    const selectedPayType = 1;
    const index = 0;
    let myActions = null;

    store.dispatch(updateAutoPaymentTypeAndCCExpStatus(selectedPayType, index));
    myActions = store.getActions();

    expect(myActions.length).toBe(3);
    expect(myActions[0].type).toBe(OVERRIDE_CC_EXPIRATION);
    expect(myActions[0].payload).toEqual({
      flag: false
    });

    expect(myActions[1].type).toBe(SHOW_PAYMENT_ERRORS);
    expect(myActions[1].payload).toEqual({
      errors: paymentErrors
    });

    expect(myActions[2].type).toBe(optionsActions.PAYMENT_OPTIONS_UPDATE);
    expect(typeof myActions[2].payload.funcUpdate).toEqual('function');
  });

  it('setEcpList should return right action', () => {
    const { SET_ECP_LIST, setEcpList } = actions;
    const ecpList = [];
    let action = null;

    store.dispatch(setEcpList(ecpList));
    action = store.getActions()[0];
    expect(typeof action).toBe('object');
    expect(action.type).toBe(SET_ECP_LIST);
    expect(action.payload).toEqual({
      ecpList
    });
  });

  it('fetchCCList should return right action', () => {
    const { FETCH_CREDITCARD_LIST, fetchCCList } = actions;
    const ccList = [];
    let action = null;

    store.dispatch(fetchCCList(ccList));
    action = store.getActions()[0];
    expect(typeof action).toBe('object');
    expect(action.type).toBe(FETCH_CREDITCARD_LIST);
    expect(action.payload).toEqual({
      creditCardList: ccList
    });
  });

  it('overrideCcExpiration should return right action', () => {
    const { OVERRIDE_CC_EXPIRATION, overrideCcExpiration } = actions;
    const override = true;
    let action = null;

    store.dispatch(overrideCcExpiration(override));
    action = store.getActions()[0];
    expect(typeof action).toBe('object');
    expect(action.type).toBe(OVERRIDE_CC_EXPIRATION);
    expect(action.payload).toEqual({
      flag: override
    });
  });

  it('fetchAutoPaymentMethodList should return right action', () => {
    const {
      fetchAutoPaymentMethodList,
      SET_ECP_LIST,
      FETCH_CREDITCARD_LIST
    } = actions;
    store = mockStore({
      ...store.getState(),
      initialData: {
        ...initialData,
        paymentPlanInitData: {
          ...initialData.paymentPlanInitData,
          show_prior_cc: false,
          show_prior_ecp: false
        }
      }
    });

    store.dispatch(fetchAutoPaymentMethodList());

    const storeActions = store.getActions();

    expect(storeActions.some(action => action.type === SET_ECP_LIST)).toBeTruthy();
    expect(storeActions.some(action => action.type === FETCH_CREDITCARD_LIST)).toBeTruthy();
  });

  it('changePaymentCard should return right action when field is "ppAutoCCList" and value is not "new"', () => {
    const {
      changePaymentCard,
      OVERRIDE_CC_EXPIRATION,
      CHANGE_PAYMENT_CARD
    } = actions;
    const value = 2;
    const ppPaymentType = paymentPlanPaymentTypes.CREDITCARD;
    let myActions = null;

    store.dispatch(changePaymentCard(1, value, ppPaymentType));
    myActions = store.getActions();

    expect(myActions.length).toBe(3);
    expect(myActions[0].type).toBe(SHOW_PAYMENT_ERRORS);
    expect(myActions[0].payload).toEqual({
      errors: paymentErrors
    });
    expect(myActions[1].type).toBe(OVERRIDE_CC_EXPIRATION);
    expect(myActions[1].payload).toEqual({
      flag: false
    });
    expect(myActions[2].type).toBe(CHANGE_PAYMENT_CARD);
    expect(myActions[2].payload).toEqual({
      value,
      ppPaymentType
    });
  });

  it('changePaymentCard should return right action when field is "ppAutoEcpList" and value is not "new"', () => {
    const {
      changePaymentCard,
      OVERRIDE_CC_EXPIRATION,
      CHANGE_PAYMENT_CARD
    } = actions;
    const value = 2;
    const ppPaymentType = paymentPlanPaymentTypes.ELECTRONICCHECK;
    let myActions = null;

    store.dispatch(changePaymentCard(1, value, ppPaymentType));
    myActions = store.getActions();

    expect(myActions.length).toBe(3);
    expect(myActions[0].type).toBe(SHOW_PAYMENT_ERRORS);
    expect(myActions[0].payload).toEqual({
      errors: paymentErrors
    });
    expect(myActions[1].type).toBe(OVERRIDE_CC_EXPIRATION);
    expect(myActions[1].payload).toEqual({
      flag: false
    });
    expect(myActions[2].type).toBe(CHANGE_PAYMENT_CARD);
    expect(myActions[2].payload).toEqual({
      value,
      ppPaymentType
    });
  });

  it('requestSavePaymentSchedules method should work fine', () => {
    const {
      requestSavePaymentSchedules
    } = actions;
    const paymentSchedules = fromJS([{ dueDate: '2017-12-07', amount: 100 }]);
    return store.dispatch(requestSavePaymentSchedules({ paymentSchedules })).then((response) => {
      expect(response.payload.headers.response_code).toEqual('0000');
      expect(Array.isArray(response.payload.body.payment_schedules)).toBeTruthy();
    })
  });

  it('savePaymentSchedules method should work fine if isSelectModifyPaymentPlan is not true', () => {
    const {
      savePaymentSchedules
    } = actions;
    const paymentSchedules = [{ dueDate: '2017-12-07', amount: 100 }];
    store.dispatch(savePaymentSchedules(paymentSchedules, 0, true));
    const storeActions = store.getActions();
    expect(storeActions.some(action => action.type === optionsActions.PAYMENT_OPTIONS_UPDATE_BY_KEY)).toBeTruthy();
    expect(storeActions.some(action => action.type === optionsActions.PAYMENT_OPTIONS_UPDATE)).toBeTruthy();
  });

  it('savePaymentSchedules method should work fine if isSelectModifyPaymentPlan is true but isSelectCustomForPaymentPlan is false', () => {
    const {
      savePaymentSchedules
    } = actions;
    const paymentSchedules = fromJS([{ dueDate: '2017-12-07', amount: 100 }]);
    const newState = store.getState();
    newState.paymentAction = newState.paymentAction.set('isSelectModifyPaymentPlan', true);
    const newStore = configureStore(middlewares)(newState);
    return newStore.dispatch(savePaymentSchedules(paymentSchedules, 0, false)).then(() => {
      const storeActions = newStore.getActions();
      expect(storeActions.some(action => action.type === optionsActions.PAYMENT_OPTIONS_UPDATE_BY_KEY)).toBeTruthy();
      expect(storeActions.some(action => action.type === optionsActions.PAYMENT_OPTIONS_UPDATE)).toBeTruthy();
    });
  });

  it('savePaymentSchedules method should work fine if isSelectModifyPaymentPlan and isSelectCustomForPaymentPlan is true', () => {
    const {
      savePaymentSchedules
    } = actions;
    const paymentSchedules = fromJS([{ dueDate: '2017-12-07', amount: 100 }]);
    const newState = store.getState();
    newState.paymentAction = newState.paymentAction.set('isSelectModifyPaymentPlan', true);
    const newStore = configureStore(middlewares)(newState);
    newStore.dispatch(savePaymentSchedules(paymentSchedules, 0, true));
    const storeActions = newStore.getActions();
    expect(storeActions.some(action => action.type === optionsActions.PAYMENT_OPTIONS_UPDATE_BY_KEY)).toBeTruthy();
    expect(storeActions.some(action => action.type === optionsActions.PAYMENT_OPTIONS_UPDATE)).toBeTruthy();
  });

  it('changePaymentCard method should work fine if it\'s new option for credit card', () => {
    const { changePaymentCard, PAYMENTPLAN_ADD_CREDITCARD, CHANGE_PAYMENT_CARD } = actions;
    return store.dispatch(changePaymentCard(1, newOptions.NEW_OPTION_VALUE, paymentPlanPaymentTypes.CREDITCARD)).then(() => {
      const storeActions = store.getActions();
      expect(storeActions.some(action => action.type === SHOW_CC_MODAL_ACTION)).toBeTruthy();
      expect(storeActions.some(action => action.type === SHOW_MODAL)).toBeTruthy();
      expect(storeActions.some(action => action.type === PAYMENTPLAN_ADD_CREDITCARD)).toBeTruthy();
      expect(storeActions.some(action => action.type === CHANGE_PAYMENT_CARD)).toBeTruthy();
    });
  });

  it('changePaymentCard method should work fine if it\'s new option for electronic check', () => {
    const { changePaymentCard, PAYMENTPLAN_ADD_ECHECK, CHANGE_PAYMENT_CARD } = actions;
    return store.dispatch(changePaymentCard(1, newOptions.NEW_OPTION_VALUE, paymentPlanPaymentTypes.ELECTRONICCHECK)).then(() => {
      const storeActions = store.getActions();
      expect(storeActions.some(action => action.type === PAYMENTPLAN_ADD_ECHECK)).toBeTruthy();
      expect(storeActions.some(action => action.type === CHANGE_PAYMENT_CARD)).toBeFalsy();
    });
  });

  it('addCreditCardInPaymentPlanAction method should work fine', () => {
    const { addCreditCardInPaymentPlanAction, PAYMENTPLAN_ADD_CREDITCARD } = actions;
    store.dispatch(addCreditCardInPaymentPlanAction(1, true, {}));
    const storeActions = store.getActions();
    expect(storeActions.some(action => action.type === PAYMENTPLAN_ADD_CREDITCARD)).toBeTruthy();
  });

  it('addECheckIntoPaymentPlanAction method should work fine', () => {
    const { addECheckIntoPaymentPlanAction, PAYMENTPLAN_ADD_ECHECK } = actions;
    store.dispatch(addECheckIntoPaymentPlanAction(1, true, {}));
    const storeActions = store.getActions();
    expect(storeActions.some(action => action.type === ECHECK_ADD_NEW_TO_LIST)).toBeTruthy();
    expect(storeActions.some(action => action.type === PAYMENTPLAN_ADD_ECHECK)).toBeTruthy();
  });
});
