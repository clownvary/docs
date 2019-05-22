import React from 'react';
import upperFirst from 'lodash/upperFirst';
import { Icon } from 'react-base-ui/lib/components/SVG';

import { FormattedMessage } from 'shared/translation/formatted';
import selfMessages from '../translations';

export default class ECheckTab extends React.Component {

  static contextTypes = {
    getWording: React.PropTypes.func
  }

  render() {
    const checkLabel = upperFirst(this.context.getWording('check_label'));

    return (
      <div>
        <Icon
          name="echeck-m"
          aria-label="electronic check icon"
        />
        <h4>
          <FormattedMessage {...selfMessages.tabTitle} values={{ checkLabel }} />
        </h4>
      </div>
    );
  }

}
