import { fromJS } from 'immutable';
import React from 'react';
import expect from 'expect';
import { shallow } from 'enzyme';// eslint-disable-line
import { mountWithIntl } from 'utils/enzymeWithIntl';// eslint-disable-line
import { Transactions } from 'index/modules/Cart/ShoppingCart/components/Transactions';
import PayOnAccount from 'index/modules/Cart/ShoppingCart/components/Transactions/PayOnAccount';
import Participant from 'index/modules/Cart/ShoppingCart/components/Transactions/Participant';
import context, { childContextTypes } from 'utils/context';// eslint-disable-line

import jsonTransactions from 'Cart/ShoppingCart/get_transactions.json';// eslint-disable-line


const { body: { participants, pay_on_account: payOnAccount } } = jsonTransactions;
const initialState = fromJS({
  participants,
  payOnAccount,
  expandedStatus: fromJS({}),
  hasExpandedStatus: fromJS({})
});

function setup(transactions = initialState, _context = context) {
  const actions = {
    confirmDelete: expect.createSpy(),
    clearExpandStatustAction: expect.createSpy(),
  };
  const component = shallow(<Transactions transactions={transactions} {...actions} />,
    { context: _context, childContextTypes });
  return {
    component,
    account: component.find(PayOnAccount),
    parts: component.find(Participant),
    actions
  };
}

describe('index/modules/Cart/ShoppingCart/components/Transactions', () => {
  it('should render correctly', () => {
    const { parts } = setup();
    expect(parts.length).toEqual(participants.length);
  });

  it('should trigger confirmDelete', () => {
    const { actions, account } = setup();
    account.first().prop('showDeleteTransactionAlert')(2);
    expect(actions.confirmDelete).toHaveBeenCalledWith(2);
  });

  it('clearExpandStatustAction should be triggered when component be unmounted', () => {
    const { component, actions } = setup();
    component.unmount();
    expect(actions.clearExpandStatustAction).toHaveBeenCalled();
  });
});
