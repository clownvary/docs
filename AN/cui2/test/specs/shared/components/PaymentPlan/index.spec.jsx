import React from 'react';
import { mountWithIntl } from 'utils/enzymeWithIntl';
import context, { childContextTypes } from 'utils/context';
import { PaymentPlan } from 'shared/components/PaymentPlan';

describe('shared/components/PaymentPlan', () => {
  const data = [
    { date: '05 AUG 2019', day: 'Mon', amount: 12.5 },
    { date: '13 AUG 2019', day: 'Tue', amount: 12.5 },
    { date: '21 AUG 2019', day: 'Wed', amount: 12.5 },
    { date: '29 AUG 2019', day: 'Thu', amount: 12.5 },
    { date: '06 SEP 2019', day: 'Fri', amount: 12.5 }
  ];
  const className = 'test-payment-plan';
  const total = 70;

  it('Shall render component correctly', () => {
    const props = {
      responsive: { isSm: false },
      data, total, className
    };
    const component = mountWithIntl(
      <PaymentPlan {...props} />,
      { context, childContextTypes }
    );

    expect(component.find(`.payment-plan.${className}`)).toHaveLength(1);

    const headers = component.find('.payment-plan-header td');
    expect(headers).toHaveLength(3);
    expect(headers.at(2).text()).toEqual('AMOUNT DUE');

    const items = component.find('.payment-plan-item');
    expect(items).toHaveLength(5);

    const footer = component.find('.payment-plan-footer');
    expect(footer).toHaveLength(1);
    expect(footer.text()).toEqual('Total$70.00');
  });

  it('Shall render component correctly in small screen', () => {
    const props = {
      responsive: { isSm: true },
      data, total, className
    };
    const component = mountWithIntl(
      <PaymentPlan {...props} />,
      { context, childContextTypes }
    );

    const headers = component.find('.payment-plan-header td');
    expect(headers).toHaveLength(3);
    expect(headers.at(2).text()).toEqual('AMOUNT');
  });
});
