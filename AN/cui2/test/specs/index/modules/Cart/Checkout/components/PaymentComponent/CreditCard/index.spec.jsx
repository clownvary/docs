import { fromJS } from 'immutable';
import React from 'react';
import { shallow } from 'enzyme';
import * as PaymentTypes from 'index/modules/Cart/Checkout/consts/paymentTypes';
import { CreditCard } from 'index/modules/Cart/Checkout/components/PaymentComponent/CreditCard';
import selfMessages from 'index/modules/Cart/Checkout/components/PaymentComponent/CreditCard/translations';

/* eslint-disable */
import jsonCreditCards from 'Cart/Checkout/get_creditcards.json';
import jsonCreditCardTypes from 'Cart/Checkout/get_creditcardtypes.json';
import jsonEChecks from 'Cart/Checkout/get_echeck.json';
/* eslint-enable */

//eslint-disable-next-line
import context, { childContextTypes } from 'utils/context';

const { body: { saved_cards: creditCards } } = jsonCreditCards;
const { body: { card_types: creditCardTypes } } = jsonCreditCardTypes;
const { body: { saved_echeck: eChecks } } = jsonEChecks;

const expectedCreditCards = fromJS(creditCards).map(card => card.set('id', `${card.get('card_type_id')}_${card.get('card_number')}`));
const expectedEChecks = fromJS(eChecks).map(card => card.set('id', `${card.get('card_type_id')}_${card.get('card_number')}`));
const initialState = fromJS({
  modules: {
    primary: {
      types: {
        [PaymentTypes.CREDIT_CARD]: {
          component: 'CreditCard',
          selected: expectedCreditCards.get(0),
          list: expectedCreditCards,
          tempList: [],
          merchantName: 'abc',
          totalList: expectedCreditCards,
          cardTypes: creditCardTypes,
          setInstanceOfPCIAction: null
        },
        [PaymentTypes.ECHECK]: {
          component: 'ECheck',
          selected: '',
          list: expectedEChecks,
          tempList: [],
          totalList: expectedEChecks
        }
      },
      selectedType: PaymentTypes.CREDIT_CARD,
      isShow: true
    }
  }
});
const MODULENAME = 'primary';

const setup = (state = initialState, _context = context) => {
  const component = shallow(
    <CreditCard
      typeName={PaymentTypes.CREDIT_CARD}
      data={state.getIn(['modules', MODULENAME, 'types', PaymentTypes.CREDIT_CARD])}
    />,
    { context: _context, childContextTypes }
  );

  return {
    component,
    hasLimitWidthClass: component.find('.layout-width-limited').length > 0,
    hasMerchantNameClass: component.find('.merchant-name').length > 0,
    merchantNameFormattedMessage: component.find('FormattedMessage').at(0)
  };
};

describe('index/modules/Cart/Checkout/components/PaymentComponent/CreditCard', () => {
  describe('css validation', () => {
    it('should include style class layout-width-limite', () => {
      const { hasLimitWidthClass } = setup();
      expect(hasLimitWidthClass).toBe(true);
    });

    it('should include style class merchant-name', () => {
      const { hasMerchantNameClass } = setup();
      expect(hasMerchantNameClass).toBe(true);
    });
  });

  describe('merchant name', () => {
    it('should show merchant name message', () => {
      const { merchantNameFormattedMessage } = setup();
      expect(merchantNameFormattedMessage.prop('id')).toBe(selfMessages.merchant_name.id);
    });

    it('should show no merchant name message', () => {
      const { merchantNameFormattedMessage } = setup(
        initialState.setIn([
          'modules', MODULENAME, 'types', PaymentTypes.CREDIT_CARD, 'merchantName'
        ], '')
      );
      expect(merchantNameFormattedMessage.prop('id')).toBe(selfMessages.no_merchant_name.id);
    });
  });

  describe('merchant name', () => {
    it('should show merchant name message', () => {
      const { merchantNameFormattedMessage } = setup();
      expect(merchantNameFormattedMessage.prop('id')).toBe(selfMessages.merchant_name.id);
    });

    it('should show no merchant name message', () => {
      const { merchantNameFormattedMessage } = setup(
        initialState.setIn([
          'modules', MODULENAME, 'types', PaymentTypes.CREDIT_CARD, 'merchantName'
        ], '')
      );
      expect(merchantNameFormattedMessage.prop('id')).toBe(selfMessages.no_merchant_name.id);
    });
  });

  describe('Action trigger', () => {
    it('should show merchant name message', () => {
      const setInstanceOfPCIAction = jest.fn();
      const { component } = setup(
        initialState.setIn([
          'modules', MODULENAME, 'types', PaymentTypes.CREDIT_CARD, 'setInstanceOfPCIAction'
        ], setInstanceOfPCIAction)
      );
      component.unmount();
      expect(setInstanceOfPCIAction).toHaveBeenCalled();
    });
  });

  describe('guarantee', () => {
    it('should show the Guarantee information if showForm and showGuarantee are all true', () => {
      const { component } = setup();
      component.setState({ showGuarantee: true });
      expect(component.find('.security-guarantee-content')).toHaveLength(1);
    });

    it('should hide the Guarantee information if showForm is false and showGuarantee is true', () => {
      const { component } = setup();
      component.setState({ showGuarantee: false });
      expect(component.find('.security-guarantee-content')).toHaveLength(0);
    });

    it('should hide showGuarantee if show_prior_cc is false', () => {
      const { component } = setup(undefined, { configurations: fromJS({ show_prior_cc: false }) });
      const hrefGuarantee = component.find('.security-guarantee');
      expect(hrefGuarantee).toHaveLength(0);
    });

    it('should showGuarantee by click', () => {
      const { component } = setup(undefined, { configurations: fromJS({ show_prior_cc: true }) });
      const hrefGuarantee = component.find('.security-guarantee').at(0);
      hrefGuarantee.simulate('click');
      const guaranteeContent = component.find('.security-guarantee-content');
      expect(guaranteeContent).toHaveLength(1);
    });
  });
});
