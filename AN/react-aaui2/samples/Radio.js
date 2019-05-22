import React, { PureComponent } from 'react'
import ReactDOM from 'react-dom'

import Radio from '../src/radio'
import Button from '../src/Button'

class App extends PureComponent {
  state = {
    checked: true,
  }

  handleChange = e => {
    this.setState(prevState => ({
      checked: !prevState.checked,
    }))
    console.log(`${e.target.value}: ${e.target.checked}`)
  }

  updateRefChecked = () => {
    // Change the `checked` through `this.ref.checked` but it's not the right way to change it
    // Please use the `onChange` callback to do it
    this.radio.checked = !this.radio.checked
  }

  render() {
    return (
      <form>
        <div className="container">
          <h1>SM</h1>
          <Radio
            size="sm"
            onChange={this.handleChange}
            checked={this.state.checked}
            value="1"
          >
            Hello Radio
          </Radio>
          <Radio size="sm" onChange={this.handleChange} value="2">
            Hello Radio
          </Radio>
          <Radio size="sm" onChange={this.handleChange} value="3">
            Hello Radio
          </Radio>
          <hr />

          <h1>Default</h1>
          <Radio defaultChecked value="1">
            Hello Radio
          </Radio>
          <Radio value="2">Hello Radio</Radio>
          <Radio value="3">Hello Radio</Radio>
          <hr />

          <h1>LG</h1>
          <Radio size="lg" defaultChecked value="1">
            Hello Radio
          </Radio>
          <Radio size="lg" value="2">Hello Radio</Radio>
          <Radio size="lg" value="3">Hello Radio</Radio>
          <hr />

          <h1>Disabled</h1>
          <Radio disabled size="sm" value="1">
            Hello Radio
          </Radio>
          <Radio disabled value="2">Hello Radio</Radio>
          <Radio disabled size="lg" value="3">
            Hello Radio
          </Radio>
          <hr />

          <h1>Checked</h1>
          <Radio size="sm" defaultChecked value="1">
            Hello Radio
          </Radio>
          <Radio defaultChecked value="2">Hello Radio</Radio>
          <Radio defaultChecked size="lg" value="3">
            Hello Radio
          </Radio>
          <hr />

          <h1>Disabled & Checked</h1>
          <Radio size="sm" defaultChecked disabled value="1">
            Hello Radio
          </Radio>
          <Radio defaultChecked disabled value="2">
            Hello Radio
          </Radio>
          <Radio defaultChecked disabled size="lg" value="3">
            Hello Radio
          </Radio>
          <hr />
          <div>
            <Radio
              ref={radio => {
                this.radio = radio
              }}
            >
              Hello World
            </Radio>
            <Button size="sm" noSubmit onClick={this.updateRefChecked}>
              Change Checked with <code>this.ref.checked</code>
            </Button>
          </div>
          <br />
        </div>
      </form>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'))
