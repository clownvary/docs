import React from 'react';
import uniqueId from 'lodash/uniqueId';
import map from 'lodash/map';
import random from 'lodash/random';
import moment from 'moment';
import Checkbox from 'src/components/Checkbox';
import List, { ListType } from 'src/components/List';
import ListMD from 'doc/api/components/List/List.md';
import { Form, Group } from '../../App/components/Form';
import DemoPage from '../../App/components/DemoPage';
import pickProps from '../../App/utils/pickProps';
import initSettings from './initSettings';

const pattern = 'MMM D YYYY ddd h A';

const feeAmountFormat = amount => `${amount}`;

const recurringCell = (content, row) => {
  if (row.data.recurring) {
    content.unshift(<i
      key={`${parseInt(Math.random() * 100000, 10)}`}
      className="icon icon-repeat-m"
    />);
  }
  return content;
};

const singleRowData = map(Array(100), () => {
  const index = uniqueId();
  const disabled = random(1, 99) % 20 === 1;
  return ({
    index,
    text: `resource ${index}`,
    value: index,
    disabled
  });
});

const multipleRowData = [
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
  }
];

const multipleColData = [
  { title: 'start date', keyName: 'startDate', sorter: true, render: recurringCell },
  { title: 'start time', keyName: 'startTime' },
  { title: 'end date', keyName: 'endDate', sorter: true },
  { title: 'end time', keyName: 'endTime' },
  { title: 'attendee', keyName: 'attendee', sorter: true, className: 'test-column-class' },
  { title: 'fee amount', keyName: 'feeAmount', format: feeAmountFormat, sorter: true }
];

export default class Page extends DemoPage {
  static meta = {
    name: 'List',
    icon: 'icon-list',
    documents: [ListMD],
    description: 'This example demonstrates the features of List.'
  }

  getInitSettings() {
    return initSettings;
  }

  customRender = ({ item }) => {
    const { index, disabled, selected } = item;

    return (
      <Checkbox disabled={disabled} checked={selected}>
        {index}
        <span className="row-icon icon-list" />
      </Checkbox>
    );
  }

  handleChange = (selectedIndex) => {
    this.log(`selectedIndex: ${selectedIndex}`);
  }

  renderContent() {
    const { settings } = this.state;
    const config = pickProps(settings, Object.keys(initSettings));
    const data = config.listType === ListType.SINGLE ? singleRowData : multipleRowData;

    return (
      <Form title="List">
        <span>Open the settings panel for see more options.</span>
        <List
          ref={(list) => { this.list = list; }}
          data={data}
          config={config}
          columns={config.listType === ListType.MULTIPLE && multipleColData}
          onChange={(config.isCustomChange && this.handleChange) || (() => {})}
          renderer={(config.isCustomRender && (value => this.customRender(value))) || (() => {})}
          onScrollToBottom={() => {
            this.list.appendData(singleRowData.map((row) => {
              const index = uniqueId();
              return ({ ...row, index, text: `this is a test ${index}` });
            }));
          }}
          selectedIndex={[random(1, singleRowData.length)]}
        />
      </Form>
    );
  }
}
