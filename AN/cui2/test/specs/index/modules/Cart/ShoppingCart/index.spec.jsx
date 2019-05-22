import React from 'react';
import { fromJS } from 'immutable';
import { mount } from 'enzyme';
import context, { childContextTypes } from 'utils/context';
import { ShoppingCart } from 'index/modules/Cart/ShoppingCart/index';

function setup(_context = context, isSm = true, isMd = true) {
  const actions = {
    initCartPageAsyncAction: jest.fn(() => Promise.resolve())
  };
  const component = mount(
    <ShoppingCart
      transactions={fromJS({ participants: [], payOnAccount: [] })}
      quickdonation={{}}
      responsive={{ isSm, isMd }}
      waiver={{}}
      checkout={{}}
      {...actions}
    />, { context: _context, childContextTypes });
  return {
    component,
    actions
  };
}

describe('index/modules/Cart/ShoppingCart', () => {
  it('initCartPageAsyncAction should be called correctly', () => {
    const { actions } = setup();
    expect(actions.initCartPageAsyncAction).toHaveBeenCalled();
  });

  it('initCartPageAsyncAction should be called correctly', () => {
    const { actions } = setup(context, false, false);
    expect(actions.initCartPageAsyncAction).toHaveBeenCalled();
  });

  it('handleChange should be called correctly', () => {
    const { component } = setup();
    const _ins = component.instance();
    _ins.handleChange({ isSticky: false });
    expect(component.state().isSticky).toEqual(false);
  });
});
