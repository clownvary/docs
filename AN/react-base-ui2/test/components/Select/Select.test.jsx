import React from 'react';
import renderer from 'react-test-renderer';
import { mount, ReactWrapper } from 'enzyme';
import { Select } from 'src/components';
import { KeyCode } from 'src/consts';

describe('components/Select', () => {
  const optionData = [
    { text: 'option 1', value: 'v1' },
    { text: 'option 2', value: 'v2' },
    { text: 'option 3', value: 'v3' }
  ];

  const testProps = {
    optionData,
    prefixCls: 'test-ms',
    placeholder: 'test search...'
  };

  it('component renders fine', () => {
    const props = testProps;
    const snapshot = renderer.create(<Select {...props} />).toJSON();
    expect(snapshot).toMatchSnapshot();
  });

  it('component renders fine with optionMenuRenderer', () => {
    const props = {
      ...testProps,
      optionMenuRenderer: menu => (<div className="customize-menu">{menu}</div>)
    };
    const snapshot = renderer.create(<Select {...props} />).toJSON();
    expect(snapshot).toMatchSnapshot();
  });

  it('component works fine', () => {
    jest.useFakeTimers();
    const onSelect = jest.fn();
    const onChange = jest.fn();
    const onOptionItemClick = jest.fn();
    const props = {
      ...testProps,
      onSelect,
      onChange,
      onOptionItemClick
    };
    const component = mount(<Select {...props} />);
    const instance = component.instance();

    const outerRenderer = component.find('.test-ms');
    const input = component.find('input');
    const selectRenderer = component.find('.test-ms-renderer');
    const placeholder = component.find('.test-ms-placeholder');

    instance.focus(false);
    expect(instance._focused).toBeFalsy();

    placeholder.simulate('click');
    expect(instance._focused).toBeTruthy();

    input.simulate('focus');
    expect(selectRenderer.hasClass('test-ms-renderer__focused')).toBeTruthy();
    input.simulate('blur');
    jest.runOnlyPendingTimers();
    expect(selectRenderer.hasClass('test-ms-renderer__focused')).toBeFalsy();
    expect(instance._focused).toBeFalsy();

    outerRenderer.simulate('click');
    expect(instance._focused).toBeTruthy();
    expect(component.state().open).toBeTruthy();

    input.simulate('change', { target: { value: '2' } });
    expect(component.state().inputValue).toEqual('2');
    expect(document.querySelectorAll('.test-ms-option-item')).toHaveLength(1);

    input.simulate('keydown', { keyCode: KeyCode.BACKSPACE });
    input.simulate('change', { target: { value: '' } });
    expect(component.state().inputValue).toEqual('');
    expect(document.querySelectorAll('.test-ms-option-item')).toHaveLength(3);

    input.simulate('keydown', { keyCode: KeyCode.ENTER });
    expect(onSelect).toHaveBeenCalled();
    expect(onChange).toHaveBeenCalled();

    input.simulate('keydown', { keyCode: KeyCode.ESCAPE });
    input.simulate('keydown', { keyCode: KeyCode.ESCAPE });
    expect(component.state().open).toBeFalsy();
    expect(component.state().choiceValues).toEqual(['v1']);

    input.simulate('keydown', { keyCode: KeyCode.DOWN });
    input.simulate('keydown', { keyCode: KeyCode.DOWN });
    expect(component.state().open).toBeTruthy();

    component.find('.icon-close').simulate('mousedown');
    expect(component.state().choiceValues).toHaveLength(0);

    new ReactWrapper(instance._selectionMenuRef, true).find('.test-ms-option-item').at(2).simulate('mousedown');
    expect(onOptionItemClick).toHaveBeenCalled();
    expect(component.state().choiceValues).toEqual(['v3']);

    input.simulate('keydown', { keyCode: KeyCode.BACKSPACE });
    expect(component.state().choiceValues).toHaveLength(0);

    input.simulate('keydown', { keyCode: KeyCode.BACKSPACE });
    expect(component.state().choiceValues).toHaveLength(0);
  });

  it('component works fine with choice values setup', () => {
    const props = {
      ...testProps,
      choiceValues: ['v2', 'v3']
    };
    const component = mount(<Select {...props} />);
    expect(component.state().choiceValues).toEqual(['v2', 'v3']);

    const nextChoiceValues = ['v1', 'v2', 'v3'];
    component.setProps({ choiceValues: ['v2', 'v3'] });
    component.setProps({ choiceValues: nextChoiceValues });
    expect(component.state().choiceValues).toEqual(['v1', 'v2', 'v3']);

    component.find('.icon-close').at(0).simulate('mousedown');
  });

  it('component works fine if optionMenuRenderer is null', () => {
    const props = {
      ...testProps,
      optionMenuRenderer: null
    };
    const component = mount(<Select {...props} />);
    const instance = component.instance();

    const outerRenderer = component.find('.test-ms');
    outerRenderer.simulate('click');
    expect(instance._focused).toBeTruthy();
    expect(component.state().open).toBeTruthy();
  });

  it('if creatable is true component works fine', () => {
    const props = {
      ...testProps,
      creatable: true,
      onChange: jest.fn()
    };
    const component = mount(<Select {...props} />);
    const instance = component.instance();

    const outerRenderer = component.find('.test-ms');
    outerRenderer.simulate('click');
    expect(instance._focused).toBeTruthy();
    expect(component.state().open).toBeTruthy();
    new ReactWrapper(instance._selectionMenuRef, true).find('.test-ms-option-item').at(2).simulate('mousedown');
    expect(component.state().open).toBeFalsy;
    expect(component.state().inputValue).toEqual('v3');
    expect(props.onChange).toHaveBeenCalled();
    component.setProps({ inputValue: '' });
    expect(component.state().inputValue).toEqual('');
  });
});
