import { fromJS } from 'immutable';
import expect from 'expect';
import React from 'react';
import { shallow } from 'enzyme';
import { Navigation } from 'index/components/Master/components/deviceEntry/pc/Navigation/index';
import _MyCartItem from 'index/components/Master/components/deviceEntry/pc/Navigation/MyCartItem';
//eslint-disable-next-line
import context, { childContextTypes } from 'utils/context';

function setup(_context = context) {
  const actions = {
    fetchShoppingCartCountAction: expect.createSpy()
  };

  const component = shallow(
    <Navigation
      transactionCount={1}
      {...actions}
    />, { context: _context, childContextTypes });

  return {
    component,
    HomeItem: component.find('HomeItem'),
    ActivitiesItem: component.find('ActivitiesItem'),
    CalendarItem: component.find('CalendarItem'),
    NormalItem: component.find('NormalItem'),
    MyCartItem: component.find(_MyCartItem),
    wrapElement: component.find('.an-navigation__wrapper'),
    containerElement: component.find('.an-navigation'),
    placeholderElement: component.find('.placeholder'),
    actions
  };
}

describe('index/components/deviceEntry/pc/Navigation/index', () => {
  it('should render out all expected Navigation child components', () => {
    const {
      HomeItem,
      ActivitiesItem,
      NormalItem,
      MyCartItem,
      CalendarItem
    } = setup();
    expect(HomeItem.length).toEqual(1);
    expect(ActivitiesItem.length).toEqual(1);
    expect(CalendarItem.length).toEqual(1);
    expect(NormalItem.length).toEqual(5);
    expect(MyCartItem.length).toEqual(1);
  });

  it('should render HomeItem only.', () => {
    const newSystemSettings = context.systemSettings.setIn(['navigation', 'menus'],
      fromJS([{
        title: 'Home',
        url: 'http://apm.activenet.com'
      }]));
    const {
      HomeItem,
      ActivitiesItem,
      NormalItem,
      MyCartItem,
      CalendarItem
    } = setup({ ...context, ...{ systemSettings: newSystemSettings } });
    expect(HomeItem.length).toEqual(1);
    expect(ActivitiesItem.length).toEqual(0);
    expect(CalendarItem.length).toEqual(0);
    expect(NormalItem.length).toEqual(0);
    expect(MyCartItem.length).toEqual(0);
  });

  it('should render ActivitiesItem only.', () => {
    const newSystemSettings = context.systemSettings.setIn(['navigation', 'menus'],
      fromJS([{
        title: 'Activities',
        url: 'http://apm.activenet.com',
        children: []
      }]));

    const {
      HomeItem,
      ActivitiesItem,
      NormalItem,
      MyCartItem,
      CalendarItem
    } = setup({ ...context, ...{ systemSettings: newSystemSettings } });
    expect(HomeItem.length).toEqual(0);
    expect(ActivitiesItem.length).toEqual(1);
    expect(CalendarItem.length).toEqual(0);
    expect(NormalItem.length).toEqual(0);
    expect(MyCartItem.length).toEqual(0);
  });

  it('should render NormalItem only.', () => {
    const newSystemSettings = context.systemSettings.setIn(['navigation', 'menus'],
      fromJS([{
        title: 'Facilities',
        url: 'http://apm.activenet.com'
      }]));
    const {
      HomeItem,
      ActivitiesItem,
      NormalItem,
      MyCartItem,
      CalendarItem
    } = setup({ ...context, ...{ systemSettings: newSystemSettings } });
    expect(HomeItem.length).toEqual(0);
    expect(ActivitiesItem.length).toEqual(0);
    expect(CalendarItem.length).toEqual(0);
    expect(NormalItem.length).toEqual(1);
    expect(MyCartItem.length).toEqual(0);
  });

  it('should render MyCartItem only.', () => {
    const newSystemSettings = context.systemSettings.setIn(['navigation', 'menus'],
      fromJS([{
        title: 'MyCart',
        url: 'http://apm.activenet.com'
      }]));
    const {
      HomeItem,
      ActivitiesItem,
      NormalItem,
      MyCartItem,
      CalendarItem
    } = setup({ ...context, ...{ systemSettings: newSystemSettings } });
    expect(HomeItem.length).toEqual(0);
    expect(ActivitiesItem.length).toEqual(0);
    expect(CalendarItem.length).toEqual(0);
    expect(NormalItem.length).toEqual(0);
    expect(MyCartItem.length).toEqual(1);
  });

  it('should render CalendarItem only.', () => {
    const newSystemSettings = context.systemSettings.setIn(['navigation', 'menus'],
      fromJS([{
        title: 'Calendar',
        url: 'http://apm.activenet.com',
        children: []
      }]));
    const {
      HomeItem,
      ActivitiesItem,
      NormalItem,
      MyCartItem,
      CalendarItem
    } = setup({ ...context, ...{ systemSettings: newSystemSettings } });
    expect(HomeItem.length).toEqual(0);
    expect(ActivitiesItem.length).toEqual(0);
    expect(CalendarItem.length).toEqual(1);
    expect(NormalItem.length).toEqual(0);
    expect(MyCartItem.length).toEqual(0);
  });

  it('should render out expected wrap class.', () => {
    const { wrapElement } = setup();
    expect(wrapElement.length).toEqual(1);
  });

  it('should render out expected container class.', () => {
    const { containerElement } = setup();
    expect(containerElement.length).toEqual(1);
  });

  it('should render out expected placeholder element.', () => {
    const { placeholderElement } = setup();
    expect(placeholderElement.length).toEqual(1);
  });
});
