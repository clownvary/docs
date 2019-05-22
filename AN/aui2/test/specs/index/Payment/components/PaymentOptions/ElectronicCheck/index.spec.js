import React from 'react';
import toJson from 'enzyme-to-json';
import { mount } from 'enzyme';
import { ElectronicCheck } from 'index/Payment/components/PaymentOptions/ElectronicCheck';
import InputNumeric from 'react-base-ui/lib/components/InputNumeric';
import Dropdown from 'react-base-ui/lib/components/Dropdown';
import { newOptions } from 'index/Payment/consts';
import resetActions from 'utils/resetActions';

jest.mock('index/Payment/components/PaymentOptions/utils/payment', () => ({
  getDefaultAmount: jest.fn().mockReturnValue(300)
}));

describe('index/Payment/components/PaymentOptions/ElectronicCheck', () => {
  const actions = {
    changeRemaining: jest.fn(),
    changeECheckAmount: jest.fn(),
    changeElectronicCheckOpiton: jest.fn(),
    fetchECheckConfig: jest.fn(),
    addError: jest.fn(),
    onChange: jest.fn(),
    clearOptionAndPaymentErrs: jest.fn()
  };

  afterEach(() => {
    resetActions(actions);
  });

  const setup = (props) => mount(<ElectronicCheck {...props} />);

  it('ElectronicCheck component should render without error', () => {
    const props = {
      item: {
        list: [
          { value: '173', name: 'ElectronicCheck' },
          { value: '172', name: 'Credit' }
        ],
        eCheckListDropDownValue: '445',
        disabled: false,
        amount: '500'
      },
      value: '173',
      index: 0,
      optionLen: 3,
      children: (<span>ElectronicCheck info</span>),
      data: {
        eCheckLabel: 'Electronic Check',
        eCheckListDropDown: {
          data: [
            { value: '443', name: 'electronic #2', text: 'electronic #2' },
            { value: '444', name: 'electronic #3', text: 'electronic #3' },
            { value: '445', name: 'electronic #5', text: 'electronic #5' }
          ]
        }
      },
      isRefund: false,
      ...actions
    };

    const component = setup(props);
    expect(toJson(component)).toMatchSnapshot();
  });

  it('ElectronicCheck component change payment option should work fine', () => {
    const props = {
      item: {
        list: [
          { value: '173', name: 'ElectronicCheck' },
          { value: '172', name: 'Credit' }
        ],
        eCheckListDropDownValue: '',
        disabled: false,
        amount: '500'
      },
      value: '173',
      index: 0,
      optionLen: 3,
      children: (<span>ElectronicCheck info</span>),
      data: {
        eCheckLabel: 'Electronic Check',
        eCheckListDropDown: {
          data: [
            { value: newOptions.NEW_OPTION_VALUE, name: 'select electronic check', text: 'select electronic check' }
          ]
        }
      },
      isRefund: false,
      ...actions
    };

    const component = setup(props);
    const instance = component.instance();

    expect(instance.state.amount).toEqual('500');
    expect(instance.state.overrideMsg).toEqual('');
    expect(component.find('.payment-electronic-check')).toHaveLength(1);
    expect(component.find('#paymentAmount')).toHaveLength(1);
    expect(actions.fetchECheckConfig).toHaveBeenCalled();

    component.find(Dropdown).at(0).node.props.onChange({});
    expect(actions.onChange).toBeCalled();

    component.find(Dropdown).at(1).node.props.onChange({});
    expect(actions.changeElectronicCheckOpiton).toBeCalled();
  });

  it('ElectronicCheck component change credit card option and amount should work fine', () => {
    const props = {
      item: {
        list: [
          { value: '173', name: 'ElectronicCheck' },
          { value: '172', name: 'Credit' }
        ],
        eCheckListDropDownValue: '445',
        disabled: false,
        errors: [{ key: 0, name: '' }]
      },
      value: '173',
      index: 0,
      optionLen: 3,
      children: (<span>ElectronicCheck info</span>),
      data: {
        eCheckLabel: 'Electronic Check',
        eCheckListDropDown: {
          data: [
            { value: '443', name: 'electronic #2', text: 'electronic #2' },
            { value: '444', name: 'electronic #3', text: 'electronic #3' },
            { value: '445', name: 'electronic #5', text: 'electronic #5' }
          ]
        }
      },
      ...actions
    };

    const component = setup(props);
    const instance = component.instance();

    const amountInput = component.find(InputNumeric);
    const amountInputHtmlElement = component.find('#paymentAmount');
    amountInput.node.input.value = 0;
    amountInput.node.props.onValueChange({ value: 0 });
    amountInputHtmlElement.simulate('blur');
    expect(actions.addError).not.toHaveBeenCalled();
    expect(actions.changeECheckAmount).toHaveBeenCalledTimes(1);
    expect(actions.changeRemaining).toHaveBeenCalledTimes(1);
    expect(instance.state.amount).toEqual('0.00');

    amountInput.node.input.value = 400;
    amountInput.node.props.onValueChange({ value: 400 });
    amountInputHtmlElement.simulate('blur');
    expect(actions.addError).toHaveBeenCalledTimes(1);
    expect(actions.changeECheckAmount).toHaveBeenCalledTimes(2);
    expect(actions.changeRemaining).toHaveBeenCalledTimes(2);
    expect(instance.state.amount).toEqual(300);

    component.setProps({ isRefund: true });
    amountInput.node.props.onValueChange({ value: 400 });
    amountInputHtmlElement.simulate('blur');
    expect(actions.addError).toHaveBeenCalledTimes(2);
    expect(actions.changeECheckAmount).toHaveBeenCalledTimes(3);
    expect(actions.changeRemaining).toHaveBeenCalledTimes(3);
    expect(instance.state.amount).toEqual(300);
    component.find(Dropdown).at(1).node.props.onChange({});
    expect(actions.clearOptionAndPaymentErrs).toBeCalled();
  });
});
