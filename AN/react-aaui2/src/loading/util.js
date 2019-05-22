import React from 'react'
import ReactDOM from 'react-dom'

import Loading from './Loading'
import LoadingCounter from './LoadingCounter'

const loadingCounter = new LoadingCounter()
// There only should be one global loading instance
let loadingInstance

function close(div) {
  // Refer to https://facebook.github.io/react/docs/react-dom.html#unmountcomponentatnode
  const unmountResult = ReactDOM.unmountComponentAtNode(div)

  unmountResult && div.parentNode && div.parentNode.removeChild(div)
}

function show() {
  if (loadingCounter.isEmpty()) {
    const div = document.createElement('div')

    document.body.appendChild(div)

    ReactDOM.render(<Loading />, div)

    loadingInstance = {
      close: () => {
        loadingCounter.clear()
        close(div)
      },
      counter: loadingCounter,
    }
  }

  loadingCounter.add()

  return loadingInstance
}

function hide() {
  loadingCounter.dec()

  if (loadingCounter.isEmpty()) {
    loadingInstance.close()
  }
}

function reset() {
  loadingCounter.clear()
}

export { show, hide, reset }
