import { fromJS } from 'immutable';
import expect from 'expect';
import React from 'react';
import { Radio } from 'react-base-ui/lib/components/Radio';
import startsWith from 'lodash/startsWith';
import * as PaymentTypes from 'index/modules/Cart/Checkout/consts/paymentTypes';
import ECheckSaved from 'index/modules/Cart/Checkout/components/PaymentComponent/ECheck/Saved';
//eslint-disable-next-line
import { mountWithIntl } from 'utils/enzymeWithIntl';

//eslint-disable-next-line
import context, { childContextTypes } from 'utils/context';

const EChecks = [{
  ams_account_id: 'Demo AccountID',
  save_name: 'woshiyun',
  routing_number: 'xxx8888',
  account_number: 'xxx3230',
  account_type: 'C',
  exclude: false,
  retired: false,
  ams_retention_date: null,
  is_secondary_payment: false
}, {
  ams_account_id: 'Demo AccountID',
  save_name: 'woshiyun',
  routing_number: 'xxx3333',
  account_number: 'xxx4525',
  account_type: 'S',
  exclude: false,
  retired: false,
  ams_retention_date: null,
  is_secondary_payment: false
}];

const expectedEChecks = fromJS(EChecks).map(card => card.set('id', `${card.get('card_type_id')}_${card.get('card_number')}`));
const initialState = fromJS({
  component: 'ECheck',
  selected: expectedEChecks.get(0),
  list: expectedEChecks,
  tempList: [],
  totalList: expectedEChecks
});
const MODULENAME = 'primary';

const setup = (state = initialState, _context = context) => {
  const spyActions = {
    onItemSelectedChange: expect.createSpy()
  };

  const component = mountWithIntl(
    <ECheckSaved
      name={MODULENAME}
      typeName={PaymentTypes.ECHECK}
      data={state}
      {...spyActions}
    />,
    { context: _context, childContextTypes }
  );

  return {
    component,
    radios: component.find(Radio),
    hasCardListClass: component.find('.card-list').length > 0,
    hasLimitWidthClass: component.find('.layout-width-limited').length > 0,
    cardItemTitle01: component.find('.card-item-title').at(0).text(),
    cardItemTitle02: component.find('.card-item-title').at(1).text(),
    accountNumber: component.find('.card-item-number').at(0).text(),
    routingNumber: component.find('.card-item-petitInfo').at(0).text(),
    spyActions
  };
};

describe('index/modules/Cart/Checkout/components/PaymentComponent/ECheck/Saved(UAT)', () => {
  it('should render echeck list as the expected count', () => {
    const { radios } = setup();
    expect(radios.length).toEqual(2);
  });

  it('should render acount type to be `Checking`', () => {
    const { cardItemTitle01 } = setup();
    expect(cardItemTitle01).toBe('Checking');
  });

  it('should render acount type to be `Savings`', () => {
    const { cardItemTitle02 } = setup();
    expect(cardItemTitle02).toBe('Savings');
  });

  it('The account number should start with ****', () => {
    const { accountNumber } = setup();
    expect(startsWith(accountNumber, '****')).toBe(true);
  });

  it('The routing number should start with ****', () => {
    const { routingNumber } = setup();
    expect(routingNumber.indexOf('****') === -1).toBe(true);
  });

  it('should trigger onItemSelectedChange correctly', () => {
    const { radios, spyActions } = setup();
    radios.map(item => item.prop('onChange')({ target: { value: 'test' } }));
    expect(spyActions.onItemSelectedChange.calls.length).toEqual(radios.length);
  });
});
