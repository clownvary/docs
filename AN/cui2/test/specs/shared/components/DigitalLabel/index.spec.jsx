import React from 'react';
import DigitalLabel from 'shared/components/DigitalLabel';
import { mount } from 'enzyme';

function setup(props) {
  const component = mount(
    <DigitalLabel
      {...props}
    />
  );

  return {
    component
  };
}
describe('shared/components/DigitalLabel', () => {
  it('Should render all default props as expect', () => {
    const { component } = setup({ value: 'test text' });
    expect(component.text()).toEqual('test text');
    expect(component.find('.an-dgt-label')).toHaveLength(1);
    expect(component.find('.an-dgt-label--bold').length).toEqual(0);
    expect(component.find('.an-dgt-label--size-m')).toHaveLength(1);
    expect(component.find('.an-dgt-label--align-left')).toHaveLength(1);
    expect(component.find('.an-dgt-label--type-seconday')).toHaveLength(1);
    expect(component.find('.an-dgt-label__hint').length).toEqual(0);
  });

  it('Should render bold prop as expect', () => {
    const { component } = setup({ bold: true });
    expect(component.find('.an-dgt-label--bold')).toHaveLength(1);
  });

  it('Should render size prop as expect', () => {
    const { component } = setup({ size: 'xl' });
    expect(component.find('.an-dgt-label--size-xl')).toHaveLength(1);
  });

  it('Should render align prop as expect', () => {
    const { component } = setup({ align: 'right' });
    expect(component.find('.an-dgt-label--align-right')).toHaveLength(1);
  });

  it('Should render type prop as expect', () => {
    const { component } = setup({ type: 'attention' });
    expect(component.find('.an-dgt-label--type-attention')).toHaveLength(1);
  });

  it('Should render className prop as expect', () => {
    const { component } = setup({ className: 'text-class-attention' });
    expect(component.find('.text-class-attention')).toHaveLength(1);
  });

  it('Should render hintLableEnable prop as expect', () => {
    const { component } = setup({ hintLableEnable: true, hintLabel: 'text hint' });
    expect(component.find('.an-dgt-label__hint')).toHaveLength(1);
    expect(component.find('.an-dgt-label__hint').at(0).text()).toEqual('text hint');
  });
});
