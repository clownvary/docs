import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

import {
  L10nProvider,
  Form,
  Combobox,
  CurrencyInput,
  L10nCurrency,
  Button,
} from '../src'

import { localeData, currenciesData } from './DATA'

class App extends React.PureComponent {
  state = {
    locale: 'en_US',
    code: 'JPY',
    fields: {
      price: 1234,
    },
  }

  handleLocaleChange = ({ value }) => {
    this.setState({ locale: value })
  }

  handleCurrencyChange = ({ value }) => {
    this.setState({ code: value })
  }

  handleChange = ({ values }) => {
    this.setState({
      fields: values,
    })
  }

  handleSubmit = values => {
    console.log(JSON.stringify(values, null, 4))
  }

  render() {
    return (
      <div
        className="container"
        style={{
          marginTop: '100px',
          fontFamily: 'ProximaNova, Arial, sans-serif',
        }}
      >
        <L10nProvider locale={this.state.locale}>
          <div className="grid">
            <div className="grid-u-8-12">
              <Form
                fields={this.state.fields}
                onChange={this.handleChange}
                onSubmit={this.handleSubmit}
              >
                <Form.HField
                  name="locale"
                  label="Locale"
                  defaultValue={this.state.locale}
                  component={Combobox}
                  maxHeight="320px"
                  data={localeData}
                  onChange={this.handleLocaleChange}
                />
                <Form.HField
                  name="currency"
                  label="Currency"
                  defaultValue={this.state.code}
                  component={Combobox}
                  maxHeight="320px"
                  data={currenciesData}
                  onChange={this.handleCurrencyChange}
                />
                <Form.HField
                  name="price"
                  label="Price"
                  component={CurrencyInput}
                  code={this.state.code}
                  required
                />
                <Form.HField
                  amount={parseFloat(this.state.fields.price)}
                  code={this.state.code}
                  component={L10nCurrency}
                />
                <div>
                  <Button>Submit</Button>
                </div>
              </Form>
            </div>
          </div>
        </L10nProvider>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'))
