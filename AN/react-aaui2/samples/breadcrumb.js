import React from 'react'
import ReactDOM from 'react-dom'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

import { Breadcrumb } from '../src/index'

const data = [
  { text: 'Home', href: '#', 'data-qa-id': 'testHome'},
  { text: 'List', href: '#'},
  { text: <span><span className="icon-settings"/>Detail</span>},
]

const App = () => (
  <div style={{ fontFamily: 'sans-serif' }}>
    <div>
      <h1>Basic Usage</h1>
      <Breadcrumb>
        <Breadcrumb.Item href="#">Home</Breadcrumb.Item>
        <Breadcrumb.Item href="#">About</Breadcrumb.Item>
        <Breadcrumb.Item data-qa-id="testTopic">Topics</Breadcrumb.Item>
      </Breadcrumb>
      <h1>Customize divider</h1>
      <Breadcrumb divider=">">
        <Breadcrumb.Item href="#">Home</Breadcrumb.Item>
        <Breadcrumb.Item href="#">About</Breadcrumb.Item>
        <Breadcrumb.Item>Topics</Breadcrumb.Item>
      </Breadcrumb>
      <h1>Usage with Router</h1>
      <Router>
        <div>
          <Breadcrumb>
            <Breadcrumb.Item><Link to="/home">Home</Link></Breadcrumb.Item>
            <Breadcrumb.Item><Link to="/about">About</Link></Breadcrumb.Item>
            <Breadcrumb.Item><Link to="/topics">Topics</Link></Breadcrumb.Item>
          </Breadcrumb>
          <Route path="/home" component={() => <p>Home</p>}/>
          <Route path="/about" component={() => <p>About</p>}/>
          <Route path="/topics" component={() => <p>Topics</p>}/>
        </div>
      </Router>
      <h1>Usage with Icon</h1>
      <Breadcrumb>
        <Breadcrumb.Item href="#">
          <span className="icon-home" />
          <span>Home</span>
        </Breadcrumb.Item>
        <Breadcrumb.Item href="#">
          <span className="icon-email" />
          <span>Email</span>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <span className="icon-settings" />
          <span>Settings</span>
        </Breadcrumb.Item>
      </Breadcrumb>
      <h1>Data Driven Usage</h1>
      <Breadcrumb data={data}/>
    </div>
  </div>
)

ReactDOM.render(<App />, document.getElementById('root'))
