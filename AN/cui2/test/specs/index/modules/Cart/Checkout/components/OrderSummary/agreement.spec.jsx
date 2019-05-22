import { fromJS } from 'immutable';
import expect from 'expect';
import React from 'react';
import { mountWithIntl } from 'utils/enzymeWithIntl';
import context, { childContextTypes } from 'utils/context';
import { Agreement } from 'index/modules/Cart/Checkout/components/OrderSummary/agreement';
/*eslint-disable*/
import agreement from 'Cart/Checkout/get_agreement.json';
/*eslint-enable*/

const { body: { ecp_agreement: agreementData } } = agreement;

function setup(_context = context, _data = agreementData) {
  const data = Object.assign({}, agreementData, _data);
  const component = mountWithIntl(
    <Agreement
      data={fromJS(data)}
    />, { context: _context, childContextTypes });

  return {
    component,
    container: component.find('.agreement-panel'),
    paymentPlan: component.find('PaymentPlan')
  };
}


describe('index/modules/Cart/Checkout/components/OrderSummary/agreement', () => {
  it('should render components successfull  ', () => {
    const { container, paymentPlan } = setup();
    expect(container.length).toEqual(1);
    expect(paymentPlan.length).toEqual(1);
  });

  it('should render components successfull  when site_info is {}', () => {
    const configuration = {
      organization_name: 'whyy',
      show_pad_agreement_for_ecp: true,
      pad_agreement_text: '',
      ach_agreement_text: ''
    };
    const content = { configurations: fromJS(configuration) };

    const data = { site_info: {} };
    const { container, paymentPlan } = setup(content, data);

    expect(container.length).toEqual(1);
    expect(paymentPlan.length).toEqual(1);
  });

  it('should render components successfull when show_pad_agreement_for_ecp is true ', () => {
    const configuration = {
      organization_name: 'whyy',
      show_pad_agreement_for_ecp: true,
      pad_agreement_text: '',
      ach_agreement_text: ''
    };
    const content = { configurations: fromJS(configuration) };

    const data = { site_info: null };
    const { container, paymentPlan } = setup(content, data);

    expect(container.length).toEqual(1);
    expect(paymentPlan.length).toEqual(1);
  });
  it('should run fillValueIntoAgreement method correctly  ', () => {
    const { component } = setup(undefined, { site_info: null });
    component.setContext({ configurations: fromJS({ show_pad_agreement_for_ecp: 'test', pad_agreement_text: 'test_message {agency_name}', organization_name: 'text_org' }) });
    const text = component.instance().fillValueIntoAgreement();
    expect(text).toEqual('test_message text_org');
  });
  it('should run fillValueIntoAgreement method correctly when address is not bull', () => {
    const { component } = setup(undefined, { site_info: { address1: 'address1', address2: 'address1' } });
    component.setContext({ configurations: fromJS({ show_pad_agreement_for_ecp: 'test', pad_agreement_text: 'test_message {agency_name} {address}', organization_name: 'text_org' }) });
    const text = component.instance().fillValueIntoAgreement();
    expect(text).toEqual('test_message text_org address1<br/>address1');
  });
});
