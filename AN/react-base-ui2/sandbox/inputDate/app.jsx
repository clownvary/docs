import React from 'react';
import moment from 'moment';
import { IntlProvider, addLocaleData } from 'react-intl';
import fr from 'react-intl/locale-data/fr';
import zh from 'react-intl/locale-data/zh';
import cloneDeep from 'lodash/cloneDeep';
import map from 'lodash/map';
import Button from 'src/components/Button';
import { GlobalizeSink, Globalize } from 'src/services/i18n';
import InputDate from 'src/components/InputDate';

import '../base.less';
import '../layout.less';
import './app.less';

addLocaleData(fr);
addLocaleData(zh);

class App extends React.PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      logMsgs: [],
      min: null,
      max: null
    };

    Globalize.ANDateFormat = 'MMM DD, YYYY';
    Globalize.ANTimeFormat = 'H:mm';

    if (location.search && location.search.indexOf('&') > -1) {
      const dateFormatMatch = location.search.match(/d=(.+?)&/);
      if (dateFormatMatch) {
        Globalize.ANDateFormat = decodeURI(dateFormatMatch[1]);
      }

      const timeFormatMatch = location.search.match(/t=(.+?)$/);
      if (timeFormatMatch) {
        Globalize.ANTimeFormat = decodeURI(timeFormatMatch[1]);
      }
    }
  }

  componentDidMount() {
    if (location.search && location.search.indexOf('&') > -1) {
      const dateFormatMatch = location.search.match(/d=(.+?)&/);
      if (dateFormatMatch) {
        this.dateFormat.value = decodeURI(dateFormatMatch[1]);
      }

      const timeFormatMatch = location.search.match(/t=(.+?)$/);
      if (timeFormatMatch) {
        this.timeFormat.value = decodeURI(timeFormatMatch[1]);
      }
    }
  }

  componentDidUpdate() {
    this.logElement.scrollTop = this.logElement.scrollHeight;
  }

  onValueChange(e) {
    this.log(e.value ? e.value.toString() : 'Blank value');
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

    const locale = 'en';
    return (

      <div>
        <div className="sample-content">
          <IntlProvider
            locale={locale}
          >
            <div className="sample-form small">
              <GlobalizeSink />
              <h3>
              Date formats used in ActiveNet:
            </h3>
              <div className="row">
                <span className="field-label">DD/MMM/YYYY:</span>
                <div className="field field-date">
                  <InputDate
                    showTrigger
                    format="DD/MMM/YYYY"
                    onValueChange={(e) => { this.onValueChange(e); }}
                  />
                </div>
              </div>

              <div className="row">
                <span className="field-label">MMM/DD/YYYY:</span>
                <div className="field field-date">
                  <InputDate
                    format="MMM/DD/YYYY"
                    showTrigger
                    onValueChange={(e) => { this.onValueChange(e); }}
                  />
                </div>
              </div>

              <div className="row">
                <span className="field-label">YYYY/MMM/DD:</span>
                <div className="field field-date">
                  <InputDate
                    format="YYYY/MMM/DD"
                    showTrigger
                    onValueChange={(e) => { this.onValueChange(e); }}
                  />
                </div>
              </div>

              <div className="row">
                <span className="field-label">DD MMM YYYY:</span>
                <div className="field field-date">
                  <InputDate
                    showTrigger
                    format="DD MMM YYYY"
                    onValueChange={(e) => { this.onValueChange(e); }}
                  />
                </div>
              </div>

              <div className="row">
                <span className="field-label">MMM DD, YYYY:</span>
                <div className="field field-date">
                  <InputDate
                    format="MMM DD, YYYY"
                    showTrigger
                    onValueChange={(e) => { this.onValueChange(e); }}
                  />
                </div>
              </div>

              <div className="row">
                <span className="field-label">YYYY MMM DD:</span>
                <div className="field field-date">
                  <InputDate
                    format="YYYY MMM DD"
                    showTrigger
                    onValueChange={(e) => { this.onValueChange(e); }}
                  />
                </div>
              </div>
            </div>
          </IntlProvider>

          <div className="sample-form">
            <h3>
              In ANet, we use below 3 date formats with Globalize and min/max:
            </h3>
            <div className="row">
              <span className="field-label">d:</span>
              <div className="field">
                <InputDate
                  min={this.state.min}
                  max={this.state.max}
                  placeHolder="Start date"
                  showTrigger
                  onValueChange={(e) => { this.onValueChange(e); }}
                />
              </div>
            </div>

            <div className="row">
              <span className="field-label">t:</span>
              <div className="field">
                <InputDate
                  min={this.state.min}
                  max={this.state.max}
                  showTrigger
                  format="t"
                  onValueChange={(e) => { this.onValueChange(e); }}
                />
              </div>
            </div>

            <div className="row">
              <span className="field-label">f:</span>
              <div className="field">
                <InputDate
                  min={this.state.min}
                  max={this.state.max}
                  showTrigger
                  format="f"
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
              <span className="field-label">MMMM/DD YYYY:</span>
              <div className="field">
                <InputDate
                  showTrigger
                  format="MMMM/DD YYYY"
                  onValueChange={(e) => { this.onValueChange(e); }}
                />
              </div>
            </div>
            <div className="row">
              <span className="field-label">dddd DD/MM/YYYY:</span>
              <div className="field">
                <InputDate
                  showTrigger
                  format="dddd DD/MM/YYYY"
                  onValueChange={(e) => { this.onValueChange(e); }}
                />
              </div>
            </div>
            <div className="row">
              <span className="field-label">[Start date:] DD/MM/YYYY:</span>
              <div className="field">
                <InputDate
                  showTrigger
                  format="[Start date:] DD/MM/YYYY"
                  onValueChange={(e) => { this.onValueChange(e); }}
                />
              </div>
            </div>
          </div>
        </div>


        <div className="side-bar">
          <div className="options">
            <div className="row">
              <span>min:</span>
              <select
                ref={(s) => { this.min = s; }}
                onChange={(e) => {
                  const v = e.target.value;
                  const min = v ? moment(v) : null;
                  this.setState({ min });
                }}
              >
                <option value="" />
                {
                  map(Array(12), (item, index) => {
                    const date = moment().add((index + 1) * -1, 'M');
                    return (<option key={`min_${index}`} value={date.format()}>{date.format(Globalize.ANDateFormat)}</option>);
                  })
                }
              </select>
            </div>
            <div className="row">
              <span>max:</span>
              <select
                ref={(s) => { this.max = s; }}
                onChange={(e) => {
                  const v = e.target.value;
                  const max = v ? moment(v) : null;
                  this.setState({ max });
                }}
              >
                <option value="" />
                {
                  map(Array(12), (item, index) => {
                    const date = moment().add(index + 1, 'M');
                    return (<option key={`max_${index}`} value={date.format()}>{date.format(Globalize.ANDateFormat)}</option>);
                  })
                }
              </select>
            </div>
            <div className="row">
              <span>System Date Format:</span>
              <select
                ref={(s) => { this.dateFormat = s; }}
                onChange={(e) => { location.href = `index.html?d=${e.target.value}&t=${this.timeFormat.value}`; }}
                defaultValue={Globalize.ANDateFormat}
              >
                <option value="DD MMM YYYY">DD/MM/YYYY</option>
                <option value="MMM DD, YYYY">MM/DD/YYYY</option>
                <option value="YYYY MMM DD">YYYY/MM/DD</option>
              </select>
            </div>
            <div className="row">
              <span>System Time Format:</span>
              <select
                ref={(s) => { this.timeFormat = s; }}
                onChange={(e) => { location.href = `index.html?d=${this.dateFormat.value}&t=${e.target.value}`; }}
                defaultValue={Globalize.ANTimeFormat}
              >
                <option value="h:mm A">h:mm a</option>
                <option value="H:mm">H:mm</option>
              </select>
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
