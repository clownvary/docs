import { fromJS } from 'immutable';
import expect from 'expect';
import React from 'react';
import { shallow } from 'enzyme';
import { AAUIDropdown as Dropdown } from 'react-base-ui/lib/components/Dropdown';

import { FormattedMessage } from 'shared/translation/formatted';
import { BillingAddressList } from 'index/modules/Cart/Checkout/components/BillingAddress/BillingAddressList';

import jsonBillingAddress from 'Cart/Checkout/get_billingaddresses.json';

import context, { childContextTypes } from 'utils/context';
import messages from 'source/en-US';


const {
  body: {
    billing_infos: {
      payers,
  payer_id: payerId
    }
  }
} = jsonBillingAddress;

const intl = {
  messages
};

const defaultConfig = {
  canUpdate: true,
  useAddressVerification: true,
  canCreate: true,
  hideBilling: true
};

payers.map((ba) => {
  ba.text = `${ba.first_name} ${ba.last_name}`;
  ba.value = ba.customer_id;
  return ba;
});

const initialState = {
  billingAddresses: payers,
  selectedBillingAddress: fromJS(payers).find(ba => ba.get('customer_id') === payerId),
  isListDisplay: true
};

function setup(_state, _context = context, _config) {
  const actions = {
    onChange: expect.createSpy(),
    onUpdate: expect.createSpy()
  };

  const state = Object.assign(initialState, _state);
  const config = Object.assign(defaultConfig, _config);


  const component = shallow(
    <BillingAddressList data={fromJS(state)} config={config} intl={intl} {...actions} />,
    { context: _context, childContextTypes });

  return {
    component,
    h4: component.find('h4').find(FormattedMessage),
    tip: component.find('.billingaddress-list-tip').find(FormattedMessage),
    dropdowns: component.find(Dropdown),
    detail: component.find('.billingaddress-list-label-detail > span'),
    edit: component.find('.billingaddress-list-label-trigger.is-edit'),
    billAddressList: component.find('.billingaddress__detail-list'),
    noMailingNameTip: component.find('.billingaddress--no-mailingname'),
    noAddressTip: component.find('.billingaddress--no-address'),
    actions
  };
}

describe('index/modules/Cart/Checkout/components/BillingAddress/BillingAddressList', () => {
  it('should render h4 tag', () => {
    const { h4 } = setup();
    expect(h4.length).toEqual(1);
  });

  it('should render billAddressList', () => {
    const { billAddressList } = setup();
    expect(billAddressList.length).toEqual(1);
  });

  it('should render tip correctly when useAddressVerification is true', () => {
    const { tip } = setup(null, null, { useAddressVerification: true });
    expect(tip.length).toEqual(1);
  });

  it('should not render tip correctly when useAddressVerification is false', () => {
    const { tip } = setup(null, null, { useAddressVerification: false });
    expect(tip.length).toEqual(0);
  });

  it('should render Dropdown component when isListDisplay is true', () => {
    const { dropdowns } = setup({ isListDisplay: true });
    expect(dropdowns.length).toEqual(1);
  });

  it('should render Dropdown component when isListDisplay is false', () => {
    const { dropdowns } = setup({ isListDisplay: false });
    expect(dropdowns.length).toEqual(0);
  });

  it('should render Edit Button when canUpdate is true', () => {
    const { edit } = setup({ isListDisplay: true }, null, { canUpdate: true });
    expect(edit.length).toEqual(1);
  });

  it('should render Edit Button when canUpdate is false', () => {
    const { edit } = setup(null, null, { canUpdate: false });
    expect(edit.length).toEqual(0);
  });

  it('onChange should be triggered when dropdown is changed', () => {
    const { actions, dropdowns } = setup();
    dropdowns.simulate('change', { value: 2359 });
    expect(actions.onChange).toHaveBeenCalled();
  });

  it('onUpdate should be triggered when Edit is clicked', () => {
    const { actions, edit } = setup({ isListDisplay: true }, null, { canUpdate: true });
    edit.simulate('click');
    expect(actions.onUpdate).toHaveBeenCalled();
  });

  it('should render noMailingNameTip when realMailingName is null', () => {
    const newState = initialState;
    newState.selectedBillingAddress = fromJS({
      customer_id: 2359,
      name: 'Newff Zhou',
      first_name: 'Newff1',
      last_name: 'Newff2',
      middle_name: '',
      mailing_name: 'Newff Zhou',
      real_mailing_name: '',
      zip_code: '',
      address1: '',
      address2: '',
      country: '',
      city: '',
      state: ''
    });
    const { noMailingNameTip } = setup(newState);
    expect(noMailingNameTip.length).toEqual(1);
  });
});
