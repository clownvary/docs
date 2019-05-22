import React from 'react';
import ReactDOM from 'react-dom';
import { mount } from 'enzyme';
import toJSON from 'enzyme-to-json';
import InputNumeric, { NumericType } from '../../../src/components/InputNumeric';
import { KeyCode } from '../../../src/consts';

jest.useFakeTimers();

const setup = props => mount(<InputNumeric {...props} />);

describe('components/InputNumeric', () => {
  test('rendering', () => {
    let wrapper = setup({ value: '999' });
    expect(toJSON(wrapper)).toMatchSnapshot();

    wrapper = setup({ value: 99, type: NumericType.PERCENT });
    expect(toJSON(wrapper)).toMatchSnapshot();

    wrapper = setup({ value: 1299, type: NumericType.CURRENCY });
    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  test('get and set value', () => {
    const instance = setup().instance();
    instance.value = 100;
    expect(instance.value).toBe(100);
  });

  test('props change', () => {
    let wrapper = setup({ min: 0, max: 10, value: 1 });
    let instance = wrapper.instance();

    instance.updateRange = jest.fn();
    wrapper.setProps({ min: 5 });
    expect(instance.updateRange).toBeCalledWith(5, 10);

    instance.updateCultureContext = jest.fn();
    wrapper.setProps({ decimals: 5 });
    expect(instance.updateCultureContext).toBeCalledWith('decimals', 5);
    wrapper.setProps({ showGroup: true });
    expect(instance.updateCultureContext).toBeCalledWith('showGroup', true);
    wrapper.setProps({ locale: 'test' });
    expect(instance.updateCultureContext).toBeCalledWith();

    instance.setValue = jest.fn();
    wrapper.setProps({ value: 9.9 });
    expect(instance.setValue).toBeCalledWith(9.9);

    wrapper = setup({ min: 1, max: 10, value: 5 });
    instance = wrapper.instance();

    instance.setValue = jest.fn();
    wrapper.setProps({ max: 4 });
    expect(instance.setValue).toBeCalledWith(5);
    wrapper.setProps({ min: 6, max: 10 });
    expect(instance.setValue).toBeCalledWith(5);
    wrapper.setProps({ decimals: 5 });
    expect(instance.setValue).toBeCalledWith(5, true);
    wrapper.setProps({ locale: 'test' });
    expect(instance.setValue).toBeCalledWith(5, true);

    wrapper = setup();
    wrapper.setProps({ value: 10 });
  });

  test('key press preview', () => {
    let wrapper = setup();
    let instance = wrapper.instance();
    let input = wrapper.find('input');
    input.simulate('keyPress', { nativeEvent: { char: '$' } });
    expect(instance.input.value).toBe('');
    input.simulate('keyPress', { nativeEvent: { char: '%' } });
    expect(instance.input.value).toBe('');
    input.simulate('keyPress', { nativeEvent: { char: 'a' } });
    expect(instance.input.value).toBe('');
    input.simulate('keyPress', { nativeEvent: { char: '.' } });
    expect(instance.input.value).toBe('');
    input.simulate('keyPress', { nativeEvent: { char: '9' } });
    expect(instance.input.value).toBe('9.00');
    input.simulate('keyPress', { nativeEvent: { char: '+' } });
    expect(instance.input.value).toBe('9.00');
    input.simulate('keyPress', { nativeEvent: { char: '-' } });
    expect(instance.input.value).toBe('-9.00');
    input.simulate('keyPress', { nativeEvent: { char: '(' } });
    expect(instance.input.value).toBe('9.00');
    input.simulate('keyPress', { nativeEvent: { char: ')' } });
    expect(instance.input.value).toBe('-9.00');
    input.simulate('keyPress', { nativeEvent: { char: '.' } });
    expect(instance.input.value).toBe('-9.00');
    instance.selection.start = 3;
    instance.selection.end = 3;
    input.simulate('keyPress', { nativeEvent: { char: '.' } });
    expect(instance.input.value).toBe('-9.00');

    wrapper = setup({ value: -10 });
    instance = wrapper.instance();
    input = wrapper.find('input');

    expect(instance.input.value).toBe('-10.00');
    input.simulate('keyPress', { nativeEvent: { char: '+' } });
    expect(instance.input.value).toBe('10.00');
    input.simulate('keyPress', { nativeEvent: { char: ')' } });
    expect(instance.input.value).toBe('-10.00');


    wrapper = setup({ value: 0 });
    instance = wrapper.instance();
    input = wrapper.find('input');

    input.simulate('keyPress', { nativeEvent: { char: '+' } });
    expect(instance.input.value).toBe('0.00');


    input.simulate('keyPress', { nativeEvent: { char: ')' } });
    expect(instance.input.value).toBe('0.00');
  });

  test('blur', () => {
    const wrapper = setup({ value: 0, min: 10, max: 20 });
    const instance = wrapper.instance();
    const input = wrapper.find('input');
    input.simulate('blur');
    expect(instance.value).toBe(10);

    wrapper.setProps({ value: 30 });
    input.simulate('blur');
    expect(instance.value).toBe(20);

    wrapper.setProps({ value: 15 });
    input.simulate('blur');
    expect(instance.value).toBe(15);
  });

  test('spins', () => {
    let wrapper = setup({ value: 10 });
    let instance = wrapper.instance();
    let input = wrapper.find('input');

    input.simulate('keyDown', { keyCode: KeyCode.UP });
    expect(instance.value).toBe(11);

    jest.runAllTimers();
    input.simulate('keyDown', { keyCode: KeyCode.DOWN });
    expect(instance.value).toBe(10);

    wrapper = setup();
    instance = wrapper.instance();
    input = wrapper.find('input');

    input.simulate('keyDown', { keyCode: KeyCode.DOWN });
    expect(instance.value).toBe(null);

    jest.runAllTimers();
    input.simulate('keyDown', { keyCode: KeyCode.UP });
    expect(instance.value).toBe(null);

    wrapper.setProps({ increment: 999999999999 });
    instance.doSpin();
    expect(instance.value).toBe(null);

    wrapper.setProps({ increment: 1, decimals: 0, value: 0 });
    instance.doSpin();
    expect(instance.value).toBe(-1);
  });

  test('deletion', () => {
    const wrapper = setup({ value: 99 });
    const instance = wrapper.instance();
    const input = wrapper.find('input');
    input.simulate('keyDown', { keyCode: KeyCode.UP });
    expect(instance.value).toBe(100);

    jest.runAllTimers();
    input.simulate('keyDown', { keyCode: KeyCode.BACKSPACE });
    expect(instance.value).toBe(100);

    jest.spyOn(instance, 'isSelectAll').mockImplementation(() => true);
    jest.runAllTimers();
    input.simulate('keyDown', { keyCode: KeyCode.BACKSPACE });
    expect(instance.value).toBe(null);

    jest.spyOn(instance, 'allowEdit').mockImplementation(() => false);
    wrapper.setProps({ value: 10, allowBlank: false });
    instance.deleteSelection();
    expect(instance.value).toBe(10);

    instance.allowEdit.mockRestore();
    instance.deleteSelection();
    expect(instance.value).toBe(0);

    instance.isSelectAll.mockRestore();
    wrapper.setProps({ value: 100 });
    jest.runAllTimers();
    input.simulate('keyDown', { keyCode: KeyCode.DELETE });
    expect(instance.value).toBe(0);
  });

  test('work with items', () => {
    const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, true];
    let wrapper = setup({ items, value: 1, showTrigger: true });
    let instance = wrapper.instance();
    const trigger = wrapper.find('a.button-toggler');
    trigger.simulate('click');
    const listItems = document.querySelectorAll('.an-popup li');
    expect(listItems.length).toBe(11);
    const containerName = Object.keys(window).filter(name => /_popup_container_/.test(name))[0];
    ReactDOM.unmountComponentAtNode(window[containerName]);

    instance.onListSelected([]);
    expect(instance.value).toBe(1);

    instance.onListSelected([1]);
    expect(instance.value).toBe(2);

    instance.onListSelected([10]);
    expect(instance.value).toBe(1);

    instance.onListSelected([11]);
    expect(instance.value).toBe(1);

    instance.onListSelected([-1]);
    expect(instance.value).toBe(1);


    wrapper = setup({ items: [1, 2, 3], type: NumericType.PERCENT, value: 10, decimals: -1 });
    instance = wrapper.instance();
    expect(instance.getValue()).toBe(10);

    wrapper = setup({ items: null, type: NumericType.PERCENT, value: 10, showTrigger: true });
    instance = wrapper.instance();
    expect(instance.findInList()).toEqual([-1]);
  });

  test('misc', () => {
    const wrapper = setup({ value: 10, min: 5, max: 15 });
    const instance = wrapper.instance();

    jest.spyOn(instance, 'resetCursor');
    jest.spyOn(instance, 'select');
    jest.spyOn(instance, 'isBlank').mockImplementationOnce(() => true);
    instance.onIMEBreakThrough();
    expect(instance.resetCursor).toBeCalled();
    instance.onIMEBreakThrough();
    expect(instance.select).toBeCalled();

    instance.updateRange();
    expect(wrapper.state('stateClassName')).toBe('');

    instance.setValue(true);
    expect(instance.value).toBe(1);
    instance.setValue(false);
    expect(instance.value).toBe(0);
    jest.spyOn(instance.textProvider, 'setValue').mockImplementationOnce(() => false);
    instance.setValue(20, true);
    expect(instance.value).toBe(20);

    instance.textProvider = null;
    instance.setValue(30);
    expect(instance.value).toBe('20.00');
  });
});
