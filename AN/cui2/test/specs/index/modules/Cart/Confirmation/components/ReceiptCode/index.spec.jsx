import expect from 'expect';
import ReceiptCode from 'index/modules/Cart/Confirmation/components/ReceiptCode';
import React from 'react';
import { mountWithIntl } from 'utils/enzymeWithIntl';
import context, { childContextTypes } from 'utils/context';
import messages from 'source/en-US';

const initialState = {
  receipt_number: 123,
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

describe('index/modules/Cart/Confirmation/components/ReceiptCode', () => {
  it('Should render receiptTitle', () => {
    const { receiptTitle } = setup();
    expect(receiptTitle.length).toEqual(1);
  });

  it('Should render receiptCont', () => {
    const { receiptCont } = setup();
    expect(receiptCont.length).toEqual(1);
  });

  it('Should render receiptShare', () => {
    const { receiptShare } = setup();
    const facebookLink = receiptShare.find('.an-social-sharing__link').first();
    facebookLink.simulate('click');

    const twitterLink = receiptShare.find('.an-social-sharing__link').last();
    twitterLink.simulate('click');
    expect(receiptShare.length).toEqual(1);
  });

  it('Should not render receiptShare', () => {
    const { receiptShare } = setup(false);
    expect(receiptShare.length).toEqual(0);
  });
});
