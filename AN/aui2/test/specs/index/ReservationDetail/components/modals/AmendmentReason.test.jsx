import React from 'react';
import { mount } from 'enzyme';
import toJSON from 'enzyme-to-json';
import AmendmentReasonModal from 'index/ReservationDetail/components/modals/AmendmentReason';

const setup = (props = {}) => mount(<AmendmentReasonModal {...props} />);

describe('ReservationDetail/components/modals/AmendmentReason.jsx', () => {
  test('basic usage', () => {
    const w1 = setup();
    expect(toJSON(w1)).toMatchSnapshot();

    const w2 = setup({ required: true, value: '' })
    expect(toJSON(w2)).toMatchSnapshot();

    const textarea = w2.find('textarea.input');
    expect(textarea.length).toBe(1);

    textarea.simulate('change', { target: { value: 'test' } });
    const onChange = jest.fn();
    w2.setProps({ onChange });
    textarea.simulate('change', { target: { value: 'test' } });
    expect(onChange).toBeCalledWith('test')

    jest.useFakeTimers();
    const i2 = w2.instance();
    w2.setProps({ shown: true });
    i2.textarea.focus = jest.fn();
    jest.runAllTimers();
    expect(i2.textarea.focus).toBeCalled();
  });
})
