import React from 'react'
import ReactDOM from 'react-dom'
import TextArea from '../src/TextArea'


const App = () => (
  <TextArea value='Hello, World!' />
)

ReactDOM.render(<App />, document.getElementById('root'))
