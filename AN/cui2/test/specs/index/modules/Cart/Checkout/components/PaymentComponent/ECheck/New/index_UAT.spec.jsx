import { fromJS } from 'immutable';
import expect from 'expect';
import React from 'react';
import Button from 'react-base-ui/lib/components//Button';
import Checkbox from 'react-base-ui/lib/components//Checkbox';
import { AAUIDropdown as Dropdown } from 'react-base-ui/lib/components/Dropdown';
import * as PaymentTypes from 'index/modules/Cart/Checkout/consts/paymentTypes';
import { AddNewECheck } from 'index/modules/Cart/Checkout/components/PaymentComponent/ECheck/New';
import { AccountTypes, FormFields } from 'index/modules/Cart/Checkout/components/PaymentComponent/consts/eCheck';
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
const emptyEcheckState = initialState.set('list', fromJS([])).set('totalList', fromJS([]));
const MODULENAME = 'primary';

const setup = (state = initialState, _context = context) => {
  const onPayItemAdded = expect.createSpy();
  onPayItemAdded.andReturn(Promise.resolve({}));
  const spyActions = {
    onPayItemAdded
  };

  const component = mountWithIntl(
    <AddNewECheck
      name={MODULENAME}
      typeName={PaymentTypes.ECHECK}
      data={state}
      {...spyActions}
      responsive={{ isSm: false }}
    />,
    { context: _context, childContextTypes }
  );

  return {
    component,
    formTriggerLink: component.find('.ecp-form-trigger'),
    formElement: component.find('.form--horizontal'),
    addButton: component.find(Button),
    accountTypeDropdown: component.find(Dropdown),
    saveForFutureUseCheck: component.find(Checkbox),
    iconTips: component.find('.icon-svg-question-circle'),
    securityGuarantee: component.find('.security-guarantee'),
    filedSaveForFutureUse: component.find(Checkbox),
    spyActions
  };
};

describe('index/modules/Cart/Checkout/components/PaymentComponent/ECheck/New(UAT)', () => {
  describe('UAT Case: Inspect the electronic check form and default amount check when no any saved electronic check info.', () => {
    it('should show form as default if no any saved electronic check and `show_prior_ecp` is true.', () => {
      const { formElement } = setup(
        emptyEcheckState,
        { ...context, configurations: context.configurations.set('show_prior_ecp', true) }
      );
      expect(formElement.length).toEqual(1);
    });
    it('should show form as default if no any saved electronic check and `show_prior_ecp` is false.', () => {
      const { formElement } = setup(
        emptyEcheckState,
        { ...context, configurations: context.configurations.set('show_prior_ecp', false) }
      );
      expect(formElement.length).toEqual(1);
    });
  });

  describe('UAT Case: Inspect the electronic check form and default amount check when has saved electronic check info.', () => {
    it('should not show form as default if has saved electronic check and `show_prior_ecp` is true.', () => {
      const { formElement } = setup(
        undefined,
        { ...context, configurations: context.configurations.set('show_prior_ecp', true) }
      );
      expect(formElement.length).toEqual(0);
    });
    it('should not show form as default if has saved electronic check and `show_prior_ecp` is false.', () => {
      const { formElement } = setup(
        undefined,
        { ...context, configurations: context.configurations.set('show_prior_ecp', false) }
      );
      expect(formElement.length).toEqual(0);
    });
  });

  describe('UAT Case: Inspect add new ECP behavior when no any saved electronic check info (including all account type).', () => {
    it('should show account type dorpdown with expected option list.', () => {
      const { accountTypeDropdown } = setup(emptyEcheckState);
      expect(accountTypeDropdown.length).toEqual(1);
      const expectedTypes = [
        {
          value: AccountTypes.CHECKING,
          text: 'Checking'
        },
        {
          value: AccountTypes.SAVINGS,
          text: 'Savings'
        }
      ];
      expect(accountTypeDropdown.prop('data')).toEqual(expectedTypes);
    });

    it('should show form and not show link “Use a new electronic check”.', () => {
      const { formTriggerLink, formElement } = setup(emptyEcheckState);
      expect(formTriggerLink.length).toEqual(0);
      expect(formElement.length).toEqual(1);
    });

    it('Action onPayItemAdded should be triggered if account type is `Savings` when clicking add button.', () => {
      const { component, addButton, spyActions } = setup(emptyEcheckState);
      component.setState({
        [FormFields.ECP_ACCOUNT_TYPE]: 'S',
        [FormFields.ECP_ACCOUNT_NUMBER]: '123',
        [FormFields.ECP_ROUTING_NUMBER]: '456'
      });
      addButton.simulate('click');
      expect(addButton.length).toEqual(1);
      expect(spyActions.onPayItemAdded).toHaveBeenCalled();
    });

    it('Action onPayItemAdded should be triggered if account type is `Checking` when clicking add button.', () => {
      const { component, addButton, spyActions } = setup(emptyEcheckState);
      component.setState({
        [FormFields.ECP_ACCOUNT_TYPE]: 'C',
        [FormFields.ECP_ACCOUNT_NUMBER]: '123',
        [FormFields.ECP_ROUTING_NUMBER]: '456'
      });
      addButton.simulate('click');
      expect(addButton.length).toEqual(1);
      expect(spyActions.onPayItemAdded).toHaveBeenCalled();
    });
  });

  describe('UAT Case: Inspect add new ECP behavior when has saved electronic check info (including all account type).', () => {
    it('should not show account type dorpdown with expected option list.', () => {
      const { accountTypeDropdown } = setup();
      expect(accountTypeDropdown.length).toEqual(0);
    });

    it('should show form and not show link “Use a new electronic check”.', () => {
      const { formTriggerLink, formElement } = setup();
      expect(formTriggerLink.length).toEqual(1);
      expect(formElement.length).toEqual(0);
    });
  });

  describe('UAT Case: Inspect can show proper form when click link “Use a new electronic check” as design.', () => {
    it('should show form when clicking link “Use a new electronic check”.', () => {
      const { component, formTriggerLink } = setup();
      component.setState({
        showForm: true
      }, () => {
        formTriggerLink.find('a').simulate('click');
        expect(component.state('showForm')).toEqual(true);
      });
    });

    it('should not show form if not click link “Use a new electronic check”.', () => {
      const { formElement } = setup();
      expect(formElement.length).toEqual(0);
    });
  });

  describe('UAT Case: Inspect the add new ECP behavior under link “Use a new electronic check” (including all account type).', () => {
    it('Action onPayItemAdded should be triggered if all form fields pass validation.', () => {
      const { component, addButton, spyActions } = setup(emptyEcheckState);
      component.setState({
        [FormFields.ECP_ACCOUNT_TYPE]: 'S',
        [FormFields.ECP_ACCOUNT_NUMBER]: '123',
        [FormFields.ECP_ROUTING_NUMBER]: '456'
      });
      addButton.simulate('click');
      expect(addButton.length).toEqual(1);
      expect(spyActions.onPayItemAdded).toHaveBeenCalled();
    });

    it('Action onPayItemAdded should be triggered if accouunt type field not pass validation.', () => {
      const { component, addButton, spyActions } = setup(emptyEcheckState);
      component.setState({
        [FormFields.ECP_ACCOUNT_TYPE]: '',
        [FormFields.ECP_ACCOUNT_NUMBER]: '123',
        [FormFields.ECP_ROUTING_NUMBER]: '456'
      });
      addButton.simulate('click');
      expect(addButton.length).toEqual(1);
      expect(spyActions.onPayItemAdded).toNotHaveBeenCalled();
    });

    it('Action onPayItemAdded should be triggered if accouunt number field not pass validation.', () => {
      const { component, addButton, spyActions } = setup(emptyEcheckState);
      component.setState({
        [FormFields.ECP_ACCOUNT_TYPE]: 'S',
        [FormFields.ECP_ACCOUNT_NUMBER]: '',
        [FormFields.ECP_ROUTING_NUMBER]: '456'
      });
      addButton.simulate('click');
      expect(addButton.length).toEqual(1);
      expect(spyActions.onPayItemAdded).toNotHaveBeenCalled();
    });

    it('Action onPayItemAdded should be triggered if routing number field not pass validation.', () => {
      const { component, addButton, spyActions } = setup(emptyEcheckState);
      component.setState({
        [FormFields.ECP_ACCOUNT_TYPE]: 'S',
        [FormFields.ECP_ACCOUNT_NUMBER]: '123',
        [FormFields.ECP_ROUTING_NUMBER]: ''
      });
      addButton.simulate('click');
      expect(addButton.length).toEqual(1);
      expect(spyActions.onPayItemAdded).toNotHaveBeenCalled();
    });
  });

  describe('UAT Case: Inspect to check Save the electronic check for future use.', () => {
    it('Should not render `Save the electronic check for future use` if `show_prior_ecp` is true.', () => {
      const { saveForFutureUseCheck } = setup(
        emptyEcheckState,
        { ...context, configurations: context.configurations.set('show_prior_ecp', true) }
      );
      expect(saveForFutureUseCheck.length).toEqual(1);
    });
    it('Should not render `Save the electronic check for future use` if `show_prior_ecp` is false.', () => {
      const { saveForFutureUseCheck } = setup(
        emptyEcheckState,
        { ...context, configurations: context.configurations.set('show_prior_ecp', false) }
      );
      expect(saveForFutureUseCheck.length).toEqual(0);
    });
  });

  const stateForDisableItems = fromJS({
    component: 'ECheck',
    selected: '',
    list: [],
    tempList: [],
    totalList: [],
    cardTypes: [],
    disableTips: false,
    disableGuarantee: false,
    disableSaveForFurture: false
  });

  describe('Inspect if the part of `Security Guarantee` show or not.', () => {
    it('It should be shown if state `disableGuarantee` is false', () => {
      const { securityGuarantee } = setup(stateForDisableItems);
      expect(securityGuarantee.length > 0).toBe(true);
    });

    it('It should be hidden if state `disableGuarantee` is true', () => {
      const { securityGuarantee } = setup(stateForDisableItems.set('disableGuarantee', true));
      expect(securityGuarantee.length > 0).toBe(false);
    });
  });

  describe('Inspect if the two icon tips show or not.', () => {
    it('It should be shown if state `disableTips` is false', () => {
      const { iconTips } = setup(stateForDisableItems);
      expect(iconTips.length).toBe(2);
    });

    it('It should be hidden if state `disableTips` is true', () => {
      const { iconTips } = setup(stateForDisableItems.set('disableTips', true));
      expect(iconTips.length).toBe(0);
    });
  });

  describe('Inspect if the part of `Save the card for furture use` show or not.', () => {
    it('It should be shown if state `disableSaveForFurture` is false', () => {
      const { filedSaveForFutureUse } = setup(stateForDisableItems);
      expect(filedSaveForFutureUse.length > 0).toBe(true);
    });

    it('It should be hidden if state `disableSaveForFurture` is true', () => {
      const { filedSaveForFutureUse } = setup(stateForDisableItems.set('disableSaveForFurture', true));
      expect(filedSaveForFutureUse.length > 0).toBe(false);
    });
  });
});
