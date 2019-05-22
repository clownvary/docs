import React from 'react'
import ReactDOM from 'react-dom'

import Tag from '../src/Tag'

class App extends React.Component {
  state = {
    isHidden: false,
  }

  hideTag = () => {
    this.setState({
      isHidden: true,
    })
  }

  tagOnChange = text => {
    console.log(text)
  }

  render() {
    return (
      <div className="container">
        {!this.state.isHidden
          ? <Tag
              editMode
              value="Jogging"
              onClose={this.hideTag}
              onChange={this.tagOnChange}
            />
          : undefined}
        <Tag value="Running" />
        <Tag editMode={false} value="Walking" />
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'))
