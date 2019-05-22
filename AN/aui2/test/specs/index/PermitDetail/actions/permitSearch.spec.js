import { fromJS } from 'immutable';
import find from 'lodash/find';
import configureStore from 'redux-mock-store';
import middlewares from 'shared/api/middlewares';
import convertCasingPropObj from 'shared/utils/convertCasingPropObj';
import eventDetailJson from 'json/ReservationDetail/eventDetail.json'
import * as actions from 'index/PermitDetail/actions/permitSearch';

describe('index -> PermitDetail -> actions -> permitSearch', () => {
  let store = null;

  const params = {
    company_id: 0,
    customer_id: 0,
    agent_id: 0
  };

  const initialData = {
    permitID: '0',
    batchID: '1111111',
    receiptID: '2222222',
    receiptEntryID: '3333333'
  };

  const appendState = {
    pagination: fromJS({
      paginations: fromJS([])
    }),
    permitFee: fromJS({
      facilityFees: []
    }),
    facility: fromJS({
      allFacilities:fromJS ({
        event_2_0: {
         ...convertCasingPropObj(eventDetailJson.body.event_detail)
        }
      })
    })
  };

  beforeEach(() => {
    const mockStore = configureStore(middlewares);
    store = mockStore({
      permitSearch: fromJS({
        customer: {
          customer_id: 11
        },
        company: {
          agent_id: 11
        }
      }),
      waiver: fromJS({
        batchID: 1,
        receiptID: 2,
        permitID: 3
      }),
      initialData,
      ...appendState
    });
  });

  afterEach(() => {
    store.clearActions();
  });

  it('saveCustomerAndCompany should works fine', () => {
    const {
      saveCustomerAndCompany,
      SAVE_CUSTOMER_AND_COMPANY,
      SAVE_CUSTOMER_AND_COMPANY_SUCCESS
    } = actions;

    return store.dispatch(saveCustomerAndCompany(params)).then(() => {
      const storeActions = store.getActions();

      const saveCustomerAndCompanySuccess = find(storeActions, action =>
        action.type === SAVE_CUSTOMER_AND_COMPANY_SUCCESS);
      const saveCustomerAndCompanyResult = saveCustomerAndCompanySuccess.payload.body.result;

      const showWaiver = find(storeActions, action => action.type === 'SHOW_WAIVER');
      const showWaiverResult = showWaiver.payload.isShow;

      const showQuestion = find(storeActions, action => action.type === 'SURVEY_UPDATE_SHOWN');
      const showQuestionResult = showQuestion.payload.shown;

      expect(saveCustomerAndCompanyResult).toEqual('success');
      expect(showWaiverResult).toEqual(false);
      expect(showQuestionResult).toEqual(false);
      expect(storeActions.some(action => action.type === SAVE_CUSTOMER_AND_COMPANY)).toEqual(true);
      expect(storeActions.some(action => action.type === 'SAVE_WAIVER_ERROR_MESSAGE')).toEqual(true);
      expect(storeActions.some(action => action.type === 'SURVEY_UPDATE_ERRORS')).toEqual(true);
      expect(storeActions.some(action => action.type === 'FETCH_NOTES_SUCCESS')).toEqual(true);
      expect(storeActions.some(action => action.type === 'FETCH_PERMIT_FEE_SUCCESS')).toEqual(true);
      expect(storeActions.some(action => action.type === 'FETCH_STAGESEQUENCE_SUCCESS')).toEqual(true);
    });
  });

  it('saveCustomerAndCompany should works fine, if customer_id > 0', () => {
      const {
        saveCustomerAndCompany,
        SAVE_CUSTOMER_AND_COMPANY,
        SAVE_CUSTOMER_AND_COMPANY_SUCCESS
      } = actions;

      const paramsCustomer = Object.assign({}, params, {
        customer_id: 1
      });

      store = configureStore(middlewares)({
        waiver: fromJS({
          batchID: 2,
          receiptID: 3,
          permitID: 4
        }),
        initialData,
        ...appendState
      });

      return store.dispatch(saveCustomerAndCompany(paramsCustomer)).then(() => {
        const storeActions = store.getActions();

        const saveCustomerAndCompanySuccess = find(storeActions, action =>
          action.type === SAVE_CUSTOMER_AND_COMPANY_SUCCESS);
        const saveCustomerAndCompanyResult = saveCustomerAndCompanySuccess.payload.body.result;

        expect(saveCustomerAndCompanyResult).toEqual('success');
        expect(storeActions.some(action => action.type === SAVE_CUSTOMER_AND_COMPANY)).toEqual(true);
        expect(storeActions.some(action => action.type === 'SAVE_WAIVER_ERROR_MESSAGE')).toEqual(true);
        expect(storeActions.some(action => action.type === 'SURVEY_UPDATE_ERRORS')).toEqual(true);
        expect(storeActions.some(action => action.type === 'PERMIT_DETAILS_CHANGED')).toEqual(false);
        setTimeout(() => {
          expect(storeActions.some(action => action.type === 'SURVEY_FETCH_QUESTIONS')).toEqual(true);
        }, 2000);
      });
    }
  );

  it('saveCustomerAndCompany should works fine, if agent_id > 0', () => {
    const {
      saveCustomerAndCompany,
      SAVE_CUSTOMER_AND_COMPANY,
      SAVE_CUSTOMER_AND_COMPANY_SUCCESS
    } = actions;

    const paramsCustomer = Object.assign({}, params, {
      agent_id: 1
    });

    const store = configureStore(middlewares)({
      waiver: fromJS({
        batchID: 2,
        receiptID: 3,
        permitID: 4
      }),
      ...appendState
    });

    store.dispatch(saveCustomerAndCompany(paramsCustomer)).then(() => {
      const storeActions = store.getActions();
      const saveCustomerAndCompanySuccess = find(storeActions, action =>
        action.type === SAVE_CUSTOMER_AND_COMPANY_SUCCESS);
      const saveCustomerAndCompanyResult = saveCustomerAndCompanySuccess.payload.body.result;

      expect(saveCustomerAndCompanyResult).toEqual('success');
      expect(storeActions.some(action => action.type === 'SAVE_CUSTOMER_AND_COMPANY_SUCCESS')).toEqual(true);
      expect(storeActions.some(action => action.type === 'SET_QUESTION_INNER_ERRORS')).toEqual(true);
      expect(storeActions.some(action => action.type === 'SAVE_WAIVER_ERROR_MESSAGE')).toEqual(true);
      expect(storeActions.some(action => action.type === 'SET_QUESTION_ERRORS')).toEqual(true);
      expect(storeActions.some(action => action.type === 'FETCH_WAIVER_SUCCESS')).toEqual(true);
      expect(storeActions.some(action => action.type === 'FETCH_QUESTION_SUCCESS')).toEqual(true);
      expect(storeActions.some(action => action.type === 'PERMIT_DETAILS_CHANGED')).toEqual(true);
      expect(storeActions.some(action => action.type === 'FETCH_QUESTION')).toEqual(true);
      done();
    });
  });

  it('changeCustomer should works fine', () => {
    const { changeCustomer, SET_CUSTOMER } = actions;

    return store.dispatch(changeCustomer(params)).then(() => {
      const storeActions = store.getActions();

      const setCustomer = find(storeActions, action => action.type === SET_CUSTOMER);
      const setCustomerResult = setCustomer.payload.value;

      expect(setCustomerResult).toEqual({
        company_id: 0,
        customer_id: 0,
        agent_id: 0
      });
      expect(storeActions.some(action => action.type === 'PERMIT_DETAILS_CHANGED')).toEqual(true);
    });
  });

  it('changeCompanyAndFetchAgents should works fine', () => {
    const {
      changeCompanyAndFetchAgents,
      SET_COMPANY,
      COMPANY_FETCH_AGENTS
    } = actions;

    return store.dispatch(changeCompanyAndFetchAgents(params)).then(() => {
      const storeActions = store.getActions();

      const setCompany = find(storeActions, action => action.type === SET_COMPANY);
      const setCompanyResult = setCompany.payload.value;

      expect(setCompanyResult).toEqual({
        company_id: 0,
        customer_id: 0,
        agent_id: 0
      });
      expect(storeActions.some(action => action.type === COMPANY_FETCH_AGENTS)).toEqual(true);
    });
  });

  it('changeCompany should works fine', () => {
    const {
      changeCompany,
      SAVE_CUSTOMER_AND_COMPANY,
      SAVE_CUSTOMER_AND_COMPANY_SUCCESS,
      COMPANY_FETCH_AGENTS,
      COMPANY_FETCH_AGENTS_SUCCESS
    } = actions;

    return store.dispatch(changeCompany(params)).then(() => {
      const storeActions = store.getActions();

      const fetchAgents = find(storeActions, action =>
        action.type === COMPANY_FETCH_AGENTS_SUCCESS);
      const fetchAgentsResult = fetchAgents.payload.body;

      expect(fetchAgentsResult).toEqual({
        result: 'success'
      });
      expect(storeActions.some(action => action.type === SAVE_CUSTOMER_AND_COMPANY)).toEqual(true);
      expect(storeActions.some(action =>
        action.type === SAVE_CUSTOMER_AND_COMPANY_SUCCESS)).toEqual(true);
      expect(storeActions.some(action => action.type === 'SURVEY_UPDATE_ERRORS')).toEqual(true);
      expect(storeActions.some(action => action.type === 'SAVE_WAIVER_ERROR_MESSAGE')).toEqual(true);
      expect(storeActions.some(action => action.type === 'SURVEY_UPDATE_SHOWN')).toEqual(true);
      expect(storeActions.some(action => action.type === 'FETCH_NOTES_SUCCESS')).toEqual(true);
      expect(storeActions.some(action => action.type === 'FETCH_PERMIT_FEE_SUCCESS')).toEqual(true);
      expect(storeActions.some(action => action.type === 'PERMIT_DETAILS_CHANGED')).toEqual(true);
      expect(storeActions.some(action => action.type === 'SET_COMPANY')).toEqual(true);
      expect(storeActions.some(action => action.type === COMPANY_FETCH_AGENTS)).toEqual(true);
    });
  });

  it('changeCompanyAgent should works fine', () => {
    const {
      changeCompanyAgent,
      SAVE_CUSTOMER_AND_COMPANY,
      SAVE_CUSTOMER_AND_COMPANY_SUCCESS
    } = actions;

    const mockStore = configureStore(middlewares);
    const getState = {
      permitSearch: fromJS({
        company: Object.assign({}, params)
      }),
      initialData,
      ...appendState
    };

    store = mockStore(getState);
    return store.dispatch(changeCompanyAgent(params.agent_id)).then(() => {
      const storeActions = store.getActions();

      const setCompanyAgent = find(storeActions, action =>
        action.type === 'SET_COMPANY_AGENT');
      const setCompanyAgentResult = setCompanyAgent.payload.value;

      expect(setCompanyAgentResult).toEqual(0);
      expect(storeActions.some(action => action.type === SAVE_CUSTOMER_AND_COMPANY)).toEqual(true);
      expect(storeActions.some(action =>
        action.type === SAVE_CUSTOMER_AND_COMPANY_SUCCESS)).toEqual(true);
      expect(storeActions.some(action => action.type === 'SURVEY_UPDATE_ERRORS')).toEqual(true);
      expect(storeActions.some(action => action.type === 'SAVE_WAIVER_ERROR_MESSAGE')).toEqual(true);
      expect(storeActions.some(action => action.type === 'SHOW_WAIVER')).toEqual(true);
      expect(storeActions.some(action => action.type === 'FETCH_NOTES_SUCCESS')).toEqual(true);
      expect(storeActions.some(action => action.type === 'FETCH_PERMIT_FEE_SUCCESS')).toEqual(true);
      expect(storeActions.some(action => action.type === 'PERMIT_DETAILS_CHANGED')).toEqual(true);
    });
  });

  it('changeChooseState should works fine, if choose company', () => {
    const {
      changeChooseState,
      SAVE_CUSTOMER_AND_COMPANY,
      SAVE_CUSTOMER_AND_COMPANY_SUCCESS
    } = actions;

    const mockStore = configureStore(middlewares);
    const getState = {
      permitSearch: fromJS({
        company: Object.assign({}, params)
      }),
      initialData,
      ...appendState
    };
    const chooseState = 'company';

    store = mockStore(getState);
    return store.dispatch(changeChooseState(chooseState)).then(() => {
      const storeActions = store.getActions();

      const chooseCompany = find(storeActions, action =>
        action.type === 'CHANGE_CHOOSE_STATE');
      const chooseCompanyResult = chooseCompany.payload.value;

      expect(chooseCompanyResult).toEqual(chooseState);
      expect(storeActions.some(action => action.type === 'PERMIT_DETAILS_CHANGED')).toEqual(true);
      expect(storeActions.some(action => action.type === SAVE_CUSTOMER_AND_COMPANY)).toEqual(true);
      expect(storeActions.some(action =>
        action.type === SAVE_CUSTOMER_AND_COMPANY_SUCCESS)).toEqual(true);
      expect(storeActions.some(action => action.type === 'SURVEY_UPDATE_ERRORS')).toEqual(true);
      expect(storeActions.some(action => action.type === 'SAVE_WAIVER_ERROR_MESSAGE')).toEqual(true);
      expect(storeActions.some(action => action.type === 'FETCH_PERMIT_FEE_SUCCESS')).toEqual(true);
    });
  });

  it('changeChooseState should works fine, if choose customer', () => {
    const {
      changeChooseState,
      SAVE_CUSTOMER_AND_COMPANY,
      SAVE_CUSTOMER_AND_COMPANY_SUCCESS
    } = actions;

    const mockStore = configureStore(middlewares);
    const getState = {
      permitSearch: fromJS({
        customer: {
          customer_id: 0,
          customer_name: 'Kaely'
        }
      }),
      initialData,
      ...appendState
    };
    const chooseState = 'customer';

    store = mockStore(getState);
    return store.dispatch(changeChooseState(chooseState)).then(() => {
      const storeActions = store.getActions();

      const chooseCutomer = find(storeActions, action =>
        action.type === 'CHANGE_CHOOSE_STATE');
      const chooseCutomerResult = chooseCutomer.payload.value;

      expect(chooseCutomerResult).toEqual(chooseState);
      expect(storeActions.some(action => action.type === 'PERMIT_DETAILS_CHANGED')).toEqual(true);
      expect(storeActions.some(action => action.type === SAVE_CUSTOMER_AND_COMPANY)).toEqual(true);
      expect(storeActions.some(action =>
        action.type === SAVE_CUSTOMER_AND_COMPANY_SUCCESS)).toEqual(true);
      expect(storeActions.some(action => action.type === 'SURVEY_UPDATE_ERRORS')).toEqual(true);
      expect(storeActions.some(action => action.type === 'SAVE_WAIVER_ERROR_MESSAGE')).toEqual(true);
    });
  });

  it('changeChooseState should works fine, if nother', () => {
    const {
      changeChooseState
    } = actions;

    const chooseState = '';
    return store.dispatch(changeChooseState(chooseState)).then(() => {
      const storeActions = store.getActions();

      const chooseCutomer = find(storeActions, action =>
        action.type === 'CHANGE_CHOOSE_STATE');
      const chooseCutomerResult = chooseCutomer.payload.value;

      expect(chooseCutomerResult).toEqual(chooseState);
    });
  });

  it('getLocalParams should works fine', () => {
    const {
      getLocalParams
    } = actions;

    expect(getLocalParams()).toEqual({
      company_id: 0,
      customer_id: 0,
      agent_id: 0,
      batch_id: '1111111',
      receipt_id: '2222222',
      receipt_entry_id: '3333333'
    });
  });
});
