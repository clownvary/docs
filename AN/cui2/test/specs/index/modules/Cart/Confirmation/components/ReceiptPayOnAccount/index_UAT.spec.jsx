import expect from 'expect';
import ReceiptPayOnAccount from 'index/modules/Cart/Confirmation/components/ReceiptPayOnAccount';
import React from 'react';
import { shallow } from 'enzyme';
import context, { childContextTypes } from 'utils/context';
import jsonTransactions from 'Cart/Confirmation/get_receiptsummary.json';

const { body: { pay_on_account: payOnAccount } } = jsonTransactions;
const initialState = {
  index: 0,
  payOnAccountList: payOnAccount[0]
};

function setup(_state = initialState, _context = context) {
  const state = Object.assign(initialState, _state);
  const component = shallow(
    <ReceiptPayOnAccount {...state} />,
    { context: _context, childContextTypes }
  );
  return {
    component,
    receiptContentBlock: component.find('.receipt__content'),
    receiptListContent: component.find('.receipt-list__content'),
    receiptListContentRight: component.find('.receipt-list__content--right'),
    payOnAccountBalances: component.find('.pay-on-account__balances')
  };
}

describe('index/modules/Cart/Confirmation/components/ReceiptPayOnAccount(UAT)', () => {
  describe('UAT Case: Inspect Receipt PayOnAccount page is shown proper content as designed', () => {
    it('Should render receiptContentBlock', () => {
      const { receiptContentBlock } = setup();
      expect(receiptContentBlock.length).toEqual(1);
    });

    it('Should not render payOnAccountBalances', () => {
      const newState = initialState;
      newState.payOnAccountList.receipt_numbers = null;
      const { payOnAccountBalances } = setup(newState);
      expect(payOnAccountBalances.length).toEqual(0);
    });
  });
});
