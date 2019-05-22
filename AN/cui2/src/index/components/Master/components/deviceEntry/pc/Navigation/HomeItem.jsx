import React from 'react';
import radium from 'radium';
import { FormattedDyncMessage } from 'shared/translation/formatted';
import locationHelp from 'shared/utils/locationHelp';
import BaseItem from './BaseItem';

/* eslint-disable no-script-url */
export class HomeItem extends BaseItem {

  render() {
    const { getWording } = this.context;
    const { item, itemStyles } = this.props;
    const wording = getWording('online_intro_label');

    return (
      <li style={itemStyles.navItem}>
        <a onClick={() => locationHelp.redirect(item.get('url'))} href="javascript:void(0)" role="button">
          <FormattedDyncMessage value={wording || item.get('title')} />
        </a>
      </li>
    );
  }
}

export default radium(HomeItem);
