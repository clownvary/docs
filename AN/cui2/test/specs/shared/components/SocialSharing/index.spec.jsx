import expect from 'expect';
import React from 'react';
import { SocialSharing } from 'shared/components/SocialSharing';
import { mount } from 'enzyme';
function setup(isLg = true, messages = {}) {
  const component = mount(
    <SocialSharing 
      parameters={{twitterParameter: "twitterParameter", facebookParameter: "facebookParameter"}} 
      width={650}
      height={590} 
      responsive={{ isLg }}
      intl={{ messages }}/>
  );
  return {
    component,
    shareLinks: component.find('.an-social-sharing__link')
  };
}
describe('shared/components/SocialSharing', () => {
  it('Should render receiptShare when isLg is true', () => {
    const { shareLinks, component } = setup();
    const facebookLink = shareLinks.first();
    facebookLink.simulate('click');
    const twitterLink = shareLinks.last();
    twitterLink.simulate('click');
    expect(shareLinks.length).toEqual(2);
    const spanTags = component.find('span');
    const aTags = component.find('a');
    expect(spanTags.length).toEqual(0);
    expect(aTags.length).toEqual(2);
  });
  it('Should render receiptShare when isLg is false', () => {
    const { shareLinks, component } = setup(false);
    const facebookLink = shareLinks.first();
    facebookLink.simulate('click');
    const twitterLink = shareLinks.last();
    twitterLink.simulate('click');
    expect(shareLinks.length).toEqual(2);
    const spanTags = component.find('span');
    const aTags = component.find('a');
    expect(aTags.length).toEqual(2);
    expect(spanTags.length).toEqual(0);
  });
});