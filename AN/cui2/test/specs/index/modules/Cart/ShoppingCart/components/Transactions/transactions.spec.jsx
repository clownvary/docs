import React from 'react';
import { fromJS } from 'immutable';
import { shallow } from 'enzyme';
import merge from 'lodash/merge';

import { Transactions } from 'index/modules/Cart/ShoppingCart/components/Transactions/Transactions';

import jsonTransactions from 'Cart/ShoppingCart/get_transactions.json';// eslint-disable-line


const { body: { participants } } = jsonTransactions;
const initialState = {
  transactions: participants[0].transactions,
  paymentPlans: [{
    reno: 124,
    total_due_amount: 864.5,
    payment_schedule: [
      {
        count: '1/5',
        due_date: '29 Sep 2019, Sun',
        due_amount: 133
      }]
  }]
};
function setup(_state = initialState) {
  const actions = {
    confirmDelete: jest.fn(),
    setTransactionExpandStatus: jest.fn()
  };
  const state = merge({}, initialState, _state);
  const component = shallow(
    <Transactions
      transactions={state.transactions}
      expandedStatus={fromJS({})}
      hasExpandedStatus={fromJS({})}
      paymentPlans={state.paymentPlans}
      {...actions}
    />);
  return {
    component,
    trans: component.find('.transactions'),
    actions
  };
}

describe('index/modules/Cart/ShoppingCart/components/Transactions/Transactions', () => {
  it('should render transactions correctly', () => {
    const { trans } = setup();
    expect(trans.children().length).toEqual(participants[0].transactions.length);
  });

  it('should trigger confirmDelete', () => {
    const { actions, trans } = setup({ paymentPlans: null });

    trans.childAt(0).prop('showDeleteTransactionAlert')(2, 2);
    expect(actions.confirmDelete).toHaveBeenCalled();

    trans.childAt(0).prop('toggleTransactionExpandStatus')(2, 2);
    expect(actions.setTransactionExpandStatus).toHaveBeenCalled();
  });
});

