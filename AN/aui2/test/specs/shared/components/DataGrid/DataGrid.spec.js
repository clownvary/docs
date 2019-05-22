import React from 'react';
import { fromJS } from 'immutable';
import { mount } from 'enzyme';
import Pagination from 'shared/components/Pagination';
import DataGrid from 'shared/components/DataGrid';

const setup = initProps => mount(<DataGrid {...initProps} />);

const data = [
  {
    site_name: 'ut magna',
    status_id: 1,
    customer_name: 'Raheem Schamberger',
    permit_number: -5407107,
    event_number: 3,
    permit_start_date: '2015-09-20T21:52:17.009Z',
    booking_number: 1,
    event_name: 'Velma Weissnat Sr.',
    invoice_total: 144.23,
    permit_end_date: '2099-07-30T17:29:04.282Z',
    permit_status: 'Completed',
    outstanding_balance: 0,
    fetched: 'NOT_FETCHED',
    permit_id: 69
  },
  {
    site_name: 'exercitation laboris sed pariatur',
    status_id: 3,
    customer_name: 'Nia Ondricka II',
    permit_number: -18090502,
    event_number: 0,
    permit_start_date: '2016-01-06T15:24:31.884Z',
    booking_number: 0,
    event_name: 'Steve Bechtelar',
    invoice_total: 120,
    permit_end_date: '2114-02-07T02:11:12.127Z',
    permit_status: 'Cancelled',
    outstanding_balance: 0,
    fetched: 'NOT_FETCHED',
    permit_id: 77
  }
];

const selectedPermit = {
  site_name: 'Lorem dolor',
  status_id: 3,
  customer_name: 'Geo Bernhard',
  permit_number: -96074854,
  event_number: 8,
  permit_start_date: '2015-08-17T20:11:44.112Z',
  booking_number: 2,
  event_name: 'Kristina O\'Reilly',
  invoice_total: 372.76,
  permit_end_date: '2052-02-03T04:56:29.858Z',
  permit_status: 'Waiting Decision',
  outstanding_balance: 196.96,
  fetched: 'NOT_FETCHED',
  permit_id: 57
};

const columns = [{
  cellClassName: 'afx-xl-1-11 grid-status-checkbox-column'
}, {
  name: 'customer_name',
  value: 'testOrderBy',
  hasSortBar: true,
  title: 'CUSTOMER',
  cellClassName: 'afx-xl-2-11 ',
  render: () => <h1>test</h1>
}, {
  name: 'event_name',
  value: 'eventname',
  title: 'EVENT NAME',
  hasSortBar: true,
  renderHeader: () => <h1>test</h1>
}
];

const sort = { orderOption: '', orderBy: '' };

const pagination = { total: 1, current: 1, around: 1, edgeCount: 2 };

describe('shared -> components -> DataGrid', () => {
  const props = {
    data: fromJS(data),
    selectedPermit,
    columns,
    emptyDataMessage: '',
    sortOrder: fromJS(sort),
    pagination: fromJS(pagination),
    bodyStyle: { maxHeight: 180 },
    OnClick: jest.fn(),
    onSelect: jest.fn(),
    onMouseEnter: jest.fn(),
    onMouseLeave: jest.fn(),
    onChange: jest.fn()
  };


  test('DataGrid should render correctly', () => {
    const component = setup(props);

    component.setProps({
      ...props,
      bodyStyle: { maxHeight: 80 }
    });

    expect(component.find('.aaui-table')).toHaveLength(1);
    expect(component.find('.aaui-table-body')).toHaveLength(1);
    expect(component.find('.aaui-table-cell')).toHaveLength(4);
  });

  test('DataGrid columns is immutable and data equal to should render correctly', () => {
    const nextProps = {
      ...props,
      data: fromJS([]),
      columns: fromJS(columns),
      bodyStyle: {},
      pagination: ''
    };
    const component = setup(nextProps);

    expect(component.find('.aaui-table-row-empty')).toHaveLength(1);
  });

  test('DataGrid sortOrder should without errors', () => {
    const nextProps = {
      ...props,
      sticky: { topOffset: 50, stickyStyle: { zIndex: 1 } },
      sortOrder: fromJS({ orderOption: 'desc', orderBy: 'testOrderBy' })
    };
    const component = setup(nextProps);
    component.find('.aaui-table-row').at(0).simulate('click');
    expect(props.OnClick).toHaveBeenCalled();

    component.find('.aaui-table-header-cell .aaui-flexbox').at(0).simulate('click');

    component.setProps({
      ...nextProps,
      bodyStyle: { maxHeight: 80 },
      sortOrder: fromJS({ orderOption: 'asc', orderBy: 'testOrderBy' })
    });

    const e = { target: { checked: 'value' } };
    const item = fromJS(data[0]);

    component.node.onSelectItem({ target: { checked: '' } }, item);
    expect(props.onSelect).toHaveBeenCalled();

    component.node.onSelectItem(e, item);
    expect(props.onSelect).toHaveBeenCalled();

    component.node.onMouseEnter();
    expect(props.onMouseEnter).toHaveBeenCalled();

    component.node.onMouseLeave();
    expect(props.onMouseEnter).toHaveBeenCalled();

    component.find(Pagination).node.props.onChangePage({ value: 1 });
    expect(props.onChange).toHaveBeenCalled();
  });
});
