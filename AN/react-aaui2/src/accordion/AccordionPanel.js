import React, { PureComponent } from 'react'
import { func, bool, number, string, node } from 'prop-types'

import { noop } from '../shared/utils'
import KEY_CODES from '../shared/keyCodes'

export default class AccordionPanel extends PureComponent {
  static propTypes = {
    className: string,
    children: node,
    onInitChildren: func,
    setStatus: func,
    index: number,
    transition: string,
    active: bool,
    title: string,
    openIcon: node,
    closeIcon: node,
    completeIcon: node,
    disabled: bool,
    complete: bool,
    onChangeFocus: func,
  }

  static defaultProps = {
    openIcon: 'icon-plus',
    closeIcon: 'icon-minus',
    completeIcon: 'icon-check',
    onInitChildren: noop,
    setStatus: noop,
    onChangeFocus: noop,
  }

  componentDidMount() {
    if (this._content && this.props.transition) {
      this._height = this._content.offsetHeight
    }
    this._isTransitionEnd = true
    this.props.onInitChildren(
      this.props.index,
      this.props.disabled ? undefined : this._focusNode,
    )
  }

  setAccordionBodyContainer = container => {
    this._container = container
  }

  setWrappedComponentInstance = content => {
    this._content = content
  }

  setWrappedFocusInstance = focusNode => {
    this._focusNode = focusNode
  }

  startTransition = () => {
    if (this._isTransitionEnd) {
      this._isTransitionEnd = false
      if (this.props.active && this._container) {
        this._height = this._container.offsetHeight
        this._container.style.height = `${this._height}px`
      }
      return true
    }
    return false
  }

  endTransition = () => {
    this._isTransitionEnd = true
  }

  validateTransition = action => {
    if (this.props.transition.trim()) {
      if (this.startTransition()) {
        window.requestAnimationFrame(() => {
          action()
        })
      }
    } else {
      action()
    }
  }

  handleClick = index => e => {
    e.preventDefault()
    if (!this.props.disabled) {
      this.validateTransition(() => {
        this.props.setStatus(index, !this.props.active)
      })
    }
  }

  handleKeyDown = e => {
    const { index, active, disabled } = this.props
    const { ENTER, SPACE, UPARROW, DOWNARROW } = KEY_CODES
    const operationKeyCodes = [ENTER, SPACE, UPARROW, DOWNARROW]

    e.persist()
    if (operationKeyCodes.indexOf(e.keyCode) !== -1) {
      e.preventDefault()
    }
    const changeFocus = () => {
      this.props.onChangeFocus(
        index,
        !active,
        e.keyCode,
        this._focusNode,
        disabled,
      )
    }
    if (e.keyCode === ENTER || e.keyCode === SPACE) {
      this.validateTransition(changeFocus)
    } else {
      changeFocus()
    }
  }

  handleTransitionEnd = () => {
    if (this.props.active) {
      this._container.style.height = 'auto'
    }
    this.endTransition()
  }

  render() {
    const {
      active,
      children,
      index,
      complete,
      className,
      title,
      disabled,
      openIcon,
      closeIcon,
      completeIcon,
    } = this.props
    const transition = this.props.transition.trim()

    let iconClassName
    if (complete) {
      iconClassName = completeIcon
    } else {
      iconClassName = active ? closeIcon : openIcon
    }

    let containerHeight
    if (active) {
      containerHeight = transition ? this._height : 'auto'
    } else {
      containerHeight = 0
    }

    return (
      <div
        className={`accordion ${active ? 'accordion--show' : ''} ${disabled
          ? 'accordion--disabled'
          : ''} ${complete ? 'accordion--complete' : ''} ${className || ''}`}
      >
        <div
          ref={this.setWrappedFocusInstance}
          onKeyDown={this.handleKeyDown}
          tabIndex={disabled ? undefined : 0}
          className="accordion__header"
        >
          <div className="accordion__header-text">{title}</div>
          <div className="accordion__header-icon">
            <a onClick={this.handleClick(index)}>
              <i className={iconClassName} />
            </a>
          </div>
        </div>
        <div
          className="accordion__body-container"
          style={{
            transition: `${transition || 'none'}`,
            overflow: 'hidden',
            height: containerHeight,
          }}
          ref={this.setAccordionBodyContainer}
          onTransitionEnd={this.handleTransitionEnd}
        >
          <div
            className="accordion__body"
            ref={this.setWrappedComponentInstance}
          >
            {children}
          </div>
        </div>
      </div>
    )
  }
}
