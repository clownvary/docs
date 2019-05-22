import { fromJS } from 'immutable';
import expect from 'expect';
import React from 'react';
import { AAUIDropdown as Dropdown } from 'react-base-ui/lib/components/Dropdown';
import { InputNumeric } from 'react-base-ui/lib/components/InputNumeric';
import { shallowWithIntl } from 'utils/enzymeWithIntl';// eslint-disable-line
import { QuickDonation } from 'index/modules/Cart/ShoppingCart/components/QuickDonation';

import jsonQuickdonation from 'Cart/ShoppingCart/get_quickdonation.json';// eslint-disable-line

import context, { childContextTypes } from 'utils/context';// eslint-disable-line

const { body: { donations } } = jsonQuickdonation;
const initialState = fromJS({
  amount: null,
  selectedCampaign: null,
  selectedCampaignValue: null,
  donations,
  donationAmounts: []
});

function setup(quickdonation = initialState, _context = context) {
  const actions = {
    changeAmountAction: expect.createSpy(),
    changeCampaignAction: expect.createSpy(),
    blurAmountAction: expect.createSpy()
  };

  const component = shallowWithIntl(<QuickDonation quickdonation={quickdonation} {...actions} />,
    { context: _context, childContextTypes });

  return {
    component,
    h3: component.find('h3'),
    Dropdown: component.find(Dropdown.displayName),
    inputNumeric: component.find(InputNumeric),
    actions
  };
}

describe('index/modules/Cart/ShoppingCart/components/QuickDonation', () => {
  it('should render h3 tag', () => {
    const { h3 } = setup();
    expect(h3.length).toEqual(1);
  });

  it('should render Dropdown component', () => {
    const { Dropdown: _Dropdown } = setup();
    expect(_Dropdown.length).toEqual(1);
  });

  it('should call changeCampaignAction on switch campaign selection', () => {
    const { actions, Dropdown: _Dropdown } = setup();
    _Dropdown.simulate('change', { value: 99 });
    expect(actions.changeCampaignAction).toHaveBeenCalled();
  });
  it('should not call changeCampaignAction when selectedCampaignValue not be changed', () => {
    const tempState = Object.assign({}, initialState.toJS(), { selectedCampaignValue: 99 });
    const { actions, Dropdown: _Dropdown } = setup(fromJS(tempState));
    _Dropdown.simulate('change', { value: 99 });
    expect(actions.changeCampaignAction).toNotHaveBeenCalled();
  });
  it('should render nothing', () => {
    const tempState = fromJS(Object.assign(
      {},
      initialState.toJS(),
      { donations: [], selectedCampaign: { allow_custom_amount: true } }));
    const { h3, Dropdown: _Dropdown } = setup(tempState);
    expect(h3.length).toEqual(0);
    expect(_Dropdown.length).toEqual(0);
  });
  it('changeAmountAction should be called when trigger onInputChange', () => {
    const { inputNumeric, actions } = setup();
    inputNumeric.prop('onValueChange')({ value: 'test' });
    expect(actions.changeAmountAction).toHaveBeenCalledWith('test');
  });
  it('should return amount correctly', () => {
    const tempState = fromJS(Object.assign(
      {},
      initialState.toJS(),
      { amount: 100 }));
    const { inputNumeric } = setup(tempState);
    const value = inputNumeric.prop('value');
    expect(value).toEqual(100);
  });
  it('should return showTrigger value correctly', () => {
    const { inputNumeric } = setup();
    const showTrigger = inputNumeric.prop('showTrigger');
    expect(showTrigger).toEqual(false);

    const tempState = fromJS(Object.assign(
      {},
      initialState.toJS(),
      {
        selectedCampaign: true,
        donationAmounts: [{
          donation_amount_id: 30,
          campaign_id: 1,
          description: 'bbb',
          amount: 20.00
        }]
      }));
    const { inputNumeric: inputNumeric2 } = setup(tempState);
    const showTrigger2 = inputNumeric2.prop('showTrigger');
    expect(showTrigger2).toEqual(true);
  });
  it('should return items value correctly', () => {
    const tempState = fromJS(Object.assign(
      {},
      initialState.toJS(),
      { donationAmounts: [{ amount: 1 }, { amount: 2 }, { amount: 3 }] }));
    const { inputNumeric } = setup(tempState);
    const items = inputNumeric.prop('items');
    expect(items).toEqual([1, 2, 3]);
  });
});
