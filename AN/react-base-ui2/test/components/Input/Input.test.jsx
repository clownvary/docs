import React from 'react';
import renderer from 'react-test-renderer';
import { mount, shallow } from 'enzyme';
import Input from 'src/components/Input';
import { wrap } from 'module';

const setup = props => mount(<Input {...props} />);

class TestComponent extends React.PureComponent {
  render() {
    return <span>Test</span>;
  }
}

describe('components/Input', () => {
  test('snapshots', () => {
    const snapshot = renderer.create(
      <Input
        preIcon={'icon-cloud'}
        postIcon={'icon-cloud'}
        PreComponent={TestComponent}
        PostComponent={TestComponent}
      />).toJSON();
    expect(snapshot).toMatchSnapshot();
  });

  test('set and get value', () => {
    let wrapper = setup();
    let instance = wrapper.instance();
    instance.value = 'test';
    expect(instance.value).toBe('test');

    wrapper = setup({ value: 'fixed value' });
    instance = wrapper.instance();
    instance.value = 'can\'t be set';
    expect(instance.value).toBe('fixed value');
  });

  test('handle paste', () => {
    const getData = jest.fn(() => 'paste test');
    const getDataOthers = jest.fn(() => 'others');

    let wrapper = setup();
    let input = wrapper.find('input');

    input.simulate('paste', { clipboardData: { getData } });
    expect(getData).not.toBeCalled();

    wrapper = setup({ formula: /test/ });
    input = wrapper.find('input');

    window.clipboardData = { getData };
    input.simulate('paste', { clipboardData: null });
    delete window.clipboardData;
    expect(getData).toBeCalled();

    getData.mockClear();
    input.simulate('paste', { clipboardData: { getData: getDataOthers } });
    expect(getDataOthers).toBeCalled();

    getData.mockClear();
    input.simulate('paste', { clipboardData: { getData } });
    expect(getData).toBeCalled();
  });

  test('handle key press', () => {
    const stopPropagation = jest.fn();
    const preventDefault = jest.fn();

    let wrapper = setup();
    let input = wrapper.find('input');
    input.simulate('keyPress', {
      nativeEvent: { char: 'a' },
      stopPropagation,
      preventDefault
    });
    expect(stopPropagation).not.toBeCalled();
    expect(preventDefault).not.toBeCalled();

    wrapper = setup({ formula: /\d/ });
    input = wrapper.find('input');

    input.simulate('keyPress', {
      nativeEvent: null,
      stopPropagation,
      preventDefault
    });
    expect(stopPropagation).not.toBeCalled();
    expect(preventDefault).not.toBeCalled();

    input.simulate('keyPress', {
      nativeEvent: { char: 'a', ctrlKey: true },
      stopPropagation,
      preventDefault
    });
    expect(stopPropagation).not.toBeCalled();
    expect(preventDefault).not.toBeCalled();

    input.simulate('keyPress', {
      nativeEvent: { char: 'a' },
      stopPropagation,
      preventDefault
    });
    expect(preventDefault).toHaveBeenCalledTimes(1);
    expect(stopPropagation).toHaveBeenCalledTimes(1);

    wrapper = setup({ formula: /\w/});
    input = wrapper.find('input');
    input.simulate('keyPress', {
      nativeEvent: { char: 'a' },
      stopPropagation,
      preventDefault
    });
    expect(preventDefault).toHaveBeenCalledTimes(1);
    expect(stopPropagation).toHaveBeenCalledTimes(1);
  });

  test('handle change', () => {
    const onChange = jest.fn();
    const onValueChange = jest.fn();

    let wrapper = setup({ onChange, onValueChange });
    let input = wrapper.find('input');
    input.simulate('change', { target: { value: 'test' } });
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onValueChange).toBeCalledWith({ value: 'test' });

    wrapper = setup({ onChange });
    input = wrapper.find('input');
    input.simulate('change', { target: { value: 'test' } });
    expect(onChange).toHaveBeenCalledTimes(2);

    onChange.mockClear();
    onValueChange.mockClear();

    wrapper = setup({ disabled: true, onChange, onValueChange });
    input = wrapper.find('input');
    input.simulate('change', { target: { value: 'test' } });
    expect(onChange).not.toBeCalled();
    expect(onValueChange).not.toBeCalled();
  });

  test('handle blur', () => {
    const onBlur = jest.fn();
    const onLeave = jest.fn();

    let wrapper = setup();
    let input = wrapper.find('input');
    input.simulate('blur');

    wrapper = setup({ onBlur, onLeave });
    input = wrapper.find('input');
    input.simulate('blur', { target: { value: 'test' } });
    expect(onBlur).toBeCalled();
    expect(onLeave).toBeCalledWith({ value: 'test' });
  });
});

