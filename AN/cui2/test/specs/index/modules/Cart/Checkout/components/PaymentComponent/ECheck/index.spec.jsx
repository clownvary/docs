import { fromJS } from 'immutable';
import expect from 'expect';
import React from 'react';
import { shallow } from 'enzyme';
import * as PaymentTypes from 'index/modules/Cart/Checkout/consts/paymentTypes';
import ECheck from 'index/modules/Cart/Checkout/components/PaymentComponent/ECheck';
import ECheckSaved from 'index/modules/Cart/Checkout/components/PaymentComponent/ECheck/Saved';
import ECheckNew from 'index/modules/Cart/Checkout/components/PaymentComponent/ECheck/New';

/* eslint-disable */
import jsonEChecks from 'Cart/Checkout/get_echeck.json';
/* eslint-enable */

//eslint-disable-next-line
import context, { childContextTypes } from 'utils/context';

const { body: { saved_echeck: EChecks } } = jsonEChecks;

const expectedEChecks = fromJS(EChecks).map(card => card.set('id', `${card.get('card_type_id')}_${card.get('card_number')}`));
const initialState = fromJS({
  modules: {
    primary: {
      types: {
        [PaymentTypes.CREDIT_CARD]: {
          component: 'CreditCard',
          selected: '',
          list: [],
          tempList: [],
          totalList: [],
          cardTypes: ''
        },
        [PaymentTypes.ECHECK]: {
          component: 'ECheck',
          selected: expectedEChecks.get(0),
          list: expectedEChecks,
          tempList: [],
          totalList: expectedEChecks
        }
      },
      selectedType: PaymentTypes.ECHECK,
      isShow: true
    }
  }
});
const MODULENAME = 'primary';

const setup = (quickdonation = initialState, _context = context) => {
  const spyActions = {
    onTypeChange: expect.createSpy(),
    onPayItemAdded: expect.createSpy()
  };

  const component = shallow(
    <ECheck
      typeName={PaymentTypes.CREDIT_CARD}
      data={initialState.getIn(['modules', MODULENAME, 'types', PaymentTypes.ECHECK])}
      {...spyActions}
    />,
    { context: _context, childContextTypes }
  );

  return {
    component,
    ECheckSaved: component.find(ECheckSaved),
    ECheckNew: component.find(ECheckNew),
    spyActions
  };
};

describe('index/modules/Cart/Checkout/components/PaymentComponent/ECheck', () => {
  it('should render ECheckSaved component', () => {
    const { ECheckSaved: _ECheckSaved } = setup();
    expect(_ECheckSaved.length).toEqual(1);
  });

  it('should render ECheckNew component', () => {
    const { ECheckNew: _ECheckNew } = setup();
    expect(_ECheckNew.length).toEqual(1);
  });
});
