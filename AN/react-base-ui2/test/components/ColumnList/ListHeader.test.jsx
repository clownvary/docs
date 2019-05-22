import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';

import ListHeader from 'src/components/ColumnList/ListHeader';
import Input from 'src/components/Input';

jest.mock('lodash/debounce', () => jest.fn(method => method));

describe('components/ColumnList/ListHeader', () => {
  it('ListHeader renders fine', () => {
    const props = {
      disabled: false,
      onFilter: () => {},
      filterPlaceholder: 'input word to filter...'
    };

    const snapshot = renderer.create(
      <ListHeader {...props} />
    ).toJSON();
    expect(snapshot).toMatchSnapshot();
  });

  it('ListHeader component renders fine', () => {
    const onFilter = jest.fn();

    const component = shallow(<ListHeader onFilter={onFilter} />);
    const filterInput = component.find(Input);
    expect(filterInput).toHaveLength(1);

    filterInput.simulate('change', { target: { value: '123' } });
    expect(onFilter).toHaveBeenCalled();
  });
});
