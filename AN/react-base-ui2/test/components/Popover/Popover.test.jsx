import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';

import Popover from 'src/components/Popover';

it('should has .popover and .popover--e class names by default', () => {
  const wrapper = mount(<Popover />);
  expect(wrapper.find('.popover.popover--e.t-light').length).toBe(1);
});

it('should has light theme by default', () => {
  const wrapper = mount(<Popover />);
  expect(wrapper.find('.popover.t-light').length).toBe(1);
});

it('should could switch direction', () => {
  const wrapper = mount(<Popover direction="nw" />);
  expect(wrapper.find('.popover.popover--nw').length).toBe(1);
});

it('should could switch theme', () => {
  const wrapper = mount(<Popover theme="dark" />);
  expect(wrapper.find('.popover.t-dark').length).toBe(1);
});

it('should render right thing and don\'t change unexpected', () => {
  const tree = renderer.create(<Popover />).toJSON();
  expect(tree).toMatchSnapshot();
});
