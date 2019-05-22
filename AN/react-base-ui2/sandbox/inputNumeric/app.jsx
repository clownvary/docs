import React from 'react';
import isFunction from 'lodash/isFunction';
import map from 'lodash/map';
import random from 'lodash/random';

import InputNumeric, { defaultProps } from '../../src/components/InputNumeric';

import '../base.less';
import '../layout.less';
import './app.less';

class App extends React.PureComponent {

  constructor(props) {
    super(props);

    this.state = {
      ...defaultProps,
      fillItems: false,
      showTrigger: false,
      icon: 'icon-chevron-down',
      iconHint: 'test',
      placeHolder: 'type here...',
      disabled: false,
      readonly: false,
      value: '',
      outOfRange: false,
      listMaxHeight: '200px'
    };
  }

  changeConfig(configName, configValue, callBack) {
    this.setState({ [configName]: configValue },
      () => {
        console.log('changeConfig', { configName, configValue }, this.state);
        isFunction(callBack) && callBack();
      });
  }

  defaultSorter = (a, b) => {
    if (a > b) {
      return 1;
    }

    if (a < b) {
      return -1;
    }

    return 0;
  }

  generateItems = (min, max) => (map(Array(20), () => random(min, max))).sort(this.defaultSorter);

  onValueChange = (e) => {
    this.setState({
      value: `${(e.value || 0)} / ${new Date().valueOf()}`,
      outOfRange: e.outOfRange || false
    });
  }

  onBlur = (e) => {
    this.setState({
      imeMode: `Blur ${new Date().valueOf()} ${e.value}`
    });
  }

  onIME = (e) => {
    this.setState({
      imeMode: `On ${new Date().valueOf()}`
    });
  }

  render() {
    const { value, outOfRange = false, imeMode } = this.state;

    return (
      <div>
        <div className="sample-content">
          <div className="output">
            <span>Value Changed: </span>
            <span>{value}</span>
            {
              outOfRange &&
                <span className="out-of-range">Out of range</span>
            }
          </div>
          <div className="output">
            <span>IME Mode: </span>
            <span>{imeMode}</span>
          </div>

          <div className="sample-form">
            <h3>
              3 types of numeric inputs are available:
            </h3>
            <div className="row">
              <span className="field-label">Numeric</span>
              <div className="field">
                <InputNumeric
                  showSpinner
                  min={this.state.min}
                  max={this.state.max}
                  value={null}
                  placeHolder={this.state.placeHolder}
                  maxLength={this.state.maxLength}
                  disabled={this.state.disabled}
                  readonly={this.state.readonly}
                  showTrigger={this.state.showTrigger}
                  triggerIcon={this.state.icon}
                  triggerIconHint={this.state.iconHint}
                  items={this.state.fillItems && this.generateItems(1, 10000)}
                  renderItem={({ item }) => {
                    console.log(item);
                    return (<div>{item.text} <br /> {item.value}</div>);
                  }}
                  onValueChange={e => this.onValueChange(e)}
                  onIME={e => this.onIME(e)}
                  onBlur={e => this.onBlur(e)}
                  listMaxHeight={this.state.listMaxHeight}
                />
              </div>
            </div>
            <div className="row">
              <span className="field-label">Currency</span>
              <div className="field">
                <InputNumeric
                  min={this.state.min}
                  max={this.state.max}
                  placeHolder={this.state.placeHolder}
                  maxLength={this.state.maxLength}
                  disabled={this.state.disabled}
                  readonly={this.state.readonly}
                  type="currency"
                  allowBlank={false}
                  showTrigger={this.state.showTrigger}
                  triggerIcon={this.state.icon}
                  triggerIconHint={this.state.iconHint}
                  items={this.state.fillItems && this.generateItems(1, 100)}
                  onValueChange={e => this.onValueChange(e)}
                  onBlur={e => this.onBlur(e)}
                  listMaxHeight={this.state.listMaxHeight}
                />
              </div>
            </div>
            <div className="row">
              <span className="field-label">Percent</span>
              <div className="field">
                <InputNumeric
                  min={this.state.min}
                  max={this.state.max}
                  placeHolder={this.state.placeHolder}
                  maxLength={this.state.maxLength}
                  disabled={this.state.disabled}
                  readonly={this.state.readonly}
                  type="percent"
                  showTrigger={this.state.showTrigger}
                  triggerIcon={this.state.icon}
                  triggerIconHint={this.state.iconHint}
                  items={this.state.fillItems && this.generateItems(1, 10000).map(i => i / 10000)}
                  onValueChange={e => this.onValueChange(e)}
                  listMaxHeight={this.state.listMaxHeight}
                />
              </div>
            </div>
          </div>

          <div className="sample-form">
            <h3>
              Long number, no dicimals, grouped by seperator
            </h3>
            <div className="row">
              <span className="field-label">Numeric</span>
              <div className="field">
                <InputNumeric
                  ariaLabel="test"
                  min={this.state.min}
                  max={this.state.max}
                  placeHolder={this.state.placeHolder}
                  maxLength={this.state.maxLength}
                  disabled={this.state.disabled}
                  readonly={this.state.readonly}
                  value="12345678"
                  decimals="0"
                  showGroup
                  showTrigger={this.state.showTrigger}
                  triggerIcon={this.state.icon}
                  triggerIconHint={this.state.iconHint}
                  items={this.state.fillItems && this.generateItems(123456780000, 999999990000)}
                  onValueChange={e => this.onValueChange(e)}
                  listMaxHeight={this.state.listMaxHeight}
                />
              </div>
            </div>
            <div className="row">
              <span className="field-label">Currency</span>
              <div className="field">
                <InputNumeric
                  ariaLabel="test"
                  min={this.state.min}
                  max={this.state.max}
                  placeHolder={this.state.placeHolder}
                  maxLength={this.state.maxLength}
                  disabled={this.state.disabled}
                  readonly={this.state.readonly}
                  type="currency"
                  decimals="0"
                  showGroup
                  showTrigger={this.state.showTrigger}
                  triggerIcon={this.state.icon}
                  triggerIconHint={this.state.iconHint}
                  items={this.state.fillItems && this.generateItems(1000, 20000)}
                  onValueChange={e => this.onValueChange(e)}
                  listMaxHeight={this.state.listMaxHeight}
                />
              </div>
            </div>
          </div>

          <div className="sample-form">
            <h3>
            Max & min range ($50-$200)
          </h3>
            <div className="row">
              <span className="field-label">Currency</span>
              <div className="field">
                <InputNumeric
                  placeHolder={this.state.placeHolder}
                  maxLength={this.state.maxLength}
                  disabled={this.state.disabled}
                  readonly={this.state.readonly}
                  type="currency"
                  min="50"
                  max="200"
                  showTrigger={this.state.showTrigger}
                  triggerIcon={this.state.icon}
                  triggerIconHint={this.state.iconHint}
                  items={this.state.fillItems && this.generateItems(50, 200)}
                  onValueChange={e => this.onValueChange(e)}
                  onBlur={e => this.onBlur(e)}
                  listMaxHeight={this.state.listMaxHeight}
                />
              </div>
            </div>
          </div>

          <div className="sample-form">
            <h3>
              Increment steps (use up/down key)
            </h3>
            <div className="row">
              <span className="field-label">Currency</span>
              <div className="field">
                <InputNumeric
                  min={this.state.min}
                  max={this.state.max}
                  placeHolder={this.state.placeHolder}
                  maxLength={this.state.maxLength}
                  disabled={this.state.disabled}
                  readonly={this.state.readonly}
                  type="currency"
                  decimals="0"
                  showGroup
                  increment="5"
                  allowMouseSpin
                  showTrigger={this.state.showTrigger}
                  triggerIcon={this.state.icon}
                  triggerIconHint={this.state.iconHint}
                  items={this.state.fillItems && this.generateItems(1000, 20000)}
                  onValueChange={e => this.onValueChange(e)}
                  listMaxHeight={this.state.listMaxHeight}
                />
              </div>
            </div>
          </div>

        </div>

        <div className="side-bar">
          <div className="options">
            <div className="row">
              <span>Fill Items</span>
              <input
                className="option single"
                type="checkbox"
                defaultChecked={this.state.fillItems}
                onChange={e => this.changeConfig('fillItems', e.target.checked)}
              />
            </div>

            <div className="row">
              <span>Show Trigger Icon</span>
              <input
                className="option single"
                type="checkbox"
                defaultChecked={this.state.showTrigger}
                onChange={e => this.changeConfig('showTrigger', e.target.checked)}
              />
            </div>

            <div className="row">
              <span>Icon </span>
              <input
                className="option single"
                type="text"
                defaultValue={this.state.icon}
                onBlur={e => this.changeConfig('icon', e.target.value)}
              />
            </div>

            <div className="row">
              <span>Place Holder </span>
              <input
                className="option single"
                type="text"
                defaultValue={this.state.placeHolder}
                onBlur={e => this.changeConfig('placeHolder', e.target.value)}
              />
            </div>

            <div className="row">
              <span>Min </span>
              <input
                className="option single"
                type="text"
                defaultValue={this.state.min}
                onBlur={e => this.changeConfig('min', parseFloat(e.target.value))}
              />
            </div>

            <div className="row">
              <span>Max </span>
              <input
                className="option single"
                type="text"
                defaultValue={this.state.max}
                onBlur={e => this.changeConfig('max', parseFloat(e.target.value))}
              />
            </div>

            <div className="row">
              <span>Readonly </span>
              <input
                className="option"
                type="checkbox"
                defaultValue={this.state.readonly}
                onBlur={e => this.changeConfig('readonly', e.target.checked)}
              />
            </div>

            <div className="row">
              <span>Disabled </span>
              <input
                className="option"
                type="checkbox"
                defaultValue={this.state.disabled}
                onBlur={e => this.changeConfig('disabled', e.target.checked)}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
