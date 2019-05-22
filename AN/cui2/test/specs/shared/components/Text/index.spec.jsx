import React from 'react';
import Text from 'shared/components/Text';
import { mount } from 'enzyme';

function setup(props, value) {
  const component = mount(
    <Text
      {...props}
    >
      {value}
    </Text>
  );

  return {
    component
  };
}
describe('shared/components/Text', () => {
  it('Should render all default props as expect', () => {
    const { component } = setup(null, 'test text');
    expect(component.text()).toEqual('test text');
    expect(component.find('.an-text')).toHaveLength(1);
    expect(component.find('.an-text--bold').length).toEqual(0);
    expect(component.find('.an-text--size-s')).toHaveLength(1);
    expect(component.find('.an-text--align-left')).toHaveLength(1);
    expect(component.find('.an-text--type-seconday')).toHaveLength(1);
  });

  it('Should render bold prop as expect', () => {
    const { component } = setup({ bold: true }, 'test text');
    expect(component.find('.an-text--bold')).toHaveLength(1);
  });

  it('Should render size prop as expect', () => {
    const { component } = setup({ size: 'xl' }, 'test text');
    expect(component.find('.an-text--size-xl')).toHaveLength(1);
  });

  it('Should render align prop as expect', () => {
    const { component } = setup({ align: 'right' }, 'test text');
    expect(component.find('.an-text--align-right')).toHaveLength(1);
  });

  it('Should render type prop as expect', () => {
    const { component } = setup({ type: 'attention' }, 'test text');
    expect(component.find('.an-text--type-attention')).toHaveLength(1);
  });

  it('Should render className prop as expect', () => {
    const { component } = setup({ className: 'text-class-attention' }, 'test text');
    expect(component.find('.text-class-attention')).toHaveLength(1);
  });
});
