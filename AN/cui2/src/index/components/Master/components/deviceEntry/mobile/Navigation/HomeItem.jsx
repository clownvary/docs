import React from 'react';
import radium from 'radium';
import classNames from 'classnames';
import { FormattedDyncMessage } from 'shared/translation/formatted';
import BaseItem from './BaseItem';

export class HomeItem extends BaseItem {

  render() {
    const { getWording } = this.context;
    const { item, itemStyles, currentPath, routeMap } = this.props;
    const wording = getWording('online_intro_label');
    return (
      <li
        style={itemStyles.navItem}
        className={classNames({ 'current-menu': currentPath === routeMap.HOME })}
      >
        <a href={item.get('url')}>
          <FormattedDyncMessage value={wording || item.get('title')} />
        </a>
      </li>
    );
  }
}

export default radium(HomeItem);
