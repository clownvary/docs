import { fromJS } from 'immutable';
import expect from 'expect';
import React from 'react';
import Checkbox from 'react-base-ui/lib/components/Checkbox';
import { mountWithIntl } from 'utils/enzymeWithIntl';
import context, { childContextTypes } from 'utils/context';
import { WaiverCheckAgreement } from 'index/modules/Cart/ShoppingCart/components/Waiver/WaiverCheckAgreement';
import CheckScrollModal from 'index/modules/Cart/ShoppingCart/components/Waiver/CheckScrollModal';
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
    checkScrollModal: component.find(CheckScrollModal),
    actions

  };
}
describe('index/modules/Cart/ShoppingCard/components/Waiver/WaiverCheckAgreement(UAT)', () => {
  describe('Inspect transactions linked waivers shall show correctly with/without system level waivers:', () => {
    it('should render WaiverCheckAgreement correctly when waiverText is not null', () => {
      const { finalAgreement, checkboxCtrl } = setup({ waivers: { waiver_text: 'test', waiver_text_donation: null } });
      expect(finalAgreement.length).toEqual(1);
      expect(checkboxCtrl.length).toEqual(1);
    });
    it('should render WaiverCheckAgreement correctly when waiverTextDonation is not null', () => {
      const { finalAgreement, checkboxCtrl } = setup({ waivers: { waiver_text: null, waiver_text_donation: 'test' } });
      expect(finalAgreement.length).toEqual(1);
      expect(checkboxCtrl.length).toEqual(1);
    });
    it('should trigger modal hideWarningAlertAction correctly', () => {
      const { component, checkScrollModal, actions } = setup();
      checkScrollModal.prop('onClose')(() => 1);
      expect(component.state('checkScrollModalShown')).toEqual(false);
      checkScrollModal.prop('onScrollToBottom')(() => actions.hideWarningAlertAction);
      expect(actions.hideWarningAlertAction).toHaveBeenCalled();
    });
  });
});

