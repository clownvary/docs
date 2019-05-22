import React from 'react';
import { mountWithIntl, shallowWithIntl } from 'utils/enzymeWithIntl';// eslint-disable-line
import context, { childContextTypes } from 'utils/context';// eslint-disable-line
import { FormattedNumber } from 'shared/translation/formatted';
import _map from 'lodash/map';
import TransactionGrid from 'index/modules/Cart/ShoppingCart/components/Transactions/TransactionGrid';
import messages from 'source/en-US';
import jsonTransactions from 'Cart/ShoppingCart/get_transactions.json';// eslint-disable-line

const intl = {
  messages
};
const { body: { participants } } = jsonTransactions;
const initialState = {
  intl,
  participants
};
const lastTransctionIndex = participants[0].transactions.length - 1;

function setup(_state = initialState, _context = context) {
  const state = Object.assign(initialState, _state);
  const component = mountWithIntl(<TransactionGrid {...state} />,
  { context: _context, childContextTypes });
  return {
    component
  };
}

describe('index/modules/Cart/ShoppingCart/components/Transactions/TransactionGrid', () => {
  it('should render percent correctly when activity is package lsit type', () => {
    const tempTransaction = participants[0].transactions[lastTransctionIndex];
    _map(tempTransaction.primary_price_grid, (item) => {
      item.is_percentage_discount = true;
    });
    const { component } = setup({ transaction: tempTransaction });
    expect(component.find(FormattedNumber).findWhere(n => n.prop('numberStyle') === 'percent').length).toEqual(3);
  });

  it('should render percent correctly when activity is withdraw type', () => {
    const tempTransaction = participants[0].transactions[lastTransctionIndex - 1];
    _map(tempTransaction.primary_price_grid, (item) => {
      item.is_percentage_discount = true;
    });
    const { component } = setup({ transaction: tempTransaction });
    expect(component.find(FormattedNumber).findWhere(n => n.prop('numberStyle') === 'percent').length).toEqual(0);
  });

  it('should render percent correctly when activity is normal type', () => {
    const tempTransaction = participants[0].transactions[0];
    _map(tempTransaction.primary_price_grid, (item) => {
      item.is_percentage_discount = true;
    });
    const { component } = setup({ transaction: tempTransaction });
    expect(component.find(FormattedNumber).findWhere(n => n.prop('numberStyle') === 'percent').length).toEqual(0);
  });
});

