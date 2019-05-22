import React from 'react'
import ReactDOM from 'react-dom'

import { Input, Button } from '../src'

class App extends React.Component {
  state = {
    value: 'Default input value',
  }

  alertValue = () => {
    alert(this.state.value)
  }

  handleChange = e => {
    this.setState({
      value: e.target.value,
    })
  }

  render() {
    return (
      <div className="container">
        <h1>
          Input with <b>value</b> & <b>onChange</b>
        </h1>
        <div className="grid">
          <div className="grid-u-6-12">
            <Input value={this.state.value} onChange={this.handleChange} />
          </div>
          <div className="grid-u-6-12">
            <Button onClick={this.alertValue}>Alert value</Button>
          </div>
        </div>
        <h1>
          Input with <b>value</b>
        </h1>
        <div className="grid">
          <div className="grid-u-6-12">
            <Input value="Fixed value" />
          </div>
        </div>
        <h1>
          Input with <b>lg</b> size
        </h1>
        <div className="grid">
          <div className="grid-u-6-12">
            <Input preText="@" size="lg" defaultValue="Please input here." />
          </div>
          <div className="grid-u-6-12">
            <Input postText=".00" size="lg" defaultValue="Please input here." />
          </div>
        </div>
        <h1>
          Input with <b>sm</b> size
        </h1>
        <div className="grid">
          <div className="grid-u-6-12">
            <Input
              size="sm"
              preIcon="icon-google-rounded"
              postText="Goolge it!"
              placeholder="Please type some text..."
            />
          </div>
          <div className="grid-u-6-12">
            <Input size="sm" postText="$" defaultValue="Please input here." />
          </div>
        </div>
        <h1>
          Input with <b>disabled</b>
        </h1>
        <div>
          <Input disabled placeholder="Oh! I am disabled!!!" />
          <br />
          <Input
            disabled
            preText="@"
            postText="$"
            placeholder="Oh! I am disabled!!!"
          />
          <br />
          <Input
            disabled
            preIcon="icon-user"
            placeholder="Oh! I am disabled!!!"
          />
          <br />
          <Input
            disabled
            icon
            preIcon="icon-user"
            placeholder="Oh! I am disabled!!!"
          />
        </div>
        <h1>
          Input with <b>errored & readonly</b>
        </h1>
        <div className="grid">
          <div className="grid-u-6-12">
            <Input
              postText="Button"
              errored
              readOnly
              defaultValue="Oh no, error!"
            />
          </div>
          <div className="grid-u-6-12">
            <Input
              preIcon="icon-calendar"
              errored
              readOnly
              defaultValue="Oh no, error!"
            />
          </div>
        </div>
        <h1>
          Input with <b>preIcon</b>
        </h1>
        <div className="grid">
          <div className="grid-u-6-12">
            <p>
              <Input preIcon="icon-user" />
            </p>
            <p>
              <Input preIcon="icon-user" size="lg" icon />
            </p>
            <p>
              <Input preIcon="icon-user" size="sm" icon />
            </p>
          </div>
        </div>
        <h1>
          Input with <b>postIcon</b>
        </h1>
        <div className="grid">
          <div className="grid-u-6-12">
            <p>
              <Input postIcon="icon-user" />
            </p>
            <p>
              <Input postIcon="icon-user" size="lg" icon />
            </p>
            <p>
              <Input postIcon="icon-user" size="sm" icon />
            </p>
          </div>
        </div>
        <h1>
          Input with <b>PreComponent</b>
        </h1>
        <div className="grid">
          <div className="grid-u-6-12">
            <Input
              icon
              PreComponent={(props = {}) => (
                <span {...props}>
                  <i className="icon icon-lock" />
                </span>
              )}
            />
          </div>
        </div>
        <h1>
          Input with <b>PostComponent</b>
        </h1>
        <div className="grid">
          <div className="grid-u-6-12">
            <Input
              PostComponent={(props = {}) => <Button {...props}>SAVE</Button>}
            />
          </div>
        </div>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'))
