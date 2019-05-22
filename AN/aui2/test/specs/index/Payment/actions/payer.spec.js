import { fromJS } from 'immutable';
import configureStore from 'redux-mock-store';
import middlewares from 'shared/api/middlewares';
import mockAPI from 'utils/mockAPI';
import * as actions from 'index/Payment/actions/payer';
import { CUSTOMER_TYPE_VALUE, COMPANY_TYPE_VALUE } from 'index/Payment/consts/payerConfig';

describe('index -> payment -> actions -> payer', () => {
  let store = null;
  const mockStore = configureStore(middlewares);
  const initialData = {
    permitID: 12,
    batchID: 0,
    receiptID: 1222,
    paymentPlanInitData: __initialState__.paymentPlanInitData
  };
  const initState = {
    payment: fromJS({
      isPaymentActionValid: true
    }),
    paymentAction: fromJS({
      isSelectMakeAPayment: false,
      isSelectModifyPaymentPlan: true
    }),
    paymentOptions: {
      paymentPlan: fromJS({
        overrideCcExpBeforePpLast: false
      }),
      options: fromJS({
        data: []
      }),
      giftCard: fromJS({
        giftCardId: -1
      })
    },
    initialData
  };

  function getDefaultState(state = {}) {
    return {
      ...initState,
      ...state
    }
  }

  beforeEach(() => {
    store = mockStore(getDefaultState());
  });

  afterEach(() => {
    store.clearActions();
  });

  it('getFinalData should work fine', () => {
    const initData = [
      {
        id: 1,
        name: "Snow Test",
        selected: true
      }, {
        id: 2,
        name: "Shirly Tian",
        selected: false
      }
    ];
    const formatedData = actions.getFinalData(initData);

    expect(formatedData).toEqual({
      data: [
        {
          id: 1,
          name: "Snow Test",
          selected: true,
          text: "Snow Test",
          value: 1
        }, {
          id: 2,
          name: "Shirly Tian",
          selected: false,
          text: "Shirly Tian",
          value: 2
        }
      ],
      selected: 1
    });
    const anotherInitData = [{
      id: 1,
      name: "Snow Test",
      selected: false
    }]
    const anotherFormatedData = actions.getFinalData(anotherInitData)
    expect(anotherFormatedData).toEqual({
      data: [
        {
          id: 1,
          name: "Snow Test",
          selected: false,
          text: "Snow Test",
          value: 1
        }],
      selected: 1
    })
  });

  it('changePayer should work fine', () => {
    const { CHANGE_PAYER, changePayer } = actions;
    const payerType = 2;
    const payerId = 3;
    store.dispatch(changePayer(payerId, payerType));
    const action = store.getActions()[0];
    expect(action.type).toEqual(CHANGE_PAYER);
    expect(action.payload).toEqual({
      value: payerId,
      payerType
    });
  });

  it('changePayerType should work fine', () => {
    const { CHANGE_PAYER_TYPE, changePayerType } = actions;
    store.dispatch(changePayerType(2));
    const action = store.getActions()[0];
    expect(action.type).toEqual(CHANGE_PAYER_TYPE);
    expect(action.payload).toEqual({
      value: 2
    });
  });

  it('changeAgent should work fine', () => {
    const { CHANGE_AGENT, changeAgent } = actions;
    const selectedCompanyId = 2;
    const selectedAgentId = 10;
    store.dispatch(changeAgent(selectedCompanyId, selectedAgentId));
    const action = store.getActions()[0];
    expect(action.type).toEqual(CHANGE_AGENT);
    expect(action.payload).toEqual({
      selectedCompany: selectedCompanyId,
      selectedAgent: selectedAgentId
    });
  });

  it('setPayerParams should work fine', () => {
    const { SET_PAYER_PARAMS, setPayerParams } = actions;
    const params = {
      a: 2
    };
    store.dispatch(setPayerParams(params));
    const action = store.getActions()[0];
    expect(action.type).toEqual(SET_PAYER_PARAMS);
    expect(action.payload).toEqual({
      params
    });
  });

  it('savePayer should work fine when isSelectModifyPaymentPlan is true', (done) => {
    const { savePayer } = actions;
    const params = {};
    const selectedVal = 1;

    store.dispatch(savePayer(params, selectedVal)).then(() => {
      const myActions = store.getActions();
      expect(myActions.length).toBe(13);
      done();
    });
  });

  it('savePayer should work fine when isSelectModifyPaymentPlan is false and selecedVal less or equal than 0', (done) => {
    const { savePayer } = actions;
    const params = {};
    const selectedVal = 0;

    const store = mockStore(getDefaultState({
      paymentAction: initState.paymentAction.set('isSelectModifyPaymentPlan', false)
    }));

    store.dispatch(savePayer(params, selectedVal)).then(() => {
      const myActions = store.getActions();
      expect(myActions.length).toBe(10);
      done();
    });
  });

  it('savePayer should work fine when isSelectModifyPaymentPlan is false and selecedVal great than 0', (done) => {
    const { savePayer } = actions;
    const params = { customer_id: 113 };
    const selectedVal = 1;

    const store = mockStore(getDefaultState({
      paymentAction: initState.paymentAction.set('isSelectModifyPaymentPlan', false),
      payment: initState.payment.set('isPaymentActionValid', false)
    }));

    store.dispatch(savePayer(params, selectedVal)).then(() => {
      const myActions = store.getActions();
      expect(myActions.length).toBe(8);
      done();
    });
  });

  it('savePayer should work fine when isSelectModifyPaymentPlan is false and selecedVal great than 0 but no payment options', (done) => {
    const { savePayer } = actions;
    const params = { customer_id: 113 };
    const selectedVal = 1;

    const store = mockStore(getDefaultState({
      paymentAction: initState.paymentAction.set('isSelectModifyPaymentPlan', false),
      payment: initState.payment.set('isPaymentActionValid', false)
    }));

    mockAPI({
      path: '/json/Payment/paymentOptions.json',
      result: {
        "headers": {
          "response_code": "0000",
        },
        "body": {
          "payment_options": []
        }
      }
    });

    store.dispatch(savePayer(params, selectedVal)).then(() => {
      const myActions = store.getActions();
      expect(myActions.length).toBe(14);
      done();
    });
  });

  it('updateCustomers should work fine', () => {
    const { UPDATE_CUSTOMERS, updateCustomers } = actions;
    const selectedCustomerId = 3;
    store.dispatch(updateCustomers(selectedCustomerId));
    const action = store.getActions()[0];
    expect(action.type).toBe(UPDATE_CUSTOMERS);
    expect(action.payload).toEqual({
      value: selectedCustomerId
    });
  });

  it('fetchAgents should work fine', (done) => {
    const { FETCH_AGENTS_SUCCESS, fetchAgents } = actions;
    const companyId = 1;
    store.dispatch(fetchAgents(companyId)).then(() => {
      const myActions = store.getActions();
      expect(myActions.length).toBeGreaterThanOrEqual(2);
      expect(myActions.some(action => action.type === FETCH_AGENTS_SUCCESS)).toBeTruthy();
      done();
    })
  });

  it('resetAgentsOfCompany should work fine', () => {
    const { RESET_AGENTS_OF_COMPANY, resetAgentsOfCompany } = actions;
    const selectedCompanyId = 3;
    const agents = [{ name: 'agent 1', value: '2' }];
    store.dispatch(resetAgentsOfCompany(selectedCompanyId, agents));
    const action = store.getActions()[0];
    expect(action.type).toBe(RESET_AGENTS_OF_COMPANY);
    expect(action.payload).toEqual({
      companyId: selectedCompanyId,
      agents
    });
  });

  it('resetPayer should work fine', () => {
    const { RESET_PAYER, resetPayer } = actions;
    const payer = {
      companies: [],
      customers: [
        {
          id: 1,
          name: "Snow Test",
          selected: true
        },
        {
          id: 2,
          name: "Shirly Tian",
          selected: false
        }
      ],
      payer_type: 1,
      show_payer_type: true
    }
    store.dispatch(resetPayer(payer));
    const action = store.getActions()[0];
    expect(action.type).toBe(RESET_PAYER);
    expect(action.payload).toEqual({
      payer
    });
  });

  it('fetchAgentsThenUpdateCompany should work fine', () => {
    const {
      fetchAgentsThenUpdateCompany,
      FETCH_AGENTS,
      FETCH_AGENTS_SUCCESS,
      UPDATE_COMPANY,
      RESET_AGENTS_OF_COMPANY
    } = actions;
    return store.dispatch(fetchAgentsThenUpdateCompany({ name: 'name', id: '122' })).then(() => {
      const storeActions = store.getActions();

      expect(storeActions.some(action => action.type === FETCH_AGENTS)).toBeTruthy();
      expect(storeActions.some(action => action.type === FETCH_AGENTS_SUCCESS)).toBeTruthy();
      expect(storeActions.some(action => action.type === UPDATE_COMPANY)).toBeTruthy();
      expect(storeActions.some(action => action.type === RESET_AGENTS_OF_COMPANY)).toBeTruthy();
    });
  });

  it('changeRefundPayer should work fine for customer payer type', () => {
    const {
      changeRefundPayer,
      SET_PAYER_PARAMS,
      SAVE_PAYER
    } = actions;

    store.dispatch(changeRefundPayer('882', CUSTOMER_TYPE_VALUE));
    const storeActions = store.getActions();
    expect(storeActions.some(action => action.type === SET_PAYER_PARAMS)).toBeTruthy();
    expect(storeActions.some(action => action.type === SAVE_PAYER)).toBeTruthy();
  });

  it('changeRefundPayer should work fine for company payer type', () => {
    const {
      changeRefundPayer,
      SET_PAYER_PARAMS,
      SAVE_PAYER
    } = actions;

    const store = mockStore(getDefaultState({
      payer: fromJS({
        company: {
          data: [
            {
              id: '882',
              agents: {
                selected: true
              }
            }
          ]
        }
      })
    }));

    store.dispatch(changeRefundPayer('882', COMPANY_TYPE_VALUE));
    const storeActions = store.getActions();
    expect(storeActions.some(action => action.type === SET_PAYER_PARAMS)).toBeTruthy();
    expect(storeActions.some(action => action.type === SAVE_PAYER)).toBeTruthy();
  });

  it('changeRefundAgent should work fine', () => {
    const {
      changeRefundAgent,
      SET_PAYER_PARAMS,
      SAVE_PAYER,
      SAVE_PAYER_SUCCESS,
      CHANGE_AGENT
    } = actions;

    const store = mockStore(getDefaultState({
      payer: fromJS({
        payerType: 1,
        customers: {
          data: [{}]
        }
      })
    }));

    return store.dispatch(changeRefundAgent('882', '773')).then(() => {
      const storeActions = store.getActions();
      expect(storeActions.some(action => action.type === SET_PAYER_PARAMS)).toBeTruthy();
      expect(storeActions.some(action => action.type === SAVE_PAYER)).toBeTruthy();
      expect(storeActions.some(action => action.type === SAVE_PAYER_SUCCESS)).toBeTruthy();
      expect(storeActions.some(action => action.type === CHANGE_AGENT)).toBeTruthy();
    });
  });

  it('resetPayerThenOtherSections should work fine when pay as customer', () => {
    const {
      resetPayerThenOtherSections,
      RESET_PAYER,
      CHANGE_PAYER,
      SET_PAYER_PARAMS,
      SAVE_PAYER,
      SAVE_PAYER_SUCCESS
    } = actions;

    const store = mockStore(getDefaultState({
      payer: fromJS({
        initPayer: {
          params: {
            customerId: 223,
            companyId: 0,
            agentId: 773
          }
        }
      })
    }));

    return store.dispatch(resetPayerThenOtherSections()).then(() => {
      const storeActions = store.getActions();
      expect(storeActions.some(action => action.type === RESET_PAYER)).toBeTruthy();
      expect(storeActions.some(action => action.type === CHANGE_PAYER)).toBeTruthy();
      expect(storeActions.some(action => action.type === SET_PAYER_PARAMS)).toBeTruthy();
      expect(storeActions.some(action => action.type === SAVE_PAYER)).toBeTruthy();
      expect(storeActions.some(action => action.type === SAVE_PAYER_SUCCESS)).toBeTruthy();
    });
  });

  it('resetPayerThenOtherSections should work fine when pay as company', () => {
    const {
      resetPayerThenOtherSections,
      RESET_PAYER,
      CHANGE_PAYER,
      SET_PAYER_PARAMS,
      SAVE_PAYER,
      SAVE_PAYER_SUCCESS
    } = actions;

    const store = mockStore(getDefaultState({
      payer: fromJS({
        initPayer: {
          params: {
            customerId: 0,
            companyId: 11,
            agentId: 773
          }
        }
      })
    }));

    return store.dispatch(resetPayerThenOtherSections()).then(() => {
      const storeActions = store.getActions();
      expect(storeActions.some(action => action.type === RESET_PAYER)).toBeTruthy();
      expect(storeActions.some(action => action.type === CHANGE_PAYER)).toBeTruthy();
      expect(storeActions.some(action => action.type === SET_PAYER_PARAMS)).toBeTruthy();
      expect(storeActions.some(action => action.type === SAVE_PAYER)).toBeTruthy();
      expect(storeActions.some(action => action.type === SAVE_PAYER_SUCCESS)).toBeTruthy();
    });
  });
  it('createChangePaymentOptionsActionCallback should works fine', () => {
    const { createChangePaymentOptionsActionCallback } = actions;
    const dispatch = jest.fn();
    const payment = fromJS({ total: 100, isRefund: false });
    const payer = fromJS({
      isPayerBeDropIn: true
    });
    const initialData = {
      permitID: 1
    }
    const callbackPay = createChangePaymentOptionsActionCallback(dispatch, payment, payer, initialData);
    callbackPay([]);
    expect(dispatch).toHaveBeenCalledTimes(1);
    dispatch.mockClear();
    callbackPay([ { id: 1, name: 'Cash', selected: false }]);
    expect(dispatch).toHaveBeenCalledTimes(3);


    dispatch.mockClear();
    const callbackRefund = createChangePaymentOptionsActionCallback(
      dispatch,
      fromJS({ total: 100, isRefund: true }),
      fromJS({ isPayerBeDropIn: false }),
      { permitID: -1 }
    );
    callbackRefund([]);
    expect(dispatch).toHaveBeenCalledTimes(1);
    dispatch.mockClear();
    callbackRefund([ { id: 1, name: 'Cash', selected: false }]);
    expect(dispatch).toHaveBeenCalledTimes(5);
  })
});
