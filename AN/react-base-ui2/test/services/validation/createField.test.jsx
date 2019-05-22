import React from 'react';
import { mount } from 'enzyme';
import toJSON from 'enzyme-to-json';
import Input from 'src/components/Input';
import createField from 'src/services/validation/createField';


describe('services/validation/createField.jsx', () => {
  const setup = (props = {}, WrappedComponent = Input) => {
    const Field = createField(WrappedComponent);
    return mount(<Field {...props} />);
  };

  test('rendering', () => {
    const wrapper = setup();
    expect(toJSON(wrapper)).toMatchSnapshot();

    wrapper.setProps({ customMessages: 'test message' });
    expect(toJSON(wrapper)).toMatchSnapshot();

    wrapper.setProps({ customMessages: '' });
    expect(toJSON(wrapper)).toMatchSnapshot();

    wrapper.setProps({ customMessages: ['array messages'] });
    expect(toJSON(wrapper)).toMatchSnapshot();

    wrapper.setProps({ showLabel: true, showError: true });
    expect(toJSON(wrapper)).toMatchSnapshot();

    wrapper.setState({ validationError: undefined, customMessages: undefined });
    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  test('handle events', () => {
    const wrapper = setup();
    const instance = wrapper.instance();
    const inputComponent = wrapper.find(Input);
    const input = inputComponent.find('input');
    const onLeave = jest.fn();
    const onValidated = jest.fn();

    jest.spyOn(instance, 'buildTooltipContent');
    jest.spyOn(instance, 'onValidate');

    inputComponent.prop('onEnter')({ target: input });
    expect(instance.buildTooltipContent).not.toBeCalled();

    wrapper.setProps({ showValidationTip: true });
    inputComponent.prop('onEnter')({ target: input });
    expect(instance.buildTooltipContent).toHaveBeenCalledTimes(1);

    instance.dirty = true;
    inputComponent.prop('onLeave')({ value: 'test' });
    expect(instance.onValidate).toHaveBeenCalledTimes(1);
    expect(onLeave).not.toBeCalled();

    wrapper.setProps({ onLeave, onValidated });
    instance.dirty = true;
    inputComponent.prop('onLeave')({ value: 'test' });
    expect(onLeave).toHaveBeenCalledTimes(1);
    expect(onValidated).toHaveBeenCalledTimes(1);

    inputComponent.prop('onValueChange')({ value: 'test' });
    expect(wrapper.state('validationError')).toBe('');

    wrapper.setState({ validationError: 'validation error' });
    inputComponent.prop('onValueChange')({ value: 'test' });
    expect(wrapper.state('validationError')).toBe('');

    inputComponent.prop('onError')({ messages: 'test messages' });
    expect(wrapper.state('customMessages')).toEqual(['test messages']);

    const wrapper2 = setup({ rules: 'required' });
    const instance2 = wrapper2.instance();
    expect(toJSON(instance2.buildTooltipContent(['required']))).toMatchSnapshot();
  });
});
