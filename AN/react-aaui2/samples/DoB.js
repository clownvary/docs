import React from 'react'
import ReactDOM from 'react-dom'

import { Button, DoB, Form, Combobox } from '../src'

import L10nProvider from '../src/shared/L10nProvider'

const localeStr =
  'de_DE,de_AT,de_CH,en_AU,en_CA,en_GB,en_ZA,en_IE,en_NZ,en_US,es_ES,fr_CA,fr_FR,fr_CH,it_IT,it_CH,pt_BR,sv_SE,zh_CN'
const localeData = localeStr.split(',').map(l => ({
  text: l,
  value: l,
}))

class App extends React.Component {
  state = {
    locale: 'en_US',
  }

  handleLocaleChange = ({ value }) => {
    this.setState({ locale: value })
  }

  handleChange = v => {
    console.log(v.values)
  }

  render() {
    return (
      <div className="container">
        <div style={{ marginTop: '100px' }}>
          <L10nProvider locale={this.state.locale}>
            <Form onChange={this.handleChange}>
              <Form.HField
                name="locale"
                label="Locale"
                defaultValue={this.state.locale}
                component={Combobox}
                data={localeData}
                onChange={this.handleLocaleChange}
              />
              <Form.HField
                defaultValue={new Date('2012-01-31')}
                className="test-class"
                name="dob"
                label="dob"
                required
                component={DoB}
              />
            </Form>
          </L10nProvider>
        </div>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'))
