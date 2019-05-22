import expect from 'expect';
import { ReceiptSummary } from 'index/modules/Cart/Confirmation/components/ReceiptSummary';
import React from 'react';
import { mountWithIntl } from 'utils/enzymeWithIntl';
import context, { childContextTypes } from 'utils/context';
import messages from 'source/en-US';
/* eslint-enable*/
const intl = {
  messages
};

const initialState = {
  orderSummary: {
    sub_total: 1,
    processing_fee: 2,
    gift_card_amount: 3,
    payment_from_account: 4,
    payment_plan_deferred: 5,
    due_now: 6,
    taxes: 7
  },
  payOnAccount: [
    {
      item_name: 'Paid on Account Balance',
      due_now: 10,
      receipt_numbers: [{
        key: 1000386.012,
        value: 'MTAwMDM4Ni4wMTI='
      },
      {
        key: 1000387.012,
        value: 'MTAwMDM4Ny4wMTI='
      }]
    },
    {
      item_name: 'Paid on Tomtestcompany Account Balance',
      due_now: 10,
      receipt_numbers: [{
        key: 1000386.012,
        value: 'MTAwMDM4Ni4wMTI='
      },
      {
        key: 1000387.012,
        value: 'MTAwMDM4Ny4wMTI='
      }]
    }
  ],
  participants: [{
    first_name: 'Evan',
    last_name: 'Luo',
    item_number: 3,
    shorthand_name: 'EL',
    transactions: [{
      transaction_type: 15,
      item_name: '4 session (1 hour) personal training - 19170',
      item_descriptions: [],
      amount: 9,
      deferred_amount: 6.8,
      due_now: 15.8
    },
    {
      transaction_type: 5,
      item_name: 'Summer club',
      item_descriptions: [],
      amount: 15,
      deferred_amount: 6.88,
      due_now: 21.88
    }
    ]
  }]
};

function setup(_state = initialState, _context = context) {
  const state = Object.assign(initialState, _state);
  const component = mountWithIntl(
    <ReceiptSummary
      {...state}
      intl={intl}
    />,
    { context: _context, childContextTypes }
  );
  return {
    component,
    receiptHeader: component.find('.receipt-summary__header'),
    receiptTitle: component.find('.receipt__title')
  };
}

describe('index/modules/Cart/Confirmation/components/ReceiptSummary', () => {
  it('Should render receiptHeader', () => {
    const { receiptHeader } = setup();
    expect(receiptHeader.length).toEqual(1);
  });

  it('Should render receiptTitle', () => {
    const { receiptTitle } = setup();
    expect(receiptTitle.length).toEqual(1);
  });
});
