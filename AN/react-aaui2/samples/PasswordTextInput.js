import React from 'react'
import ReactDOM from 'react-dom'

import Form, {
  FlexField,
  Error as FormError,
  PasswordTextInput,
} from '../src/form'

class App extends React.PureComponent {
  render() {
    return (
      <div
        className="container"
        style={{
          marginTop: '100px',
          fontFamily: 'ProximaNova, Arial, sans-serif',
        }}
      >
        <Form>
          {({ changed }) => (
            <div>
              <FormError />
              <FlexField
                label="Password"
                name="password"
                value="123456"
                component={PasswordTextInput}
              />
            </div>
          )}
        </Form>
      </div>
    )
  }
}
ReactDOM.render(<App />, document.getElementById('root'))
