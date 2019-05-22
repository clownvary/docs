import { fromJS } from 'immutable';
import expect from 'expect';
import React from 'react';
import { mount } from 'enzyme';
import { HomeItem } from 'index/components/Master/components/deviceEntry/pc/Navigation/HomeItem';

import { getNavItemStyles } from 'index/initializers/theme';
//eslint-disable-next-line
import context, { childContextTypes } from 'utils/context';

const itemStyles = getNavItemStyles(context.theme);
const expectedItem = context.systemSettings.getIn(['navigation', 'menus', 0]);

function setup(_item = expectedItem, _itemStyles = itemStyles, _context = context) {
  const component = mount(<
    HomeItem item={fromJS(_item)}
    itemStyles={_itemStyles}
  />, { context: _context, childContextTypes });

  return {
    component,
    labelText: component.find('a').first().text(),
    aHref: component.find('a').props().href
  };
}

describe('index/components/deviceEntry/pc/Navigation/HomeItem', () => {
  it('should display wording label.', () => {
    const { labelText } = setup();
    expect(labelText).toEqual('HomeZ~');
  });

  it('should display default label.', () => {
    const newConfigurations = context.configurations.set('online_intro_label', null);
    const newContext = {
      configurations: newConfigurations,
      getWording: key => context.getWording(key, newConfigurations)
    };
    const { labelText } = setup(undefined, undefined, { ...context, ...newContext });
    expect(labelText).toEqual(expectedItem.get('title'));
  });

  it('The item link rendered out should be equal to item.url.', () => {
    const { aHref, component } = setup();
    expect(aHref).toEqual('javascript:void(0)');
    component.find('a').at(0).simulate('click');
  });
});
