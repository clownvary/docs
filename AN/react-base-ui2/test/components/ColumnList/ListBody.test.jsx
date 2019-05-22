import React from 'react';
import { shallow } from 'enzyme';

import ListBody from 'src/components/ColumnList/ListBody';
import ListItem from 'src/components/ColumnList/ListItem';

jest.mock('src/components/ColumnList/ListItem', () => 'ListItem');
jest.mock('lodash/throttle', () => jest.fn(method => method));

describe('components/ColumnList/ListBody', () => {
  it('ListBody component renders fine', () => {
    const props = {
      keyField: 'id',
      showCheckAll: true,
      data: [{ id: '123' }],
      onItemFocus: jest.fn(),
      onCheckAllChange: jest.fn()
    };
    const component = shallow(<ListBody {...props} />);

    const items = component.find(ListItem);
    expect(items).toHaveLength(2);

    const checkAllItem = items.at(0);
    checkAllItem.simulate('click');
    expect(props.onCheckAllChange).toHaveBeenCalled();

    checkAllItem.simulate('focus');
    expect(props.onItemFocus).toHaveBeenCalled();
  });

  it('ListBody component renders fine with onEndReached', () => {
    const props = {
      keyField: 'id',
      showCheckAll: true,
      data: [{ id: '123' }],
      onItemFocus: jest.fn(),
      onCheckAllChange: jest.fn(),
      onEndReached: jest.fn()
    };
    const component = shallow(<ListBody {...props} />);
    const instance = component.instance();
    const body = document.createElement('div');
    instance.body = body;

    instance.componentDidMount();
    body.onscroll();
    expect(props.onEndReached).toHaveBeenCalled();

    const onEndReachedNew = jest.fn();
    component.setProps({ onEndReached: onEndReachedNew });
    instance.body = body;
    body.onscroll();
    expect(onEndReachedNew).toHaveBeenCalled();

    component.setProps({ onEndReached: null });
    expect(body.onscroll).not.toBeNull();
  });
});
