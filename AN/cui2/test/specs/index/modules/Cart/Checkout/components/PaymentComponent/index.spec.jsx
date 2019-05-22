import { fromJS } from 'immutable';
import React from 'react';
import { shallow } from 'enzyme';
import merge from 'lodash/merge';
import * as PaymentTypes from 'index/modules/Cart/Checkout/consts/paymentTypes';
import PaymentComponent from 'index/modules/Cart/Checkout/components/PaymentComponent';
import PaymentMethods from 'index/modules/Cart/Checkout/components/PaymentComponent/PaymentMethods';
import PaymentContents from 'index/modules/Cart/Checkout/components/PaymentComponent/PaymentContents';

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
          cardTypes: fromJS(creditCardTypes)
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

const setup = (quickdonation = initialState, _context = context) => {
  const spyActions = {
    changePaymentTypeAction: jest.fn(),
    selectItemAction: jest.fn(),
    addPayItemAsyncAction: jest.fn()
  };

  const component = shallow(
    <PaymentComponent
      name={MODULENAME}
      data={quickdonation.getIn(['modules', MODULENAME])}
      onTypeChange={(typeName) => {
        spyActions.changePaymentTypeAction(MODULENAME, typeName);
      }}
      onItemSelectedChange={(typeName, payItemId) => {
        spyActions.selectItemAction(MODULENAME, typeName, payItemId);
      }}
      onPayItemAdded={(typeName, payItemInfo) => {
        spyActions.addPayItemAsyncAction(MODULENAME, typeName, payItemInfo);
      }}
    />,
    { context: _context, childContextTypes }
  );

  return {
    component,
    hasMainClass: component.find('.payment-comp').length > 0,
    Paymentmethods: component.find(PaymentMethods),
    Paymentcontents: component.find(PaymentContents)
  };
};

describe('index/modules/Cart/Checkout/components/PaymentComponent', () => {
  it('should render PaymentMethods component', () => {
    const { Paymentmethods } = setup();
    expect(Paymentmethods.length).toEqual(1);
  });

  it('should render PaymentContents component', () => {
    const { Paymentcontents } = setup();
    expect(Paymentcontents.length).toEqual(1);
  });

  it('should include style class payment-comp', () => {
    const { hasMainClass } = setup();
    expect(hasMainClass).toBeTruthy();
  });

  it('should not include style class payment-comp', () => {
    const tempState = fromJS(merge({}, initialState.toJS(), { modules: { primary: null } }));
    const { hasMainClass } = setup(tempState);
    expect(hasMainClass).toBeFalsy();
  });
});
