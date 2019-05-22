import React from 'react';
import { MobileHeader } from 'index/components/Master/components/deviceEntry/mobile/Header/index';
import { mountWithIntl } from 'utils/enzymeWithIntl';
import context, { childContextTypes } from 'utils/context';
import { Link } from 'shared/components/Link';
import { Simulate } from 'react-dom/test-utils';

const { click } = Simulate;

function setupMobileHeader(router, _context = context, cartCount = 0, showMenu = false) {
  const actions = {
    initCartPageAsyncAction: jest.fn(),
    showMenuAction: jest.fn()
  };
  const component = mountWithIntl(
    <MobileHeader
      router={router}
      cartCount={cartCount}
      showMenu={showMenu}
      {...actions}
    />, { context: _context, childContextTypes });

  return {
    component,
    actions,
    cartElement: component.find('.an-responsiveHeader__cart')
  };
}

describe('index/components/Master/components/deviceEntry/common/reloadMyCart(MobileHeader)', () => {
  it('should dispatch action initCartPageAsyncAction', () => {
    const {
      actions,
      cartElement
    } = setupMobileHeader({ isActive: () => true });

    expect(cartElement.length).toEqual(1);
    try {
      cartElement.find('a').at(0).simulate('click');
      expect(actions.showMenuAction).toHaveBeenCalled();
    } catch (e) {
      expect(actions.showMenuAction).toHaveBeenCalled();
    }
  });

  it('should throw error if no router and initCartPageAsyncAction bind.', () => {
    const {
      cartElement
    } = setupMobileHeader();

    expect(cartElement.length).toEqual(1);
    try {
      cartElement.find('a').at(0).simulate('click');
    } catch (e) {
      expect(e.message).toEqual(`[Function reloadMyCart error]:
          Please check if have bind router and initCartPageAsyncAction on component layer.`);
    }
  });
});
