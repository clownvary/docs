import React from 'react';
import { fromJS } from 'immutable';
import { shallow } from 'enzyme';
import { Coupon } from 'index/modules/Cart/ShoppingCart/components/Coupon';
import DcCoupon from 'index/modules/Cart/ShoppingCart/components/Coupon/DcCoupon';
import context, { childContextTypes } from 'utils/context';// eslint-disable-line

import jsonCoupons from 'Cart/ShoppingCart/get_coupons.json';

const { body: { dc_coupon: { available_coupons } } } = jsonCoupons;

const initialState = fromJS({
  dcCoupons: available_coupons,
  appliedDcCoupons: [],
  selectedDcCouponId: '',
  showCouponSection: true
});

function setup(_context = context, props = {}) {
  const component = shallow(
    <Coupon
      coupon={initialState} {...props}
    />,
    { context: _context, childContextTypes }
  );
  return {
    component
  };
}

describe('index/modules/Cart/ShoppingCart/components/Coupon', () => {
  it('should display coupon selection if showCouponSection is true', () => {
    const { component } = setup();

    expect(component.find('.coupon-wrapper')).toHaveLength(1);
    expect(component.find(DcCoupon)).toHaveLength(1);
  });

  it('should not display coupon selection if showCouponSection is false', () => {
    const { component } = setup(undefined, {
      coupon: initialState.set('showCouponSection', false)
    });

    expect(component.find('.coupon-wrapper')).toHaveLength(0);
    expect(component.find(DcCoupon)).toHaveLength(0);
  });
});
