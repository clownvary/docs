import React from 'react'
import ReactDOM from 'react-dom'

import {
  L10nProvider,
  AddressStatic,
  Button,
  Form,
  Combobox,
  AddressEditor,
} from '../src'

import { localeData } from './DATA'

class App extends React.PureComponent {
  state = {
    locale: 'en_US',
    fields: {
      locale: 'en_US',
      address: {
        value: {
          country: 'US',
          line1: {
            value: 'line1',
            validator: ({ value }) => result => {
              // if (value === 'bill') {
              //   result.errMsg = ''
              // } else {
              //   result.errMsg = 'i am not bill'
              // }

              return result
            },
          },
          line2: {
            value: 'line2xxxxxx-xxxxx-----oooo',
          },
          city: 'city',
          stateProvince: 'AE',
          postalCode: '11111',
        },
      },
    },
  }

  componentDidMount() {
    // setInterval(() => {
    //   this.setState({
    //     fields: {
    //       locale: 'zh_CN',
    //       address: {
    //         value: {
    //           country: '',
    //           line1: '',
    //           line2: '',
    //           city: '',
    //           stateProvince: '',
    //           postalCode: '',
    //         },
    //       },
    //     },
    //   })
    // }, 3000)
  }

  handleLocaleChange = ({ value }) => {
    this.setState({ locale: value })
  }

  handleChange = ({ fields, values, errors }) => {
    // console.log('fields ' + JSON.stringify(fields, null, 4))
    // console.log('values ' + JSON.stringify(values, null, 4))
    // console.log('errors ' + JSON.stringify(errors, null, 4))
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
          <Form
            fields={this.state.fields}
            onChange={this.handleChange}
            onSubmit={values => alert(JSON.stringify(values, null, 4))}
          >
            {({ changed }) =>
              <div>
                <Form.Error />
                <Form.HField
                  name="locale"
                  label="Locale"
                  component={Combobox}
                  data={localeData}
                  onChange={this.handleLocaleChange}
                />
                <Form.Field name="address" component={AddressEditor} />
                <hr />
                <Form.Field static name="address" component={AddressEditor} />
                <hr />
                <Form.Field
                  nowrap
                  name="address"
                  component={({ value, ...rest }) =>
                    <AddressStatic address={value} {...rest} />}
                />
                <hr />
                <Button disabled={!changed} type="submit">
                  Submit
                </Button>
              </div>}
          </Form>
        </L10nProvider>
      </div>
    )
  }
}
ReactDOM.render(<App />, document.getElementById('root'))
