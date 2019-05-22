import React from 'react';
import toJson from 'enzyme-to-json';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import middlewares from 'shared/api/middlewares';
import { GiftCard } from 'index/Payment/components/Modals/GiftCard';
import Modal from 'react-base-ui/lib/components/Modal';
import Dropdown from 'react-base-ui/lib/components/Dropdown';
import Input from 'react-base-ui/lib/components/Input';
import Button from 'react-base-ui/lib/components/Button';
import Checkbox from 'react-base-ui/lib/components/Checkbox';

jest.mock('index/Payment/store', () => ({
  getState: jest.fn(),
  dispatch: jest.fn()
}));
jest.mock('react-base-ui/lib/components/Modal', () => 'Modal');

describe('index/Payment/components/Modals/GiftCard', () => {

  let store;

  beforeEach(() => {
    store = configureStore(middlewares)({});
  });
  const actions = {
    newGiftCardClose: jest.fn(),
    newGiftCardIsOverrideMin: jest.fn(),
    newGiftCardIsOverrideMax: jest.fn(),
    changeGiftCardType: jest.fn(),
    newGiftCardIsOverride: jest.fn(),
    getNewGiftCardInfo: jest.fn(),
    setNewGiftCardError: jest.fn(),
    onCancelIssueCard: jest.fn()
  }
  const props = {
    data: {
      minOverrideHasAccess: true,
      isUseNewGiftCard: true,
      newGiftCardError: "",
      isNeedGiftCardNumber: true,
      maxOverrideExplanation: "Amount cannot be greater than maximum card balance of ",
      isOverrideMaxGiftCard: true,
      maxOverrideHasAccess: true,
      giftCardLabel: "Gift Certificate Refund",
      giftCardTypeList: {
        data: [
          {
            external_number_numeric_only: false,
            is_external_number_enforce_mask: true,
            gift_card_number_mask: "###.###.##",
            available_for_all_sites: true,
            min_sale_amount: 30,
            condition_of_use: "",
            revenue_gl_account_id: 13,
            hide_on_internet: true,
            amount_can_be_changed_online: true,
            prevent_further_use: false,
            max_card_balance: 40,
            gc_type_name: "gc-mask1",
            text: "gc-mask1",
            amount_can_be_changed: true,
            value: 4,
            number_model: 1,
            min_refill_amount: 10,
            default_amount: 30,
            expire_type: 0,
            gc_type_id: 4
          },
          {
            external_number_numeric_only: false,
            is_external_number_enforce_mask: false,
            gift_card_number_mask: "",
            available_for_all_sites: true,
            min_sale_amount: 30,
            condition_of_use: "",
            revenue_gl_account_id: 13,
            hide_on_internet: false,
            amount_can_be_changed_online: false,
            prevent_further_use: false,
            max_card_balance: 30,
            gc_type_name: "New gift",
            text: "New gift",
            amount_can_be_changed: true,
            value: 2,
            number_model: 0,
            min_refill_amount: 30,
            default_amount: 30,
            expire_type: 0,
            gc_type_id: 2
          }
        ],
        selected: []
      },
      giftCardTypeListValue: 4,
      minOverrideExplanation: "Amount must be greater or equal to the minimum sale amount of ",
      isOverrideMinGiftCard: true
    },
    amount: "370.00",
    index: 0
  };
  const setup = (store, props) => shallow(<GiftCard store={store} {...props} {...actions} />);

  it('component should render correctly when has no error occurred.', () => {
    const wrapper = setup(store, props);

    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('component should render correctly when error occurred.', () => {
    const newProps = {
      amount: "370.00",
      index: 0,
      data: {
        ...props.data,
        newGiftCardError: 'issue gift card error.'
      }
    }
    const wrapper = setup(store, newProps);

    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('component should render correctly when user did some operations.', () => {
    const component = setup(store, props);

    expect(component).toBeTruthy();
    component.setState({
      minNeedOverride: true,
      maxNeedOverride: true,
      giftCardNumber: '',
      giftCardErrorMsg: 'gift card error.'
    })

    const minOverrideCheckbox = component.find(Checkbox).at(0);
    const maxOverrideCheckbox = component.find(Checkbox).at(1);
    minOverrideCheckbox.simulate('change');
    maxOverrideCheckbox.simulate('change');
    expect(actions.newGiftCardIsOverrideMin).toHaveBeenCalled();
    expect(actions.newGiftCardIsOverrideMax).toHaveBeenCalled();

    const giftCardNumberInput = component.find(Input).at(0);
    giftCardNumberInput.simulate('blur', {
      type: 'blur',
      target: {
        value: 'test',
        selectionStart: 0
      }
    });
    giftCardNumberInput.simulate('change', {
      type: 'change',
      target: {
        value: 'long long long gift card number, long long long gift card number.',
        selectionStart: 0
      }
    });

    const cancelButton = component.find(Button).at(0);
    const issueButton = component.find(Button).at(1);
    cancelButton.simulate('click');
    issueButton.simulate('click');
    expect(actions.newGiftCardClose).toHaveBeenCalled();
    expect(actions.getNewGiftCardInfo).toHaveBeenCalled();

    component.find(Dropdown).at(0).simulate('change', {value: 'test'});
    expect(actions.changeGiftCardType).toHaveBeenCalled();
    expect(actions.newGiftCardIsOverrideMin).toHaveBeenCalledTimes(7);
    expect(actions.newGiftCardIsOverrideMax).toHaveBeenCalledTimes(7);

    const newProps1 = {
      data: {
        ...props.data,
        newGiftCardError: 'new gift card error.',
        isOverrideMaxGiftCard: false,
        isNeedGiftCardNumber: false
      },
      amount: 120,
      index: 0
    }
    component.setProps(newProps1);
    component.setState({
      giftCardNumber: ''
    })
    issueButton.simulate('click');

    const newProps2 = {
      data: {
        ...props.data,
        newGiftCardError: 'new gift card error.',
        isOverrideMaxGiftCard: false,
        isNeedGiftCardNumber: false,
        isOverrideMinGiftCard: false
      },
      amount: 0,
      index: 0
    }
    component.setProps(newProps2);
    component.setState({
      giftCardNumber: ''
    })
    issueButton.simulate('click');

    const newProps3 = {
      data: {
        ...props.data,
        newGiftCardError: 'new gift card error.',
        isNeedGiftCardNumber: true
      },
      amount: 0,
      index: 0
    }
    component.setProps(newProps3);
    issueButton.simulate('click');
    component.setState({
      giftCardNumber: 'xxxx'
    })
    giftCardNumberInput.simulate('blur', {
      type: 'blur',
      target: {
        value: 'test',
        selectionStart: 0
      }
    });

    component.simulate('close');
    expect(actions.newGiftCardClose).toHaveBeenCalledTimes(2);
    expect(actions.onCancelIssueCard).toHaveBeenCalledTimes(2);
    

    component.setState({
      minNeedOverride: true,
      maxNeedOverride: true,
      giftCardNumber: '',
      giftCardErrorMsg: 'gift card error.'
    })
    const newProps4 = {
      data: {
        ...props.data,
        minOverrideHasAccess: false,
        maxOverrideHasAccess: false
      },
      amount: 0,
      index: 0
    }
    component.setProps(newProps4);
  });
});
