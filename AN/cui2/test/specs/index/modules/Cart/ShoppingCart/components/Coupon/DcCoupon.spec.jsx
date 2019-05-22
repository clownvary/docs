import React from 'react';
import { fromJS } from 'immutable';
import { mountWithIntl } from 'utils/enzymeWithIntl';
import Input from 'react-base-ui/lib/components/Input';
import Select from 'react-base-ui/lib/components/Select';
import Button from 'react-base-ui/lib/components/Button';
import decodeHtmlStr from 'react-base-ui/lib/utils/decodeHtmlStr';
import { DcCoupon } from 'index/modules/Cart/ShoppingCart/components/Coupon/DcCoupon';
import { generateCouponUniqueId } from 'index/modules/Cart/ShoppingCart/components/Coupon/util';

import jsonCoupons from 'Cart/ShoppingCart/get_coupons.json';

const { body: { dc_coupon: { available_coupons } } } = jsonCoupons;

const initialState = {
  dcCoupons: fromJS(available_coupons.map((item) => {
    const id = generateCouponUniqueId(item);
    return {
      ...item,
      ...{
        id,
        text: decodeHtmlStr(item.coupon_code),
        value: id
      }
    };
  })),
  responsive: { isSm: false, isMd: true },
  selectedDcCouponId: '',
  displayCouponList: true
};

function setup(props = {}) {
  const actions = {
    updateCouponCodeAction: jest.fn(),
    fetchCouponsAsyncAction: jest.fn(),
    applyCouponAsyncAction: jest.fn()
  };

  const component = mountWithIntl(
    <DcCoupon
      {...initialState}
      {...props}
      {...actions}
    />
  );
  return {
    component,
    actions
  };
}

describe('index/modules/Cart/ShoppingCart/components/Coupon/DcCoupon', () => {

  it('should display Select if displayCouponList is true', () => {
    const { component } = setup();
    expect(component.find(Input)).toHaveLength(0);
    expect(component.find(Select)).toHaveLength(1);
  });

  it('should display Input if displayCouponList is false', () => {
    const { component } = setup({
      ...initialState,
      displayCouponList: false
    });
    expect(component.find(Input)).toHaveLength(1);
    expect(component.find(Select)).toHaveLength(0);
  });

  it('should disable apply button if selectedDcCouponId is empty', () => {
    const { component } = setup({
      ...initialState,
      selectedDcCouponId: ''
    });
    expect(component.find(Button).prop('disabled')).toBeTruthy();
  });

  it('should disable apply button if selectedDcCouponId has value', () => {
    const { component } = setup({
      ...initialState,
      selectedDcCouponId: '123'
    });
    expect(component.find(Button).prop('disabled')).toBeFalsy();
  });

  it('should tigger updateCouponCodeAction by onInput', () => {
    const { actions, component } = setup({
      ...initialState,
      selectedDcCouponId: '123',
      displayCouponList: false
    });
    const input = component.find('input');
    input.prop('onInput')({ target: { value: 'input' } });
    expect(actions.updateCouponCodeAction).toHaveBeenCalled();
  });

  it('should tigger updateCouponCodeAction by onSelect', () => {
    const { actions, component } = setup({
      ...initialState,
      selectedDcCouponId: '123456',
      displayCouponList: true,
      responsive: { isLg: true }
    });
    const select = component.find(Select);
    expect(select).toHaveLength(1);
    select.simulate('change', { value: '7864353' });

    const input = component.find('input');
    input.simulate('change', { target: { value: '12' } });
    input.simulate('change', { target: { value: '976845' } });
    expect(actions.updateCouponCodeAction).toHaveBeenCalled();
  });
});

describe('applyCouponAsyncAction:', () => {
  it('should trigger applyCouponAsyncAction by click apply button', () => {
    const couponCode = '5846516848964165168463522';
    const { actions, component } = setup({
      ...initialState,
      selectedDcCouponId: couponCode,
      displayCouponList: true,
      responsive: { isSm: true }
    });
    component.find(Button).first().simulate('click');
    expect(actions.applyCouponAsyncAction).toHaveBeenCalled();
  });
});
