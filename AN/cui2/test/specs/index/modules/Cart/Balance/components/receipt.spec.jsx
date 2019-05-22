import { fromJS } from 'immutable';
import expect from 'expect';
import React from 'react';
import { mountWithIntl } from 'utils/enzymeWithIntl';
import context, { childContextTypes } from 'utils/context';
import { Receipt } from 'index/modules/Cart/Balance/components/receipt';
import balances from 'Cart/Balance/get_balances.json';

const summary = balances.body.outstanding_balance_smmary;
const balancesList = summary.outstanding_balances;
const intl = {
  messages: {
    'app.modules.cart.Balance.info': 'Outstanding balances for <strong>{customerName}</strong> as of {balanceDate}',
    'app.modules.cart.Balance.requireMinPaymentAmount': 'The required minimum payment of {requireMinPayment} will be needed to complete the online transaction.'
  }
};

const expectedInitialState = fromJS({
  outstandingBalances: fromJS(balancesList),
  subTotal: summary.sub_total,
  unpaidAmount: summary.unpaid_amount,
  outstandingAccountBalanceWarning: summary.outstanding_account_balance_warning,
  customerName: summary.customer_name,
  balanceDate: summary.balance_date,
  errors: fromJS({}),
  require: true,
  requireMinPaymentAmount: 0
});

function setup(state = expectedInitialState, isSm = false) {
  const actions = {
    fetchBalanceAction: expect.createSpy(),
    onValidateBalanceAction: expect.createSpy(),
    commitBalanceAsyncAction: expect.createSpy(),
    onClearBalanceInfoAction: expect.createSpy(),
    uiShowMessageAction: expect.createSpy(),
    onUpdateBalanceAction: expect.createSpy(),
    clearErrorStateAction: expect.createSpy()
  };


  const component = mountWithIntl(
    <Receipt
      intl={intl}
      balance={state}
      responsive={{ isSm }}
      {...actions}
    />, { context, childContextTypes });


  return {
    component,
    container: component.find('.module-balance'),
    actions
  };
}


describe('index/modules/Cart/Balance/components/receipt', () => {
  it('should render components successfull  ', () => {
    const { container, actions } = setup();
    const receipts = container.find('.module-balance__item');
    const info = container.find('.module-balance__info');
    const receiptError = container.find('.module-balance-error');

    expect(receiptError.length).toEqual(0);
    expect(container.length).toEqual(1);
    expect(receipts.length).toEqual(2);
    expect(info.length).toEqual(1);
    expect(actions.clearErrorStateAction).toHaveBeenCalled();
  });

  it('should call onUpdateBalanceAction when input proper value.', () => {
    const { container, actions } = setup();
    const input = container.find('input').first();
    input.node.value = 7;
    input.simulate('blur');
    expect(actions.onUpdateBalanceAction).toHaveBeenCalled();
  });

  it('should call onUpdateBalanceAction when input max value.', () => {
    const { container, actions } = setup();
    const input = container.find('input').first();
    input.node.value = 17;
    input.simulate('blur');
    expect(actions.onUpdateBalanceAction).toHaveBeenCalled();
  });

  it('should call onUpdateBalanceAction when input min value.', () => {
    const { container, actions } = setup();
    const input = container.find('input').first();
    input.node.value = 1;
    input.simulate('blur');
    expect(actions.onUpdateBalanceAction).toHaveBeenCalled();
  });

  it('should call commitBalanceAsyncAction when clicking next button.', () => {
    const { container, actions } = setup();
    const nextButton = container.find('.btn').first();
    nextButton.simulate('click');
    expect(actions.onValidateBalanceAction).toHaveBeenCalled();
  });

  it('should call commitBalanceAsyncAction and clear info when clicking next button.', () => {
    const balanceList = [
      {
        id: '6165',
        receipt_header_id: 0,
        encrypt_receipt_header_id: null,
        receipt_number: '1007442.005',
        issued_date: 'May 23, 2017',
        next_payment_date: 'Jul 23, 2017',
        original_balance: 11,
        current_balance: 11,
        amount_due_now: 11,
        pending_payment: 15,
        payment_amount_list: [
          11
        ],
        max: 11,
        min: 5,
        transaction_descriptions: null
      },
      {
        id: '8287',
        receipt_header_id: 0,
        encrypt_receipt_header_id: null,
        receipt_number: '3002737.005',
        issued_date: 'May 23, 2017',
        next_payment_date: 'Jul 23, 2017',
        original_balance: 505.75,
        current_balance: 200,
        amount_due_now: 200,
        pending_payment: 260,
        payment_amount_list: [
          200
        ],
        max: 180,
        min: 50,
        transaction_descriptions: null
      }
    ];

    const state = fromJS({
      outstandingBalances: fromJS(balanceList),
      subTotal: summary.sub_total,
      unpaidAmount: summary.unpaid_amount,
      outstandingAccountBalanceWarning: summary.outstanding_account_balance_warning,
      customerName: summary.customer_name,
      balanceDate: summary.balance_date,
      errors: fromJS({ [balanceList[0].id]: 'Invalid bank account type', [balanceList[1].id]: '8287 Invalid bank account type'
      })
    });
    const { container, actions } = setup(state, true);
    const messageBoard = container.find('.message-board');
    const nextButton = container.find('.btn').first();
    nextButton.simulate('click');
    expect(messageBoard.length).toEqual(0);
    expect(actions.onValidateBalanceAction).toHaveBeenCalled();
  });

  it('should call commitBalanceAsyncAction and clear info when clicking next button and isSM is false.', () => {
    const balanceList = [
      {
        id: '6165',
        receipt_header_id: 0,
        encrypt_receipt_header_id: null,
        receipt_number: '1007442.005',
        issued_date: 'May 23, 2017',
        next_payment_date: 'Jul 23, 2017',
        original_balance: 11,
        current_balance: 11,
        amount_due_now: 11,
        pending_payment: 15,
        payment_amount_list: [
          11
        ],
        max: 11,
        min: 5,
        transaction_descriptions: null
      },
      {
        id: '8287',
        receipt_header_id: 0,
        encrypt_receipt_header_id: null,
        receipt_number: '3002737.005',
        issued_date: 'May 23, 2017',
        next_payment_date: 'Jul 23, 2017',
        original_balance: 505.75,
        current_balance: 200,
        amount_due_now: 200,
        pending_payment: 260,
        payment_amount_list: [
          200
        ],
        max: 180,
        min: 50,
        transaction_descriptions: null
      }
    ];

    const state = fromJS({
      outstandingBalances: fromJS(balanceList),
      subTotal: summary.sub_total,
      unpaidAmount: summary.unpaid_amount,
      outstandingAccountBalanceWarning: summary.outstanding_account_balance_warning,
      customerName: summary.customer_name,
      balanceDate: summary.balance_date,
      errors: fromJS({ [balanceList[0].id]: 'Invalid bank account type', [balanceList[1].id]: '8287 Invalid bank account type'
      })
    });
    const { container, actions } = setup(state);
    const messageBoard = container.find('.message-board');
    const nextButton = container.find('.btn').first();
    nextButton.simulate('click');
    expect(messageBoard.length).toEqual(0);
    expect(actions.onValidateBalanceAction).toHaveBeenCalled();
  });

  it('should call componentDidMount when match require min payment', () => {
    const { component, container } = setup();
    const messageBox = container.find('.message-box');
    component.setState({ outstandingBalances: fromJS(summary.outstanding_balances) });
    expect(messageBox.length).toEqual(0);
  });

  it('should call componentDidMount when do not match require min payment', () => {
    const list = summary.outstanding_balances;
    list[1].pending_payment = 50;
    list[1].id = '8287';
    const state = fromJS({
      outstandingBalances: fromJS(list),
      subTotal: summary.sub_total,
      unpaidAmount: summary.unpaid_amount,
      outstandingAccountBalanceWarning: summary.outstanding_account_balance_warning,
      customerName: summary.customer_name,
      balanceDate: summary.balance_date,
      errors: fromJS({
        6165: 'Invalid bank account type',
        8287: '8287 Invalid bank account type'
      }),
      require: true,
      requireMinPaymentAmount: 100
    });
    const { component, container } = setup(state);
    const messageBox = container.find('.message-box');
    component.setState({ outstandingBalances: fromJS(list) });
    expect(messageBox.length).toEqual(0);
  });
  it('should trigger uiShowMessageAction', () => {
    const { actions } = setup();
    expect(actions.uiShowMessageAction).toHaveBeenCalled();
  });
});
