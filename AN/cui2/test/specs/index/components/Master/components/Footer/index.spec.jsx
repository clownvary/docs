
import React from 'react';
import merge from 'lodash/merge';
import { mountWithIntl } from 'utils/enzymeWithIntl';
import { Footer } from 'index/components/Master/components/Footer/index';
//eslint-disable-next-line
import context, { childContextTypes, systemSettings } from 'utils/context';

function setup(props = {}, _context = context) {

  const component = mountWithIntl(
    <Footer {...props} />, { context: _context, childContextTypes });

  return {
    component,
    ActiveLogo: component.find('ActiveLogo'),
    SiteLinks: component.find('SiteLinks'),
    TextNotice: component.find('TextNotice'),
    SeparationLine: component.find('SeparationLine')
  };
}

describe('index/components/Master/components/Footer/index', () => {
  it('should render out all expected Content child components', () => {
    const {
      component,
      ActiveLogo,
      SiteLinks,
      TextNotice,
      SeparationLine
    } = setup();

    expect(SiteLinks.length).toEqual(2);
    expect(TextNotice.length).toEqual(4);
    expect(ActiveLogo.length).toEqual(1);
    expect(SeparationLine.length).toEqual(1);

    const instance = component.instance();
    expect(instance.node.classList).toContain('an-footer');
  });

  it('should not render copyright correctly', () => {
    const tempSystemSettings = systemSettings.setIn(['footer', 'copy_right'], null);
    const { component } = setup({}, merge({}, context, { systemSettings: tempSystemSettings }));
    expect(component.find('.an-footer__copyright').text()).toEqual('');
  });
});
