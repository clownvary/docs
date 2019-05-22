import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

import { L10nProvider, Form, Combobox, DateInput, Button } from '../src'

const localeStr =
  'de_DE,de_AT,de_CH,en_AU,en_CA,en_GB,en_ZA,en_IE,en_NZ,en_US,es_ES,fr_CA,fr_FR,fr_CH,it_IT,it_CH,pt_BR,sv_SE,zh_CN'
const localeData = localeStr.split(',').map(l => ({
  text: l,
  value: l,
}))

class App extends React.PureComponent {
  state = {
    locale: 'en_US',
  }

  handleLocaleChange = ({ value }) => {
    this.setState({ locale: value })
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
                fields={{ date: '2017-07-12' }}
                onSubmit={values => alert(JSON.stringify(values, null, 4))}
              >
                <Form.HField
                  name="locale"
                  label="Locale"
                  defaultValue={this.state.locale}
                  component={Combobox}
                  data={localeData}
                  onChange={this.handleLocaleChange}
                />
                <Form.HField
                  name="date"
                  label="Date"
                  component={DateInput}
                  required
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
