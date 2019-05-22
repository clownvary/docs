
import { fetchPermitFee } from 'shared/actions/permitFee';
import { fetchNotes } from 'shared/actions/notes';
import {
  fetchWaiver,
  showWaiver,
  saveWaiverErrorMessage
} from 'shared/actions/waiver';
import {
  updateNeedOverrideAction,
  updateOverrideMsgAction,
  updateIsOverrideAction,
  updateUserNameAction,
  updateUserPasswordAction,
  clearPrerequisiteErrsAction,
  updateOverrideAuthorityAction
} from 'shared/actions/prerequisite';
import {
  fetchSpecialHandlingStatus,
  resetSpecialHandling
} from 'shared/actions/specialHandling';
import URL from '../urls';
import {
  permitDetailsChanged
} from './index';
import {
  resetQuestionHeaderErrorsAction,
  fetchQuestionsAsyncAction,
  hideQuestionAction
} from './survey';

import { fetchStageSequences } from './stageSequences';

export const SET_CUSTOMER = 'SET_CUSTOMER';
export const SET_COMPANY = 'SET_COMPANY';
export const SET_COMPANY_AGENT = 'SET_COMPANY_AGENT';
export const SAVE_CUSTOMER_AND_COMPANY = 'SAVE_CUSTOMER_AND_COMPANY';
export const SAVE_CUSTOMER_AND_COMPANY_SUCCESS = 'SAVE_CUSTOMER_AND_COMPANY_SUCCESS';
export const SAVE_CUSTOMER_AND_COMPANY_FAILURE = 'SAVE_CUSTOMER_AND_COMPANY_FAILURE';
export const CHANGE_CHOOSE_STATE = 'CHANGE_CHOOSE_STATE';
export const COMPANY_FETCH_AGENTS = 'COMPANY_FETCH_AGENTS';
export const COMPANY_FETCH_AGENTS_SUCCESS = 'COMPANY_FETCH_AGENTS_SUCCESS';
export const COMPANY_FETCH_AGENTS_FAILURE = 'COMPANY_FETCH_AGENTS_FAILURE';

export function getLocalParams(args = {}) {
  const { batchID, receiptID, receiptEntryID } = window.__permitDetail__.__initialState__;

  return Object.assign({
    company_id: 0,
    customer_id: 0,
    agent_id: 0,
    batch_id: batchID,
    receipt_id: receiptID,
    receipt_entry_id: receiptEntryID
  }, args);
}

export function setCustomerAndCompany(params) {
  return {
    types: [
      SAVE_CUSTOMER_AND_COMPANY,
      SAVE_CUSTOMER_AND_COMPANY_SUCCESS,
      SAVE_CUSTOMER_AND_COMPANY_FAILURE
    ],
    promise: API => API.put(URL.customerandcompany, {
      body: {
        ...params
      }
    })
  };
}

export function saveCustomerAndCompany({ chooseStateChange, ...params }) {
  return (dispatch, getState) => dispatch(setCustomerAndCompany({ ...params }))
    .then(() => {
      // reset prerequisite
      dispatch(updateNeedOverrideAction(false));
      dispatch(updateOverrideAuthorityAction(false));
      dispatch(updateOverrideMsgAction(''));
      dispatch(updateIsOverrideAction(false));
      dispatch(updateUserNameAction(''));
      dispatch(updateUserPasswordAction(''));
      dispatch(clearPrerequisiteErrsAction());
      // clean form errors
      dispatch(resetQuestionHeaderErrorsAction());
      dispatch(saveWaiverErrorMessage({}));

      // after change customer or company need refresh some permit-details
      const promises = [];

      const { batchID, receiptID, receiptEntryID } = getState().initialData;

      promises.push(dispatch(fetchStageSequences(batchID, receiptID, receiptEntryID)));
      // refresh waiver and question
      if (params.customer_id > 0) {
        promises.push(dispatch(fetchQuestionsAsyncAction()));
        promises.push(dispatch(fetchWaiver({ customerId: params.customer_id })));
        promises.push(dispatch(fetchSpecialHandlingStatus(params.customer_id, !chooseStateChange)));
      } else if (params.agent_id > 0) {
        promises.push(dispatch(fetchQuestionsAsyncAction()));
        promises.push(dispatch(fetchWaiver({ agentId: params.agent_id })));
        promises.push(dispatch(fetchSpecialHandlingStatus(params.agent_id, !chooseStateChange)));
      } else {
        dispatch(showWaiver(false));
        dispatch(hideQuestionAction());
        dispatch(resetSpecialHandling());
      }

      // refresh notes
      promises.push(dispatch(fetchNotes()));

      // refresh permit-fee
      promises.push(dispatch(fetchPermitFee()));

      return Promise.all(promises);
    }
  );
}

export function setCustomer(value) {
  return {
    type: SET_CUSTOMER,
    payload: {
      value
    }
  };
}

export function changeCustomer(customer) {
  const params = getLocalParams({ customer_id: customer.customer_id });
  return dispatch => dispatch(saveCustomerAndCompany({ ...params }))
    .then(() => {
      dispatch(permitDetailsChanged());
      return dispatch(setCustomer(customer));
    });
}

export function setCompany(value) {
  return {
    type: SET_COMPANY,
    payload: {
      value
    }
  };
}

export function fetchAgents(params) {
  return {
    types: [COMPANY_FETCH_AGENTS, COMPANY_FETCH_AGENTS_SUCCESS, COMPANY_FETCH_AGENTS_FAILURE],
    promise: API => API.get(URL.companyagents, {
      body: {
        ...params
      }
    })
  };
}

export function changeCompanyAndFetchAgents(params) {
  return (dispatch) => {
    dispatch(setCompany(params));

    return dispatch(fetchAgents({
      company_id: params.company_id,
      selected_agent_id: -1
    }));
  };
}

export function changeCompany(company) {
  const params = getLocalParams({
    company_id: company.company_id
  });

  const args = Object.assign(
    company, {
      agent_id: 0,
      agent_name: ''
    });

  return dispatch => dispatch(saveCustomerAndCompany({ ...params }))
    .then(() => {
      dispatch(permitDetailsChanged());
      return dispatch(changeCompanyAndFetchAgents(args));
    });
}

export function setCompanyAgent(value) {
  return {
    type: SET_COMPANY_AGENT,
    payload: {
      value
    }
  };
}

export function changeCompanyAgent(agentId) {
  return (dispatch, getState) => {
    const state = getState();
    const { company_id } = state.permitSearch.get('company').toJS();

    const params = getLocalParams({
      company_id,
      agent_id: agentId
    });

    return dispatch(saveCustomerAndCompany({
      ...params
    }))
      .then(() => {
        dispatch(permitDetailsChanged());
        return dispatch(setCompanyAgent(agentId));
      });
  };
}

export function setChooseState(value) {
  return {
    type: CHANGE_CHOOSE_STATE,
    payload: {
      value
    }
  };
}

export function changeChooseState(chooseState) {
  return (dispatch, getState) => {
    const state = getState();
    let args = {};

    if (chooseState === 'company') {
      const { company_id, agent_id } = state.permitSearch.get('company').toJS();

      args = {
        company_id,
        agent_id
      };
    } else if (chooseState === 'customer') {
      const { customer_id } = state.permitSearch.get('customer').toJS();

      args = {
        customer_id
      };
    }

    dispatch(permitDetailsChanged());
    dispatch(setChooseState(chooseState));

    const params = getLocalParams(args);
    return dispatch(saveCustomerAndCompany({
      ...params,
      chooseStateChange: true
    }));
  };
}
