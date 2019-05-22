import React from 'react';
import { injectIntl } from 'react-intl';
import { FormattedMessage, FormattedNumber, FormattedDyncMessage } from 'shared/translation/formatted';
import { PREFIX } from 'shared/translation/messages/wording';
import selfMessages from './translations';

import './participant.less';

export class ParticipantHeader extends React.PureComponent {

  render() {
    const { participant, index, intl: { messages } } = this.props;
    const {
      item_number: itemNumber,
      first_name: firstName,
      last_name: lastName,
      shorthand_name: shorthandName,
      sub_total: subTotal
    } = participant;

    return (
      <div className="an-grid an-col-middle an-col-mg-15 participant-header">
        <h2 className="an-col-grow-1 an-col-basis-0 an-col-right an-sm-col-order-2">
          { firstName || lastName ?
            <span className="participant-header__username">
              <FormattedDyncMessage value={`${firstName}`} />
              <FormattedDyncMessage value={lastName} />
            </span> :
            <FormattedMessage {...selfMessages.nameUnspecified} /> }
        </h2>
        <div className="participant-avator an-sm-col-order-1">
          <div className={`dync-bg-set${(index % 8) + 1}`}>
            <FormattedDyncMessage value={shorthandName || 'U'} />
          </div>
        </div>
        <div className="an-col-grow-1 an-col-basis-0 an-sm-col-order-3">
          <div className="an-bubble">
            <FormattedNumber numberStyle="currency" currency="USD" value={subTotal}>
              { formattedNum => (
                <FormattedMessage {...selfMessages.bubble} values={{ item_number: itemNumber, items_wording: messages[itemNumber > 1 ? `${PREFIX}.items` : `${PREFIX}.item`], sub_total: <b>{ formattedNum }</b> }} />
                ) }
            </FormattedNumber>
          </div>
        </div>
      </div>
    );
  }
}
export default injectIntl(ParticipantHeader);
