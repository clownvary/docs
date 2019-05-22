import React, { PureComponent } from 'react'
import classnames from 'classnames'
import {
  string,
  bool,
  object,
  func,
  array,
  element,
  oneOfType,
} from 'prop-types'

import KEY_CODES from '../shared/keyCodes'
import scopeTab from '../shared/scopeTab'

const propTypes = {
  className: string,
  onClose: func,
  title: string,
  style: object,
  shown: bool,
  children: oneOfType([array, object, func, element]),
}

const defaultProps = {
  shown: false,
}

export default class Modal extends PureComponent {
  componentDidMount = () => {
    if (this.props.shown) {
      this.fixBody()
      this.autoFocus()
    }
    this.focusAfterRender = true
    this.handleTab = scopeTab(this.root)
  }

  componentDidUpdate = ({ shown }) => {
    if (shown !== this.props.shown) {
      if (this.props.shown) {
        this.fixBody()
        this.originFocusEl = document.activeElement
        /* istanbul ignore else */
        if (this.focusAfterRender) {
          this.autoFocus()
        }
      } else {
        this.unfixBody()
        this.originFocusEl && this.originFocusEl.focus()
        this.focusAfterRender = true
        clearTimeout(this.removeTimer)
      }
    }
  }

  componentWillUnmount() {
    this.unfixBody()
  }

  autoFocus = () => {
    this.removeTimer = setTimeout(() => {
      this.focusContent()
      this.focusAfterRender = false
    }, 100)
  }

  fixBody = () => {
    const bodyStyles = document.body.style
    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth

    this.bodyOverflowX = bodyStyles.overflowX
    this.bodyOverflowY = bodyStyles.overflowY
    this.bodyPaddingRight = bodyStyles.paddingRight

    bodyStyles.overflowX = bodyStyles.overflowY = 'hidden'

    /* istanbul ignore else */
    if (scrollbarWidth > 0) {
      const paddingRight = getComputedStyle(document.body).paddingRight
      this.root.style.paddingRight = bodyStyles.paddingRight = `${parseInt(
        paddingRight,
        10,
      ) + parseInt(scrollbarWidth, 0)}px`
    }
  }

  unfixBody = () => {
    const bodyStyles = document.body.style
    bodyStyles.overflowX = this.bodyOverflowX
    bodyStyles.overflowY = this.bodyOverflowY
    bodyStyles.paddingRight = this.bodyPaddingRight
    this.root.style.paddingRight = ''
  }

  focusContent = () => {
    if (!this.contentHasFocus()) {
      this.closeIcon.focus()
    }
  }

  contentHasFocus = () =>
    document.activeElement === this.root ||
    this.root.contains(document.activeElement)

  handleModalKeydown = e => {
    switch (e.keyCode) {
      case KEY_CODES.ESCAPE:
        this.props.onClose(e)
        break
      case KEY_CODES.TAB:
        this.handleTab(e)
        break
      default:
        break
    }
  }

  handleCloseIconKeydown = e => {
    switch (e.keyCode) {
      case KEY_CODES.SPACE:
        this.props.onClose(e)
        e.preventDefault()
        break
      default:
        break
    }
  }

  bindRootRef = ref => {
    this.root = ref
  }

  bindBoxRef = ref => {
    this.box = ref
  }

  bindCloseIconRef = ref => {
    this.closeIcon = ref
  }

  render = () => {
    const {
      className,
      style,
      title,
      shown,
      onClose,
      children,
      ...rest
    } = this.props
    const classes = classnames(
      {
        modal: true,
        'is-open': shown,
      },
      className,
    )

    return (
      <div {...rest} className="modal-wrap" role="dialog">
        <div
          className={classes}
          style={style}
          ref={this.bindRootRef}
          onKeyDown={this.handleModalKeydown}
        >
          <section className="modal-box" ref={this.bindBoxRef}>
            <header className="modal-header">
              <h3 className="modal-title">{title}</h3>
              <span
                role="button"
                className="icon-close modal-close"
                tabIndex="0"
                aria-label="close-dialog"
                ref={this.bindCloseIconRef}
                onClick={onClose}
                onKeyDown={this.handleCloseIconKeydown}
              />
            </header>
            {children}
          </section>
        </div>
        <div className="modal-mask" />
      </div>
    )
  }
}

Modal.displayName = 'AAUIModal'
Modal.propTypes = propTypes
Modal.defaultProps = defaultProps
