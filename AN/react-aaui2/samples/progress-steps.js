import React from 'react'
import ReactDOM from 'react-dom'
import { ProgressSteps } from '../src/index'

const data = [
  { text: 'Installation', status: 'past' },
  { text: 'Quick Start', status: 'active' },
  { text: 'API', status: 'next' },
  { text: 'Contributing', status: 'next' },
]

const App = () => (
  <div style={{ maxWidth: '600px' }}>
    <ProgressSteps steps={data} />
    <ProgressSteps size="sm" steps={data} />
  </div>
)

ReactDOM.render(<App />, document.getElementById('root'))
