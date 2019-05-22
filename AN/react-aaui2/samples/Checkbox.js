import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import { Checkbox, Button } from '../src'

class App extends React.Component {
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
    this.checkbox.checked = !this.checkbox.checked
  }

  render() {
    return (
      <form>
        <div className="container">
          <h1>SM</h1>
          <Checkbox
            size="sm"
            onChange={this.handleChange}
            checked={this.state.checked}
            value="1"
          >
            Hello Checkbox(Controlled)
          </Checkbox>
          <Checkbox size="sm" value="2">
            Hello Checkbox
          </Checkbox>
          <Checkbox size="sm" value="3">
            Hello Checkbox
          </Checkbox>
          <hr />

          <h1>Default</h1>
          <Checkbox defaultChecked value="1">
            Hello Checkbox
          </Checkbox>
          <Checkbox value="2">Hello Checkbox</Checkbox>
          <Checkbox value="3">Hello Checkbox</Checkbox>
          <hr />

          <h1>LG</h1>
          <Checkbox size="lg" defaultChecked value="1">
            Hello Checkbox
          </Checkbox>
          <Checkbox size="lg" value="2">Hello Checkbox</Checkbox>
          <Checkbox size="lg" value="3">Hello Checkbox</Checkbox>
          <hr />

          <h1>Disabled</h1>
          <Checkbox disabled size="sm" value="1">
            Hello Checkbox
          </Checkbox>
          <Checkbox disabled value="2">Hello Checkbox</Checkbox>
          <Checkbox disabled size="lg" value="3">
            Hello Checkbox
          </Checkbox>
          <hr />

          <h1>Checked</h1>
          <Checkbox size="sm" defaultChecked value="1">
            Hello Checkbox
          </Checkbox>
          <Checkbox defaultChecked value="2">Hello Checkbox</Checkbox>
          <Checkbox defaultChecked size="lg" value="3">
            Hello Checkbox
          </Checkbox>
          <hr />

          <h1>Disabled & Checked</h1>
          <Checkbox size="sm" defaultChecked disabled value="1">
            Hello Checkbox
          </Checkbox>
          <Checkbox defaultChecked disabled value="2">
            Hello Checkbox
          </Checkbox>
          <Checkbox defaultChecked disabled size="lg" value="3">
            Hello Checkbox
          </Checkbox>
          <hr />
          <div>
            <Checkbox
              ref={checkbox => {
                this.checkbox = checkbox
              }}
            >
              Hello World
            </Checkbox>
            <Button size="sm" noSubmit onClick={this.updateRefChecked}>
              Update Checked with <code>this.ref.checked</code>
            </Button>
          </div>
          <br />
        </div>
      </form>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'))
