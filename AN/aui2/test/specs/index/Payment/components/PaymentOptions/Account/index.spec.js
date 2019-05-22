import React from 'react';
import toJson from 'enzyme-to-json';
import { mount } from 'enzyme';
import InputNumeric from 'react-base-ui/lib/components/InputNumeric';
import Dropdown from 'react-base-ui/lib/components/Dropdown';
import { Account } from 'index/Payment/components/PaymentOptions/Account';
import resetActions from 'utils/resetActions';

jest.mock('index/Payment/components/PaymentOptions/utils/payment', () => ({
  getDefaultAmount: jest.fn().mockReturnValue(300)
}));

describe('index/Payment/components/PaymentOptions/Account', () => {

  const actions = {
    changeRefundAccountAmount: jest.fn(),
    fetchAccountConfig: jest.fn(),
    changeRemaining: jest.fn(),
    toggleRequestRefund: jest.fn(),
    changeRefundReason: jest.fn(),
    clearOptionAndPaymentErrs: jest.fn(),
    changeRefundOtherReason: jest.fn(),
    addError: jest.fn(),
    onChange: jest.fn()
  };

  afterEach(() => {
    resetActions(actions);
  });

  const setup = (props) => mount(<Account {...props} />);

  it('Account component should render without error', () => {
    const props = {
      item: {
        list: [
          { value: '172', name: 'Cash' },
          { value: '173', name: 'Account' }
        ]
      },
      value: '173',
      index: 0,
      optionLen: 3,
      children: (<span>account info</span>),
      refundConfig: {
        reasons: {}
      },
      ...actions
    };
    const component = setup(props);
    expect(toJson(component)).toMatchSnapshot();
  });

  it('Account component in refund workflow should render without error', () => {
    const props = {
      item: {
        list: [
          { value: '172', name: 'Cash' },
          { value: '173', name: 'Account' }
        ],
        activeVal: '173',
        amount: '230'
      },
      value: '173',
      index: 0,
      optionLen: 3,
      children: (<span>account info</span>),
      refundConfig: {
        reasons: {
          selected: -1,
          data: [
            { value: '255', name: 'plan changes' },
            { value: '256', name: 'normal modify' }
          ],
          otherReason: 'other refund reason'
        },
        display: true,
        requestRefund: true
      },
      ...actions
    };
    const component = setup(props);
    expect(toJson(component)).toMatchSnapshot();
  });

  it('Account component change payment option and payment amount should work fine', () => {
    const props = {
      item: {
        list: [
          { value: '172', name: 'Cash' },
          { value: '173', name: 'Account' }
        ]
      },
      value: '173',
      index: 1,
      optionLen: 3,
      children: (<span>account info</span>),
      refundConfig: {
        reasons: {}
      },
      ...actions
    };

    const component = setup(props);

    expect(component.find('div.payment-option-list')).toHaveLength(1);
    expect(component.find('.refund-account__request')).toHaveLength(0);
    expect(component.find('#accountAmount')).toHaveLength(1);
    expect(component.find('div.refund-account-request')).toHaveLength(0);

    const paymentOptionDropdown = component.find(Dropdown);
    expect(paymentOptionDropdown).toHaveLength(1);
    paymentOptionDropdown.node.props.onChange({});
    expect(actions.onChange).toBeCalled();

    const amountInput = component.find(InputNumeric);
    const amountInputHtmlElement = component.find('#accountAmount');
    expect(amountInputHtmlElement).toHaveLength(1);

    amountInput.node.props.onValueChange({ value: '870' });
    amountInputHtmlElement.simulate('blur');
    expect(actions.changeRefundAccountAmount).toHaveBeenCalledTimes(1);
    expect(actions.changeRemaining).toHaveBeenCalledTimes(1);
    expect(actions.addError).toHaveBeenCalledTimes(1);

    amountInput.node.props.onValueChange({ value: '150' });
    amountInputHtmlElement.simulate('blur');
    expect(actions.changeRefundAccountAmount).toHaveBeenCalledTimes(2);
    expect(actions.changeRemaining).toHaveBeenCalledTimes(2);

    component.setState({ amount: NaN });
    amountInputHtmlElement.simulate('blur');
    expect(actions.changeRefundAccountAmount).toHaveBeenCalledTimes(3);
    expect(actions.changeRemaining).toHaveBeenCalledTimes(3);
  });

  it('Account component refund process should work fine with error', () => {
    const props = {
      item: {
        list: [
          { value: '172', name: 'Cash' },
          { value: '173', name: 'Account' }
        ],
        activeVal: '173',
        errors: [
          { message: 'mock error', name: '' },
          {
            key:0,
            name: 'refundAcountReason',
            message: 'Maximum 300 characters can be entered for Refund Reason.'
          }
        ]
      },
      value: '173',
      index: 1,
      optionLen: 3,
      children: (<span>account info</span>),
      refundConfig: {
        reasons: {
          selected: '255',
          data: [
            { value: '255', name: 'plan changes' },
            { value: '256', name: 'normal modify' }
          ],
          otherReason: 'other refund reason'
        },
        display: true,
        requestRefund: true
      },
      ...actions
    };

    const component = setup(props);

    expect(component.find('div.payment-option-list')).toHaveLength(1);
    expect(component.find('.refund-account__request')).toHaveLength(1);
    expect(component.find('#accountAmount')).toHaveLength(1);
    expect(component.find('div.refund-account-request')).toHaveLength(1);

    component.find('.refund-account__request').find('input[type="checkbox"]').simulate('click');
    expect(actions.clearOptionAndPaymentErrs).toHaveBeenCalledTimes(1);
    expect(actions.toggleRequestRefund).toHaveBeenCalled();

    const refundReasonDropdown = component.find(Dropdown).at(1);
    refundReasonDropdown.node.props.onChange({ value: '173' });
    expect(actions.changeRefundReason).toHaveBeenCalled();
    expect(actions.clearOptionAndPaymentErrs).toHaveBeenCalledTimes(2);

    const otherReasonTextarea = component.find('.refund-account-request__other');
    expect(component.find('.refund-account-request__other--error')).toHaveLength(1);

    otherReasonTextarea.simulate('change');
    otherReasonTextarea.simulate('focus');
    expect(actions.changeRefundOtherReason).toHaveBeenCalled();
    expect(actions.clearOptionAndPaymentErrs).toHaveBeenCalledTimes(4);

    const amountInput = component.find(InputNumeric);
    const amountInputHtmlElement = component.find('#accountAmount');
    expect(amountInputHtmlElement).toHaveLength(1);

    amountInput.node.props.onValueChange({ value: '870' });
    amountInputHtmlElement.simulate('blur');
    expect(actions.clearOptionAndPaymentErrs).toHaveBeenCalledTimes(5);
  });
});
