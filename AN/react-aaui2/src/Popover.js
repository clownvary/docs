import React from 'react'
import { string, object, node, oneOf } from 'prop-types'
import classNames from 'classnames'

const propTypes = {
  className: string,
  style: object,
  direction: oneOf(['n', 'ne', 'e', 'se', 's', 'sw', 'w', 'nw']).isRequired,
  theme: oneOf(['', 'dark', 'light']),
  children: node,
}

const defaultProps = {
  direction: 'e',
  theme: 'light',
}

const Popover = ({ className, style, direction, theme, children, ...rest }) => {
  const classes = classNames(
    {
      popover: true,
      [`popover--${direction}`]: direction,
      [`t-${theme}`]: theme,
    },
    className,
  )

  return (
    <div className={classes} style={style} {...rest}>
      {children}
    </div>
  )
}

Popover.displayName = 'AUIPopover'
Popover.propTypes = propTypes
Popover.defaultProps = defaultProps

export default Popover
