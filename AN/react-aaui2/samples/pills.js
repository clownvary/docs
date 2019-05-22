import React from 'react'
import ReactDOM from 'react-dom'
import { MoreButton, Pills, Button } from '../src/index'

const data = {
  'first first first first first': () => console.log('first action'),
  second: () => console.log('second action'),
  third: () => console.log('third action'),
}

const App = () =>
  <div style={{ fontFamily: 'ProximaNova, Arial, sans-serif' }}>
    <Pills size="sm">
      <Button>Button1</Button>
      <Button type="strong">Button2</Button>
      <Button>Button3</Button>
      <Button>Button4</Button>
      <MoreButton data={data} style={{ display: 'inline-block' }} />
    </Pills>
    <br /> <br />
    <Pills>
      <Button>Button1</Button>
      <Button type="strong">Button2</Button>
      <Button>Button3</Button>
      <Button>Button4</Button>
      <MoreButton
        data={data}
        className="dropdown--lg"
        style={{ display: 'inline-block' }}
      />
    </Pills>
  </div>

ReactDOM.render(<App />, document.getElementById('root'))
