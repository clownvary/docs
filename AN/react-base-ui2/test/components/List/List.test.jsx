import React from 'react';
import { mount } from 'enzyme';
import uniqueId from 'lodash/uniqueId';
import map from 'lodash/map';
import List, { ListType, SelectionMode } from 'src/components/List';
import Header from 'src/components/List/Header';
import Body from 'src/components/List/Body';
import Bottom from 'src/components/List/Bottom';

const singleRowData = map(Array(100), () => {
  const index = uniqueId();
  return ({
    index,
    text: `this is a test ${index}`,
    value: index,
    disabled: index % 10 === 0
  });
});

const defaultConfig = {
  selectionMode: SelectionMode.SINGLE,
  listType: ListType.SINGLE,
  disabled: false,
  showTips: true,
  showIcon: false,
  showCheckAll: false,
  checkable: false,
  sortable: false,
  filterable: false,
  isFuzzy: false,
  asyncable: false,
  icon: 'icon-list',
  maxHeight: '150px',
  WCAG: false,
  rowSeperator: true,
  striped: false,
  allowDeselect: true
};

const defaultProps = {
  prefix: 'an-',
  data: singleRowData,
  config: defaultConfig,
  onChange: jest.fn(),
  selectedIndex: []
};

const setup = (props = {}) => {
  const newProps = { ...defaultProps, ...props };
  const wrapper = mount(<List {...newProps} />);
  const { prefix } = newProps;

  return {
    list: wrapper,
    header: wrapper.find(`.${prefix}list__header`),
    body: wrapper.find(`.${prefix}list__body`),
    items: wrapper.find(`.${prefix}list__body-single-row`),
    activeItems: wrapper.find('.focus'),
    selectItems: wrapper.find('.selected'),
    bottom: wrapper.find(`.${prefix}list__bottom`),
    props: newProps
  };
};

describe('components => List', () => {
  let clock;

  beforeEach(() => {
    clock = jest.useFakeTimers();
  });
  afterEach(() => {
    clock.clearAllTimers();
  });

  it('List renders Successfully in default mode', () => {
    const {
      list,
      body,
      items,
      activeItems,
      props
    } = setup();
    expect(list.length).toEqual(1);
    expect(body.length).toEqual(1);

    expect(items.length).toEqual(singleRowData.length);
    expect(activeItems.length).toEqual(0);

    // simulate click the item firstly
    items.first().simulate('click');
    expect(list.find('.selected').length).toEqual(1);
    expect(props.onChange).toHaveBeenCalled();
    // simulate click the item secondly, then the item should be unselected
    items.first().simulate('click');
    expect(list.find('.selected').length).toEqual(0);
    expect(props.onChange).toHaveBeenCalled();
  });

  it('List operate event should works fine', () => {
    List.popup();
    const newConfig = { ...defaultConfig, WCAG: true, asyncable: true };
    const newProps = { ...defaultProps, config: newConfig, onScrollToBottom: jest.fn() };
    const { list } = setup(newProps);
    clock.runTimersToTime(10);
    const instance = list.instance();
    const wrapListDom = list.find('.an-list');
    wrapListDom.simulate('focus');
    expect(instance.state.activeIndex).toEqual(0);

    wrapListDom.simulate('blur');
    wrapListDom.simulate('focus');
    clock.runTimersToTime(10);
    expect(instance.state.activeIndex).toEqual(0);

    wrapListDom.simulate('keydown');
    wrapListDom.simulate('keydown', { keyCode: 38 });
    expect(instance.state.activeIndex).toEqual(98);

    wrapListDom.simulate('keydown', { keyCode: 13 });
    wrapListDom.simulate('keydown', { keyCode: 32 });
    expect(newProps.onChange).toHaveBeenCalled();

    list.find(Header).node.props.onFilter({ filter: 'sd' });
    expect(instance.state.filter).toEqual('sd');
    list.find(Body).node.props.onScrollToBottom();
    expect(newProps.onScrollToBottom).toHaveBeenCalled();

    list.find(Bottom).node.props.onCheckAll(true);
    list.find(Bottom).node.props.onSort(true);
    expect(newProps.onChange).toHaveBeenCalled();
  });

  it('set selectionMode List should works fine', () => {
    List.popup();
    const newConfig = { ...defaultConfig, WCAG: true, asyncable: true, sortable: true };
    const newProps = { ...defaultProps, config: newConfig, onScrollToBottom: jest.fn(), sortField: 'age' };
    const { list } = setup(newProps);
    const instance = list.instance();
    instance.selectedIndex = [];
    expect(instance.state.activeIndex).toEqual(-1);
    instance.selectedIndex = [2];
    expect(instance.state.selectedIndex).toEqual([2]);
    expect(instance.selectedValue).toEqual([{ disabled: false, index: '2', text: 'this is a test 2', value: '2' }]);
    instance.state.config = {
      selectionMode: 'multiple_column'
    };

    list.setProps({
      selectedIndex: [33],
      data: [
        {
          index: 0,
          text: 1,
          value: 1,
          disabled: false
        }
      ] });

    instance.selectedValue = 2;
    expect(instance.state.selectedIndex).toEqual([33]);
    instance.selectedValue = '21';
    expect(instance.state.selectedIndex).toEqual([33]);
    instance.state.config = {
      selectionMode: 'single_column'
    };
    instance.selectedValue = '98';

    instance.appendData([]);
    instance.appendData();
    expect(instance.state.isLoading).toEqual(false);
    expect(instance.findNextActiveIndex()).toEqual(undefined);

    list.setState({ sortOrder: 'age' });
    instance.setData([
      { user: 'fred', age: 48 }
    ]);
    expect(instance.state.dataView).toEqual([{ age: 48, index: 0, user: 'fred' }]);
  });


  it('List onchange method should works fine', () => {
    List.popup();
    const newConfig = {
      ...defaultConfig,
      WCAG: true,
      asyncable: false,
      sortable: true,
      filterable: true,
      selectionMode: 'multiple',
      sorter: jest.fn()
    };
    const newProps = { ...defaultProps, config: newConfig, onScrollToBottom: jest.fn(), sortField: 'age' };
    const { list } = setup(newProps);
    const instance = list.instance();
    instance.onScrollToBottom();

    expect(instance.findNextActiveIndex()).toEqual(undefined);

    list.setState({ sortOrder: undefined });
    instance.setData([
      { text: 'fred', index: 2, age: 48 }
    ]);

    list.setState({ sortOrder: 'desc', filter: true, selectedIndex: [1, 2, 3] });
    instance.setData([
      { text: 'fred', index: 2, age: 48 }
    ]);

    instance.onChange({ item: { index: 2 } });
    expect(instance.state.selectedIndex).toEqual([1, 3]);

    instance.onChange({ item: { index: 112 } });
    expect(instance.state.selectedIndex).toEqual([1, 3, 112]);
  });

  it('List selectionMode equal to "multiple" should works fine', () => {
    List.popup();
    const newConfig = {
      ...defaultConfig,
      WCAG: true,
      asyncable: false,
      sortable: true,
      filterable: true,
      allowDeselect: false,
      selectionMode: 'multiple',
      sorter: jest.fn()
    };
    const newProps = { ...defaultProps, config: newConfig, onScrollToBottom: jest.fn(), sortField: 'age' };
    const { list } = setup(newProps);
    const instance = list.instance();

    list.setState({ sortOrder: 'desc', filter: true, selectedIndex: [1, 2, 3] });
    instance.onChange({ item: { index: 1 } });
    expect(instance.state.selectedIndex).toEqual([1, 2, 3]);
  });

  it('List selectionMode equal to "multiple" should works fine', () => {
    List.popup();
    const newConfig = {
      ...defaultConfig,
      WCAG: true,
      asyncable: false,
      sortable: true,
      filterable: true,
      allowDeselect: false,
      selectionMode: 'other',
      sorter: jest.fn()
    };
    const newProps = { ...defaultProps, config: newConfig, onScrollToBottom: jest.fn(), sortField: 'age', selectedIndex: 1 };
    const { list } = setup(newProps);
    const instance = list.instance();
    list.setState({ sortOrder: 'desc', filter: true, selectedIndex: [1, 2, 3] });
    instance.onChange({ item: { index: 1 } });
    expect(instance.state.selectedIndex).toEqual([]);
  });
});
