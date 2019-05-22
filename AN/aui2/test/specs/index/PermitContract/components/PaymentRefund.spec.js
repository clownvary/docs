import React from 'react';
import { mount } from 'enzyme';
import PaymentRefund from 'index/PermitContract/components/PaymentRefund';

const paymentRefunds = [
  {
    "applied_amount": 1111.00,
    "charge_amount": 0,
    "charge_name": "3 days fee",
    "event_name": "2017 JUN04 Party#4 #950",
    "receipt_number": 1001210.069,
    "resource_name": "*lillian_facility",
    "transaction_date": "3 Jul 2017"
  },
  {
    "applied_amount": -1111.00,
    "charge_amount": 0,
    "charge_name": "3 days fee refund",
    "event_name": "2017 JUN04 Party#4 #950",
    "receipt_number": 1001210.068,
    "resource_name": "",
    "transaction_date": "3 Jul 2017"
  }
];

const setup = props => mount(<PaymentRefund {...props} />);

it('PaymentRefund should render without errors', () => {
  const component = setup({ paymentRefunds });

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

  expect(component.find('table.table.an-table.payment-refund-table')).toHaveLength(1);

  const rows = component.find('tr');
  expect(rows).toHaveLength(3);
  expect(rows.at(0).find('th')).toHaveLength(6);
  expect(rows.at(1).find('td')).toHaveLength(6);
  expect(rows.at(1).find('td').at('5').text()).toEqual('$1,111.00');
  expect(rows.at(2).find('td').at('5').text()).toEqual('-$1,111.00');
});
