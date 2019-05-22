import React, { PureComponent, cloneElement } from 'react'
import { string, arrayOf, shape, node, any } from 'prop-types'
import classnames from 'classnames'
import BreadcrumbItem from './BreadcrumbItem'

class Breadcrumb extends PureComponent {
  static propTypes = {
    className: string,
    data: arrayOf(
      shape({
        text: any.isRequired,
        href: string,
      }),
    ),
    divider: string,
    children: node,
  }

  render() {
    const { data, className, children, divider, ...rest } = this.props

    return (
      <ul className={classnames('crumb', className)} {...rest}>
        {data && data.length > 0 ? (
          data.map(({ text, ...restData }, index) => (
            <BreadcrumbItem key={index} {...restData}>
              {text}
            </BreadcrumbItem>
          ))
        ) : (
          React.Children.map(children, (element, index) =>
            cloneElement(element, {
              divider,
              key: index,
            }),
          )
        )}
      </ul>
    )
  }
}

export default Breadcrumb
