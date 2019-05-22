import React from 'react';
import cloneDeep from 'lodash/cloneDeep';
import isArray from 'lodash/isArray';
import isEmpty from 'lodash/isEmpty';
import moment from 'moment';

import DatePicker from '../../src/components/DatePicker';
import Button from '../../src/components//Button';

import '../base.less';
import '../layout.less';
import './app.less';

class App extends React.PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      logMsgs: []
    };
  }

  componentDidUpdate() {
    this.logElement.scrollTop = this.logElement.scrollHeight;
  }

  onValueChange(e) {
    this.log(isArray(e.value) ?
      `[${e.value.map(v => v.format('MM/DD/YYYY')).join(',')}]` :
      e.value.format('MM/DD/YYYY'));
  }

  onCalendarOpen() {
    this.log('Calendar Open....');
  }

  onCalendarClose() {
    this.log('Calendar Closed!');
  }

  onClear() {
    const state = cloneDeep(this.state);
    state.logMsgs = [];
    this.setState(state);
  }

  log(msg) {
    const state = cloneDeep(this.state);
    state.logMsgs.push(msg);
    this.setState(state);
  }

  render() {
    const logMsgs = this.state.logMsgs;
    return (
      <div>
        <div className="sample-content">
          <div className="sample-form">
            <h3>
              DatePicker is used for multiple dates inputing.
              For single date inputing, please use InputDate.
            </h3>
            <div className="row">
              <span className="field-label">Blank:</span>
              <div className="field">
                <DatePicker
                  data-qa-id={'test'}
                  onValueChange={(e) => { this.onValueChange(e); }}
                  onCalendarOpen={(e) => { this.onCalendarOpen(e); }}
                  onCalendarClose={(e) => { this.onCalendarClose(e); }}
                />
              </div>
            </div>
            <div className="row">
              <span className="field-label">With customized formatTextValue:</span>
              <div className="field">
                <DatePicker
                  onValueChange={(e) => { this.onValueChange(e); }}
                  onCalendarOpen={(e) => { this.onCalendarOpen(e); }}
                  onCalendarClose={(e) => { this.onCalendarClose(e); }}
                  formatTextValue={(value) => {
                    if (!isArray(value)) {
                      value = [value];
                    }

                    if (isEmpty(value)) return '';

                    return `${value.length} date(s) selected`;
                  }}
                />
              </div>
            </div>
            <div className="row">
              <span className="field-label">With single value:</span>
              <div className="field">
                <DatePicker
                  onValueChange={(e) => { this.onValueChange(e); }}
                  onCalendarOpen={(e) => { this.onCalendarOpen(e); }}
                  onCalendarClose={(e) => { this.onCalendarClose(e); }}
                  value={moment().add(2, 'days')}
                />
              </div>
            </div>
            <div className="row">
              <span className="field-label">With multiple values:</span>
              <div className="field">
                <DatePicker
                  onValueChange={(e) => { this.onValueChange(e); }}
                  onCalendarOpen={(e) => { this.onCalendarOpen(e); }}
                  onCalendarClose={(e) => { this.onCalendarClose(e); }}
                  value={[moment().add(2, 'days'), moment().add(3, 'days')]}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="side-bar">
          <div className="log" ref={(c) => { this.logElement = c; }}>
            <ul>
              {logMsgs.map((item, i) => (
                <li
                  key={i}
                  role="option"
                  className="msgline"
                >
                  <span>{item}</span>
                </li>
              )
              )}
            </ul>
          </div>

          <Button type="primary" size="sm" onClick={() => { this.onClear(); }}>Clear</Button>
        </div>
      </div>
    );
  }
}

export default App;
