import React from 'react';
import { mount } from 'enzyme';
import StepItem from 'src/components/Steps/StepItem';

const props = {
  prefixCls: 'an-steps',
  status: 'error',
  title: 'title',
  description: 'description'
};

const setup = initProps => mount(<StepItem {...initProps} />);
describe('StepItem Component', () => {
  it('StepItem should render without errors', () => {
    const component = setup(props);
    expect(component.find('.an-steps__item')).toHaveLength(1);
    expect(component.find('.an-steps__item--error')).toHaveLength(1);
    expect(component.find('.icon-box')).toHaveLength(1);
    expect(component.find('.an-steps__item-description')).toHaveLength(1);
    expect(component.find('.icon-close')).toHaveLength(1);
  });

  it('StepItem title, icon, description is node should render without errors', () => {
    const component = setup({
      ...props,
      title: <p className="self-title">test title</p>,
      icon: <p className="self-icon">test title</p>,
      description: <p className="self-description">test title</p>
    });
    expect(component.find('.self-title')).toHaveLength(1);
    expect(component.find('.self-icon')).toHaveLength(1);
    expect(component.find('.self-description')).toHaveLength(1);
  });

  it('StepItem status equal to finish should render without errors', () => {
    const component = setup({
      ...props,
      status: 'finish'
    });
    expect(component.find('.finish-icon')).toHaveLength(1);
    expect(component.find('.icon-check-thin')).toHaveLength(1);
  });

  it('StepItem status equal to wait should render without errors', () => {
    const component = setup({
      ...props,
      status: 'wait'
    });
    expect(component.find('.finish-icon')).toHaveLength(0);
    expect(component.find('.icon-check-thin')).toHaveLength(0);
  });
});
