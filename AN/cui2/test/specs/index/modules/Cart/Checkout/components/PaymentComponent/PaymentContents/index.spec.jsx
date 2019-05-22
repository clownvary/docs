import { fromJS } from 'immutable';
import React from 'react';
import merge from 'lodash/merge';
import { shallow } from 'enzyme';
import * as PaymentTypes from 'index/modules/Cart/Checkout/consts/paymentTypes';
import PaymentContents from 'index/modules/Cart/Checkout/components/PaymentComponent/PaymentContents';
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
    onTypeChange: jest.fn()
  };

  const component = shallow(
    <PaymentContents
      typeName={PaymentTypes.CREDIT_CARD}
      data={state.getIn(['modules', MODULENAME])}
      selectedType={PaymentTypes.CREDIT_CARD}
      {...spyActions}
    />,
    { context: _context, childContextTypes }
  );

  return {
    component,
    CreditCardContent: component.find(CreditCard.default),
    ECheckContent: component.find(ECheck.default),
    hasCompContentsClass: component.find('.payment-comp-contents').length > 0,
    hasCompContClass: component.find('.payment-comp-cont').length > 0,
    spyActions
  };
};

describe('index/modules/Cart/Checkout/components/PaymentComponent/PaymentContents', () => {
  it('should render CreditCardContent component', () => {
    const { CreditCardContent } = setup();
    expect(CreditCardContent.length).toEqual(1);
  });

  it('should render ECheckContent component', () => {
    const { ECheckContent } = setup();
    expect(ECheckContent.length).toEqual(1);
  });

  it('should include style class layout-width-limite', () => {
    const { hasCompContentsClass } = setup();
    expect(hasCompContentsClass).toBe(true);
  });

  it('should include style class payment-comp-methods', () => {
    const { hasCompContClass } = setup();
    expect(hasCompContClass).toBe(true);
  });

  it('should return null when typeValue is null', () => {
    const tempState = fromJS(merge({}, initialState.toJS(), {
      modules: {
        primary: {
          types:
          {
            [PaymentTypes.ECHECK]: {
              component: 'test'
            }
          }
        }
      }
    }));
    const { ECheckContent } = setup(tempState);
    expect(ECheckContent.length).toEqual(0);
  });
});
