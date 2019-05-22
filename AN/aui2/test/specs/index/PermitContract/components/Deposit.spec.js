import React from 'react';
import { mount } from 'enzyme';
import Deposit from 'index/PermitContract/components/Deposit';

const deposits = [
  {
    receipt_detail_id: 71575,
    charge_amount: 1200,
    amount_paid: 1200,
    charge_amount_no_tax: 1200,
    tax: 0,
    refunds: 0,
    balance: 0,
    event_name: '2017 Jun04 Event Party 2 #950',
    resource_name: '*lillian_facility',
    charge_name: '3 DAY fee'
  },
  {
    receipt_detail_id: 71779,
    charge_amount: 100,
    amount_paid: 100,
    charge_amount_no_tax: 100,
    tax: 0,
    refunds: 0,
    balance: 0,
    event_name: '2017 Jun04 Party_3 #950',
    resource_name: '*lillian_facility',
    charge_name: 'Claim One'
  }
];

const setup = props => mount(<Deposit {...props} />);

it('Deposit should render without errors', () => {
  const component = setup({ deposits });

  expect(component).toBeTruthy();

  const hiddenPanel = component.find('div.collapse-panel__body.hidden');
  expect(hiddenPanel).toHaveLength(1);

  const expandIcon = component.find('span.collapse-panel__title').at(0).find('i');
  expect(expandIcon).toHaveLength(1);

  jest.useFakeTimers();
  expandIcon.simulate('click');
  jest.runAllTicks();

  const expandPanel = component.find('div.collapse-panel__body.expanded');
  expect(expandPanel).toHaveLength(1);

  const table = component.find('table.table.an-table.deposit-table');
  expect(table).toHaveLength(1);

  const rows = component.find('tr');
  expect(rows).toHaveLength(3);
  expect(rows.at(0).find('th')).toHaveLength(8);
  expect(rows.at(1).find('td')).toHaveLength(8);
  expect(rows.at(1).find('td').at(3).text()).toEqual('$1,200.00');
  expect(rows.at(2).find('td').at(4).text()).toEqual('$0.00');
});
