import React from 'react';
import { mountWithIntl } from 'utils/enzymeWithIntl';
import context, { childContextTypes } from 'utils/context';
import { PaymentPlanDetail } from 'index/modules/Cart/ShoppingCart/components/Transactions/PaymentPlanDetail';

const initialState = {
  paymentPlan: {
    reno: 1,
    total_due_amount: '366',
    payment_schedule: [
      {
        count: '1/5',
        due_date: '29 Sep 2019, Sun',
        due_amount: 133
      },
      {
        count: '2/5',
        due_date: '29 Oct 2019, Sun',
        due_amount: 233
      }
    ]
  }
};

function setup(_state = initialState, _context = context) {
  const state = Object.assign(initialState, _state);
  const component = mountWithIntl(<PaymentPlanDetail {...state} />,
    { context: _context, childContextTypes });
  return {
    component,
    items: component.find('tbody tr')
  };
}

describe('index/modules/Cart/ShoppingCart/components/PaymentPlanDetail', () => {
  it('should render correctly', () => {
    const { component, items } = setup();
    expect(component.length).toEqual(1);
    expect(items.length).toEqual(initialState.paymentPlan.payment_schedule.length + 1);
  });
  it('should render footer correctly', () => {
    const { component } = setup();
    expect(component.find('.transaction__gather').text()).toContain(initialState.paymentPlan.total_due_amount);
  });
});
