import React from 'react';
import classNames from 'classnames';
import isFunction from 'lodash/isFunction';
import groupBy from 'lodash/groupBy';
import map from 'lodash/map';
import replace from 'lodash/replace';
import { Link } from "react-router-dom";

export default class Gallery extends React.PureComponent {
  static displayName = 'Gallery';

  constructor(props) {
    super(props);

    const { items = [] } = props;
    const groups = groupBy(items, item => item.group || 'Etc');
    this.state = {
      groups
    };
  }

  render() {
    const { className } = this.props;
    const { groups } = this.state;

    const cards = items => items.map((item) => {
      const { id, text, icon, description = '' } = item;
      return (
        <Link
          key={id}
          title={description}
          className="an-gallery__link"
          to={`/${replace(item.name, /[ ]/g, '')}`}
        >
          <div className="an-gallery__card">
            <span className="title">{text}</span>
            <i className={icon} />
          </div>
        </Link>
      );
    });

    return (
      <div className={classNames('an-gallery', className)}>
        {map(groups, (g, name) => (
          <div className="an-gallery__group" key={`group_${name}`}>
            <div className="an-gallery__group-header">
              <h2>{`==${name}==`}</h2>
            </div>
            {cards(g)}
          </div>
        ))}
        <div style={{ marginTop: '40px' }} />
      </div>
    );
  }
}
