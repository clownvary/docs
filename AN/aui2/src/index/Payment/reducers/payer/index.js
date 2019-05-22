import { fromJS } from 'immutable';
import reducerHandler from 'shared/utils/reducerHandler';
import normalizeData from 'shared/utils/normalizeData';
import {
  CHANGE_PAYER_TYPE,
  CHANGE_PAYER,
  CHANGE_AGENT,
  UPDATE_CUSTOMERS,
  UPDATE_COMPANY,
  RESET_AGENTS_OF_COMPANY,
  SET_PAYER_PARAMS,
  RESET_PAYER,
  getFinalData
} from '../../actions/payer';
import getPayerParams from '../../utils/getPayerParams';
import {
  PAYER_TYPE,
  CUSTOMER_TYPE_VALUE
} from '../../consts/payerConfig';

function formatCompany(companyList) {
  /* istanbul ignore else */
  if (companyList.length) {
    const company = companyList.map(item => ({
      ...item,
      agents: getFinalData(item.agents)
    }));

    return getFinalData(company);
  }

  return false;
}

function getInitPayerState(initData) {
  const { payer, companyLabel, cashCustomerId } = initData;
  const {
    payer_type: payerType,
    companies,
    customers,
    show_payer_type
  } = payer;
  const customersObj = getFinalData(customers);
  const companyObj = companies && companies.length && formatCompany(companies);
  /* istanbul ignore next */
  const initPayer = {
    payerType: payerType || 1,
    showPayerType: show_payer_type,
    customers: {
      data: customersObj.data,
      selected: customersObj.selected
    },
    company: {
      label: companyLabel,
      data: (companyObj && companyObj.data) || [],
      selected: (companyObj && companyObj.selected) || 0
    },
    cashCustomerId
  };
  const {
    companyId,
    agentId,
    customerId,
    selectedPayerId,
    isCustomerNotCompany
  } = getPayerParams(initPayer);

  initPayer.params = { companyId, agentId, customerId };
  initPayer.isPayerBeDropIn = isCustomerNotCompany && cashCustomerId === +selectedPayerId;
  initPayer.isPermitHolderBeDropIn = !(initData.permitID > 0) && initPayer.isPayerBeDropIn;

  return initPayer;
}

const handlers = {
  [CHANGE_PAYER_TYPE](state, { payload: { value } }) {
    return state.set('payerType', value);
  },

  [CHANGE_PAYER](state, { payload: { value, payerType: pType } }) {
    if (typeof value === 'undefined') {
      return state;
    }

    return state.setIn([PAYER_TYPE[pType], 'selected'], value);
  },

  [CHANGE_AGENT](state, { payload: { selectedCompany, selectedAgent } }) {
    const companyIds = state.getIn(['company', 'data']).map(item => item.get('id'));
    const selectedCompanyIndex = companyIds.indexOf(selectedCompany);
    return state.setIn(['company', 'data', selectedCompanyIndex, 'agents', 'selected'], selectedAgent);
  },

  [UPDATE_CUSTOMERS](state, { payload: { value } }) {
    const selectedId = value.id;
    const formatedValue = normalizeData([value]);
    const formatedCustomers = formatedValue.data[0];
    return state.withMutations((s) => {
      s.setIn(['customers', 'selected'], selectedId);
      s.updateIn(['customers', 'data'], arr => arr.push(fromJS(formatedCustomers)));
    });
  },

  [UPDATE_COMPANY](state, { payload: { value } }) {
    const selectedId = value.id;
    const formatedValue = normalizeData([value]);
    const formatedCompany = formatedValue.data[0];
    formatedCompany.agents = getFinalData([]);

    return state.withMutations((s) => {
      s.setIn(['company', 'selected'], selectedId);
      s.updateIn(['company', 'data'], arr => arr.push(fromJS(formatedCompany)));
    });
  },

  [RESET_AGENTS_OF_COMPANY](state, { payload: { companyId, agents } }) {
    const companyIds = state.getIn(['company', 'data']).map(item => item.get('id'));
    const selectedCompanyIndex = companyIds.indexOf(companyId);
    const agentsObj = getFinalData(agents);
    return state.withMutations((s) => {
      s.setIn(['company', 'data', selectedCompanyIndex, 'agents'], fromJS(agentsObj));
    });
  },

  [SET_PAYER_PARAMS](state, { payload: { params } }) {
    let { company_id: companyId, agent_id: agentId, customer_id: customerId } = params;
    companyId = typeof companyId === 'undefined' ? params.companyId : companyId;
    agentId = typeof agentId === 'undefined' ? params.agentId : agentId;
    customerId = typeof customerId === 'undefined' ? params.customerId : customerId;
    const selectedPayerId = customerId > 0 ? customerId : companyId;
    const cashCustomerId = state.get('cashCustomerId');
    const isCustomerNotCompany = state.get('payerType') === CUSTOMER_TYPE_VALUE;

    return state.withMutations((s) => {
      s.setIn(['params', 'companyId'], companyId);
      s.setIn(['params', 'agentId'], agentId);
      s.setIn(['params', 'customerId'], customerId);
      s.set('isPayerBeDropIn', (isCustomerNotCompany && cashCustomerId === +selectedPayerId));
    });
  },

  [RESET_PAYER](state, { payload: { payer } }) {
    const {
      payerType,
      showPayerType,
      customers,
      company,
      params
    } = payer;

    // Modify workflow don't need consider the dropin customer
    return state.withMutations((s) => {
      s.set('payerType', payerType);
      s.set('showPayerType', showPayerType);
      s.set('customers', fromJS(customers));
      s.set('company', fromJS(company));
      s.set('params', fromJS(params));
    });
  }
};

export default function getPayerReducer(initData) {
  const initPayer = getInitPayerState(initData);
  let initialState = fromJS(initPayer);
  initialState = initialState.set('initPayer', fromJS(initPayer));

  return reducerHandler(initialState, handlers);
}

