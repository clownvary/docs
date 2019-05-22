import { fromJS } from 'immutable';
import expect from 'expect';
import React from 'react';
import { mount } from 'enzyme';
import routeMap from 'shared/consts/routeMap';
import { CalendarItem } from 'index/components/Master/components/deviceEntry/mobile/Navigation/CalendarItem';

import { getNavItemStyles } from 'index/initializers/theme';

import fixedItemData from '../../../data/calendar';
//eslint-disable-next-line
import context, { childContextTypes } from 'utils/context';

const itemStyles = getNavItemStyles(context.theme);
const expectedItem = context.systemSettings.getIn(['navigation', 'menus', 3]);

function setup(_item = expectedItem, _itemStyles = itemStyles, _context = context) {
  const component = mount(<
    CalendarItem item={fromJS(_item)}
    itemStyles={_itemStyles}
    routeMap={routeMap}
    currentPath={'Home'}
  />, { context: _context, childContextTypes });

  return {
    component,
    labelText: component.find('a').first().text(),
    aHref: component.find('a').at(0).props().href
  };
}

describe('index/components/Master/components/deviceEntry/mobile/Navigation/CalendarItem', () => {

  it('should display wording label.', () => {
    const { labelText } = setup();
    expect(labelText).toEqual(context.getWording('online_calendars_lable'));
  });

  it('should display default label.', () => {
    const newConfigurations = context.configurations.set('online_calendars_lable', null);
    const newContext = {
      configurations: newConfigurations,
      getWording: key => context.getWording(key, newConfigurations)
    };
    const { labelText } = setup(undefined, undefined, { ...context, ...newContext });
    expect(labelText).toEqual(expectedItem.get('title'));
  });

  it('The item link rendered out should be equal to item.url.', () => {
    const { aHref } = setup();
    expect(aHref).toEqual(expectedItem.get('url'));
  });
});
