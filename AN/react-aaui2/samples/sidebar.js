import React from 'react'
import ReactDOM from 'react-dom'
import { Sidebar } from '../src/index'

const orderedData = [
  { text: 'Enter the age', href: '#' },
  { text: 'Select the gender', href: '#' },
  { text: 'Select the interests', href: '#' },
  { text: 'Enter a nickname', href: '#' },
  { text: 'Save and view results', href: '#' },
]

const unorderedData = [
  {
    text: 'What are the benefits of the ACTIVE Advantage membership?',
    href: '#',
  },
  { text: 'What is the ACTIVE Advantage trial membership?', href: '#' },
  { text: 'How much does an ACTIVE Advantage membership cost?', href: '#' },
  { text: 'How do I cancel my ACTIVE Advantage membership?', href: '#' },
  {
    text: 'How do I redeem ACTIVE Advantage registration discounts?',
    href: '#',
  },
]

const App = () =>
  <div className="container u-aligner">
    <Sidebar
      priority="5"
      title="Progress steps to add a Family Member"
      steps
      active={1}
      past={0}
      data={orderedData}
      style={{ width: 250, marginRight: 100 }}
    />
    <Sidebar
      priority="4"
      links
      title="Frequently asked questions"
      data={unorderedData}
      style={{ width: 250, marginTop: 40 }}
    />
  </div>

ReactDOM.render(<App />, document.getElementById('root'))
