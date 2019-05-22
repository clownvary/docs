import React from 'react';
import isFunction from 'lodash/isFunction';

import ComboBox from '../../src/components/ComboBox';
import Button from '../../src/components//Button';

import '../base.less';
import '../layout.less';
import './app.less';

class App extends React.PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      disabled: false,
      showTrigger: true,
      placeHolder: 'please input text',
      triggerIcon: 'icon-chevron-down',
      maxLength: '10',
      textAlign: 'left',
      renderItem: false,
      handleChange: false,
      listMaxHeight: '400px',
      listWidth: 'auto',
      listClassName: 'sample-list-combobox',
      items: [{
        balance: 20,
        text: 111111,
        cardType: 'JG1 Gift Certificate1',
        value: 95
      },
      {
        balance: 25,
        text: 22222222,
        cardType: 'JG1 Gift Certificate2',
        value: 96
      },
      {
        balance: 210,
        text: 3333333,
        cardType: 'JG1 Gift Certificate3',
        value: 97
      }
      ]
    };
  }

  handleChange = (e) => {
    alert(`value had changed ,now value is ${e.target.value}`);
  }

  changeConfig(configName, configValue, callBack) {
    this.setState({ [configName]: configValue },
      () => {
        console.log('changeConfig', { configName, configValue }, this.state);
        isFunction(callBack) && callBack();
      });
  }

  changeItems = () => {
    const newItems = [{
      balance: 10,
      text: 111111,
      cardType: 'JG1 Gift Certificate1',
      value: 95
    },
    {
      balance: 25,
      text: 22222222,
      cardType: 'JG1 Gift Certificate2',
      value: 96
    },
    {
      balance: 210,
      text: 3333333,
      cardType: 'JG1 Gift Certificate3',
      value: 97
    },
    {
      balance: 210,
      text: 33333334,
      cardType: 'JG1 Gift Certificate4',
      value: 91
    }
    ];
    this.changeConfig('items', newItems);
  }

  renderItem = item => (
    <ul>
      <li><b>{item.cardType}</b></li>
      <li>{item.text}</li>
      <li>
        {item.balance}
      </li>
    </ul>
  );

  render() {
    return (
      <div>
        <div className="sample-content">
          <ComboBox
            ariaLabel="combo sample wcag"
            triggerIconHint="combo trigger icon wcag"
            listConfig={{ disabled: false }}
            listPopupOptions={{ distance: 5 }}
            showTrigger={this.state.showTrigger}
            triggerIcon={this.state.triggerIcon}
            placeHolder={this.state.placeHolder}
            items={this.state.items}
            disabled={this.state.disabled}
            maxLength={this.state.maxLength}
            listClassName={this.state.listClassName}
            listMaxHeight={this.state.listMaxHeight}
            listWidth={this.state.listWidth}
            onTextChange={this.state.handleChange ? e => this.handleChange(e) : null}
            onListRender={this.state.renderItem ? ({ item }) => this.renderItem(item) : null}
          />
        </div>
        <div className="side-bar">
          <div className="options">
            <div className="row">
              <span>Show Trigger</span>
              <input
                className="option single"
                type="checkbox"
                defaultChecked={this.state.showTrigger}
                onChange={e => this.changeConfig('showTrigger', e.target.checked)}
              />
            </div>
            <div className="row">
              <span>Custom Render</span>
              <input
                className="option single"
                type="checkbox"
                defaultChecked={this.state.renderItem}
                onChange={e => this.changeConfig('renderItem', e.target.checked)}
              />
            </div>

            <div className="row">
              <span>Handle Value Change</span>
              <input
                className="option single"
                type="checkbox"
                defaultChecked={this.state.handleChange}
                onChange={e => this.changeConfig('handleChange', e.target.checked)}
              />
            </div>

            <div className="row">
              <span>Icon </span>
              <input
                className="option single"
                type="text"
                defaultValue={this.state.triggerIcon}
                onBlur={e => this.changeConfig('triggerIcon', e.target.value)}
              />
            </div>

            <div className="row">
              <span>PlaceHolder </span>
              <input
                className="option single"
                type="text"
                defaultValue={this.state.placeHolder}
                onChange={e => this.changeConfig('placeHolder', e.target.value)}
              />
            </div>
            <div className="row">
              <span>listMaxHeight </span>
              <input
                className="option single"
                type="text"
                defaultValue={this.state.listMaxHeight}
                onChange={e => this.changeConfig('listMaxHeight', e.target.value)}
              />
            </div>
            <div className="row">
              <span>listWidth</span>
              <input
                className="option single"
                type="text"
                defaultValue={this.state.listWidth}
                onChange={e => this.changeConfig('listWidth', e.target.value)}
              />
            </div>

            <div className="row">
              <span>MaxLength </span>
              <input
                className="option single"
                type="text"
                defaultValue={this.state.maxLength}
                onBlur={e => this.changeConfig('maxLength', parseFloat(e.target.value))}
              />
            </div>

            <div className="row">
              <span>Disabled </span>
              <input
                className="option"
                type="checkbox"
                defaultValue={this.state.disabled}
                onChange={e => this.changeConfig('disabled', e.target.checked)}
              />
            </div>
            <div className="row">
              <span>Change Items </span>
              <Button
                type="primary"
                size="sm"
                onClick={() => this.changeItems()}
              >Change</Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
