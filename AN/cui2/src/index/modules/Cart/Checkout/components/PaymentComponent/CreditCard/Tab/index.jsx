import React from 'react';
import { Icon } from 'react-base-ui/lib/components/SVG';

import { FormattedMessage } from 'shared/translation/formatted';
import selfMessages from '../translations';

export default class CreditCardTab extends React.Component {

  render() {
    return (
      <div>
        <Icon
          name="credit-card-m"
          aria-label="credit card icon"
        />
        <h4>
          <FormattedMessage {...selfMessages.tab_title} />
        </h4>
      </div>
    );
  }

}
