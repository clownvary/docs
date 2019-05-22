import React from 'react'
import { number, string, func, node, oneOf, oneOfType } from 'prop-types'
import classnames from 'classnames'

function pageData(
  type,
  theme,
  total,
  current,
  around,
  url,
  roundText,
  startText,
  endText,
) {
  function pageLink(page) {
    if (typeof url === 'function') {
      return url(page)
    }

    let pageLinkVar = typeof url === 'string' ? url : ''
    if (pageLinkVar.indexOf('?') > -1) {
      pageLinkVar += '&page'
    } else {
      pageLinkVar += '?page'
    }
    return `${pageLinkVar}=${page}`
  }

  const start = 1
  const end = total
  const aroundStart = Math.max(current - around, start + 1)
  const aroundEnd = Math.min(current + around, end - 1)
  const data = []

  switch (type) {
    case 'pager':
      if (current > start) {
        data.push({
          text: startText,
          href: pageLink(current - 1),
          label: 'Previous Page',
        })
      }
      if (current < end) {
        data.push({
          text: endText,
          href: pageLink(current + 1),
          label: 'Next Page',
        })
      }
      break
    case 'pagination':
      if (current > start) {
        data.push({
          text: startText,
          href: pageLink(current - 1),
          label: 'Previous Page',
        })
      }
      /* eslint prefer-template: 0 */
      data.push({ text: '' + start, href: pageLink(start) })
      if (aroundStart - start > 1) {
        data.push({ text: roundText })
      }
      for (let i = aroundStart; i < current; i += 1) {
        data.push({ text: '' + i, href: pageLink(i) })
      }
      for (
        let i = current !== start ? current : current + 1;
        i <= aroundEnd;
        i += 1
      ) {
        data.push({ text: '' + i, href: pageLink(i) })
      }
      if (end - aroundEnd > 1) {
        data.push({ text: roundText })
      }
      data.push({ text: '' + end, href: pageLink(end) })
      if (current < end) {
        data.push({
          text: endText,
          href: pageLink(current + 1),
          label: 'Next Page',
        })
      }
      break
    default:
      break
  }
  return data
}

const Pagination = ({
  type,
  theme,
  total,
  current,
  around,
  url,
  roundText,
  startText,
  endText,
  linkElement: A,
  className,
  ...rest
}) => {
  const classes = classnames(
    {
      [type]: true,
      [`pagination--${theme}`]: type === 'pagination' && theme,
    },
    className,
  )

  return (
    <ul className={classes} {...rest}>
      {pageData(
        type,
        theme,
        total,
        current,
        around,
        url,
        roundText,
        startText,
        endText,
      ).map(({ text, href, label }, i) => {
        if (href && +text !== current) {
          return (
            <li key={i}>
              <A href={href} aria-label={label}>
                {text}
              </A>
            </li>
          )
        }

        const liClasses = classnames({
          active: +text === current,
        })

        return (
          <li key={i} className={liClasses} aria-label={label}>
            <span>{text}</span>
          </li>
        )
      })}
    </ul>
  )
}

Pagination.displayName = 'AUIPagination'
Pagination.propTypes = {
  className: string,
  type: oneOf(['pagination', 'pager']),
  theme: string,
  total: number,
  current: number,
  around: number,
  startText: node,
  endText: node,
  roundText: node,
  url: oneOfType([string, func]),
  linkElement: oneOfType([func, node]),
}
Pagination.defaultProps = {
  type: 'pagination',
  url: '',
  around: 3,
  linkElement: 'a',
  roundText: '...',
  startText: <span className="icon-chevron-left" />,
  endText: <span className="icon-chevron-right" />,
}

export default Pagination
