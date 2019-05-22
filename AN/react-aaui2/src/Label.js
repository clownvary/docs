import React, { PureComponent } from 'react'
import { string, object, oneOf, node } from 'prop-types'

export default class Label extends PureComponent {
  static displayName = 'AUILabel'

  static propTypes = {
    className: string,
    style: object, // eslint-disable-line
    type: oneOf(['success', 'warning', 'danger', 'info']).isRequired,
    children: node,
  }

  static defaultProps = {
    type: 'info',
  }

  render() {
    const { className, style, type, children, ...rest } = this.props

    return (
      <span
        {...rest}
        className={`label label-${type} ${className || ''}`}
        style={style}
      >
        {children}
      </span>
    )
  }
}
