import React from 'react'
import ReactDOM from 'react-dom'
import { Dropdown, Checkbox, Button } from '../src/index'

const data = [
  { text: 'Canada', value: 'can' },
  { text: 'China', value: 'chs' },
  { text: 'Japan1', value: 'jap1' },
  { text: 'Japan2', value: 'jap2' },
  { text: 'Japan3', value: 'jap3' },
  { text: 'United States of America', value: 'usa' },
]

class App extends React.Component {
  state = {
    value: 'chs',
  }

  onCheckChange = e => {
    this.setState({
      isChecked: e.target.checked,
    })
  }

  handleChange = ({ value }) => {
    this.setState({
      value: value,
    })
  }

  showValue = ({ value }) => {
    console.log(`You selected: ${value}`)
  }

  render() {
    return (
      <div className="container">
        <h1>Uncontrolled Dropdown</h1>
        <Dropdown defaultValue="chs" data={data} />

        <h3>
          Display selected item in the <code>console</code>
        </h3>
        <Dropdown defaultValue="chs" data={data} onChange={this.showValue} />

        <h1>Controlled Dropdown</h1>
        <Dropdown
          value={this.state.value}
          data={data}
          uncontrolled={false}
          onChange={this.handleChange}
        />

        <h1>
          Dropdown with <code>highlight</code>
        </h1>
        <Dropdown defaultValue="chs" data={data} highlight />

        <h1>
          Dropdown with <code>disabled</code>
        </h1>
        <Dropdown data={data} value="chs" disabled />

        <h1>
          Dropdown with <b>lg</b> size
        </h1>
        <Dropdown data={data} size="lg" />

        <h1>
          Dropdown with <b>search</b> size
        </h1>
        <Dropdown data={data} filter filterPlaceholder="Filter..." />

        <h1>Dropdown with different themes:</h1>
        <h3>Dropdown with theme='gradient'</h3>
        <Dropdown data={data} theme="gradient" />
        <br />
        <h3>Dropdown with theme='borderless'</h3>
        <Dropdown data={data} theme="borderless" />

        <h1>
          Dropdown with <code>maxHeight</code>
        </h1>
        <p>Dropdown with maxHeight</p>
        <Dropdown data={data} maxHeight="250px" />

        <h1>
          Dropdown with <code>preIcon</code>
        </h1>
        <Dropdown defaultValue="chs" data={data} preIcon="icon-location" />
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'))
