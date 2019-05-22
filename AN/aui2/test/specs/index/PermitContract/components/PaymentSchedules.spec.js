import React from 'react';
import { mount } from 'enzyme';
import PaymentSchedules from 'index/PermitContract/components/PaymentSchedules';

const paymentSchedules = {
  original_balance: 100,
  schedules: [
    {
      due_date: '25 Jul 2017',
      amount: 40,
      paid: 40,
      withdrawn_adjustment: 0,
      balance: 0
    },
    {
      due_date: '28 Jul 2017',
      amount: 20,
      paid: 0,
      withdrawn_adjustment: 0,
      balance: 20
    }
  ],
  current_balance: 60
};

const setup = props => mount(<PaymentSchedules {...props} />);

it('paymentSchedules should render without errors', () => {

  const component = setup({ paymentSchedules });
  expect(component).toBeTruthy();
  expect(component.find('.collapsed')).toHaveLength(1);

  const collapseIcon = component.find('.collapse-panel__title').find('i');
  collapseIcon.simulate('click');
  expect(component.find('.collapsed')).toHaveLength(0);

  const rows = component.find('tr');
  expect(rows).toHaveLength(3);
  expect(rows.at(0).find('th')).toHaveLength(5);
  expect(rows.at(1).find('td')).toHaveLength(5);
});
