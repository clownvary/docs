import { fromJS } from 'immutable';
import expect from 'expect';
import React from 'react';
import { mount } from 'enzyme';
import routeMap from 'shared/consts/routeMap';
import { NormalItem } from 'index/components/Master/components/deviceEntry/mobile/Navigation/NormalItem';

import { getNavItemStyles } from 'index/initializers/theme';
//eslint-disable-next-line
import context, { childContextTypes } from 'utils/context';

const itemStyles = getNavItemStyles(context.theme);
const defaultItem = {
  title: 'Facilities',
  url: 'http://apm.activenet.com'
};

function setup(_item = defaultItem, _itemStyles = itemStyles, _context = context) {
  const component = mount(
    <NormalItem
      item={fromJS(_item)}
      itemStyles={_itemStyles}
      routeMap={routeMap}
      currentPath={'Home'}
    />
  , { context: _context, childContextTypes });

  return {
    component,
    labelText: component.find('a').first().text(),
    aHref: component.find('a').at(0).props().href
  };
}

describe('index/components/Master/components/deviceEntry/mobile/Navigation/NormalItem', () => {
  it('should display wording label - Facilities.', () => {
    const { labelText } = setup();
    expect(labelText).toEqual(context.getWording('online_facilities_label'));
  });

  it('should display default label - Facilities.', () => {
    const newConfigurations = context.configurations.set('online_facilities_label', null);
    const newContext = {
      configurations: newConfigurations,
      getWording: key => context.getWording(key, newConfigurations)
    };
    const { labelText } = setup(undefined, undefined, { ...context, ...newContext });
    expect(labelText).toEqual(defaultItem.title);
  });

  it('should display wording label - Membership.', () => {
    const item = fromJS({ title: 'Membership' });
    const { labelText } = setup(item);
    expect(labelText).toEqual(context.getWording('online_memberships_lable'));
  });

  it('should display default label - Membership.', () => {
    const item = fromJS({ title: 'Membership' });
    const newConfigurations = context.configurations.set('online_memberships_lable', null);
    const newContext = {
      configurations: newConfigurations,
      getWording: key => context.getWording(key, newConfigurations)
    };
    const { labelText } = setup(item, undefined, { ...context, ...newContext });
    expect(labelText).toEqual(item.get('title'));
  });

  it('should display wording label - Leagues.', () => {
    const item = fromJS({ title: 'Leagues' });
    const { labelText } = setup(item);
    expect(labelText).toEqual(context.getWording('online_sports_lable'));
  });

  it('should display default label - Leagues.', () => {
    const item = fromJS({ title: 'Leagues' });
    const newConfigurations = context.configurations.set('online_sports_lable', null);
    const newContext = {
      configurations: newConfigurations,
      getWording: key => context.getWording(key, newConfigurations)
    };
    const { labelText } = setup(item, undefined, { ...context, ...newContext });
    expect(labelText).toEqual(item.get('title'));
  });

  it('should display wording label - Donation.', () => {
    const item = fromJS({ title: 'Donation' });
    const { labelText } = setup(item);
    expect(labelText).toEqual(context.getWording('online_donations_lable'));
  });

  it('should display default label - Donation.', () => {
    const item = fromJS({ title: 'Donation' });
    const newConfigurations = context.configurations.set('online_donations_lable', null);
    const newContext = {
      configurations: newConfigurations,
      getWording: key => context.getWording(key, newConfigurations)
    };
    const { labelText } = setup(item, undefined, { ...context, ...newContext });
    expect(labelText).toEqual(item.get('title'));
  });

  it('should display wording label - GiftCertificates.', () => {
    const item = fromJS({ title: 'GiftCertificates' });
    const { labelText } = setup(item);
    expect(labelText).toEqual(context.getWording('online_gift_lable'));
  });

  it('should display default label - GiftCertificates.', () => {
    const item = fromJS({ title: 'GiftCertificates' });
    const newConfigurations = context.configurations.set('online_gift_lable', null);
    const newContext = {
      configurations: newConfigurations,
      getWording: key => context.getWording(key, newConfigurations)
    };
    const { labelText } = setup(item, undefined, { ...context, ...newContext });
    expect(labelText).toEqual(item.get('title'));
  });

  it('should not display label - null.', () => {
    const item = fromJS({ title: null });
    const { labelText } = setup(item);
    expect(labelText).toEqual('');
  });

  it('The item link rendered out should be equal to item.url.', () => {
    const { aHref } = setup();
    expect(aHref).toEqual(defaultItem.url);
  });
});
