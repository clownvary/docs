import React from 'react';
import { IntlProvider, addLocaleData } from 'react-intl';
import fr from 'react-intl/locale-data/fr';
import zh from 'react-intl/locale-data/zh';
import { GlobalizeSink, Globalize } from 'src/services/i18n';
import * as NumericType from 'src/consts/NumericType';
import InputDateTime from 'src/components/InputDateTime';
import InputNumeric from 'src/components/InputNumeric';
import pickProps from '../../App/utils/pickProps';
import { Form, Group } from '../../App/components/Form';
import DemoPage from '../../App/components/DemoPage';
import initSettings from './initSettings';


addLocaleData(fr);
addLocaleData(zh);


export default class Page extends DemoPage {
  static meta = {
    name: 'Globalize Service',
    icon: 'icon-globe',
    description: 'This example demonstrates the features of Globalize Service.'
  }

  constructor(props) {
    super(props);

    const { settings } = this.state;
    this.state.localeText = settings.locale.toString();
    this.state.today = Globalize.getToday();
  }

  getInitSettings() {
    return initSettings;
  }

  onSettingChange(e) {
    super.onSettingChange(e);

    if (e.name === 'locale') {
      this.setState({
        localeText: e.spec.toString(),
        today: Globalize.getToday()
      });
    }

    if (e.name === 'timeZone') {
      Globalize.ANTimeZoneOffset = e.value;
      this.setState({
        today: Globalize.getToday()
      });
    }

    if (e.name === 'customSymbol') {
      this.updateText();
    }
  }

  onIntlChange = () => {
    this.updateText();
  }

  updateText() {
    const { settings } = this.state;
    const props = pickProps(settings, ['customSymbol']);
    const { customSymbol } = props;
    const text = Globalize.formatNumeric('1234', NumericType.CURRENCY, { currencySymbol: customSymbol });
    this.setState({
      text
    });
  }

  renderContent() {
    const { settings, localeText, today, text } = this.state;
    const props = pickProps(settings, ['locale', 'timeZone', 'customSymbol']);
    const { timeZone, locale } = props;

    return (
      <div>
        <IntlProvider
          {...props}
        >
          <div>
            <GlobalizeSink onIntlChange={e => this.onIntlChange(e)} />
            <Form title={localeText} style={{ width: '530px' }}>
              <Group>
                <span className="field-label">Timezone:</span>
                <h4 className="field">{timeZone}</h4>
              </Group>
              <Group>
                <span className="field-label">Now:</span>
                <span className="field">
                  <InputDateTime
                    value={today}
                  />
                </span>
              </Group>
              <Group>
                <span className="field-label">Currency:</span>
                <span className="field">
                  <InputNumeric
                    type="currency"
                    locale={locale}
                    value={250.00}
                  />
                </span>
              </Group>
              <Group>
                <span className="field-label">Custom Format:</span>
                <span className="field">{text}</span>
              </Group>
            </Form>
          </div>
        </IntlProvider>
      </div>
    );
  }

}
