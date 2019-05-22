import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';

import AlertBar from 'src/components/Alert/AlertBar';

beforeAll(() => {
  jest.useFakeTimers();
});

afterAll(() => {
  jest.useRealTimers();
});

const setup = (props = {}) => {
  const newProps = {
    onClose: () => {},
    ...props
  };

  const Component = <AlertBar {...newProps} />;
  const wrapper = mount(Component);

  return { Component, wrapper };
};

it('should render without errors', () => {
  const { wrapper } = setup();

  expect(wrapper).toBeTruthy();
});

it('should render right thing', () => {
  const { wrapper } = setup();

  expect(wrapper.hasClass('alert-bar')).toBe(true);
});

it('should render right thing and do nott change unexpected', () => {
  const { Component } = setup();
  const tree = renderer.create(Component).toJSON();

  expect(tree).toMatchSnapshot();
});

it('should display Alert when setting `show` as true', () => {
  const { wrapper } = setup();

  wrapper.setState({ show: true });

  expect(wrapper.find('.alert-bar.show').length).toBe(1);
});

it('should hide Alert when clicking `Close` button', () => {
  const { wrapper } = setup();

  wrapper.setState({ show: true });
  expect(wrapper.state('show')).toBe(true);

  wrapper.find('button').simulate('click');
  expect(wrapper.state('show')).toBe(false);
});

it('should call `onClose` when closing Alert', () => {
  const { wrapper } = setup();

  wrapper.find('button').simulate('click');
});

it('should have right lifecycle', () => {
  const { wrapper } = setup();

  jest.runAllTimers();

  wrapper.instance().element.addEventListener = (_, fn) => fn();
  expect(wrapper.state().show).toBe(true);

  wrapper.find('button').simulate('click');
  expect(wrapper.state().show).toBe(false);

  wrapper.unmount();
});
