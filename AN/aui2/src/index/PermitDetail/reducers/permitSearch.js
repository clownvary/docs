import { fromJS } from 'immutable';
import reducerHandler from 'shared/utils/reducerHandler';
import normalizeData from 'shared/utils/normalizeData';

import {
  SET_CUSTOMER,
  SET_COMPANY,
  SET_COMPANY_AGENT,
  CHANGE_CHOOSE_STATE,
  COMPANY_FETCH_AGENTS_SUCCESS
} from '../actions/permitSearch';

export const SEARCHKINDS = {
  CUSTOMER: 'customer',
  COMPANY: 'company'
};

function getCustomer({ customer_id, customer_name }) {
  return { customer_id, customer_name };
}

function getCompany({ company_id, company_name, agent_id, agent_name }) {
  return { company_id, company_name, agent_id, agent_name };
}

function getInitChooseState(customerAndCompany) {
  /* istanbul ignore next */
  return !customerAndCompany || !customerAndCompany.company_id || !customerAndCompany.company_name ?
    SEARCHKINDS.CUSTOMER :
    SEARCHKINDS.COMPANY;
}

const getInitialState = (initData) => {
  const { customerAndCompany, agents: agentsGlobal } = initData;
  const customer = getCustomer(customerAndCompany);
  const company = getCompany(customerAndCompany);

  /**
   * [agents] - Agents Dropdown list data.(UI)
   * [agentValue] - Agents Dropdown value.(UI)
   * [customer] - Customer object separated from [customerAndCompany].(UI)
   * [company] - Company object separated from [customerAndCompany].(UI)
   * [customerAndCompany] - Real data entity of customer and company.(For save)
   * [chooseState] - State for switching to customer or company.(UI)
   */
  const agentObj = normalizeData(agentsGlobal);
  /* istanbul ignore next */
  return fromJS({
    agents: agentObj,
    agentValue: (typeof agentObj.selected[0] === 'undefined') ? null : agentObj.selected[0],
    customer,
    company,
    chooseState: getInitChooseState(customerAndCompany)
  });
};

const handlers = {

  [SET_CUSTOMER](state, { payload: { value } }) {
    return state.withMutations((s) => {
      s.set('customer', fromJS(value));
    });
  },

  [SET_COMPANY](state, { payload: { value } }) {
    return state.withMutations((s) => {
      s.set('company', fromJS(value));
      s.set('agentValue', null);
      s.set('company', fromJS(
        Object.assign(s.get('company').toJS(), {
          agent_id: 0
        })
      ));
    });
  },

  [SET_COMPANY_AGENT](state, { payload: { value } }) {
    return state.withMutations((s) => {
      let agents = s.get('agents').toJS().data;
      agents = agents.map((item) => {
        const agent = item;
        if (agent.value === value) {
          agent.selected = true;
        } else {
          agent.selected = false;
        }
        return agent;
      });
      s.set('agentValue', value);
      s.set('agents', fromJS(normalizeData(agents)));
      s.set('company', fromJS(
        Object.assign(s.get('company').toJS(), {
          agent_id: value || 0
        })
      ));
    });
  },

  [CHANGE_CHOOSE_STATE](state, { payload: { value } }) {
    return state.withMutations((s) => {
      s.set('chooseState', value);
    });
  },

  [COMPANY_FETCH_AGENTS_SUCCESS](state, { payload: { body: { agents = [] } } }) {
    return state.withMutations((s) => {
      s.set('agentValue', null);
      s.set('agents', fromJS(normalizeData(agents)));
      s.mergeIn(['company'], {
        agent_id: 0,
        agent_name: null
      });
    });
  }
};

export default function getPermitSearchReducer(initData) {
  return reducerHandler(getInitialState(initData), handlers);
}

