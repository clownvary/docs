import { fromJS } from 'immutable';
import expect from 'expect';
import React from 'react';
import { mount } from 'enzyme';
import { MyCartItem } from 'index/components/Master/components/deviceEntry/pc/Navigation/MyCartItem';

import { getNavItemStyles } from 'index/initializers/theme';
//eslint-disable-next-line
import context, { childContextTypes } from 'utils/context';

const itemStyles = getNavItemStyles(context.theme);
const item = {
  title: 'MyCart',
  url: '/newcart',
  children: []
};

function setup(_count, _item = item, _itemStyles = itemStyles, _context = context) {
  const component = mount((< MyCartItem
    item={fromJS(_item)}
    cartCount={_count}
    itemStyles={_itemStyles}
  />), {
    context: _context,
    childContextTypes
  });

  return {
    component,
    labelText: component
      .find('a')
      .first()
      .text(),
    containerElement: component.find('.mycart'),
    iconElement: component.find('.icon-svg.icon-svg-shopping-cart'),
    linkElement: component.find('Link').first()
  // aHref: component.find("a").props().href
  };
}

describe('index/components/deviceEntry/pc/Navigation/MyCartItem', () => {
  it('should display wording label + count.', () => {
    const { labelText } = setup(1);
    const expectedLabel = `${context.getWording('my_cart_label')} (1)`;
    expect(labelText).toEqual(expectedLabel);
  });

  it('should display default label + count.', () => {
    const newConfigurations = context
      .configurations
      .set('my_cart_label', null);
    const newContext = {
      configurations: newConfigurations,
      getWording: key => context.getWording(key, newConfigurations)
    };
    const { labelText } = setup(2, undefined, undefined, {
      ...context,
      ...newContext
    });
    const expectedLabel = `${item.title} (2)`;
    expect(labelText).toEqual(expectedLabel);
  });

  it('should render out expected container class.', () => {
    const { containerElement } = setup();
    expect(containerElement.length).toEqual(1);
  });

  it('should render out expected icon class.', () => {
    const { iconElement } = setup();
    expect(iconElement.length).toEqual(1);
  });

  it('should render Link when clicking.', () => {
    const { linkElement, component } = setup();
    const _ins = component.instance();
    const spys = {
      submitForm: expect.spyOn(_ins, 'reloadMyCart')
    };
    linkElement.prop('onClick')();
    expect(spys.submitForm).toHaveBeenCalled();
  });

  /**
     * TODO: Need to mock a 'react-router' to test the Link and Indexlink of react-router,
     * otherwise we only get '<a>'.
     */
  // it("The item link rendered out should be equal to item.url.", () => {   const
  // {aHref} = setup();   expect(aHref).toEqual(item.url); });
});
