import React from 'react';

import InputBankCard from '../../src/components/InputBankCard';
import Checkbox from '../../src/components/Checkbox';
import Input from '../../src/components/Input';

import '../base.less';
import './app.less';
import '../layout.less';


class App extends React.PureComponent {

  static specsValidation = (cardNumber) => {
    const re = /\d{5}/i;

    if (cardNumber.match(re)) {
      return 'Type1';
    }
    return '';
  }

  constructor(props) {
    super(props);
    this._refs = {};
    this._inputBankCard = null;
    this.inputOption = {
      value: '35634875638456',
      maxLength: 16,
      group: 4,
      gapChar: ' - ',
      showPrompt: true,
      keepPosition: true
    };

    this.state = {
      ...this.inputOption
    };
  }

  onInput = (e, inputValue, pureValue) => {
    console.log('inputValue: ', inputValue);
    console.log('pureValue: ', pureValue);
    this.setState({
      value: inputValue
    });
  }

  setInputOptions = () => {
    this.setState({
      ...this.inputOption
    });
  }

  groupChange(e) {
    const group = e.target.value ? parseInt(e.target.value, 10) : 0;
    this.setState({ group });
  }

  maxLengthChange(e) {
    const maxLength = e.target.value ? parseInt(e.target.value, 10) : 0;
    this.setState({ maxLength });
  }

  gapCharChange(e) {
    const gapChar = e.target.value || '';
    this.setState({ gapChar });
  }

  showPromptChange(e) {
    const showPrompt = e.target.checked || false;
    this.setState({ showPrompt });
  }

  keepPositionChange(e) {
    const keepPosition = e.target.checked || false;
    this.setState({ keepPosition });
  }

  render() {
    return (
      <div className="samples__input-bank-card">
        <div className="form">
          <div className="warp">
            <InputBankCard
              className="input-bank-card"
              {...this.state}
              ref={(el) => { this._inputBankCard = el; }}
              onInput={(...args) => this.onInput(...args)}
              onBlur={() => console.log('onBlur callback')}
              placeholder="Please enter a card number"
            />
          </div>
          <div className="warp">
            <h4>InputBankCard:</h4>
            <p>
            Bank card input is a masked input component used for inputing credit or eCheck numbers.
            It has below features:
            </p>
            <ol>
              <li>Accepts numbers only.</li>
              <li>Numbers can be displayed in groups (4 number each group).</li>
              <li>Typing and key navigating would consider the group.</li>
              <li>Copy & paste are supported.</li>
              <li>The amount length of number can be customized.</li>
              <li>Can automatically identify the following card.
                <ul>
                  <li>VISA</li>
                  <li>Master Card</li>
                  <li>American Express</li>
                  <li>Dinner Club</li>
                  <li>Discover</li>
                  <li>JCB</li>
                </ul>
              </li>
              <li>It has callBack or event to notify value is ready or error happen.</li>
              <li>Can display type of card or eCheck icon to the right side of the input.</li>
              <li>Can popup descriptions or directors when hovering on the icon.</li>
            </ol>

            <h4>InputBankCard options: </h4>
            <ul>
              <li>
                <strong>maxLength:</strong>
                [Number] The card number length.
                By default, we will use the length defined in specs.
                This value may override the default value.
                <p>If maxLength = 0, means unlimited length.</p>
              </li>
              <li>
                <strong>group:</strong>
                [Number] Numbers can be displayed in groups.
              </li>
              <li>
                <strong>value:</strong>
                [String] Contains only numbers and spaces.
              </li>
              <li>
                <strong>showCardIcon:</strong>
                [Boolean] Whether or not the card type icon is displayed right side of the input.
                If showCardIcon is true:
                <ol>
                  <li>Show card-image if have cardUrl,</li>
                  <li>Show card-icon if the cardType can be recognized.</li>
                </ol>
              </li>
              <li>
                <strong>showTips:</strong>
                [Boolean] Whether or not to display tips image when hovering on the icon.
                If showTips is true:
                <ol>
                  <li>Show image if have image url,</li>
                  <li>Show tips-text if no image url and only have tips-text.</li>
                </ol>
                (Need to wait the popup service available)
              </li>
              <li>
                <strong>typeSpecs (be used with `typeSpecsValidation`):</strong>
                [Object] User-defined card verification function, need to return a cardType.
                The default value is null.
              </li>
              <li>
                <strong>typeSpecsValidation (be used with `typeSpecs`):</strong>
                [Function] User-defined card verification function, need to return a cardType.
                The cardType is one of typeSpecs types.
              </li>
            </ul>

            <h4>InputBankCard Events:</h4>
            <ul>
              <li>
                <strong>onChange:</strong>
                [Function] Fires when there is value changed.
              </li>
              <li>
                <strong>onError:</strong>
                [Function] Fires when there is error happen.
                This might be an interface to cooperate with validation indicator service in future.
              </li>
            </ul>

          </div>
        </div>

        <div className="side-bar">
          <div className="options">
            <div className="row">
              <span>Max length: </span>
              <Input
                className="side-input"
                value={this.state.maxLength}
                onChange={e => this.maxLengthChange(e)}
              />
            </div>
            <div className="row">
              <span>Group: </span>
              <Input
                className="side-input"
                value={this.state.group}
                onChange={e => this.groupChange(e)}
              />
            </div>
            <div className="row">
              <span>Gap character: </span>
              <Input
                className="side-input"
                value={this.state.gapChar}
                onChange={e => this.gapCharChange(e)}
              />
            </div>
            <div className="row">
              <Checkbox
                defaultChecked={this.state.showPrompt}
                onChange={e => this.showPromptChange(e)}
              >Show prompt character</Checkbox>
            </div>
            <div className="row">
              <Checkbox
                defaultChecked={this.state.keepPosition}
                onChange={e => this.keepPositionChange(e)}
              >Keep character positions</Checkbox>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
