import React from 'react';
import { Icon } from 'react-base-ui/lib/components/SVG';
import { FormattedHtmlMessage } from 'shared/translation/formatted';

import 'shared/assets/images/img-empty-cart.png';
import './index.less';


export default class NoTransactions extends React.PureComponent {
  static contextTypes = {
    configurations: React.PropTypes.object
  }

  render() {
    const { configurations } = this.context;
    const defaultEmptyMessage = 'Your shopping cart is empty.';
    const message = configurations.get('empty_cart_message_tips_text') ?
                      configurations.get('empty_cart_message_tips_text') : defaultEmptyMessage;

    return (
      <div className="empty-shoppingcart u-color-secondarytext">
        <Icon name="empty-cart" aria-label="empty cart icon" />
        <FormattedHtmlMessage value={message} />
      </div>
    );
  }
}
