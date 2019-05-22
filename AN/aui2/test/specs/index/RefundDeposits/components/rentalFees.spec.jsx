import React from 'react';
import {
  mount
} from 'enzyme';

import DataGrid from 'shared/components/DataGrid';
import Checkbox from 'react-base-ui/lib/components/Checkbox';
import RentalFees from 'index/RefundDeposits/components/RentalFees';

const initialState = {
  labelTotalRentalFee: '$25.01',
  rentalFees: [
    {
      labelChargeAmount: '$10.00',
      enabled: true,
      receipt_detail_id: 1,
      charge_amount: 10,
      name: 'deposit1><&',
      charge_description: 'deposit1&gt;&lt;&amp;',
      amount_paid: 10,
      labelPaidAmount: '$10.00',
      id: 1,
      selected: true,
      refundMessage: "Unpaid payment plan for the Holiday Rates will be cancelled",
      holidayRatePairReceiptDetailID:2
    },
    {
      labelChargeAmount: '$10.00',
      enabled: true,
      receipt_detail_id: 2,
      charge_amount: 10,
      name: 'deposit2"`',
      charge_description: 'deposit2&quot;&#096;',
      amount_paid: 10,
      labelPaidAmount: '$10.00',
      id: 2,
      selected: true,
      refundMessage: "",
      holidayRatePairReceiptDetailID:1
    }
  ]
};

function setup(defaultState = initialState) {
  const state = Object.assign({}, initialState, defaultState);

  const actions = {
    onSelect: jest.fn(),
    updateFeeTaxAndDiscount: jest.fn()
  };

  const component = mount(
    <RentalFees
      {...actions}
      {...state}
    />);

  return {
    component,
    DepositTable: component.find(DataGrid),
    Checkboxes: component.find(Checkbox),
    labelAmount: component.find('.deposits-total-amount'),
    actions,
    state
  };
}

describe('index -> Refund Deposits -> components -> rentalFees', () => {
  it('should render correctly with rentalFees.', () => {
    const {
      DepositTable,
      Checkboxes,
      labelAmount,
      state,
      actions
    } = setup();

    expect(DepositTable.length).toEqual(1, `Deposit Table length is ${DepositTable.length}, expect is 1`);
    expect(Checkboxes.length).toEqual(state.rentalFees.length,
    `There are ${Checkboxes.length} checkboxes, expect is ${state.rentalFees.length}`);
    expect(labelAmount.text()).toEqual(state.labelTotalRentalFee);
    Checkboxes.last().find('input').simulate('change');
    expect(actions.onSelect).toHaveBeenCalled();
    expect(actions.updateFeeTaxAndDiscount).toHaveBeenCalled();
  });

  it('should render correctly with no rentalFees.', () => {
    const {
      DepositTable,
      component
    } = setup({
      rentalFees: []
    });

    expect(DepositTable.length).toEqual(0, `Deposit Table length is ${DepositTable.length}, expect is 0`);
    expect(component.text()).toContain('No fees to refund.');
  });
});
