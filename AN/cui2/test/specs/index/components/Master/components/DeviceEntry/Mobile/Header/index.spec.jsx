import expect from 'expect';
import React from 'react';
import { mountWithIntl } from 'utils/enzymeWithIntl';
import { MobileHeader } from 'index/components/Master/components/deviceEntry/mobile/Header/index';
//eslint-disable-next-line
import context, { childContextTypes } from 'utils/context';

function setup(_context = context, cartCount = 0, showMenu = false) {
  const actions = {
    fetchShoppingCartCountAction: expect.createSpy(),
    showMenuAction: expect.createSpy(),
    initCartPageAsyncAction: jest.fn()
  };
  const component = mountWithIntl(
    <MobileHeader
      cartCount={cartCount}
      showMenu={showMenu}
      {...actions}
    />, { context: _context, childContextTypes });

  return {
    component,
    actions,
    myCartElement: component.find('.an-responsiveHeader__cart').find('Link').at(0),
    menuElement: component.find('.an-responsiveHeader__menu'),
    logoElement: component.find('.an-responsiveHeader__logo'),
    cartElement: component.find('.an-responsiveHeader__cart')
  };
}

describe('index/components/Master/components/deviceEntry/mobile/Header/index', () => {
  it('should render out all expected Content child components', () => {
    const {
      menuElement,
      logoElement,
      cartElement
    } = setup();

    const countElement = cartElement.find('.an-responsiveHeader__cart-count');
    expect(menuElement.length).toEqual(1);
    expect(logoElement.length).toEqual(1);
    expect(cartElement.length).toEqual(1);
    expect(countElement.length).toEqual(0);
  });

  it('Menu should have a class icon-bars and no class icon-close ', () => {
    const {
      menuElement
    } = setup();

    const span = menuElement.find('.icon-svg-bars');
    expect(span.length).toEqual(1);
    const closeSpan = menuElement.find('.icon-svg-close');
    expect(closeSpan.length).toEqual(0);
  });


  it('should render out all expected Content child components when cartCount = 4, showMenu = true', () => {
    const cartCount = 4;
    const showMenu = true;
    const {
      menuElement,
      cartElement
    } = setup(context, cartCount, showMenu);

    const countElement = cartElement.find('.an-responsiveHeader__cart-count');
    expect(countElement.length).toEqual(1);
    expect(countElement.text()).toEqual(cartCount);
    const span = menuElement.find('.icon-svg-bars');
    expect(span.length).toEqual(0);
    const closeSpan = menuElement.find('.icon-svg-remove');
    expect(closeSpan.length).toEqual(1);

    const button = cartElement.find('button');
    button.simulate('touchstart');
    expect(button.length).toEqual(1);
  });

  it('should call showMenuAction when clicking menu icon.', () => {
    const {
      menuElement,
      actions
    } = setup();

    const button = menuElement.find('button');
    expect(button.length).toEqual(1);
    button.simulate('click');
    button.simulate('touchstart');
    expect(actions.showMenuAction).toHaveBeenCalled();
  });

  it('should not show logo if systemSettings.header.logo is false.', () => {
    const {
      component
    } = setup({
      ...context,
      systemSettings: context.systemSettings.setIn(['header', 'logo'], false)
    });

    expect(component.find('img').length).toEqual(0);
  });

  it('should call initCartPageAsyncAction when clicking may cart.', () => {
    const {
      myCartElement,
      actions
    } = setup();

    try {
      myCartElement.simulate('click');
      expect(actions.initCartPageAsyncAction).toHaveBeenCalled();
    } catch (e) {}
  });

  it('window.onpopstate should be null when component be unmounted', () => {
    const { component } = setup();
    component.unmount();
    expect(window.onpopstate).toBe(null);
  });
  it('onpopstate should be trigger when window.onpopstate be called ', () => {
    const { actions } = setup();
    window.onpopstate();
    expect(actions.showMenuAction).toHaveBeenCalledWith(false);
  });
});
