import React, { PureComponent } from 'react'
import { string, node } from 'prop-types'

class BreadcrumbItem extends PureComponent {
  static propTypes = {
    href: string,
    divider: string,
    children: node.isRequired,
  }

  static defaultProps = {
    divider: '/',
  }

  render() {
    const { divider, children, href, ...rest } = this.props

    return (
      <li {...rest}>
        {href != null ? <a href={href}>{children}</a> : <span>{children}</span>}
        <span className="crumb__divider">{divider}</span>
      </li>
    )
  }
}

export default BreadcrumbItem
