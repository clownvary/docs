import React from 'react';
import { injectIntl } from 'react-intl';
import { FormattedMessage } from 'shared/translation/formatted';
import PropTypes from 'prop-types';

import FutureCharge from './FutureCharge';
import selfMessages from './translations';

import './index.less';

export class FutureCharges extends React.PureComponent {
  static propTypes = {
    data: PropTypes.shape({
      toJS: PropTypes.func
    }).isRequired,
    primaryPayment: PropTypes.shape({
      toJS: PropTypes.func
    }),
    config: PropTypes.shape({
      hideFutureCharges: PropTypes.bool.isRequired
    }).isRequired,
    clickChargeAction: PropTypes.func.isRequired,
    getFutureChargesAction: PropTypes.func.isRequired
  };

  componentWillMount() {
    const { config: { hideFutureCharges } } = this.props;
    if (!hideFutureCharges) {
      this.props.getFutureChargesAction();
    }
  }

  render() {
    const { data, primaryPayment, clickChargeAction, config: { hideFutureCharges } } = this.props;
    const isFutureChargesExisting = !hideFutureCharges && data && data.size > 0;

    return (
      isFutureChargesExisting &&
      <div className="futurecharges">
        <h4><FormattedMessage {...selfMessages.title} /></h4>

        {
          data.map((payment, index) => (
            <FutureCharge
              key={index}
              futurePayment={payment}
              primaryPayment={primaryPayment}
              clickChargeAction={clickChargeAction}
              isFirstRow={index === 0}
              isLastRow={index === data.size - 1}
            />
          ))
        }
      </div>
    );
  }
}

export default injectIntl(FutureCharges);
