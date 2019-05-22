import { fromJS } from 'immutable';
import expect from 'expect';
import React from 'react';
import Input from 'react-base-ui/lib/components/Input';
import { mountWithIntl } from 'utils/enzymeWithIntl';
import context, { childContextTypes } from 'utils/context';
import messages from 'source/en-US';
import { WaiverInitialAgreement } from 'index/modules/Cart/ShoppingCart/components/Waiver/WaiverInitialAgreement';

/*eslint-disable*/
import jsonWaivers from 'Cart/ShoppingCart/get_waivers.json';
/*eslint-enable*/
const intl = {
  messages
};
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
  return { waivers, waiversAgreements, checkout };
};

const initialState = mockState();
function setup(_state, _context = context) {
  const state = Object.assign(initialState, _state);
  const actions = {
    changeAgreementEntryAction: expect.createSpy()
  };
  const component = mountWithIntl(
    <WaiverInitialAgreement
      waivers={state.waivers}
      waiversAgreements={state.waiversAgreements}
      checkout={fromJS(state.checkout)}
      intl={intl}
      {...actions}
    />, { context: _context, childContextTypes });
  return {
    component,
    finalAgreement: component.find('.final-agreement'),
    inputCtr: component.find(Input),
    actions

  };
}
describe('index/modules/Cart/ShoppingCard/components/Waiver/WaiverInitialAgreement(UAT)', () => {
  describe('Inspect transactions linked waivers shall show correctly with/without system level waivers:', () => {
    it('should not render WaiverInitialAgreement when waiver_initials_online_text is null  ', () => {
      const { finalAgreement } = setup({ waivers: { waiver_initials_online_text: null } });
      expect(finalAgreement.length).toEqual(0);
    });
  });
});

