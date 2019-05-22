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
 * The logic to show second level for calendars tab: (from: ANE-48065)
 * The max display second level calendars is 23 and the max columns is 3.
 * one column will display 8 second level calendars. the last one is
 * always "See All Calendars" link.
 */
/* eslint-disable no-script-url */
export class CalendarItem extends BaseItem {

  constructor(props) {
    super(props);
    const children = props.item.get('children');

    this.name = 'calendar';
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
    const wording = getWording('online_calendars_lable');

    return (
      <li
        style={itemStyles.navItem}
        className="nav-calendar-item nav-has-secondary-menu"
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
          row={8}
          column={3}
          className={classNames({ 'expand-menu': expandSecondaryMenu.get(this.name) })}
          expandSecondaryMenuAction={expandSecondaryMenuAction}
          pranetMenuName={this.name}
        />
      </li>
    );
  }
}

export default radium(CalendarItem);
