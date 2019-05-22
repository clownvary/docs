import { fromJS } from 'immutable';
import expect from 'expect';
import React from 'react';
import Input from 'react-base-ui/lib/components/Input';
import { mountWithIntl } from 'utils/enzymeWithIntl';
import context, { childContextTypes } from 'utils/context';
import { Attachment } from 'index/modules/Cart/ShoppingCart/components/Waiver/Attachment';
import jsonWaivers from 'Cart/ShoppingCart/get_waivers.json';

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

function setup(itemIndex = 0, _state, _context = context) {
  const actions = {
    changeAgreementEntryAction: expect.createSpy(),
    uiChangeAgreementEntryAction: expect.createSpy()
  };
  const state = Object.assign(initialState, _state);
  const component = mountWithIntl(
    <Attachment
      itemData={state.attachments[itemIndex]}
      waiversAgreements={state.waiversAgreements}
      key={state.attachments[itemIndex].id}
      checkout={fromJS(state.checkout)}
      {...actions}
    />, { context: _context, childContextTypes });
  return {
    component,
    actions
  };
}
describe('index/modules/Cart/ShoppingCard/components/Waiver/Attachment', () => {
  it('should return capitalize string ', () => {
    const { component } = setup();
    const _ins = component.instance();
    expect(_ins.capitalize('test')).toEqual('Test');
    expect(_ins.capitalize('')).toEqual('');
    expect(_ins.capitalize('tesT')).toEqual('TesT');
    expect(_ins.capitalize('1tesT')).toEqual('1TesT');
    expect(_ins.capitalize('1 t esT')).toEqual('1 T esT');
  });

  it('should call uiChangeAgreementEntryAction when click the input', () => {
    const { component, actions } = setup(1);
    const firstInput = component.find(Input).first();
    firstInput.prop('onInput')({ target: { value: '111', id: 100 } });
    expect(actions.uiChangeAgreementEntryAction).toHaveBeenCalled();

    firstInput.prop('onBlur')({ target: { value: '111', id: 100 } });
    expect(actions.changeAgreementEntryAction).toHaveBeenCalled();
  });
});

