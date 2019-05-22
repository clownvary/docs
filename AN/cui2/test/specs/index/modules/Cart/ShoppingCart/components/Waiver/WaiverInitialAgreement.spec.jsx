import { fromJS } from 'immutable';
import expect from 'expect';
import React from 'react';
import Input from 'react-base-ui/lib/components/Input';
import { mountWithIntl } from 'utils/enzymeWithIntl';
import context, { childContextTypes } from 'utils/context';
import messages from 'source/en-US';
import * as waiverTypes from 'index/modules/Cart/ShoppingCart/consts/waiverTypes';
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
const mockState = () => {
  const { body: { waivers } } = jsonWaivers;
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
  return { waivers, waiversAgreements, checkout };
};

const initialState = mockState();
function setup(_state, _context = context) {
  const state = Object.assign(initialState, _state);
  const actions = {
    changeAgreementEntryAction: expect.createSpy(),
    uiChangeAgreementEntryAction: expect.createSpy()
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
    validationMsg: component.find('.validationMsg'),
    atchContent: component.find('.attachment-content'),
    modal: component.find('.waiver-attachment-alert-message'),
    actions

  };
}
describe('index/modules/Cart/ShoppingCard/components/Waiver/WaiverInitialAgreement', () => {
  it('should render WaiverInitialAgreement correctly', () => {
    const { finalAgreement, inputCtr } = setup();
    expect(finalAgreement.length).toEqual(1);
    expect(inputCtr.length).toEqual(1);
  });
  it('should trigger WaivechangeAgreementEntryAction when inputCtr onBlur ', () => {
    const { inputCtr, actions } = setup();
    const initialValue = 'test';
    inputCtr.find('input').simulate('blur', { target: { value: initialValue } });
    expect(actions.changeAgreementEntryAction).toHaveBeenCalledWith({
      id: waiverTypes.FINAL_INITIALS_WAIVER,
      value: initialValue
    });
    inputCtr.find('input').simulate('input');
    expect(actions.uiChangeAgreementEntryAction).toHaveBeenCalled();
  });
  it('should render validationMsg correctly', () => {
    const { validationMsg } = setup(
      {
        checkout: { needValidate: true },
        waiversAgreements: { [waiverTypes.FINAL_INITIALS_WAIVER]: { error: true } }
      }
    );
    expect(validationMsg.length).toEqual(1);
  });
  it('should trigger click correctly', () => {
    const { atchContent, modal } = setup({ waivers: { waiver_initials_online_text: 'test' } });
    atchContent.find('a').simulate('click');
    expect(modal.length).toEqual(0);
  });
});

