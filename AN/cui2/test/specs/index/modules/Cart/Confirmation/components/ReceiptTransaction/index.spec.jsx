import expect from 'expect';
import ReceiptTransaction from 'index/modules/Cart/Confirmation/components/ReceiptTransaction';
import React from 'react';
import { mountWithIntl } from 'utils/enzymeWithIntl';
import messages from 'source/en-US';
import context, { childContextTypes } from 'utils/context';


const intl = {
  messages
};

const initialState = {
  intl,
  isNameUnspecified: true,
  transactions: {
    description: 'ABC',
    item_descriptions: [
      {
        name: 'Aone',
        value: 'Bone'
      },
      {
        name: 'Atwo',
        value: 'Btwo'
      }
    ],
    due_now: 10,
    has_payment_plan: true,
    is_recurring: true,
    deferred_amount: 5,
    transaction_type: 15,
    activity_transfer_out: {}
  }
};
function setup(_state = initialState, _context = context, isLastOne = false) {
  const state = Object.assign(initialState, _state);
  const component = mountWithIntl(
    <ReceiptTransaction
      isLastOne={isLastOne}
      transactions={state.transactions}
      isNameUnspecified={state.isNameUnspecified}
    />,
    { context: _context, childContextTypes }
  );
  return {
    component,
    receiptContentBlock: component.find('.receipt__content__block'),
    receiptContentTitle: component.find('receipt__content__title'),
    transactionDetail: component.find('.transaction-detail'),
    receiptContentSub: component.find('.receipt__content__sub'),
    receiptContentSubDescription: component.find('.receipt__content__sub__description'),
    dspKey: component.find('.dsp-key'),
    receiptContentSubPlan: component.find('.receipt__content--subplan'),
    receiptRecurring: component.find('.receipt__content--recurring'),
    receiptColon: component.find('.receipt-colon'),
    receiptLine: component.find('.receipt__line'),
    NameUnspecified: component.find('.transaction-detail__name-unspecified')
  };
}

describe('index/modules/Cart/Confirmation/components/ReceiptTransaction', () => {
  it('Should render receiptContentBlock', () => {
    const { receiptContentBlock } = setup();
    expect(receiptContentBlock.length).toEqual(1);
  });

  it('Should render receiptContentSub', () => {
    const { receiptContentSub } = setup();
    expect(receiptContentSub.length).toEqual(1);
  });

  it('Should render receiptContentSubPlan', () => {
    const { receiptContentSubPlan } = setup();
    expect(receiptContentSubPlan.length).toEqual(1);
  });

  it('Should render NameUnspecified', () => {
    const newState = initialState;
    newState.isNameUnspecified = true;
    newState.transactions.transaction_type = 6;
    const { NameUnspecified } = setup(newState);
    expect(NameUnspecified.length).toEqual(1);
  });

  it('Should render receiptRecurring', () => {
    const { receiptRecurring } = setup();
    expect(receiptRecurring.length).toEqual(1);
  });

  it('Should render receiptLine', () => {
    const { receiptLine } = setup();
    expect(receiptLine.length).toEqual(1);
  });

  it('Should not render receiptContentSubPlan if hasPaymentPlan equal false', () => {
    const newState = initialState;
    newState.transactions.has_payment_plan = false;
    const { receiptContentSubPlan } = setup(newState);
    expect(receiptContentSubPlan.length).toEqual(0);
  });

  it('Should not render receiptRecurring if isRecurring equal false', () => {
    const newState = initialState;
    newState.transactions.is_recurring = false;
    const { receiptRecurring } = setup(newState);
    expect(receiptRecurring.length).toEqual(0);
  });

  it('Should not render receiptColon if no itemDescriptions value', () => {
    const newState = initialState;
    newState.transactions.item_descriptions = [
      {
        name: 'Aone',
        value: ''
      },
      {
        name: 'Atwo',
        value: ''
      }
    ];
    const { receiptColon } = setup(newState);
    expect(receiptColon.length).toEqual(0);
  });

  it('Should not render receiptContentSubDescription if no itemDescriptions item data', () => {
    const newState = initialState;
    newState.transactions.item_descriptions = [null];
    const { receiptContentSubDescription } = setup();
    expect(receiptContentSubDescription.length).toEqual(0);
  });

  it('Should not render receiptContentSub if no itemDescriptions data', () => {
    const newState = initialState;
    newState.transactions.item_descriptions = null;
    const { receiptContentSub } = setup();
    expect(receiptContentSub.length).toEqual(0);
  });

  it('Label should be Activity1 WITHDRAWAL if transaction_type = 12', () => {
    const newState = initialState;
    newState.transactions.transaction_type = 12;
    const { transactionDetail } = setup(newState);
    const labelTxt = transactionDetail.text();
    expect(labelTxt).toEqual('Activity1 WITHDRAWAL');
  });

  it('Label should be Activity1 TRANSFER if transaction_type = 13', () => {
    const newState = initialState;
    newState.transactions.transaction_type = 13;
    const { transactionDetail } = setup(newState);
    const labelTxt = transactionDetail.text();
    expect(labelTxt).toEqual('Activity1 TRANSFER');
  });

  it('Label should be Gift  Cardz if transaction_type = 6', () => {
    const newState = initialState;
    newState.transactions.transaction_type = 6;
    const { transactionDetail } = setup(newState);
    const labelTxt = transactionDetail.text();
    expect(labelTxt).toEqual('Gift CardZ');
  });

  it('Label should be empty if transaction_type is incorrect', () => {
    const newState = { ...initialState };
    newState.transactions.transaction_type = 116;
    const { transactionDetail } = setup(newState);
    const labelTxt = transactionDetail.text();
    expect(labelTxt).toEqual('');
  });

  it('Label should be Gift  Cardz if transaction_type = 3', () => {
    const newState = { ...initialState };
    newState.transactions.transaction_type = 3;
    const { transactionDetail } = setup(newState);
    const labelTxt = transactionDetail.text();
    expect(labelTxt).toEqual('Activity1 TRANSFER');
  });

  it('Label should be empty if transaction_type is incorrect', () => {
    const newState = { ...initialState };
    newState.transactions.activity_transfer_out = undefined;
    const { component } = setup(newState);
    const labelTxt = component.find('.receipt__content__title--left').at(0).text();
    expect(labelTxt).toEqual(newState.transactions.description);
  });

  it('isLastOne', () => {
    const newState = { ...initialState };
    const { component } = setup(newState, undefined, true);
    const splitLine = component.find('.an-split-line');
    expect(splitLine.length).toEqual(0);
  });
});
