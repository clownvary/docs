import React from 'react';
import { mount } from 'enzyme';

import Dropdown from 'react-base-ui/lib/components/Dropdown';
import InputNumeric from 'react-base-ui/lib/components/InputNumeric';
import ExtraFees from 'index/RefundDeposits/components/ExtraFees';

jest.mock('react-base-ui/lib/services/dialog', () => ({
  confirm: jest.fn().mockReturnValue(Promise.resolve())
}));

const initialState = {
  claimCharges: [{
    claim_charge_id: 1,
    claim_charge_name: 'Facility damage&gt;&lt;&amp;&#096;',
    claim_charge_amount: 10,
    id: 1,
    name: 'Facility damage><&`',
    text: 'Facility damage><&`',
    value: 1
  },
  {
    claim_charge_id: 2,
    claim_charge_name: 'Facility damage2&quot;test&quot;&#126;',
    claim_charge_amount: 11,
    id: 2,
    name: 'Facility damage2"test"~',
    text: 'Facility damage2"test"~',
    value: 2
  }
  ],
  canAddFee: true,
  labelTotalCharge: '$0.00',
  extraFees: [],
  deposits: []
};

const actions = {
  onCreate: jest.fn(),
  onUpdateClaimCharge: jest.fn(),
  onUpdateAmount: jest.fn(),
  onDelete: jest.fn(),
  updateFeeTaxAndDiscount: jest.fn()
};

const extraFessData = [
  {
    id: 1,
    claimChargeId: '',
    amount: '22',
    canEnterAmount: false,
    tax: 12,
    discount: 1
  },
  {
    id: 2,
    claimChargeId: '',
    amount: '',
    canEnterAmount: false
  },
  {
    id: 3,
    claimChargeId: '',
    amount: '',
    canEnterAmount: false
  },
  {
    id: 4,
    claimChargeId: 1,
    amount: 10,
    canEnterAmount: true
  }
]

function setup(defaultState) {
  const state = Object.assign({}, initialState, defaultState);

  const component = mount(
    <ExtraFees
      deposits={state.deposits}
      claimCharges={state.claimCharges}
      extraFees={state.extraFees}
      labelTotalCharge={state.labelTotalCharge}
      canAddFee={state.canAddFee}
      onCreate={actions.onCreate}
      onUpdateClaimCharge={actions.onUpdateClaimCharge}
      onUpdateAmount={actions.onUpdateAmount}
      onDelete={actions.onDelete}
      updateFeeTaxAndDiscount={actions.updateFeeTaxAndDiscount}
    />);

  return {
    component,
    container: component.find('.extrafees'),
    iconDiv: component.find('.addfee'),
    table: component.find('.extrafeestable'),
    rows: component.find('.extrafeesrow'),
    dropdowns: component.find(Dropdown),
    inputs: component.find(InputNumeric),
    deleteButtons: component.find('i.icon-trash'),
    labelAmount: component.find('.extraFees-total-amount'),
    actions,
    state
  };
}

describe('index -> Refund Deposits -> components -> extraFees', () => {

  it('should render correctly when canAddFee === false and has no deposits.', () => {
    const {
      container,
      iconDiv,
      table,
      component,
      actions
    } = setup({ canAddFee: false });
    expect(container.length).toEqual(1);
    expect(iconDiv.length).toEqual(1);
    expect(table.length).toEqual(0);
    expect(component.text()).toContain('Claim fees cannot be added when no deposits.');
    iconDiv.simulate('click');
    expect(actions.onCreate).not.toHaveBeenCalled();
  });

  it('should render correctly when has deposits and empty extraFees', () => {
    const {
      container,
      iconDiv,
      table,
      component,
      actions
    } = setup({
      deposits: [
        {
          name: 'deposit1><&',
          amount_paid: 10,
          id: 1,
          selected: true
        }
      ]
    });
    expect(container.length).toEqual(1);
    expect(iconDiv.length).toEqual(1);
    expect(table.length).toEqual(0);
    expect(component.text()).toContain('To deduct or withhold from a deposit, select the following fees.');
    iconDiv.simulate('click');
    expect(actions.onCreate).toHaveBeenCalled();
  });

  it('should render correctly when 4 extraFees', () => {
    const {
      container,
      iconDiv,
      table,
      rows,
      dropdowns,
      inputs,
      deleteButtons,
      labelAmount,
      actions,
      state,
      component
    } = setup({
      totalDeposit: 2,
      extraFees: extraFessData,
      deposits: [
        {
          name: 'deposit1><&',
          amount_paid: 10,
          id: 1,
          selected: true
        }
      ]
    });
    expect(container.length).toEqual(1);
    expect(iconDiv.length).toEqual(1);
    expect(table.length).toEqual(1);
    expect(rows.length).toEqual(4);
    expect(inputs.length).toEqual(4);
    expect(dropdowns.length).toEqual(4);
    expect(deleteButtons.length).toEqual(4);

    expect(labelAmount.first().text()).toEqual(state.labelTotalCharge);

    expect(inputs.first().html().indexOf('disabled') > -1).toEqual(true);
    expect(inputs.last().html().indexOf('disabled') > -1).toEqual(false);
    expect(inputs.last().node.value).toEqual(parseFloat(state.extraFees[3].amount));
    inputs.first().find('input').simulate('blur');
    expect(actions.updateFeeTaxAndDiscount).toHaveBeenCalled();
    component.setProps({
      totalDeposit: 0
    })
    dropdowns.at(0).node.props.onChange({ value: 1 })
    inputs.first().find('input').simulate('blur');
    deleteButtons.first().simulate('click');
    expect(actions.onDelete).toHaveBeenCalled();
    expect(actions.updateFeeTaxAndDiscount).toHaveBeenCalledTimes(2);
  });

  it('canAddFee equal to false should render without errors', () => {
    const {
      dropdowns,
      inputs
    } = setup({
      extraFees: extraFessData,
      canAddFee: false,
      deposits: [
        {
          name: 'deposit1><&',
          amount_paid: 10,
          id: 1,
          selected: true
        }
      ]
    });

    dropdowns.at(0).node.props.onChange({ value: 1 })
    inputs.at(0).node.props.onValueChange({ value: 1 })

    expect(actions.onUpdateClaimCharge).toHaveBeenCalled();
    expect(actions.onUpdateAmount).toHaveBeenCalled();
    expect(actions.updateFeeTaxAndDiscount).toHaveBeenCalled();
  });
});
