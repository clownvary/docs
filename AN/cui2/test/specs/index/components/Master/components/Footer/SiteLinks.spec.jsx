import React from 'react';
import { mount } from 'enzyme';
import { SiteLinks } from 'index/components/Master/components/Footer/SiteLinks';
//eslint-disable-next-line
import context, { configurations, systemSettings, childContextTypes } from 'utils/context';

const footer = systemSettings.get('footer');

const _activeLinks = footer.get('active_links').toJS();

const _siteLinks = footer.get('site_links').toJS();


function setup(_context = context, isActiveLinks = true, siteLinks = _activeLinks) {
  const component = mount(
    <SiteLinks
      {...{ isActiveLinks, siteLinks }}
    />,
      { context: _context, childContextTypes }
  );

  return {
    component,
    a: component.find('a'),
    b: component.find('b'),
    siteLink: component.find('a').at(0),
    updatedLabel: component.find('font')
  };
}

describe('index/components/Master/components/Footer/SiteLinks', () => {
  it('should render the links as same as activeLinks length', () => {
    const {
      a,
      b
    } = setup();
    expect(a.length).toEqual(_activeLinks.length);
    expect(b.length).toEqual(0);
  });

  it('should render the links as same as siteLinks length - 1', () => {
    const {
      a
    } = setup(context, false, _siteLinks);
    expect(a.length).toEqual(_siteLinks.length - 1);
  });

  it('should render the links as same as siteLinks length - 1', () => {
    const {
      a
    } = setup(context, false, []);
    expect(a.length).toEqual(0);
  });

  it('should open window if click logo', () => {
    const {
      siteLink
    } = setup();

    siteLink.simulate('click');
  });

  it('should not render updated label if new_privacy_policy are all true', () => {
    const {
      updatedLabel
    } = setup({
      ...context,
      configurations: configurations.set('new_privacy_policy', true)
    }, true, [
      {
        title: 'Your Privacy Rights',
        url: 'http://www.activenetwork.com/information/privacy-policy.htm'
      }
    ]);
    expect(updatedLabel.length).toEqual(1);
  });
});
