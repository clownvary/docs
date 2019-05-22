import React from 'react';
import { mount } from 'enzyme';
import RentalChargesSummary from 'index/PermitContract/components/RentalChargesSummary';

const mockData = {
  rental_fees: 1,
  taxes: 0,
  discounts: 0,
  deposits: 0,
  deposits_taxes: 0,
  deposits_discounts: 0,
  refunds: 0,
  charge_adjustment_for_refund: -9,
  total_payments: 1,
  balance: 0,
  total_rental_fees: 1
};

const props = {
  chargeSummary: mockData
};

const setup = initProps => mount(<RentalChargesSummary {...initProps} />);

it('RentalChargesSummary should render without errors', () => {
  const component = setup(props);

  expect(component).toBeTruthy();
  expect(component.find('.charges-summary')).toHaveLength(1);
  expect(component.find('.an-property-list__item')).toHaveLength(9);
});

it('RentalChargesSummary no charge adjustment for refund should render without errors', () => {
  const taxList = [{
    name: "tax1",
    amount: 18.18
  }, {
    name: "tax2",
    amount: 18.18
  }, {
    name: "tax323@32~()*&^^&#@^&**$asdfasdfasdfasdfasdfasdfa&",
    amount: 18.18
    },
  ]
  const mockDataOne = Object.assign({}, mockData, { charge_adjustment_for_refund: 0, tax_list: taxList });

  const propsOne = {
    chargeSummary: mockDataOne
  };
  const component = setup(propsOne);
  expect(component).toBeTruthy();
  expect(component.find('.an-property-list__item')).toHaveLength(11);
});
