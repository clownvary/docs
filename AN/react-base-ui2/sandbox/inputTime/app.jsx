import React from 'react';
import cloneDeep from 'lodash/cloneDeep';

import InputTime from '../../src/components/InputTime';
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
    this.log(e.value.toString());
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
                In ANet, we use below 2 time formats:
            </h3>
            <div className="row">
              <span className="field-label">h:mm A</span>
              <div className="field field-time">
                <InputTime
                  showTrigger
                  format="h:mm A"
                  onValueChange={(e) => { this.onValueChange(e); }}
                />
              </div>
            </div>

            <div className="row">
              <span className="field-label">H:mm</span>
              <div className="field field-time">
                <InputTime
                  format="H:mm"
                  showTrigger
                  onValueChange={(e) => { this.onValueChange(e); }}
                />
              </div>
            </div>
          </div>

          <div className="sample-form">
            <h3>
                More formats.
            </h3>
            <div className="row">
              <span className="field-label">[Start time: ]h:mm A</span>
              <div className="field field-time-long">
                <InputTime
                  format="[Start time: ]h:mm A"
                  showTrigger
                  onValueChange={(e) => { this.onValueChange(e); }}
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
