import React, { Component } from 'react'

import { Alert, Button, DatePicker, RadioGroup, Radio } from '/lib/index'

class App extends Component {
  state = {
    isDisplayed: true,
  }

  closeAlert() {
    this.setState({ isDisplayed: false })
  }

  handleChange = e => {
    this.setState({
      selected: e.target.value,
    })
  }

  render() {
    return (
      <div id="content" style={{ fontFamily: 'sans-serif' }}>
        <div style={{ paddingTop: 10, paddingBottom: 10 }}>
          <Alert style={{ display: this.state.isDisplayed ? 'block' : 'none' }} onClose={this.closeAlert}>
            <strong>Info</strong> Hello world!
          </Alert>
          <Alert type="warning">
            <strong>Warning</strong> Hello world!
          </Alert>
          <Alert type="success">
            <strong>Success</strong> Hello world!
          </Alert>
          <Alert type="danger">
            <strong>Error</strong> Hello world!
          </Alert>
          <Alert noClose>
            <strong>Info</strong> Hello world!
          </Alert>
        </div>
        <Button type='primary' onClick={() => null}>shKz</Button>
        <Button type='ghost' onClick={() => null}>shKz</Button>
        <div style={{ width: 400, paddingTop: 10, paddingBottom: 10 }}>
          <label aria-label="dp1" htmlFor="dp1">
            <DatePicker id="dp1" name="dp1" defaultValue={new Date()} />
            AAUI
          </label>
        </div>
        <div style={{ paddingTop: 10, paddingBottom: 10 }}>
          <RadioGroup name='sports' onChange={this.handleChange}>
            <Radio value='basketball'>Basketball</Radio>
            <Radio value='tennis'>Tennis</Radio>
            <Radio value='swimming'>Swimming</Radio>
          </RadioGroup>
        </div>
      </div>
    )
  }
}

export default App
