import React from 'react';
import radium from 'radium';
import classNames from 'classnames';
import { fromJS } from 'immutable';
import PropTypes from 'prop-types';
import { FormattedDyncMessage } from 'shared/translation/formatted';
import locationHelp from 'shared/utils/locationHelp';
import SecondaryMenu from './SecondaryMenu';
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
/* eslint-disable no-script-url */
export class ActivitiesItem extends BaseItem {

  constructor(props) {
    super(props);
    const children = props.item.get('children');

    this.name = 'activity';
    this.childrenItems = children.toJS().map((child, index) => { child.id = index; return child; });
  }

  static propTypes = {
    expandSecondaryMenu: PropTypes.shape([React.PropTypes.object]),
    expandSecondaryMenuAction: PropTypes.func
  }

  componentDidUpdate() {
    if (this.props.expandSecondaryMenu.get(this.name)) {
      const ul = this.menu.querySelector('ul');
      ul.querySelector('a').focus();
    }
  }

  render() {
    const { getWording } = this.context;
    const { item, itemStyles, expandSecondaryMenu, expandSecondaryMenuAction } = this.props;
    const wording = getWording('online_activities_label');

    return (
      <li
        style={itemStyles.navItem}
        className="nav-activities-item nav-has-secondary-menu"
        ref={(el) => { this.menu = el; }}
      >
        <a onClick={() => locationHelp.redirect(item.get('url'))} href="javascript:void(0)" role="button">
          <FormattedDyncMessage value={wording || item.get('title')} />
        </a>
        <div>
          <button aria-haspopup="true" onKeyDown={e => expandSecondaryMenuAction(e, this.name)}>
            {`Expand: ${wording || item.get('title')}`}
          </button>
        </div>
        <SecondaryMenu
          items={fromJS(this.childrenItems)}
          row={6}
          column={4}
          className={classNames({ 'expand-menu': expandSecondaryMenu.get(this.name) })}
          expandSecondaryMenuAction={expandSecondaryMenuAction}
          pranetMenuName={this.name}
        />
      </li>
    );
  }
}

export default radium(ActivitiesItem);
