import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';

import { Radio } from 'src/components/Radio';

describe('components/Radio', () => {
  it('Radio renders fine', () => {
    const snapshot = renderer.create(
      <Radio
        id="snapshot-radio-id"
        size={'md'}
        className={'snapshot-radio-class'}
        toggle
        checked
      >
        snapshot radio
      </Radio>
    ).toJSON();
    expect(snapshot).toMatchSnapshot();
  });

  it('DefaultChecked radio renders fine', () => {
    const snapshot = renderer.create(
      <Radio
        defaultChecked
      />
    ).toJSON();
    expect(snapshot).toMatchSnapshot();
  });

  it('Radio component works fine', () => {
    const onRadioChange = jest.fn();
    const radio = mount(<Radio onChange={onRadioChange} />);
    const instance = radio.instance();

    expect(instance.checked).toBeFalsy();

    instance.checked = true;
    expect(instance.checked).toBeTruthy();

    radio.find('input[type="radio"]').simulate('change', { target: { checked: false } });
    radio.setProps({ checked: false });
    expect(instance.checked).toBeFalsy();
    expect(onRadioChange).toHaveBeenCalledTimes(1);
  });

  it('Disabled radio component works fine', () => {
    const onRadioChange = jest.fn();
    const radio = mount(<Radio onChange={onRadioChange} checked />);
    const instance = radio.instance();

    expect(instance.checked).toBeTruthy();

    radio.find('input[type="radio"]').simulate('change', { target: { checked: false } });
    radio.setProps({ checked: false });
    expect(instance.checked).toBeFalsy();
    expect(onRadioChange).toHaveBeenCalledTimes(1);

    radio.setProps({ disabled: true });
    expect(instance.checked).toBeFalsy();
    expect(onRadioChange).toHaveBeenCalledTimes(1);

    radio.find('input[type="radio"]').simulate('change', { target: { checked: true } });
    expect(onRadioChange).toHaveBeenCalledTimes(1);
  });
});
