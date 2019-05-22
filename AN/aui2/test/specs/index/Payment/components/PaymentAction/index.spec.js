import React from 'react';
import { fromJS } from 'immutable';
import { mount } from 'enzyme';
import { PaymentAction } from 'index/Payment/components/PaymentAction';
import { PAY_NOW_KEY, MODIFY_PAYMENT_PLAN_KEY } from 'index/Payment/consts/paymentActionTypesOnModification';

describe('index/Payment/components/PaymentAction', () => {
  it('component should work fine', () => {
    const updatePaymentTypeOnModification = jest.fn();
    const paymentAction = fromJS({ paymentActionType: PAY_NOW_KEY });
    const props = {
      paymentPlanWording: 'paymentPlanX',
      paymentAction
    };
    const component = mount(<PaymentAction
      {...props}
      updatePaymentTypeOnModification={updatePaymentTypeOnModification}/>
    );

    expect(component.find('div.payment-action')).toHaveLength(1);
    expect(component.find('div.action-item')).toHaveLength(2);

    const radios = component.find('input[type="radio"]');
    expect(radios).toHaveLength(2);

    const paymentPlanRadio = radios.at(0);
    paymentPlanRadio.simulate('change', { target: { value: 200 } });
    expect(updatePaymentTypeOnModification).toHaveBeenCalledTimes(1);

    const paynowRadio = radios.at(1);
    paynowRadio.simulate('change', { target: { value: 300 } });
    expect(updatePaymentTypeOnModification).toHaveBeenCalledTimes(2);
  });
});
