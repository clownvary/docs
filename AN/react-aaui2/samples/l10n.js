import React from 'react'
import ReactDOM from 'react-dom'
import {
  L10nProvider,
  Dropdown,
  L10nDateTime,
  L10nCurrency,
  AddressStatic,
} from '../src/index'

const localeStr =
  'de_DE,de_AT,de_CH,en_AU,en_CA,en_GB,en_ZA,en_IE,en_NZ,en_US,es_ES,fr_CA,fr_FR,fr_CH,it_IT,it_CH,pt_BR,sv_SE,zh_CN'
const localeData = localeStr.split(',').map(l => ({ text: l, value: l }))

const currencyFormat1 = {
  separateCount: 4,
  separator: '，',
}

const currencyFormat2 = {
  template: 'TheUSD {negative}{amount}',
  integerOnly: false,
  separationCount: 3,
  separator: ',',
  negativeMark: '-',
}

const address1 = {
  country: 'United States',
  line1: 'line1',
  line2: 'line2',
  city: 'city',
  stateProvince: 'California',
  postalCode: '11111',
}

const address2 = {
  country: 'China',
  line1: 'IFS first, 49f',
  city: 'Chengdu',
  stateProvince: 'SiChuang',
}

const addressConfig = {
  CA:
    '{address.country}, {address.stateProvince}\n{address.city}, {address.postalCode}\n{address.line1}\n{address.line2}',
}

class App extends React.Component {
  state = {
    locale: 'en_US',
    date: new Date(1493872225567),
  }

  render() {
    return (
      <L10nProvider locale={this.state.locale}>
        <div className="container">
          <div className="grid">
            <div className="grid-u-3-12">Change Locale:</div>
            <div className="grid-u-9-12">
              <Dropdown
                data={localeData}
                onChange={({ value }) => this.setState({ locale: value })}
                value={this.state.locale}
              />
            </div>
          </div>
          <br />
          <div className="grid">
            <div className="grid-u-3-12">Date Time:</div>
            <div className="grid-u-9-12">
              <p>
                Short date:{' '}
                <L10nDateTime date={this.state.date} format="SHORT_DATE" />
              </p>
              <p>
                Short time:{' '}
                <L10nDateTime date={this.state.date} format="SHORT_TIME" />
              </p>
              <p>
                Short datetime:{' '}
                <L10nDateTime date={this.state.date} format="SHORT_DATETIME" />
              </p>
              <p>
                Short date without year:{' '}
                <L10nDateTime
                  date={this.state.date}
                  format="SHORT_DATE_WITHOUT_YEAR"
                />
              </p>
              <p>
                Long date:{' '}
                <L10nDateTime date={this.state.date} format="LONG_DATE" />
              </p>
              <p>
                Long datetime:{' '}
                <L10nDateTime date={this.state.date} format="LONG_DATETIME" />
              </p>
              <p>
                Long day of week:{' '}
                <L10nDateTime date={this.state.date} format="LONG_DAYOFWEEK" />
              </p>
              <p>
                Time input:{' '}
                <L10nDateTime date={this.state.date} format="SHORT_TIME" />
              </p>
              <br />
              <p>
                Use template:{' '}
                <L10nDateTime
                  date={this.state.date}
                  format="yyyy-MM-dd EEEE KK:mm:ss SSS"
                />
              </p>
              <br />
              <p>
                No format: <L10nDateTime date={this.state.date} />
              </p>
              <p>
                No date: <L10nDateTime format="yyyy-MM-dd" />
              </p>
              <p>
                No format and no date: <L10nDateTime />
              </p>
            </div>
          </div>
          <br />
          <div className="grid">
            <div className="grid-u-3-12">Number:</div>
            <div className="grid-u-9-12">
              <p>
                Currency USD 1: <L10nCurrency amount="123456789" code="USD" />
              </p>
              <p>
                Currency USD 2: <L10nCurrency amount="-123456789" code="USD" />
              </p>
              <p>
                Currency USD 3:{' '}
                <L10nCurrency amount="123456789.12" code="USD" />
              </p>
              <p>
                Currency USD 4: <L10nCurrency amount="123.45" code="USD" />
              </p>
              <br />
              <p>
                Currency CAD: <L10nCurrency amount="123456789" code="CAD" />
              </p>
              <p>
                Currency JPY: <L10nCurrency amount="123456789" code="JPY" />
              </p>
              <p>
                Currency CNY: <L10nCurrency amount="123456789" code="CNY" />
              </p>
              <br />
              <p>
                Currency CNY with custom format:{' '}
                <L10nCurrency
                  amount="123456789"
                  format={currencyFormat1}
                  code="CNY"
                />
              </p>
              <p>
                Currency USD with custom format:{' '}
                <L10nCurrency amount="123456789" format={currencyFormat2} />
              </p>
              <br />
              <p>
                Currency without code: <L10nCurrency amount="123456789" />
              </p>
              <p>
                Currency without amount: <L10nCurrency code="USD" />
              </p>
              <p>
                Currency without anything: <L10nCurrency />
              </p>
            </div>
          </div>
          <br />
          <div className="grid">
            <div className="grid-u-3-12">Address:</div>
            <div className="grid-u-9-12">
              <p>
                {JSON.stringify(address1)}
              </p>
              <p>Address without any config :</p>
              <p>
                <AddressStatic address={address1} />
              </p>
              <br />
              <p>Address with locale CA :</p>
              <p>
                <AddressStatic address={address1} locale="CA" />
              </p>
              <br />
              <p>Address with address config :</p>
              <p>
                <AddressStatic
                  address={address1}
                  locale="CA"
                  countriesFormatConfig={addressConfig}
                />
              </p>
              <br />
              <br />
              <p>
                {JSON.stringify(address1)}
              </p>
              <p>Single line Address :</p>
              <p>
                <AddressStatic address={address1} nowrap />
              </p>
              <br />
              <br />
              <p>
                {JSON.stringify(address2)}
              </p>
              <p>Address with empty values :</p>
              <p>
                <AddressStatic address={address2} locale="CN" />
              </p>
            </div>
          </div>
          <br />
        </div>
      </L10nProvider>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'))
