import React from 'react';
import { mount } from 'enzyme';
import map from 'lodash/map';
import uniqueId from 'lodash/uniqueId';
import SingleColumnList from 'src/components/List/SingleColumnList';
import Checkbox from 'src/components/Checkbox';

const setup = (props = {}) => mount(<SingleColumnList {...props} />);

const singleRowData = map(Array(5), () => {
  const index = uniqueId();
  return ({
    index,
    text: `this is a test ${index}`,
    value: index,
    disabled: index % 10 === 0
  });
});

const config = {
  checkable: true,
  showIcon: true,
  icon: 'test',
  showTips: true,
  prefix: 'an-'
};

const initProps = {
  renderer: jest.fn(),
  checkable: true,
  selectedIndex: [1],
  onChange: jest.fn(),
  data: singleRowData,
  config
};

describe('components => SingleColumnList', () => {
  let component;
  it('SingleColumnList renderer is null  should works fine', () => {
    component = setup({ ...initProps, renderer: null });
    expect(component.find('.rowcontainer')).toHaveLength(5);
    expect(component.find(Checkbox)).toHaveLength(5);
    component.find('input').at(1).simulate('click');
    expect(initProps.onChange).toHaveBeenCalled();
    expect(component.find('.row-icon')).toHaveLength(5);
  });


  it('SingleColumnList renderer is null and checkable, showIcon is false should works fine', () => {
    component = setup({
      ...initProps,
      renderer: null,
      config: { ...config, checkable: false, showIcon: false }
    });
    expect(component.find('.rowcontainer')).toHaveLength(5);
    expect(component.find(Checkbox)).toHaveLength(0);
    expect(component.find('.row-icon')).toHaveLength(0);
  });

  it('SingleColumnList renderer is function should works fine', () => {
    component = setup({
      ...initProps,
      renderer: item => <a>{item.text}</a>
    });
    expect(component.find('.rowcontainer')).toHaveLength(0);
    expect(component.find('a')).toHaveLength(5);
  });

  it('SingleColumnList config.disabled is false should works fine', () => {
    const onChange = jest.fn();
    component = setup({
      ...initProps,
      onChange,
      config: {
        checkable: true,
        showIcon: true,
        icon: 'test',
        WCAG: true,
        showTips: false,
        prefix: 'an-',
        disabled: false
      },
      data: [
        {
          index: 1,
          text: 'this is a test 1',
          value: 1
        }
      ]
    });
    component.find('li').at(0).simulate('click');
    expect(onChange).toHaveBeenCalled();
    expect(component.find('.disabled')).toHaveLength(0);
  });

  it('SingleColumnList config.disabled is true should works fine', () => {
    const onChange = jest.fn();
    component = setup({
      ...initProps,
      onChange,
      config: {
        checkable: true,
        showIcon: true,
        icon: 'test',
        WCAG: true,
        showTips: false,
        prefix: 'an-',
        disabled: true
      },
      data: [
        {
          index: 1,
          text: 'this is a test 1',
          value: 1
        }
      ]
    });
    component.find('li').at(0).simulate('click');
    expect(onChange).not.toHaveBeenCalled();
    expect(component.find('.disabled')).toHaveLength(1);
  });
});
