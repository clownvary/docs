import React from 'react'
import ReactDOM from 'react-dom'

import Alert from '../src/alert'
import Button from '../src/Button'

class App extends React.Component {
  state = {
    isDisplayed: true,
  }

  closeAlert = () => {
    this.setState({
      isDisplayed: false,
    })
  }

  handleClick = (type, timeout) => {
    Alert[type]({
      message: 'I AM A GLOBAL MESSAGE',
      timeout,
      inverse: true,
    })
  }

  handleClearClick() {
    Alert.clear()
  }

  render() {
    return (
      <div className="container">
        <h3>Display Global Alert by API</h3>
        <div className="btn-group">
          <Button onClick={this.handleClick.bind(this, 'success', undefined)}>
            Alert.success
          </Button>
          <Button onClick={this.handleClick.bind(this, 'warning', undefined)}>
            Alert.warning
          </Button>
          <Button onClick={this.handleClick.bind(this, 'error', undefined)}>
            Alert.error
          </Button>
          <Button onClick={this.handleClick.bind(this, 'info', undefined)}>
            Alert.info
          </Button>
          <Button onClick={this.handleClick.bind(this, 'success', 3000)}>
            Alert.success (close it after 3s automatically)
          </Button>
          <Button onClick={this.handleClearClick}>
            Alert.clear
          </Button>
        </div>
        <hr />
        <Alert
          style={{ display: this.state.isDisplayed ? 'block' : 'none' }}
          onClose={this.closeAlert}
        >
          <strong>Info</strong> Hello world!
        </Alert>
        <Alert type="success">
          <strong>Success</strong> Hello world!
        </Alert>
        <Alert noClose>
          <strong>Info</strong> Hello world!
        </Alert>
        <Alert type="warning">
          <strong>Warning</strong> Hello world!
        </Alert>
        <Alert type="danger">
          <strong>Error</strong> Hello world!
        </Alert>
        <p>Alert with inverse effect</p>
        <Alert inverse type="success">
          <strong>Success</strong> Hello world!
        </Alert>
        <Alert inverse noClose>
          <strong>Info</strong> Hello world!
        </Alert>
        <Alert inverse type="warning">
          <strong>Warning</strong> Hello world!
        </Alert>
        <Alert inverse type="danger">
          <strong>Error</strong> Hello world!
        </Alert>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'))
