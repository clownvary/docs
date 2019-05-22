import React from 'react';
import radium from 'radium';
import classNames from 'classnames';
import { FormattedDyncMessage } from 'shared/translation/formatted';
import BaseItem from './BaseItem';

/**
 * Special Navigation Item for following the old cui logic.
 * The logic to show second level for activity tab: (from: ANE-48065)
 * The max display sub activities is 23 and the max columns is 4.
 * one column will display 6 sub activities . the last one is always "See All Categories" link.
 * case 1:
 * If number of the sub activities is less than 6, all the sub activities
 * will show in one column.
 * case 2:
 * If number of the sub activities is more than 6 and less than 18, the sub
 * activities will split to 3 columns.
 */
export class ActivitiesItem extends BaseItem {
  render() {
    const { getWording } = this.context;
    const { item, itemStyles, currentPath, routeMap } = this.props;
    const wording = getWording('online_activities_label');
    return (
      <li
        style={itemStyles.navItem}
        className={classNames(
          'nav-activities-item',
          'nav-has-secondary-menu',
          { 'current-menu': currentPath === routeMap.ACTIVIVITIES }
        )}
      >
        <a href={item.get('url')}>
          <FormattedDyncMessage value={wording || item.get('title')} />
        </a>
      </li>
    );
  }
}

export default radium(ActivitiesItem);
