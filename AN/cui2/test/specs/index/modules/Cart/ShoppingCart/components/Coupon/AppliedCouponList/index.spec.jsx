import { fromJS } from 'immutable';
import React from 'react';
import merge from 'lodash/merge';
import { mount } from 'enzyme';
import ListBox from 'shared/components/ListBox';
import { AppliedDcCouponList } from 'index/modules/Cart/ShoppingCart/components/Coupon/AppliedDcCouponList';

import jsonCoupon from 'Cart/ShoppingCart/get_coupons.json';

const { body: { dc_coupon: { applied_coupons } } } = jsonCoupon;
const initialState = {
  appliedDcCoupons: fromJS(applied_coupons),
  maxCount: 2,
  errorMessage: 'test error'
};

function setup(_state = initialState) {
  const actions = {
    fetchCouponAppliedListAction: jest.fn(),
    deleteCouponAction: jest.fn(),
    applyCouponAsyncAction: jest.fn()
  };
  const state = merge({}, initialState, _state);
  const component = mount(
    <AppliedDcCouponList
      appliedDcCoupons={state.appliedDcCoupons}
      maxCount={state.maxCount}
      errorMessage={state.errorMessage}
      {...actions}
    />);

  return {
    component,
    listBox: component.find(ListBox),
    errorMsg: component.find('.error-message'),
    actions
  };
}

describe('index/modules/Cart/ShoppingCart/components/Coupon/AppliedDcCouponList', () => {
  it('AppliedDcCouponList should render correctly', () => {
    const { component, listBox, errorMsg } = setup();
    expect(component).toHaveLength(1);
    expect(listBox).toHaveLength(1);
    expect(errorMsg).toHaveLength(1);
    expect(errorMsg.text()).toEqual(initialState.errorMessage);
  });

  it('errorMsg hould not render when errorMessage is null', () => {
    const { errorMsg } = setup({ errorMessage: null });
    expect(errorMsg).toHaveLength(0);
  });

  it('listBox hould not render when appliedDcCoupons is null', () => {
    const { listBox } = setup({ appliedDcCoupons: [] });
    expect(listBox).toHaveLength(0);
  });

  describe('actions', () => {
    it('deleteCouponAction should be triggered correctly', () => {
      const { listBox, actions } = setup();
      listBox.find(ListBox.Item).map((node) => {
        node.find('a').first().simulate('click');
        expect(actions.deleteCouponAction).toHaveBeenCalled();
      });
    });
  });
});
