import React from 'react'
import { string, object, node, oneOf } from 'prop-types'
import classNames from 'classnames'

const Pills = ({ className, style, size, children }) => {
  const classes = classNames(
    {
      'btn-group': true,
      [`btn-group-${size}`]: size,
    },
    className,
  )

  return (
    <div className={classes} style={style}>
      {children}
    </div>
  )
}

Pills.displayName = 'AUIPills'
Pills.propTypes = {
  className: string,
  style: object, // eslint-disable-line
  size: oneOf(['xs', 'sm', 'lg', 'xl']),
  children: node,
}

export default Pills
