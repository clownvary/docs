import React, { PureComponent } from 'react'
import { string, func, node } from 'prop-types'

import { noop } from '../shared/utils'

export default class TableCell extends PureComponent {
  static propTypes = {
    className: string,
    children: node,
    tagName: string,
    onClick: func,
  }

  static defaultProps = {
    className: '',
    tagName: 'td',
    onClick: noop,
  }

  render() {
    const { className, tagName: Tag, children, onClick, ...rest } = this.props

    return (
      <Tag className={className} {...rest} onClick={onClick}>
        {children}
      </Tag>
    )
  }
}
