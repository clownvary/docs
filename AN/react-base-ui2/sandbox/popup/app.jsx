import React from 'react';
import reduce from 'lodash/reduce';
import Dropdown from 'src/components/Dropdown';
import { InputNumeric } from '../../src/components/InputNumeric';
import Checkbox from '../../src/components/Checkbox';
import Button from '../../src/components//Button';
import formService from './services/formService';
import { Dock, Effect } from '../../src/consts';

import '../base.less';
import '../layout.less';
import './app.less';

class App extends React.PureComponent {

  constructor(props) {
    super(props);

    this.dockStyles = reduce(Dock, (result, value, key) => {
      if (key !== '__esModule') {
        result.push({ text: key, value });
      }

      return result;
    }, []);

    this.effects = reduce(Effect, (result, value, key) => {
      if (key !== '__esModule') {
        result.push({ text: key, value });
      }

      return result;
    }, []);

    this.state = { sigName: '' };
  }

  componentDidMount() {
    this.targetElement.value = 'I agree to sign the contract with below signature name:';
  }

  onFormChange(value) {
    this.setState({
      sigName: value
    });
  }

  onPopUpForm() {
    const popupOptions = {
      target: this.targetElement,
      ...this.options };

    if (popupOptions.usePosition) {
      popupOptions.position = {
        left: this.inputLeft.value,
        top: this.inputTop.value
      };
    }

    const inputValue = this.targetElement.value;

    this.popupInstance = formService.popup(popupOptions, { inputValue });
    this.popupInstance.result.then((value) => {
      this.onFormChange(value);
      this.popupInstance = null;
    }).catch(() => {
      this.popupInstance = null;
    });
  }

  onCloseForm() {
    if (this.popupInstance) {
      this.popupInstance.cancel();
    }
  }

  onFocus() {
    if (this.options.openByFocus) {
      this.onPopUpForm();
    }
  }

  options = {
    usePosition: false,
    showMask: false,
    noCollision: true,
    showShadow: false,
    distance: 0,
    autoClose: 0,
    openByFocus: false,
    closeByClick: true,
    dockStyle: Dock.BOTTOM_LEFT,
    effect: Effect.NONE,
    closeByEscape: true
  }

  render() {
    const { sigName = '' } = this.state;
    return (
      <div>
        <div className="waiver">
          <input
            className="target"
            ref={(el) => { this.targetElement = el; }}
            onFocus={e => this.onFocus(e)}
          />
          <div><span className="sigName">{sigName || ''}</span></div>
        </div>
        <div className="side-bar">
          <div className="options">
            <div className="row">
              <span>Dock Style</span>
              <Dropdown
                data={this.dockStyles}
                defaultValue={this.options.dockStyle}
                onChange={({ value }) => { this.options.dockStyle = value; }}
              />
            </div>
            <div className="row">
              <span>Effect</span>
              <Dropdown
                data={this.effects}
                defaultValue={this.options.effect}
                onChange={({ value }) => { this.options.effect = value; }}
              />
            </div>
            <div className="row">
              <span style={{ margin: '4px 4px 0 0' }}>Left:</span>
              <InputNumeric
                value="200"
                min="0"
                decimals="0"
                showSpinner
                ref={(c) => { this.inputLeft = c; }}
              />
              <span style={{ margin: '4px 4px' }}>Top:</span>
              <InputNumeric
                value="200"
                min="0"
                decimals="0"
                showSpinner
                ref={(c) => { this.inputTop = c; }}
              />
            </div>
            <div className="row">
              <Checkbox
                value={this.options.usePosition}
                defaultChecked={this.options.usePosition}
                onChange={(e) => { this.options.usePosition = e.target.checked; }}
              >Use Position</Checkbox>
            </div>
            <div className="row">
              <Checkbox
                value={this.options.showMask}
                defaultChecked={this.options.showMask}
                onChange={(e) => { this.options.showMask = e.target.checked; }}
              >Show Mask</Checkbox>
            </div>
            <div className="row">
              <Checkbox
                value={this.options.showShadow}
                defaultChecked={this.options.showShadow}
                onChange={(e) => { this.options.showShadow = e.target.checked; }}
              >Show Shadow</Checkbox>
            </div>
            <div className="row">
              <Checkbox
                value={this.options.distance !== 0}
                defaultChecked={this.options.distance !== 0}
                onChange={(e) => { this.options.distance = e.target.checked ? 10 : 0; }}
              >Distance (10px)</Checkbox>
            </div>
            <div className="row">
              <Checkbox
                value={this.options.noCollision}
                defaultChecked={this.options.noCollision}
                onChange={(e) => { this.options.noCollision = e.target.checked; }}
              >No Collision</Checkbox>
            </div>
            <div className="row">
              <Checkbox
                value={this.options.autoClose !== 0}
                defaultChecked={this.options.autoClose !== 0}
                onChange={(e) => { this.options.autoClose = e.target.checked ? 2000 : 0; }}
              >Auto Close (2s)</Checkbox>
            </div>
            <div className="row">
              <Checkbox
                value={this.options.openByFocus}
                defaultChecked={this.options.openByFocus}
                onChange={(e) => { this.options.openByFocus = e.target.checked; }}
              >Open by Focus</Checkbox>
            </div>
            <div className="row">
              <Checkbox
                value={this.options.closeByClick}
                defaultChecked={this.options.closeByClick}
                onChange={(e) => { this.options.closeByClick = e.target.checked; }}
              >Close by Click</Checkbox>
            </div>
            <div className="row">
              <Button type="primary" size="sm" onClick={() => this.onPopUpForm()}>Popup</Button>
              <Button type="primary" size="sm" onClick={() => this.onCloseForm()}>Close</Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
