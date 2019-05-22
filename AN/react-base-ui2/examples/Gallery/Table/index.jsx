import React from 'react';
import moment from 'moment';
import Table, { FixedPosition } from 'src/components/Table';
import TableMd from 'doc/api/components/Table/Table.md';
import pickProps from '../../App/utils/pickProps';
import DemoPage from '../../App/components/DemoPage';
import initSettings from './initSettings';

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

const data = {
  columns: [
    { title: 'start date', keyName: 'startDate', sorter: true, render: recurringCell },
    { title: 'start time', keyName: 'startTime' },
    { title: 'end date', keyName: 'endDate', sorter: true },
    { title: 'end time', keyName: 'endTime' },
    { title: 'attendee', keyName: 'attendee', sorter: true, className: 'test-column-class' },
    { title: 'fee amount', keyName: 'feeAmount', format: feeAmountFormat, sorter: true }
  ],
  rows: [
    { data: { startDate: 'Dec 12 2016 Mon', startTime: '8:00 AM', endDate: 'Dec 12 2016 Mon', endTime: '9:00 AM', attendee: 20, feeAmount: 20, startDateSort: moment('Dec 12 2016 Mon 8:00 AM', pattern) } },
    { data: { startDate: 'Dec 15 2016 Thu', startTime: '10:00 AM', endDate: 'Dec 15 2016 Thu', endTime: '11:00 AM', attendee: 20, feeAmount: 20, startDateSort: moment('Dec 15 2016 Mon 10:00 AM', pattern) } },
    { data: { startDate: 'Dec 18 2016 Sun', startTime: '10:00 AM', endDate: 'Dec 18 2016 Sun', endTime: '11:00 AM', attendee: 20, feeAmount: 20, startDateSort: moment('Dec 18 2016 Mon 10:00 AM', pattern) } },
    {
      data: { startDate: 'Dec 18 2016 Sun', startTime: '8:00 AM', endDate: 'Dec 20 2016 Wed', endTime: '9:00 AM', attendee: '--', feeAmount: 80, startDateSort: moment('Dec 18 2016 Mon 8:00 AM', pattern) },
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
  ]
};

export default class Page extends DemoPage {

  static meta = {
    name: 'Table',
    icon: 'icon-table',
    documents: [TableMd],
    description: 'This example demonstrates the features of Table.'
  }

  getInitSettings() {
    return initSettings;
  }

  onExpand = (row) => {
    this.log('row expanding');
    if (row.recurring) {
      const { extraRows } = row;
      extraRows.forEach((r, index) => {
        if (index !== 0) {
          r.hidden = true;
        }
      });
    }
  }

  onCollapse = (row) => {
    this.log('row collapsing');
    if (row.recurring) {
      row.extraRows.forEach((r) => { r.hidden = false; });
    }
  }

  renderContent() {
    const { settings } = this.state;
    const props = pickProps(settings);

    return (
      <div>
        <Table
          {...data}
          {...props}
          onExpand={this.onExpand}
          onCollapse={this.onCollapse}
        />
      </div>
    );
  }
}
