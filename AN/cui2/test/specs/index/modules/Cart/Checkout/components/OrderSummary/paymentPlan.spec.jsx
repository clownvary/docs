import { fromJS } from 'immutable';
import expect from 'expect';
import React from 'react';
import { mountWithIntl } from 'utils/enzymeWithIntl';
import PaymentPlan from 'index/modules/Cart/Checkout/components/OrderSummary/paymentPlan';
/*eslint-disable*/
import agreement from 'Cart/Checkout/get_agreement.json';
/*eslint-enable*/

function setup(propData) {
  const component = mountWithIntl(
    <PaymentPlan
      data={propData}
    />);

  return {
    component,
    container: component.find('.payment-plan__panel'),
    titles: component.find('.dot')
  };
}


describe('index/modules/Cart/Checkout/components/OrderSummary/paymentPlan', () => {
  it('should render components successfull  ', () => {
    const { body: { ecp_agreement: agreementData } } = agreement;
    const { container, titles } = setup(fromJS(agreementData));
    expect(container.length).toEqual(1);
    expect(titles.length).toEqual(2);
  });

  it('should NOT render paymentPlans when paymentPlans is null', () => {
    const { container, titles } = setup(fromJS({ data: 'value' }));
    expect(container.length).toEqual(1);
    expect(titles.length).toEqual(0);
  });
});
