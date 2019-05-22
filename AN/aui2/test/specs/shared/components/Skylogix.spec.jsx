import React from 'react';
import { mount } from 'enzyme';
import Skylogix from 'shared/components/Skylogix';

const callFuc = {
  getValue: jest.fn()
};

describe('shared => components => Skylogix', () => {
  let component;
  afterEach(() => {
    component.unmount();
  });

  it('Skylogix should rendered correctly', () => {
    component = mount(<Skylogix />);
    expect(component.find('.light-form')).toHaveLength(1);
    expect(component.find('.checkbox')).toHaveLength(1);
    expect(component.find('.checkbox__text')).toHaveLength(1);
    expect(component.text()).toBe('Lighting PIN required');
    const input = component.find('input');
    expect(input).toHaveLength(1);
    expect(input.node.value).toBe('true');
  });

  it('Skylogix defaultChecked should right and onchange value should right', () => {
    component = mount(<Skylogix editDefaultValue={'false'} {...callFuc}/>);
    const input = component.find('input');
    expect(input.node.value).toBe('false');
    input.simulate('change');
    expect(callFuc.getValue).toHaveBeenCalled();
  });
});
