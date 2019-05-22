import React, { Component } from 'react';
import { FormattedDyncMessage } from 'shared/translation/formatted';
import locationHelp from 'shared/utils/locationHelp';


/* eslint-disable no-script-url */
export default class SecondaryMenuColumn extends Component {

  static propTypes = {
    items: React.PropTypes.shape([React.PropTypes.object])
  }

  static defaultProps = {}

  render() {
    const { items } = this.props;
    return (
      <div className="nav-secondary-menu-column">
        <ul>
          {
            items.map((item, i) => (
              <li key={i}>
                <a role="button" href="javascript:void(0)" onClick={() => locationHelp.redirect(item.get('url'))} data-index={item.get('id')}>
                  <FormattedDyncMessage value={item.get('title')} />
                </a>
              </li>
              ))
          }
        </ul>
      </div>
    );
  }
}
