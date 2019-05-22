import React from 'react';
import { fromJS } from 'immutable';
import { mountWithIntl } from 'utils/enzymeWithIntl';
import context, { childContextTypes } from 'utils/context';
import { Icon } from 'react-base-ui/lib/components/SVG';
import OrderSummary from 'index/modules/Cart/shared/CommonOrderSummary';

jest.mock('lodash/debounce', () => jest.fn(method => method));

const initialState = {
  due_now: -1,
  payment_from_account: 0,
  payment_plan_deferred: 0,
  processing_fee: 0,
  sub_total: 0,
  taxes: 0,
  gift_card_amount: 0
};
function setup(_state = initialState, expanded = true, _context = context) {
  const state = Object.assign({}, initialState, _state);
  const component = mountWithIntl(<OrderSummary data={fromJS(state)} expanded={expanded} />, { context: _context, childContextTypes });
  return {
    component,
    commonOrdersummaryDuenow: component.find('.unexpanded-duenow')
  };
}

describe('index/modules/Cart/shared', () => {
  it('shoul run itemCanbeShow func correctly', () => {
    expect(OrderSummary.itemCanbeShow('yes')).toBeTruthy();
    expect(OrderSummary.itemCanbeShow(0)).toBeFalsy();
    expect(OrderSummary.itemCanbeShow(null)).toBeFalsy();
  });
  it('should render component correctly', () => {
    const mockState = {
      due_now: 0,
      payment_from_account: undefined,
      payment_plan_deferred: undefined,
      processing_fee: undefined,
      sub_total: undefined,
      taxes: undefined,
      gift_card_amount: undefined
    };
    const { component } = setup({ ...mockState });
    expect(component.length).toEqual(1);
  });
  it('should render component correctly when expanded is false', () => {
    const mockState = {
      due_now: 10,
      payment_from_account: undefined,
      payment_plan_deferred: undefined,
      processing_fee: undefined,
      sub_total: undefined,
      taxes: undefined,
      gift_card_amount: undefined
    };
    const { component } = setup({ ...mockState }, false);
    expect(component.length).toEqual(1);
  });
  it('should render taxes correctly', () => {
    const { component } = setup({ taxes: 10 });
    expect(component.text()).toContain('Taxes$10.00');
  });
  it('should render taprocessing_feexes correctly', () => {
    const { component } = setup({ processing_fee: 10 });
    expect(component.text()).toMatch('Fee$10.00');
  });
  it('should render payment_from_account correctly', () => {
    const { component } = setup({ payment_from_account: 10 });
    expect(component.text()).toMatch('Payment from Account$10.00');
  });
  it('should render payment_plan_deferred correctly', () => {
    const { component } = setup({ payment_plan_deferred: 10 });
    expect(component.text()).toMatch('Deferred to Payment PlanZ$10.00');
  });
  it('should render gift_card_amount correctly', () => {
    const { component } = setup({ gift_card_amount: 10 });
    expect(component.text()).toMatch('Gift CardZ-$10.00');
  });
  it('should render commonOrdersummaryDuenow correctly when expanded is false', () => {
    const newState = initialState;
    newState.due_now = -1;
    const { commonOrdersummaryDuenow } = setup(newState, false);
    expect(commonOrdersummaryDuenow.length).toEqual(0);
  });
  it('due now is undefined', () => {
    const newState = initialState;
    newState.due_now = undefined;
    const { commonOrdersummaryDuenow } = setup(newState, false);
    expect(commonOrdersummaryDuenow.length).toEqual(0);
  });
  it('should render coupon subtotal correctly', ()=>{
     const { component } = setup({coupon:1});
     const subTotal = component.find('.coupon-subtotal');
     const icon = subTotal.find(Icon);
     expect(subTotal).toHaveLength(1);
     expect(icon.prop('name')).toContain('down');
  });

  it('subtotal collapse should trigger correctly', ()=>{
    const { component } = setup({coupon:-1, original_subtotal:3});
    const subTotal = component.find('.coupon-subtotal');
    const icon = subTotal.find(Icon);
    expect(icon.prop('name')).toContain('down');

    subTotal.find('a').first().simulate('click');
    expect(component.find('.normal-weight')).toHaveLength(2);
    expect(component.find('.coupon-text').text()).toEqual('-$1.00');
    expect(icon.prop('name')).toContain('up');
 });

 it('subtotal collapse should trigger correctly when  coupon and original_subtotal is null', ()=>{
    const { component } = setup({coupon:null, original_subtotal:null});
    component.instance().setState({subtotalExpanded: true});
    expect(component.find('.normal-weight')).toHaveLength(0);
 });
});
