import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';

import ListItem from 'src/components/ColumnList/ListItem';

describe('components/ColumnList/ListItem', () => {
  it('ListItem renders fine', () => {
    const columnRender = value => (<div key={value}>{value}</div>)
    const props = {
      item: {
        id: '1234',
        name: 'question-1'
      },
      index: 0,
      columns: [
        { field: 'id', className: 'item-id', type: 'text', render: columnRender },
        { field: 'name', className: 'item-name', type: 'text', render: columnRender }
      ],
      showTips: true,
      focused: true,
      selected: true,
      disabled: true
    };

    const snapshot = renderer.create(
      <ListItem {...props} />
    ).toJSON();
    expect(snapshot).toMatchSnapshot();
  });

  it('ListItem component renders fine', () => {
    const props = {
      item: {
        id: '7712',
        name: 'answer-1',
        value: 'YES'
      },
      columns: [
        { field: 'id', type: 'text' },
        { field: 'name', type: 'text' },
        { field: 'value', type: 'text' }
      ],
      onRender: jest.fn(),
      onFocus: jest.fn(),
      onClick: jest.fn()
    };

    const component = shallow(<ListItem {...props} />);
    expect(props.onRender).toHaveBeenCalled();

    const li = component.find('li');
    expect(li).toBeTruthy();

    li.simulate('focus');
    expect(props.onFocus).toHaveBeenCalled();

    li.simulate('click');
    expect(props.onClick).toHaveBeenCalled();
  });
});
