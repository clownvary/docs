import React from 'react';
import { mount } from 'enzyme';
import toJSON from 'enzyme-to-json';
import CollapsePanel from 'src/components/CollapsePanel';
import Tabbable from 'src/services/wcag/Tabbable';

const props = {
  display: true,
  summary: '',
  onExpand: jest.fn(),
  onCollapse: jest.fn()

};

const setup = initProps => mount(<CollapsePanel {...initProps}>text</CollapsePanel>);

it('component should render well', () => {
  const component = setup({});
  expect(toJSON(component)).toMatchSnapshot();
});

it('CollapsePanel should render without errors', () => {
  const component = setup({});

  expect(component).toBeTruthy();
  expect(component.find('.collapse-panel')).toHaveLength(1);
  expect(component.find('.collapse-panel__summary')).toHaveLength(0);

  component.find('.icon').simulate('click');
  expect(props.onExpand).toHaveBeenCalledTimes(0);
});

it('CollapsePanel have props.expanded should render without errors', () => {
  const component = setup(props);

  expect(component).toBeTruthy();
  expect(component.find('.expanded')).toHaveLength(0);
  component.setProps({ expanded: true, summary: 'summary' });
  expect(component.find('.collapse-panel__summary')).toHaveLength(1);
  component.find('.icon').closest(Tabbable).simulate('click');
  expect(props.onCollapse).toHaveBeenCalledTimes(1);
});
