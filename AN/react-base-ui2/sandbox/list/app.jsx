import React from 'react';
import cloneDeep from 'lodash/cloneDeep';
import uniqueId from 'lodash/uniqueId';
import isFunction from 'lodash/isFunction';
import map from 'lodash/map';
import random from 'lodash/random';
import moment from 'moment';

import List, { ListType, SelectionMode } from '../../src/components/List';
import { SafeText } from '../../src/components/SafeText';
import Button from '../../src/components/Button';
import Checkbox from '../../src/components/Checkbox';

import '../base.less';
import '../layout.less';
import './app.less';

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
  const time = new Date().getTime() + random(1, 99);
  const disabled = time % 20 === 1;
  return ({
    index,
    text: `this is a test ${index}`,
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

const defaultConfig = {
  selectionMode: SelectionMode.SINGLE,
  listType: ListType.SINGLE,
  disabled: false,
  showTips: true,
  showIcon: false,
  showCheckAll: false,
  checkable: false,
  sortable: false,
  filterable: false,
  isFuzzy: false,
  asyncable: false,
  icon: 'icon-list',
  maxHeight: '150px',
  WCAG: true,
  allowDeselect: false,
  striped: false
};

class App extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      config: cloneDeep(defaultConfig),
      singleRows: cloneDeep(singleRowData),
      multipleRows: cloneDeep(multipleRowData),
      multipleCols: cloneDeep(multipleColData),

      isCustomChange: true,
      isCustomRender: false,
      selectedIndex: [random(1, singleRowData.length)]
    };
  }

  componentDidMount() {
    this.val.value = JSON.stringify(this.list.selectedIndex);

    this.resetConfig();
  }

  onClear() {
    this.setState({
      config: cloneDeep(defaultConfig),
      singleRows: cloneDeep(singleRowData),
      multipleRows: cloneDeep(multipleRowData),
      multipleCols: cloneDeep(multipleColData),

      isCustomChange: true,
      isCustomRender: false
    });
  }

  changeConfig(configName, configValue, callBack) {
    this.setState({ config: { ...this.state.config, [configName]: configValue } },
      () => {
        console.log('changeConfig', { configName, configValue }, this.state.config);
        isFunction(callBack) && callBack();
      });
  }

  changeState(stateName, stateValue) {
    this.setState({ ...this.state, [stateName]: stateValue },
      () => console.log('changeState', { stateName, stateValue }));
  }

  customChange(value) {
    console.log(value);
    this.val.value = JSON.stringify(this.list.selectedIndex);
  }

  customRender({ data }) {
    const { index, disabled, selected, text } = data;
    return (
      <Checkbox disabled={disabled} checked={selected}>
        <SafeText key={`formatter_${index}`} text={`custom ${text}`} />
        <span className="row-icon icon-list" />
      </Checkbox>
    );
  }

  customFilter({ filter }) {
    const s = cloneDeep(this.state.singleRows);
    const newRows = s.filter(row => row.text.indexOf(filter) > -1);
    this.setState({ singleRows: newRows });
  }

  resetConfig() {
    const { config: { listType } } = this.state;
    const options = Array.prototype.slice.call(document.querySelectorAll('.option.single'), 0);
    options.forEach((opt) => {
      if (listType === ListType.MULTIPLE) {
        opt.setAttribute('disabled', listType === ListType.MULTIPLE);
      } else {
        opt.removeAttribute('disabled');
      }
    });
  }

  render() {
    const d = this.state.config.listType === ListType.SINGLE ?
      this.state.singleRows : this.state.multipleRows;

    return (
      <div>
        <div className="sample-content">
          <div className="sample-form">
            <h3>
              In ANet, we use simple list:
            </h3>
            <div className="row">
              <span className="field-label">list</span>
              <div className="field">
                <List
                  ref={(list) => { this.list = list; }}
                  data={d}
                  config={this.state.config}
                  columns={this.state.config.listType === ListType.MULTIPLE &&
                    this.state.multipleCols}
                  onChange={this.state.isCustomChange &&
                    (value => this.customChange(value))}
                  render={this.state.isCustomRender && (({ data }) => this.customRender({ data }))}
                  onScrollToBottom={() => {
                    this.list.appendData(singleRowData.map((row) => {
                      const index = uniqueId();
                      return ({ ...row, index, text: `this is a test ${index}` });
                    }));
                  }}
                  selectedIndex={this.state.selectedIndex}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="side-bar">
          <div className="options">
            <div className="row">
              <span>selection Mode </span>
              <select
                className="option single"
                defaultValue={this.state.config.selectionMode}
                onChange={e => this.changeConfig('selectionMode', e.target.value, 10)}
              >
                {
                  Object.keys(SelectionMode).map((key, index) => (
                    <option
                      key={index}
                      value={SelectionMode[key]}
                    >
                      {key}
                    </option>
                  ))
                }
              </select>
            </div>

            <div className="row">
              <span>column Type </span>
              <select
                className="option"
                defaultValue={this.state.config.listType}
                onChange={e =>
                  this.changeConfig('listType', e.target.value, () => {
                    this.resetConfig();
                  })
                }
              >
                {
                  Object.keys(ListType).map((key, index) => (
                    <option
                      key={index}
                      value={ListType[key]}
                    >
                      {key}
                    </option>
                  ))
                }
              </select>
            </div>

            <div className="row">
              <span>disabled </span>
              <input
                className="option single"
                type="checkbox"
                defaultChecked={this.state.config.disabled}
                onChange={e => this.changeConfig('disabled', e.target.checked)}
              />
            </div>

            <div className="row">
              <span>showTips </span>
              <input
                className="option single"
                type="checkbox"
                defaultChecked={this.state.config.showTips}
                onChange={e => this.changeConfig('showTips', e.target.checked)}
              />
            </div>

            <div className="row">
              <span>showIcon </span>
              <input
                className="option single"
                type="checkbox"
                defaultChecked={this.state.config.showIcon}
                onChange={e => this.changeConfig('showIcon', e.target.checked)}
              />

            </div>

            <div className="row">
              <span>Icon </span>
              <input
                className="option single"
                type="text"
                defaultValue={this.state.config.icon}
                onBlur={e => this.changeConfig('icon', e.target.value)}
              />
            </div>

            <div className="row">
              <span>Checkable </span>
              <input
                className="option single"
                type="checkbox"
                defaultChecked={this.state.config.checkable}
                onChange={e => this.changeConfig('checkable', e.target.checked)}
              />
            </div>

            <div className="row">
              <span>Show Check ALL </span>
              <input
                className="option single"
                type="checkbox"
                defaultChecked={this.state.config.showCheckAll}
                onChange={e => this.changeConfig('showCheckAll', e.target.checked)}
              />
            </div>

            <div className="row">
              <span>sortable </span>
              <input
                className="option single"
                type="checkbox"
                defaultChecked={this.state.config.sortable}
                onChange={e => this.changeConfig('sortable', e.target.checked)}
              />
            </div>

            <div className="row">
              <span> filterable</span>
              <input
                className="option single"
                type="checkbox"
                defaultChecked={this.state.config.filterable}
                onChange={e => this.changeConfig('filterable', e.target.checked)}
              />
            </div>

            <div className="row">
              <span> isFuzzy</span>
              <input
                className="option single"
                type="checkbox"
                defaultChecked={this.state.config.isFuzzy}
                onChange={e => this.changeConfig('isFuzzy', e.target.checked)}
              />
            </div>

            <div className="row">
              <span>asyncable </span>
              <input
                className="option single"
                type="checkbox"
                defaultChecked={this.state.config.asyncable}
                onChange={e => this.changeConfig('asyncable', e.target.checked)}
              />
            </div>

            <div className="row">
              <span>custom onChange </span>
              <input
                className="option single"
                type="checkbox"
                defaultChecked={this.state.isCustomChange}
                onChange={e => this.changeState('isCustomChange', e.target.checked)}
              />
            </div>
            <div className="row">
              <span>custom Render </span>
              <input
                className="option single"
                type="checkbox"
                defaultValue={this.state.isCustomRender}
                onChange={e => this.changeState('isCustomRender', e.target.checked)}
              />
            </div>
            <div className="row">
              <span>WCAG </span>
              <input
                className="option single"
                type="checkbox"
                defaultChecked={this.state.config.WCAG}
                onChange={e => this.changeConfig('WCAG', e.target.checked)}
              />
            </div>
            <div className="row">
              <span>allowDeselect </span>
              <input
                className="option single"
                type="checkbox"
                defaultChecked={this.state.config.allowDeselect}
                onChange={e => this.changeConfig('allowDeselect', e.target.checked)}
              />
            </div>
            <div className="row">
              <span>selectedIndex </span>
              <textarea
                className="option single"
                ref={(val) => { this.val = val; }}
                onBlur={e => this.changeState('selectedIndex', JSON.parse(e.target.value))}
              />
            </div>
          </div>

          <Button type="primary" size="sm" onClick={() => { this.onClear(); }}>Clear</Button>

          <Button type="primary" size="sm" onClick={() => { this.list.container.focus(); console.log(document.activeElement, this.list, this.list.container); }}>Focus</Button>
        </div>
      </div>

    );
  }
}


export default App;
