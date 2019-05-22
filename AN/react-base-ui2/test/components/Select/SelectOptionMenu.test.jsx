import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';
import Menu from 'src/components/Select/SelectOptionMenu';
import { KeyCode } from 'src/consts';

describe('components/Select/SelectOptionMenu', () => {
  const optionData = [
    { text: 'option 1', value: 'v1' },
    { text: 'option 2', value: 'v2' },
    { text: 'option 3', value: 'v3' }
  ];

  const testProps = {
    optionData,
    prefixCls: 'test-select',
    hidden: false,
    menuWidth: 200,
    menuOptionMaxHeight: 120,
    optionFooterRenderer: menuProps => (<div className={`${menuProps.prefixCls}-footer`}>Footer</div>)
  };

  it('component renders fine', () => {
    const props = testProps;
    const snapshot = renderer.create(<Menu {...props} />).toJSON();
    expect(snapshot).toMatchSnapshot();
  });

  it('component renders fine without menuWidth', () => {
    const props = { ...testProps, menuWidth: 0 };
    const snapshot = renderer.create(<Menu {...props} />).toJSON();
    expect(snapshot).toMatchSnapshot();
  });

  it('component works fine', () => {
    const onOptionItemSelect = jest.fn();
    const onOptionItemDeselect = jest.fn();
    const props = {
      ...testProps,
      selectedValues: ['v1'],
      onOptionItemSelect,
      onOptionItemDeselect
    };
    const component = mount(<Menu {...props} />);
    const instance = component.instance();

    expect(component.state().activeValue).toEqual('_unset');

    instance.onItemHover({ value: 'v3', hover: true });
    expect(component.state().activeValue).toEqual('v3');

    instance.onItemHover({ value: 'v3', hover: false });
    expect(component.state().activeValue).toEqual('_unset');

    instance.onItemSelect({}, 'v3');
    expect(onOptionItemSelect).toHaveBeenCalledTimes(1);

    instance.onItemDeselect({}, 'v3');
    expect(onOptionItemDeselect).toHaveBeenCalledTimes(1);

    const controller = component.find('.test-select-option-list');
    controller.simulate('keydown', { keyCode: KeyCode.DOWN });
    expect(component.state().activeValue).toEqual('v1');
    controller.simulate('keydown', { keyCode: KeyCode.DOWN });
    expect(component.state().activeValue).toEqual('v2');
    controller.simulate('keydown', { keyCode: KeyCode.UP });
    expect(component.state().activeValue).toEqual('v1');
    controller.simulate('keydown', { keyCode: KeyCode.UP });
    expect(component.state().activeValue).toEqual('v3');
    controller.simulate('keydown', { keyCode: KeyCode.DOWN });
    expect(component.state().activeValue).toEqual('v1');

    controller.simulate('keydown', { keyCode: KeyCode.ENTER });
    expect(component.state().activeValue).toEqual('v1');
    controller.simulate('keydown', { keyCode: KeyCode.BACKSPACE });
    expect(component.state().activeValue).toEqual('v1');

    component.setProps({ activeValue: 'v2' });
    expect(component.state().activeValue).toEqual('v2');
    component.setProps({ selectedValues: ['v1', 'v2'] });
    expect(component.state().activeValue).toEqual('v2');

    expect(Object.keys(instance._itemInstances)).toHaveLength(3);
    component.unmount();
    expect(instance._itemInstances).toBeNull();
  });

  it('component works fine if no option data', () => {
    const props = {
      ...testProps,
      optionFooterRenderer: undefined,
      optionData: []
    };
    const component = mount(<Menu {...props} />);

    expect(component.state().activeValue).toEqual('_unset');

    const container = component.find('.test-select-option.u-hidden');
    expect(container).toHaveLength(1);

    const controller = component.find('.test-select-option-list');
    controller.simulate('keydown', { keyCode: KeyCode.DOWN });
    expect(component.state().activeValue).toEqual('_unset');
  });
});
