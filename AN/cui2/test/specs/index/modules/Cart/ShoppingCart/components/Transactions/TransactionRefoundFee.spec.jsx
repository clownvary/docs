import React from 'react';
import { mountWithIntl } from 'utils/enzymeWithIntl';
import context, { childContextTypes } from 'utils/context';
import { FormattedNumber } from 'shared/translation/formatted';
import _map from 'lodash/map';
import TransactionRefoundFee from 'index/modules/Cart/ShoppingCart/components/Transactions/TransactionRefoundFee';
import messages from 'source/en-US';
import jsonTransactions from 'Cart/ShoppingCart/get_transactions.json';

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
  const component = mountWithIntl(<TransactionRefoundFee {...state} />,
  { context: _context, childContextTypes });
  return {
    component
  };
}

describe('index/modules/Cart/ShoppingCart/components/Transactions/TransactionRefoundFee', () => {
  it('should render percent correctly when activity_transfer_out is not null', () => {
    const tempTransaction = participants[0].transactions[lastTransctionIndex];
    _map(tempTransaction.primary_price_grid, (item) => {
      item.is_percentage_discount = true;
    });
    const { component } = setup({ transaction: tempTransaction });
    expect(component.find(FormattedNumber).findWhere(n => n.prop('numberStyle') === 'percent').length).toEqual(0);
  });
  it('should render tbody correctly when activity_transfer_out is not null', () => {
    const tempTransaction = participants[0].transactions[lastTransctionIndex];
    tempTransaction.primary_price_grid = [undefined];
    const { component } = setup({ transaction: tempTransaction });
    expect(component.find('tbody').text()).toEqual('tom qinTo Account$0.00');
  });

  it('should render percent correctly when activity_transfer_out is null', () => {
    const tempTransaction = participants[0].transactions[lastTransctionIndex - 1];
    _map(tempTransaction.primary_price_grid, (item) => {
      item.is_percentage_discount = true;
    });
    const { component } = setup({ transaction: tempTransaction });
    expect(component.find(FormattedNumber).findWhere(n => n.prop('numberStyle') === 'percent').length).toEqual(0);
  });

  it('should render tbody correctly when activity_transfer_out is null', () => {
    const tempTransaction = participants[0].transactions[lastTransctionIndex - 1];
    tempTransaction.activity_transfer_out = null;
    tempTransaction.final_refund = -10;
    const { component } = setup({ transaction: tempTransaction });
    expect(component.find('tbody').text()).toEqual('tom qinTo Account$34.00');
  });

  it('should render tbody correctly when activity_transfer_out is not null and refund_fee_summary_grid = [undefined]', () => {
    const tempTransaction = participants[0].transactions[lastTransctionIndex];
    tempTransaction.primary_price_grid = [undefined];
    tempTransaction.activity_transfer_out.refund_fee_summary_grid = [undefined];
    const { component } = setup({ transaction: tempTransaction });
    const table = component.find('.an-simple-table');
    expect(table.length).toEqual(1);
  });

  it('should render tbody correctly when activity_transfer_out is not null and refund_fee_summary_grid = []', () => {
    const tempTransaction = participants[0].transactions[lastTransctionIndex];
    tempTransaction.primary_price_grid = [undefined];
    tempTransaction.activity_transfer_out.refund_fee_summary_grid = [];
    tempTransaction.activity_transfer_out.refund_fee = 0;
    tempTransaction.activity_transfer_out.final_refund = -100;

    const { component } = setup({ transaction: tempTransaction });
    const table = component.find('.an-simple-table');
    const transactionGather = component.find('.transaction__gather');

    expect(table.length).toEqual(0);
    expect(transactionGather.length).toEqual(2);
  });

  it('should render refundFee correctly when activity_transfer_out is null', () => {
    const tempTransaction = participants[0].transactions[lastTransctionIndex - 1];
    tempTransaction.activity_transfer_out = null;
    tempTransaction.refund_fee = null;
    const { component } = setup({ transaction: tempTransaction });
    expect(component.text()).not.toContain('RefoundFee');
  });
  it('should render refundPriceGrid correctly when activity_transfer_out is null', () => {
    const tempTransaction = participants[0].transactions[lastTransctionIndex - 1];
    tempTransaction.activity_transfer_out = null;
    tempTransaction.refund_fee_summary_grid = [];
    const { component } = setup({ transaction: tempTransaction });
    expect(component.find('.an-simple-table').length).toEqual(0);
  });
});

