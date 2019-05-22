import { fromJS } from 'immutable';
import expect from 'expect';
import React from 'react';
import { shallow } from 'enzyme';
import filter from 'lodash/filter';
import context, { childContextTypes } from 'utils/context';
import Waiver from 'index/modules/Cart/ShoppingCart/components/Waiver';
import Attachments from 'index/modules/Cart/ShoppingCart/components/Waiver/Attachments';
import WaiverInitialAgreement from 'index/modules/Cart/ShoppingCart/components/Waiver/WaiverInitialAgreement';
import WaiverCheckAgreement from 'index/modules/Cart/ShoppingCart/components/Waiver/WaiverCheckAgreement';


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
const mockState = () => {
  const tempWaiversAgreements = {};
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
  return {
    waiver: { waivers: { attachments: waivers.attachments } },
    waiversAgreements,
    checkout,
    warningAlertShown: false
  };
};
const initialState = mockState();


function setup(_state, _context = context) {
  const state = Object.assign(initialState, _state);
  const component = shallow(
    <Waiver
      checkout={fromJS(state.checkout)}
      waiver={fromJS(state.waiver)}
    />, { context: _context, childContextTypes });
  return {
    component,
    waiver: component.find('.waiver-layouts'),
    attachments: component.find(Attachments),
    waiverInitialAgreement: component.find(WaiverInitialAgreement),
    waiverCheckAgreement: component.find(WaiverCheckAgreement)

  };
}
describe('index/modules/Cart/ShoppingCard/components/Waiver/Index', () => {
  it('should render waiver component correctly', () => {
    const { waiver, attachments, waiverInitialAgreement, waiverCheckAgreement } = setup();
    expect(waiver.length).toEqual(1);
    expect(waiver.find('h2').length).toEqual(1);
    expect(attachments.length).toEqual(2);
    expect(waiverInitialAgreement.length).toEqual(1);
    expect(waiverCheckAgreement.length).toEqual(1);
  });
  it('should not render waiver component when waivers is null', () => {
    const { waiver } = setup({ waiver: { waivers: null } });
    expect(waiver.length).toEqual(0);
  });
  it('should not render initialAttachments when initialAttachments is null', () => {
    const tempAttachments = filter(waivers.attachments, item => !item.require_initials_online);
    const { attachments } = setup({ waiver: { waivers: { attachments: tempAttachments } } });
    expect(attachments.length).toEqual(1);
  });
  it('should not render checkAttachments when checkAttachments is null', () => {
    const tempAttachments = filter(waivers.attachments, item => item.require_initials_online);
    const { attachments } = setup({ waiver: { waivers: { attachments: tempAttachments } } });
    expect(attachments.length).toEqual(1);
  });
});
