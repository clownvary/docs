import React from 'react'
import { string, object, node, oneOf } from 'prop-types'

import classNames from 'classnames'

const propTypes = {
  className: string,
  label: string,
  style: object,
  direction: oneOf(['n', 'ne', 'e', 'se', 's', 'sw', 'w', 'nw']).isRequired,
  theme: oneOf(['', 'dark', 'light']),
  children: node,
}

const defaultProps = {
  direction: 'n',
  theme: 'dark',
}

const Tooltip = ({ className, theme, label, direction, style, children }) => {
  const classes = classNames(
    {
      tooltips: true,
      [`tooltips--${direction}`]: true,
      [`t-${theme}`]: theme,
    },
    className,
  )

  return (
    <span className={classes} style={style}>
      {label}
      <span className="tooltips__content" role="tooltip">
        {children}
      </span>
    </span>
  )
}

Tooltip.displayName = 'AUITooltip'
Tooltip.propTypes = propTypes
Tooltip.defaultProps = defaultProps

export default Tooltip
