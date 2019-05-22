import { fromJS } from 'immutable';
import expect from 'expect';
import React from 'react';
import Checkbox from 'react-base-ui/lib/components/Checkbox';
import filter from 'lodash/filter';
import Input from 'react-base-ui/lib/components/Input';
import { mountWithIntl } from 'utils/enzymeWithIntl';
import context, { childContextTypes } from 'utils/context';
import { Attachment } from 'index/modules/Cart/ShoppingCart/components/Waiver/Attachment';

/*eslint-disable*/
import jsonWaivers from 'Cart/ShoppingCart/get_waivers.json';
/*eslint-enable*/
const defaultWaiversAgreements = {
  final_system_waiver: {
    required: true,
    value: false,
    error: false
  },
  final_initials_waiver: {
    required: true,
    value: '',
    error: false
  }
};
const { body: { waivers } } = jsonWaivers;
const mockAttchments = () => {
  let tempWaiversAgreements = {};
  waivers.attachments.map((item) => {
    const {
            reno,
      checked,
      online_waiver_initials: onlineWaiverInitials,
      require_initials_online: requireInitialsOnline,
      stage: { id },
      required_before_completing_transaction: required } = item;
    const atchID = `${id}_${reno}`;
    item.id = atchID;
    tempWaiversAgreements[atchID] = {
      required,
      error: false,
      value: requireInitialsOnline ? (onlineWaiverInitials || '') : (!!checked)
    };
    return true;
  }
  );
  const waiversAgreements = Object.assign(tempWaiversAgreements, defaultWaiversAgreements);
  const checkout = {
    needPay: false,
    validatePass: true,
    needValidate: false
  };
  return { attachments: waivers.attachments, waiversAgreements, checkout };
};

const initialState = mockAttchments();

function setup(_state, _context = context) {
  const actions = {
    changeAgreementEntryAction: expect.createSpy()
  };
  const state = Object.assign(initialState, _state);
  const component = mountWithIntl(
    <Attachment
      itemData={state.attachments[0]}
      waiversAgreements={state.waiversAgreements}
      key={state.attachments[0].id}
      checkout={fromJS(state.checkout)}
      {...actions}
    />, { context: _context, childContextTypes });
  return {
    component,
    attachment: component.find('.attachment'),
    inputCtr: component.find(Input),
    checkoutCtr: component.find(Checkbox),
    actions
  };
}
describe('index/modules/Cart/ShoppingCard/components/Waiver/Attachment(UAT)', () => {
  describe('Waiver section in new cart:', () => {
    it('should render attachment correctly', () => {
      const { attachment } = setup();
      expect(attachment.length).toEqual(1);
    });
  });
  describe('Inspect cannot checkout if required waivers are not all signed off before proceed.', () => {
    it('should trigger changeAgreementEntryAction if inputCtr onBlur', () => {
      const tempAttachments = filter(waivers.attachments, item => item.require_initials_online);
      const { inputCtr, actions } = setup({ attachments: tempAttachments });
      const initialValue = 'test';
      inputCtr.find('input').simulate('blur', { target: { value: initialValue } });
      expect(actions.changeAgreementEntryAction).toHaveBeenCalledWith({
        id: tempAttachments[0].id,
        value: initialValue
      });
    });
    it('should trigger changeAgreementEntryAction if checkboxCtr onChange', () => {
      const tempAttachments = filter(waivers.attachments, item => !item.require_initials_online);
      const { checkoutCtr, actions } = setup({ attachments: tempAttachments });
      const initialChecked = false;
      checkoutCtr.find('input[type="checkbox"]').simulate('change', { target: { checked: initialChecked } });
      expect(actions.changeAgreementEntryAction).toHaveBeenCalledWith({
        id: tempAttachments[0].id,
        value: initialChecked
      });
    });
    it('should return result correctly', () => {
      const tempAttachments = filter(waivers.attachments, item => item.require_initials_online);
      const { component: componentA } = setup({
        attachments: tempAttachments,
        waiversAgreements: { [tempAttachments[0].id]: { error: true, value: 'test' } },
        checkout: { needValidate: true }
      });
      expect(componentA.instance().isInvalidEntry()).toEqual(true);
      const { component: componentB } = setup({
        attachments: tempAttachments,
        waiversAgreements: { [tempAttachments[0].id]: { error: false, value: 'test' } },
        checkout: { needValidate: true }
      });
      expect(componentB.instance().isInvalidEntry()).toEqual(false);
    });
    it('should render upload href correctly', () => {
      const tempAttachments = filter(waivers.attachments, item => item.require_initials_online);
      tempAttachments.forEach((item) => {
        item.stage.uploaded_file_href_text = 'test';
      });
      const { component: componentA } = setup({
        attachments: tempAttachments
      });
      expect(componentA.find('.attachment-content-href').find('a').length).toEqual(1);
      tempAttachments.forEach((item) => {
        item.stage.uploaded_file_href_text = null;
      });
      const { component: componentB } = setup({
        attachments: tempAttachments
      });
      expect(componentB.find('.attachment-content-href').find('a').length).toEqual(0);
    });
    it('should render content title correctly', () => {
      const tempAttachments = filter(waivers.attachments, item => item.require_initials_online);
      tempAttachments.forEach((item) => {
        item.stage.item_type = 0;
      });
      const { component: componentA } = setup({
        attachments: tempAttachments
      });
      expect(componentA.find('.attachment-content-title').find('a').length).toEqual(0);
      tempAttachments.forEach((item) => {
        item.stage.item_type = 1;
      });
      const { component: componentB } = setup({
        attachments: tempAttachments
      });
      expect(componentB.find('.attachment-content-title').find('a').length).toEqual(1);
    });
    it('should trigger click correctly', () => {
      const tempAttachments = filter(waivers.attachments, item => item.require_initials_online);
      tempAttachments.forEach((item) => {
        item.stage.item_type = 1;
      });
      const { component } = setup({
        attachments: tempAttachments
      });
      component.find('.attachment-content-title').find('a').simulate('click');
      expect(component.find('.waiver-attachment-alert-message').length).toEqual(0);
    });
  });
});

