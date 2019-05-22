import React from 'react';
import { mount } from 'enzyme';
import { fromJS } from 'immutable';
import PaymentSummary from 'index/Payment/components/PaymentSummary';
import Popover from 'react-base-ui/lib/components/Popover';

jest.mock('index/Payment/components/PaymentAction', () => 'PaymentAction');
jest.mock('shared/components/HelpLink', () => 'HelpLink');

describe('index/Payment/components/PaymentSummary', () => {
  const getProps = (permitId, isRefund = false, isPaymentActionValid = true) => ({
    payment: fromJS({
      isRefund,
      isPaymentActionValid,
      payerPayments: [],
      paymentPlanWording: 'PaymentPlanXXX',
      allowModifyPaymentPlan: true,
      resize: 100,
      total: '19.00',
      transactionFee: '1.00',
      depositFee: '2.00',
      claimTaxTotal: '1.00',
      claimDiscountTotal: '2.00'
    }),
    paymentSummary: fromJS({
      hasBalance: true,
      hasPayments: true,
      payers: [{
        payerName: 'Flora', paidAmount: 5
      }],
      refunds: [{
        payerName: 'Flora', paidAmount: 5
      }],
      totalAmount: '19.00',
      paidAmount: '5.00',
      balanceAmount: '14.00'
    }),
    children: (<div className="mock-children">PaymentPlan Children</div>),
    initialData: {
      permitID: permitId || -1
    }
  });

  it('component should render payment detail without error', () => {
    const component = mount(<PaymentSummary {...getProps('1723')} />);
    const instance = component.instance();

    const paymentSumNames = component.find('span.payment-sum-name');
    const paymentSumValues = component.find('span.payment-sum-value');

    expect(paymentSumNames.at(0).text()).toEqual('Total Amount');
    expect(paymentSumValues.at(0).text()).toEqual('$19.00');

    expect(paymentSumNames.at(1).text()).toEqual('Paid Amount');

    const detailPopover = component.find(Popover);
    expect(detailPopover.node.props.className).toContain('u-hidden');

    const detailPopoverIcon = paymentSumValues.at(1).find('i.icon-info-circle');
    detailPopoverIcon.simulate('mouseOver');
    expect(instance.state.isShowPaymentDetail).toBeTruthy();
    expect(detailPopover.node.props.className).not.toContain('u-hidden');

    detailPopoverIcon.simulate('mouseOut');
    expect(instance.state.isShowPaymentDetail).toBeFalsy();
    expect(detailPopover.node.props.className).toContain('u-hidden');

    expect(paymentSumNames.at(2).text()).toEqual('Balance');
    expect(paymentSumValues.at(2).text()).toEqual('$14.00');

    expect(component.find('div.mock-children')).toHaveLength(1);
  });

  it('component should render payment without error', () => {
    const component = mount(<PaymentSummary {...getProps('')} />);

    expect(component.find('.text-color-strong').text()).toEqual('$19.00');

    const paymentFeeNames = component.find('span.payment-fee-name');
    const paymentFeeAmount = component.find('span.payment-fee-amount');

    expect(paymentFeeNames.at(0).text()).toEqual('Deposit Fee ');
    expect(paymentFeeAmount.at(0).text()).toEqual('$2.00');

    expect(paymentFeeNames.at(1).text()).toEqual('Transaction Fee ');
    expect(paymentFeeAmount.at(1).text()).toEqual('$1.00');

    expect(component.find('div.mock-children')).toHaveLength(1);

    const newProps = getProps('772', false, false);
    newProps.payment = newProps.payment.set('transactionFee', 0).set('depositFee', 0);
    component.setProps({...newProps});

    expect(component.find('span.payment-fee-name')).toHaveLength(0);
    expect(component.find('span.payment-fee-amount')).toHaveLength(0);
  });

  it('component should render refund without error', () => {
    const props = getProps('1723', true);
    const component = mount(<PaymentSummary {...props} />);

    expect(component.find('.text-color-strong').text()).toEqual('$19.00');

    const paymentFeeNames = component.find('span.payment-fee-name');
    const paymentFeeAmount = component.find('span.payment-fee-amount');

    expect(paymentFeeNames.at(0).text()).toEqual('Discount ');
    expect(paymentFeeAmount.at(0).text()).toEqual('-$2.00');

    expect(paymentFeeNames.at(1).text()).toEqual('Tax ');
    expect(paymentFeeAmount.at(1).text()).toEqual('$1.00');

    expect(component.find('div.mock-children')).toHaveLength(1);

    props.payment = props.payment.set('claimTaxTotal', 0).set('claimDiscountTotal', 0);
    component.setProps({...props});
    expect(component.find('span.payment-fee-name')).toHaveLength(0);
    expect(component.find('span.payment-fee-amount')).toHaveLength(0);
  });

  it('component lifecycle should work fine', () => {
    const component = mount(
      <PaymentSummary {...Object.assign(getProps('1723', false, true), { children: '',  })} />
    );

    expect(component.find('.payer-type-refund')).toHaveLength(1);

    const detailPopoverIcon = component.find('i.icon-info-circle');
    expect(detailPopoverIcon.node.className).not.toContain('icon-disabled');

    const nextProps = getProps('1723', false, true);
    nextProps.paymentSummary = nextProps.paymentSummary
      .set('hasPayments', false)
      .set('hasBalance', false).set('balanceAmount', '0.00')
      .set('refunds', []);
    nextProps.children = (<div className="mock-children">PaymentPlan Children</div>);
    component.setProps(nextProps);

    expect(detailPopoverIcon.node.className).toContain('icon-disabled');

    expect(component.find('.payer-type-refund')).toHaveLength(0);
  });
});
