import React from 'react';
import toJson from 'enzyme-to-json';
import { mount } from 'enzyme';
import { Credit } from 'index/Payment/components/PaymentOptions/Credit';
import InputNumeric from 'react-base-ui/lib/components/InputNumeric';
import Dropdown from 'react-base-ui/lib/components/Dropdown';
import resetActions from 'utils/resetActions';

jest.mock('index/Payment/components/PaymentOptions/utils/payment', () => ({
  getDefaultAmount: jest.fn().mockReturnValue(200),
  getRemaining: jest.fn((index, amount) => amount <= 300 ? -50 : {
    remaining: `$${amount}`
  })
}));

describe('index/Payment/components/PaymentOptions/Credit', () => {
  const actions = {
    changeCreditAmount: jest.fn(),
    changeRemaining: jest.fn(),
    getCreditAccount: jest.fn(),
    changeCreditResetStatus: jest.fn(),
    clearOptionAndPaymentErrs: jest.fn(),
    onChange: jest.fn()
  };

  afterEach(() => {
    resetActions(actions);
  });

  const setup = (props) => mount(<Credit {...props} />);

  it('Credit component should render without error', () => {
    const props = {
      item: {
        list: [
          { value: '172', name: 'CreditCard' },
          { value: '173', name: 'Credit' }
        ],
      },
      value: '173',
      index: 0,
      optionLen: 3,
      children: (<span>Credit info</span>),
      paymentOptions: {
        credit: {
          creditAvailable: 500,
          creditInitDateShouldReset: false,
          creditOverdue: 2
        },
        options: {
          deleteAPayment: true
        }
      },
      ...actions
    };
    const component = setup(props);
    expect(toJson(component)).toMatchSnapshot();
  });

  it('Credit component set default value should work fine', () => {
    const props = {
      item: {
        list: [
          { value: '172', name: 'CreditCard' },
          { value: '173', name: 'Credit' }
        ],
        amount: 0,
        formatCreditAmount: 500
      },
      value: '173',
      index: 0,
      optionLen: 3,
      children: (<span>Credit info</span>),
      paymentOptions: {
        credit: {
          creditAvailable: 500,
          creditOverdue: 0,
          creditInitDateShouldReset: false
        },
        options: {
          deleteAPayment: false
        }
      },
      ...actions
    };

    let component = setup(props);
    expect(component).toHaveLength(1);
    expect(actions.changeCreditAmount).toHaveBeenCalled();
    expect(actions.changeRemaining).toHaveBeenCalled();

    expect(component.find('.payment-credit-label')).toHaveLength(1);
    expect(component.find('.payment-credit-label').text()).toEqual('Available $500');

    resetActions(actions);
    props.paymentOptions.credit.creditInitDateShouldReset = true;
    component = setup(props);
    expect(component).toHaveLength(1);
    expect(actions.getCreditAccount).toHaveBeenCalled();
    expect(actions.changeCreditResetStatus).toHaveBeenCalled();

    resetActions(actions);
    component.instance().setDefaultValue({ available: 600, overdue: 300 }, 400);
    expect(actions.changeCreditAmount).toHaveBeenCalled();
    expect(actions.changeRemaining).toHaveBeenCalled();

    resetActions(actions);
    component.instance().setDefaultValue({ available: 600, overdue: 600 }, 200);
    expect(actions.changeCreditAmount).not.toHaveBeenCalled();
    expect(actions.changeRemaining).not.toHaveBeenCalled();

    resetActions(actions);
    component.instance().setDefaultValue({ available: 600, overdue: 200 }, 400);
    expect(actions.changeCreditAmount).toHaveBeenCalled();
    expect(actions.changeRemaining).toHaveBeenCalled();

    resetActions(actions);
    component.instance().setDefaultValue({ available: NaN, overdue: NaN }, 400);
    expect(actions.changeCreditAmount).toHaveBeenCalled();
    expect(actions.changeRemaining).toHaveBeenCalled();
  });

  it('Credit component change payment option should work fine', () => {
    const props = {
      item: {
        list: [
          { value: '172', name: 'CreditCard' },
          { value: '173', name: 'Credit' }
        ],
        amount: 0
      },
      value: '173',
      index: 0,
      optionLen: 3,
      children: (<span>Credit info</span>),
      paymentOptions: {
        credit: {
          creditAvailable: 100,
          creditOverdue: 180,
          creditInitDateShouldReset: false
        },
        options: {
          deleteAPayment: false
        }
      },
      ...actions
    };

    const component = setup(props);

    expect(component.find('.payment-credit')).toHaveLength(1);
    expect(component.find('.payment-credit-label')).toHaveLength(2);
    expect(component.find('.payment-credit-label').at(0).text()).toEqual('Available $100');
    expect(component.find('.payment-credit-label').at(1).text()).toEqual('Overdue $180');

    const paymentOptionDropdown = component.find(Dropdown);
    expect(paymentOptionDropdown).toHaveLength(1);
    paymentOptionDropdown.node.props.onChange({});
    expect(actions.onChange).toBeCalled();
  });

  it('Credit component change payment amount should work fine if it\'s isAmountMoreThanNetCredit', () => {
    const props = {
      item: {
        list: [
          { value: '172', name: 'CreditCard' },
          { value: '173', name: 'Credit' }
        ],
        amount: 500,
        formatCreditAmount: 500,
        errors: [{ message: 'mock credit error', name: '' }]
      },
      value: '173',
      index: 0,
      optionLen: 3,
      children: (<span>Credit info</span>),
      paymentOptions: {
        credit: {
          creditAvailable: 500,
          creditOverdue: 600,
          creditInitDateShouldReset: false
        },
        options: {
          deleteAPayment: true
        }
      },
      ...actions
    };

    const component = setup(props);
    const instance = component.instance();
    expect(instance.state).toEqual({ alertMessage: '' });

    const amountInput = component.find(InputNumeric).at(0);
    const amountInputHtmlElement = component.find('.aaui-flexbox').at(2).find('input');

    amountInput.node.input.value = 1300.00;
    amountInputHtmlElement.simulate('blur');
    expect(instance.state.alertMessage).toEqual('This customer has an overdue balance of $600. The net credit is $0.');
    expect(actions.clearOptionAndPaymentErrs).toHaveBeenCalled();

    component.instance().openConfirm().then(()=>{
      expect(actions.changeCreditAmount).toHaveBeenCalled();
      expect(actions.changeRemaining).toHaveBeenCalled();
    });
  });

  it('Credit component change payment amount should work fine if it\'s not isAmountMoreThanAvailable', () => {
    const props = {
      item: {
        list: [
          { value: '172', name: 'CreditCard' },
          { value: '173', name: 'Credit' }
        ],
        amount: 500,
        formatCreditAmount: 500
      },
      value: '173',
      index: 0,
      optionLen: 3,
      children: (<span>Credit info</span>),
      paymentOptions: {
        credit: {
          creditAvailable: 150,
          creditOverdue: 100,
          creditInitDateShouldReset: false
        },
        options: {
          deleteAPayment: true
        }
      },
      ...actions
    };

    const component = setup(props);
    const instance = component.instance();

    const amountInput = component.find(InputNumeric).at(0);
    const amountInputHtmlElement = component.find('.aaui-flexbox').at(2).find('input');

    amountInput.node.input.value = 100;
    amountInputHtmlElement.simulate('blur');
    expect(instance.state.alertMessage).toEqual('This customer has an overdue balance of $100. The net credit is $50.');

    amountInput.node.input.value = 150;
    amountInputHtmlElement.simulate('blur');
    expect(instance.state.alertMessage).toEqual('This customer has an overdue balance of $100. The net credit is $50.');

    amountInput.node.input.value = 200;
    amountInputHtmlElement.simulate('blur');
    expect(instance.state.alertMessage).toEqual('The credit available is $150.00');

    component.instance().openConfirm().then(()=>{
      expect(actions.changeCreditAmount).toHaveBeenCalled();
      expect(actions.changeRemaining).toHaveBeenCalled();
    });
  });

  it('Credit component change payment amount should work fine if it\'s not isAmountMoreThanNetCredit', () => {
    const props = {
      item: {
        list: [
          { value: '172', name: 'CreditCard' },
          { value: '173', name: 'Credit' }
        ],
        amount: 500,
        formatCreditAmount: 500
      },
      value: '173',
      index: 0,
      optionLen: 3,
      children: (<span>Credit info</span>),
      paymentOptions: {
        credit: {
          creditAvailable: 500,
          creditOverdue: 1,
          creditInitDateShouldReset: false
        },
        options: {
          deleteAPayment: true
        }
      },
      ...actions
    };

    const component = setup(props);
    const instance = component.instance();


    const amountInput = component.find(InputNumeric).at(0);
    const amountInputHtmlElement = component.find('.aaui-flexbox').at(2).find('input');

    amountInput.node.input.value = 150;
    amountInputHtmlElement.simulate('blur');
    expect(instance.state.alertMessage).toEqual('');

    component.instance().openConfirm().then(()=>{
      expect(actions.changeCreditAmount).toHaveBeenCalled();
      expect(actions.changeRemaining).toHaveBeenCalled();
    });

  });
});
