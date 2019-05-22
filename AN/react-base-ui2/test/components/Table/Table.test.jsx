import React from 'react';
import { mount } from 'enzyme';
import moment from 'moment';
import toJSON from 'enzyme-to-json';
import Table, { FixedPosition } from 'src/components/Table';
import Tabbable from 'src/services/wcag/Tabbable';

const pattern = 'MMM D YYYY ddd h A';

const feeAmountFormat = amount => `${amount}`;

const recurringCell = (content, row) => {
  if (row.recurring) {
    content.unshift(<i
      key={`${parseInt(Math.random() * 100000, 10)}`}
      className="icon icon-repeat-m"
    />);
  }
  return content;
};

const columns = [
  { title: 'start date', keyName: 'startDate', sorter: true, render: recurringCell },
  { title: 'start time', keyName: 'startTime' },
  { title: 'end date', keyName: 'endDate', sorter: true },
  { title: 'end time', keyName: 'endTime' },
  { title: 'attendee', keyName: 'attendee', sorter: true, className: 'test-column-class' },
  { title: 'fee amount', keyName: 'feeAmount', format: feeAmountFormat, sorter: true },
  { title: 'name', keyName: 'name', sorter: true }
];

const rows = [
  { data: { startDate: 'Dec 12 2016 Mon', startTime: '8:00 AM', endDate: 'Dec 12 2016 Mon', endTime: '9:00 AM', attendee: 20, feeAmount: 20, startDateSort: moment('Dec 12 2016 Mon 8:00 AM', pattern), name: 'a' } },
  { data: { startDate: 'Dec 15 2016 Thu', startTime: '10:00 AM', endDate: 'Dec 15 2016 Thu', endTime: '11:00 AM', attendee: 20, feeAmount: 20, startDateSort: moment('Dec 15 2016 Mon 10:00 AM', pattern), name: 'b' } },
  { data: { startDate: 'Dec 18 2016 Sun', startTime: '10:00 AM', endDate: 'Dec 18 2016 Sun', endTime: '11:00 AM', attendee: 20, feeAmount: 20, startDateSort: moment('Dec 18 2016 Mon 10:00 AM', pattern), name: 'c' } },
  { data: { startDate: 'Dec 18 2016 Sun', startTime: '10:00 AM', endDate: 'Dec 18 2016 Sun', endTime: '11:00 AM', attendee: 20, feeAmount: 20, startDateSort: moment('Dec 18 2016 Mon 10:00 AM', pattern), name: 'b' } },
  { data: { startDate: 'Dec 18 2016 Sun', startTime: '10:00 AM', endDate: 'Dec 18 2016 Sun', endTime: '11:00 AM', attendee: 20, feeAmount: 20, startDateSort: moment('Dec 18 2016 Mon 10:00 AM', pattern), name: 'a' } },
  { data: { startDate: 'Dec 18 2016 Sun', startTime: '10:00 AM', endDate: 'Dec 18 2016 Sun', endTime: '11:00 AM', attendee: 20, feeAmount: 20, startDateSort: moment('Dec 18 2016 Mon 10:00 AM', pattern), name: 1 } },
  { data: { startDate: 'Dec 18 2016 Sun', startTime: '10:00 AM', endDate: 'Dec 18 2016 Sun', endTime: '11:00 AM', attendee: 20, feeAmount: 20, startDateSort: moment('Dec 18 2016 Mon 10:00 AM', pattern), name: 2 } },
  { data: { startDate: 'Dec 18 2016 Sun', startTime: '10:00 AM', endDate: 'Dec 18 2016 Sun', endTime: '11:00 AM', attendee: 20, feeAmount: 20, startDateSort: moment('Dec 18 2016 Mon 10:00 AM', pattern), name: 3 } },
  { data: { startDate: 'Dec 18 2016 Sun', startTime: '10:00 AM', endDate: 'Dec 18 2016 Sun', endTime: '11:00 AM', attendee: 20, feeAmount: 20, startDateSort: moment('Dec 18 2016 Mon 10:00 AM', pattern), name: 4 } },
  { data: { startDate: 'Dec 18 2016 Sun', startTime: '10:00 AM', endDate: 'Dec 18 2016 Sun', endTime: '11:00 AM', attendee: 20, feeAmount: 20, startDateSort: moment('Dec 18 2016 Mon 10:00 AM', pattern), name: 5 } },
  { data: { startDate: 'Dec 18 2016 Sun', startTime: '10:00 AM', endDate: 'Dec 18 2016 Sun', endTime: '11:00 AM', attendee: 20, feeAmount: 20, startDateSort: moment('Dec 18 2016 Mon 10:00 AM', pattern), name: 6 } },
  { data: { startDate: 'Dec 18 2016 Sun', startTime: '10:00 AM', endDate: 'Dec 18 2016 Sun', endTime: '11:00 AM', attendee: 20, feeAmount: 20, startDateSort: moment('Dec 18 2016 Mon 10:00 AM', pattern), name: null } },
  { data: { startDate: 'Dec 18 2016 Sun', startTime: '10:00 AM', endDate: 'Dec 18 2016 Sun', endTime: '11:00 AM', attendee: 20, feeAmount: 20, startDateSort: moment('Dec 18 2016 Mon 10:00 AM', pattern), name: null } },
  { data: { startDate: 'Dec 18 2016 Sun', startTime: '10:00 AM', endDate: 'Dec 18 2016 Sun', endTime: '11:00 AM', attendee: 20, feeAmount: 20, startDateSort: moment('Dec 18 2016 Mon 10:00 AM', pattern) } },
  {
    data: { startDate: 'Dec 18 2016 Sun', startTime: '8:00 AM', endDate: 'Dec 20 2016 Wed', endTime: '9:00 AM', attendee: '--', feeAmount: 80, startDateSort: moment('Dec 18 2016 Mon 8:00 AM', pattern), name: 'a' },
    recurring: true,
    extraRows: [
      {
        data: { desc: 'Repeat By: Daily, Occurs: 4 times' },
        columns: [{ keyName: 'desc', colSpan: 6 }]
      },
      { data: { desc: '2017 07 12' }, columns: [{ keyName: 'desc', colSpan: 6 }] },
      { data: { desc: '2017 07 13' }, columns: [{ keyName: 'desc', colSpan: 6 }] },
      { data: { desc: '2017 07 14' }, columns: [{ keyName: 'desc', colSpan: 6 }] },
      { data: { desc: '2017 07 15' }, columns: [{ keyName: 'desc', colSpan: 6 }] }
    ],
    children: {
      rows: [
        {
          data: { startDate: 'Dec 18 2016 Sun', startTime: '10:00 AM', endDate: 'Dec 18 2016 Sun', endTime: '11:00 AM', attendee: 20, feeAmount: 20 },
          expandControl: 'feeAmount',
          expanded: false,
          children: {
            columns: [
              { keyName: 'feeName', colSpan: 3 },
              { keyName: 'price' },
              { keyName: 'amount' },
              { keyName: 'feeAmount', format: feeAmountFormat }
            ],
            rows: [
              { data: { feeName: 'Fee 1', price: '$10 / hr', amount: '1', feeAmount: 10 }, className: 'test-row-class' },
              { data: { feeName: 'Fee 1', price: '$5 / hr', amount: '2', feeAmount: 10 } }
            ]
          }
        }
      ]
    },
    bold: true,
    expanded: false,
    expandControl: 'startDate'
  },
  {
    fixed: FixedPosition.BOTTOM,
    data: { title: 'Total additional fee', feeAmount: 80 },
    columns: [{ keyName: 'title', colSpan: 5 }, { keyName: 'feeAmount', format: feeAmountFormat }] // Override columns for specified row
  }
];

describe('components/Table', () => {

  test('component should render well', () => {
    const wrapper = mount(<Table
      columns={[]}
      rows={[]}
      sortable={false}
      rowSeperator
      striped
    />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
  test('basic usage', () => {
    const wrapper = mount(<Table
      columns={[]}
      rows={[]}
      sortable={false}
      rowSeperator
      striped
    />);
    const instance = wrapper.instance();

    const toggleRowExpandStateSpy = jest.spyOn(instance, 'toggleRowExpandState');
    const sortRowsSpy = jest.spyOn(instance, 'sortRows');

    expect(wrapper.prop('rows')).toEqual([]);
    expect(wrapper.prop('columns')).toEqual([]);

    wrapper.setProps({ sortable: true });
    expect(wrapper.prop('sortable')).toEqual(true);

    wrapper.setProps({ columns });
    expect(wrapper.prop('columns')).toEqual(columns);

    wrapper.setProps({ rows });
    expect(wrapper.prop('rows')).toEqual(rows);

    const expandControl1 = wrapper.find('.expand-control').at(0).closest(Tabbable);
    expandControl1.simulate('click');
    expandControl1.simulate('click');
    expect(toggleRowExpandStateSpy).toHaveBeenCalledTimes(2);

    toggleRowExpandStateSpy.mockClear();
    const expandControl2 = wrapper.find('.expand-control').at(1).closest(Tabbable);
    expandControl2.simulate('click');
    expandControl2.simulate('click');
    expect(toggleRowExpandStateSpy).toHaveBeenCalledTimes(2);

    toggleRowExpandStateSpy.mockClear();
    wrapper.setProps({ onExpand: null, onCollapse: null });
    expandControl1.simulate('click');
    expandControl1.simulate('click');
    expect(toggleRowExpandStateSpy).toHaveBeenCalledTimes(2);


    const sorterDatetime = wrapper.find('thead th div').first().find(Tabbable);
    sorterDatetime.simulate('click');
    sorterDatetime.simulate('click');
    sorterDatetime.simulate('click');
    expect(sortRowsSpy).toHaveBeenCalledTimes(3);

    sortRowsSpy.mockClear();
    const sorterName = wrapper.find('thead th div').last().find(Tabbable);
    sorterName.simulate('click');
    sorterName.simulate('click');
    sorterName.simulate('click');
    expect(sortRowsSpy).toHaveBeenCalledTimes(3);
  });
});
