import React from 'react'
import classNames from 'classnames'
import {
  oneOf,
  bool,
  number,
  string,
  object,
  node,
  oneOfType,
} from 'prop-types'

const propsTypes = {
  className: string,
  fluid: bool,
  gutter: oneOfType([string, number, bool]),
  align: oneOf(['start', 'center', 'end', 'stretch']),
  justify: oneOf(['start', 'center', 'end', 'between', 'around']),
  style: object,
  children: node,
}

const defaultProps = {
  fluid: false,
  gutter: true,
  align: 'start',
  justify: 'start',
  style: {},
}

export default function Row(props) {
  const {
    fluid,
    justify,
    align,
    className,
    gutter,
    style,
    children,
    ...rest
  } = props
  const justifyPrefix =
    justify === 'between' || justify === 'around' ? `space-${justify}` : justify

  const boolGutter = typeof gutter === 'boolean'
  const classes = classNames(
    {
      row: !fluid,
      'row-fluid': fluid,
      'row-gutter': boolGutter && !!gutter,
      [`row-align-${align}`]: align,
      [`row-justify-${justifyPrefix}`]: justify,
    },
    className,
  )

  // prettier-ignore
  const rowStyle = !boolGutter && gutter > 0 ? {
    marginLeft: gutter / -2,
    marginRight: gutter / -2,
    ...style,
  } : style
  const cols = React.Children.map(children, col => {
    if (!boolGutter && col && col.props && gutter > 0) {
      return React.cloneElement(col, {
        style: {
          paddingLeft: gutter / 2,
          paddingRight: gutter / 2,
          ...col.props.style,
        },
      })
    }
    return col
  })

  return (
    <div className={classes} style={rowStyle} {...rest}>
      {cols}
    </div>
  )
}

Row.propTypes = propsTypes
Row.defaultProps = defaultProps
