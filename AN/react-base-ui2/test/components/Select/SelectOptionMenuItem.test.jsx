import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';
import Item from 'src/components/Select/SelectOptionMenuItem';
import { KeyCode } from 'src/consts';

describe('components/Select/SelectOptionMenuItem', () => {
  const option = {
    text: 'option memu item 1',
    value: 'omi-1'
  };

  it('component renders fine', () => {
    const props = {
      prefixCls: 'test-menu',
      option,
      active: true,
      selected: true
    };
    const snapshot = renderer.create(<Item {...props} />).toJSON();
    expect(snapshot).toMatchSnapshot();
  });

  it('component renders fine if option is disabled', () => {
    const props = {
      prefixCls: 'test-menu-disabled',
      option: { ...option, disabled: true },
      active: true,
      selected: true
    };
    const snapshot = renderer.create(<Item {...props} />).toJSON();
    expect(snapshot).toMatchSnapshot();
  });

  it('component render fine with customize renderer', () => {
    const props = {
      prefixCls: 'test-menu-customize',
      option,
      optionItemRenderer: itemProps => (<span>{itemProps.text}{itemProps.value}</span>)
    };
    const snapshot = renderer.create(<Item {...props} />).toJSON();
    expect(snapshot).toMatchSnapshot();
  });

  it('component works fine', () => {
    const onItemHover = jest.fn();
    const onItemClick = jest.fn();
    const onItemSelect = jest.fn();
    const onItemDeselect = jest.fn();
    const onKeyDown = jest.fn();
    const saveItemRef = jest.fn();
    const props = {
      prefixCls: 'test-menu',
      option,
      saveItemRef,
      onItemHover,
      onItemClick,
      onItemSelect,
      onItemDeselect,
      onKeyDown,
      selected: false
    };
    const component = mount(<Item {...props} />);
    const instance = component.instance();
    expect(saveItemRef).toHaveBeenCalled();

    const item = component.find('.test-menu-option-item');
    expect(item).toHaveLength(1);

    item.simulate('mouseenter');
    expect(onItemHover).toHaveBeenCalledTimes(1);

    item.simulate('mouseleave');
    expect(onItemHover).toHaveBeenCalledTimes(2);

    item.simulate('mousedown');
    expect(onItemClick).toHaveBeenCalled();
    expect(onItemSelect).toHaveBeenCalledTimes(1);

    instance.onKeyDown({ keyCode: KeyCode.ENTER }, { emptyMenu: false });
    expect(onKeyDown).toHaveBeenCalledTimes(1);
    expect(onItemSelect).toHaveBeenCalledTimes(2);

    instance.onKeyDown({ keyCode: KeyCode.ESCAPE }, { emptyMenu: false });
    expect(onKeyDown).toHaveBeenCalledTimes(2);
    expect(onItemSelect).toHaveBeenCalledTimes(2);

    component.setProps({ selected: true });
    expect(saveItemRef).toHaveBeenCalledTimes(2);

    item.simulate('mousedown');
    expect(onItemClick).toHaveBeenCalled();
    expect(onItemDeselect).toHaveBeenCalledTimes(1);

    instance.onKeyDown({ keyCode: KeyCode.SPACE }, { emptyMenu: false });
    expect(onKeyDown).toHaveBeenCalledTimes(3);
    expect(onItemDeselect).toHaveBeenCalledTimes(2);

    instance.onKeyDown({ keyCode: KeyCode.BACKSPACE }, { emptyMenu: false });
    expect(onKeyDown).toHaveBeenCalledTimes(4);
    expect(onItemDeselect).toHaveBeenCalledTimes(2);

    instance.onKeyDown({ keyCode: KeyCode.BACKSPACE }, { emptyMenu: true });
    expect(onKeyDown).toHaveBeenCalledTimes(5);
    expect(onItemDeselect).toHaveBeenCalledTimes(2);

    instance.getOptionItemRef();
  });

  it('component works fine if no keydown callback', () => {
    const onItemSelect = jest.fn();
    const onItemDeselect = jest.fn();
    const props = {
      prefixCls: 'test-menu',
      option,
      onItemSelect,
      onItemDeselect
    };

    const component = mount(<Item {...props} />);
    const instance = component.instance();
    instance.onKeyDown({ keyCode: KeyCode.ENTER }, { emptyMenu: false });
    expect(onItemSelect).toHaveBeenCalledTimes(1);

    instance.onKeyDown({ keyCode: KeyCode.ESCAPE }, { emptyMenu: false });
    expect(onItemSelect).toHaveBeenCalledTimes(1);
  });
});
