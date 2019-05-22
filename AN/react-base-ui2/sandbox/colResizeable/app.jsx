import React, { PureComponent } from 'react';
import moment from 'moment';
import Table, { FixedPosition } from '../../src/components/Table';
import CollapsePanel from '../../src/components/CollapsePanel';
import createColResizable from '../../src/helper/colResizable';

import '../base.less';
import '../layout.less';


const pattern = 'MMM D YYYY ddd h A';

const onExpand = () => {
  const tableElemLiveDragTrue = document.querySelector('.table-liveDrag-true');
  createColResizable(tableElemLiveDragTrue, {
    disabledColumns: [2],
    onResized(e) {
      console.log('onResized', e);
    }
  });
};

export default class App extends PureComponent {

  componentDidMount() {
    const tableElemLiveDragFalse = document.querySelector('.table-liveDrag-false');
    createColResizable(tableElemLiveDragFalse, {
      liveDrag: false,
      headerOnly: false,
      onResized(e) {
        console.log('onResized', e);
      }
    });
  }

  feeAmountFormat = amount => `$${amount}`

  recurringCell = (content, row) => {
    if (row.data.recurring) {
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
    rows: [
      { data: { startDate: 'Dec 12 2016 Mon', startTime: '8:00 AM', endDate: 'Dec 12 2016 Mon', endTime: '9:00 AM', attendee: 20, feeAmount: 20, startDateSort: moment('Dec 12 2016 Mon 8:00 AM', pattern) } },
      { data: { startDate: 'Dec 15 2016 Thu', startTime: '10:00 AM', endDate: 'Dec 15 2016 Thu', endTime: '11:00 AM', attendee: 20, feeAmount: 20, startDateSort: moment('Dec 15 2016 Mon 10:00 AM', pattern) } },
      { data: { startDate: 'Dec 18 2016 Sun', startTime: '10:00 AM', endDate: 'Dec 18 2016 Sun', endTime: '11:00 AM', attendee: 20, feeAmount: 20, startDateSort: moment('Dec 18 2016 Mon 10:00 AM', pattern) } },
      {
        data: { startDate: 'Dec 18 2016 Sun', startTime: '8:00 AM', endDate: 'Dec 20 2016 Wed', endTime: '9:00 AM', attendee: '--', feeAmount: 80, recurring: true, startDateSort: moment('Dec 18 2016 Mon 8:00 AM', pattern) },
        extraRows: [
          {
            data: { desc: 'Repeat By: Daily, Occurs: 4 times' },
            columns: [{ keyName: 'desc', colSpan: 6 }]
          }
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
      { title: 'start date', keyName: 'startDate', minWidth: 120, sorter: true, render: this.recurringCell },
      { title: 'start time', keyName: 'startTime', minWidth: 120 },
      { title: 'end date', keyName: 'endDate', sorter: true, minWidth: 100 },
      { title: 'end time', keyName: 'endTime', minWidth: 120 },
      { title: 'attendee', keyName: 'attendee', sorter: true, minWidth: 120, className: 'test-column-class' },
      { title: 'fee amount', keyName: 'feeAmount', minWidth: 120, format: this.feeAmountFormat, sorter: true }
    ]
  }

  render() {
    return (
      <div>
        <h4>liveDrag: true</h4>
        <div style={{ width: 945 }}>
          <CollapsePanel
            title="liveDrag: true"
            className="liveDrag"
            onExpand={onExpand}
          >
            <Table className="table-liveDrag-true" {...(this.tableProps)} />
          </CollapsePanel>
        </div>
        <h4>liveDrag: false</h4>
        <div style={{ width: 945 }}>
          <Table className="table-liveDrag-false" {...(this.tableProps)} />
        </div>
      </div>
    );
  }
}

