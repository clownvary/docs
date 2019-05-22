import radium from 'radium';
import React from 'react';
import classNames from 'classnames';
import { FormattedDyncMessage } from 'shared/translation/formatted';
import BaseItem from './BaseItem';

export class NormalItem extends BaseItem {

  render() {
    const { getWording } = this.context;
    const { item, itemStyles, currentPath, routeMap } = this.props;
    const title = item.get('title') || '';

    return (
      <li
        style={itemStyles.navItem}
        className={classNames({ 'current-menu': currentPath === routeMap[title.toUpperCase()] })}
      >
        <a href={item.get('url')}>
          { (() => {
            let itemWording = null;
            switch (title) {
              case 'Facilities':
                itemWording = getWording('online_facilities_label');
                break;
              case 'Membership':
                itemWording = getWording('online_memberships_lable');
                break;
              case 'Leagues':
                itemWording = getWording('online_sports_lable');
                break;
              case 'Donation':
                itemWording = getWording('online_donations_lable');
                break;
              case 'GiftCertificates':
                itemWording = getWording('online_gift_lable');
                break;
              default:
                itemWording = null;
                break;
            }
            return (
              <FormattedDyncMessage value={itemWording || (item.get('title') ? item.get('title') : '')} />
            );
          })() }
        </a>
      </li>
    );
  }

}


export default radium(NormalItem);
