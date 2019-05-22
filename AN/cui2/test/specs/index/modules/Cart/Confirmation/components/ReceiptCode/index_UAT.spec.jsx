import expect from 'expect';
import ReceiptCode from 'index/modules/Cart/Confirmation/components/ReceiptCode';
import React from 'react';
import { mountWithIntl } from 'utils/enzymeWithIntl';
import context, { childContextTypes } from 'utils/context';
import messages from 'source/en-US';

const initialState = {
  receipt_number: 123,
  showWidgets: true,
  sharingActivityName: '',
  sharingActivityId: ''
};

const showWidgets = true;

const intl = {
  messages
};


function setup(_showWidgets = showWidgets, _state = initialState, _context = context) {
  const state = Object.assign(initialState, _state);
  const component = mountWithIntl(
    <ReceiptCode intl={intl} receipt={state} showWidgets={_showWidgets} />,
    { context: _context, childContextTypes }
  );
  return {
    component,
    receiptTitle: component.find('h2'),
    receiptCont: component.find('.receipt__content'),
    receiptShare: component.find('.receipt__share')
  };
}

describe('index/modules/Cart/Confirmation/components/ReceiptCode(UAT)', () => {
  describe('UAT Case: Inspect receipt number is correct and shown with proper format', () => {
    it('Should render receiptTitle', () => {
      const { receiptTitle } = setup();
      expect(receiptTitle.length).toEqual(1);
    });
  });

  describe('UAT Case:Facebook and Twitter is enable and disable: ', () => {
    it('Should render receiptShare', () => {
      const { receiptShare } = setup();
      expect(receiptShare.length).toEqual(1);
    });

    it('Should not render receiptShare', () => {
      const { receiptShare } = setup(false);
      expect(receiptShare.length).toEqual(0);
    });
  });
});
