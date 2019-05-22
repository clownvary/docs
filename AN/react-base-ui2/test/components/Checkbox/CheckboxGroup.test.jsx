import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';

import { CheckboxGroup } from 'src/components/Checkbox';

describe('components/CheckboxGroup', () => {
  const data = [
    { text: 'Text-apple', value: 'apple' },
    { text: 'Text-blueberry', value: 'blueberry' },
    { text: 'Text-Cherry', value: 'cherry' }
  ];

  it('CheckboxGroup renders fine', () => {
    const snapshot = renderer.create(
      <CheckboxGroup
        className={'snapshot-checkbox-group-class'}
        data={data}
        value={'blueberry'}
      />
    ).toJSON();
    expect(snapshot).toMatchSnapshot();
  });

  it('Empty checkboxGroup renders fine', () => {
    const snapshot = renderer.create(
      <CheckboxGroup>
        No Options
      </CheckboxGroup>
    ).toJSON();
    expect(snapshot).toMatchSnapshot();
  });

  it('CheckboxGroup component works fine', () => {
    const onChange = jest.fn();
    const checkboxGroup = mount(<CheckboxGroup
      data={data}
      defaultValue={['apple']}
      onChange={onChange}
    />);

    const checkboxes = checkboxGroup.find('input[type="checkbox"]');
    expect(checkboxes).toHaveLength(3);
    expect(checkboxes.get(0).checked).toBeTruthy();

    checkboxes.at(1).simulate('change', { target: { checked: true } });
    expect(checkboxes.get(0).checked).toBeTruthy();
    expect(checkboxes.get(1).checked).toBeTruthy();
    expect(onChange).toHaveBeenCalledTimes(1);

    checkboxes.at(1).simulate('change', { target: { checked: false } });
    expect(checkboxes.get(0).checked).toBeTruthy();
    expect(checkboxes.get(1).checked).toBeFalsy();
    expect(onChange).toHaveBeenCalledTimes(2);

    checkboxGroup.setProps({ className: 'set-props-not-value-class' });
    expect(checkboxes.get(0).checked).toBeTruthy();
    expect(checkboxes.get(1).checked).toBeFalsy();
    expect(checkboxes.get(2).checked).toBeFalsy();

    checkboxGroup.setProps({ value: ['cherry'] });
    expect(checkboxes.get(0).checked).toBeFalsy();
    expect(checkboxes.get(1).checked).toBeFalsy();
    expect(checkboxes.get(2).checked).toBeTruthy();
    checkboxes.at(1).simulate('change', { target: { checked: true } });
    expect(checkboxes.get(0).checked).toBeFalsy();
    expect(checkboxes.get(1).checked).toBeFalsy();
    expect(checkboxes.get(2).checked).toBeTruthy();
  });
});
