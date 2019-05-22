import { fromJS } from 'immutable';
import getPayerReducer from 'index/Payment/reducers/payer';
import * as actions from 'index/Payment/actions/payer';
import { CUSTOMER_TYPE_VALUE } from 'index/Payment/consts/payerConfig';

jest.mock('index/Payment/store', () => ({
  getState: jest.fn(),
  dispatch: jest.fn()
}));

const reducer = getPayerReducer(__payment__.__initialState__);

describe('index/Payment/reducers/payer', () => {
  it('CHANGE_PAYER_TYPE should work fine', () => {
    const { CHANGE_PAYER_TYPE } = actions;
    const value = CUSTOMER_TYPE_VALUE;
    const state = reducer(fromJS({}), {
      type: CHANGE_PAYER_TYPE,
      payload: { value }
    });
    expect(state.get('payerType')).toEqual(value);
  });

  it('CHANGE_PAYER should work fine', () => {
    const { CHANGE_PAYER } = actions;
    const value = '662';
    const state1 = reducer(fromJS({}), {
      type: CHANGE_PAYER,
      payload: { value, payerType: CUSTOMER_TYPE_VALUE }
    });
    expect(state1.getIn(['customers', 'selected'])).toEqual(value);
    const state2 = reducer(state1, {
      type: CHANGE_PAYER,
      payload: { payerType: CUSTOMER_TYPE_VALUE }
    });
    expect(state2.getIn(['customers', 'selected'])).toEqual(value);
  });

  it('CHANGE_AGENT should work fine', () => {
    const { CHANGE_AGENT } = actions;
    const selectedAgent = '771';
    const selectedCompany = '816';
    const state = reducer(fromJS({
      company: {
        data: [
          { id: '815' }, { id: '816' }, { id: '817' }
        ]
      }
    }), {
      type: CHANGE_AGENT,
      payload: { selectedAgent, selectedCompany }
    });
    expect(state.getIn(['company', 'data', 1, 'agents', 'selected'])).toEqual(selectedAgent);
  });

  it('UPDATE_CUSTOMERS should work fine', () => {
    const { UPDATE_CUSTOMERS } = actions;
    const value = { id: '122', name: 'agent#122' };
    const state = reducer(fromJS({
      customers: { data: [] }
    }), {
      type: UPDATE_CUSTOMERS,
      payload: { value }
    });
    expect(state.getIn(['customers', 'selected'])).toEqual(value.id);
    expect(state.getIn(['customers', 'data'])).toEqual(fromJS([{
      id: '122',
      name: 'agent#122',
      text: 'agent#122',
      value: '122'
    }]));
  });

  it('UPDATE_COMPANY should work fine', () => {
    const { UPDATE_COMPANY } = actions;
    const value = { id: '661', name: 'company#661' };
    const state = reducer(fromJS({
      company: { data: [] }
    }), {
      type: UPDATE_COMPANY,
      payload: { value }
    });
    expect(state.getIn(['company', 'selected'])).toEqual(value.id);
    expect(state.getIn(['company', 'data', 0]).toJS()).toMatchObject({
      id: '661',
      name: 'company#661',
      value: '661',
      text: 'company#661'
    });
  });

  it('RESET_AGENTS_OF_COMPANY should work fine', () => {
    const { RESET_AGENTS_OF_COMPANY } = actions;
    const companyId = '112';
    const agents = [];
    const state = reducer(fromJS({
      company: {
        data: [
          { id: '111' }, { id: '112' }
        ]
      }
    }), {
      type: RESET_AGENTS_OF_COMPANY,
      payload: { companyId, agents }
    });
    expect(state.getIn(['company', 'data', 1, 'agents']).toJS()).toMatchObject({
      data: [], selected: 0
    });
  });

  it('SET_PAYER_PARAMS should work fine', () => {
    const { SET_PAYER_PARAMS } = actions;
    const params = {
      companyId: '442',
      agentId: '712',
      customerId: '820'
    };
    
    const state1 = reducer(
      fromJS({
        payerType: CUSTOMER_TYPE_VALUE
      }),
      {
        type: SET_PAYER_PARAMS,
        payload: { params }
      }
    );
    expect(state1.get('params')).toMatchObject(fromJS(params));
    params.company_id = '444';
    params.agent_id = '718';
    params.customer_id = '0';
    const state2 = reducer(state1, {
      type: SET_PAYER_PARAMS,
      payload: { params }
    });
    expect(state2.get('params')).toMatchObject(fromJS({
      companyId: params.company_id,
      agentId: params.agent_id,
      customerId: params.customer_id
    }));
  });

  it('RESET_PAYER should work fine', () => {
    const { RESET_PAYER } = actions;
    const payer = {
      payerType: CUSTOMER_TYPE_VALUE,
      customers: [],
      company: [],
      params: {
        companyId: '442',
        agentId: '712',
        customerId: '820'
      }
    };
    const state = reducer(fromJS({}), {
      type: RESET_PAYER,
      payload: { payer }
    });
    expect(state.get('payerType')).toEqual(CUSTOMER_TYPE_VALUE);
    expect(state.get('showPayerType')).toBeUndefined();
    expect(state.get('customers')).toEqual(fromJS([]));
    expect(state.get('company')).toEqual(fromJS([]));
    expect(state.get('params')).toEqual(fromJS({
      companyId: '442',
      agentId: '712',
      customerId: '820'
    }));
  });
});
