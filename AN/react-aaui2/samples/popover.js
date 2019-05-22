import React from 'react'
import ReactDOM from 'react-dom'
import { Popover } from '../src/index'

const App = () =>
  <div className="container">
    <p>
      Sit sit necessitatibus tempora delectus in! Deserunt quae cum natus
      aperiam perferendis. Ratione dolores modi eaque voluptatibus illum? Sit
      doloremque est deserunt eum corporis recusandae pariatur fuga ullam cum?
      Mollitia!
    </p>
    <p>
      Sit sit necessitatibus tempora delectus in! Deserunt quae cum natus
      aperiam perferendis. Ratione dolores modi eaque voluptatibus illum? Sit
      doloremque est deserunt eum corporis recusandae pariatur fuga ullam cum?
      Mollitia!
    </p>
    <p>
      Sit sit necessitatibus tempora delectus in! Deserunt quae cum natus
      aperiam perferendis. Ratione dolores modi eaque voluptatibus illum? Sit
      doloremque est deserunt eum corporis recusandae pariatur fuga ullam cum?
      Mollitia!
    </p>
    <div style={{ position: 'fixed', top: 300, left: 300 }}>
      <span data-popover-trigger>
        Hello World!
        <Popover direction="e" style={{ zIndex: 1 }}>
          <h3>Term</h3>
          <p>
            Adipisicing ipsam alias obcaecati ea culpa dolore excepturi,
            ut.Laudantium vel beatae nihil recusandae nesciunt neque. Doloremque
            tempora voluptatibus non quas consequatur saepe numquam repellat
            sequi ullam mollitia nesciunt maiores.
          </p>
        </Popover>
      </span>
    </div>
  </div>

ReactDOM.render(<App />, document.getElementById('root'))
