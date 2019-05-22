import expect from 'expect';
import ReceiptTotalAmount from 'index/modules/Cart/Confirmation/components/ReceiptTotalAmount';
import React from 'react';
import { shallow } from 'enzyme';
import context, { childContextTypes } from 'utils/context';

const initialState = {
  sub_total: 1,
  processing_fee: 2,
  gift_card_amount: 3,
  payment_from_account: 4,
  payment_plan_deferred: 5,
  due_now: 6,
  taxes: 7
};

function setup(_state = initialState, _context = context) {
  const state = Object.assign(initialState, _state);

  const component = shallow(
    <ReceiptTotalAmount orderSummary={state} />,
    { context: _context, childContextTypes }
  );
  return {
    component,
    receiptTotalAmountPannel: component.find('.receipt-total-amount__pannel'),
    receiptSubList: component.find('.receipt-sub__list'),
    receiptSubLabel: component.find('.receipt-sub--label'),
    receiptSubValue: component.find('.receipt-sub--value'),
    receiptTaxes: component.find('.receipt-sub__list--taxes'),
    receiptProcessingFee: component.find('.receipt-sub__list--convenience-fee'),
    receiptPaymentFromAccount: component.find('.receipt-sub__list--payment-from-account'),
    receiptPaymentPlanDeferred: component.find('.receipt-sub__list--payment-plan-deferred'),
    receiptGiftCardAmount: component.find('.receipt-sub__list--gift-card-amount'),
    receiptTotalRefund: component.find('.receipt-sub__list--total-refund'),
    receiptTotalAmount: component.find('.receipt-sub__list--total-amount')
  };
}

describe('index/modules/Cart/Confirmation/components/ReceiptTotalAmount', () => {
  it('Should render receiptTotalAmountPannel', () => {
    const { receiptTotalAmountPannel } = setup();
    expect(receiptTotalAmountPannel.length).toEqual(1);
  });

  it('Should render receiptSubList', () => {
    const { receiptSubList } = setup();
    expect(receiptSubList.length).toEqual(1);
  });

  it('Should render receiptSubLabel', () => {
    const { receiptSubLabel } = setup();
    expect(receiptSubLabel.length).toEqual(8);
  });

  it('Should not render receiptTaxes if taxes is 0', () => {
    const newState = initialState;
    newState.taxes = 0;
    const { receiptTaxes } = setup(newState);
    expect(receiptTaxes.length).toEqual(0);
  });

  it('Should not render receiptTaxes if taxes is 0', () => {
    const newState = initialState;
    newState.taxes = 110;
    const { receiptTaxes } = setup(newState);
    expect(receiptTaxes.length).toEqual(1);
  });

  it('Should not render receiptProcessingFee if processingFee is 0', () => {
    const newState = initialState;
    newState.processing_fee = 0;
    const { receiptProcessingFee } = setup(newState);
    expect(receiptProcessingFee.length).toEqual(0);
  });

  it('Should not render receiptPaymentFromAccount if paymentFromAccount is 0', () => {
    const newState = initialState;
    newState.payment_from_account = 0;
    const { receiptPaymentFromAccount } = setup(newState);
    expect(receiptPaymentFromAccount.length).toEqual(0);
  });

  it('Should not render receiptPaymentPlanDeferred if paymentPlanDeferred is 0', () => {
    const newState = initialState;
    newState.payment_plan_deferred = 0;
    const { receiptPaymentPlanDeferred } = setup(newState);
    expect(receiptPaymentPlanDeferred.length).toEqual(0);
  });

  it('Should not render receiptGiftCardAmount if giftCardAmount is 0', () => {
    const newState = initialState;
    newState.gift_card_amount = 0;
    const { receiptGiftCardAmount } = setup(newState);
    expect(receiptGiftCardAmount.length).toEqual(0);
  });

  it('Should not render receiptTotalRefund if totalRefund is less than 0', () => {
    const newState = initialState;
    newState.due_now = -1;
    const { receiptTotalRefund } = setup(newState);
    expect(receiptTotalRefund.length).toEqual(1);
  });
});
