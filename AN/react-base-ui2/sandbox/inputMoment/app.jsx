import React from 'react';
import moment from 'moment';
import cloneDeep from 'lodash/cloneDeep';

import InputMoment from '../../src/components/InputMoment';
import InputDateTime from '../../src/components/InputDateTime';
import Button from '../../src/components//Button';

import '../base.less';
import '../layout.less';
import './app.less';

class App extends React.PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      value: moment(),
      logMsgs: []
    };
  }

  componentDidUpdate() {
    this.logElement.scrollTop = this.logElement.scrollHeight;
  }

  onValueChange(e) {
    this.setState({
      value: moment(e.value)
    });
    if (e.value) {
      this.log(e.value.format('YYYY-MM-DD HH:mm:ss'));
    } else {
      this.log('Value is null');
    }
  }

  onClear() {
    const state = cloneDeep(this.state);
    state.logMsgs = [];
    this.setState(state);
  }

  setRange() {
    this.setState({
      min: moment(),
      max: moment().add('d', 10)
    });
  }

  log(msg) {
    const state = cloneDeep(this.state);
    state.logMsgs.push(msg);
    this.setState(state);
  }

  render() {
    const { logMsgs, value, min, max } = this.state;
    return (
      <div>
        <div className="sample-content">
          <div className="sample-form">
            <div className="row">
              <span className="field-label">Short date pattern:</span>
              <div className="field">
                <InputMoment
                  placeHolder="Type here"
                  onValueChange={(e) => { this.onValueChange(e); }}
                  value={value}
                />
              </div>
            </div>

            <div className="row">
              <span className="field-label">Long date pattern:</span>
              <div className="field">
                <InputMoment
                  placeHolder="Type here"
                  format="D"
                  onValueChange={(e) => { this.onValueChange(e); }}
                />
              </div>
            </div>

            <div className="row">
              <span className="field-label">12 hours pattern:</span>
              <div className="field">
                <InputMoment
                  format="hh:mm A"
                  onValueChange={(e) => { this.onValueChange(e); }}
                />
              </div>
            </div>

            <div className="row">
              <span className="field-label">24 hours pattern:</span>
              <div className="field">
                <InputMoment
                  format="HH:mm"
                  onValueChange={(e) => { this.onValueChange(e); }}
                />
              </div>
            </div>

            <div className="row">
              <span className="field-label">With Trigers</span>
              <div className="field field-wide">
                <InputMoment
                  format="dddd, MMM DD, YYYY HH:mm A"
                  showTrigger
                  showTrigger2
                  min={min}
                  max={max}
                  onValueChange={(e) => { this.onValueChange(e); }}
                />
              </div>
            </div>

            <div className="row">
              <span className="field-label">Date & Time</span>
              <div className="field field-wide">
                <InputDateTime
                  onValueChange={(e) => { this.onValueChange(e); }}
                  min={min}
                  disabledDates={[3, 4, 5, 6].map(c => moment().add(c, 'days'))}
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
          <Button type="primary" size="sm" onClick={() => { this.setRange(); }}>Set Range</Button>
        </div>
      </div>
    );
  }
}

export default App;
