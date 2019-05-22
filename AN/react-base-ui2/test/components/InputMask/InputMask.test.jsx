import React from 'react';
import { mount } from 'enzyme';
import toJSON from 'enzyme-to-json';
import InputMask from 'src/components/InputMask';
import Size from 'src/consts/Size';

describe('components/InputMask/InputMask.jsx', () => {
  test('basic usage', async () => {
    const wrapper = mount(<InputMask size={Size.SMALL} />);
    expect(toJSON(wrapper)).toMatchSnapshot();

    const input = wrapper.find('input');
    input.simulate('focus');
    expect(toJSON(wrapper)).toMatchSnapshot();

    input.simulate('blur');
    expect(toJSON(wrapper)).toMatchSnapshot();

    const instance = wrapper.instance();
    expect(instance.getTextWithPrompts()).toBe('');
    expect(instance.getTextWithLiterals()).toBe('');
    expect(instance.getTextWithPromptAndLiterals()).toBe('');

    wrapper.setProps({ hidePromptOnLeave: true });
    instance.updateText = jest.fn();

    input.simulate('focus');
    expect(instance.updateText).toBeCalledWith({ start: 0, end: 0 });

    await input.simulate('blur');
    expect(instance.updateText).toBeCalled();

    instance.updateText.mockClear();
    delete instance.textProvider;
    input.simulate('focus');
    expect(instance.updateText).not.toBeCalled();
    await input.simulate('blur');
    expect(instance.updateText).not.toBeCalled();

    expect(instance.getTextWithPrompts()).toBe('');
    expect(instance.getTextWithLiterals()).toBe('');
    expect(instance.getTextWithPromptAndLiterals()).toBe('');
  });
});
