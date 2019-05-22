import React from 'react'
import ReactDOM from 'react-dom'

import Loading from '../src/loading'
import Button from '../src/Button'

class App extends React.Component {
  handleShowClick(times = 1) {
    for (let i = 0; i < times; i++) {
      Loading.show()
    }

    setTimeout(() => {
      for (let i = 0; i < times; i++) {
        Loading.hide()
      }
    }, 1500)
  }

  handleHideClick() {
    Loading.hide()
  }

  render() {
    return (
      <div className="container">
        <h3>
          Display Global Loading (call <code>Loading.hide</code> after 1500ms)
        </h3>
        <div className="btn-group">
          <Button onClick={this.handleShowClick.bind(this, 1)}>
            Loading.show
          </Button>
          <Button onClick={this.handleShowClick.bind(this, 2)}>
            Loading.show(2)
          </Button>
          <Button onClick={this.handleShowClick.bind(this, 3)}>
            Loading.show(3)
          </Button>
          <Button onClick={this.handleHideClick}>
            Loading.hide
          </Button>
        </div>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'))
