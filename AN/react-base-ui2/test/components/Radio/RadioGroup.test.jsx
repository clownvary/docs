import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';

import { RadioGroup, Radio } from 'src/components/Radio';

describe('components/RadioGroup', () => {
  const data = [
    { text: 'Text-dog', value: 'dog' },
    { text: 'Text-elephant', value: 'elephant' },
    { text: 'Text-fest', value: 'fest' }
  ];

  it('RadioGroup renders fine', () => {
    const snapshot = renderer.create(
      <RadioGroup
        className={'snapshot-radio-group-class'}
        data={data}
        value={'elephant'}
      />
    ).toJSON();
    expect(snapshot).toMatchSnapshot();
  });

  it('Empty radioGroup renders fine', () => {
    const snapshot = renderer.create(
      <RadioGroup>
        No Options
      </RadioGroup>
    ).toJSON();
    expect(snapshot).toMatchSnapshot();
  });

  it('RadioGroup component works fine', () => {
    const onChange = jest.fn();
    const radioGroup = mount(<RadioGroup
      data={data}
      defaultValue={'dog'}
      onChange={onChange}
    />);

    const radios = radioGroup.find(Radio);
    expect(radios).toHaveLength(3);
    expect(radios.get(0).checked).toBeTruthy();
    expect(radios.get(1).checked).toBeFalsy();
    expect(radios.get(2).checked).toBeFalsy();

    radioGroup.setProps({ className: 'set-props-not-value-class' });
    expect(radios.get(0).checked).toBeTruthy();
    expect(radios.get(1).checked).toBeFalsy();
    expect(radios.get(2).checked).toBeFalsy();

    const festRadio = radioGroup.find('input[type="radio"]').at(2);
    festRadio.simulate('change', { target: { checked: true, value: 'fest' } });
    expect(radios.get(0).checked).toBeFalsy();
    expect(radios.get(1).checked).toBeFalsy();
    expect(radios.get(2).checked).toBeTruthy();

    radioGroup.setProps({ value: 'elephant' });
    expect(radios.get(0).checked).toBeFalsy();
    expect(radios.get(1).checked).toBeTruthy();
    expect(radios.get(2).checked).toBeFalsy();

    festRadio.simulate('change', { target: { checked: true, value: 'fest' } });
    expect(radios.get(0).checked).toBeFalsy();
    expect(radios.get(1).checked).toBeTruthy();
    expect(radios.get(2).checked).toBeFalsy();
  });
});
