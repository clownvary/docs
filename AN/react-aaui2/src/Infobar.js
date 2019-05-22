import React, { PureComponent } from 'react'
import { bool, string, object, func, node } from 'prop-types'

export default class Infobar extends PureComponent {
  static displayName = 'AUIInfobar'

  static propTypes = {
    className: string,
    style: object, // eslint-disable-line
    children: node,
    noClose: bool,
    onClose: func,
  }

  static defaultProps = {
    noClose: false,
  }

  render() {
    const { className, style, children, noClose, onClose } = this.props

    return (
      <div className={`infobar ${className || ''}`} style={style}>
        {children}
        {noClose || (
          <button type="button" className="close" onClick={onClose}>
            ×
          </button>
        )}
      </div>
    )
  }
}
