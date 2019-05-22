import React from 'react'
import ReactDOM from 'react-dom'
import { Button } from '../src/index'

class App extends React.Component {
  showAlert = () => {
    alert('Hello World!')
  }

  render() {
    return (
      <div>
        <Button type="primary" onClick={this.showAlert}>
          Hello World
        </Button>
        <Button type="secondary" onClick={this.showAlert}>
          Hello World
        </Button>
        <Button onClick={this.showAlert}>Hello World</Button>
        <Button noSubmit onClick={this.showAlert}>
          Hello World
        </Button>
        <Button size="xs" type="strong" onClick={this.showAlert}>
          Hello World
        </Button>
        <Button size="sm" type="strong" onClick={this.showAlert}>
          Hello World
        </Button>
        <Button type="strong" onClick={this.showAlert}>
          Hello World
        </Button>
        <Button size="lg" type="strong" onClick={this.showAlert}>
          Hello World
        </Button>
        <Button size="xl" type="strong" onClick={this.showAlert}>
          Hello World
        </Button>
        <Button disabled onClick={this.showAlert}>
          Hello World
        </Button>
        <Button loading>Hello World</Button>
        <Button loading disabled>
          Hello World
        </Button>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'))
