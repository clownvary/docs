import React, { PureComponent } from 'react'
import { bool, string, func, object, node, oneOf } from 'prop-types'
import classNames from 'classnames'

const icons = {
  success: 'check-circle',
  warning: 'exclamation-circle',
  danger: 'times-circle',
  error: 'times-circle',
  info: 'info-circle',
}

export default class Alert extends PureComponent {
  static displayName = 'AUIAlert'

  static propTypes = {
    type: oneOf(['success', 'warning', 'danger', 'error', 'info']).isRequired, // `error` is an alias for `danger`
    className: string,
    style: object, // eslint-disable-line
    noClose: bool,
    inverse: bool,
    onClose: func,
    children: node,
  }

  static defaultProps = {
    type: 'info',
    noClose: false,
    inverse: false,
  }

  render() {
    const {
      className,
      style,
      type,
      noClose,
      inverse,
      onClose,
      children,
      ...rest
    } = this.props
    const classes = classNames(
      {
        alert: true,
        [`alert-${type}`]: type,
        [`alert-${type}--inverse`]: type && inverse,
        'alert-dismissable': !noClose,
      },
      className,
    )

    return (
      <div {...rest} className={classes} style={style} role="alert">
        <span className={`icon-${icons[type]}`} />
        {children}
        {noClose ? (
          undefined
        ) : (
          <button type="button" className="close" onClick={onClose}>
            ×
          </button>
        )}
      </div>
    )
  }
}
