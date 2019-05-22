import React from 'react';
import { mount } from 'enzyme';

import { ColumnList } from 'src/components/ColumnList';
import { ColumnType } from 'src/components/ColumnList/consts';
import { KeyCode, SortOrder, SelectionMode } from 'src/consts';
import ClientSource from 'src/common/data';


jest.mock('src/components/ColumnList/ListItem', () => function ListItem() {
  return <div />;
});
jest.mock('src/components/ColumnList/ListHeader', () => function ListHeader() {
  return <div />;
});
jest.mock('src/components/ColumnList/ListFooter', () => function ListFooter() {
  return <div />;
});
jest.mock('lodash/debounce', () => jest.fn(method => method));

describe('components/ColumnList', () => {
  const dataSource = [
    { text: 'resource 1', checked: false, icon: 'icon-adjust', desc: 'o2', idx: 1 },
    { text: 'resource 2', checked: false, icon: 'icon-adjust', desc: 'o4', idx: 2, disabled: true },
    { text: 'resource 3', checked: false, icon: 'icon-adjust', desc: 'o3', idx: 3 },
    { text: 'resource 4', checked: false, icon: 'icon-adjust', desc: 'o1', idx: 4 },
    { text: 'resource 5', checked: false, icon: 'icon-adjust', desc: 'o6', idx: 5 },
    { text: 'resource 6', checked: false, icon: 'icon-adjust', desc: 'o5', idx: 6 }
  ];

  const columns = [
    { field: 'text', type: ColumnType.TEXT },
    { field: 'checked', type: ColumnType.CHECKBOX },
    { field: 'icon', type: ColumnType.ICON },
    { field: 'desc', type: 'INVALID_COLUMN_TYPE' },
    { field: 'idx', type: 'INVALID_COLUMN_TYPE', onRender: v => v }
  ];

  it('ColumnList component works fine', async () => {
    const onChange = jest.fn();
    const component = await mount(
      <ColumnList
        dataSource={dataSource}
        columns={columns}
        pageMode
        pageSize={5}
        showFilter
        showCheckAll
        onChange={onChange}
      />
    );
    const instance = component.instance();
    expect(instance.state.activeIndex).toEqual(-2);

    const columnList = component.find('div.an-columnlist');
    columnList.simulate('keydown', { target: { tagName: 'INPUT', type: 'text' } });
    expect(instance.state.activeIndex).toEqual(-2);
    columnList.simulate('keydown', { target: {}, which: KeyCode.DOWN });
    expect(instance.state.activeIndex).toEqual(-1);
    columnList.simulate('keydown', { target: {}, which: KeyCode.UP });
    expect(instance.state.activeIndex).toEqual(-1);

    await columnList.simulate('keydown', { target: {}, which: KeyCode.ENTER });
    expect(instance.state.allChecked).toBeTruthy();
    expect(onChange).toHaveBeenCalledTimes(1);

    instance.onItemFocus({}, { index: -1 });
    expect(instance.state.activeIndex).toEqual(-1);
    await columnList.simulate('keydown', { target: {}, which: KeyCode.SPACE });
    expect(instance.state.allChecked).toBeFalsy();
    expect(onChange).toHaveBeenCalledTimes(2);

    await instance.onItemFocus({}, { index: 0 });
    expect(instance.state.activeIndex).toEqual(0);
    columnList.simulate('keydown', { target: {}, which: KeyCode.SPACE });
    expect(instance.state.data[0].checked).toBeTruthy();

    columnList.simulate('keypress', { target: instance.filterInput, which: 112 });
    expect(instance.quickFindValue).toEqual('');

    columnList.simulate('keypress', { which: 114 });
    expect(instance.quickFindValue).toEqual('R');
    expect(instance.state.activeIndex).toEqual(0);

    columnList.simulate('keypress', { which: 104 });
    expect(instance.quickFindValue).toEqual('RH');
    expect(instance.state.activeIndex).toEqual(0);

    columnList.simulate('keyup');
    expect(instance.quickFindValue).toEqual('');

    await instance.onFilter({ keyword: 2 });
    expect(instance.state.data).toHaveLength(1);
    expect(instance.state.data[0].text).toEqual('resource 2');

    const filter = jest.fn((keyword, item) => item.text === keyword);
    component.setProps({ filter });
    await instance.onFilter({ keyword: 3 });
    expect(instance.state.data).toHaveLength(0);
    await instance.onFilter({ keyword: 'resource 3' });
    expect(instance.state.data).toHaveLength(1);
    expect(instance.state.data[0].text).toEqual('resource 3');

    component.setProps({ filter: null });
    instance.onFilter({ keyword: '' });
    await instance.onFilter({ keyword: '' });
    await instance.onLoadMore();
    expect(instance.state.page).toEqual(2);
    expect(instance.state.data).toHaveLength(6);

    await instance.onLoadMore();
    expect(instance.state.page).toEqual(2);
    expect(instance.state.data).toHaveLength(6);

    const prevData = instance.state.data;
    await instance.onItemClick({}, { item: prevData[1], index: 1 });
    expect(instance.state.data).toEqual(prevData);
    await instance.onItemClick(
      {
        target: {
          tagName: 'INPUT',
          getAttribute: t => t === 'type' && 'checkbox'
        }
      }, {
        item: prevData[2],
        index: 2
      });
    expect(instance.state.data).toEqual(prevData);

    await instance.onItemClick({}, { item: instance.state.data[2], index: 2 });
    expect(instance.state.data[2].checked).toBeTruthy();

    await instance.onItemClick({}, { item: instance.state.data[3], index: 3 });
    expect(instance.state.data[2].checked).toBeTruthy();
    expect(instance.state.data[3].checked).toBeTruthy();

    await instance.onItemClick({}, { item: instance.state.data[3], index: 3 });
    expect(instance.state.data[2].checked).toBeTruthy();
    expect(instance.state.data[3].checked).toBeFalsy();

    component.setProps({ sortField: 'desc' });
    await instance.onSort(SortOrder.DESC);
    expect(instance.state.sortOrder).toEqual(SortOrder.DESC);

    await instance.onClear();
    expect(instance.state.data.some(d => d.checked)).toBeFalsy();
  });

  it('ColumnList component works fine in single selection / none-page mode', async () => {
    const dataSourceWithId = dataSource.map(data => Object.assign({}, data, { id: data.idx }));
    const component = await mount(
      <ColumnList
        dataSource={dataSourceWithId}
        columns={columns}
        selectionMode={SelectionMode.SINGLE}
        showSorter
      />
    );
    const instance = component.instance();
    expect(instance.state.activeIndex).toEqual(-1);

    const columnList = component.find('div.an-columnlist');
    await columnList.simulate('keydown', { target: {}, which: KeyCode.ENTER });
    expect(instance.state.activeIndex).toEqual(-1);

    await columnList.simulate('keydown', { target: {}, which: KeyCode.DOWN });
    expect(instance.state.activeIndex).toEqual(0);

    await instance.onItemClick({}, { item: instance.state.data[2], index: 2 });
    expect(instance.state.data[2].checked).toBeTruthy();

    await instance.onItemClick({}, { item: instance.state.data[3], index: 3 });
    expect(instance.state.data[2].checked).toBeFalsy();
    expect(instance.state.data[3].checked).toBeTruthy();

    await instance.onCheckboxChange(
      { target: { checked: true } },
      { value: true },
      {
        item: instance.state.data[3],
        index: 3,
        column: instance.state.columns[1],
        columnIndex: 1
      }
    );
    expect(instance.state.data[3].checked).toBeTruthy();

    await instance.onCheckboxChange(
      { target: { checked: false } },
      { value: false },
      {
        item: instance.state.data[3],
        index: 3,
        column: instance.state.columns[1],
        columnIndex: 1
      }
    );
    expect(instance.state.data[3].checked).toBeFalsy();
    expect(instance.state.activeIndex).toEqual(3);
  });

  it('ColumnList component works fine with different data source', async () => {
    const clientDataSourceComponent = await mount(
      <ColumnList
        dataSource={new ClientSource(dataSource, 'idx')}
        columns={columns}
        selectionMode={SelectionMode.SINGLE}
        showSorter
        disabled
      />
    );
    const clientDataSourceComponentInstance = clientDataSourceComponent.instance();
    expect(clientDataSourceComponent).toBeTruthy();
    expect(clientDataSourceComponentInstance.state.activeIndex).toEqual(-1);
    expect(clientDataSourceComponentInstance.state.data[1]).toBeTruthy();

    await clientDataSourceComponentInstance.onCheckboxChange(
      { target: { checked: false } },
      { value: false },
      {
        item: clientDataSourceComponentInstance.state.data[1],
        index: 1,
        column: clientDataSourceComponentInstance.state.columns[1],
        columnIndex: 1
      }
    );
    expect(clientDataSourceComponentInstance.state.data[1]).toBeTruthy();

    await clientDataSourceComponentInstance.onClear();
    expect(clientDataSourceComponentInstance.state.data[1]).toBeTruthy();

    const invalidDateSourceComponent = await mount(
      <ColumnList
        dataSource={[]}
        columns={columns}
        selectionMode={SelectionMode.SINGLE}
        showSorter
        isLoading
      />
    );
    expect(invalidDateSourceComponent).toBeTruthy();
    expect(invalidDateSourceComponent.instance().state.activeIndex).toEqual(-1);
  });

  it('ColumnList component works fine in it\'s lifecycle', async () => {
    const component = await mount(
      <ColumnList
        dataSource={dataSource}
        columns={columns}
        selectionMode={SelectionMode.MULTIPLE}
        showSorter
      />
    );
    const instance = component.instance();
    expect(component).toBeTruthy();

    await instance.onItemClick({}, { item: instance.state.data[2], index: 2 });
    expect(instance.state.data[2].checked).toBeTruthy();

    await component.setProps({
      defaultSort: '',
      columns: columns.filter((col, idx) => idx <= 2)
    });
    expect(instance.state.data[2].checked).toBeTruthy();
    expect(instance.state.columns).toHaveLength(3);

    await component.setProps({
      selectionMode: SelectionMode.SINGLE
    });

    ColumnList.popup();
  });
});
