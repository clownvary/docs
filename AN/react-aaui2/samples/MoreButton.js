import React from 'react'
import ReactDOM from 'react-dom'
import { MoreButton } from '../src/index'

const data = {
  'first item': () => alert('first action'),
  'second item': () => alert('second action'),
  'third item': () => alert('third action'),
}

const App = () =>
  <div style={{ fontFamily: 'ProximaNova, Arial, sans-serif' }}>
    <MoreButton data={data} />
    <MoreButton
      data={data}
      filter
      className="dropdown--with-search"
      filterPlaceholder="Search..."
      title="Actions"
    />
  </div>

ReactDOM.render(<App />, document.getElementById('root'))
