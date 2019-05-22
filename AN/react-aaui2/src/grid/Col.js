import React from 'react'
import classnames from 'classnames'
import { number, string, node } from 'prop-types'

const propTypes = {
  className: string,
  children: node,
  span: number,
  sm: number,
  md: number,
  lg: number,
}
const defaultProps = {
  span: 12,
}

export default function Col({
  children,
  span,
  sm,
  md,
  lg,
  className,
  ...rest
}) {
  return (
    <div
      className={classnames(
        'col',
        {
          [`col-${span}`]: span,
          [`col-sm-${sm}`]: sm,
          [`col-md-${md}`]: md,
          [`col-lg-${lg}`]: lg,
        },
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  )
}

Col.propTypes = propTypes
Col.defaultProps = defaultProps
