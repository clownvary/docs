import { fromJS } from 'immutable';
import expect from 'expect';
import React from 'react';
import { mount } from 'enzyme';
import context from 'utils/context';
import { SignOut } from 'index/components/Master/components/deviceEntry/mobile/Navigation/SignOut';
//eslint-disable-next-line

const logout = context.systemSettings.get('header').get('logout');

function setup() {
  const component = mount(< SignOut
    logout={logout}
  />, {});

  return {
    component,
    signOutTxt: component.find('a').first().text(),
    signOutUrl: component.find('a').props().href
  };
}

describe('index/components/Master/components/deviceEntry/mobile/Navigation/SignOut', () => {
  it('should display right name.', () => {
    const { signOutTxt } = setup();
    expect(signOutTxt.trim()).toEqual(logout.get(2).get('title'));
  });

  it('should display right url.', () => {
    const { signOutUrl } = setup();
    expect(signOutUrl).toEqual(logout.get(2).get('url'));
  });

});
