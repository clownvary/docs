import React from 'react';
import merge from 'lodash/merge';
import { mount } from 'enzyme';
import { fromJS } from 'immutable';
import { Header } from 'index/components/Master/components/deviceEntry/pc/Header/index';
//eslint-disable-next-line
import context, { childContextTypes } from 'utils/context';

const header = context.systemSettings.get('header');

function setup(_context = context) {
  const component = mount(
    <Header />, { context: _context, childContextTypes });

  return {
    component,
    logoElement: component.find('.an-header__logo'),
    userProfile: component.find('.an-header__user-profiles')
  };
}

jest.mock('shared/utils/locationHelp.js', () => ({ redirect: () => {} }));


describe('index/components/Master/components/deviceEntry/pc/Header/index', () => {
  it('should render logo well', () => {
    const {
      logoElement
    } = setup();

    const logo = header.get('logo');
    const imgSrc = logoElement.find('img').props().src;

    expect(logoElement.length).toEqual(1);
    expect(imgSrc).toEqual(logo.get('url'));
  });

  it('should render userProfile well', () => {
    const {
      userProfile
    } = setup();
    const user = context.systemSettings.get('user');
    const logout = header.get('logout');

    const profileText = userProfile.find('b').text();

    const spans = userProfile.find('span');
    const myAccountText = spans.at(1).find('a').text();
    const signOutText = spans.last().find('a').text();

    expect(profileText).toContain(user.get('firstname'));
    expect(myAccountText).toEqual(logout.get(0).get('title'));
    expect(signOutText).toEqual(logout.get(2).get('title'));
    spans.last().find('a').simulate('click');
  });

  it('should render login well', () => {
    const isLoginUserSpy = jest.spyOn(context, 'isLoginUser').mockImplementation(() => false);
    const {
      userProfile
    } = setup();

    const login = context.systemSettings.getIn(['header', 'login']).toJS();

    const spans = userProfile.find('span');
    const signInText = spans.first().find('a').text();
    const createAccountText = spans.last().find('a').text();

    expect(signInText).toEqual(login[0].title);
    expect(createAccountText).toEqual(login[1].title);

    expect(isLoginUserSpy).toHaveBeenCalled();
    isLoginUserSpy.mockRestore();
  });
  it('should not render logo when logo is null', () => {
    const tempHeader = merge({}, header.toJS(), { logo: null });
    const tempContext = merge({}, context, { systemSettings: fromJS({ header: tempHeader }) });
    const { logoElement } = setup(tempContext);
    expect(logoElement.find('img').length).toEqual(0);
  });
});
