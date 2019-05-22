import React from 'react';
import { mount } from 'enzyme';
import { fromJS } from 'immutable';
import configureStore from 'redux-mock-store';
import middlewares from 'shared/api/middlewares';
import { SpecialHandlingIcon } from 'shared/components/SpecialHandling';
import Dropdown from 'react-base-ui/lib/components/Dropdown';
import PermitSearch, { PermitSearch as PermitSearchRaw } from 'index/PermitDetail/components/PermitSearch';
import { mockState } from '../mockState';

jest.mock('shared/components/SpecialHandling/SpecialHandlingIcon', () => 'SpecialHandlingIcon');

const waiver = fromJS({
  showWaiver: true,
  akamaiEnabled: true,
  enableDigitalSignature: true,
  error: false,
  hideChecklistItemsSection: 'false',
  data: [],
  allWaivers: {},
  akamaiDirectory: '/whyy/',
  homeUrl: 'http://localhost:8080/linux01/servlet/',
  receiptID: '2222222',
  batchID: '1111111',
  receiptEntryID: '3333333',
  permitID: '0',
  images: '123/',
  errorMsg: {},
  loading: false
});

const specialHandlingData = fromJS({
  customerId: '1123',
  specialHandling: true,
  shown: false
});

const mockData = {
  agents: {
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
  },
  agentValue: 2,
  customer: {
    customer_id: 0,
    customer_name: ''
  },
  company: {
    company_id: 2,
    company_name: 'ActiveNetwork',
    agent_id: 1,
    agent_name: 'Flynn'
  },
  chooseState: 'company'
};

const setup = (store, initProps) => {
  const component = mount(<PermitSearch store={store} {...initProps} />);
  return {
    component,
    RadioElm: component.find('input[type="radio"]'),
    permitSearchLink: component.find('.permit-search-link')
  };
};

const setupRaw = (props) => {
  const component = mount(<PermitSearchRaw {...props} />);
  const instance = component.instance();
  return {
    component,
    instance
  }
}


describe('index/PermitDetail/components/PermitSearch', () => {
  test('PermitSearch should render without errors', () => {
    const store = configureStore(middlewares)({
      permitSearch: fromJS({
        customer: { customer_id: 1, customer_name: '' },
        company: {
          company_id: 2,
          company_name: 'ActiveNetwork',
          agent_id: 2,
          agent_name: 'Flynn'
        }
      }),
      waiver
    });

    const initProps = {
      permitSearchData: fromJS(mockData),
      prerequisite: fromJS(mockState.prerequisite),
      specialHandlingData
    };
    const { component, RadioElm, permitSearchLink } = setup(store, initProps);

    expect(component.find(SpecialHandlingIcon)).toHaveLength(1);

    expect(component.find('.permit-search-item')).toHaveLength(2);
    RadioElm.at(1).simulate('change');
    expect(component.find('.permit-search-link')).toHaveLength(1);
    permitSearchLink.simulate('click');
    window.__permitSearchCompany();
    const warpDropdown = component.find(Dropdown);
    warpDropdown.node.props.onChange({ value: 1 });
  });

  test('PermitSearch value === agentValue should render without errors', () => {
    const store = configureStore(middlewares)({
      permitSearch: fromJS({
        customer: { customer_id: 1, customer_name: '' },
        company: {
          company_id: 2,
          company_name: 'ActiveNetwork',
          agent_id: 2,
          agent_name: 'Flynn'
        }
      }),
      waiver
    });

    const initProps = {
      permitSearchData: fromJS(mockData),
      prerequisite: fromJS(mockState.prerequisite),
      specialHandlingData
    };
    const { component, RadioElm, permitSearchLink } = setup(store, initProps);

    expect(component.find('.permit-search-item')).toHaveLength(2);
    RadioElm.at(1).simulate('change');
    expect(component.find('.permit-search-link')).toHaveLength(1);
    permitSearchLink.simulate('click');
    window.__permitSearchCompany();
    const warpDropdown = component.find(Dropdown);
    warpDropdown.node.props.onChange({ value: 2 });
  });

  test('PermitSearch select customer should render without errors', () => {
    const store = configureStore(middlewares)({
      permitSearch: fromJS({
        customer: { customer_id: 1, customer_name: '' }
      }),
      waiver
    });
    const mockInitData = Object.assign({}, mockData, { chooseState: 'customer' });
    const initProps = {
      permitSearchData: fromJS(mockInitData),
      prerequisite: fromJS(mockState.prerequisite),
      specialHandlingData
    };

    const { RadioElm, permitSearchLink, component } = setup(store, initProps);
    RadioElm.at(0).simulate('change');
    permitSearchLink.simulate('click');
    window.__permitSearchCustomer();
    expect(permitSearchLink).toHaveLength(1);

    expect(component.find(SpecialHandlingIcon)).toHaveLength(0);
  });

  test('PermitSearch onChooseChange value equal to chooseState should render without errors', () => {
    const store = configureStore(middlewares)({
      permitSearch: fromJS({
        customer: { customer_id: 1, customer_name: 'aaa' }
      }),
      waiver
    });

    const initProps = {
      permitSearchData: fromJS(mockData),
      prerequisite: fromJS(mockState.prerequisite),
      specialHandlingData
    };
    const { component, RadioElm, permitSearchLink } = setup(store, initProps);
    expect(component.find('.permit-search-item')).toHaveLength(2);
    RadioElm.at(0).simulate('change');
    permitSearchLink.simulate('click');
    expect(permitSearchLink).toHaveLength(1);
  });


  test('PermitSearch customer name not null should render without errors', () => {
    const store = configureStore(middlewares)({
      permitSearch: fromJS({
        customer: { customer_id: 1, customer_name: '' }
      }),
      waiver
    });

    const initCustomerData = {
      customer: {
        customer_id: 1,
        customer_name: 'active system'
      },
      chooseState: 'customer'
    };

    const mockInitData = Object.assign({}, mockData, initCustomerData);
    const initProps = {
      permitSearchData: fromJS(mockInitData),
      prerequisite: fromJS(mockState.prerequisite),
      specialHandlingData
    };
    const { component } = setup(store, initProps);

    expect(component.find('.permit-search-item')).toHaveLength(2);
    const warpRadio = component.find('input[type="radio"]');
    warpRadio.at(0).simulate('change');

    const permitSearchLink = component.find('.permit-search-link');
    permitSearchLink.simulate('click');
    expect(permitSearchLink).toHaveLength(1);
  });

  test('handle customer change', () => {
    const initProps = {
      permitSearchData: fromJS(mockData),
      prerequisite: fromJS(mockState.prerequisite),
      specialHandlingData,
      changeCustomer: jest.fn()
    };

    const { instance } = setupRaw(initProps);
    instance._refs.quickResReferenceId.value = 1;
    instance._refs.quickResReference.value = 'test';
    instance.onCustomerChange();
    window.__permitSearchCustomer();

    expect(initProps.changeCustomer).toHaveBeenCalledTimes(1);
  });

  test('handle company change', () => {
    const permitSearchData = fromJS({
      ...mockData,
      company: {},
      agentValue: null
    })

    const initProps = {
      permitSearchData,
      prerequisite: fromJS(mockState.prerequisite),
      specialHandlingData,
      changeCompany: jest.fn()
    };

    const { component, instance } = setupRaw(initProps);
    instance._refs.companyId.value = 1;
    instance._refs.company.value = 'test';
    instance.onCompanyChange();
    window.__permitSearchCompany();
    expect(initProps.changeCompany).toHaveBeenCalledTimes(1);
    expect(component.find(SpecialHandlingIcon)).toHaveLength(0);

    component.setProps({
      permitSearchData:
        permitSearchData.set('company', fromJS(mockData.company))
    })
    expect(component.find('.prt-srch-itm-agent')).toHaveLength(1);

    component.setProps({
      permitSearchData:
        permitSearchData.set('agents', fromJS({ data: [] }))
                        .set('company', fromJS(mockData.company))
    })
    expect(component.find('span.noAgents')).toHaveLength(1);

    component.setProps({ specialHandlingData: specialHandlingData.set('specialHandling', false) });
    expect(component.find(SpecialHandlingIcon)).toHaveLength(0);
  });
});
