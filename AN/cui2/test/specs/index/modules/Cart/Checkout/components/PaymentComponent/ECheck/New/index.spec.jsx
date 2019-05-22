import { fromJS } from 'immutable';
import expect from 'expect';
import React from 'react';
import Button from 'react-base-ui/lib/components//Button';
import Checkbox from 'react-base-ui/lib/components//Checkbox';
import { AAUIDropdown as Dropdown } from 'react-base-ui/lib/components/Dropdown';
import Input from 'react-base-ui/lib/components/Input';
import * as PaymentTypes from 'index/modules/Cart/Checkout/consts/paymentTypes';
import ECheckNew from 'index/modules/Cart/Checkout/components/PaymentComponent/ECheck/New';
import { FormFields } from 'index/modules/Cart/Checkout/components/PaymentComponent/consts/eCheck';
//eslint-disable-next-line
import { shallowWithIntl } from 'utils/enzymeWithIntl';

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
const emptyEcheckState = initialState.set('list', fromJS([])).set('totalList', fromJS([]));
const MODULENAME = 'primary';

const setup = (state = initialState, _context = context) => {
  const onPayItemAdded = expect.createSpy();
  onPayItemAdded.andReturn(Promise.resolve());
  const spyActions = {
    onPayItemAdded
  };

  const component = shallowWithIntl(
    <ECheckNew
      name={MODULENAME}
      typeName={PaymentTypes.ECHECK}
      data={state}
      {...spyActions}
    />,
    { context: _context, childContextTypes }
  ).dive().dive();

  return {
    component,
    formTriggerLink: component.find('.ecp-form-trigger'),
    formElement: component.find('.form--horizontal'),
    addButton: component.find(Button),
    accountTypeDropdown: component.find(Dropdown),
    accountNumberInput: component.find(Input).first(),
    routingNumberInput: component.find(Input).last(),
    saveForFutureUseCheck: component.find(Checkbox),
    securityGuaranteeLink: component.find('.security-guarantee'),
    spyActions
  };
};

describe('index/modules/Cart/Checkout/components/PaymentComponent/ECheck/New', () => {
  // Account type field
  it('Should trigger onAccountTypeChange if change account type field.', () => {
    const { component, accountTypeDropdown } = setup(emptyEcheckState);
    accountTypeDropdown.simulate('change', { value: 'S' });
    expect(component.state(FormFields.ECP_ACCOUNT_TYPE)).toEqual('S');
  });

  it('Should show `Required` message if lose focus on account type field.', () => {
    const { component, accountTypeDropdown } = setup(emptyEcheckState);
    accountTypeDropdown.simulate('change', { value: '' });
    expect(component.state('errors')[FormFields.ECP_ACCOUNT_TYPE]).toEqual('Required');
  });

  // Account number field
  it('Should trigger onAccountNumberChange if type value in account number field.', () => {
    const { component, accountNumberInput } = setup(emptyEcheckState);
    accountNumberInput.simulate('input', { target: { value: '111' } });

    const apiErrors = {
      ERROR_AMS_MISSING_CCNUMBER: 1,
      ERROR_AMS_INVALID_CCNUMBER: 2,
      ERROR_AMS_MISSING_CCTYPE: 3,
      ERROR_AMS_MISSING_EXPMONTH: 4,
      ERROR_AMS_INVALID_EXPMONTH: 5,
      ERROR_AMS_MISSING_EXPYEAR: 6,
      ERROR_AMS_INVALID_EXPYEAR: 7,
      ERROR_AMS_INVALID_EXPIRATION: 8,
      ERROR_AMS_INVALID_CSC: 9,
      ERROR_AMS_INVALID_ROUTING: 10,
      ERROR_AMS_INVALID_ACC_NUM_CODE: 11,
      ERROR_AMS_INVALID_ACC_NUM: 12,
      ERROR_ECP_INVALID_ACCOUNT_TYPE: 13
    };
    const errors = { ecpAccountType: 'Required', ecpRoutingNumber: 'Required' };
    component.setState({ errors, apiErrors });
    expect(component.state(FormFields.ECP_ACCOUNT_NUMBER)).toEqual(111);
  });

  it('Should trigger onAccountNumberBlur if lose focus on account number field.', () => {
    const { component, accountNumberInput } = setup(emptyEcheckState);
    accountNumberInput.simulate('blur', { target: { value: '222' } });
    expect(component.state(FormFields.ECP_ACCOUNT_NUMBER)).toEqual(222);
  });

  it('Should show `Required` message if lose focus on account number field.', () => {
    const { component, accountNumberInput } = setup(emptyEcheckState);
    accountNumberInput.simulate('blur', { target: { value: '' } });
    expect(component.state('errors')[FormFields.ECP_ACCOUNT_NUMBER]).toEqual('Required');
  });

  // Routing number field
  it('Should trigger onRoutingNumberChange if type value in routing number field.', () => {
    const { component, routingNumberInput } = setup(emptyEcheckState);
    routingNumberInput.simulate('input', { target: { value: '333' } });
    expect(component.state(FormFields.ECP_ROUTING_NUMBER)).toEqual(333);
  });

  it('Should trigger onRoutingNumberBlur if lose focus on routing number field.', () => {
    const { component, routingNumberInput } = setup(emptyEcheckState);
    routingNumberInput.simulate('blur', { target: { value: '444' } });
    expect(component.state(FormFields.ECP_ROUTING_NUMBER)).toEqual(444);
  });

  it('Should show `Required` message if lose focus on routing number field.', () => {
    const { component, routingNumberInput } = setup(emptyEcheckState);
    routingNumberInput.simulate('blur', { target: { value: '' } });
    expect(component.state('errors')[FormFields.ECP_ROUTING_NUMBER]).toEqual('Required');
  });

  // Routing number field
  it('Should trigger onCheckSaveFutureUse if check `Save the electronic check for furture use` field.', () => {
    const { component, saveForFutureUseCheck } = setup(emptyEcheckState);
    saveForFutureUseCheck.simulate('change', { target: { checked: true } });
    expect(component.state('ecpSavedForFurtureUse')).toEqual(true);
  });

  it('Should trigger onCheckSaveFutureUse if uncheck `Save the electronic check for furture use` field.', () => {
    const { component, saveForFutureUseCheck } = setup(emptyEcheckState);
    saveForFutureUseCheck.simulate('change', { target: { checked: false } });
    expect(component.state('ecpSavedForFurtureUse')).toEqual(false);
  });

  // Saving Electronic Check Security Guarantee
  it('Should show Security Guarantee if click link `Saving Electronic Check Security Guarantee`.', () => {
    const { component, securityGuaranteeLink } = setup(
      emptyEcheckState,
      { ...context, configurations: context.configurations.set('show_prior_ecp', true) }
    );
    securityGuaranteeLink.simulate('click');
    expect(component.state('showGuarantee')).toEqual(true);
  });
});
