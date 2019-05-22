import React from 'react'
import { string, object, node } from 'prop-types'
import classNames from 'classnames'

import { tabsAPIShape } from '../shared/types'

const propTypes = {
  className: string,
  style: object,
  name: string,
  children: node,
  auiTabsAPI: tabsAPIShape,
}

const TabsTitle = ({
  name,
  style,
  className,
  children,
  auiTabsAPI: { select, getSelected },
  ...rest
}) => {
  const selected = name === getSelected()
  const classes = classNames(
    {
      active: selected,
    },
    className,
  )

  return (
    <li role="presentation">
      <a
        {...rest}
        className={classes}
        style={style}
        onClick={() => select(name)}
        role="tab"
        aria-selected={selected}
        tabIndex={selected ? '0' : '-1'}
      >
        {children}
      </a>
    </li>
  )
}

TabsTitle.displayName = 'AUITabsTitle'
TabsTitle.propTypes = propTypes

export default TabsTitle
