import expect from 'expect';
import ReceiptList from 'index/modules/Cart/Confirmation/components/ReceiptList';
import React from 'react';
import { shallow } from 'enzyme';
import context, { childContextTypes } from 'utils/context';

const initialState = [
  {
    first_name: 'Evan',
    last_name: 'Luo',
    item_number: 3,
    shorthand_name: 'EL',
    transactions: [
      {
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
  }
];

function setup(_state = initialState, _context = context) {
  const component = shallow(
    <ReceiptList participants={_state} />,
    { context: _context, childContextTypes }
  );
  return {
    component,
    receiptParticipants: component.find('.receipt__participants'),
    receiptListContent: component.find('.receipt-list__content'),
    receiptShortname: component.find('.receipt__shortname'),
    customerName: component.find('.customer_name'),
    receiptListContentRight: component.find('.receipt-list__content--right'),
    receiptBottomLine: component.find('.bottom-line')
  };
}

describe('index/modules/Cart/Confirmation/components/ReceiptList', () => {
  it('Should render receiptListContent', () => {
    const { receiptListContent } = setup();
    expect(receiptListContent.length).toEqual(1);
  });

  it('Should render receiptParticipants', () => {
    const { receiptParticipants } = setup(initialState);
    expect(receiptParticipants.length).toEqual(1);
  });

  it('Should render receiptListContentRight', () => {
    const { receiptListContentRight } = setup();
    expect(receiptListContentRight.length).toEqual(1);
  });

  it('Should not render  receiptListContentRight if no transactions data', () => {
    const newState = initialState;
    newState[0].transactions = null;
    const { receiptListContentRight } = setup(newState);
    expect(receiptListContentRight.length).toEqual(0);
  });

  it('Should render receiptShortname if no shorthand name', () => {
    const newState = initialState;
    newState[0].shorthand_name = '';
    const { receiptShortname } = setup(newState);
    expect(receiptShortname.length).toEqual(1);
  });

  it('Should render customerName if no first and last name', () => {
    const newState = initialState;
    newState[0].first_name = '';
    newState[0].last_name = '';
    const { customerName } = setup(newState);
    expect(customerName.length).toEqual(1);
  });

  it('Should not render receiptParticipants if no data', () => {
    const { receiptParticipants } = setup([]);
    expect(receiptParticipants.length).toEqual(0);
  });

  it('Should render receiptBottomLine', () => {
    const { receiptBottomLine } = setup();
    expect(receiptBottomLine.length).toEqual(1);
  });

  it('Should not render receiptBottomLine if no data', () => {
    const { receiptBottomLine } = setup([]);
    expect(receiptBottomLine.length).toEqual(0);
  });
});
