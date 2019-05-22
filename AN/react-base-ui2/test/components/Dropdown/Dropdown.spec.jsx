import React from 'react';
import { mount } from 'enzyme';
import { fromJS } from 'immutable';
import Dropdown from 'src/components/Dropdown';

jest.mock('lodash/debounce', () => jest.fn(fn => fn));

const initData = [
  { id: 3, name: 'aliqua aute', selected: false, text: 'aliqua aute', value: 3 },
  { id: 7, name: '1res1', selected: false, text: '1res1', value: 7 },
  { id: 1, name: '11nulla', selected: false, text: '11nulla', value: 1 }
];

const initProps = {
  placeholder: 'select',
  data: fromJS([]),
  showCheckbox: true,
  filter: true,
  txtSuffix: 'selected',
  filterPlaceholder: 'Enter keywords to search...',
  showDeselectall: true,
  showTextTip: true,
  onChange: jest.fn(),
  onMenuHide: jest.fn(),
  itemTemplate: jest.fn(),
  errorInfo: 'error message',
  showAllCheckbox: true,
  vaule: [3]
};

const nextPropsData = [
  { id: 3, name: 'aliqua aute', selected: false, text: 'aliqua aute', value: 3 },
  { id: 7, name: 'nulla', selected: false, text: 'nulla', value: 7 },
  { id: 1, name: 'res1', selected: false, text: 'res1', value: 1 },
  { id: 2, name: 'res2', selected: false, text: 'res2', value: 2 }
];

const filterResultData = [
  { id: 3, name: 'aliqua aute', selected: false, text: 'aliqua aute', value: 3 }
];

function setup(props = {}) {
  const component = mount(<Dropdown {...props} />);

  return component;
}

describe('shared => components => Dropdown(render)', () => {
  let component;
  let clock;

  beforeEach(() => {
    clock = jest.useFakeTimers();
  });
  afterEach(() => {
    clock.clearAllTimers();
    component.unmount();
  });

  it('When showCheckbox equal false Dropdown should works fine', () => {
    const props = {
      data: [],
      showCheckbox: false,
      filter: true,
      showTextTip: false,
      filterKeyDown: jest.fn(),
      onChange: jest.fn(),
      errorInfo: 'error message'
    };

    component = setup(props);
    component.setProps({ data: fromJS(initData) });
    expect(component.find('.aaui-dropdown')).toHaveLength(1);
    expect(component.find('button')).toHaveLength(1);
    expect(component.find('.icon-chevron-down')).toHaveLength(1);
    expect(component.find('.aaui-dropdown__menu-wrapper').hasClass('u-hidden')).toBe(true);
    expect(component.find('ul')).toHaveLength(1);
    expect(component.find('li')).toHaveLength(3);
    expect(component.find('.aaui-dropdown__menu-footer').text()).toBe(' Loading...');
    expect(component.state('isExpanded')).toBe(false);
    component.find('button').simulate('click');
    const li = component.find('li');
    li.at(0).simulate('click');
    expect(component.state('value')).toBe(3);
    expect(props.onChange).toHaveBeenCalled();

    const filterInput = component.find('.aaui-dropdown__filter-input');
    expect(filterInput).toHaveLength(1);
    filterInput.simulate('input', { target: { value: 'aliqua' } });
    expect(component.state().showClearFilterIcon).toBe(true);
    expect(component.state().dataView.toJS()).toEqual(filterResultData);

    filterInput.simulate('keyDown', { keyCode: 38 });
    expect(props.filterKeyDown).toHaveBeenCalled();
  });

  it('When showCheckbox equal to false and operation click event Dropdown should works fine', () => {
    const props = {
      data: initData,
      showCheckbox: false,
      filter: false,
      showTextTip: true,
      onChange: jest.fn(),
      errorInfo: 'error message'
    };
    component = setup(props);

    const li = component.find('li');
    li.at(0).simulate('click');
    expect(component.state('value')).toBe(3);
    expect(props.onChange).toHaveBeenCalled();
    component.setProps({ defaultValue: 1 });
    expect(component.state('value')).toBe(3);
  });

  it('When showCheckbox equal to true and pressed the blank key (keyCode=49) Dropdown should works fine', () => {
    component = setup(initProps);
    component.setProps({ data: initData });

    component.find('.aaui-dropdown').simulate('keyPress', { keyCode: 49 });
    expect(component.state().activeItemIndex).toBe(1);
    expect(component.state().keyWords).toBe('1');
    expect(initProps.itemTemplate).toHaveBeenCalled();
  });

  it('component get, set value method should works fine', () => {
    component = setup(initProps);
    component.setProps({ data: initData });

    component.instance().value = [3];
    expect(component.state().value).toEqual([3]);
    expect(component.instance().value).toEqual([3]);
    expect(initProps.itemTemplate).toHaveBeenCalled();
    component.setProps({ value: [4] });
    component.instance().value = [5];
    expect(component.instance().value).toEqual([4]);
  });

  it('When showCheckbox equal to true and pressed the blank key (keyCode=9) Dropdown should works fine', () => {
    component = setup(initProps);
    component.setProps({ data: initData });

    component.find('.aaui-dropdown').simulate('keyDown', { keyCode: 9 });
    expect(component.state().isExpanded).toBe(false);
    expect(initProps.itemTemplate).toHaveBeenCalled();
  });

  it('When showCheckbox equal to true and disabled Dropdown should works fine', () => {
    component = setup(initProps);
    component.setProps({ data: initData, disabled: true });

    const Dropbutton = component.find('button');
    expect(Dropbutton.hasClass('is-disabled')).toBe(true);
  });

  it('When showCheckbox equal to true and filterInput equal to true Dropdown should works fine', () => {
    component = setup(initProps);
    const nextprops = {
      data: fromJS(initData),
      value: [3, 1],
      filterKeyDown: jest.fn(),
      onClearFilter: jest.fn()
    };

    component.setProps(nextprops);

    const filterInput = component.find('.aaui-dropdown__filter-input');
    expect(filterInput).toHaveLength(1);
    filterInput.simulate('input', { target: { value: 'aliqua' } });
    expect(component.state().showClearFilterIcon).toBe(true);
    expect(component.state().checkAll).toBe(false);
    expect(component.state().dataView.toJS()).toEqual(filterResultData);
    filterInput.simulate('focus', { target: { value: 'aliqua' } });
    expect(component.state().activeItemIndex).toBe(-1);

    filterInput.simulate('keyDown', { keyCode: 13 });
    expect(nextprops.filterKeyDown).toHaveBeenCalled();


    const iconRemove = component.find('.icon-close');
    expect(iconRemove).toHaveLength(1);
    iconRemove.simulate('click');
    expect(nextprops.onClearFilter).toHaveBeenCalled();
    expect(component.state().showClearFilterIcon).toBe(false);
    expect(component.state().checkAll).toBe(false);
    expect(component.state().dataView.toJS()).toEqual(initData);
    expect(component.state().value).toEqual([3, 1]);
    expect(component.state().rowState).toEqual({ 1: true, 3: true, 7: false });

    expect(initProps.itemTemplate).toHaveBeenCalled();
  });

  it('When filterInput equal to true and fuzzyQuery equal to true Dropdown should works fine', () => {
    component = setup(initProps);
    const nextprops = {
      data: fromJS(initData),
      value: [3, 1],
      filterKeyDown: jest.fn(),
      onClearFilter: jest.fn(),
      fuzzyQuery: true
    };

    component.setProps(nextprops);

    const filterInput = component.find('.aaui-dropdown__filter-input');
    expect(filterInput).toHaveLength(1);
    filterInput.simulate('input', { target: { value: 'aliqu' } });
    expect(component.state().showClearFilterIcon).toBe(true);
    expect(component.state().checkAll).toBe(false);
    expect(component.state().dataView.toJS()).toEqual(filterResultData);
    const iconRemove = component.find('.icon-close');
    expect(iconRemove).toHaveLength(1);
    iconRemove.simulate('click');
    expect(nextprops.onClearFilter).toHaveBeenCalled();
    expect(component.state().showClearFilterIcon).toBe(false);
    expect(component.state().checkAll).toBe(false);
    expect(component.state().dataView.toJS()).toEqual(initData);
    expect(component.state().value).toEqual([3, 1]);
    expect(component.state().rowState).toEqual({ 1: true, 3: true, 7: false });

    expect(initProps.itemTemplate).toHaveBeenCalled();
  });

  it('When pressed the blank key (.aaui-dropdown, .aaui-dropdown__filter-input, .button) Dropdown should works fine', () => {
    const props = {
      placeholder: 'select',
      data: [],
      showCheckbox: true,
      filter: true,
      txtSuffix: 'selected',
      filterPlaceholder: 'Enter keywords to search...',
      showDeselectall: true,
      isFetchData: true,
      showTextTip: true,
      onChange: jest.fn(),
      filterKeyDown: jest.fn(),
      onMenuHide: jest.fn(),
      itemTemplate: jest.fn(),
      errorInfo: 'error message',
      showAllCheckbox: true,
      value: []
    };
    component = setup(props);

    component.setState({ isExpanded: true, value: [7], dataView: fromJS(initData), activeItemIndex: -1 });
    component.find('button').simulate('click');
    expect(component.state().isExpanded).toBe(false);

    component.setState({ isExpanded: true, dataView: fromJS(initData) });
    component.find('.aaui-dropdown').simulate('keyDown', { keyCode: 32 });
    expect(component.find('.aaui-dropdown__menu-wrapper').hasClass('u-hidden')).toBe(false);

    const filterInput = component.find('.aaui-dropdown__filter-input');
    expect(filterInput).toHaveLength(1);
    filterInput.simulate('keyDown');
    expect(props.filterKeyDown).toHaveBeenCalled();

    component.find('button').simulate('keyDown', { keyCode: 27 });
    expect(component.state().isExpanded).toBe(false);
  });

  it('When the aaui-dropdown element blur Dropdown should works fine', () => {
    component = setup(initProps);
    const nextprops = {
      data: initData,
      value: [3, 1],
      filterKeyDown: jest.fn(),
      onClearFilter: jest.fn(),
      fuzzyQuery: true
    };

    component.setProps(nextprops);

    component.find('button').simulate('click');
    component.setState({ value: [7], dataView: initData });
    expect(component.state().value).toEqual([7]);
    expect(component.state().isExpanded).toBe(true);

    component.find('.aaui-dropdown').simulate('keyPress', { keyCode: 50 });
    expect(component.state().activeItemIndex).toBe(-1);
    expect(component.state().keyWords).toBe('');

    component.find('.aaui-dropdown__menu-wrapper').simulate('blur');
    clock.runTimersToTime(200);
    expect(component.state().isExpanded).toBe(false);

    expect(initProps.itemTemplate).toHaveBeenCalled();
  });

  it('nextprops.data greater than this.props.data Dropdown should works fine', () => {
    component = setup(initProps);
    const nextprops = {
      data: fromJS(initData),
      value: [3, 1],
      isFetchData: false
    };

    component.setProps(nextprops);

    component.find('button').simulate('click');
    component.setProps({ data: fromJS(nextPropsData) });
    expect(component.state().dataView.toJS()).toEqual(nextPropsData);

    component.setState({ isExpanded: false });
    component.find('button').simulate('keyDown', { keyCode: 32 });
    expect(component.state().isExpanded).toBe(true);
  });

  it('pressed the blank key (keyCode=13, .aaui-dropdown) Dropdown should works fine', () => {
    component = setup(initProps);
    const nextprops = {
      data: fromJS(nextPropsData),
      value: [],
      isFetchData: false
    };

    component.setProps(nextprops);

    expect(component.state().dataView.toJS()).toEqual(nextPropsData);
    component.find('button').simulate('click');
    component.find('.aaui-dropdown').simulate('keyDown', { keyCode: 13 });
    expect(component.state().isExpanded).toBe(false);
    expect(initProps.onMenuHide).toHaveBeenCalled();
  });

  it('showAllcheckbox equal to true Dropdown should be correctly', () => {
    const props = {
      placeholder: 'select',
      data: fromJS([]),
      showCheckbox: true,
      showAllCheckbox: true,
      filter: false,
      txtSuffix: 'selected',
      filterPlaceholder: 'Enter keywords to search...',
      showDeselectall: true,
      isFetchData: true,
      showTextTip: true,
      onChange: jest.fn(),
      onMenuHide: jest.fn(),
      value: []
    };
    component = setup(props);

    component.setProps({ data: fromJS(initData), selectedFilteredItems: fromJS([1, 3]) });
    component.find('button').simulate('click');
    const firstli = component.find('li');
    const checkboxALL = firstli.first().find('input');
    const clearButton = component.find('.deSelectAll');
    expect(firstli.first().text()).toBe(' All ');
    checkboxALL.simulate('change');
    expect(component.state().value).toEqual([3, 7, 1]);
    expect(component.state().rowState).toEqual({ 1: true, 3: true, 7: true });
    expect(component.state().checkAll).toEqual(true);
    expect(props.onChange).toHaveBeenCalled();

    clearButton.simulate('click');
    expect(props.onChange).toHaveBeenCalled();
    expect(component.state().rowState).toEqual({ 1: false, 3: false, 7: true });

    component.unmount();
    component = setup(props);

    component.setProps({ data: fromJS(initData), value: [1] });
    const clearButtonTwo = component.find('.deSelectAll');
    clearButtonTwo.simulate('click');
    expect(component.state().rowState).toEqual({ 1: false, 3: false, 7: false });
  });

  it('When flexibleMenu is true, the Dropdown works fine', () => {
    const props = { ...initProps, data: initData, flexibleMenu: true };
    component = setup(props);

    const menu = component.find('ul');
    expect(menu).toHaveLength(1);

    component.simulate('click');
    component.setState({ isExpanded: true });
    expect(component.find('.aaui-dropdown__menu-wrapper.u-hidden')).toHaveLength(0);
    expect(menu.props().style).toHaveProperty('width');
  });

  it('when props.value not null and showAllcheckbox equal to true Dropdown should be correctly', () => {
    const props = {
      placeholder: 'select',
      data: fromJS(initData),
      showCheckbox: true,
      showAllCheckbox: true,
      filter: true,
      txtSuffix: 'selected',
      filterPlaceholder: 'Enter keywords to search...',
      showDeselectall: true,
      isFetchData: true,
      showTextTip: true,
      onChange: jest.fn(),
      onMenuHide: jest.fn(),
      itemTemplate: jest.fn(),
      value: [3, 9, 5, 6, 7]
    };
    component = setup(props);

    component.find('button').simulate('click');
    const firstli = component.find('li');
    const checkboxALL = firstli.first().find('input');
    checkboxALL.simulate('change');
    expect(component.state().value).toEqual([3, 7, 9, 5, 6, 1]);
    expect(component.state().rowState).toEqual({ 1: true, 3: true, 7: true });
    expect(component.state().checkAll).toBe(true);
    expect(props.onChange).toHaveBeenCalled();

    component.setProps({ data: fromJS(nextPropsData) });
    expect(component.state().dataView.toJS()).toEqual(nextPropsData);
  });

  it('aaui-dropdown__menu-wrapper state.dataView is greater than props.data Dropdown should works fine', () => {
    const props = {
      placeholder: 'select',
      data: fromJS(initData),
      showCheckbox: true,
      showAllCheckbox: true,
      filter: true,
      txtSuffix: 'selected',
      filterPlaceholder: 'Enter keywords to search...',
      showDeselectall: true,
      isFetchData: true,
      showTextTip: true,
      onChange: jest.fn(),
      onMenuHide: jest.fn(),
      itemTemplate: jest.fn(),
      value: [3]
    };
    component = setup(props);

    component.find('button').simulate('click');
    component.setState({ dataView: fromJS(nextPropsData) });

    const firstli = component.find('li');
    const checkboxALL = firstli.first().find('input');
    checkboxALL.simulate('change');
    expect(component.state().value).toEqual([3, 7, 1, 2]);
    expect(component.state().rowState).toEqual({ 1: true, 2: true, 3: true, 7: true });
    expect(component.state().checkAll).toBe(true);
    expect(props.onChange).toHaveBeenCalled();
  });

  it('ajaxLoading is true ulMenu onscoll event should works fine', () => {
    component = setup(initProps);
    const nextprops = {
      data: fromJS(initData),
      deselectAll: true,
      value: [3, 1],
      isFetchData: true,
      ajaxLoading: jest.fn()
    };

    component.setProps(nextprops);

    component.find('button').simulate('click');
    $(component.node.dropdownMenu).scroll();
    expect(nextprops.ajaxLoading).toHaveBeenCalled();

    component.setProps({ data: [] });
    component.setState({ isExpanded: false, rowState: { 7: true, 8: true } });
    component.find('button').simulate('click');
    expect(component.state().rowState).toEqual({ 1: true, 3: true, 7: false, 8: false });
  });

  it('When showCheckbox equal to true with serverFilter Dropdown should works fine', () => {
    jest.useFakeTimers();

    const serverFilterHandler = jest.fn();
    const ajaxLoading = jest.fn();
    const props = Object.assign({}, initProps, {
      data: fromJS(initData),
      value: [3, 1],
      serverFilter: true,
      isFetchData: false,
      serverFilterHandler,
      ajaxLoading
    });
    component = setup(props);
    const instance = component.instance();

    expect(instance.state.serverFilterLoading).toBeFalsy();
    expect(instance.serverFilterKeyword).toEqual('');

    component.find('button').simulate('click');
    const filterInput = component.find('input.aaui-dropdown__filter-input');
    filterInput.node.value = 'keyword';
    filterInput.simulate('input');

    jest.runAllTimers();
    expect(instance.state.serverFilterLoading).toBeTruthy();
    expect(serverFilterHandler).toBeCalledWith('keyword');

    component.setProps({ serverFilterTimestamp: 1510291923674 });
    expect(instance.state.serverFilterLoading).toBeFalsy();

    $(component.node.dropdownMenu).scroll();
    expect(ajaxLoading).toBeCalled();

    component.setProps({ isFetchData: true });
    expect(filterInput.node.value).toEqual('');

    instance.serverFilterKeyword = 1;
    instance.applyFilter({ target: { value: 1 } });

    jest.clearAllTimers();
  });
});

describe('shared -> components -> Dropdown', () => {
  const App = React.createClass({
    render() {
      const data = [
          { text: 'Canada', value: 'can' },
          { text: 'China', value: 'chs' },
          { text: 'Japan', value: 'jap' },
          { text: 'United States of America', value: 'usa' }];
      return (
        <Dropdown data={data} />
      );
    }
  });

  let wrapper;

  beforeEach(() => {
    wrapper = mount(<App />);
  });

  it('Should show dropdown menu after pressed the blank key (keyCode=32)', () => {
    expect(wrapper.find('.aaui-dropdown__menu-wrapper').hasClass('u-hidden')).toBe(true);
    wrapper.find('button').simulate('keyDown', { keyCode: 32 });
    expect(wrapper.find('.aaui-dropdown__menu-wrapper').hasClass('u-hidden')).toBe(false);
  });

  it('Should show dropdown menu after pressed the Up key (keyCode=38)', () => {
    expect(wrapper.find('.aaui-dropdown__menu-wrapper').hasClass('u-hidden')).toBe(true);
    wrapper.find('button').simulate('keyDown', { keyCode: 38 });
    expect(wrapper.find('.aaui-dropdown__menu-wrapper').hasClass('u-hidden')).toBe(false);
  });

  it('Should show dropdown menu after pressed the Down key (keyCode=40)', () => {
    expect(wrapper.find('.aaui-dropdown__menu-wrapper').hasClass('u-hidden')).toBe(true);
    wrapper.find('button').simulate('keyDown', { keyCode: 40 });
    expect(wrapper.find('.aaui-dropdown__menu-wrapper').hasClass('u-hidden')).toBe(false);
  });

  it('Should hide dropdown menu after pressed the Esc key (keyCode=27)', () => {
    wrapper.find('button').simulate('keyDown', { keyCode: 32 });
    wrapper.find('button').simulate('keyDown', { keyCode: 27 });
    expect(wrapper.find('.aaui-dropdown__menu-wrapper').hasClass('u-hidden')).toBe(true);

    wrapper.find('button').simulate('keyDown', { keyCode: 38 });
    wrapper.find('button').simulate('keyDown', { keyCode: 27 });
    expect(wrapper.find('.aaui-dropdown__menu-wrapper').hasClass('u-hidden')).toBe(true);

    wrapper.find('button').simulate('keyDown', { keyCode: 40 });
    wrapper.find('button').simulate('keyDown', { keyCode: 27 });
    expect(wrapper.find('.aaui-dropdown__menu-wrapper').hasClass('u-hidden')).toBe(true);
  });

  it('Should hide dropdown menu after pressed the Enter key (keyCode=13)', () => {
    wrapper.find('button').simulate('keyDown', { keyCode: 38 });
    wrapper.find('button').simulate('keyDown', { keyCode: 13 });
    expect(wrapper.find('.aaui-dropdown__menu-wrapper').hasClass('u-hidden')).toBe(true);

    wrapper.find('button').simulate('keyDown', { keyCode: 40 });
    wrapper.find('button').simulate('keyDown', { keyCode: 13 });
    expect(wrapper.find('.aaui-dropdown__menu-wrapper').hasClass('u-hidden')).toBe(true);

    wrapper.find('button').simulate('keyDown', { keyCode: 32 });
    wrapper.find('button').simulate('keyDown', { keyCode: 38 });
    wrapper.find('button').simulate('keyDown', { keyCode: 13 });
    expect(wrapper.find('.aaui-dropdown__menu-wrapper').hasClass('u-hidden')).toBe(true);
  });

  it('Should active the first item after pressed the Up key (keyCode=38)', () => {
    wrapper.find('button').simulate('keyDown', { keyCode: 38 });
    expect(wrapper.find('li').last().hasClass('is-active')).toBe(true);
  });

  it('Should active the last item after pressed the Down key (keyCode=40)', () => {
    wrapper.find('button').simulate('keyDown', { keyCode: 40 });
    expect(wrapper.find('li').first().hasClass('is-active')).toBe(true);
  });

  it('Should active the second item after pressed the Down key (keyCode=40) and press Down key again', () => {
    wrapper.find('button').simulate('keyDown', { keyCode: 40 });
    wrapper.find('button').simulate('keyDown', { keyCode: 40 });
    expect(wrapper.find('li').at(1).hasClass('is-active')).toBe(true);
  });

  it('The text of button eaquals the selectd li text after pressed the Down key (keyCode=40) and press Down key again and press the Enter key ', () => {
    wrapper.find('button').simulate('click');
    wrapper.find('button').simulate('keyDown', { keyCode: 40 });
    wrapper.find('button').simulate('keyDown', { keyCode: 40 });
    wrapper.find('button').simulate('keyDown', { keyCode: 13 });
    expect(wrapper.find('button').find('div').first().text().trim()).toBe('China');
  });

  it.skip('Should active the second item after pressed the Down key (keyCode=40) and press J key, then press U key', () => {
    wrapper.find('button').simulate('keyDown', { keyCode: 40 });
    setTimeout(() => {
      wrapper.find('button').simulate('keyDown', { keyCode: 74 }); // Start with J
      expect(wrapper.find('li').at(2).hasClass('is-active')).toBe(true);
      wrapper.find('button').simulate('keyDown', { keyCode: 85 }); // Start with U
      expect(wrapper.find('li').at(3).hasClass('is-active')).toBe(false);
    }, 500);

    setTimeout(() => {
      wrapper.find('button').simulate('keyDown', { keyCode: 85 }); // Start with U
      expect(wrapper.find('li').at(3).hasClass('is-active')).toBe(true);
    }, 500);
  });

  it.skip('Should active the first item after pressed the Down key (keyCode=40) and press E key', () => {
    wrapper.find('button').simulate('keyDown', { keyCode: 40 });
    setTimeout(() => {
      wrapper.find('button').simulate('keyDown', { keyCode: 69 }); // Start with E
      expect(wrapper.find('li').first().hasClass('is-active')).toBe(true); // Still selected the first item
    }, 500);
  });

  it('component onlyDefaultPlaceholder or errorInfo or filter is true should works fine', () => {
    const component = setup({
      onlyDefaultPlaceholder: true,
      showCheckbox: true,
      visible: false,
      menuLocateRight: false
    });

    expect(component.find('.aaui-dropdown__button-text').html()).toEqual('<div class="aaui-dropdown__button-text" title="Select one...">Select one...</div>');
    const buttonDom = component.find('button');
    const instance = component.instance();

    buttonDom.simulate('focus');
    component.setProps({ autoOpen: true });
    buttonDom.simulate('focus');
    instance.ignoreFocus = true;

    buttonDom.simulate('focus');
    buttonDom.simulate('click');
    buttonDom.simulate('mouseup', { button: 0 });
    buttonDom.simulate('mousedown');
    component.setProps({ autoOpen: false });
    buttonDom.simulate('mousedown');
    buttonDom.simulate('mouseup');
    instance.handleKeys({ keyCode: 13, stopPropagation: () => { } });
    instance.state.activeItemIndex = 1;

    expect(instance.handleKeys({ keyCode: 13 })).toEqual(undefined);

    instance.clearKeyboardValue();
    component.setProps({
      visible: true,
      showError: true,
      showResults: true,
      errorInfo: 'dropdown error msg'
    });

    expect(component.find('.dropdown-error')).toHaveLength(1);
    component.setProps({
      visible: true,
      showError: true,
      menuLocateRight: true,
      errorInfo: 'dropdown error msg',
      errorInfoTemplate: () => 'error message'
    });

    expect(component.find('.dropdown-error')).toHaveLength(0);

    component.setProps({
      data: initData,
      showCheckbox: false,
      filter: false,
      showSpiner: true,
      showTextTip: true,
      deleteitemTemplate: () => 'del',
      onChange: jest.fn(),
      errorInfo: 'error message'
    });

    component.setProps({
      data: initData,
      showCheckbox: false,
      filter: false,
      showTextTip: true,
      onChange: jest.fn(),
      errorInfo: 'error message'
    });
  });

  it('component decorate method should works fine', () => {
    const onChange = jest.fn();
    const component = setup({
      showCheckbox: true,
      itemTemplate: (_, a, callback) => {
        callback();
        return 'test';
      },
      onChange,
      deleteitemTemplate: (a, b, callback) => callback()
    });
    const instance = component.instance();
    expect(instance.decorate({ value: 1 })).toEqual('test');
    expect(instance.decorateDeleleTmplate({ value: 1 })).toEqual(undefined);
    instance.filterCheckItems([{ value: 1 }]);
    instance.state.value = undefined;
    instance.filterCheckItems([1]);
    instance.getCheckValue([{ value: 'd' }, '']);
    expect(instance.isAllFilterDataViewChecked([{ value: 1 }])).toEqual(false);
    instance.state.rowState = { 1: 'ds' };
    expect(instance.isAllFilterDataViewChecked([{ value: 1 }])).toEqual(true);
    instance.check('test', 1);
    expect(onChange).toHaveBeenCalled();
    instance.check('test');
    component.setProps({
      onChange: ''
    });
    instance.check('test');
    instance.deSelectAll();
    instance.checkAll();
    component.setProps({
      errorInfo: 'error info',
      value: [2]
    });
    instance.checkAll();
    instance.filterInput = {};
    instance.clearFilter();
    instance.doClientFilter('');
    instance.select({ value: [5] });

    expect(Dropdown.checkValueInDataView(1, [{ value: 1 }])).toEqual(true);
    instance.state.initValue = '';
    instance.state.value = '';
    instance.state.isExpanded = '';
    instance.checkedRowstate();
    instance.isValueChanged();
    instance.tryCollapse();
    instance.giveFocus({ target: 1 });
    const mockDom = {
      focus: () => { }
    };

    instance.menuWrapper = mockDom;
    instance.giveFocus({ target: mockDom });
    component.setProps({
      showCheckbox: false
    });
    instance.isValueChanged();

    instance.navigateByKeys({});
    instance.state.isExpanded = false;
    instance.navigateByKeys({ keyCode: 13, preventDefault: () => { } });
    instance.state.activeItemIndex = -1;
    instance.navigateByKeys({ keyCode: 13, preventDefault: () => { } });

    instance.state.activeItemIndex = 21;
    instance.navigateByKeys({ keyCode: 38, preventDefault: () => { } });

    instance.applyActive({});
    instance.filterInput = mockDom;
    component.setProps({
      filter: true,
      errored: true,
      theme: false
    });
    instance.applyActive({ target: mockDom });
    instance.state.isExpanded = true;
    instance.onMenuHide();

    expect(component.find('.aaui-dropdown__button').hasClass('is-error')).toEqual(true);
  });

  afterEach(() => {
    wrapper = null;
  });
});
