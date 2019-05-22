import { fromJS } from 'immutable';
import React from 'react';
import Button from 'react-base-ui/lib/components/Button';
import { Icon } from 'react-base-ui/lib/components/SVG';
import merge from 'lodash/merge';
import { shallow } from 'enzyme';// eslint-disable-line

import buttonsMessages from 'shared/translation/messages/button';
import { FormattedMessage } from 'shared/translation/formatted';
import { OrderSummary } from 'index/modules/Cart/ShoppingCart/components/OrderSummary';

import context, { childContextTypes } from 'utils/context';// eslint-disable-line
const initialState = {
  ShoppingCart: {
    checkout: fromJS({
      needPay: true
    }),
    waiver: { test: 'test' },
    ordersummary: fromJS({
      data: fromJS({
        sub_total: 100,
        taxes: 0,
        processing_fee: 0,
        processing_fee_discount: 0,
        total_charges: 100,
        payment_from_account: 0,
        payment_plan_deferred: 0,
        due_now: 100,
        gift_card_amount: 11,
        is_need_payment: true,
        cart_count: 999
      })
    })
  },
  transactions: fromJS({
    orderSummary: {}
  }),
  isCollapsable: true
};

function setup(_state = initialState, _context = context) {
  const state = merge({}, initialState, _state);
  const actions = {
    validateAndCheckoutShoppingCartAction: jest.fn()
  };

  const component = shallow(<OrderSummary isSticky={false} isCollapsable={state.isCollapsable} data={state.ShoppingCart.ordersummary} waiver={state.ShoppingCart.waiver} transactions={state.transactions} {...actions} />,
    { context: _context, childContextTypes });

  return {
    component,
    orderSummary: component.find('.ordersummary-panel'),
    button: component.find(Button),
    arrowUp: component.find(Icon).findWhere(i => i.prop('name') === 'chevron-up'),
    arrowDown: component.find(Icon).findWhere(i => i.prop('name') === 'chevron-down'),
    collapseTrigger: component.find('.ordersummary-title__collapse-trigger'),
    actions
  };
}

describe('index/modules/Cart/ShoppingCart/components/OrderSummary', () => {
  it('should render orderSummary ', () => {
    const { orderSummary } = setup();
    expect(orderSummary.length).toEqual(1);
  });
  it('validateAndCheckoutShoppingCartAction should be trigger when button be clicked', () => {
    const { button, actions } = setup();
    button.simulate('click');
    expect(actions.validateAndCheckoutShoppingCartAction).toHaveBeenCalledWith(initialState.ShoppingCart.waiver);
  });
  it('should render text correctly', () => {
    const { button } = setup({ ShoppingCart: { ordersummary: fromJS({ data: fromJS({ is_need_payment: false }) }) } });
    const fmt = button.find(FormattedMessage);
    expect(fmt.prop('id')).toEqual(buttonsMessages.finish.id);
  });
  it('should render text correctly', () => {
    const { button } = setup();
    const fmt = button.find(FormattedMessage);
    expect(fmt.prop('id')).toEqual(buttonsMessages.checkout.id);
  });
  it('show collapse arrow correctly', () => {
    const { arrowUp, arrowDown } = setup({ expanded: true });
    expect(arrowUp.length).toEqual(0);
    expect(arrowDown.length).toEqual(1);
  });
  it('show collapse arrow correctly when click collapse trigger', () => {
    const { component, collapseTrigger } = setup({ expanded: true });
    collapseTrigger.simulate('click');
    component.setState({ expanded: false });
    expect(component.find(Icon).findWhere(i => i.prop('name') === 'chevron-down').length > 0).toEqual(true);
  });
  it('show expanded arrow correctly', () => {
    const newState = initialState;
    newState.isCollapsable = false;
    const { arrowUp, arrowDown } = setup(newState, { expanded: false });
    expect(arrowUp.length).toEqual(1);
    expect(arrowDown.length).toEqual(0);
  });
});
