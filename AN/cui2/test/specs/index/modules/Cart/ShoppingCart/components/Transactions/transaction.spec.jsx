import React from 'react';
import { fromJS } from 'immutable';
import { mountWithIntl } from 'utils/enzymeWithIntl';// eslint-disable-line
import context, { childContextTypes } from 'utils/context';// eslint-disable-line
import Label from 'react-base-ui/lib/components/Label';
import Checkbox from 'react-base-ui/lib/components/Checkbox';

import _map from 'lodash/map';
import { Transaction } from 'index/modules/Cart/ShoppingCart/components/Transactions/Transaction';

import jsonTransactions from 'Cart/ShoppingCart/get_transactions.json';// eslint-disable-line
import selfMessages from 'index/modules/Cart/ShoppingCart/components/Transactions/translations';

jest.mock('lodash/debounce', () => jest.fn(method => method));

const { body: { participants } } = jsonTransactions;
const initialState = {
  isLastOne: false,
  transaction: participants[0].transactions[0],
  expandedStatus: fromJS({}),
  hasExpandedStatus: fromJS({}),
  paymentPlan: [{
    reno: 123,
    total_due_amount: 864.5,
    payment_schedule: [
      {
        count: '1/5',
        due_date: '29 Sep 2019, Sun',
        due_amount: 133
      }]
  }]
};
function setup(_state = initialState, isNameUnspecified = false, _context = context) {
  const action = {
    showDeleteTransactionAlert: jest.fn(),
    toggleTransactionExpandStatus: jest.fn(),
    fetchTransactionPaymentPlanAsyncAction: jest.fn(),
    enablePaymentPlanAction: jest.fn()
  };
  const state = Object.assign(initialState, _state);
  const component = mountWithIntl(<Transaction isNameUnspecified={isNameUnspecified} {...state} {...action} />,
  { context: _context, childContextTypes });

  return {
    component,
    collapse: component.find('.transaction-header__collapse'),
    action
  };
}

describe('index/modules/Cart/ShoppingCart/components/Transactions/Transaction', () => {
  it('should render detailUrl correctly', () => {
    const tempTransaction = participants[0].transactions[0];
    const detailUrl = tempTransaction.detail_url;
    tempTransaction.detailUrl = 'test';
    const { component: component1 } = setup({ transaction: tempTransaction });
    expect(component1.find(`[href="${detailUrl}"]`).length).toEqual(1);
  });

  it('should trigger showDeleteTransactionAlert correctly', () => {
    const tempTransaction = participants[0].transactions[0];
    tempTransaction.transaction_url = '';
    const { component, action } = setup({ transaction: tempTransaction });
    const aBtn = component.find('.operation__actions').find('a');
    action.showDeleteTransactionAlert.mockReturnValue(Promise.resolve());
    aBtn.simulate('click');
    expect(action.showDeleteTransactionAlert).toHaveBeenCalled();
  });

  it('should render collapse correctly', () => {
    const tempTransaction = participants[0].transactions[0];
    tempTransaction.primary_price_grid = [1, 2];
    const { component } = setup({ transaction: tempTransaction });
    const collapse1 = component.find('.transaction-header__collapse');
    expect(collapse1.length).toEqual(1);
  });


  it('should not render collapse correctly', () => {
    const tempTransaction = participants[0].transactions[0];
    tempTransaction.primary_price_grid = [];
    tempTransaction.sub_transactions = [];
    tempTransaction.refund_price_grid = [];
    const { component } = setup({ transaction: tempTransaction });
    const collapse2 = component.find('.transaction-header__collapse');
    expect(collapse2.length).toEqual(1);
  });


  it('should trigger toggleTransactionExpandStatus', () => {
    const tempTransaction = participants[0].transactions[0];
    tempTransaction.primary_price_grid = [1, 2];
    const { collapse, action } = setup({ transaction: tempTransaction });
    collapse.simulate('click');
    expect(action.toggleTransactionExpandStatus).toHaveBeenCalled();
  });

  it('should render itemDescriptions correctly', () => {
    const tempTransaction = participants[0].transactions[0];
    tempTransaction.item_descriptions = [{ key: 'test1', value: 'A' }, { key: 'test2', value: 'B' }];
    const { component: component1 } = setup({ transaction: tempTransaction });
    _map(tempTransaction.item_descriptions, (item) => {
      expect(component1.text().match(`${item.key}: ${item.value}`)).toBeTruthy();
    });

    tempTransaction.item_descriptions = [{ key: 'test1', value: null }, { key: 'test2', value: null }];
    const { component: component2 } = setup({ transaction: tempTransaction });
    _map(tempTransaction.item_descriptions, (item) => {
      expect(component2.text().match(`${item.key}`)).toBeTruthy();
    });

    tempTransaction.item_descriptions = [];
    const { component: component3 } = setup({ transaction: tempTransaction });
    _map(tempTransaction.item_descriptions, (item) => {
      expect(component3.text().match(`${item.key}: ${item.value}`)).tobeFalsy();
    });
  });

  it('should render transaction-body correctly', () => {
    const tempTransaction = participants[0].transactions[1];

    tempTransaction.primary_price_grid = [1, 2];
    const { component } = setup({
      transaction: tempTransaction,
      expandedStatus: { 1324083029: true },
      hasExpandedStatus: fromJS({})
    });

    expect(component.find('.transaction-body').length).toEqual(1);
    component.setProps({ expandedStatus: { 1324083029: false } });
    expect(component.find('.transaction-body').length).toEqual(0);
  });

  it('should render warning label correctly', () => {
    const tempTransaction = participants[0].transactions[1];
    tempTransaction.online_entry_completed = false;
    const { component } = setup({ transaction: tempTransaction });
    expect(component.find(Label).findWhere(n => n.prop('type') === 'warning').length).toEqual(1);
  });

  it('should render success label correctly', () => {
    const tempTransaction = participants[0].transactions[0];
    tempTransaction.deferred_amount = 10;
    const { component } = setup({ transaction: tempTransaction });
    expect(component.find(Label).findWhere(n => n.prop('type') === 'success').length).toEqual(1);
  });

  it('should render success label correctly when hasPaymentPlan', () => {
    const tempTransaction = participants[0].transactions[2];
    tempTransaction.deferred_amount = 10;
    const { component } = setup({ transaction: tempTransaction });
    expect(component.find(Label).findWhere(n => n.prop('type') === 'success').length).toEqual(1);
  });

  it('should render split-line correctly', () => {
    const { component } = setup({ isLastOne: false });
    expect(component.find('.an-split-line').length).toEqual(1);

    component.setProps({ isLastOne: true });
    expect(component.find('.an-split-line').length).toEqual(0);
  });

  it('Should not render header include a tag when detail_url is empty string ', () => {
    const tempTransaction = participants[0].transactions[0];
    tempTransaction.detail_url = '';
    const { component } = setup({ transaction: tempTransaction });
    const lastHeader = component.find('.transaction-header');
    expect(lastHeader.find('a').length).toEqual(1);
  });

  it('Should render transaction-footer__name-unspecified when it is a gift activity ', () => {
    const tempTransaction = participants[0].transactions[0];
    tempTransaction.detail_url = '';
    tempTransaction.transaction_type = 6;
    const { component } = setup({ transaction: tempTransaction }, true);
    const footer = component.find('.transaction-footer__name-unspecified');
    expect(footer.length).toEqual(1);
  });

  it('Should not render transaction-header__collapse a tag when no expandable', () => {
    const tempTransaction = participants[0].transactions[1];
    tempTransaction.primary_price_grid = [];
    const { component } = setup({ transaction: tempTransaction });
    const aLink = component.find('.transaction-header__collapse');
    expect(aLink.length).toEqual(0);
  });

  describe('UT for WCAG', () => {
    it('should have aira-label value is "edit tracsaction" ', () => {
      const tempTransaction = participants[0].transactions[0];
      tempTransaction.transaction_url = 'test';
      const { component } = setup({ transaction: tempTransaction });
      const expectText = selfMessages.editTransactionAriaLabelText.defaultMessage;
      expect(component.find('a').filterWhere(n => n.prop('aria-label') === expectText).length).toEqual(1);
    });

    it('should have aira-label value is "delete tracsaction" ', () => {
      const tempTransaction = participants[0].transactions[0];
      tempTransaction.transaction_url = 'test';
      const { component } = setup({ transaction: tempTransaction });
      const expectText = selfMessages.deleteTransactionAriaLabelText.defaultMessage;
      expect(component.find('a').filterWhere(n => n.prop('aria-label') === expectText).length).toEqual(1);
    });
  });

  it('should trigger enablePaymentPlanAction correctly ', () => {
    const tempTransaction = participants[0].transactions[1];
    const { component, action } = setup({ transaction: tempTransaction });
    const checkBox = component.find(Checkbox);
    expect(checkBox.length).toEqual(1);
    checkBox.prop('onChange')({ target: { checked: false } });
    expect(action.enablePaymentPlanAction).toHaveBeenCalledWith(tempTransaction.reno, false);
  });
});

