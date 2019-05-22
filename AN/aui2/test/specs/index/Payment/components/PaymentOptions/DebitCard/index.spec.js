import React from 'react';
import toJson from 'enzyme-to-json';
import { mount } from 'enzyme';
import { DebitCard } from 'index/Payment/components/PaymentOptions/DebitCard';
import InputNumeric from 'react-base-ui/lib/components/InputNumeric';
import Dropdown from 'react-base-ui/lib/components/Dropdown';
import { confirm } from 'react-base-ui/lib/services/dialog';
import { fieldProps } from 'index/Payment/consts';
import resetActions from 'utils/resetActions';

jest.mock('react-base-ui/lib/services/dialog',()=>{
  return {
    confirm: jest.fn().mockReturnValue(Promise.resolve())
  }
});
jest.mock('index/Payment/components/PaymentOptions/utils/payment', () => ({
  getDefaultAmount: jest.fn().mockReturnValue(300),
  getRemaining: jest.fn((index) => index ? 300 : -100)
}));

describe('index/Payment/components/PaymentOptions/DebitCard', () => {
  const actions = {
    changeRemaining: jest.fn(),
    changeDebitCardAmount: jest.fn(),
    clearOptionAndPaymentErrs: jest.fn(),
    onChange: jest.fn()
  };

  afterEach(() => {
    resetActions(actions);
  });

  const setup = (props) => mount(<DebitCard {...props} />);

  it('DebitCard component should render without error', () => {
    const props = {
      item: {
        list: [
          { value: '173', name: 'DebitCard' },
          { value: '172', name: 'Credit' }
        ],
        disabled: false
      },
      value: '173',
      index: 0,
      optionLen: 3,
      children: (<span>DebitCard info</span>),
      ...actions
    };
    const component = setup(props);
    component.instance().openConfirm();
    expect(toJson(component)).toMatchSnapshot();
  });

  it('DebitCard component in refund workflow should render without error', () => {
    const props = {
      item: {
        list: [
          { value: '173', name: 'DebitCard' },
          { value: '172', name: 'Credit' }
        ],
        disabled: false
      },
      value: '173',
      index: 0,
      optionLen: 1,
      children: (<span>DebitCard info</span>),
      isRefund: true,
      ...actions
    };
    const component = setup(props);
    expect(toJson(component)).toMatchSnapshot();
  });

  it('DebitCard component change payment option should work fine', () => {
    const props = {
      item: {
        list: [
          { value: '173', name: 'DebitCard' },
          { value: '172', name: 'Credit' }
        ],
        disabled: false
      },
      value: '173',
      index: 0,
      optionLen: 3,
      children: (<span>DebitCard info</span>),
      ...actions
    };

    const component = setup(props);
    const instance = component.instance();

    expect(instance.state.alertMessage).toEqual('');
    expect(component.find('.payment-debit-card')).toHaveLength(1);
    expect(component.find('#debitCardAmount')).toHaveLength(1);
    expect(component.find('.payment-new-cart-msg').text()).toEqual('Card information is collected after clicking  Pay.')

    component.find(Dropdown).node.props.onChange({});
    expect(actions.onChange).toBeCalled();
  });

  it('DebitCard component change amount should work fine if do not have remaining', () => {
    const props = {
      item: {
        list: [
          { value: '173', name: 'DebitCard' },
          { value: '172', name: 'Credit' }
        ],
        disabled: false,
        errors: [{ message: 'mock debitcard error', name: '' }]
      },
      value: '173',
      index: 0,
      optionLen: 3,
      children: (<span>DebitCard info</span>),
      ...actions
    };

    const component = setup(props);
    const instance = component.instance();

    const amountInput = component.find(InputNumeric);
    const amountInputHtmlElement = component.find('#debitCardAmount');
    amountInput.node.input.value = 50;
    amountInput.node.props.onValueChange({ value: 50 });
    amountInputHtmlElement.simulate('blur');

    expect(instance.state.alertMessage).toEqual(fieldProps.MAX_AMOUNT_MESSAGE_ON_NOT_REFUND);
    expect(actions.changeDebitCardAmount).not.toHaveBeenCalled();
    expect(actions.changeRemaining).not.toHaveBeenCalled();
    expect(actions.clearOptionAndPaymentErrs).toHaveBeenCalled();

    component.instance().openConfirm().then(()=>{
      expect(actions.changeDebitCardAmount).toHaveBeenCalled();
      expect(actions.changeRemaining).toHaveBeenCalled();
    });
  });

  it('DebitCard component change amount should work fine if have remaining', () => {
    const props = {
      item: {
        list: [
          { value: '173', name: 'DebitCard' },
          { value: '172', name: 'Credit' }
        ],
        disabled: false
      },
      value: '173',
      index: 1,
      optionLen: 3,
      children: (<span>DebitCard info</span>),
      ...actions
    };

    const component = setup(props);
    const instance = component.instance();
    const confirmMock = jest.spyOn(instance,'openConfirm');

    const amountInput = component.find(InputNumeric);
    const amountInputHtmlElement = component.find('#debitCardAmount');
    amountInput.node.input.value = 50;
    amountInput.node.props.onValueChange({ value: 50 });
    amountInput.node.input.value = 50;
    amountInputHtmlElement.simulate('blur');
    component.instance().openConfirm().then(()=>{
      expect(actions.changeDebitCardAmount).toHaveBeenCalled();
      expect(actions.changeRemaining).toHaveBeenCalled();
    });

    component.setProps({ index: 0, isRefund: true });
    amountInputHtmlElement.simulate('blur');
    expect(instance.state.alertMessage).toEqual(fieldProps.MAX_AMOUNT_MESSAGE_ON_REFUND);
  });

});
