import React from 'react'
import {
  bool,
  string,
  number,
  object,
  array,
  element,
  oneOfType,
} from 'prop-types'
import classNames from 'classnames'

const propTypes = {
  className: string,
  style: object,
  data: array,
  links: bool,
  steps: bool,
  active: number,
  past: number,
  priority: string,
  title: string,
  linkElement: oneOfType([string, element]),
}

const defaultProps = {
  priority: '5',
  steps: false,
  linkElement: 'a',
}

const Sidebar = ({
  className,
  style,
  data = [],
  steps,
  active,
  past,
  priority,
  title,
  links,
  linkElement: A,
}) => {
  const classes = classNames(
    {
      sidebar: true,
      'sidebar--links': links,
    },
    className,
  )
  const HeaderElement = `h${priority}`

  return (
    <aside className={classes} style={style}>
      <HeaderElement>{title}</HeaderElement>
      <ul>
        {data.map((item, i) => {
          const stepNum = steps ? `${i + 1}.` : undefined
          const linkClasses = classNames({
            active: i === active,
            past: i === past,
          })

          return (
            <li key={i}>
              <A className={linkClasses} href={item.href}>
                {stepNum} {item.text}
              </A>
            </li>
          )
        })}
      </ul>
    </aside>
  )
}

Sidebar.displayName = 'AUISidebar'
Sidebar.propTypes = propTypes
Sidebar.defaultProps = defaultProps

export default Sidebar
