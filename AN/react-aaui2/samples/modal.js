import React from 'react'
import ReactDOM from 'react-dom'

import Button from '../src/Button'
import Modal from '../src/modal'

class App extends React.Component {
  state = {
    isDisplayed: false,
  }

  open = () => {
    this.setState({
      isDisplayed: true,
    })
  }

  close = () => {
    this.setState({
      isDisplayed: false,
    })
  }

  asyncConfirm = () => {
    Modal.confirm({
      title: 'Remove',
      content: 'Do you really want to remove it?',
      onOk: () => {
        // Return the async dispatch here
        return new Promise((resolve, reject) => {
          console.log('onOk')
          setTimeout(resolve, 1000)
        })
      },
      onCancel: () => {
        console.log('onCancel')
      },
    })
  }

  confirm = () => {
    Modal.confirm({
      title: 'Remove',
      content: 'Do you really want to remove it?',
      onOk: () => {
        console.log('onOk')
      },
      onCancel: () => {
        console.log('onCancel')
      },
    })
  }

  closeConfirm = () => {
    const { close } = Modal.confirm({
      title: 'Remove',
      content: 'Do you really want to remove it?',
      onOk: () => {
        console.log('onOk')
      },
      onCancel: () => {
        console.log('onCancel')
      },
    })

    setTimeout(() => {
      close()
    }, 500)
  }

  render() {
    const { removed } = this.state

    return (
      <div style={{ fontFamily: 'sans-serif' }}>
        <Button type="primary" onClick={this.open}>Show Modal</Button>
        <br />
        <Button onClick={this.asyncConfirm}>Async Confirm</Button>
        <Button onClick={this.confirm}>Confirm</Button>
        <Button onClick={this.closeConfirm}>
          Close Confirm By exposed API
        </Button>
        <Modal
          title="Hello World"
          shown={this.state.isDisplayed}
          onClose={this.close}
        >
          <div className="modal-body">
            <strong>Lorem Ipsum</strong>
            <br />
            Amet aperiam molestiae quo perspiciatis explicabo recusandae,
            beatae?
            Impedit dolore nihil fugiat dolores laborum deleniti?
            Harum tempore voluptates maiores quisquam quisquam porro aperiam!
            Architecto et dignissimos deserunt quisquam dolores, nobis.
          </div>
          <div className="modal-footer">
            <Button onClick={this.close}>Cancel</Button>
            <Button type="strong" onClick={this.close}>OK</Button>
          </div>
        </Modal>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'))
