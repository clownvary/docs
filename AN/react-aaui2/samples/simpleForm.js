import React, { PureComponent } from 'react'
import ReactDOM from 'react-dom'

import { Form, TextInput, Button, Row, Col } from '../src'

class SimpleForm extends PureComponent {
  render() {
    return (
      <div style={{ fontFamily: 'ProximaNova, Arial, sans-serif' }}>
        <Row>
          <Col span={5}>
            <Form>
              {({ changed, ...rest }) =>
                <div>
                  <Form.Error />
                  <Form.HField
                    name="name"
                    label="Name"
                    component={TextInput}
                    required
                  />

                  <Button disabled={!changed} type="submit">Submit</Button>
                </div>}
            </Form>
          </Col>
        </Row>
      </div>
    )
  }
}

ReactDOM.render(<SimpleForm />, document.getElementById('root'))
