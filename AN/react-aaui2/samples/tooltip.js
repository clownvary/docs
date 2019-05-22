import React from 'react'
import ReactDOM from 'react-dom'

import Tooltip from '../src/Tooltip'

const App = () =>
  <div className="container">
    <h1>Dark(Default) Theme</h1>
    <a href="">
      <Tooltip label="Tooltip North" direction="n">
        I am a Tooltip!
      </Tooltip>
    </a>
    <br />
    <a href="">
      <Tooltip label="Tooltip North East" direction="ne">
        I am a Tooltip!
      </Tooltip>
    </a>
    <br />
    <a href="">
      <Tooltip label="Tooltip East" direction="e">
        I am a Tooltip!
      </Tooltip>
    </a>
    <br />
    <a href="">
      <Tooltip label="Tooltip South East" direction="se">
        I am a Tooltip!
      </Tooltip>
    </a>
    <br />
    <a href="">
      <Tooltip label="Tooltip South" direction="s">
        I am a Tooltip!
      </Tooltip>
    </a>
    <br />
    <a href="">
      <Tooltip label="Tooltip South West" direction="sw">
        I am a Tooltip!
      </Tooltip>
    </a>
    <br />
    <a href="">
      <Tooltip label="Tooltip West" direction="w">
        I am a Tooltip!
      </Tooltip>
    </a>
    <br />
    <a href="">
      <Tooltip label="Tooltip North West" direction="nw">
        I am a Tooltip!
      </Tooltip>
    </a>

    <h1>Light Theme</h1>
    <a href="">
      <Tooltip theme="light" label="Tooltip North" direction="n">
        I am a Tooltip!
      </Tooltip>
    </a>
    <br />
    <a href="">
      <Tooltip theme="light" label="Tooltip North East" direction="ne">
        I am a Tooltip!
      </Tooltip>
    </a>
    <br />
    <a href="">
      <Tooltip theme="light" label="Tooltip East" direction="e">
        I am a Tooltip!
      </Tooltip>
    </a>
    <br />
    <a href="">
      <Tooltip theme="light" label="Tooltip South East" direction="se">
        I am a Tooltip!
      </Tooltip>
    </a>
    <br />
    <a href="">
      <Tooltip theme="light" label="Tooltip South" direction="s">
        I am a Tooltip!
      </Tooltip>
    </a>
    <br />
    <a href="">
      <Tooltip theme="light" label="Tooltip South West" direction="sw">
        I am a Tooltip!
      </Tooltip>
    </a>
    <br />
    <a href="">
      <Tooltip theme="light" label="Tooltip West" direction="w">
        I am a Tooltip!
      </Tooltip>
    </a>
    <br />
    <a href="">
      <Tooltip theme="light" label="Tooltip North West" direction="nw">
        I am a Tooltip!
      </Tooltip>
    </a>
  </div>

ReactDOM.render(<App />, document.getElementById('root'))
