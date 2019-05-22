import { fromJS } from 'immutable';
import React from 'react';
import * as PaymentTypes from 'index/modules/Cart/Checkout/consts/paymentTypes';
import { SecondaryPayment } from 'index/modules/Cart/Checkout/components/SecondaryPayment';
import PaymentComponent from 'index/modules/Cart/Checkout/components/PaymentComponent';
import * as CreditCard from 'index/modules/Cart/Checkout/components/PaymentComponent/CreditCard';
import * as ECheck from 'index/modules/Cart/Checkout/components/PaymentComponent/ECheck';
import { generateCreditCardsIds, generateEChecksIds } from 'index/modules/Cart/Checkout/utils/payment';
//eslint-disable-next-line
import context, { childContextTypes } from 'utils/context';
//eslint-disable-next-line
import { mountWithIntl } from 'utils/enzymeWithIntl';

/* eslint-disable */
import jsonCreditCards from 'Cart/Checkout/get_creditcards.json';
import jsonCreditCardTypes from 'Cart/Checkout/get_creditcardtypes.json';
import jsonEChecks from 'Cart/Checkout/get_echeck.json';
/* eslint-enable */

const { body: { saved_cards: creditCards } } = jsonCreditCards;
const { body: { card_types: creditCardTypes } } = jsonCreditCardTypes;
const { body: { saved_echeck: eChecks } } = jsonEChecks;

const expectedCreditCards = generateCreditCardsIds(creditCards);
const expectedEChecks = generateEChecksIds(eChecks);

const initialState = fromJS({
  modules: {
    secondary: {
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

const setup = (state = initialState, _context = context) => {
  const actions = {
    registerModuleAction: jest.fn(),
    checkSecondaryPaymentAction: jest.fn(),
    changePaymentTypeAction: jest.fn(),
    selectItemAction: jest.fn(),
    addPayItemAsyncAction: jest.fn()
  };

  const component = mountWithIntl(
    <SecondaryPayment paymentManager={state} {...actions} />,
    { context: _context, childContextTypes }
  );

  return {
    component,
    secondaryPayment: component.find('.secondary-payment'),
    h4: component.find('.secondary-payment').children('h4'),
    hasLockIcon: component.find('.icon-svg-lock').length > 0,
    Paymentcomponent: component.find(PaymentComponent),
    CreditCardTab: component.find(CreditCard.Tab),
    ECheckTab: component.find(ECheck.Tab),
    paymentManager: component.props().paymentManager,
    actions
  };
};

describe('index/modules/Cart/Checkout/components/SecondaryPayment', () => {
  it('should render h4 tag', () => {
    const { h4 } = setup();
    expect(h4.length).toEqual(1);
  });

  it('should render PaymentComponent component', () => {
    const { Paymentcomponent } = setup();
    expect(Paymentcomponent.length).toEqual(1);
  });

  it('should render lock icon', () => {
    const { hasLockIcon } = setup();
    expect(hasLockIcon).toBe(true);
  });

  it('should call action registerModuleAction', () => {
    const { actions } = setup();
    expect(actions.registerModuleAction).toHaveBeenCalled();
  });

  it('should call action checkSecondaryPaymentAction', () => {
    const { actions, component } = setup();
    component.setProps({ futureCharges: [] });
    expect(actions.checkSecondaryPaymentAction).toHaveBeenCalled();
  });

  it('should not render secondaryPayment', () => {
    const initialState = fromJS({
      modules: {
        secondary: {
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
          isShow: false
        }
      }
    });
    const { secondaryPayment } = setup(initialState);
    expect(secondaryPayment.length).toEqual(0);
  });

  it('should call action changePaymentTypeAction', () => {
    const { actions, Paymentcomponent } = setup();
    Paymentcomponent.find('.tab-box').first().simulate('click');
    expect(actions.changePaymentTypeAction).toHaveBeenCalled();
  });

  it('should call action selectItemAction', () => {
    const { actions, Paymentcomponent } = setup();
    Paymentcomponent.find('.layout-width-limited').find('.card-item').find('Radio').first().find('input').simulate('change');
    expect(actions.selectItemAction).toHaveBeenCalled();
  });

  it('should call action addPayItemAsyncAction', () => {
    const { actions, Paymentcomponent } = setup();
    Paymentcomponent.prop('onPayItemAdded')({ typeName: 'test', payItemInfo: '' });
    expect(actions.addPayItemAsyncAction).toHaveBeenCalled();
  });

  it('should render CreditCardTab component', () => {
    const { CreditCardTab } = setup();
    expect(CreditCardTab.length).toEqual(1);
  });

  it('should render ECheckTab component', () => {
    const { ECheckTab } = setup();
    expect(ECheckTab.length).toEqual(1);
  });
});
