import React from 'react';
import classNames from 'classnames';
import Heading from 'shared/components/Heading';
import Text from 'shared/components/Text';
import DigitalLabel from 'shared/components/DigitalLabel';
import { FormattedMessage, FormattedDyncMessage } from 'shared/translation/formatted';
import selfMessages from './translations';
import { getDigitalStyleByDiscountType, getParticipantsString } from './util';

export default class CouponItem extends React.PureComponent {
  render() {
    const { selectOption } = this.props;
    const {
      className,
      selected,
      option,
      active,
      mouseEvents
    } = selectOption;
    const baseClass = 'coupon-select-item';
    const classes = classNames(
      className,
      baseClass,
      {
        [`${baseClass}__active`]: active,
        [`${baseClass}__selected`]: selected
      }
    );
    const {
      text,
      amount,
      dcprogram_name: dcprogramName,
      discount_type: discountType,
      appliable_participants: appliableParticipants = []
    } = option;

    const digitalStyle = getDigitalStyleByDiscountType(discountType);
    const participants = getParticipantsString(appliableParticipants);
    const discountLabel = discountType === 0 ? `$${Math.abs(amount)}` : `${Math.abs(amount)}%`;
    const ariaLabel = `coupon number ${text} only for ${dcprogramName} program ${participants} discount up to ${discountLabel}`;

    return (
      <div
        className={classes}
        {...mouseEvents}
        onClick={mouseEvents.onMouseDown}
        aria-label={ariaLabel}
      >
        <div className="coupon-content">
          <Heading className="coupon-title" level={5}>
            <FormattedDyncMessage value={dcprogramName} />
          </Heading>
          {
            appliableParticipants.length &&
              <Text className="coupon-participants" size="xs" type="seconday">
                {
                  appliableParticipants.length > 1 ?
                    <FormattedMessage
                      {...selfMessages.participantsLabel}
                      values={{ participants }}
                    /> :
                    <FormattedMessage
                      {...selfMessages.participantsLabelWithOnly}
                      values={{ participants }}
                    />
                }
              </Text>
          }
          <Text className="coupon-code" size="xs" type="seconday">
            <FormattedMessage
              {...selfMessages.couponCodeLabel}
              values={{ couponCode: text }}
            />
          </Text>
        </div>
        <div className="coupon-digital-label">
          <DigitalLabel
            bold
            value={-Math.abs(amount)}
            size="xl"
            align="right"
            type="seconday"
            hintLableEnable={!discountType}
            digitalStyle={digitalStyle}
          />
        </div>
      </div>
    );
  }
}
