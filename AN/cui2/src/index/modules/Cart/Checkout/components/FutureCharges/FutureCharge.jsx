import React from 'react';
import { injectIntl } from 'react-intl';
import CX from 'classnames';
import Checkbox from 'react-base-ui/lib/components/Checkbox';
import PropTypes from 'prop-types';
import { FormattedMessage, FormattedDyncMessage } from 'shared/translation/formatted';

import selfMessages from './translations';
import paymentECheckMessages from '../PaymentComponent/ECheck/translations';
import { AccountTypes } from '../PaymentComponent/consts/eCheck';
import { decodeCardNumber } from '../PaymentComponent/utils/decodeCardNumber';
import { paymentTypes } from '../../consts';

export class FutureCharge extends React.PureComponent {
  static propTypes = {
    futurePayment: PropTypes.shape({
      toJS: PropTypes.func
    }).isRequired,
    primaryPayment: PropTypes.shape({
      toJS: PropTypes.func
    }).isRequired,
    clickChargeAction: PropTypes.func.isRequired
  };

  render() {
    const {
      futurePayment,
      primaryPayment,
      clickChargeAction,
      isFirstRow,
      isLastRow,
      intl: { messages }
    } = this.props;
    const preAuthString = messages[selfMessages.preAuthorize.id];
    const selectedType = primaryPayment.get('selectedType');
    let cardDesc = ` ${preAuthString} (${messages[selfMessages.selectCard.id]})`;

    if (selectedType === paymentTypes.CREDIT_CARD) {
      cardDesc = ` ${preAuthString} ${messages[selfMessages.fixedCCLable.id]}`;
    }

    const selectedPaymentInfo = primaryPayment.getIn(['types', selectedType, 'selected']);
    if (
      selectedType === paymentTypes.ECHECK &&
      selectedPaymentInfo && selectedPaymentInfo.size > 0
    ) {
      const {
        account_number: accountNumber,
        account_type: accountType
      } = selectedPaymentInfo.toJS();
      cardDesc = ` ${preAuthString} (${messages[accountType === AccountTypes.CHECKING ?
        paymentECheckMessages.checking.id : paymentECheckMessages.savings.id]}  **** ${decodeCardNumber(accountNumber)})`;
    }

    return (
      <div className={CX('futurecharge', { first: isFirstRow }, { last: isLastRow })}>
        <div className="futurecharge-desc">
          <FormattedDyncMessage value={futurePayment.get('desc')} />
        </div>
        <div className="futurecharge-duedate u-color-secondarytext">
          <div className="futurecharge-list">
            <span className="futurecharge-duedate__label">
              <FormattedMessage {...selfMessages.nextDueLabel} />
            </span>
            <span className="futurecharge-duedate__content">
              <FormattedDyncMessage value={futurePayment.get('nextDue')} />
            </span>
          </div>
          <div className="futurecharge-list">
            <span className="futurecharge-duedate__label">
              <FormattedMessage {...selfMessages.lastDueLabel} />
            </span>
            <span className="futurecharge-duedate__content">
              <FormattedDyncMessage value={futurePayment.get('lastDue')} />
            </span>
          </div>
        </div>
        <div className="futurecharge-paymentinfo">
          <Checkbox
            aria-label="checkbox"
            size="m"
            onChange={e => clickChargeAction({ id: futurePayment.get('id'), checked: e.target.checked })}
            checked={futurePayment.get('checked')}
            disabled={futurePayment.get('disabled')}
          >
            <FormattedDyncMessage value={cardDesc} />
          </Checkbox>
        </div>
      </div>
    );
  }
}

export default injectIntl(FutureCharge);
