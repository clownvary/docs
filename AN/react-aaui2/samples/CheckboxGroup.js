import React, { PureComponent } from 'react'
import ReactDOM from 'react-dom'

import { CheckboxGroup, Checkbox } from '../src/Checkbox'
import Row from '../src/grid/Row'
import Col from '../src/grid/Col'

const checkboxGroupData = [
  {
    text: 'Basketball(with data)',
    value: 'basketball',
    'data-qa-id': 'klfsjksfljd',
  },
  { text: 'Tennis(with data)', value: 'tennis' },
  { text: 'Swimming(with data)', value: 'swimming' },
]

class App extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      value: [0, 1],
      anotherValue: ['basketball'],
    }
  }

  handleChange = value => {
    console.log(value)
    this.setState({
      value,
    })
  }

  handleAnotherChange = anotherValue => {
    console.log(anotherValue)
    this.setState({
      anotherValue,
    })
  }

  handleCheckboxGroupDataChange = value => {
    console.log(value)
  }

  render() {
    return (
      <div className="container" style={{ marginTop: '100px' }}>
        <CheckboxGroup value={this.state.value} onChange={this.handleChange}>
          <Checkbox value={0}>Basketball</Checkbox>
          <Checkbox value={1}>Tennis</Checkbox>
          <Checkbox value={false}>Swimming</Checkbox>
        </CheckboxGroup>
        <hr />
        <CheckboxGroup
          value={this.state.anotherValue}
          onChange={this.handleAnotherChange}
        >
          <Row>
            <Col span={2}>Label</Col>
            <Col span={8}>
              <Checkbox value="basketball">Basketball</Checkbox>
            </Col>
          </Row>
          <Row>
            <Col span={2}>Label</Col>
            <Col span={8}>
              <Checkbox value="tennis">Tennis</Checkbox>
            </Col>
          </Row>
          <Row>
            <Col span={2}>Label</Col>
            <Col span={8}>
              <Checkbox value="swimming">Swimming</Checkbox>
            </Col>
          </Row>
        </CheckboxGroup>
        <hr />
        <CheckboxGroup
          defaultValue={['basketball']}
          data={checkboxGroupData}
          onChange={this.handleCheckboxGroupDataChange}
        />
        <hr />
        <CheckboxGroup disabled value={[2]}>
          <Checkbox value={1}>1</Checkbox>
          <Checkbox value={2}>2</Checkbox>
          <Checkbox value={3}>3</Checkbox>
        </CheckboxGroup>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'))
