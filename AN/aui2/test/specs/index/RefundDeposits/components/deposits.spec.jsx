import React from 'react';
import {
  mount
} from 'enzyme';

import DataGrid from 'shared/components/DataGrid';
import Checkbox from 'react-base-ui/lib/components/Checkbox';
import Deposits from 'index/RefundDeposits/components/Deposits';

const initialState = {
  labelTotalDeposit: '$25.01',
  deposits: [
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
      holidayRatePairReceiptDetailID: 2
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
      holidayRatePairReceiptDetailID: 1
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
    <Deposits
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

describe('index -> Refund Deposits -> components -> deposits', () => {
  it('should render correctly with deposits.', () => {
    const {
      DepositTable,
      Checkboxes,
      labelAmount,
      state,
      actions
    } = setup();

    expect(DepositTable.length).toEqual(1, `Deposit Table length is ${DepositTable.length}, expect is 1`);
    expect(Checkboxes.length).toEqual(state.deposits.length,
    `There are ${Checkboxes.length} checkboxes, expect is ${state.deposits.length}`);
    expect(labelAmount.text()).toEqual(state.labelTotalDeposit);
    Checkboxes.last().find('input').simulate('change');
    expect(actions.onSelect).toHaveBeenCalled();
    expect(actions.updateFeeTaxAndDiscount).toHaveBeenCalled();
  });

  it('should render correctly with no deposits.', () => {
    const {
      DepositTable,
      component
    } = setup({
      deposits: []
    });

    expect(DepositTable.length).toEqual(0, `Deposit Table length is ${DepositTable.length}, expect is 0`);
    expect(component.text()).toContain('No deposits to refund.');
  });
});
