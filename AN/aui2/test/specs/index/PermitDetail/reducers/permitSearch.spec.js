import getPermitSearchReducer from 'index/PermitDetail/reducers/permitSearch';

const reducer = getPermitSearchReducer(__permitDetail__.__initialState__);

describe('index/PermitDetail/reducers/permitSearch', () => {
  it('handle SET_CUSTOMER correctly', () => {
    const customer = {
      customer_id: 1,
      customer_name: 'Test Customer'
    };

    const state = reducer(undefined, {
      type: 'SET_CUSTOMER',
      payload: { value: customer }
    });

    expect(state.get('customer').toJS()).toEqual(customer);
  });

  it('handle SET_COMPANY correctly', () => {
    const company = {
      company_id: 2,
      company_name: 'ActiveNet!',
    };

    const state = reducer(undefined, {
      type: 'SET_COMPANY',
      payload: { value: company }
    });

    expect(state.get('company').toJS()).toEqual({
      ...company,
      agent_id: 0
    });
  });

  it('handle SET_COMPANY_AGENT correctly', () => {
    const agents = {
      data: [
        {
          id: 1,
          name: 'Flynn 1',
          selected: false,
          text: 'Flynn 1',
          value: 1
        },
        {
          id: 2,
          name: 'Flynn 2',
          selected: true,
          text: 'Flynn 2',
          value: 2
        }
      ],
      selected: [
        2
      ]
    }

    let state = reducer(undefined, {
      type: 'NOT_EXISTS'
    })

    expect(state.get('agentValue')).toEqual(2);
    expect(state.get('agents').toJS()).toEqual(agents);

    const newAgentId = 1

    state = reducer(undefined, {
      type: 'SET_COMPANY_AGENT',
      payload: { value: newAgentId }
    })

    expect(state.get('agentValue')).toEqual(newAgentId);

    let newAgents = state.get('agents').toJS();
    const selectedAgent = newAgents.data.filter(a => a.selected)[0];
    expect(selectedAgent.value).toEqual(newAgentId);
    expect(newAgents.selected).toEqual([newAgentId]);
    expect(state.get('company').toJS().agent_id).toEqual(newAgentId);

    state = reducer(undefined, {
      type: 'SET_COMPANY_AGENT',
      payload: { value: null }
    })
    newAgents = state.get('agents').toJS();
    expect(newAgents.selected.length).toBe(0);
    expect(state.get('company').toJS().agent_id).toEqual(0);
  });

  it('handle CHANGE_CHOOSE_STATE correctly', () => {
    let state = reducer(undefined, {
      type: 'CHANGE_CHOOSE_STATE',
      payload: {
        value: 'customer'
      }
    });

    expect(state.get('chooseState')).toEqual('customer');

    state = reducer(undefined, {
      type: 'CHANGE_CHOOSE_STATE',
      payload: {
        value: 'company'
      }
    });

    expect(state.get('chooseState')).toEqual('company');
  });

  it('handle COMPANY_FETCH_AGENTS_SUCCESS correctly', () => {
    const state = reducer(undefined, {
      type: 'COMPANY_FETCH_AGENTS_SUCCESS',
      payload: { body: { } }
    })

    const agents = state.get('agents').toJS();
    expect(agents.data).toEqual([]);
    expect(agents.selected).toEqual([]);
    expect(state.get('company').toJS().agent_id).toBe(0);
    expect(state.get('agentValue')).toBe(null);
  })
});
