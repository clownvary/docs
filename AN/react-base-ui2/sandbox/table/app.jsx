import React, { PureComponent } from 'react';
import moment from 'moment';

import Table, { FixedPosition } from '../../src/components/Table';
import Checkbox from '../../src/components/Checkbox';

import '../base.less';
import '../layout.less';
import './app.less';


const pattern = 'MMM D YYYY ddd h A';
export default class App extends PureComponent {

  constructor(props) {
    super(props);
    this.state = { tableProps: this.tableProps };
  }


  toggleRowSeperator = (e) => {
    const rowSeperator = e.target.checked;
    this.setState({
      tableProps: {
        ...this.state.tableProps,
        rowSeperator
      }
    });
  }

  toggleStriped = (e) => {
    const striped = e.target.checked;
    this.setState({
      tableProps: {
        ...this.state.tableProps,
        striped
      }
    });
  }

  feeAmountFormat = amount => `${amount}`

  recurringCell = (content, row) => {
    if (row.recurring) {
      content.unshift(<i
        key={`${parseInt(Math.random() * 100000, 10)}`}
        className="icon icon-repeat-m"
      />);
    }
    return content;
  }

  tableProps = {
    sortable: true,
    rowSeperator: true,
    striped: false,
    onExpand: (row) => {
      if (row.recurring) {
        const { extraRows } = row;
        extraRows.forEach((r, index) => {
          if (index !== 0) {
            r.hidden = true;
          }
        });
      }
    },
    onCollapse: (row) => {
      if (row.recurring) {
        row.extraRows.forEach((r) => { r.hidden = false; });
      }
    },
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
                  { keyName: 'feeAmount', format: this.feeAmountFormat }
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
        columns: [{ keyName: 'title', colSpan: 5 }, { keyName: 'feeAmount', format: this.feeAmountFormat }] // Override columns for specified row
      }
    ],
    columns: [
      { title: 'start date', keyName: 'startDate', sorter: true, render: this.recurringCell },
      { title: 'start time', keyName: 'startTime' },
      { title: 'end date', keyName: 'endDate', sorter: true },
      { title: 'end time', keyName: 'endTime' },
      { title: 'attendee', keyName: 'attendee', sorter: true, className: 'test-column-class' },
      { title: 'fee amount', keyName: 'feeAmount', format: this.feeAmountFormat, sorter: true }
    ]
  }


  render() {
    return (
      <div>
        <div className="waiver">
          <div className="sample-content">
            <div style={{ marginLeft: 20 }}>
              <Table {...this.state.tableProps} />
            </div>
          </div>
        </div>
        <div className="side-bar">
          <div className="options">
            <div className="row">
              <Checkbox
                onChange={this.toggleStriped}
                checked={this.state.tableProps.striped}
              >
                striped
              </Checkbox>
            </div>
            <div className="row">
              <Checkbox
                onChange={this.toggleRowSeperator}
                checked={this.state.tableProps.rowSeperator}
              >
                rowSeperator
              </Checkbox>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

