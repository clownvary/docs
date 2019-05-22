import React from 'react'
import { string, object, node } from 'prop-types'
import classNames from 'classnames'

const propTypes = {
  className: string,
  style: object,
  children: node,
}

const TabsHeader = ({ className, style, children }) => {
  const classes = classNames('nav-tabs', className)

  return (
    <ul className={classes} style={style} role="tablist">
      {children}
    </ul>
  )
}

TabsHeader.displayName = 'AUITabsHeader'
TabsHeader.propTypes = propTypes

export default TabsHeader
