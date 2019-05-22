import React from 'react';
import { mount } from 'enzyme';
import Header from 'src/components/List/Header';
import Input from 'src/components/Input';

const setup = (props = {}) => mount(<Header {...props} />);

const config = {
  filterable: true,
  prefix: 'an-'
};

const initProps = {
  onFilter: jest.fn(),
  config
};

describe('components => Header', () => {
  let component;
  it('Header should works fine', () => {
    component = setup(initProps);
    component.find('input').simulate('change');
    expect(initProps.onFilter).toHaveBeenCalled();
    expect(component.find('.an-list__header')).toHaveLength(1);
  });

  it('Header config.disabled is false should works fine', () => {
    component = setup({ ...initProps, config: { ...config, disabled: false } });
    expect(component.find('.input-group').hasClass('input-group--disabled')).toEqual(false);
  });

  it('Header config.disabled is true should works fine', () => {
    component = setup({ ...initProps, config: { ...config, disabled: true } });
    expect(component.find('.input-group').hasClass('input-group--disabled')).toEqual(true);
  });

  it('Header onFilter not function should works fine', () => {
    component = setup({ ...initProps, onFilter: '' });
    expect(component.find(Input)).toHaveLength(0);
  });


  it('Header filterable not true should works fine', () => {
    component = setup({ ...initProps, config: { ...config, filterable: false } });
    expect(component.find(Input)).toHaveLength(0);
  });
});
