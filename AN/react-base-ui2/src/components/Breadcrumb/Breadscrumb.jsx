import React from 'react';
import classNames from 'classnames';
import { string, array, object } from 'prop-types';
import Item from './Item';

/**
 * Default PropTypes for Breadcrumb
 */
const BreadcrumbPropTypes = {
  /**
   * The path separator
   */
  separator: string,
  /**
   * Array of routes definition.
  */
  routes: array,
  /**
   * Hash object that stores the path params
  */
  params: object
};

const BreadcrumbProps = {
  separator: '>',
  routes: []
};

/** UI component that displays path in Breadcrumb. */
class Breadcrumb extends React.Component {
  static displayName = 'Breadcrumb';
  static defaultProps = BreadcrumbProps;
  static propTypes = BreadcrumbPropTypes;

  render() {
    const paths = [];
    const {
        routes,
        params,
        className,
        separator,
        children,
        ...rest
      } = this.props;

    const { breadcrumbOptions } = routes[routes.length - 1] || {};
    const { hideIndex } = breadcrumbOptions || {};
    const validRoutes = routes.filter(route => !!route.path);
    return (
      <ul
        {...rest}
        className={classNames('an-breadcrumb', className)}
      >
        {/*
          if provide routes property,
          render Item by current router data.
        */}
        {
          validRoutes.map((route, i) => {
            if (hideIndex && hideIndex.indexOf(i) !== -1) {
              return undefined;
            }
            let { path } = route;
            path = path.replace(/^\//, '');

            params && Object.keys(params).forEach((p) => {
              path = path.replace(`:${p}`, params[p]);
            });

            const isLast = validRoutes.length === i + 1;
            if (path) {
              paths.push(path);
            }
            const { name, href = '' } = route.breadcrumbOptions || {};
            let link = '';
            if (!href && i + 1 < validRoutes.length) {
              link = `/${paths.join('/')}`;
            }
            if (isLast) {
              link = '';
            }

            return name ?
              <Item
                separator={separator}
                key={i}
                href={href}
                link={link}
                isLast={isLast}
              >
                {name}
              </Item> :
              undefined;
          })
        }
        {/*
          if provide child tag Item,
          render it and bind separator property on it.
        */}
        {
          React.Children.map(children, child => React.cloneElement(child, {
            separator
          }))
        }
      </ul>
    );
  }
}


export default Breadcrumb;
