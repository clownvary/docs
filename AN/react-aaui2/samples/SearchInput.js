import React from 'react'
import ReactDOM from 'react-dom'

import SearchInput from '../src/SearchInput'

const App = () =>
  <div className="container">
    <h1>Size</h1>
    <SearchInput
      onSearch={query => {
        console.log(`query: ${query}`)
      }}
    />
    <br />
    <SearchInput
      size="lg"
      onSearch={query => {
        console.log(`query: ${query}`)
      }}
    />
    <h1>Trigger</h1>
    <h2>
      <code>button</code>
    </h2>
    <SearchInput
      size="lg"
      onSearch={query => {
        console.log(`query: ${query}`)
      }}
    />
    <br />
    <h2>
      <code>input</code>
    </h2>
    <SearchInput
      size="lg"
      trigger="input"
      onSearch={query => {
        console.log(`query: ${query}`)
      }}
    />
    <br />
    <h2>
      <code>enter</code>
    </h2>
    <SearchInput
      size="lg"
      trigger="enter"
      onSearch={query => {
        console.log(`query: ${query}`)
      }}
    />
  </div>

ReactDOM.render(<App />, document.getElementById('root'))
