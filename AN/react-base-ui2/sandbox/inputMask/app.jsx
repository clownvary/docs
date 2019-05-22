import React from 'react';
import cloneDeep from 'lodash/cloneDeep';

import InputMask from '../../src/components/InputMask';
import Button from '../../src/components//Button';
import Checkbox from '../../src/components/Checkbox';

import '../base.less';
import '../layout.less';
import './app.less';

class App extends React.PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      promptChar: '_',
      hidePromptOnLeave: false,
      allowPromptAsInput: false,
      logMsgs: []
    };
  }

  componentDidUpdate() {
    this.logElement.scrollTop = this.logElement.scrollHeight;
  }

  onTextChange(e) {
    this.log(e.text);
  }

  onShowPrompt(e) {
    const state = cloneDeep(this.state);
    state.promptChar = e.target.checked ? '_' : '';
    this.setState(state);
  }

  onHidePrompt(e) {
    const state = cloneDeep(this.state);
    state.hidePromptOnLeave = !!e.target.checked;
    this.setState(state);
  }

  onAllowPrompt(e) {
    const state = cloneDeep(this.state);
    state.allowPromptAsInput = !!e.target.checked;
    this.setState(state);
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
    const { promptChar = '_', hidePromptOnLeave, allowPromptAsInput } = this.state;
    const logMsgs = this.state.logMsgs;
    return (
      <div>
        <div className="sample-content">
          <div className="sample-form">

            <div className="row">
              <span className="field-label">Phone Number:</span>
              <div className="field">
                <InputMask
                  mask="(999) 000-0000"
                  promptChar={promptChar}
                  hidePromptOnLeave={hidePromptOnLeave}
                  onTextChange={(e) => { this.onTextChange(e); }}
                />
              </div>
            </div>

            <div className="row">
              <span className="field-label">Credit Card Number:</span>
              <div className="field">
                <InputMask
                  mask="0000 0000 0000 0000"
                  promptChar={promptChar}
                  hidePromptOnLeave={hidePromptOnLeave}
                  onTextChange={(e) => { this.onTextChange(e); }}
                />
              </div>
            </div>

            <div className="row">
              <span className="field-label">&gt;LL-AA-0000</span>
              <div className="field">
                <InputMask
                  mask=">LL-AA-0000"
                  promptChar={promptChar}
                  hidePromptOnLeave={hidePromptOnLeave}
                  onTextChange={(e) => { this.onTextChange(e); }}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="side-bar">
          <div className="options">
            <div className="row">
              <Checkbox
                defaultChecked={!!promptChar}
                onChange={e => this.onShowPrompt(e)}
              >Show Prompt</Checkbox>
            </div>
            <div className="row">
              <Checkbox
                defaultChecked={hidePromptOnLeave}
                onChange={e => this.onHidePrompt(e)}
              >Hide Promt on Leave</Checkbox>
            </div>
            <div className="row">
              <Checkbox
                defaultChecked={allowPromptAsInput}
                onChange={e => this.onAllowPrompt(e)}
              >Allow Prompt as Input</Checkbox>
            </div>
          </div>

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
