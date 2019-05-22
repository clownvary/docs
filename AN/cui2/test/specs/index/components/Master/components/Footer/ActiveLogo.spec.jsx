import React from 'react';
import { mountWithIntl } from 'utils/enzymeWithIntl';
import { ActiveLogo } from 'index/components/Master/components/Footer/ActiveLogo';
//eslint-disable-next-line

const logoTitle = 'ACTIVE NET LOGO';

function setup(showLogo = true) {
  const intl = {
    messages: {
      'app.modules.common.CommonMeassages.logoTitle': logoTitle
    }
  };

  const component = mountWithIntl(
    <ActiveLogo
      {...{ intl, showLogo }}
    />);

  return {
    component,
    img: component.find('img'),
    logoLink: component.find('a').at(0)
  };
}

describe('index/components/Master/components/Footer/ActiveLogo', () => {
  it('should render img well', () => {
    const {
      img
    } = setup();

    expect(img.length).toEqual(1);
    expect(img.props().src).toContain('/images/poweredbyactive_Reversed.png');
  });

  it('should not render img', () => {
    const {
      img
    } = setup(false);

    expect(img.length).toEqual(0);
  });

  it('should open window if click logo', () => {
    const {
      logoLink
    } = setup();

    logoLink.simulate('click');
  });
});
