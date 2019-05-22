import React from 'react'
import ReactDOM from 'react-dom'

import AlertBar from './AlertBar'
import { noop } from '../shared/utils'

const alertMap = new Map()

function clear() {
  alertMap.forEach(({ close }) => close())
  alertMap.clear()
}

function alert(options) {
  const props = {
    onClose: noop,
    multiple: false,
    inverse: true,
    ...options,
  }
  const originalOnClose = props.onClose
  const div = document.createElement('div')

  if (!props.multiple) {
    clear()
  }

  document.body.appendChild(div)

  function close(...args) {
    alertMap.delete(div)
    // Refer to https://facebook.github.io/react/docs/react-dom.html#unmountcomponentatnode
    const unmountResult = ReactDOM.unmountComponentAtNode(div)

    unmountResult && div.parentNode && div.parentNode.removeChild(div)

    originalOnClose(...args)
  }

  props.onClose = close
  alertMap.set(div, { close })
  ReactDOM.render(<AlertBar {...props} />, div)

  return {
    close,
  }
}

export { alert, clear }
