import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

import {
  L10nProvider,
  Form,
  AddressEditor,
  Combobox,
  Button,
  EmailInput,
  Row,
  Col,
} from '../src'

const localeStr =
  'de_DE,de_AT,de_CH,en_AU,en_CA,en_GB,en_ZA,en_IE,en_NZ,en_US,es_ES,fr_CA,fr_FR,fr_CH,it_IT,it_CH,pt_BR,sv_SE,zh_CN'
const localeData = localeStr.split(',').map(l => ({
  text: l,
  value: l,
}))
const fields = {
  firstName: {
    label: 'First Name',
    value: 'i am a default value',
    rules: 'required|min:2|max:20',
  },
  email: {
    label: 'Email',
    value: '1@1.com',
    rules: 'required',
    component: EmailInput,
  },
  address: {
    layout: Form.Field,
    label: 'Address',
    component: AddressEditor,
    value: {
      country: 'US',
      line1: 'line1',
      line2: 'line2',
      city: 'city1\ncity2',
      stateProvince: 'AE',
      postalCode: '121212',
    },
  },
}

class App extends React.PureComponent {
  state = {
    locale: 'zh_CN',
    fields,
  }

  handleLocaleChange = ({ value }) => {
    this.setState({ locale: value })
  }

  // handleChange = ({ fields }) => {
  //   this.setState({ fields })
  // }

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
                onSubmit={values => alert(JSON.stringify(values, null, 4))}
              >
                {({ changed, fields }) => (
                  <div>
                    <Form.Error />
                    <Form.HField
                      name="locale"
                      label="Locale"
                      defaultValue={this.state.locale}
                      component={Combobox}
                      data={localeData}
                      onChange={this.handleLocaleChange}
                    />
                    {fields}
                    <Row justify="between">
                      <Col>
                        <Button disabled={!changed} noSubmit>
                          Cancel
                        </Button>
                      </Col>
                      <Col>
                        <Button disabled={!changed}>Submit</Button>
                      </Col>
                    </Row>
                  </div>
                )}
              </Form>
            </div>
          </div>
        </L10nProvider>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'))
