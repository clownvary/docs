import React from 'react'
import ReactDOM from 'react-dom'

import Tabs from '../src/tabs'

class App extends React.Component {
  state = {
    selected: 'second',
  }

  onChange = tab => {
    this.setState({ selected: tab })
  }

  showChange = tab => {
    console.log(tab)
  }

  render() {
    return (
      <div className="container">
        <h1>
          Uncontrolled <code>Tabs</code>
        </h1>
        <Tabs defaultSelected="first">
          <Tabs.Header>
            <Tabs.Title name="first">First tab</Tabs.Title>
            <Tabs.Title name="second">Second tab</Tabs.Title>
            <Tabs.Title name="third">Third tab</Tabs.Title>
            <Tabs.Title name="fourth">Fourth tabs</Tabs.Title>
          </Tabs.Header>
          <Tabs.Container name="first">
            <p>
              Lorem ipsum dolor sit amet{' '}
              <a href="#">consectetur adipiscing elit</a>. Nullam et euismod
              elit. Nulla a elementum urna. Suspendisse viverra vehicula nulla.
            </p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam et
              euismod elit. Nulla a elementum urna. <a href="#">Suspendisse</a>{' '}
              viverra vehicula nulla.
            </p>
          </Tabs.Container>
          <Tabs.Container name="second">
            <p>This is World!</p>
          </Tabs.Container>
          <Tabs.Container name="third">
            <p>This is World!</p>
          </Tabs.Container>
          <Tabs.Container name="fourth">
            <p>This is World!</p>
          </Tabs.Container>
        </Tabs>
        <Tabs defaultSelected="second" onChange={this.showChange}>
          <Tabs.Header>
            <Tabs.Title name="first">First</Tabs.Title>
            <Tabs.Title name="second">Second</Tabs.Title>
          </Tabs.Header>
          <Tabs.Container name="first">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam et
              euismod elit. Nulla a elementum urna. Suspendisse viverra vehicula
              nulla.
            </p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam et
              euismod elit. <a href="#">Nulla a elementum urna</a>. Suspendisse
              viverra vehicula nulla.
            </p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam et
              euismod elit. Nulla a elementum urna. Suspendisse viverra vehicula
              nulla.
            </p>
          </Tabs.Container>
          <Tabs.Container name="second">
            <p>This is World!</p>
          </Tabs.Container>
        </Tabs>
        <h1>
          Controlled <code>Tabs</code>
        </h1>
        <Tabs
          selected={this.state.selected}
          style={{ marginTop: 10 }}
          onChange={this.onChange}
        >
          <Tabs.Header>
            <Tabs.Title name="first">First</Tabs.Title>
            <Tabs.Title name="second">Second</Tabs.Title>
          </Tabs.Header>
          <Tabs.Container name="first">
            <p>This is Hello!</p>
          </Tabs.Container>
          <Tabs.Container name="second">
            <p>This is World!</p>
          </Tabs.Container>
        </Tabs>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'))
