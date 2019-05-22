import React from 'react';
import { mount } from 'enzyme';
import toJSON from 'enzyme-to-json';
import InputMoment from '../../../src/components/InputMoment';
import { createMoment, isSame } from '../../../src/utils/momentHelper';
import { Globalize } from '../../../src/services/i18n';
import TokenType from '../../../src/components/InputMoment/consts/TokenType';
import { KeyCode } from '../../../src/consts';

const setup = (props = {}) => mount(<InputMoment {...props} />);

describe('components/InputMoment/InputMoment.jsx', () => {
  let wrapper;
  const m1 = createMoment('2018-01-01T00:00:00+00:00').utc();
  const m2 = createMoment('2018-01-02T00:00:00+00:00').utc();
  const m3 = createMoment('2018-01-03T00:00:00+00:00').utc();
  const t1 = '2018-01-01T00:00:00+00:00';
  const t2 = '2018-01-02T00:00:00+00:00';
  const t3 = '2018-01-03T00:00:00+00:00';
  const r1 = '01 Jan 2018';
  const r2 = '02 Jan 2018';
  const r3 = '03 Jan 2018';

  beforeEach(() => {
    const value = m1;
    wrapper = setup({ value });
  });

  test('rendering and basic useage', () => {
    const instance = wrapper.instance();
    expect(instance.isBlank()).toBe(false);
    expect(toJSON(wrapper)).toMatchSnapshot();

    instance.setValue('2018-01-01T00:00:00+00:00');
    expect(isSame(instance.getValue(), m1)).toBe(true);

    wrapper.setProps({ allowBlank: false });
    instance.onClear();
    expect(isSame(instance.getValue(), m1)).toBe(true);

    wrapper.setProps({ allowBlank: true });
    instance.onClear();
    expect(instance.getValue()).toBe(null);
  });

  test('get and set', () => {
    const instance = wrapper.instance();
    expect(isSame(instance.value, m1)).toBe(true);
    expect(instance.text).toBe(r1);

    instance.value = m2;
    expect(instance.text).toBe(r2);

    instance.text = t3;
    expect(isSame(instance.value, m3));
  });

  test('component lifecycs', () => {
    const instance = wrapper.instance();
    wrapper.setProps({ value: m2 });
    expect(instance.getText()).toBe(r2);

    wrapper.setProps({ max: m3 });
    expect(instance.needCheckRange).toBe(false);

    wrapper.setProps({ format: TokenType.YEAR_FOUR_DIGITS });
    expect(instance.getText()).toBe('2018');

    wrapper.setProps({ timeStep: 100 });
    expect(instance.listItems.length).toBeGreaterThan(0);
  });

  test('handle input events', () => {
    const instance = wrapper.instance();
    const input = wrapper.find('input');
    jest.spyOn(instance, 'setValue');
    jest.spyOn(instance, 'allowEdit');
    jest.spyOn(instance, 'updateText');
    jest.spyOn(instance, 'triggerEvent');
    jest.spyOn(instance.textProvider, 'isValid');
    jest.spyOn(instance.textProvider, 'getField');
    jest.spyOn(instance.textProvider, 'isFieldGap');
    jest.spyOn(instance.textProvider, 'closeBlankField');
    const dateNowSpy = jest.spyOn(Date, 'now').mockImplementation(() => 1527825600000);

    jest.useFakeTimers();

    input.simulate('focus');
    jest.runAllTimers();

    instance.allowEdit.mockImplementationOnce(() => false);
    expect(instance.onInputFocus()).toBeUndefined();

    input.simulate('blur');
    jest.runAllTimers();

    instance.onIMEBreakThrough();
    expect(instance.imeMode).toBe(true);

    instance.input.value = t1;
    instance.onStopTyping();
    expect(instance.setValue).toBeCalled();

    instance.textProvider.closeBlankField.mockImplementationOnce(() => true);
    instance.input.value = t2;
    instance.onStopTyping();
    expect(instance.updateText).toBeCalled();

    // onKeyPressPreview
    instance.textProvider.getField.mockImplementationOnce(() => null);
    expect(instance.onKeyPressPreview('1')).toBe(true);

    instance.textProvider.getField.mockImplementationOnce(() => ({ allowInstanceEditing: true }));
    expect(instance.onKeyPressPreview('a')).toBe(true);

    instance.textProvider.isValid.mockImplementationOnce(() => false);
    expect(instance.onKeyPressPreview('1')).toBe(true);

    expect(instance.onKeyPressPreview(' ')).toBe(true);
    instance.onKeyPressPreview('0');
    instance.onKeyPressPreview('1');
    expect(instance.getText()).toBe('01 Jun 2018');

    instance.textProvider.isFieldGap.mockImplementationOnce(() => true);
    instance.input.value = t1;
    instance.onKeyPressPreview('3');
    expect(instance.getText()).toBe(r1);

    instance.timeStamp = new Date((new Date()).getTime() - 100);
    instance.onKeyPressPreview('1');
    expect(instance.triggerEvent).toBeCalledWith('onInvalidInput', { char: '1' });

    // onKeyDownPreview - navigate between fields
    instance.input.value = t1;
    instance.toFirstField();
    instance.input.value = t1;
    instance.onKeyDownPreview({ keyCode: KeyCode.RIGHT });
    expect(instance.textProvider.activeFieldIndex).toBe(1);
    instance.input.value = t1;
    instance.onKeyDownPreview({ keyCode: KeyCode.LEFT });
    expect(instance.textProvider.activeFieldIndex).toBe(0);
    instance.input.value = t1;
    instance.onKeyDownPreview({ keyCode: KeyCode.TAB });
    expect(instance.textProvider.activeFieldIndex).toBe(1);
    instance.input.value = t1;
    instance.onKeyDownPreview({ keyCode: KeyCode.TAB, shiftKey: true });
    expect(instance.textProvider.activeFieldIndex).toBe(0);
    instance.input.value = t1;
    instance.onKeyDownPreview({ keyCode: KeyCode.TAB, shiftKey: true });
    expect(instance.textProvider.activeFieldIndex).toBe(0);
    instance.input.value = t1;
    instance.toLastField();
    instance.input.value = t1;
    instance.onKeyDownPreview({ keyCode: KeyCode.TAB });
    expect(instance.textProvider.activeFieldIndex).toBe(instance.textProvider.getFieldCount() - 1);
    instance.input.value = t1;
    instance.onKeyDownPreview({ keyCode: KeyCode.HOME });
    expect(instance.textProvider.activeFieldIndex).toBe(0);
    instance.input.value = t1;
    instance.onKeyDownPreview({ keyCode: KeyCode.END });
    expect(instance.textProvider.activeFieldIndex).toBe(instance.textProvider.getFieldCount() - 1);

    instance.input.value = t1;
    instance.toFirstField();
    instance.textProvider.isValid.mockImplementation(() => false);
    instance.input.value = t1;
    instance.onKeyDownPreview({ which: KeyCode.TAB });
    expect(instance.textProvider.activeFieldIndex).toBe(0);

    dateNowSpy.mockReset();
    dateNowSpy.mockRestore();
  });

  test('field operations', () => {
    let instance = wrapper.instance();

    jest.useFakeTimers();

    // highLightField(index)
    jest.spyOn(instance, 'isFocused');
    jest.spyOn(instance, 'select');
    jest.spyOn(instance.textProvider, 'getFieldRange');

    expect(instance.highLightField(-1)).toBeUndefined();
    expect(instance.isFocused).not.toBeCalled();

    instance.isFocused.mockImplementationOnce(() => true);
    instance.textProvider.getFieldRange.mockImplementationOnce(() => ({ start: 0, end: 5 }));
    instance.highLightField(0);
    jest.runAllTimers();
    expect(instance.select).toBeCalledWith({ start: 0, end: 5 });

    // move between fields
    instance.setActiveField(0);
    expect(instance.textProvider.activeFieldIndex).toBe(0);
    instance.toNextField();
    expect(instance.textProvider.activeFieldIndex).toBe(1);
    instance.toLastField();
    expect(instance.textProvider.activeFieldIndex).toBe(instance.textProvider.getFieldCount() - 1);
    instance.toPrevField();
    expect(instance.textProvider.activeFieldIndex).toBe(instance.textProvider.getFieldCount() - 2);
    instance.toFirstField();
    expect(instance.textProvider.activeFieldIndex).toBe(0);

    // highLightCurosr(pos)
    jest.spyOn(instance, 'highLightField');
    jest.spyOn(instance, 'setActiveField');
    instance.highLightCursor(0);
    expect(instance.highLightField).toHaveBeenCalledTimes(1);
    expect(instance.setActiveField).toHaveBeenCalledTimes(1);

    wrapper = setup({ format: '[LITERAL]' });
    instance = wrapper.instance();
    jest.spyOn(instance, 'allowEdit');
    jest.spyOn(instance, 'highLightField');
    jest.spyOn(instance, 'setActiveField');

    expect(instance.highLightCursor(0)).toBeUndefined();
    expect(instance.setActiveField).not.toBeCalled();
    expect(instance.highLightField).not.toBeCalled();

    instance.allowEdit.mockImplementationOnce(() => false);
    expect(instance.highLightCursor(0)).toBeUndefined();
    expect(instance.setActiveField).not.toBeCalled();
    expect(instance.highLightField).not.toBeCalled();

    instance.highLightCursor();
    expect(instance.setActiveField).not.toBeCalled();
    expect(instance.highLightField).not.toBeCalled();
  });

  test('deletion', () => {
    wrapper = setup({ value: m3 });
    let instance = wrapper.instance();
    jest.spyOn(instance, 'allowEdit');
    jest.spyOn(instance, 'isSelectAll');
    jest.spyOn(instance.textProvider, 'clearField');

    instance.allowEdit.mockImplementationOnce(() => false);
    expect(instance.deleteSelection()).toBeUndefined();
    expect(isSame(instance.getValue(), m3));

    instance.deleteSelection();
    expect(instance.getText()).toBe(r3.replace(/03/, ''));

    instance.isSelectAll.mockImplementationOnce(() => true);
    instance.deleteSelection();
    expect(instance.getValue()).toBe(null);

    wrapper.setProps({ allowBlank: false });
    instance.isSelectAll.mockImplementationOnce(() => true);
    expect(instance.deleteSelection()).toBeUndefined();

    wrapper = setup({ value: m3 });
    instance = wrapper.instance();
    jest.spyOn(instance.textProvider, 'clearField');
    instance.textProvider.clearField.mockImplementationOnce(() => false);
    instance.deleteSelection();
    expect(instance.getText()).toBe(r3);
  });

  test('handle calendar', () => {
    const instance = wrapper.instance();
    jest.spyOn(instance, 'onCalendarOpen');
    jest.spyOn(instance, 'popupCalendar');
    jest.spyOn(instance, 'triggerEvent');

    instance.onTriggerClick();
    expect(instance.popupCalendar).toHaveBeenCalledTimes(1);
    expect(instance.onCalendarOpen).toHaveBeenCalledTimes(1);

    instance.setValue(null);
    instance.onTriggerClick();
    expect(instance.popupCalendar).toHaveBeenCalledTimes(2);
    expect(instance.onCalendarOpen).toHaveBeenCalledTimes(2);

    instance.onCalendarClose();
    expect(instance.triggerEvent).toBeCalledWith('onCalendarClose');
  });

  test('handle list', () => {
    const instance = wrapper.instance();
    jest.spyOn(instance, 'onListOpen');
    jest.spyOn(instance, 'findInList');
    instance.onTrigger2Click();
    expect(instance.onListOpen).toBeCalled();

    instance.value = null;
    instance.onTrigger2Click();
    expect(instance.findInList).toBeCalled();

    expect(instance.onListSelected()).toBeUndefined();
    expect(instance.onListSelected([-1])).toBeUndefined();
    expect(instance.onListSelected([instance.listItems.length])).toBeUndefined();

    instance.preMoment = m1;
    instance.onListSelected([1]);
    expect(isSame(instance.getValue(), createMoment('2018-01-01T00:30'))).toBe(true);

    instance.preMoment = null;
    instance.listItems.push({});
    instance.onListSelected([instance.listItems.length - 1]);
    expect(isSame(instance.getValue(), createMoment('1970-01-01T00:00'))).toBe(true);
  });

  test('misc', () => {
    wrapper = setup({ min: m2, max: m2 });
    let instance = wrapper.instance();

    wrapper.setProps({ value: m1 });
    expect(isSame(instance.getValue(), m2)).toBe(true);

    wrapper.setProps({ value: m3 });
    expect(isSame(instance.getValue(), m2)).toBe(true);

    wrapper = setup({ value: m2 });
    instance = wrapper.instance();
    wrapper.setProps({ value: createMoment('1800-01-01T00:00:00+00:00').utc() });
    expect(isSame(createMoment(new Date(1900, 0, 1)), instance.getValue())).toBe(true);
    wrapper.setProps({ value: createMoment(new Date()).add(60, 'year') });
    const systemMaxDate = Globalize.getToday().add(50, 'year');
    expect(instance.getValue().year()).toBe(systemMaxDate.year());
    expect(instance.getValue().month()).toBe(systemMaxDate.month());
    expect(instance.getValue().date()).toBe(systemMaxDate.date());

    wrapper.setProps({ value: m2 });
    instance.doSpin();
    expect(isSame(instance.getValue(), m1)).toBe(true);
    instance.doSpin(true);
    expect(isSame(instance.getValue(), m2)).toBe(true);

    jest.spyOn(instance.textProvider, 'isValid');
    instance.textProvider.isValid.mockImplementationOnce(() => false);
    expect(instance.initValue('0')).toBe(true);

    instance.textProvider.pattern = null;
    expect(instance.getTimeFormat()).toBe('hh:mm A');
  });
});
