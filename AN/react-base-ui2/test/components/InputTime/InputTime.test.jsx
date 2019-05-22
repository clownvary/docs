import React from 'react';
import { mount } from 'enzyme';
import toJSON from 'enzyme-to-json';
import InputTime from '../../../src/components/InputTime';
import { createMoment } from '../../../src/utils/momentHelper';

const setup = (props = {}) => mount(<InputTime {...props} />);

describe('components/InputDate/InputTime.jsx', () => {
  let wrapper;
  const m1 = createMoment('2018-01-01T00:00:00+00:00').utc();

  beforeEach(() => {
    const value = m1;
    wrapper = setup({ value });
  });

  test('rendering', () => {
    const instance = wrapper.instance();
    expect(instance.isBlank()).toBe(false);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
