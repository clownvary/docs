import React, { PureComponent } from 'react'
import ReactDOM from 'react-dom'

import { L10nProvider, L10nMessage, Form } from '../src'

const { Error: FormError, Field, AddressEditor, TextInput, EmailInput } = Form
const initFields = {
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
    layout: Field,
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

const displayErrors = ({ errors }) => (
  <p>
    {Object.keys(errors).map(key => {
      const error = errors[key]
      let finalError = error

      if (typeof error === 'string') {
        finalError = (
          <span>
            {key}: <L10nMessage id={error} />
          </span>
        )
      }

      if (Object.prototype.toString.call(error) === '[object Object]') {
        finalError = displayErrors({ errors: error })
      }

      return (
        <div key={key}>
          {finalError} <br />
        </div>
      )
    })}
  </p>
)

class App extends PureComponent {
  render() {
    return (
      <div
        className="container"
        style={{
          marginTop: '100px',
          fontFamily: 'ProximaNova, Arial, sans-serif',
        }}
      >
        <L10nProvider>
          <Form fields={initFields}>
            {({ changed, fields }) => (
              <div>
                <FormError>{displayErrors}</FormError>
                {fields}
              </div>
            )}
          </Form>
        </L10nProvider>
      </div>
    )
  }
}
ReactDOM.render(<App />, document.getElementById('root'))
