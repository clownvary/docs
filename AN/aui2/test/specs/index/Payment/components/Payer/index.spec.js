import React from 'react';
import { mount } from 'enzyme';
import { fromJS } from 'immutable';
import configureStore from 'redux-mock-store';
import Radio from 'react-base-ui/lib/components/Radio';
import Dropdown from 'react-base-ui/lib/components/Dropdown';
import { Payer } from 'index/Payment/components/Payer';

const paymentAction = {
  paymentActionType: 2,
  isSelectModifyPaymentPlan: false,
  isSelectMakeAPayment: false
};

const payment = {
  isRefund: false,
  total: '370.00',
  successPay: false,
  paymentPlanAmount: 0,
  claimDiscountTotal: '10.00',
  depositFee: '15.00',
  ecpAuthDetails: {},
  sourcePageIndex: -1,
  transactionFee: '5.17',
  paymentPlanWording: 'Payment Plan',
  isPaymentActionValid: false,
  errors: [],
  allowModifyPaymentPlan: false,
  makeAPaymentReceipts: {
    permitID: '12'
  },
  payNow: '370.00',
  isAllowChangePayerForModifyPaymentPlan: true,
  resize: 560,
  minimumPayNowAmount: 95.12,
  claimTaxTotal: '12.00',
  permitId: '12',
  isDistributePayment: false,
  paymentPageIndex: -1
};

const payer = {
  payerType: 1,
  showPayerType: true,
  customers: {
    data: [
      {
        id: 1,
        name: 'Flora Xu',
        selected: true,
        text: 'Flora Xu',
        value: 1
      },
      {
        id: 2,
        name: 'Shirly Tian',
        selected: false,
        text: 'Shirly Tian',
        value: 2
      }
    ],
    selected: 1
  },
  company: {
    label: 'OrganizationXXX',
    data: [
      {
        name: '1Alisa With Agent 2,3,4 And So On',
        id: 5,
        text: '1Alisa With Agent 2,3,4 And So On',
        value: 5,
        agents: {
          data: [
            {
              id: 215,
              name: 'Dr. af#@$234 23@#ss @#23sdf',
              selected: false,
              text: 'Dr. af#@$234 23@#ss @#23sdf',
              value: 215
            },
            {
              id: 36,
              name: 'Agent-1 Agent-1',
              selected: false,
              text: 'Agent-1 Agent-1',
              value: 36
            },
            {
              id: 8,
              name: 'Agent-21 Agent-21',
              selected: false,
              text: 'Agent-21 Agent-21',
              value: 8
            },
            {
              id: 9,
              name: 'Agent-22 Agent-22',
              selected: false,
              text: 'Agent-22 Agent-22',
              value: 9
            }
          ],
          selected: 215
        }
      }
    ],
    selected: 5
  },
  params: {
    companyId: 0,
    agentId: 0,
    customerId: 1
  },
  initPayer: {
    payerType: 1,
    showPayerType: true,
    customers: {
      data: [
        {
          id: 1,
          name: 'Flora Xu',
          selected: true,
          text: 'Flora Xu',
          value: 1
        },
        {
          id: 2,
          name: 'Shirly Tian',
          selected: false,
          text: 'Shirly Tian',
          value: 2
        }
      ],
      selected: 1
    },
    company: {
      label: 'OrganizationXXX',
      data: [],
      selected: 0
    },
    params: {
      companyId: 0,
      agentId: 0,
      customerId: 1
    }
  }
};

const actions = {
  changePayerType: jest.fn(),
  changeAgent: jest.fn(),
  changePayer: jest.fn(),
  savePayer: jest.fn().mockReturnValue(Promise.resolve()),
  updateCustomers: jest.fn()
};

const setEvent = value => ({
  target: {
    value
  }
});

const companyOneData = {
  name: '1Alisa With Agent 2,3,4 And So On',
  id: 5,
  text: '1Alisa With Agent 2,3,4 And So On',
  value: 5,
  agents: { data: [] }
};

describe('index/Payment/components/Payer', () => {
  const mockStore = configureStore();
  const store = mockStore({});

  const setup = initProps => mount(<Payer {...initProps} {...actions} />, { context: { store } });

  const resetActions = () => Object.keys(actions).forEach(fn => actions[fn].mockClear());

  afterEach(() => {
    resetActions();
  });

  const props = {
    paymentAction: fromJS(paymentAction),
    payment: fromJS(payment),
    payer: fromJS(payer)
  };

  it('Payer default should render without errors', (done) => {
    const component = setup(props);

    const nextPaymentAction = {
      paymentActionType: 2,
      isSelectModifyPaymentPlan: true,
      isSelectMakeAPayment: true
    };

    const nextProps = {
      ...props,
      paymentAction: fromJS(nextPaymentAction)
    };
    component.setProps(nextProps);

    const wrapRadio = component.find(Radio);
    wrapRadio.at(0).node.props.onChange(setEvent(1));
    wrapRadio.at(1).node.props.onChange(setEvent(2));

    const wrapDropdown = component.find(Dropdown);
    wrapDropdown.at(0).node.props.onChange({ value: 1 });

    component.find('.payment-payer-link').simulate('click');

    expect(component.find('.prt-srch-itm-radio')).toHaveLength(2);
    expect(component.find('.radio').at(0).hasClass('radio--checked')).toBe(true);

    resetActions();
    component.find('input[name="quick_res_reference_id"]').node.value = '3';
    component.find('input[name="quick_res_reference"]').node.value = 'customer#3';
    component.find('.payment-payer-link').simulate('click');
    window.__permitSearchCustomer().then(
      () => {
        expect(actions.savePayer).toHaveBeenCalled();
        expect(actions.updateCustomers).toHaveBeenCalled();
      }
    ).then(() => {
      resetActions();
      component.find('input[name="quick_res_reference_id"]').node.value = '2';
      component.find('input[name="quick_res_reference"]').node.value = 'Shirly Tian';
      component.find('.payment-payer-link').simulate('click');

      return window.__permitSearchCustomer();
    }).then(() => {
      expect(actions.updateCustomers).not.toHaveBeenCalled();
      expect(actions.savePayer).toHaveBeenCalled();
      resetActions();
      component.setProps({ payer: props.payer.setIn(['params', 'customerId'], 0) });
      component.find('input[name="quick_res_reference_id"]').node.value = '3';
      component.find('input[name="quick_res_reference"]').node.value = 'customer#3';
      component.find('.payment-payer-link').simulate('click');
      return window.__permitSearchCustomer();
    }).then(() => {
      expect(actions.updateCustomers).toHaveBeenCalled();
      expect(actions.savePayer).toHaveBeenCalled();
      done()
    })
  });

  it('Payer customers equal to [] and payerType equal to 1 should render without errors', () => {
    const nextPayment = { ...payment, successPay: true };
    const nextPayer = { ...payer, customers: { data: [] } };
    const nextProps = {
      ...props,
      payer: fromJS(nextPayer),
      payment: fromJS(nextPayment)
    };
    const component = setup(nextProps);

    expect(component.find('.payment-payer-link-des')).toHaveLength(0);
    expect(component.find('.payment-payer-link-disabled')).toHaveLength(1);
  });

  it('Payer customers equal to [] and payerType equal to 2 should render without errors', () => {
    const nextPayment = { ...payment, successPay: true };
    const nextPayer = { ...payer, customers: { data: [] }, payerType: 2 };
    const nextProps = {
      ...props,
      payer: fromJS(nextPayer),
      payment: fromJS(nextPayment)
    };
    const component = setup(nextProps);
    component.find('.payment-payer-link').simulate('click');

    const wrapDropdown = component.find(Dropdown);
    wrapDropdown.at(0).node.props.onChange({ value: 1 });

    expect(component.find('.payment-payer-link')).toHaveLength(1);

    const nextPaymentTwo = { ...payment, successPay: false };
    const nextPayerTwo = { ...payer, company: { data: [] }, payerType: 2 };
    const nextPropsTwo = {
      ...props,
      payer: fromJS(nextPayerTwo),
      payment: fromJS(nextPaymentTwo)
    };
    component.setProps(nextPropsTwo);
    component.find('.payment-payer-link').simulate('click');

    expect(component.find('.payment-payer-link')).toHaveLength(1);
    expect(component.find('.payment-payer-link').hasClass('payment-payer-link-disabled')).toBe(false);

    const nextPaymentThree = { ...payment, successPay: false };
    const nextPayerThree = { ...payer, company: { data: [companyOneData], selected: 5 }, payerType: 2 };
    const nextPropsThree = {
      ...props,
      payer: fromJS(nextPayerThree),
      payment: fromJS(nextPaymentThree)
    };
    component.setProps(nextPropsThree);

    expect(component.find('.noAgents')).toHaveLength(1);
  });

  it('Payer limitPayer equal to true and showPayerType equal to false should render without errors', () => {
    const nextPayer = { ...payer, payerType: 1, showPayerType: false };
    const nextProps = { ...props, ...{ payer: fromJS(nextPayer) }, limitPayer: true };
    const component = setup(nextProps);
    expect(component.find('.payment-payer-item')).toHaveLength(1);

    const nextPayerTwo = { ...payer, payerType: 1, showPayerType: false };
    const nextPropsTwo = { ...props, ...{ payer: fromJS(nextPayerTwo) } };
    component.setProps(nextPropsTwo);

    const wrapDropdown = component.find(Dropdown);
    wrapDropdown.at(0).node.props.onChange({ value: 1 });

    const nextPayerThree = { ...payer, payerType: 2, showPayerType: false };
    const nextPropsThree = { ...props, ...{ payer: fromJS(nextPayerThree) } };
    component.setProps(nextPropsThree);
    expect(component.find('.radio')).toHaveLength(0);
  });

  it('Payer limitPayer equal to true and payerType equal to 2 should render without errors', () => {
    const nextPayer = { ...payer, payerType: 2 };
    const nextProps = { ...props, payer: fromJS(nextPayer), limitPayer: true };
    const component = setup(nextProps);
    expect(component.find('.payment-payer-company')).toHaveLength(1);

    const wrapRadio = component.find(Radio);
    wrapRadio.at(0).node.props.onChange(setEvent(1));
    wrapRadio.at(1).node.props.onChange(setEvent(2));

    const wrapDropdown = component.find(Dropdown);
    wrapDropdown.at(0).node.props.onChange({ value: 1 });
    wrapDropdown.at(1).node.props.onChange({ value: 2 });
    wrapDropdown.at(1).node.props.onChange({ value: 215 });

    const nextPayerTwo = { ...payer, payerType: 2, company: { data: [companyOneData] } };
    const nextPropsTwo = { ...props, ...{ payer: fromJS(nextPayerTwo) } };
    component.setProps(nextPropsTwo);
    expect(component.find('.noAgents')).toHaveLength(1);

    const nextPayerThree = { ...payer, payerType: 1 };
    const nextPropsThree = { ...props, payer: fromJS(nextPayerThree) };
    component.setProps(nextPropsThree);
    expect(component.find('.payment-payer-company')).toHaveLength(0);

    window.__permitSearchCompany();
  });
});
