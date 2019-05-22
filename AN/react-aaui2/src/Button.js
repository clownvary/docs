import React from 'react'
import { bool, string, node } from 'prop-types'
import classNames from 'classnames'

const Button = ({
  noSubmit,
  loading,
  type,
  size,
  children,
  className,
  ...rest
}) => {
  const classes = classNames(
    {
      btn: true,
      [`btn-${type}`]: type,
      [`btn--${size}`]: size,
      'btn--loading': loading,
    },
    className,
  )

  return (
    <button {...rest} type={noSubmit ? 'button' : 'submit'} className={classes}>
      {loading && <i className="icon-spinner icon--loading" />}
      <span>{children}</span>
    </button>
  )
}

export default Button

Button.displayName = 'AUIButton'
Button.propTypes = {
  noSubmit: bool,
  loading: bool,
  type: string,
  size: string,
  className: string,
  children: node,
}

Button.defaultProps = {
  noSubmit: false,
  loading: false,
  type: 'secondary',
}
