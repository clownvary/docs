import React from 'react'
import ReactDOM from 'react-dom'
import { Label } from '../src/index'

const App = () => (
  <div style={{ fontFamily: 'sans-serif' }}>
    <Label>AAUI</Label>
    <Label type="success">SUCCESS</Label>
    <Label type="warning">WARNING</Label>
    <Label type="danger">IMPORTANT</Label>
    <Label type="info">INFORMATION</Label>
  </div>
)

ReactDOM.render(<App />, document.getElementById('root'))
