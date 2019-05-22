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
import { RunningCart } from 'shared/components/RunningCart';
import jsonRunningCart from 'json/Cart/runningCart.json';
import {pages} from 'shared/consts';

const {
  body: { running_cart }
} = jsonRunningCart;

const runningCart = fromJS({
  cartList: [],
  cartLoading: false,
  error: false
});

const cartEmptyMessage = 'Your shopping cart is empty.';

function setup(_runningCart = runningCart) {
  const actions = {
    fetchRunningCart: jest.fn(),
    redirect: jest.fn()
  };

  const component = mount(
    <RunningCart runningCart={_runningCart} {...actions} disabled={ false }/>
  );

  return {
    component,
    cartButton: component.find('button'),
    cartListCount: component.find('.cart-list-count'),
    runningCartWrapper: component.find('.runningCart'),
    cartList: component.find('.list'),
    cartEmpty: component.find('.cart-empty'),
    cartLoading: component.find('.cart-loading'),
    cartError: component.find('.cart-error'),
    actions
  };
}

describe('shared/components/RunningCart', function () {
  it('should have no count when cart list is empty', function () {
    let {
      cartButton,
      cartListCount,
      runningCartWrapper,
      cartList,
      cartEmpty,
      cartLoading,
      cartError
    } = setup();

    expect(cartButton.node.disabled).toBeTruthy();

    expect(cartListCount).toHaveLength(1);
    expect(cartListCount.hasClass('u-hidden')).toBe(true);
    expect(runningCartWrapper).toHaveLength(1);
    expect(runningCartWrapper.hasClass('u-hidden')).toBe(true);
    expect(cartList).toHaveLength(0);

    expect(cartEmpty).toHaveLength(1);
    expect(cartEmpty.hasClass('u-hidden')).toBe(false);
    expect(cartEmpty.text()).toBe(cartEmptyMessage);

    expect(cartLoading).toHaveLength(1);
    expect(cartLoading.hasClass('u-hidden')).toBe(true);

    expect(cartError).toHaveLength(1);
    expect(cartError.hasClass('u-hidden')).toBe(true);

    expect(cartError.text()).toBe('');
  });

  it('Should has error when fetch cart list error', function() {
    let errorMessage = 'Opts, Error Fetch Cart List';
    let _runningCart = runningCart.set('error', errorMessage).set('cartList', fromJS(running_cart));
    let {
      cartListCount,
      runningCartWrapper,
      cartList,
      cartEmpty,
      cartLoading,
      cartError
    } = setup(_runningCart);

    expect(cartListCount).toHaveLength(1);
    expect(cartListCount.hasClass('u-hidden')).toBe(false);
    expect(cartListCount.text()).toBe('3');

    expect(runningCartWrapper).toHaveLength(1);
    expect(runningCartWrapper.hasClass('u-hidden')).toBe(true);
    expect(cartList).toHaveLength(3);

    expect(cartEmpty).toHaveLength(1);
    expect(cartEmpty.hasClass('u-hidden')).toBe(true);
    expect(cartEmpty.text()).toBe(cartEmptyMessage);

    expect(cartLoading).toHaveLength(1);
    expect(cartLoading.hasClass('u-hidden')).toBe(true);

    expect(cartError).toHaveLength(1);
    expect(cartError.hasClass('u-hidden')).toBe(false);
    expect(cartError.text()).toBe(errorMessage);
  })

  it('Should show loading when fetching cart list', function() {
    let _runningCart = runningCart.set('cartLoading', true).set('cartList', fromJS(running_cart));
    let {
      cartButton,
      cartListCount,
      runningCartWrapper,
      cartList,
      cartEmpty,
      cartLoading,
      cartError
    } = setup(_runningCart);

    expect(cartButton.node.disabled).toBeFalsy();

    expect(cartListCount).toHaveLength(1);
    expect(cartListCount.hasClass('u-hidden')).toBe(false);
    expect(cartListCount.text()).toBe('3');

    expect(runningCartWrapper).toHaveLength(1);
    expect(runningCartWrapper.hasClass('u-hidden')).toBe(true);
    expect(cartList).toHaveLength(3);

    expect(cartEmpty).toHaveLength(1);
    expect(cartEmpty.hasClass('u-hidden')).toBe(true);
    expect(cartEmpty.text()).toBe(cartEmptyMessage);

    expect(cartLoading).toHaveLength(1);
    expect(cartLoading.hasClass('u-hidden')).toBe(false);

    expect(cartError).toHaveLength(1);
    expect(cartError.hasClass('u-hidden')).toBe(true);
    expect(cartError.text()).toBe('');
  })

  it('Should show cart modal when mouse over the cart icon', function() {
    let {
      component,
      cartListCount,
      runningCartWrapper,
      cartList,
      cartEmpty,
      cartLoading,
      cartError,
      actions
    } = setup();

    component.simulate('mouseEnter');
    expect(actions.fetchRunningCart).toHaveBeenCalled();

    expect(cartListCount).toHaveLength(1);
    expect(cartListCount.hasClass('u-hidden')).toBe(true);
    expect(cartListCount.text()).toBe('0');

    expect(runningCartWrapper).toHaveLength(1);
    expect(runningCartWrapper.hasClass('u-hidden')).toBe(false);
    expect(cartList).toHaveLength(0);

    expect(component.find('.cart-list-wrapper').hasClass('u-hidden')).toBe(true);
    expect(cartEmpty).toHaveLength(1);
    expect(cartEmpty.hasClass('u-hidden')).toBe(false);
    expect(cartEmpty.text()).toBe(cartEmptyMessage);

    expect(cartLoading).toHaveLength(1);
    expect(cartLoading.hasClass('u-hidden')).toBe(true);

    expect(cartError).toHaveLength(1);
    expect(cartError.hasClass('u-hidden')).toBe(true);
    expect(cartError.text()).toBe('');
  })

  it('Should hide cart modal when mouse leave the cart icon', function() {
    let {
      component,
      cartListCount,
      runningCartWrapper,
      actions
    } = setup();

    jest.useFakeTimers();

    component.simulate('mouseEnter');
    component.simulate('mouseEnter');
    component.simulate('mouseLeave');

    jest.runAllTimers();

    expect(actions.fetchRunningCart).toHaveBeenCalled();
    expect(component.instance().state.isExpanded).toBe(false);
    expect(cartListCount).toHaveLength(1);
    expect(cartListCount.hasClass('u-hidden')).toBe(true);
    expect(cartListCount.text()).toBe('0');
    expect(runningCartWrapper).toHaveLength(1);
    expect(runningCartWrapper.hasClass('u-hidden')).toBe(true);

    jest.clearAllTimers();
  });

  it('Should redirect when mouse click the View Cart button', function() {
    const runningCart = fromJS({
      cartList: [{ }],
      cartLoading: false,
      error: false
    });
    let {
      cartButton,
      actions
    } = setup(runningCart);

    jest.useFakeTimers();

    pages.buildUrl = jest.fn(() => 'url');
    cartButton.simulate('click');

    jest.runAllTimers();

    expect(cartButton).toHaveLength(1);
    expect(cartButton.find('.cart-list-count')).toHaveLength(1);
    expect(actions.redirect).toHaveBeenCalled();

    jest.clearAllTimers();
  });
});
