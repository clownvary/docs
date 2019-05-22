import { fromJS } from 'immutable';
import expect from 'expect';
import React from 'react';
import { shallow } from 'enzyme';
import context, { childContextTypes } from 'utils/context';
import Attachments from 'index/modules/Cart/ShoppingCart/components/Waiver/Attachments';
import Attachment from 'index/modules/Cart/ShoppingCart/components/Waiver/Attachment';

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
const mockState = () => {
  const { body: { waivers } } = jsonWaivers;
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

const initialState = mockState();

function setup(_state, _context = context) {
  const state = Object.assign(initialState, _state);
  const component = shallow(
    <Attachments
      attachments={fromJS(state.attachments)}
      waiversAgreements={fromJS(state.waiversAgreements)}
      checkout={fromJS(state.checkout)}
    />, { context: _context, childContextTypes });
  return {
    component,
    attachments: component.find('.attachments'),
    attachment: component.find(Attachment)
  };
}
describe('index/modules/Cart/ShoppingCard/components/Waiver/Attachments(UAT)', () => {
  describe('Waiver section in new cart:', () => {
    it('should render attachments correctly', () => {
      const { attachments, attachment } = setup();
      expect(attachments.length).toEqual(1);
      expect(attachment.length).toEqual(initialState.attachments.length);
    });
    it('should not render attachments when attachments is null', () => {
      const { attachments } = setup({ attachments: null });
      expect(attachments.length).toEqual(0);
    });
  });
});

