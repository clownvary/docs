/**
 * todo: refactor dependency resolver inside karma.conf.js
 * so we can properly resolve linting errors that occur when
 * importing from json/** directory
 */

/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/no-unresolved */

import React from 'react';
import { mount } from 'enzyme';
import { fromJS } from 'immutable';
import FeeFooter from 'shared/components/PermitFee/FeeFooter';

const defaultProps = {
  subTotal: '$124.23',
  taxes: [],
  total: '$234.3',
  subTotalTxt: 'Subtotal of event(s)',
  amountPaid: '$12.20',
  unpaidAmount: null,
  refundAmount: null
};

function setup(props = defaultProps) {
  const component = mount(
    <FeeFooter {...props}></FeeFooter>
  );

  return {
    component,
    subTotalText: component.find('.subtotal-text'),
    taxes: component.find('.tax-detail'),
    total: component.find('.stress-text'),
    updateAmountDoms: component.find('.amount-update')
  };
}

describe('shared/components/PermitFee/FeeFooter', function () {
  it('should render footer correctly when has no fee amount updated', function () {
    let {
      subTotalText,
      taxes,
      total,
      updateAmountDoms
    } = setup();

    expect(subTotalText.text()).toEqual(defaultProps.subTotalTxt);
    expect(taxes.length).toEqual(0);
    expect(total.length).toEqual(2);
    expect(updateAmountDoms.length).toEqual(0);
  });

  it('should render footer correctly when has unpaid amount', function () {
    let {
      subTotalText,
      updateAmountDoms
    } = setup({
      subTotal: '$124.23',
      taxes: [],
      total: '$234.3',
      amountPaid: '$12.20',
      unpaidAmount: '$222.00',
      refundAmount: null
    });

    expect(subTotalText.text()).toEqual('Subtotal');
    expect(updateAmountDoms.length).toEqual(4);
    expect(updateAmountDoms.at(1).text()).toEqual('Unpaid');
  });

  it('should render footer correctly when has taxes', function () {
    let {
      subTotalText,
      taxes,
      updateAmountDoms
    } = setup({
      subTotal: '$124.23',
      taxes: [{
        name: "test1",
        amount: 1.64
      }, {
        name: "test2",
        amount: 3.30
      }],
      total: '$234.3',
      amountPaid: '$12.20',
      unpaidAmount: '$222.00',
      refundAmount: null
    });

    expect(subTotalText.text()).toEqual('Subtotal');
    expect(taxes.length).toEqual(2);
    expect(updateAmountDoms.length).toEqual(4);
    expect(updateAmountDoms.at(1).text()).toEqual('Unpaid');
  });

  it('should render footer correctly when need refund', function () {
    let {
      subTotalText,
      updateAmountDoms,
      taxes
    } = setup({
      subTotal: '$124.23',
      taxes: [],
      total: '$234.3',
      amountPaid: '$12.20',
      unpaidAmount: null,
      refundAmount: '$222.00'
    });

    expect(subTotalText.text()).toEqual('Subtotal');
    expect(updateAmountDoms.length).toEqual(4);
    expect(updateAmountDoms.at(1).text()).toEqual('Refund');
    expect(taxes.length).toEqual(0);
  });
});
