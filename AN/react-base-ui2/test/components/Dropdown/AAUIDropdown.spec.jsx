import React from 'react';
import { mount } from 'enzyme';
import { AAUIDropdown } from 'src/components/Dropdown';

const initData = [
  { id: 3, selected: true, text: 'aliqua aute', value: 3 },
  { id: 7, selected: false, text: '1res1', value: 7 },
  { id: 1, selected: false, text: '11nulla', value: 1 }
];

const initProps = {
  placeholder: 'select',
  data: initData
};

const setup = (props = {}) => mount(<AAUIDropdown {...props} />);

jest.mock('lodash/debounce', () => jest.fn(fn => fn));
describe('components => AAUIDropdown', () => {
  let component;
  let clock;

  beforeEach(() => {
    clock = jest.useFakeTimers();
  });
  afterEach(() => {
    clock.clearAllTimers();
    component.unmount();
  });

  it('Dropdown componentWillReceiveProps should works fine', () => {
    component = setup(initProps);
    component.instance().value;
    component.instance().value = 7;
    expect(component.instance().state.value).toEqual(7);

    component.setProps({ ...initProps, value: 1 });
    component.setProps({ ...initProps, value: 1, defaultValue: 3 });
    component.setProps({ ...initProps, value: 1, defaultValue: 3, filter: true });
    component.instance().value = 28;

    expect(component.instance().state.value).toEqual(1);

    component.setProps({ ...initProps, value: undefined, defaultValue: 4, filter: true });

    component.instance().navigateByKeys({ keyCode: 0, preventDefault: () => { } });

    component.setProps({
      ...initProps,
      value: undefined,
      data: [...initData, { id: 11, selected: false, text: '22nulla', value: 11 }],
      defaultValue: 7,
      filter: true
    });
    component.find('button').simulate('click');
  });

  it('disabled dropdown should works fine', () => {
    component = setup({ ...initProps, disabled: true });
    expect(component.find('.dropdown__button').hasClass('disabled')).toBe(true);
  });

  it('dropdown KeyDown event should works fine', () => {
    jest.useFakeTimers();
    component = setup({
      ...initProps,
      highlight: 200,
      preIcon: 'test',
      isMoreButton: true,
      onChange: jest.fn
    });
    component.find('.dropdown').simulate('keyup');

    component.find('button').simulate('mousedown');
    expect(component.find('.dropdown').hasClass('expand')).toBe(false);

    component.find('button').simulate('click');
    component.setState({ activeItemIndex: 1 });
    component.find('.selected').simulate('click');

    component.find('button').simulate('click');
    component.setProps({ highlight: undefined, onChange: undefined });
    component.find('.selected').simulate('click');

    const instance = component.instance();
    expect(instance.navigateByKeys({ keyCode: 9 })).toBe(undefined);
    instance.state.activeItemIndex = 1;
    instance.state.isExpanded = true;
    instance.navigateByKeys({ keyCode: 38, preventDefault: () => { } });
    expect(instance.state.activeItemIndex).toBe(0);
    instance.state.activeItemIndex = 0;
    instance.state.isExpanded = false;
    instance.navigateByKeys({ keyCode: 38, preventDefault: () => { } });
    expect(instance.state.activeItemIndex).toBe(0);
    expect(instance.state.isExpanded).toBeTruthy();

    instance.state.activeItemIndex = 0;
    instance.navigateByKeys({ keyCode: 40, preventDefault: () => { } });
    expect(instance.state.activeItemIndex).toBe(1);

    instance.state.activeItemIndex = 1;
    instance.state.isExpanded = false;
    instance.navigateByKeys({ keyCode: 40, preventDefault: () => { } });
    expect(instance.state.activeItemIndex).toBe(1);
    expect(instance.state.isExpanded).toBeTruthy();

    instance.state.activeItemIndex = 4;
    instance.navigateByKeys({ keyCode: 40, preventDefault: () => { } });

    instance.navigateByKeys({ keyCode: 13, preventDefault: () => { } });
    instance.state.isExpanded = false;
    instance.navigateByKeys({ keyCode: 13, preventDefault: () => { } });
    expect(instance.state.isExpanded).toBe(true);


    instance.navigateByKeys({ keyCode: 27, preventDefault: () => { } });
    instance.state.isExpanded = true;
    instance.navigateByKeys({ keyCode: 32, preventDefault: () => { } });
    instance.state.isExpanded = false;
    instance.navigateByKeys({ keyCode: 32, preventDefault: () => { } });

    instance.navigateByKeys({ keyCode: 0, preventDefault: () => { } });
    instance.giveFocus({ e: { target: 'test' } });

    const ulDom = component.find('ul');
    ulDom.simulate('blur');
    component.setState({ isExpanded: false });
    ulDom.simulate('blur');
    jest.runAllTimers(100);
    ulDom.simulate('focus');
    ulDom.simulate('mousedown');
  });

  it('dropdown filter equal to and highlight not null  should works fine', () => {
    jest.useFakeTimers();
    component = setup({
      ...initProps,
      highlight: 200,
      preIcon: 'test',
      isMoreButton: true,
      onChange: jest.fn,
      filter: true
    });

    component.find('input').simulate('change');

    const instance = component.instance();
    instance.state.keyWords = 'UP';
    instance.state.keyboardValue = 'UP';
    instance.filterFromKeyboard();

    instance.state.keyWords = 'DO';
    instance.state.keyboardValue = 'DO';
    instance.getIndex('DO');

    instance.handleKeys({ keyCode: 99, stopPropagation: () => {} });
    instance.handleKeys({ keyCode: 38, stopPropagation: () => {} });
    instance.handleKeys({ keyCode: 13, stopPropagation: () => { } });

    instance.filterData('d', { filter: callback => callback({ text: 'dest text' }) });
    instance.filterData('dd', { filter: callback => callback({ text: 'dest text' }) });
    instance.filterData('c', { filter: callback => callback({ text: 'dest text' }) });
  });

  it('render customer footer correctly', () => {
    component = setup({
      ...initProps,
      maxHeight: 200,
      data: [
        { id: 3, selected: true, text: 'aliqua aute', value: 3 },
        { id: 7, selected: false, text: '1res1', value: 7 },
        { id: 1,
          selected: false,
          text: '11nulla',
          value: 1,
          disabled: true
        }
      ],
      renderFooter: () => <div className="custom-footer">test</div>,
      renderItem: item => (
        <div className="sub">
          <a>{item.value}</a>
          <a>sub lines</a>
        </div>
      )
    });

    const instance = component.instance();
    expect(component.find('.custom-footer').length).toBe(1);
    expect(component.find('li.disabled').length).toBe(1);
    expect(component.find('div.sub').length).toBe(3);

    component.setState({ isExpanded: true });
    expect(component.find('.custom-footer').length).toBe(1);
    expect(component.find('li.disabled').length).toBe(1);
    expect(component.find('div.sub').length).toBe(3);
    component.find('.dropdown').simulate('blur');
    jest.runAllTimers();
    expect(instance.state.isExpanded).toBe(false);
  });
});
