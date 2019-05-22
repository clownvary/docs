import React from 'react';
import { AsyncContent, PlaceHolderType } from '../../src/components/AsyncContent';
import InputNumeric from '../../src/components/InputNumeric';

import '../base.less';
import '../layout.less';
import './app.less';

class App extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      placeHolder: 'loading',
      delay: 5000,
      placeHolderType: PlaceHolderType.TEXT
    };
  }

  onChangeLoadingText(e) {
    this.updateConfig('placeHolder', e.target.value);
  }

  updateConfig(configName, newConfigValue) {
    this.setState({ [configName]: newConfigValue });
  }

  render() {
    const {
      placeHolder,
      delay,
      placeHolderType
    } = this.state;
    return (
      <div>
        <div className="sample-content">
          <AsyncContent
            loader={() => new Promise((resolve, reject) => {
              if (new Date().getTime() % 10 === 1) {
                reject('error');
              } else {
                setTimeout(resolve, delay);
              }
            })}
            placeHolder={placeHolder}
            component={<div>this is a test</div>}
            placeHolderType={placeHolderType}
          />
        </div>

        <div className="side-bar">
          <div className="options">
            <div className="row">
              <span>Place Holder </span>
              <input
                defaultValue={placeHolder}
                onBlur={e => this.updateConfig('placeHolder', e.target.value)}
              />
            </div>

            <div className="row">
              <span>Delay </span>
              <InputNumeric
                min={0}
                max={60000}
                value={delay}
                decimals={0}
                onBlur={e => this.updateConfig('delay', e.value)}
                style={{ width: '140px' }}
              />
              ms
            </div>

            <div className="row">
              <span>Place Holder Type</span>
              <select defaultValue={placeHolderType} onChange={e => this.updateConfig('placeHolderType', e.target.value)}>
                {
                  Object.keys(PlaceHolderType).map((key, index) => (
                    <option
                      key={index}
                      value={PlaceHolderType[key]}
                    >
                      {key}
                    </option>
                  ))
                }
              </select>
            </div>
          </div>
        </div>
      </div>
    );
  }

}

export default App;
