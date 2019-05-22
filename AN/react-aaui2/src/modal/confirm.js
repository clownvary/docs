/* eslint-disable no-shadow */
import React from 'react'
import ReactDOM from 'react-dom'
import { bool, string, func, node, oneOfType } from 'prop-types'

import Modal from './Modal'
import Button from '../Button'
import { noop, omit } from '../shared/utils'

export default function confirm(options) {
  const props = {
    suppressCancel: false,
    suppressOk: false,
    onCancel: noop,
    onOk: noop,
    cancelText: 'Cancel',
    okText: 'Confirm',
    ...options,
  }

  const div = document.createElement('div')
  document.body.appendChild(div)
  let animationFrame

  function close(...args) {
    // Refer to https://facebook.github.io/react/docs/react-dom.html#unmountcomponentatnode
    const unmountResult = ReactDOM.unmountComponentAtNode(div)

    unmountResult && div.parentNode && div.parentNode.removeChild(div)

    cancelAnimationFrame(animationFrame)

    if (args && args[0] && args[0].triggerCancel) {
      props.onCancel(...args)
    }
  }

  function wrapOnClick(actionFn, closeFn) {
    return function onClick() {
      const resultFromActionFn = actionFn()

      if (!resultFromActionFn) {
        closeFn()
      }

      // if returning a promise
      if (resultFromActionFn && typeof resultFromActionFn.then === 'function') {
        resultFromActionFn.then((...args) => {
          closeFn(...args)
        })
      }
    }
  }

  props.close = () => {
    // See https://github.com/facebook/react/issues/3298 "React fails to unmount component from within event handler"
    requestAnimationFrame(close.bind(this, { triggerCancel: true }))
  }
  props.handleCancel = wrapOnClick(props.onCancel, close)
  props.handleOk = wrapOnClick(props.onOk, close)

  function modalConfirm({
    shown,
    suppressOk,
    suppressCancel,

    close,
    handleCancel,
    handleOk,

    title,
    content,
    cancelText,
    okText,

    ...rest
  }) {
    return (
      <Modal title={title} shown={shown} onClose={close} {...rest}>
        <div className="modal-body">{content}</div>
        <div className="modal-footer">
          {suppressCancel || (
            <Button type="secondary" onClick={handleCancel}>
              {cancelText}
            </Button>
          )}
          {suppressOk || (
            <Button type="primary" onClick={handleOk}>
              {okText}
            </Button>
          )}
        </div>
      </Modal>
    )
  }

  function render(props) {
    ReactDOM.render(modalConfirm(omit(props, ['onCancel', 'onOk'])), div)
  }

  animationFrame = requestAnimationFrame(() =>
    render({ ...props, shown: true }),
  )

  modalConfirm.propTypes = {
    shown: bool,
    suppressCancel: bool,
    suppressOk: bool,

    close: func,
    handleCancel: func,
    handleOk: func,

    title: oneOfType([string, node]),
    content: oneOfType([string, node]),
    cancelText: oneOfType([string, node]),
    okText: oneOfType([string, node]),
  }

  render(props)

  return {
    close,
  }
}
