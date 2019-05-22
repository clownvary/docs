import React from 'react';
import { IntlProvider, addLocaleData } from 'react-intl';
import fr from 'react-intl/locale-data/fr';
import zh from 'react-intl/locale-data/zh';
import { GlobalizeSink, Globalize } from 'src/services/i18n';
import * as NumericType from 'src/consts/NumericType';
import pickProps from '../../App/utils/pickProps';
import { Form, Group } from '../../App/components/Form';
import DemoPage from '../../App/components/DemoPage';
import initSettings from './initSettings';

addLocaleData(fr);
addLocaleData(zh);

/* eslint-disable max-len */
export default class Page extends DemoPage {
  static meta = {
    name: 'Formatter',
    icon: 'icon-gbp',
    description: 'This example demonstrates the features of Globalize Formatter.'
  }

  constructor(props) {
    super(props);

    Globalize.ANDateFormat = 'DD/MMM/YYYY';
    Globalize.ANTimeFormat = 'HH:mm:ss';

    const formatedDate = '03/02/2018';
    const formatedTime = '03:01:59';
    const numeric = 12345.6;
    const strNumeric = '-$12_3345';

    this.state.today = Globalize.formatDateTime(Globalize.getToday());
    this.state.formatedDate = formatedDate;
    this.state.parsedDate = Globalize.parseDate(formatedDate, Globalize.ANDateFormat).toDate();
    this.state.customDateFormat = 'DD MMM YY';
    this.state.customFormatedDate = Globalize.formatDate(this.state.parsedDate, this.state.customDateFormat);
    this.state.formatedTime = formatedTime;
    this.state.parsedTime = Globalize.parseTime(formatedTime, Globalize.ANTimeFormat).toDate();
    this.state.customTimeFormat = 'H:mm:ss';
    this.state.customFormatedTime = Globalize.formatDate(this.state.parsedTime, this.state.customTimeFormat);
    this.state.numeric = numeric;
    this.state.strNumeric = strNumeric;
  }

  getInitSettings() {
    return initSettings;
  }

  onSettingChange(e) {
    super.onSettingChange(e);
    const newSettingVal = e.value;
    const {
      parsedDate,
      parsedTime
    } = this.state;

    if (e.name === 'dateFormat') {
      Globalize.ANDateFormat = newSettingVal;
      this.setState({
        formatedDate: Globalize.formatDate(parsedDate, newSettingVal),
        today: Globalize.formatDateTime(Globalize.getToday())
      });
    }

    if (e.name === 'timeFormat') {
      Globalize.ANTimeFormat = newSettingVal;
      this.setState({
        today: Globalize.formatDateTime(Globalize.getToday()),
        formatedTime: Globalize.formatTime(parsedTime, newSettingVal)
      });
    }
  }

  onIntlChange = () => {
    this.updateText();
  }

  updateText() {
    const {
      parsedDate,
      parsedTime,
      customDateFormat,
      customTimeFormat
    } = this.state;

    this.setState({
      today: Globalize.formatDateTime(Globalize.getToday()),
      formatedDate: Globalize.formatDate(parsedDate),
      formatedTime: Globalize.formatTime(parsedTime),
      customFormatedDate: Globalize.formatDate(parsedDate, customDateFormat),
      customFormatedTime: Globalize.formatTime(parsedTime, customTimeFormat)
    });
  }

  renderContent() {
    const {
      settings,
      today,
      formatedDate,
      formatedTime,
      customFormatedDate,
      customDateFormat,
      customTimeFormat,
      customFormatedTime,
      numeric,
      strNumeric
    } = this.state;
    const props = pickProps(settings, ['locale']);
    const customFormatterStyle = { color: 'red', fontSize: '14px' };

    return (
      <div>
        <IntlProvider
          {...props}
        >
          <div>
            <GlobalizeSink onIntlChange={e => this.onIntlChange(e)} />
            <Form title="Formatter" size="lg">
              <Group>
                <span className="field-label">Date Format:</span>
                <div className="field">{ formatedDate }</div>
              </Group>
              <Group>
                <span className="field-label">Date Format <b>Custom</b>:</span>
                <div className="field">{ customFormatedDate } (<span style={customFormatterStyle}>{customDateFormat}</span>)</div>
              </Group>
              <Group>
                <span className="field-label">Time Format:</span>
                <div className="field">{ formatedTime }</div>
              </Group>
              <Group>
                <span className="field-label">Time Format <b>Custom</b>:</span>
                <div className="field">{ customFormatedTime } (<span style={customFormatterStyle}>{customTimeFormat}</span>)</div>
              </Group>
              <Group>
                <span className="field-label">Format Date Time:</span>
                <span className="field">{today}</span>
              </Group>
              <Group>
                <span className="field-label">Format Currency({numeric}):</span>
                <span className="field">{Globalize.formatNumeric(numeric, NumericType.CURRENCY)}</span>
              </Group>
              <Group>
                <span className="field-label">Format Currency({numeric}) <b>Custom</b>:</span>
                <span className="field">{Globalize.formatNumeric(numeric, NumericType.CURRENCY, false, { decimals: 0, currencySymbol: '¥' })} (<span style={customFormatterStyle}>decimals: 0, currencySymbol: ¥, round: false</span>)</span>
              </Group>
              <Group>
                <span className="field-label">Format Decimal({numeric}):</span>
                <span className="field">{Globalize.formatNumeric(numeric)}</span>
              </Group>
              <Group>
                <span className="field-label">Format Decimal({numeric}) <b>Custom</b>:</span>
                <span className="field">{Globalize.formatNumeric(numeric, false, { decimals: 4, groupSizes: [4], groupSep: ' ' })} (<span style={customFormatterStyle}>decimals: 4, groupSizes: [4], groupSep: ' '</span>)</span>
              </Group>
              <Group>
                <span className="field-label">Format Percent({numeric}):</span>
                <span className="field">{Globalize.formatNumeric(numeric, NumericType.PERCENT)}</span>
              </Group>
              <Group>
                <span className="field-label">Format Percent({numeric}) <b>Custom</b>:</span>
                <span className="field">{Globalize.formatNumeric(numeric, NumericType.PERCENT, { decimals: 0 })} (<span style={customFormatterStyle}>(decimals: 0</span>)</span>
              </Group>
              <Group>
                <span className="field-label">Parse Currency({strNumeric}):</span>
                <span className="field">{Globalize.parseNumeric(strNumeric, undefined, { decimalSep: '_' })}</span>
              </Group>
            </Form>
          </div>
        </IntlProvider>
      </div>
    );
  }

}

