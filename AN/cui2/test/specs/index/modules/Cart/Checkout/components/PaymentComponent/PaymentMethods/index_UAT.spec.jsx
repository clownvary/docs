import { fromJS } from 'immutable';
import expect from 'expect';
import React from 'react';
import { shallow } from 'enzyme';
import * as PaymentTypes from 'index/modules/Cart/Checkout/consts/paymentTypes';
import PaymentMethods from 'index/modules/Cart/Checkout/components/PaymentComponent/PaymentMethods';
import * as CreditCard from 'index/modules/Cart/Checkout/components/PaymentComponent/CreditCard';
import * as ECheck from 'index/modules/Cart/Checkout/components/PaymentComponent/ECheck';

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
          totalList: expectedCreditCards,
          cardTypes: creditCardTypes
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
  const spyActions = {
    onTypeChange: expect.createSpy()
  };

  const component = shallow(
    <PaymentMethods
      data={state.getIn(['modules', MODULENAME])}
      selectedType={PaymentTypes.CREDIT_CARD}
      {...spyActions} />,
    { context: _context, childContextTypes }
  );

  return {
    component,
    CreditCardTab: component.find(CreditCard.Tab),
    ECheckTab: component.find(ECheck.Tab),
    tabBoxDiv: component.find('.tab-box').at(0),
    hasLimitWidthClass: component.find('.layout-width-limited').length > 0,
    hasCompMethodsClass: component.find('.payment-comp-methods').length > 0,
    hasTabBoxClass: component.find('.tab-box').length > 0,
    spyActions
  };
};

describe('index/modules/Cart/Checkout/components/PaymentComponent/PaymentMethods(UAT)', () => {
  it('should not render CreditCardTab and ECheckTab if disable ECP', () => {
    const { CreditCardTab, ECheckTab } = setup(fromJS({
      modules: {
        primary: {
          types: {
            [PaymentTypes.CREDIT_CARD]: {
              component: 'CreditCard',
              selected: expectedCreditCards.get(0),
              list: expectedCreditCards,
              tempList: [],
              totalList: expectedCreditCards,
              cardTypes: creditCardTypes
            }
          },
          selectedType: PaymentTypes.CREDIT_CARD,
          isShow: true
        }
      }
    }));
    expect(CreditCardTab.length).toEqual(0);
    expect(ECheckTab.length).toEqual(0);
  });
});
