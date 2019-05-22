import { fromJS } from 'immutable';
import expect from 'expect';
import React from 'react';
import Checkbox from 'react-base-ui/lib/components/Checkbox';
import { mountWithIntl } from 'utils/enzymeWithIntl';
import context, { childContextTypes } from 'utils/context';
import WarningAlert from 'react-base-ui/lib/components/Alert';
import * as waiverTypes from 'index/modules/Cart/ShoppingCart/consts/waiverTypes';
import { WaiverCheckAgreement } from 'index/modules/Cart/ShoppingCart/components/Waiver/WaiverCheckAgreement';

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
  return { waivers, waiversAgreements, checkout, warningAlertShown: false };
};

const initialState = mockState();
function setup(_state, _context = context) {
  const state = Object.assign(initialState, _state);
  const actions = {
    changeAgreementEntryAction: expect.createSpy(),
    hideWarningAlertAction: expect.createSpy()
  };
  const component = mountWithIntl(
    <WaiverCheckAgreement
      waivers={state.waivers}
      waiversAgreements={state.waiversAgreements}
      checkout={fromJS(state.checkout)}
      warningAlertShown={state.warningAlertShown}
      {...actions}
    />, { context: _context, childContextTypes });
  return {
    component,
    finalAgreement: component.find('.final-agreement'),
    checkboxCtrl: component.find(Checkbox),
    atchContent: component.find('.attachment-content'),
    warningAlert: component.find(WarningAlert),
    validationMsg: component.find('.validationMsg'),
    actions

  };
}
describe('index/modules/Cart/ShoppingCard/components/Waiver/WaiverCheckAgreement', () => {
  it('should render WaiverCheckAgreement correctly', () => {
    const { finalAgreement, checkboxCtrl } = setup();
    expect(finalAgreement.length).toEqual(1);
    expect(checkboxCtrl.length).toEqual(1);
  });
  it('should trigger WaivechangeAgreementEntryAction when checkboxCtrl onChange ', () => {
    const { checkboxCtrl, actions } = setup();
    const initialChecked = true;
    checkboxCtrl.find('input[type="checkbox"]').simulate('change', { target: { checked: initialChecked } });
    expect(actions.changeAgreementEntryAction).toHaveBeenCalledWith({
      id: waiverTypes.FINAL_SYSTEM_WAIVER,
      value: initialChecked
    });
  });
  it('should return checkScrollModalShown state correctly', () => {
    const { component, atchContent } = setup({ waivers: { waiver_text: 'test', waiver_text_donation: 'donation' } });
    atchContent.find('a').simulate('click');
    expect(component.state('checkScrollModalShown')).toEqual(true);
  });
  it('should render warningAlert correctly', () => {
    const { warningAlert } = setup({ warningAlertShown: true });
    expect(warningAlert.length).toEqual(1);
  });
  it('should render validationMsg correctly', () => {
    const { validationMsg } = setup(
      {
        checkout: { needValidate: true },
        waiversAgreements: { [waiverTypes.FINAL_SYSTEM_WAIVER]: { error: true } }
      }
    );
    expect(validationMsg.length).toEqual(1);
  });

  it('should not render finalAgreement when waiverTextDonation is null', () => {
    const { finalAgreement } = setup({ waivers: { waiver_text: null, waiver_text_donation: null } });
    expect(finalAgreement.length).toEqual(0);
  });
});
