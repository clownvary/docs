import React from 'react'
import ReactDOM from 'react-dom'

import Pagination from '../src/Pagination'

const App = () =>
  <div className="container">
    <div style={{ marginBottom: 10 }}>
      <Pagination total={10} current={1} around={4} />
    </div>
    <div style={{ marginBottom: 10 }}>
      <Pagination
        url={page => `http://www.google.com?page=${page}`}
        total={10}
        current={10}
        around={4}
      />
    </div>
    <div style={{ marginBottom: 10 }}>
      <Pagination
        url="?keywords=running"
        roundText="......"
        total={100}
        current={40}
      />
    </div>
    <div style={{ marginBottom: 10 }}>
      <Pagination
        theme="noborder"
        url="myUrl?keywords=running"
        total={10}
        current={1}
        around={4}
      />
    </div>
    <div style={{ marginBottom: 10 }}>
      <Pagination
        theme="noborder"
        url="myUrl?keywords=running&location=everywhere"
        total={10}
        current={10}
        around={4}
      />
    </div>
    <div style={{ marginBottom: 10 }}>
      <Pagination
        theme="noborder"
        url="myUrl?keywords=running"
        total={100}
        current={40}
      />
    </div>
    <div style={{ marginBottom: 10 }}>
      <Pagination
        type="pager"
        url="?keywords=running&location=everywhere"
        total={100}
        current={40}
      />
    </div>
    <div style={{ marginBottom: 10 }}>
      <Pagination
        type="pager"
        url="myUrl?keywords=running"
        startText="Previous"
        endText="Next"
        total={100}
        current={40}
      />
    </div>
    <div style={{ marginBottom: 10 }}>
      <Pagination
        type="pager"
        url="myUrl?keywords=running&location=everywhere"
        startText="Older"
        endText="Newer"
        total={100}
        current={40}
      />
    </div>
    <div style={{ marginBottom: 10 }}>
      <Pagination type="pager" total={10} current={1} />
    </div>
    <div style={{ marginBottom: 10 }}>
      <Pagination
        type="pager"
        startText="Previous"
        endText="Next"
        total={10}
        current={10}
      />
    </div>
    <div style={{ marginBottom: 10 }}>
      <Pagination
        type="pager"
        startText="Older"
        endText="Newer"
        total={10}
        current={1}
      />
    </div>
  </div>

ReactDOM.render(<App />, document.getElementById('root'))
