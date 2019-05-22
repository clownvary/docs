import { fromJS } from 'immutable';
import expect from 'expect';
import React from 'react';
import { mount } from 'enzyme';
import context from 'utils/context';
import { SignIn } from 'index/components/Master/components/deviceEntry/mobile/Navigation/SignIn';
//eslint-disable-next-line

const login = context.systemSettings.get('header').get('login');
function setup() {

  const component = mount(< SignIn
    login={login}
  />, {});

  return {
    component,
    signInTxt: component.find('a').first().text(),
    createAccountTxt: component.find('a').last().text(),
    signIntUrl: component.find('a').first().props().href,
    createAccounttUrl: component.find('a').last().props().href
  };
}

describe('index/components/Master/components/deviceEntry/mobile/Navigation/SignIn', () => {
  it('should display right name.', () => {
    const { signInTxt, createAccountTxt } = setup();
    expect(signInTxt).toEqual(login.get(0).get('title'));
    expect(createAccountTxt).toEqual(login.get(1).get('title'));
  });

  it('should display right url.', () => {
    const { signIntUrl, createAccounttUrl } = setup();
    expect(signIntUrl).toEqual(login.get(0).get('url'));
    expect(createAccounttUrl).toEqual(login.get(1).get('url'));
  });

});
