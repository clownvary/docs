import configureStore from 'redux-mock-store';
import API from 'shared/api/API';
import middlewares from 'shared/api/middlewares';
import * as actions from 'index/ReservationDetail/actions/permitHolder';
import mockAPI from 'utils/mockAPI';
import _ from 'lodash';
import { fromJS } from 'immutable';

describe('index -> ReservationDetail -> actions -> feeSummary', () => {
  let store;
  let mockStore;

  beforeEach(() => {
    mockStore = configureStore(middlewares);
    store = mockStore({
      initialData: {
        cashCustomerId: 1
      },
      permitHolder: fromJS({
        isPermitHolderBeDropIn: false
      })
    });
  });

  afterEach(() => {
    store.clearActions();
  });

  test('updateHolderInfo', () => {
    const storeActions = store.dispatch(actions.updateHolderInfo({
      companyId: 123
    }));

    expect(storeActions).toEqual({
      type: actions.UPDATE_HOLDER_INFO,
      payload: {
        holderInfo: fromJS({
          isPermitHolderBeDropIn: false,
          companyId: 123
        })
      }
    })
  });

  test('setAllowResetFee', () => {
    expect(actions.setAllowResetFee('1000', true)).toEqual({
      type: actions.SET_ALLOW_RESET_FEE,
      payload: {
        eventIndex: '1000',
        value: true
      }
    })
  })

  test('fetchAgents', () => {
    return store.dispatch(actions.fetchAgents(1)).then(({ payload }) => {
      expect(payload.body.agents.length).toBe(2);
    })
  })

  test('getNewPermitHolder', () => {
    const getCustomer =
      store.dispatch(actions.getNewPermitHolder('customer', 1))
        .then(({ customerId, companyId }) => {
          expect(customerId).toBe(1);
          expect(companyId).toBe(0)
        })

    const getCompanyAndAgent =
      store.dispatch(actions.getNewPermitHolder('company', 1))
        .then(({ customerId, companyId }) => {
          expect(customerId).toBe(32436);
          expect(companyId).toBe(1);
        });

    mockAPI({
      path: '/json/ReservationDetail/fetchAgents.json',
      result: {
        "headers": {
          "response_code": "0000",
          "response_message": "Successful"
        },
        "body": {
          "agents": []
        }
      }
    });

    const getCompanyWithoutAgent =
      store.dispatch(actions.getNewPermitHolder('company', 1))
        .then(({ customerId, companyId }) => {
          expect(customerId).toBe(0);
          expect(companyId).toBe(1);
        });

    return Promise.all([getCustomer, getCompanyAndAgent, getCompanyWithoutAgent])
  });

  test('_changeCustomerOrCompany', () => {
    store = mockStore({
      initialData: {
        batchID: 1,
        receiptID: 1
      },
      permitHolder: fromJS({
        isPermitHolderBeDropIn: false
      })
    })
    const customer =
      store.dispatch(actions._changeCustomerOrCompany({ customerId: 22490 }))
        .then(({ payload }) => {
          expect(payload.body.general_information.customer_name).toBe('Mrs. Test Ss 3')
        })
    const company =
      store.dispatch(actions._changeCustomerOrCompany({ companyId: 1 }))
      .then(({ payload }) => {
        expect(payload.body.general_information.customer_email).toBe('xx_test@test.com')
      })
    return Promise.all([customer, company]);
  })

  test('changeCustomerOrCompany', () => {
    store = mockStore({
      initialData: {
        batchID: 1,
        receiptID: 1
      },
      permitHolder: fromJS({
        isPermitHolderBeDropIn: false
      }),
      main: fromJS({}),
      actionBar: fromJS({})
    })

    const hasValidAgent =
      store.dispatch(actions.changeCustomerOrCompany(1, 1))
        .then(({ payload }) => {
          expect(payload.body.customer_alert_info.customer_id).toBe(34933)
        })

    const noValidAgent =
      store.dispatch(actions.changeCustomerOrCompany(0, 1))
        .then((response) => {
          expect(response).toBeNull()
        })
    return Promise.all([hasValidAgent, noValidAgent]);
  });

  test('setResetFeesConfirmation', () => {
    store = mockStore({
      initialData: {
        companyWording: 'Test'
      }
    });

    store.dispatch(actions.setResetFeesConfirmation(false, false));
    expect(store.getActions().length).toBe(0);

    store.dispatch(actions.setResetFeesConfirmation(true, false));
    expect(store.getActions().length).toBe(0);

    store.dispatch(actions.setResetFeesConfirmation(true, true));
    expect(store.getActions().length).toBe(1);
  });

  test('updatePermitHolder', () => {
    store = mockStore({
      initialData: {
        batchID: 1,
        receiptID: 1
      },
      permitHolder: fromJS({
        customerId: 1,
        companyId: 1
      }),
      main: fromJS({}),
      actionBar: fromJS({})
    });

    expect(
      store.dispatch(
        actions.updatePermitHolder({ customerId: 1, companyId: 1})
      )
    ).toBeNull();

    return store.dispatch(actions.updatePermitHolder({ customerId: 2, companyId: 0 }))
        .then(() => { expect(store.getActions().length).toBe(10); });
  });
});
