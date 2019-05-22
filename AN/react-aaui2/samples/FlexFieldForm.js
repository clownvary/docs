import React from 'react'
import ReactDOM from 'react-dom'
import { Form, Button, Row, Col } from '../src'

import L10nProvider from '../src/shared/L10nProvider'

const {
  FlexField,
  TextInput,
  EmailInput,
} = Form

const initFields = {
  name: 'Zhang',
  email: 'kzhang@active.com',
}

class App extends React.PureComponent {
  state = {
    fields: initFields,
  }

  handleChange = ({ fields, values, errors }) => {
    this.setState({
      values: fields,
      errors,
    })
    console.log(`values ${JSON.stringify(values, null, 4)}`)
  }

  render() {
    const {
      locale,
      fields,
    } = this.state

    return (
      <div
        className="container"
        style={{
          marginTop: '100px',
          fontFamily: 'ProximaNova, Arial, sans-serif',
        }}
      >
        <L10nProvider locale={locale}>
          <Row gutter={15}>
            <Col span={8}>
              <Form
                fields={fields}
                onChange={this.handleChange}
                onSubmit={values => alert(JSON.stringify(values, null, 4))}
                className="form--flex"
              >
                {({ changed }) =>
                  <div>
                    <FlexField
                      name="name"
                      label="Name"
                      rules="min:2|max:10"
                      component={TextInput}
                      required
                    />
                    <FlexField
                      name="email"
                      label="Email"
                      component={EmailInput}
                      required
                    />
                    <Button disabled={!changed}>Submit</Button>
                  </div>}
              </Form>
            </Col>
          </Row>
        </L10nProvider>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'))
