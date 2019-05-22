import React from 'react'
import ReactDOM from 'react-dom'

import Checkbox from '../src/Checkbox'
import TagEditor from '../src/TagEditor'

class App extends React.Component {
  state = {
    data: [
      { text: 'first' },
      { text: 'fee@activenetwork.com' },
      { text: 'third' },
      { text: '180 1234 5678' },
    ],
    data2: [
      { text: 'first with custom className', className: 'errored' },
      { text: 'fee@activenetwork.com' },
      { text: 'third' },
      { text: '180 1234 5678' },
    ],
  }

  handleChange = d => {
    this.setState({
      data: d,
    })
  }

  handleAnotherChange = d => {
    this.setState({
      data2: d,
    })
  }

  render() {
    return (
      <div className="container">
        <section>
          <h1>TagEditor</h1>
          <TagEditor
            placeholder={<p className="strong">Your placeholder is here</p>}
            data={this.state.data}
            style={{ height: 60 }}
            onChange={this.handleChange}
          />
        </section>
        <section>
          <h1>
            TagEditor with <code>errored</code>
          </h1>
          <TagEditor
            placeholder={<p className="strong">Your placeholder is here</p>}
            data={this.state.data2}
            style={{ height: 60, marginTop: 10 }}
            onChange={this.handleAnotherChange}
            errored
          />{' '}
        </section>
        <section>
          <h1>
            TagEditor without <code>data</code>
          </h1>
          <TagEditor
            placeholder={<p className="strong">Your placeholder is here</p>}
          />
        </section>
        <section>
          <h1>
            TagEditor with <code>editMode</code> as <code>false</code>
          </h1>
          <TagEditor editMode={false} data={this.state.data2} />
        </section>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'))
