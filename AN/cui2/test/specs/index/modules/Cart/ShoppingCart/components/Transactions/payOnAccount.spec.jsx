import React from 'react';
import expect from 'expect';
import context, { childContextTypes } from 'utils/context';
import { shallowWithIntl } from 'utils/enzymeWithIntl';
import { PayOnAccount } from 'index/modules/Cart/ShoppingCart/components/Transactions/PayOnAccount';

import jsonTransactions from 'Cart/ShoppingCart/get_transactions.json';

const { body: { pay_on_account: payOnAccount } } = jsonTransactions;
const initialState = {
  index: 0,
  payOnAccountList: payOnAccount[0]
};

function setup(_state = initialState, _context = context) {
  const actions = {
    showDeleteTransactionAlert: expect.createSpy(),
    confirmBalanceDeleteAction: expect.createSpy()
  };
  const state = Object.assign(initialState, _state);
  const component = shallowWithIntl(<PayOnAccount {...state} {...actions} />,
    { context: _context, childContextTypes });
  return {
    component,
    payOnAccountPanel: component.find('.pay-on-account'),
    balances: component.find('.pay-on-account__balances'),
    payOnAccountEdit: component.find('.pay-on-account__edit'),
    payOnAccountDelete: component.find('.pay-on-account__delete'),
    actions
  };
}

describe('index/modules/Cart/ShoppingCart/components/PayOnAccount', () => {
  it('should render correctly', () => {
    const { payOnAccountPanel } = setup();
    expect(payOnAccountPanel.length).toEqual(1);
  });

  it('should not render balances if there is no receiptNumbers', () => {
    const newState = initialState;
    newState.payOnAccountList.receipt_numbers = [];
    newState.payOnAccountList.company_id = 10;
    const { balances } = setup(newState);
    expect(balances.length).toEqual(0);
  });

  it('should not render payOnAccountEdit if there is no transactionUrl', () => {
    const newState = initialState;
    newState.payOnAccountList.transaction_url = '';
    const { payOnAccountEdit } = setup(newState);
    expect(payOnAccountEdit.length).toEqual(0);
  });

  it('should trigger showDeleteTransactionAlert correctly', () => {
    const newState = initialState;
    newState.payOnAccountList.transaction_url = '';
    newState.payOnAccountList.company_id = 2;
    const { component, actions } = setup(newState);
    const aBtn = component.find('.pay-on-account__delete');
    aBtn.simulate('click');
    expect(actions.showDeleteTransactionAlert).toHaveBeenCalled();
  });

  it('should trigger confirmBalanceDeleteAction correctly', () => {
    const newState = initialState;
    newState.payOnAccountList.transaction_url = '';
    newState.payOnAccountList.company_id = 0;
    const { component, actions } = setup(newState);
    const aBtn = component.find('.pay-on-account__delete');
    aBtn.simulate('click');
    expect(actions.confirmBalanceDeleteAction).toHaveBeenCalled();
  });
});
