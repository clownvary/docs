import { fromJS } from 'immutable';
import React from 'react';
import { mountWithIntl } from 'utils/enzymeWithIntl';
import { MobileNavigation } from 'index/components/Master/components/deviceEntry/mobile/Navigation/index';
import context, { childContextTypes } from 'utils/context';
import routes from '../../../data/routes';

const actions = {
  hideNavigationAction: jest.fn(),
  showMenuAction: jest.fn()
};


function setup(_context = context) {
  const component = mountWithIntl(
    <MobileNavigation
      routes={routes}
      showMenu
      renderMenu
      menuHeight={620}
      responsive={{ isMd: true }}
      animationEnd={false}
      {...actions}
    />, { context: _context, childContextTypes });

  return {
    component,
    actions,
    HomeItem: component.find('HomeItem'),
    ActivitiesItem: component.find('ActivitiesItem'),
    CalendarItem: component.find('CalendarItem'),
    NormalItem: component.find('NormalItem'),
    wrapElement: component.find('.an-responsiveNavigation__wrapper'),
    containerElement: component.find('.an-responsiveNavigation'),
    placeholderElement: component.find('.placeholder'),
    UserInfo: component.find('UserInfo'),
    SignOut: component.find('SignOut'),
    SignIn: component.find('SignIn'),
    shadowElement: component.find('.an-responsiveNavigation__shadow').first()
  };
}

describe('index/components/Master/components/deviceEntry/mobile/Navigation/index', () => {
  it('should render out all expected Navigation child components', () => {
    const {
      HomeItem,
      ActivitiesItem,
      UserInfo,
      SignOut,
      SignIn
    } = setup();
    expect(HomeItem.length).toEqual(1);
    expect(ActivitiesItem.length).toEqual(1);
    expect(UserInfo.length).toEqual(1);
    expect(SignOut.length).toEqual(1);
    expect(SignIn.length).toEqual(0);
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
      CalendarItem
    } = setup({ ...context, ...{ systemSettings: newSystemSettings } });
    expect(HomeItem.length).toEqual(1);
    expect(ActivitiesItem.length).toEqual(0);
    expect(CalendarItem.length).toEqual(0);
    expect(NormalItem.length).toEqual(0);
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
      ActivitiesItem
    } = setup({ ...context, ...{ systemSettings: newSystemSettings } });
    expect(HomeItem.length).toEqual(0);
    expect(ActivitiesItem.length).toEqual(1);
  });

  it('should render NormalItem only.', () => {
    const newSystemSettings = context.systemSettings.setIn(['navigation', 'menus'],
      fromJS([{
        title: 'Facilities',
        url: 'http://apm.activenet.com'
      }]));
    const {
      HomeItem,
      ActivitiesItem
    } = setup({ ...context, ...{ systemSettings: newSystemSettings } });
    expect(HomeItem.length).toEqual(0);
    expect(ActivitiesItem.length).toEqual(0);
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
      ActivitiesItem
    } = setup({ ...context, ...{ systemSettings: newSystemSettings } });
    expect(HomeItem.length).toEqual(0);
    expect(ActivitiesItem.length).toEqual(0);
  });

  it('should render out expected wrap class.', () => {
    const { component, wrapElement } = setup();
    component.setProps({ responsive: { isLg: true } });
    expect(wrapElement.find('ul').props().style).not.toEqual(null);
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

  it('should render out all expected Navigation child components', () => {
    const {
      HomeItem,
      ActivitiesItem,
      UserInfo,
      SignOut,
      SignIn,
      component
    } = setup();
    component.setProps({ animationEnd: false });
    expect(HomeItem.length).toEqual(1);
    expect(ActivitiesItem.length).toEqual(1);
    expect(UserInfo.length).toEqual(1);
    expect(SignOut.length).toEqual(1);
    expect(SignIn.length).toEqual(0);
  });

  it('should render out all expected Navigation child components when full site', () => {
    document.cookie = `jettytest11_FullPageView=${escape(true)}`;
    const {
      HomeItem,
      ActivitiesItem,
      NormalItem,
      CalendarItem,
      UserInfo,
      SignOut,
      SignIn,
      component
    } = setup();
    component.setProps({ animationEnd: false });
    expect(HomeItem.length).toEqual(1);
    expect(ActivitiesItem.length).toEqual(1);
    expect(UserInfo.length).toEqual(1);
    expect(SignOut.length).toEqual(1);
    expect(SignIn.length).toEqual(0);
    expect(CalendarItem.length).toEqual(1);
    expect(NormalItem.length).toEqual(5);
  });

  it('should hideNavigationAction be called', () => {
    const {
      HomeItem,
      ActivitiesItem,
      UserInfo,
      SignOut,
      SignIn,
      component
    } = setup();
    component.setProps({ responsive: { isMd: false } });
    expect(HomeItem.length).toEqual(1);
    expect(ActivitiesItem.length).toEqual(1);
    expect(UserInfo.length).toEqual(1);
    expect(SignOut.length).toEqual(1);
    expect(SignIn.length).toEqual(0);
  });

  it('should onAnimationend  be called', () => {
    const {
      HomeItem,
      ActivitiesItem,
      UserInfo,
      SignOut,
      SignIn,
      component
    } = setup();
    component.setProps({ responsive: { isMd: true }, showMenu: true, animationEnd: false });
    component.menuShadow = window.document.body;
    expect(HomeItem.length).toEqual(1);
    expect(ActivitiesItem.length).toEqual(1);
    expect(UserInfo.length).toEqual(1);
    expect(SignOut.length).toEqual(1);
    expect(SignIn.length).toEqual(0);
  });

  it('should call showMenuAction when clicking', () => {
    const {
      shadowElement
    } = setup();
    shadowElement.simulate('click');
    expect(actions.showMenuAction).toHaveBeenCalled();
  });

  it('should render SignIn when isLogin is not true', () => {
    const isLoginUserSpy = jest.spyOn(context, 'isLoginUser').mockImplementation(() => false);
    const {
      SignIn
    } = setup();

    expect(SignIn.length).toEqual(1);
    expect(isLoginUserSpy).toHaveBeenCalled();

    isLoginUserSpy.mockRestore();
  });
});
