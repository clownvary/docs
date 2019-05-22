import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';

import TextArea from 'src/components/TextArea';

it('should render without errors', () => {
  const wrapper = shallow(<TextArea />);

  expect(wrapper).toBeTruthy();
});

it('should render right thing', () => {
  const wrapper = shallow(<TextArea />);

  expect(wrapper.find('textarea').length === 1).toBe(true);
});

it('should render right thing and don\'t change unexpected', () => {
  const tree = renderer.create(<TextArea value="Hello, World!" />).toJSON();

  expect(tree).toMatchSnapshot();
});

it('should support setProps dynamicly', () => {
  const wrapper = shallow(<TextArea value="test" />);

  expect(wrapper.state('value') === 'test').toBe(true);

  wrapper.setProps({ value: 'test done' });

  expect(wrapper.state('value') === 'test done').toBe(true);

  // Run the `else` of `componentWillReceiveProps`
  wrapper.setProps({ value: 'test done' });
});

it('should handle the `onChange` event', () => {
  const onChangeSpy = jest.fn();
  const wrapper = shallow(<TextArea value="test" onChange={onChangeSpy} />);
  const value = 'test done';

  wrapper.find('textarea').simulate('change', {
    persist: () => {},
    target: {
      value
    }
  });

  expect(onChangeSpy).toBeCalled();
});

it('should handle the `onChange` event without onChange callback', () => {
  const wrapper = shallow(<TextArea value="test" />);
  const value = 'test done';

  wrapper.find('textarea').simulate('change', {
    persist: () => {},
    target: {
      value
    }
  });
});
