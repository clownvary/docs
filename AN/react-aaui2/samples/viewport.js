import React from 'react'
import ReactDOM from 'react-dom'

import ShowAt from '../src/viewport/ShowAt'
import HideAt from '../src/viewport/HideAt'

class App extends React.Component {
  render() {
    return (
      <div className="container">
        <p>Please resize the browser's width.</p>
        <ShowAt smAndAbove>show when >= 768px</ShowAt>
        <ShowAt mdAndAbove>show when >= 992px</ShowAt>
        <ShowAt lgAndAbove>show when >= 1200px</ShowAt>
        <HideAt smAndAbove>hide when >= 768px</HideAt>
        <HideAt mdAndAbove>hide when >= 992px</HideAt>
        <HideAt lgAndAbove>hide when >= 1200px</HideAt>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'))
