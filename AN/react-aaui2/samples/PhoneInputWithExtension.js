import React from 'react'
import ReactDOM from 'react-dom'

import { Form, PhoneInputWithExtension, Button } from '../src'

const App = () => (
  <div
    className="container"
    style={{
      marginTop: '100px',
      fontFamily: 'ProximaNova, Arial, sans-serif',
    }}
  >
    <div className="grid">
      <div className="grid-u-8-12">
        <Form
          fields={{ phone: '13313331333' }}
          onSubmit={values => alert(JSON.stringify(values, null, 4))}
        >
          <Form.HField
            name="phone"
            label="Phone"
            extensionName="phoneExtension"
            component={PhoneInputWithExtension}
            required
          />
          <div>
            <Button>Submit</Button>
          </div>
        </Form>
      </div>
    </div>
  </div>
)

ReactDOM.render(<App />, document.getElementById('root'))
