import React from 'react';
import toJSON from 'enzyme-to-json';
import { mount } from 'enzyme';
import ErrorList from 'src/services/validation/components/ErrorList';

describe('services/validation/components/ErrorList.jsx', () => {
  test('rendering', () => {
    const wrapper = mount(<ErrorList messages={['test messages']} />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
