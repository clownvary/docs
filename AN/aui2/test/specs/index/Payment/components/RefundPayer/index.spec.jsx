import React from 'react';
import { mount } from 'enzyme';
import { fromJS } from 'immutable';
import configureStore from 'redux-mock-store';
import middlewares from 'shared/api/middlewares';
import { RefundPayer } from 'index/Payment/components/RefundPayer';
import { CUSTOMER_TYPE_VALUE, COMPANY_TYPE_VALUE } from 'index/Payment/consts/payerConfig';

jest.mock('index/Payment/store', () => ({
  getState: jest.fn(),
  dispatch: jest.fn()
}));

describe('index/Payment/components/RefundPayer', () => {

  const actions = {
    fetchAndResetRefundOptionAction: jest.fn(),
    changeRefundPayer: jest.fn(),
    changeRefundAgent: jest.fn()
  };

  const getProps = (payerType = CUSTOMER_TYPE_VALUE) => ({
    payer: fromJS({
      payerType,
      customers: {
        data: [
          {
            id: '771',
            name: 'customer1'
          },
          {
            id: '773',
            name: 'customer3'
          }
        ],
        selected: ''
      },
      company: {
        data: [
          {
            id: '322',
            name: 'company2'
          },
          {
            id: '326',
            name: 'company6'
          }
        ],
        selected: '326'
      }
    }),
    payment: fromJS({
      successPay: false
    }),
    paymentMethodSize: 1,
    ...actions
  });

  const mockStore = (props) => configureStore(middlewares)(props);

  const setup = (props) => mount(<RefundPayer store={mockStore(props)} {...props} />);

  afterEach(() => {
    actions.fetchAndResetRefundOptionAction.mockReset();
    actions.changeRefundPayer.mockReset();
    actions.changeRefundAgent.mockReset();
  });

  it('component should work fine in customer type', (done) => {
    const component = setup(getProps());

    expect(actions.fetchAndResetRefundOptionAction).toHaveBeenCalled();

    expect(component.find('h2').text()).toEqual('Refund To');
    expect(component.find('div.payment-payer-custom-list')).toHaveLength(1);
    expect(component.find('div.prt-srch-itm-agent')).toHaveLength(0);

    component.find('.aaui-dropdown__menu').at(0).find('li').at(1).simulate('click');
    Promise.resolve().then(
      () => {
        expect(actions.changeRefundPayer).toHaveBeenCalled();
        done();
      }
    )
  });

  it('component should work fine in company type', () => {
    const component = setup(getProps(COMPANY_TYPE_VALUE));

    expect(actions.fetchAndResetRefundOptionAction).toHaveBeenCalled();

    expect(component.find('h2').text()).toEqual('Refund To');
    expect(component.find('div.payment-payer-custom-list')).toHaveLength(1);
    expect(component.find('div.prt-srch-itm-agent')).toHaveLength(1);
    expect(component.find('span.noAgents')).toHaveLength(1);

    component.find('.aaui-dropdown__menu').at(0).find('li').at(3).simulate('click');
    expect(actions.changeRefundPayer).not.toHaveBeenCalled();
  });

  it('component should work fine in company type but no selected company', () => {
    const props = getProps(COMPANY_TYPE_VALUE);
    props.payer = props.payer.setIn(['company', 'selected'], undefined);
    const component = setup(props);

    expect(actions.fetchAndResetRefundOptionAction).toHaveBeenCalled();

    expect(component.find('h2').text()).toEqual('Refund To');
    expect(component.find('div.payment-payer-custom-list')).toHaveLength(1);
    expect(component.find('div.prt-srch-itm-agent')).toHaveLength(1);
    expect(component.find('span.noAgents')).toHaveLength(1);
  });

  it('component should work fine in company type with agents', (done) => {
    const props = getProps(COMPANY_TYPE_VALUE);
    props.payer = props.payer.setIn(['company', 'data', 1, 'agents'], {
      data: [
        {
          id: '661',
          name: 'agent1',
          value: '661'
        },
        {
          id: '666',
          name: 'agent6',
          value: '666'
        }
      ],
      selected: '666'
    });

    const component = setup(props);

    expect(actions.fetchAndResetRefundOptionAction).toHaveBeenCalled();

    expect(component.find('h2').text()).toEqual('Refund To');
    expect(component.find('div.payment-payer-custom-list')).toHaveLength(1);
    expect(component.find('div.prt-srch-itm-agent')).toHaveLength(1);
    expect(component.find('span.noAgents')).toHaveLength(0);
    expect(component.find('.refund-payer-agents-list')).toHaveLength(1);

    const agentDropdown = component.find('.aaui-dropdown__menu').at(1);
    agentDropdown.find('li').at(1).simulate('click');
    expect(actions.changeRefundAgent).not.toHaveBeenCalled();
    agentDropdown.find('li').at(0).simulate('click');
    Promise.resolve().then(() => {
      expect(actions.changeRefundAgent).toHaveBeenCalled();
      done();
    })
  });
});
