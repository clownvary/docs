import React, { PureComponent } from 'react'
import ReactDOM from 'react-dom'

import { RadioGroup, Radio } from '../src/radio'
import Row from '../src/grid/Row'
import Col from '../src/grid/Col'

const radioGroupData = [
  {
    text: 'Basketball(with data)',
    value: 'basketball',
    'data-qa-id': 'kfldsfjslfjl',
  },
  { text: 'Tennis(with data)', value: 'tennis' },
  { text: 'Swimming(with data)', value: 'swimming' },
]

class App extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      value: 'tennis',
      anotherValue: 'basketball',
      radioValue: 'swimming',
    }
  }

  handleChange = e => {
    console.log(e.target.value)
    this.setState({
      value: e.target.value,
    })
  }

  handleAnotherChange = e => {
    console.log(e.target.value)
    this.setState({
      anotherValue: e.target.value,
    })
  }

  handleRadioChange = (e, value) => {
    console.log(e.target.value)
    this.setState({
      radioValue: value,
    })
  }

  handleRadioGroupDataChange = e => {
    console.log(e.target.value)
  }

  render() {
    return (
      <div className="container" style={{ marginTop: '100px' }}>
        <RadioGroup
          name="sports"
          value={this.state.value}
          onChange={this.handleChange}
        >
          <Radio value="basketball">Basketball</Radio>
          <Radio value="tennis">Tennis</Radio>
          <Radio value="swimming">Swimming</Radio>
        </RadioGroup>
        <hr />
        <RadioGroup
          value={this.state.anotherValue}
          onChange={this.handleAnotherChange}
        >
          <Row>
            <Col span={2}>Label</Col>
            <Col span={8}>
              <Radio value="basketball">Basketball</Radio>
            </Col>
          </Row>
          <Row>
            <Col span={2}>Label</Col>
            <Col span={8}>
              <Radio value="tennis">Tennis</Radio>
            </Col>
          </Row>
          <Row>
            <Col span={2}>Label</Col>
            <Col span={8}>
              <Radio value="swimming">Swimming</Radio>
            </Col>
          </Row>
        </RadioGroup>
        <hr />
        <RadioGroup
          defaultValue="basketball"
          data={radioGroupData}
          name="xxxx-sports"
          onChange={this.handleRadioGroupDataChange}
        />
        <hr />
        <RadioGroup disabled value={2}>
          <Radio value={1}>1</Radio>
          <Radio value={2}>2</Radio>
          <Radio value={3}>3</Radio>
        </RadioGroup>
        <hr />
        <p>
          Without RadioGroup then you must bind <code>onChange</code> event by
          yourself
        </p>
        <Radio
          value="basketball"
          name="another-sports"
          checked={this.state.radioValue === 'basketball'}
          onChange={e => this.handleRadioChange(e, 'basketball')}
        >
          Basketball
        </Radio>
        <Radio
          value="tennis"
          name="another-sports"
          checked={this.state.radioValue === 'tennis'}
          onChange={e => this.handleRadioChange(e, 'tennis')}
        >
          Tennis
        </Radio>
        <Radio
          value="swimming"
          name="another-sports"
          checked={this.state.radioValue === 'swimming'}
          onChange={e => this.handleRadioChange(e, 'swimming')}
        >
          Swimming
        </Radio>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'))
