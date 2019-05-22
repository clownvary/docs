import React from 'react';
import { mountWithIntl } from 'utils/enzymeWithIntl';
import context, { childContextTypes } from 'utils/context';
import { FormattedNumber } from 'shared/translation/formatted';
import _map from 'lodash/map';
import TransactionFeeDetail from 'index/modules/Cart/ShoppingCart/components/Transactions/TransactionFeeDetail';
import messages from 'source/en-US';
import jsonTransactions from 'Cart/ShoppingCart/get_transactions.json';

const intl = {
  messages
};
const { body: { participants } } = jsonTransactions;
const lastTransctionIndex = participants[0].transactions.length - 1;
const initialState = {
  intl,
  transaction: participants[0].transactions[0]
};
function setup(_state = initialState, _context = context) {
  const state = Object.assign(initialState, _state);
  const component = mountWithIntl(<TransactionFeeDetail hasExpanded {...state} />,
  { context: _context, childContextTypes });
  return {
    component
  };
}
function getNode(component, value) {
  return component.find(FormattedNumber).findWhere(n =>
        n.prop('numberStyle') === 'currency' && n.prop('currency') === 'USD' && n.prop('value') === value
     );
}

describe('index/modules/Cart/ShoppingCart/components/Transactions/TransactionFeeDetail', () => {
  it('should render percent correctly', () => {
    const tempTransaction = participants[0].transactions[1];
    _map(tempTransaction.primary_price_grid, (item) => {
      item.is_percentage_discount = true;
    });
    const { component } = setup({ transaction: tempTransaction });
    expect(component.find(FormattedNumber).findWhere(n => n.prop('numberStyle') === 'percent').length).toEqual(3);
    _map(tempTransaction.primary_price_grid, (item, index) => {
      item.is_percentage_discount = false;
      item.unit_price = index;
    });
    const { component: component1 } = setup({ transaction: tempTransaction });
    _map(tempTransaction.primary_price_grid, (item) => {
      const tempNode = getNode(component1, item.unit_price);
      expect(tempNode.length).toEqual(1);
    });
  });
  it('should render tbody correctly', () => {
    const tempTransaction = participants[0].transactions[1];
    tempTransaction.primary_price_grid = [undefined];
    const { component } = setup({ transaction: tempTransaction });
    expect(component.find('tbody').text()).toEqual('');
  });
  it('should render taxes correctly', () => {
    const tempTransaction = participants[0].transactions[1];
    tempTransaction.taxes = 'taxes10';
    const { component } = setup({ transaction: tempTransaction });
    const tempNode = getNode(component, tempTransaction.taxes);
    expect(tempNode.length).toEqual(1);
    tempTransaction.taxes = '';
    const { component: component1 } = setup({ transaction: tempTransaction });
    const tempNode1 = getNode(component1, tempTransaction.taxes);
    expect(tempNode1.length).toEqual(0);
  });
  it('should render deferredAmount correctly', () => {
    const tempTransaction = participants[0].transactions[1];
    tempTransaction.deferred_amount = '20';
    const { component } = setup({ transaction: tempTransaction });
    const tempNode = getNode(component, tempTransaction.deferred_amount);
    expect(tempNode.length).toEqual(1);
    tempTransaction.deferred_amount = 0;
    const { component: component1 } = setup({ transaction: tempTransaction });
    const tempNode1 = getNode(component1, tempTransaction.deferred_amount);
    expect(tempNode1.length).toEqual(0);
  });

  it('should render percent correctly when activity is package list type', () => {
    const tempTransaction = participants[0].transactions[lastTransctionIndex - 2];
    _map(tempTransaction.primary_price_grid, (item) => {
      item.is_percentage_discount = true;
    });
    const { component } = setup({ transaction: tempTransaction });
    expect(component.find(FormattedNumber).findWhere(n => n.prop('numberStyle') === 'percent').length).toEqual(4);
  });

  it('should render percent correctly when activity is transfer in type', () => {
    const tempTransaction = participants[0].transactions[lastTransctionIndex];
    _map(tempTransaction.primary_price_grid, (item) => {
      item.is_percentage_discount = true;
    });
    const { component } = setup({ transaction: tempTransaction });
    expect(component.find(FormattedNumber).findWhere(n => n.prop('numberStyle') === 'percent').length).toEqual(3);
  });

  it('should render tbody correctly when activity_transfer_out is not null and primary_price_grid = []', () => {
    const tempTransaction = participants[0].transactions[lastTransctionIndex];
    tempTransaction.primary_price_grid = [];
    tempTransaction.activity_transfer_out = {};
    tempTransaction.transaction_type = 3;

    const { component } = setup({ transaction: tempTransaction });
    const table = component.find('.an-simple-table');
    const transactionGather = component.find('.transaction__gather');

    expect(table.length).toEqual(0);
    expect(transactionGather.length).toEqual(0);
  });

  it('should render transactionTitle correctly when primary_price_grid is not null', () => {
    const tempTransaction = participants[0].transactions[lastTransctionIndex - 2];
    tempTransaction.description = 'test description';
    tempTransaction.transaction_type = 13;
    tempTransaction.primary_price_grid = [{}];

    const { component } = setup({ transaction: tempTransaction });
    const transactionTitle = component.find('.transaction__title');
    expect(transactionTitle.length).toEqual(4);
  });

  it('should render seat amout correctly when primary_price_grid is not null', () => {
    const tempTransaction = participants[0].transactions[lastTransctionIndex - 2];
    tempTransaction.description = 'test description';
    tempTransaction.transaction_type = 1;
    tempTransaction.transaction_qty = 10;

    const { component } = setup({ transaction: tempTransaction });
    const transactionGather = component.find('.transaction__gather');
    const seatGather = transactionGather.at(1);
    const span = seatGather.find('span');
    expect(span.at(0).text()).toEqual('Number of seats');
  });
});

