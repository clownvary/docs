import React from 'react';
import toJson from 'enzyme-to-json';
import { mount } from 'enzyme';
import { GiftCard } from 'index/Payment/components/PaymentOptions/GiftCard';
import InputNumeric from 'react-base-ui/lib/components/InputNumeric';
import Dropdown from 'react-base-ui/lib/components/Dropdown';
import * as dialog from 'react-base-ui/lib/services/dialog';

import { fieldProps, paymentTypes } from 'index/Payment/consts';
import resetActions from 'utils/resetActions';

jest.mock('index/Payment/components/PaymentOptions/utils/payment', () => ({
  getDefaultAmount: jest.fn().mockReturnValue(300)
}));

jest.mock('index/Payment/components/Modals/GiftCard', () => 'GiftCardModal');

describe('index/Payment/components/PaymentOptions/GiftCard', () => {
  const actions = {
    changeGiftCardAmount: jest.fn(),
    changeGiftCardOpiton: jest.fn(),
    cancelSelectGiftCard: jest.fn(),
    setGiftCardLable: jest.fn(),
    setGiftCardMaxOverride: jest.fn(),
    setAvaliableAmount: jest.fn(),
    changeRemaining: jest.fn(),
    addError: jest.fn(),
    onChange: jest.fn(),
    clearOptionAndPaymentErrs: jest.fn()
  };
  const paymentOptions = {
    options: {
      data: [
        { name: 'GiftCard #1', giftCardId: '445', activeVal: '445' },
        { name: 'GiftCard #2', giftCardId: '444', activeVal: '444' },
        { name: 'Check' }
      ]
    }
  };

  afterEach(() => {
    resetActions(actions);
  });

  const setup = (props) => mount(<GiftCard {...props} />);

  it('GiftCard component should render without error', () => {
    const props = {
      item: {
        list: [
          { value: '173', name: 'GiftCard' },
          { value: '172', name: 'Credit' }
        ],
        amount: '500'
      },
      value: '173',
      index: 0,
      optionLen: 3,
      children: (<span>GiftCard info</span>),
      data: {
        giftCardId: '721',
        giftCardLabel: 'Gift Card',
        giftCardDropDownValue: '445',
        giftCardDropDown: {
          data: [
            { value: '443', name: 'gift-card 443', text: 'gift-card 443' },
            { value: '444', name: 'gift-card 444', text: 'gift-card 444' },
            { value: '445', name: 'gift-card 445', text: 'gift-card 445' }
          ]
        },
        isUseNewGiftCard: false,
        newGiftCardDropDown: {
          data: []
        }
      },
      isRefund: false,
      ...paymentOptions,
      ...actions
    };
    const component = setup(props);
    expect(toJson(component)).toMatchSnapshot();
  });

  it('GiftCard component change payment option should work fine', () => {
    const props = {
      item: {
        list: [
          { value: '173', name: 'GiftCard' },
          { value: '172', name: 'Credit' }
        ],
        amount: '500'
      },
      value: '173',
      index: 0,
      optionLen: 3,
      children: (<span>GiftCard info</span>),
      data: {
        giftCardId: '721',
        giftCardLabel: 'Gift Card',
        giftCardDropDownValue: '445',
        giftCardDropDown: {
          data: [
            { value: '443', name: 'gift-card 443', text: 'gift-card 443' },
            { value: '444', name: 'gift-card 444', text: 'gift-card 444' },
            { value: '445', name: 'gift-card 445', text: 'gift-card 445' }
          ]
        },
        isUseNewGiftCard: false,
        newGiftCardDropDown: {
          data: []
        }
      },
      isRefund: false,
      ...paymentOptions,
      ...actions
    };

    const component = setup(props);
    const instance = component.instance();

    expect(instance.state.overrideMsg).toEqual('');
    expect(instance.state.amount).toEqual('500');
    expect(component.find('.payment-gift-card')).toHaveLength(1);
    expect(component.find('#paymentAmount')).toHaveLength(1);
    expect(actions.setGiftCardLable).toHaveBeenCalled();

    component.find(Dropdown).at(0).node.props.onChange({});
    expect(actions.onChange).toBeCalled();
  });

  it('GiftCard component change gift card option should work fine', () => {
    const props = {
      item: {
        list: [
          { value: '173', name: 'GiftCard' },
          { value: '172', name: 'Credit' }
        ],
        amount: '500'
      },
      value: '173',
      index: 0,
      optionLen: 3,
      children: (<span>GiftCard info</span>),
      data: {
        giftCardId: '721',
        giftCardLabel: 'Gift Card',
        giftCardDropDownValue: '445',
        giftCardDropDown: {
          data: [
            { value: '443', gc_id: '443', name: 'gift-card 443', text: 'gift-card 443', gc_available_amount: '200' },
            { value: '444', gc_id: '444', name: 'gift-card 444', text: 'gift-card 444', gc_available_amount: '300' },
            { value: '445', gc_id: '445', name: 'gift-card 445', text: 'gift-card 445', gc_available_amount: '500' }
          ]
        },
        isUseNewGiftCard: false,
        newGiftCardDropDown: {
          data: []
        }
      },
      isRefund: false,
      ...paymentOptions,
      ...actions
    };

    const component = setup(props);

    component.find(Dropdown).at(1).node.props.onChange({});
    expect(actions.changeGiftCardOpiton).toBeCalled();
    expect(actions.changeGiftCardAmount).toBeCalled();
    expect(actions.changeRemaining).toBeCalled();
    component.setProps({
      item: Object.assign({}, props.item, {
        errors: [{ key: 0, name: '' }]
      })
    });
    component.find(Dropdown).at(1).node.props.onChange({});
    expect(actions.clearOptionAndPaymentErrs).toBeCalled();
  });

  it('GiftCard component change payment amount should work fine', () => {
    const props = {
      item: {
        list: [
          { value: '173', name: 'GiftCard' },
          { value: '172', name: 'Credit' }
        ],
        amount: ''
      },
      value: '173',
      index: 0,
      optionLen: 3,
      children: (<span>GiftCard info</span>),
      data: {
        giftCardId: '721',
        giftCardLabel: 'Gift Card',
        giftCardDropDownValue: '445',
        giftCardDropDown: {
          data: [
            { value: '443', gc_id: '443', name: 'gift-card 443', text: 'gift-card 443', gc_available_amount: '200' },
            { value: '444', gc_id: '444', name: 'gift-card 444', text: 'gift-card 444', gc_available_amount: '300' },
            { value: '445', gc_id: '445', name: 'gift-card 445', text: 'gift-card 445', gc_available_amount: '500' }
          ]
        },
        isUseNewGiftCard: false,
        newGiftCardDropDown: {
          data: []
        }
      },
      isRefund: false,
      ...paymentOptions,
      ...actions
    };

    const component = setup(props);
    const instance = component.instance();

    const amountInput = component.find(InputNumeric);
    const amountInputHtmlElement = component.find('#paymentAmount');
    amountInput.node.input.value = 300;
    amountInput.node.props.onValueChange({ value: 300 });
    amountInputHtmlElement.simulate('blur');
    expect(instance.state.amount).toEqual(0);
    expect(actions.addError).toHaveBeenCalled();
    expect(actions.changeGiftCardAmount).toBeCalled();
    expect(actions.changeRemaining).toBeCalled();
  });

  it('GiftCard component change payment amount should meet error if gift card id not match', () => {
    const props = {
      item: {
        list: [
          { value: '173', name: 'GiftCard' },
          { value: '172', name: 'Credit' }
        ],
        amount: '',
        giftCardId: '721',
      },
      value: '173',
      index: 0,
      optionLen: 3,
      children: (<span>GiftCard info</span>),
      data: {
        giftCardId: '445',
        giftCardLabel: 'Gift Card',
        giftCardDropDownValue: '',
        giftCardDropDown: {
          data: [
            { value: '443', gc_id: '443', name: 'gift-card 443', text: 'gift-card 443', gc_available_amount: '200' },
            { value: '444', gc_id: '444', name: 'gift-card 444', text: 'gift-card 444', gc_available_amount: '300' },
            { value: '445', gc_id: '445', name: 'gift-card 445', text: 'gift-card 445', gc_available_amount: '500' }
          ]
        },
        isUseNewGiftCard: false,
        newGiftCardDropDown: {
          data: []
        }
      },
      isRefund: false,
      ...paymentOptions,
      ...actions
    };

    const component = setup(props);
    const instance = component.instance();
    expect(actions.changeGiftCardAmount).not.toHaveBeenCalled();
    expect(actions.changeRemaining).not.toHaveBeenCalled();

    const amountInput = component.find(InputNumeric);
    const amountInputHtmlElement = component.find('#paymentAmount');
    expect(instance.state.amount).toEqual('');

    amountInputHtmlElement.simulate('blur');
    expect(actions.addError).not.toHaveBeenCalled();
    expect(actions.changeGiftCardAmount).toHaveBeenCalledTimes(1);
    expect(actions.changeRemaining).toHaveBeenCalledTimes(1);

    amountInput.node.input.value = 400;
    amountInput.node.props.onValueChange({ value: 400 });
    expect(instance.state.amount).toEqual(400);

    amountInputHtmlElement.simulate('blur');
    expect(actions.addError).toHaveBeenCalledTimes(1);
    expect(actions.changeGiftCardAmount).toHaveBeenCalledTimes(2);
    expect(actions.changeRemaining).toHaveBeenCalledTimes(2);

    component.setProps({ data: Object.assign({}, props.data, { giftCardDropDownValue: '445' }) });
    amountInput.node.input.value = 400;
    amountInput.node.props.onValueChange({ value: 400 });
    expect(instance.state.amount).toEqual(400);

    amountInputHtmlElement.simulate('blur');
    expect(actions.changeGiftCardAmount).toHaveBeenCalledTimes(3);
    expect(actions.changeRemaining).toHaveBeenCalledTimes(3);

    dialog.confirm = jest.fn(()=> Promise.resolve());
    component.instance().openConfirm().then(()=>{
      expect(actions.setGiftCardMaxOverride).toHaveBeenCalled();
      expect(actions.setAvaliableAmount).toHaveBeenCalled();
      expect(actions.changeGiftCardAmount).toHaveBeenCalledTimes(4);
      expect(actions.changeRemaining).toHaveBeenCalledTimes(4);
    });

    const onCancelSpy = jest.spyOn(component.instance(),'onCancel');
    dialog.confirm = jest.fn(()=> Promise.reject());

    component.instance().openConfirm().catch(()=>{
     expect(onCancelSpy).toHaveBeenCalled();
    });
  });

  it('GiftCard component should render correctly when dropdown not disabled', () => {
    const props = {
      item: {
        list: [
          { value: '173', name: 'GiftCard' },
          { value: '172', name: 'Credit' },
          { value: '171', name: 'Check' }
        ],
        amount: '',
        giftCardId: '721',
      },
      value: '173',
      index: 2,
      optionLen: 3,
      options: {
        data: [
          { name: 'GiftCard #1', giftCardId: '445', activeVal: '445' },
          { name: 'GiftCard #2', giftCardId: '444', activeVal: '444' },
          { name: 'Check' }
        ]
      },
      children: (<span>GiftCard info</span>),
      data: {
        giftCardId: '445',
        giftCardLabel: 'Gift Card',
        giftCardDropDownValue: '',
        giftCardDropDown: {
          data: [
            { value: '443', gc_id: '443', name: 'gift-card 443', text: 'gift-card 443', gc_available_amount: '200' },
            { value: '444', gc_id: '444', name: 'gift-card 444', text: 'gift-card 444', gc_available_amount: '300' },
            { value: '445', gc_id: '445', name: 'gift-card 445', text: 'gift-card 445', gc_available_amount: '500' }
          ]
        },
        isUseNewGiftCard: false,
        newGiftCardDropDown: {
          data: []
        }
      },
      isRefund: false,
      ...actions
    };

    const component = setup(props);

    const giftCardOptions = component.find('.gift-card-dropdown').at(0).find('li');
    expect(giftCardOptions).toHaveLength(2);
  });

  it('GiftCard component\'s lifecycle method should work fine', () => {
    const props = {
      item: {
        list: [
          { value: '173', name: 'GiftCard' },
          { value: '172', name: 'Credit' },
          { value: '171', name: 'Check' }
        ],
        amount: '',
        giftCardId: '721',
        activeVal: '500'
      },
      value: '173',
      index: 2,
      optionLen: 3,
      options: {
        data: [
          { name: 'GiftCard #1', giftCardId: '445', activeVal: '445' },
          { name: 'GiftCard #2', giftCardId: '444', activeVal: '444' },
          { name: 'Check' }
        ]
      },
      children: (<span>GiftCard info</span>),
      data: {
        giftCardId: '',
        giftCardLabel: 'Gift Card',
        giftCardDropDownValue: '445',
        giftCardDropDown: {
          data: []
        },
        isUseNewGiftCard: false,
        newGiftCardDropDown: {
          data: [
            {
              id: '445',
              value: '445',
              gc_id: '445',
              name: 'gift-card 445',
              text: 'gift-card 445',
              gc_available_amount: '500'
            }
          ]
        }
      },
      isRefund: false,
      ...actions
    };

    const component = setup(props);
    const instance = component.instance();
    expect(actions.changeGiftCardAmount).toHaveBeenCalledTimes(1);
    expect(actions.changeRemaining).toHaveBeenCalledTimes(1);
    expect(instance.state.amount).toEqual('0.00');

    const amountInput = component.find(InputNumeric);
    amountInput.node.input.value = 400;
    amountInput.node.props.onValueChange({ value: 400 });
    component.setProps({
      item: Object.assign({}, props.item, { activeVal: 300, formatGiftCardAmount: 400 }),
      data: Object.assign({}, props.data, { giftCardId: '223' })
    });
    expect(actions.changeGiftCardAmount).toHaveBeenCalledTimes(1);
    expect(actions.changeRemaining).toHaveBeenCalledTimes(1);
  });

  it('GiftCard component payment process in refund workflow should work fine', () => {
    const props = {
      item: {
        list: [
          { value: '173', name: 'GiftCard' },
          { value: '172', name: 'Credit' }
        ],
        amount: ''
      },
      value: '173',
      index: 2,
      optionLen: 3,
      options: {
        data: []
      },
      children: (<span>GiftCard info</span>),
      data: {
        giftCardId: '721',
        giftCardLabel: 'Gift Card',
        giftCardDropDownValue: '',
        giftCardDropDown: {
          data: []
        },
        isUseNewGiftCard: true,
        newGiftCardDropDown: {
          data: [
            {
              id: '499',
              gc_id: '499',
              name: 'new-gift-card 499',
              text: 'new-gift-card 499',
              gc_available_amount: '400'
            }
          ]
        }
      },
      isRefund: true,
      ...actions
    };

    const component = setup(props);
    const instance = component.instance();

    const amountInputHtmlElement = component.find('#paymentAmount');
    const amountInput = component.find(InputNumeric);
    expect(instance.state.amount).toEqual('');
    amountInputHtmlElement.simulate('blur');
    expect(instance.state.overrideMsg).toEqual('');
    expect(actions.setAvaliableAmount).toHaveBeenCalledTimes(1);
    expect(actions.changeGiftCardAmount).toHaveBeenCalledTimes(1);
    expect(actions.changeRemaining).toHaveBeenCalledTimes(1);

    amountInput.node.input.value = 400;
    amountInput.node.props.onValueChange({ value: 400 });
    amountInputHtmlElement.simulate('blur');
    expect(instance.state.overrideMsg).toEqual('')
    expect(actions.addError).toHaveBeenCalled();
    expect(actions.setAvaliableAmount).toHaveBeenCalledTimes(2);
    expect(actions.changeGiftCardAmount).toHaveBeenCalledTimes(2);
    expect(actions.changeRemaining).toHaveBeenCalledTimes(2);

    dialog.confirm = jest.fn(() => Promise.resolve());
    component.instance().openConfirm().then(() => {
      expect(actions.setGiftCardMaxOverride).not.toHaveBeenCalled();
      expect(actions.setAvaliableAmount).toHaveBeenCalledTimes(2);
      expect(actions.changeGiftCardAmount).toHaveBeenCalledTimes(2);
      expect(actions.changeRemaining).toHaveBeenCalledTimes(2);
    });

  });

  it('GiftCard component change payment amount in refund workflow should work fine', () => {
    const props = {
      item: {
        list: [
          { value: '173', name: 'GiftCard' },
          { value: '172', name: 'Credit' }
        ],
        amount: '',
        giftCardId: '443',
      },
      value: '173',
      index: 2,
      optionLen: 3,
      options: {
        data: []
      },
      children: (<span>GiftCard info</span>),
      data: {
        giftCardId: '443',
        giftCardLabel: 'Gift Card',
        giftCardDropDownValue: '499',
        giftCardDropDown: {
          data: [
            {
              id: '443',
              value: '443',
              gc_id: '443',
              name: 'gift-card 443',
              text: 'gift-card 443',
              gc_available_amount: 200,
              gc_max_card_balance: 450,
              gc_min_sale_amount: 400
            }
          ]
        },
        isUseNewGiftCard: true,
        newGiftCardDropDown: {
          data: [
            {
              id: '499',
              gc_id: '499',
              name: 'new-gift-card 499',
              text: 'new-gift-card 499',
              gc_available_amount: 400,
            },
            {
              id: '443',
              value: '443',
              gc_id: '443',
              name: 'gift-card 443',
              text: 'gift-card 443',
              gc_available_amount: 200,
              gc_max_card_balance: 450,
              gc_min_sale_amount: 400
            }
          ]
        },
        maxOverrideHasAccess: true,
        minOverrideHasAccess: true,
        minOverrideExplanation: 'minOverrideExplanation: ',
        maxOverrideExplanation: 'maxOverrideExplanation: '
      },
      isRefund: true,
      ...actions
    };

    const component = setup(props);
    const instance = component.instance();

    const amountInputHtmlElement = component.find('#paymentAmount');
    const amountInput = component.find(InputNumeric);
    expect(instance.state.amount).toEqual('');
    amountInputHtmlElement.simulate('blur');
    expect(instance.state.overrideMsg).toEqual('minOverrideExplanation: $400.00.');

    amountInput.node.input.value = 500;
    amountInput.node.props.onValueChange({ value: 500 });
    expect(instance.state.amount).toEqual(500);
    amountInputHtmlElement.simulate('blur');
    expect(instance.state.overrideMsg).toEqual('minOverrideExplanation: $400.00.');

    amountInput.node.input.value = 300;
    amountInput.node.props.onValueChange({ value: 300 });
    expect(instance.state.amount).toEqual(300);
    amountInputHtmlElement.simulate('blur');
    expect(instance.state.overrideMsg).toEqual('maxOverrideExplanation: $450.00 (This card has $200.00 remaining).');

    dialog.confirm = jest.fn(() => Promise.resolve());
    component.instance().openConfirm().then(() => {
      expect(actions.setGiftCardMaxOverride).not.toHaveBeenCalled();
    expect(actions.setAvaliableAmount).toHaveBeenCalledTimes(1);
    expect(actions.changeGiftCardAmount).not.toHaveBeenCalled();
    expect(actions.changeRemaining).not.toHaveBeenCalled();
    });

    instance.onCancelIssueCard();
    expect(actions.changeGiftCardOpiton).toHaveBeenCalled();

    component.setProps({
      data: Object.assign({}, props.data, {
        newGiftCardDropDown: {
          data: [
            {
              id: '499',
              gc_id: '499',
              name: 'new-gift-card 499',
              text: 'new-gift-card 499',
              gc_available_amount: 400,
            },
            {
              id: '443',
              value: '443',
              gc_id: '443',
              name: 'gift-card 443',
              text: 'gift-card 443',
              gc_available_amount: 200,
              gc_max_card_balance: 450,
              gc_min_sale_amount: 400,
              isNewGiftCard: true
            }
          ]
        },
      })
    });
    amountInput.node.input.value = 300;
    amountInput.node.props.onValueChange({ value: 300 });
    amountInputHtmlElement.simulate('blur');
    expect(instance.state.overrideMsg).toEqual('maxOverrideExplanation: $250.00.');

    component.setProps({
      item: Object.assign({}, props.item, { activeVal: 300, errors: [{ message: 'mock giftcard error', name: '' }] }),
      data: Object.assign({}, props.data, {
        giftCardId: '223',
        giftCardDropDownValue: '443',
        maxOverrideHasAccess: false
      })
    });
    expect(actions.changeGiftCardAmount).toHaveBeenCalledTimes(0);
    expect(actions.changeRemaining).toHaveBeenCalledTimes(0);

    amountInputHtmlElement.simulate('blur');
    expect(actions.clearOptionAndPaymentErrs).toHaveBeenCalledTimes(1);
    expect(instance.state.overrideMsg).toEqual('maxOverrideExplanation: $250.00.');
  });

  it('GiftCard component if no chosen card in refund workflow should work fine', () => {
    const props = {
      item: {
        list: [
          { value: '173', name: 'GiftCard' },
          { value: '172', name: 'Credit' }
        ],
        amount: '',
        giftCardId: '443',
      },
      value: '173',
      index: 2,
      optionLen: 3,
      options: {
        data: [
          { ComponentName: 'GiftCard', activeVal: '443' },
          { ComponentName: 'PaymentPlan', activeVal: paymentTypes.PAYMENTPLAN }
        ]
      },
      children: (<span>GiftCard info</span>),
      data: {
        giftCardId: '443',
        giftCardLabel: 'Gift Card',
        giftCardDropDownValue: '',
        giftCardDropDown: {
          data: [
            {
              id: '443',
              value: '443',
              gc_id: '443',
              name: 'gift-card 443',
              text: 'gift-card 443',
              gc_available_amount: 200,
              gc_max_card_balance: 450,
              gc_min_sale_amount: 400
            }
          ]
        },
        isUseNewGiftCard: true,
        newGiftCardDropDown: {
          data: [
            {
              id: '499',
              gc_id: '499',
              name: 'new-gift-card 499',
              text: 'new-gift-card 499',
              gc_available_amount: 400,
            },
            {
              id: '443',
              value: '443',
              gc_id: '443',
              name: 'gift-card 443',
              text: 'gift-card 443',
              gc_available_amount: 200,
              gc_max_card_balance: 450,
              gc_min_sale_amount: 400
            }
          ]
        },
        maxOverrideHasAccess: true,
        minOverrideHasAccess: true,
        minOverrideExplanation: 'minOverrideExplanation: ',
        maxOverrideExplanation: 'maxOverrideExplanation: ',
        isNoCardChosen: true
      },
      isRefund: true,
      ...actions
    };

    const component = setup(props);
    const instance = component.instance();

    const amountInputHtmlElement = component.find('#paymentAmount');
    const amountInput = component.find(InputNumeric);
    expect(instance.state.amount).toEqual('');
    amountInputHtmlElement.simulate('blur');
    expect(instance.state.overrideMsg).toEqual('');
    expect(actions.setAvaliableAmount).toHaveBeenCalledTimes(1);
    expect(actions.changeGiftCardAmount).toHaveBeenCalledTimes(1);
    expect(actions.changeRemaining).toHaveBeenCalledTimes(1);
    expect(actions.addError).not.toHaveBeenCalled();

    amountInput.node.input.value = 500;
    amountInput.node.props.onValueChange({ value: 500 });
    expect(instance.state.amount).toEqual(500);
    amountInputHtmlElement.simulate('blur');
    expect(instance.state.overrideMsg).toEqual('');
  });
  it('onConfirm should works well', () => {
    const props = {
      item: {
        list: [
          { value: '173', name: 'GiftCard' },
          { value: '172', name: 'Credit' }
        ],
        amount: '',
        giftCardId: '443',
      },
      value: '173',
      index: 2,
      optionLen: 3,
      options: {
        data: [
          { ComponentName: 'GiftCard', activeVal: '443' },
          { ComponentName: 'PaymentPlan', activeVal: paymentTypes.PAYMENTPLAN }
        ]
      },
      children: (<span>GiftCard info</span>),
      data: {
        giftCardId: '443',
        giftCardLabel: 'Gift Card',
        giftCardDropDownValue: '',
        giftCardDropDown: {
          data: [
            {
              id: '443',
              value: '443',
              gc_id: '443',
              name: 'gift-card 443',
              text: 'gift-card 443',
              gc_available_amount: 200,
              gc_max_card_balance: 450,
              gc_min_sale_amount: 400
            }
          ]
        },
        isUseNewGiftCard: true,
        newGiftCardDropDown: {
          data: [
            {
              id: '499',
              gc_id: '499',
              name: 'new-gift-card 499',
              text: 'new-gift-card 499',
              gc_available_amount: 400,
            },
            {
              id: '443',
              value: '443',
              gc_id: '443',
              name: 'gift-card 443',
              text: 'gift-card 443',
              gc_available_amount: 200,
              gc_max_card_balance: 450,
              gc_min_sale_amount: 400
            }
          ]
        },
        maxOverrideHasAccess: true,
        minOverrideHasAccess: true,
        minOverrideExplanation: 'minOverrideExplanation: ',
        maxOverrideExplanation: 'maxOverrideExplanation: ',
        isNoCardChosen: true
      },
      isRefund: true,
      ...actions
    };
    const component = setup(props);
    const instance = component.instance();
    const spy = jest.fn();
    instance.onConfirm(spy);
    expect(spy).toHaveBeenCalled();
  });
  it('getGiftCardAmount should works well', () => {
    const props = {
      item: {
        list: [
          { value: '173', name: 'GiftCard' },
          { value: '172', name: 'Credit' }
        ],
        amount: '',
        giftCardId: '443',
      },
      value: '173',
      index: 2,
      optionLen: 3,
      options: {
        data: [
          { ComponentName: 'GiftCard', activeVal: '443' },
          { ComponentName: 'PaymentPlan', activeVal: paymentTypes.PAYMENTPLAN }
        ]
      },
      children: (<span>GiftCard info</span>),
      data: {
        giftCardId: '443',
        giftCardLabel: 'Gift Card',
        giftCardDropDownValue: '',
        giftCardDropDown: {
          data: [
            {
              id: '443',
              value: '443',
              gc_id: '443',
              name: 'gift-card 443',
              text: 'gift-card 443',
              gc_available_amount: 200,
              gc_max_card_balance: 450,
              gc_min_sale_amount: 400
            }
          ]
        },
        isUseNewGiftCard: true,
        newGiftCardDropDown: {
          data: [
            {
              id: '499',
              gc_id: '499',
              name: 'new-gift-card 499',
              text: 'new-gift-card 499',
              gc_available_amount: 400,
            },
            {
              id: '443',
              value: '443',
              gc_id: '443',
              name: 'gift-card 443',
              text: 'gift-card 443',
              gc_available_amount: 200,
              gc_max_card_balance: 450,
              gc_min_sale_amount: 400
            }
          ]
        },
        maxOverrideHasAccess: true,
        minOverrideHasAccess: true,
        minOverrideExplanation: 'minOverrideExplanation: ',
        maxOverrideExplanation: 'maxOverrideExplanation: ',
        isNoCardChosen: true
      },
      isRefund: true,
      ...actions
    };
    const component = setup(props);
    const instance = component.instance();
    const spy = jest.fn();
    expect(instance.getGiftCardAmount('443')).toEqual(200);
  });
});
