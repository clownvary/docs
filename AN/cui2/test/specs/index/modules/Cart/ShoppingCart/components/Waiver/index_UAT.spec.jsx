import { fromJS } from 'immutable';
import expect from 'expect';
import React from 'react';
import { shallowWithIntl } from 'utils/enzymeWithIntl';
import context, { childContextTypes } from 'utils/context';
import Waiver from 'index/modules/Cart/ShoppingCart/components/Waiver';
import { ShoppingCart } from 'index/modules/Cart/ShoppingCart/index';

/*eslint-disable*/
import jsonQuickDonation from 'Cart/ShoppingCart/get_quickdonation.json';
import jsonTrasactions from 'Cart/ShoppingCart/get_transactions.json';
import jsonWaivers from 'Cart/ShoppingCart/get_waivers.json';
/*eslint-enable*/
const initialCheckout = {
  needPay: false,
  validatePass: true,
  needValidate: false
};
const initialQuickdonation = {
  amount: null,
  selectedCampaign: null,
  selectedCampaignValue: null,
  donations: [],
  donationAmounts: []
};
const initialTrasaction = {
  participants: [],
  payOnAccount: [],
  orderSummary: null
};
const defaultWaiversAgreements = {
  final_system_waiver: {
    required: true,
    value: false,
    error: false
  },
  final_initials_waiver: {
    required: true,
    value: '',
    error: false
  }
};
const initialWaver = {
  waivers: null,
  waiversAgreements: defaultWaiversAgreements,
  warningAlertShown: true
};
const initialState = {
  transactions: initialTrasaction,
  quickdonation: initialQuickdonation,
  waiver: initialWaver,
  checkout: initialCheckout
};
function setup(_state, _context = context) {
  const state = Object.assign(initialState, _state);
  const actions = {
    fetchTransactionsAction: expect.createSpy(),
    fetchQuickDonationAction: expect.createSpy(),
    fetchWaiversAction: expect.createSpy()
  };
  const component = shallowWithIntl(
    <ShoppingCart
      transactions={fromJS(state.transactions)}
      quickdonation={fromJS(state.transactions)}
      waiver={fromJS(state.transactions)}
      checkout={fromJS(state.checkout)}
      responsive={{ isSm: true }}
      {...actions}
    />, { context: _context, childContextTypes });
  return {
    component,
    waiver: component.find(Waiver)
  };
}
describe('index/modules/Cart/ShoppingCard/components/Waiver/Index(UAT)', () => {
  describe('Waiver section in new cart: ', () => {
    it('should not render waiver when no transaction in cart', () => {
      const { waiver } = setup();
      expect(waiver.length).toEqual(0);
    });
    it('should render waiver when have transactions in cart', () => {
      const { body: { participants, order_summary: orderSummary } } = jsonTrasactions;
      const { waiver } = setup({ transactions: { participants, orderSummary } });
      expect(waiver.length).toEqual(1);
    });
  });
  describe('Inspect transactions linked waivers shall show correctly with/without system level waivers: ', () => {
    it('should render waiver correctly when only donation ', () => {
      const { body: { participants, order_summary: orderSummary } } = jsonTrasactions;
      participants.map(item => {
        item.transactions.map(trans => {
          trans.transaction_type = 7;
        });
      });
      const { waiver } = setup({ transactions: { participants, orderSummary } });
      expect(waiver.length).toEqual(1);
    });
  });
});

