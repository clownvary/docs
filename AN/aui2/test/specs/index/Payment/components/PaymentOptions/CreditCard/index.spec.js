import React from 'react';
import toJson from 'enzyme-to-json';
import { mount, shallow } from 'enzyme';
import { CreditCard } from 'index/Payment/components/PaymentOptions/CreditCard';
import InputNumeric from 'react-base-ui/lib/components/InputNumeric';
import Dropdown from 'react-base-ui/lib/components/Dropdown';
import Radio from 'react-base-ui/lib/components/Radio';
import resetActions from 'utils/resetActions';
import { CCPaymentMethods } from 'index/Payment/consts';

jest.mock('index/Payment/actions/paymentOptions/creditCard', () => ({
  fetchCreditCardListAction: jest.fn().mockReturnValue(Promise.resolve()),
  changeCreditCardAction: jest.fn(),
  changeCreditCardAmount: jest.fn(),
  changeRemaining: jest.fn(),
  getIframeUrlAsyncAction: jest.fn(),
  getInstanceAction: jest.fn()
}));

jest.mock('uuid/v4', () => () => '1')

jest.mock('index/Payment/components/PaymentOptions/utils/payment', () => ({
  getDefaultAmount: jest.fn().mockReturnValue(300)
}));

describe('index/Payment/components/PaymentOptions/creditCard', () => {
  const actions = {
    changeRemaining: jest.fn(),
    changeCreditCardAction: jest.fn(),
    changeCreditCardAmount: jest.fn(),
    fetchCreditCardListAction: jest.fn().mockReturnValue(Promise.resolve()),
    onChange: jest.fn(),
    addError: jest.fn(),
    clearOptionAndPaymentErrs: jest.fn(),
    getIframeUrlAsyncAction: jest.fn(),
    getInstanceAction: jest.fn()
  };

  afterEach(() => {
    resetActions(actions);
  });

  const setup = (props) => mount(<CreditCard {...props} {...actions}/>);

  it('CreditCard component should render without error', () => {
    const props = {
      item: {
        list: [
          { value: '173', name: 'CreditCard' },
          { value: '172', name: 'Credit' }
        ],
        CCPaymentMethod: CCPaymentMethods.NEW_CARD_WITH_DEVICE,
        disabled: false
      },
      value: '173',
      index: 0,
      optionLen: 3,
      children: (<span>CreditCard info</span>),
      getIframeUrlAsyncAction: jest.fn(),
      getInstanceAction: jest.fn()
    };
    const component = setup(props);
    expect(toJson(component)).toMatchSnapshot();
  });

  it('CreditCard component in refund workflow should render without error', () => {
    const props = {
      item: {
        list: [
          { value: '173', name: 'CreditCard' },
          { value: '172', name: 'Credit' }
        ],
        CCPaymentMethod: -1,
        disables: true
      },
      value: '173',
      index: 2,
      optionLen: 3,
      children: (<span>CreditCard info</span>),
      isRefund: true,
      getIframeUrlAsyncAction: jest.fn(),
      getInstanceAction: jest.fn()
    };
    const component = setup(props);
    expect(toJson(component)).toMatchSnapshot();
  });

  it('CreditCard component change payment option should work fine when not in refund workflow and not use device for pay', () => {
    const props = {
      item: {
        list: [
          { value: '173', name: 'CreditCard' },
          { value: '172', name: 'Credit' }
        ],
        CCPaymentMethod: CCPaymentMethods.NEW_CARD_WITH_DEVICE,
        disabled: false
      },
      value: '173',
      index: 0,
      optionLen: 3,
      children: (<span>CreditCard info</span>)
    };

    const component = setup(props);

    expect(actions.fetchCreditCardListAction).toHaveBeenCalled();
    component.setState({ isConfigForPCIReady: true });
    expect(component.find('.payment-credit-card')).toHaveLength(1);
    expect(component.find('.iframeContainer')).toHaveLength(1);
    expect(component.find('#creditCardAmount')).toHaveLength(1);

    const paymentOptionDropdown = component.find(Dropdown).at(0);
    paymentOptionDropdown.node.props.onChange({});
    expect(actions.onChange).toBeCalled();
  });

  it('CreditCard component change payment option should work fine when not in refund workflow and use device for pay', () => {
    const props = {
      item: {
        list: [
          { value: '173', name: 'CreditCard' },
          { value: '172', name: 'Credit' }
        ],
        CCPaymentMethod: CCPaymentMethods.NEW_CARD_WITH_DEVICE,
        disabled: false
      },
      value: '173',
      index: 0,
      optionLen: 3,
      children: (<span>CreditCard info</span>),
      ccScanWithMagesafeDevice: true
    };

    setup(props);

    expect(actions.fetchCreditCardListAction).toHaveBeenCalled();
  });

  it('CreditCard component change payment option should work fine when in refund workflow and use device for pay and has no refund validation for cc.', () => {
    const props = {
      item: {
        list: [
          { value: '173', name: 'CreditCard' },
          { value: '172', name: 'Credit' }
        ],
        disabled: false
      },
      value: '173',
      index: 0,
      optionLen: 3,
      children: (<span>CreditCard info</span>),
      selectedCCMethod: -1,
      ccScanWithMagesafeDevice: true,
      isRefund: true
    };

    setup(props);

    expect(actions.fetchCreditCardListAction).toHaveBeenCalled();
    expect(actions.changeCreditCardAmount).not.toHaveBeenCalled();
    expect(actions.changeRemaining).not.toHaveBeenCalled();
  });
  it('CreditCard component change credit card option and amount should work fine', () => {
    const props = {
      item: {
        list: [
          { value: '173', name: 'CreditCard' },
          { value: '172', name: 'Credit' }
        ],
        errors: [{ key: 0, name: '' }],
        selectedCCMethod: CCPaymentMethods.NEW_CARD_WITH_DEVICE,
        disabled: false
      },
      value: '173',
      index: 0,
      optionLen: 3,
      children: (<span>CreditCard info</span>),
    };

    const component = setup(props);
    const instance = component.instance();

    expect(instance.state.amount).toEqual(undefined);
    const amountInputHtmlElement = component.find('#creditCardAmount');
    amountInputHtmlElement.simulate('blur');
    expect(instance.state.amount).toEqual(0);

    const amountInput = component.find(InputNumeric).at(0);
    amountInput.node.input.value = 400;
    amountInput.node.props.onValueChange({ value: 400 });
    expect(instance.state.amount).toEqual(400);

    amountInputHtmlElement.simulate('blur');
    expect(actions.addError).toHaveBeenCalled();
    expect(actions.changeCreditCardAmount).toHaveBeenCalled();
    expect(actions.changeRemaining).toHaveBeenCalled();
    expect(instance.state.amount).toEqual(300);

    resetActions(actions);
    component.setProps({ item: Object.assign({}, props.item, { disabled: true }) });
    component.setState({isConfigForPCIReady: true});
    expect(actions.changeCreditCardAction).not.toHaveBeenCalled();
    expect(component.find('.iframeContainer')).toHaveLength(1);
  });

  it('CreditCard component change credit card option and amount in refund workflow should work fine and use device for payment.', () => {
    const props = {
      item: {
        list: [
          { value: '173', name: 'CreditCard' },
          { value: '172', name: 'Credit' }
        ],
        CCPaymentMethod: CCPaymentMethods.NEW_CARD_WITH_DEVICE,
        disabled: false
      },
      value: '173',
      index: 0,
      optionLen: 3,
      children: (<span>CreditCard info</span>),
      isRefund: true,
      ccScanWithMagesafeDevice: true,
    };

    const component = setup(props);
    const instance = component.instance();

    props.item.amount = 400;
    component.setProps({ item: Object.assign({}, props.item) });

    const amountInput = component.find(InputNumeric).at(0);
    const amountInputHtmlElement = component.find('#creditCardAmount');
    amountInput.node.input.value = 500;
    amountInput.node.props.onValueChange({ value: 500 });
    expect(instance.state.amount).toEqual(500);

    amountInputHtmlElement.simulate('blur');
    expect(actions.addError).toHaveBeenCalled();
    expect(actions.changeCreditCardAmount).toHaveBeenCalledTimes(1);
    expect(actions.changeRemaining).toHaveBeenCalledTimes(1);
    expect(instance.state.amount).toEqual(300);
  });

  it('CreditCard component change credit card in refund workflow should work fine and use device for payment.', () => {
    let props = {
      item: {
        list: [
          { value: '173', name: 'CreditCard' },
          { value: '172', name: 'Credit' }
        ],
        CCPaymentMethod: CCPaymentMethods.NEW_CARD_WITH_DEVICE,
        disabled: false,
        hasSavedCC: true,
        allowNewCard: true,
        errors: [
          {
            name: ''
          }
        ]
      },
      value: '173',
      index: 0,
      optionLen: 3,
      children: (<span>CreditCard info</span>),
      isRefund: true,
      ccScanWithMagesafeDevice: true,
      showPriorCC: true
    };

    const component = shallow(<CreditCard {...props} {...actions} />);
    expect(component.find(Radio).length).toBe(2);
    component.find(Radio).at(1).simulate('change', { target: {value: CCPaymentMethods.NEW_CARD_WITH_DEVICE}});
    expect(actions.changeCreditCardAction).not.toHaveBeenCalled();
    props = {
      ...props,
      item: {
        ...props.item,
        errors: []
      }
    }
    component.setProps(props);
    component.find(Radio).at(0).simulate('change', { target: {value: CCPaymentMethods.SAVED_CARD_WITH_PCI}});
    expect(actions.changeCreditCardAction).toHaveBeenCalled();
    expect(component.find('.payment-new-cart-msg').length).toBe(1);
  });
  it('CreditCard component should work fine and not allow saved cc and use device for payment.', () => {
    let props = {
      item: {
        list: [
          { value: '173', name: 'CreditCard' },
          { value: '172', name: 'Credit' }
        ],
        CCPaymentMethod: CCPaymentMethods.NEW_CARD_WITH_DEVICE,
        disabled: false,
        hasSavedCC: true,
        allowNewCard: true,
        errors: [
          {
            name: ''
          }
        ]
      },
      value: '173',
      index: 0,
      optionLen: 3,
      children: (<span>CreditCard info</span>),
      isRefund: false,
      ccScanWithMagesafeDevice: true,
      showPriorCC: false
    };

    const component = shallow(<CreditCard {...props} {...actions} />);
    expect(component.find(Radio).length).toBe(0);
    expect(component.find('.payment-new-cart-msg').length).toBe(1);
  });

  it('CreditCard component change credit card in payment workflow should work fine and use device for payment and the payer has no saved card.', () => {
    let props = {
      item: {
        list: [
          { value: '173', name: 'CreditCard' },
          { value: '172', name: 'Credit' }
        ],
        CCPaymentMethod: CCPaymentMethods.SAVED_CARD_WITH_PCI,
        disabled: false,
        hasSavedCC: false,
        allowNewCard: true,
        errors: [
          {
            name: ''
          }
        ]
      },
      value: '173',
      index: 0,
      optionLen: 3,
      children: (<span>CreditCard info</span>),
      ccScanWithMagesafeDevice: true,
    };

    const component = shallow(<CreditCard {...props} {...actions}/>);
    expect(component.find(Radio).length).toBe(0);
    expect(component.find('.payment-new-cart-msg').length).toBe(1);
  });
});


