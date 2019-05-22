import React from 'react';
import ReactDOM from 'react-dom';
import { IntlProvider, addLocaleData } from 'react-intl';
import fr from 'react-intl/locale-data/fr';
import zh from 'react-intl/locale-data/zh';
import find from 'lodash/find';
import map from 'lodash/map';
import Dropdown from 'src/components/Dropdown';


import { GlobalizeSink, Globalize } from 'src/services/i18n';
import InputDate from 'src/components/InputDate';
import Button from 'src/components/Button';
import Form from './form';

import '../base.less';
import '../layout.less';
import './app.less';

addLocaleData(fr);
addLocaleData(zh);

const locales = [
  { text: 'English', value: 'en' },
  { text: 'French', value: 'fr' },
  { text: 'Chinese', value: 'zh' }
];

class App extends React.PureComponent {

  constructor(props) {
    super(props);

    // mock data
    Globalize.ANTimeZoneOffset = -8;

    this.state = {
      locale: 'en',
      culture: '',
      today: Globalize.getToday()
    };
  }

  onIntlChange = (e) => {
    const locale = e.intl.locale;
    const culture = Globalize.getCulture(locale);
    if (culture) {
      this.setState({
        culture: JSON.stringify(culture, undefined, 2)
      });
    }
  }

  onPopup = () => {
    /* eslint-disable react/no-find-dom-node */
    const btn = ReactDOM.findDOMNode(this.btnPopup);
    /* eslint-enable react/no-find-dom-node */
    Form.popup({ target: btn, showShadow: true });
  }

  getToday = () => {
    this.setState({ today: Globalize.getToday() });
  }

  render() {
    const { locale = '', culture } = this.state;
    const lang = find(locales, l => l.value === locale);

    return (

      <div>
        <IntlProvider
          locale={locale}
        >
          <div className="sample-content">
            <GlobalizeSink onIntlChange={e => this.onIntlChange(e)} />
            <h3>Current locale is {lang.text}</h3>
            <hr />
            <Form />
            <br />
            <Button
              type="primary"
              className="button_popup"
              ref={(c) => { this.btnPopup = c; }}
              onClick={() => { this.onPopup(); }}
            >
              Popup service is globalized too, have a try!
            </Button>
            <br />
            <br />
            <Button
              type="primary"
              className="button_popup"
              onClick={() => this.getToday()}
            >
              refresh today time
            </Button>
            <span>{ this.state.today.toString() }</span>
            <br />
            <br />
            <br />
            <div className="sample-form">
              <div className="row">
                <span className="field-label">DD/MMM/YYYY:</span>
                <div className="field">
                  <InputDate
                    showTrigger
                    format="DD/MMM/YYYY"
                  />
                </div>
              </div>
            </div>
            <br />
            <h4>Culture data:</h4>
            <pre className="sample-code">
              {culture}
            </pre>
          </div>
        </IntlProvider>
        <div className="side-bar">
          <div className="options">
            <div className="row">
              <span>Locals: </span>
              <Dropdown
                data={locales}
                defaultValue={this.state.locale}
                onChange={({ value }) => {
                  this.setState({
                    locale: value
                  });
                }}
              />
            </div>

            <div className="row">
              <span>Time Zone: </span>
              <Dropdown
                data={map(Array(17), (v, i) => {
                  const offset = i - 8;
                  return {
                    text: `${offset}`,
                    value: offset
                  };
                })}
                defaultValue={GlobalizeSink.ANTimeZoneOffset}
                onChange={({ value }) => {
                  Globalize.ANTimeZoneOffset = parseInt(value, 10);
                  this.getToday();
                }}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
