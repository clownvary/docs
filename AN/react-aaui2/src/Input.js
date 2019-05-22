import React, { PureComponent } from 'react'
import {
  bool,
  string,
  func,
  object,
  node,
  oneOfType,
  oneOf,
  element,
} from 'prop-types'
import classNames from 'classnames'

import { identity, omit } from './shared/utils'

export default class Input extends PureComponent {
  static displayName = 'AUIInput'

  static propTypes = {
    value: string,
    defaultValue: string,
    type: string.isRequired,
    size: oneOf(['sm', 'm', 'lg']).isRequired,
    preIcon: string,
    preText: string,
    postIcon: string,
    postText: string,
    errored: bool,
    icon: bool, // Represent `icon-input`
    disabled: bool,
    className: string,
    style: object, // eslint-disable-line
    onChange: func,
    PreComponent: oneOfType([func, element]),
    PostComponent: oneOfType([func, element]),
    inputRef: func,
    children: node,
  }

  static defaultProps = {
    type: 'text',
    size: 'm',
    icon: false,
    onChange: identity,
    inputRef: identity,
  }

  componentDidMount() {
    Object.defineProperties(this, {
      value: {
        get() {
          return this.input.value
        },
        set(v) {
          if (this.props.value === undefined) {
            this.input.value = v
          }
        },
      },
    })
  }

  setWrappedComponentInstance = input => {
    this.input = input

    this.props.inputRef(input)
  }

  // If user doesn't pass in `value` and only use `defaultValue` as init value or not, then
  // saving it to state
  handleChange = e => {
    const { disabled, onChange } = this.props

    if (disabled) {
      return
    }

    // If you want to access the event properties in an asynchronous way,
    // you should call `event.persist()`` on the event,
    // which will remove the synthetic event from the pool
    // and allow references to the event to be retained by user code.
    e.persist && e.persist()

    onChange(e)
  }

  render() {
    const {
      type,
      size,
      preIcon,
      preText,
      postIcon,
      postText,
      errored,
      disabled,
      icon,
      className,
      style,
      PreComponent,
      PostComponent,
      ...rest
    } = this.props
    const inputClassName = classNames(
      {
        'input-group': true,
        [`input-group--${size}`]: true,
        'input-group--icon': icon,
        'input-group--error': errored,
        'input-group--disabled': disabled,
      },
      className,
    )

    return (
      <div className={inputClassName} style={style}>
        {PreComponent && <PreComponent className="input-group__item" />}
        {(preIcon || preText) && (
          <span className="input-group__item">
            {preIcon && <i className={`icon ${preIcon}`} />}
            {preText}
          </span>
        )}
        <input
          // the event handler for `onChange` not firing properly in React 15.2.0 + IE11
          // when paste text into textarea: https://github.com/facebook/react/issues/7211
          // will be removed when react fixed this issue
          onInput={this.handleChange}
          {...omit(rest, ['inputRef'])}
          type={type}
          disabled={disabled}
          className="input input-group__field"
          ref={this.setWrappedComponentInstance}
          onChange={this.handleChange}
        />
        {(postIcon || postText) && (
          <span className="input-group__item">
            {postIcon && <i className={`${postIcon}`} />}
            {postText}
          </span>
        )}
        {PostComponent && <PostComponent className="input-group__item" />}
      </div>
    )
  }
}
