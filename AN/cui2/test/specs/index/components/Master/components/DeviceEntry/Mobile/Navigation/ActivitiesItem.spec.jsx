import { fromJS } from 'immutable';
import expect from 'expect';
import React from 'react';
import { mount } from 'enzyme';
import routeMap from 'shared/consts/routeMap';
import { ActivitiesItem } from 'index/components/Master/components/deviceEntry/mobile/Navigation/ActivitiesItem';

import { getNavItemStyles } from 'index/initializers/theme';

import fixedItemData from '../../../data/activities';
//eslint-disable-next-line
import context, { childContextTypes } from 'utils/context';

const itemStyles = getNavItemStyles(context.theme);
const expectedItem = context.systemSettings.getIn(['navigation', 'menus', 1]);

function setup(_item = expectedItem, _itemStyles = itemStyles, _context = context) {
  const component = mount(<
    ActivitiesItem item={fromJS(_item)}
    itemStyles={_itemStyles}
    routeMap={routeMap}
    currentPath={'Home'}
  />, { context: _context, childContextTypes });

  return {
    component,
    labelText: component.find('a').first().text(),
    rows: component.find('.nav-secondary-menu-column').first().find('li'),
    columns: component.find('.nav-secondary-menu-column'),
    containerElement: component.find('.nav-activities-item'),
    aHref: component.find('a').at(0).props().href
  };
}

describe('index/components/Master/components/deviceEntry/mobile/Navigation/ActivitiesItem', () => {

  it('should display wording label.', () => {
    const { labelText } = setup();
    expect(labelText).toEqual('ActivitiesZ Home ~');
  });

  it('should display default label.', () => {
    const newConfigurations = context.configurations.set('online_activities_label', null);
    const newContext = {
      configurations: newConfigurations,
      getWording: key => context.getWording(key, newConfigurations)
    };
    const { labelText } = setup(undefined, undefined, { ...context, ...newContext });
    expect(labelText).toEqual(expectedItem.get('title'));
  });

  it('should render out expected container class.', () => {
    const { containerElement } = setup();
    expect(containerElement.length).toEqual(1);
  });

  it('The item link rendered out should be equal to item.url.', () => {
    const { aHref } = setup();
    expect(aHref).toEqual(expectedItem.get('url'));
  });
});
