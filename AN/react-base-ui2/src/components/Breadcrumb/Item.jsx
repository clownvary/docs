import React from 'react';
import { Link } from 'react-router';
import classNames from 'classnames';
import { string, bool } from 'prop-types';

const BreadcrumbItemPropTypes = {
  href: string,
  link: string,
  separator: string,
  isLast: bool
};

const BreadcrumbItemProps = {
  isLast: false
};

class Item extends React.Component {
  static displayName = 'BreadcrumbItem';
  static propTypes = BreadcrumbItemPropTypes;
  static defaultProps = BreadcrumbItemProps;

  render() {
    const { href, link, separator, className, children, isLast } = this.props;
    return (
      <li className={classNames('an-breadcrumb__item', className)}>
        {
          href ?
            <a href={href}>{children}</a> :
            (() => (link ? <Link to={link}>{children}</Link> : <span>{children}</span>))()
        }
        {!isLast && <span className="an-breadcrumb__separator">{separator}</span>}
      </li>
    );
  }

}

export default Item;
