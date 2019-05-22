import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';

import ListFooter from 'src/components/ColumnList/ListFooter';
import { SortOrder } from 'src/consts';

describe('components/ColumnList/ListFooter', () => {
  it('ListFooter renders fine when it\'s loading', () => {
    const props = {
      isLoading: true,
      showMessage: 'I\'m loading...'
    };

    const snapshot = renderer.create(
      <ListFooter {...props} />
    ).toJSON();
    expect(snapshot).toMatchSnapshot();
  });

  it('ListFooter renders fine when show sorter', () => {
    const props = {
      showSorter: true,
      onSort: () => {
      }
    };

    const snapshot = renderer.create(
      <ListFooter {...props} />
    ).toJSON();
    expect(snapshot).toMatchSnapshot();
  });

  it('ListFooter renders fine when show clear and count', () => {
    const props = {
      showCount: true,
      showClear: true,
      count: 5
    };

    const snapshot = renderer.create(
      <ListFooter {...props} />
    ).toJSON();
    expect(snapshot).toMatchSnapshot();
  });

  it('ListFooter component works fine when click sorter', () => {
    const props = {
      showSorter: true,
      onSort: jest.fn()
    };

    const component = shallow(<ListFooter {...props} />);
    expect(component.find('i.sorter.icon-sort')).toHaveLength(1);

    component.find('i.sorter').simulate('click');
    expect(props.onSort).toHaveBeenCalledTimes(1);
    expect(props.onSort).toHaveBeenLastCalledWith(SortOrder.DESC);

    component.setProps({ sortOrder: SortOrder.DESC });
    component.find('i.sorter').simulate('click');
    expect(props.onSort).toHaveBeenCalledTimes(2);
    expect(props.onSort).toHaveBeenLastCalledWith(SortOrder.ASC);

    component.setProps({ sortOrder: SortOrder.ASC });
    component.find('i.sorter').simulate('click');
    expect(props.onSort).toHaveBeenCalledTimes(3);
    expect(props.onSort).toHaveBeenLastCalledWith(SortOrder.ORIGIN);

    component.setProps({ disabled: true });
    component.find('i.sorter').simulate('click');
    expect(props.onSort).toHaveBeenCalledTimes(3);

    component.setProps({ disabled: false, sortOrder: 'UNKNOWN_SORT' });
    expect(component.find('i.sorter')).toHaveLength(0);
  });
});
