import { fromJS } from 'immutable';
import expect from 'expect';
import React from 'react';
import { mount } from 'enzyme';
import { CalendarItem } from 'index/components/Master/components/deviceEntry/pc/Navigation/CalendarItem';

import { getNavItemStyles } from 'index/initializers/theme';

import fixedItemData from '../../../data/calendar';
//eslint-disable-next-line
import context, { childContextTypes } from 'utils/context';

const itemStyles = getNavItemStyles(context.theme);
const expectedItem = context.systemSettings.getIn(['navigation', 'menus', 3]);

function setup(_item = expectedItem, _itemStyles = itemStyles, _context = context) {
  const actions = {
    expandSecondaryMenuAction: expect.createSpy()
  };

  const component = mount(<
    CalendarItem item={fromJS(_item)}
    itemStyles={_itemStyles}
    expandSecondaryMenu={fromJS({})}
    {...actions}
  />, { context: _context, childContextTypes });

  return {
    component,
    SecondaryMenu: component.find('SecondaryMenu'),
    labelText: component.find('a').first().text(),
    rows: component.find('.nav-secondary-menu-column').first().find('li'),
    columns: component.find('.nav-secondary-menu-column'),
    containerElement: component.find('.nav-calendar-item'),
    hasSecondaryMenuClassOnLi: component.find('.nav-has-secondary-menu'),
    aHref: component.find('a').at(0).props().href,
    expandButton: component.find('button'),
    actions
  };
}

describe('index/components/deviceEntry/pc/Navigation/CalendarItem', () => {
  it('should render SecondaryMenu component', () => {
    const { SecondaryMenu } = setup();
    expect(SecondaryMenu.length).toEqual(1);
  });

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

  it('should render SecondaryMenu that should be 4 columns.', () => {
    const { columns } = setup(fixedItemData);
    expect(columns.length).toEqual(3);
  });

  it('should render SecondaryMenu that should be 6 rows.', () => {
    const { rows } = setup(fixedItemData);
    expect(rows.length).toEqual(8);
  });

  it('should render out expected container class.', () => {
    const { containerElement } = setup();
    expect(containerElement.length).toEqual(1);
  });

  it('should render out expected class to control secondary menu.', () => {
    const { hasSecondaryMenuClassOnLi } = setup();
    expect(hasSecondaryMenuClassOnLi.length).toEqual(1);
  });

  it('The item link rendered out should be equal to item.url.', () => {
    const { aHref, component } = setup();
    expect(aHref).toEqual('javascript:void(0)');
    component.find('a').at(0).simulate('click');
  });

  it('The expandButton text should be equal to online_activities_label.', () => {
    const { expandButton, component } = setup();
    component.setProps({ expandSecondaryMenu: fromJS({ calendar: true }) });
    expect(expandButton.text()).toEqual(`Expand: ${context.getWording('online_calendars_lable')}`);
  });

  it('Should call expandSecondaryMenuAction when enter a char', () => {
    const { expandButton, actions, component } = setup();
    component.setProps({ expandSecondaryMenu: fromJS({ calendar: false }) });
    expandButton.simulate('keyDown');
    expect(actions.expandSecondaryMenuAction).toHaveBeenCalled();
  });
});
