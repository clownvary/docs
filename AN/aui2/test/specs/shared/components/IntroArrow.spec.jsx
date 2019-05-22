import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import IntroArrow from 'shared/components/IntroArrow';

describe('shared/components/IntroArrow', () => {

  it('should render without errors', () => {
    const component = shallow(<IntroArrow />);
    expect(toJson(component)).toMatchSnapshot();
  });

  it('component should work fin', () => {
    const className = 'intro-arrow-class';
    const component = shallow(<IntroArrow className={className} />);

    expect(component.find('.intro-arrow').hasClass(className)).toBeTruthy();
    expect(component.find('.intro-arrow-line-wrapper')).toHaveLength(1);
    expect(component.find('.intro-arrow-line')).toHaveLength(1);
  });

});
