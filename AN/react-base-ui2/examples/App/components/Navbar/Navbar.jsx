import React from 'react';
import classNames from 'classnames';
import isFunction from 'lodash/isFunction';
import groupBy from 'lodash/groupBy';
import map from 'lodash/map';
import replace from 'lodash/replace';
import { Link } from "react-router-dom";
import TitlePanel from '../TitlePanel';


export default class Navbar extends React.PureComponent {
  static displayName = 'Navbar';

  constructor(props) {
    super(props);

    const { items = [] } = props;
    const groups = groupBy(items, item => item.group || 'Etc');
    this.state = {
      groups
    };
  }

  onItemClick(item) {
    const { onItemClick } = this.props;
    if (isFunction(onItemClick)) {
      onItemClick(item);
    }
  }

  render() {
    const { className } = this.props;
    const { groups } = this.state;
    const links = items => items.map((item) => {
      const { id, text, icon, description = '' } = item;
      return (
        <div key={id} className="an-navbar__row">
          <span className={classNames('an-navbar__row-icon', icon)} />
          <Link
            title={description}
            className="an-navbar__link"
            to={`/${replace(item.name, /[ ]/g, '')}`}
            onClick={() => this.onItemClick(item)}
          >{text}</Link>
        </div>
      );
    });

    return (
      <TitlePanel title="Menu" className={classNames('an-navbar', className)}>
        <div className="an-navbar__content">
          <Link
            className="an-navbar__link an-navbar__header"
            to="/" onClick={() => this.onItemClick()}
          >
            Home
          </Link>
          <div className="an-navbar__divider" />
          {map(groups, (g, name) => (
            <div className="an-navbar__group" key={`group_${name}`}>
              <div className="an-navbar__group-header">
                <span>{name}</span>
              </div>
              {links(g)}
            </div>
            ))}
        </div>
      </TitlePanel>
    );
  }
}
