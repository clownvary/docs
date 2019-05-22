import radium from 'radium';
import React from 'react';
import { FormattedDyncMessage } from 'shared/translation/formatted';
import locationHelp from 'shared/utils/locationHelp';

import BaseItem from './BaseItem';

/* eslint-disable no-script-url */

export class NormalItem extends BaseItem {

  render() {
    const { getWording } = this.context;
    const { item, itemStyles } = this.props;

    return (
      <li style={itemStyles.navItem}>
        <a onClick={() => locationHelp.redirect(item.get('url'))} href="javascript:void(0)" role="button">
          { (() => {
            let itemWording = null;
            switch (item.get('title')) {
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
