import React, { PureComponent } from 'react'
import { string, func, bool } from 'prop-types'
import classNames from 'classnames'

import { omit, noop } from './shared/utils'
import KEY_CODES from './shared/keyCodes'

export default class Tag extends PureComponent {
  static displayName = 'AUITag'

  static propTypes = {
    isNew: bool,
    editMode: bool,
    className: string,
    value: string,
    onChange: func,
    onCancel: func,
    onClose: func,
  }

  static defaultProps = {
    editMode: false,
    onChange: noop,
    onCancel: noop,
    onClose: noop,
  }

  constructor(props) {
    super(props)

    this.state = {
      isInput: false,
      isTabEnter: false,
    }
  }

  setInputRef = input => {
    this.input = input
  }

  toInput = e => {
    e && e.stopPropagation && e.stopPropagation()

    this.setState(
      {
        isInput: true,
        isInputCancel: false,
      },
      () => {
        const input = this.input

        if (input) {
          input.focus()
          input.select()
        }
      },
    )
  }

  handleKeyDown = e => {
    const target = e.target

    switch (e.keyCode) {
      case KEY_CODES.ESCAPE:
        e.preventDefault()
        this.setState(
          {
            isInputCancel: true,
            isTabEnter: false,
          },
          () => {
            target.blur()
          },
        )
        break
      case KEY_CODES.TAB:
      case KEY_CODES.ENTER:
        e.preventDefault()

        this.setState(
          {
            isTabEnter: true,
          },
          () => {
            target && target.blur()
          },
        )
        break
      default:
        break
    }
  }

  handleBlur = e => {
    const value = e.target.value

    this.setState(
      {
        isInput: false,
      },
      () => {
        if (!this.state.isInputCancel) {
          this.props.onChange(value, this.state.isTabEnter)
        } else {
          this.props.onCancel()
        }
      },
    )
  }

  render() {
    const { className, editMode, onClose, value, isNew, ...rest } = this.props
    const { isInput } = this.state
    const classes = classNames('tag-input', className)

    if (!editMode) {
      return <span className="badge">{value}</span>
    }

    return (
      <span className={classes} {...omit(rest, ['onChange', 'onCancel'])}>
        {isInput ? (
          <input
            className="input"
            ref={this.setInputRef}
            placeholder={isNew ? value : undefined}
            defaultValue={isNew ? undefined : value}
            onKeyDown={this.handleKeyDown}
            onBlur={this.handleBlur}
          />
        ) : (
          <span className="badge badge--with-close-icon">
            <span onClick={this.toInput}>{value}</span>
            <i className="icon-close-thin" onClick={onClose} />
          </span>
        )}
      </span>
    )
  }
}
