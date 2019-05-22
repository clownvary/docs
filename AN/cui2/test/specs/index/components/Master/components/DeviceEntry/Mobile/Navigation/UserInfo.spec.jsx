import { fromJS } from 'immutable';
import expect from 'expect';
import React from 'react';
import { mount } from 'enzyme';
import context from 'utils/context';
import { UserInfo } from 'index/components/Master/components/deviceEntry/mobile/Navigation/UserInfo';

//eslint-disable-next-line

const logout = context.systemSettings.get('header').get('logout');

const user = context.systemSettings.get('user');

const countUrl = logout.get(0).get('url');

function setup() {
  const component = mount(< UserInfo
    user={user}
    myCountUrl={countUrl}
    isMobile
  />, {});

  return {
    component,
    shortNameTxt: component.find('.user-info__name__short-name').first().text(),
    fullNameTxt: component.find('.user-info__name__full-name').first().text(),
    aHref: component.find('a').props().href
  };
}

describe('index/components/Master/components/deviceEntry/mobile/Navigation/UserInfo', () => {
  it('should display right name.', () => {
    const { shortNameTxt, fullNameTxt } = setup();
    const tempUser = user.toJS();
    const firstname = tempUser.firstname;
    const lastname = tempUser.lastname;
    const shortName = firstname.charAt(0).toUpperCase() + lastname.charAt(0).toUpperCase();
    const fullName = `${firstname} ${lastname}`;
    expect(shortNameTxt).toEqual(shortName);
    expect(fullNameTxt).toEqual(fullName);
  });

  it('should display correct url.', () => {
    const { aHref } = setup();
    expect(aHref).toEqual(countUrl);
  });
});
