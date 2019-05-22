import React from 'react';
import toJson from 'enzyme-to-json';
import { mount } from 'enzyme';
import { Check } from 'index/Payment/components/PaymentOptions/Check';
import InputNumeric from 'react-base-ui/lib/components/InputNumeric';
import Dropdown from 'react-base-ui/lib/components/Dropdown';
import { confirm } from 'react-base-ui/lib/services/dialog';
import resetActions from 'utils/resetActions';

jest.mock('index/Payment/components/PaymentOptions/utils/payment', () => ({
  getDefaultAmount: jest.fn(() => (300)),
  getRemaining: jest.fn((index, amount) => amount <= 300 ? -50 : {
    remaining: `$${amount}`
  })
}));
jest.mock('react-base-ui/lib/services/dialog',()=>({
  confirm:jest.fn().mockReturnValue(Promise.resolve(true))
}));

describe('index/Payment/components/PaymentOptions/Check', () => {
  const actions = {
    changeCheckAmount: jest.fn(),
    changeRemaining: jest.fn(),
    updateCheckNumber: jest.fn(),
    clearOptionAndPaymentErrs: jest.fn(),
    onChange: jest.fn()
  };

  const setup = (props) => mount(<Check {...props} />);

  afterEach(() => {
    resetActions(actions);
  });

  it('Check component should render without error', () => {
    const props = {
      item: {
        list: [
          { value: '172', name: 'Credit' },
          { value: '173', name: 'Check' }
        ],
        amount: 0,
        formatCheckAmount: 300,
        errors: [
          {
            key: 0,
            name: 'checkNumber'
          }
        ]
      },
      value: '173',
      index: 0,
      optionLen: 3,
      children: (<span>Check info</span>),
      isRefund: false,
      ...actions
    };
    const component = setup(props);
    expect(toJson(component)).toMatchSnapshot();
  });

  it('Check component in refund workflow should render without error', () => {
    const props = {
      item: {
        list: [
          { value: '172', name: 'Credit' },
          { value: '173', name: 'Check' }
        ],
        amount: 200,
        formatCheckAmount: 200,
        checkNumber: '623'
      },
      value: '173',
      index: 0,
      optionLen: 3,
      children: (<span>Check info</span>),
      isRefund: true,
      ...actions
    };

    const component = setup(props);
    component.instance().openConfirm();
    expect(toJson(component)).toMatchSnapshot();
  });

  it('Check component change payment option and amount should work fine', () => {
    const props = {
      item: {
        list: [
          { value: '172', name: 'Credit' },
          { value: '173', name: 'Check' }
        ],
        amount: 200,
        formatCheckAmount: 300,
        checkNumber: ''
      },
      value: '173',
      index: 0,
      optionLen: 3,
      children: (<span>Check info</span>),
      isRefund: false,
      ...actions
    };

    const component = setup(props);

    expect(component.find('.payment-check')).toHaveLength(1);
    expect(component.find('.payment-check-number')).toHaveLength(1);
    expect(component.find('#checkAmount')).toHaveLength(1);

    const paymentOptionDropdown = component.find(Dropdown);
    expect(paymentOptionDropdown).toHaveLength(1)
    paymentOptionDropdown.node.props.onChange({});
    expect(actions.onChange).toBeCalled();

    const checkNumInput = component.find('.payment-check-number').find('input');
    checkNumInput.simulate('blur');
    expect(actions.updateCheckNumber).toHaveBeenCalled();
    expect(checkNumInput.prop('placeholder')).toEqual(`Enter ${props.item.list[1].name} number`);

    const amountInput = component.find(InputNumeric);
    const amountInputHtmlElement = component.find('#checkAmount');
    amountInputHtmlElement.simulate('blur');
    expect(actions.changeCheckAmount).not.toHaveBeenCalled();
    expect(actions.changeRemaining).not.toHaveBeenCalled();

    component.instance().openConfirm().then(()=>{
      expect(actions.changeCheckAmount).toHaveBeenCalledTimes(1);
      expect(actions.changeRemaining).toHaveBeenCalledTimes(1);
    });

    amountInput.node.input.value = 400;
    amountInputHtmlElement.simulate('blur');
    component.instance().openConfirm().then(()=>{
      expect(actions.changeCheckAmount).toHaveBeenCalledTimes(2);
      expect(actions.changeRemaining).toHaveBeenCalledTimes(2);
    });
  });

  it('Check component refund process should work fine', () => {
    const props = {
      item: {
        list: [
          { value: '172', name: 'Credit' },
          { value: '173', name: 'Check' }
        ],
        amount: 200,
        formatCheckAmount: 300,
      },
      value: '173',
      index: 0,
      optionLen: 3,
      children: (<span>Check info</span>),
      isRefund: true,
      ...actions
    };

    const component = setup(props);
    const _ins = component.instance();

    const confirmMock = jest.spyOn(_ins,'openConfirm');

    expect(component.find('.payment-check')).toHaveLength(1);
    expect(component.find('.payment-check-number')).toHaveLength(0);
    expect(component.find('#checkAmount')).toHaveLength(1);

    const amountInput = component.find(InputNumeric);
    const amountInputHtmlElement = component.find('#checkAmount');
    amountInputHtmlElement.simulate('blur');
    expect(actions.changeCheckAmount).not.toHaveBeenCalled();
    expect(actions.changeRemaining).not.toHaveBeenCalled();

    amountInputHtmlElement.simulate('blur');
    expect(confirmMock).toHaveBeenCalled();
    component.instance().openConfirm().then(()=>{
      expect(actions.changeCheckAmount).toHaveBeenCalledTimes(1);
      expect(actions.changeRemaining).toHaveBeenCalledTimes(1);
    });

    resetActions(actions);
    amountInput.node.input.value = 400;
    amountInputHtmlElement.simulate('blur');
    component.instance().openConfirm().then(()=>{
      expect(actions.changeCheckAmount).toHaveBeenCalledTimes(2);
      expect(actions.changeRemaining).toHaveBeenCalledTimes(2);
    });
  });
  it('Check component refund process should work fine when has error', () => {
    const props = {
      item: {
        list: [
          { value: '172', name: 'Credit' },
          { value: '173', name: 'Check' }
        ],
        errors:
        [{
          name:'checkNumber',
          error:'test error'
        },
        {
          name:'',
          error:'test error'
        }
      ],
        amount: 200,
        formatCheckAmount: 300,
      },
      value: '173',
      index: 0,
      optionLen: 3,
      children: (<span>Check info</span>),
      isRefund: false,
      ...actions
    };

    const component = setup(props);

    const amountInputHtmlElement = component.find('.payment-check-number').find('input');
    const amountInput = component.find('#checkAmount');

    amountInputHtmlElement.simulate('focus');
    expect(actions.clearOptionAndPaymentErrs).toHaveBeenCalledWith(0);
    expect(actions.clearOptionAndPaymentErrs).toHaveBeenCalledTimes(1);

    amountInputHtmlElement.simulate('blur');
    expect(actions.updateCheckNumber).toHaveBeenCalledWith({"checkNumber": "", "key": 0});
    expect(actions.clearOptionAndPaymentErrs).toHaveBeenCalledTimes(2);

    amountInput.simulate('blur');
    expect(actions.clearOptionAndPaymentErrs).toHaveBeenCalledWith(0);
    expect(actions.clearOptionAndPaymentErrs).toHaveBeenCalledTimes(3);

  });

});
