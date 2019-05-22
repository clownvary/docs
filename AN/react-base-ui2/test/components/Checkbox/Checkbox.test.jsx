import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';

import { Checkbox } from 'src/components/Checkbox';

describe('components/Checkbox', () => {
  it('Checkbox renders fine', () => {
    const snapshot = renderer.create(
      <Checkbox
        id="snapshot-checkbox-id"
        size={'md'}
        className={'snapshot-checkbox-class'}
        toggle
        checked
      >
        snapshot checkbox
      </Checkbox>
    ).toJSON();
    expect(snapshot).toMatchSnapshot();
  });

  it('DefaultChecked checkbox renders fine', () => {
    const snapshot = renderer.create(
      <Checkbox
        defaultChecked
      />
    ).toJSON();
    expect(snapshot).toMatchSnapshot();
  });

  it('Checkbox component works fine', () => {
    const onChange = jest.fn();
    const checkbox = mount(<Checkbox onChange={onChange} />);
    const instance = checkbox.instance();

    expect(instance.checked).toBeFalsy();

    instance.checked = true;
    expect(instance.checked).toBeTruthy();

    checkbox.find('input[type="checkbox"]').simulate('change', { target: { checked: false } });
    expect(instance.checked).toBeFalsy();
    expect(onChange).toHaveBeenCalledTimes(1);

    checkbox.setProps({ disabled: true });
    expect(instance.checked).toBeFalsy();
    checkbox.find('input[type="checkbox"]').simulate('change', { target: { checked: true } });
    expect(onChange).toHaveBeenCalledTimes(1);
  });
});
