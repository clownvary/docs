import React from 'react'
import ReactDOM from 'react-dom'
import { Infobar } from '../src/index'

class App extends React.Component {
  state = {
    isDisplayed: true,
  }

  close = () => {
    this.setState({
      isDisplayed: false,
    })
  }

  render() {
    return (
      <div>
        <Infobar style={{ marginBottom: 10, display: this.state.isDisplayed ? 'block' : 'none' }} onClose={this.close}>
          <span className='icon-uniF06A' /><strong>Look at me!</strong> I&apos;m an infobar. I stretch 100% across and I push content down.
        </Infobar>
        <Infobar noClose>
          <span className='icon-uniF06A' /><strong>Look at me!</strong> I&apos;m an infobar. I stretch 100% across and I push content down.
        </Infobar>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'))
