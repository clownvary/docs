import React from 'react'
import { string, object, node } from 'prop-types'
import classNames from 'classnames'

import { tabsAPIShape } from '../shared/types'
import KEY_CODES from '../shared/keyCodes'

const propTypes = {
  className: string,
  style: object,
  name: string,
  children: node,
  auiTabsAPI: tabsAPIShape,
}

const handleKeyDown = e => {
  e.persist()
  switch (e.keyCode) {
    case KEY_CODES.LEFTARROW:
    case KEY_CODES.RIGHTARROW:
      e.stopPropagation()
      break
    default:
      break
  }
}

const TabsContainer = ({
  className,
  style,
  name,
  children,
  auiTabsAPI: { getSelected },
}) => {
  const classes = classNames(
    {
      'u-hidden': name !== getSelected(),
    },
    className,
  )

  return (
    <div
      className={classes}
      style={style}
      role="tabpanel"
      aria-hidden={name !== getSelected()}
      onKeyDown={handleKeyDown}
    >
      {children}
    </div>
  )
}

TabsContainer.displayName = 'AUITabsContainer'
TabsContainer.propTypes = propTypes

export default TabsContainer
