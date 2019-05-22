import React from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import map from 'lodash/map';
import size from 'lodash/size';
import Button from 'react-base-ui/lib/components/Button';
import { AAUIDropdown } from 'react-base-ui/lib/components/Dropdown';
import { InputNumeric } from 'react-base-ui/lib/components/InputNumeric';
import { FormattedMessage } from 'shared/translation/formatted';
import buttonsMessages from 'shared/translation/messages/button';
import selfMessages from './translations';
import * as quickDonationActions from '../../actions/quickdonation';

import './index.less';

export class QuickDonation extends React.PureComponent {

  static contextTypes = {
    configurations: React.PropTypes.object
  }

  onCompaignChange(value) {
    this.props.changeCampaignAction(value);
  }

  render() {
    const { configurations } = this.context;
    const { intl: { messages }, quickdonation, changeAmountAction } = this.props;
    const {
      amount,
      selectedCampaign,
      selectedCampaignValue,
      donationAmounts
    } = quickdonation.toJS();
    const {
      enable_quick_donation_in_cart: enableQuickDonationInCart,
      allow_donations_online: allowDonationsOnline
    } = configurations.toJS();

    const allowCustomAmount = selectedCampaign ? selectedCampaign.allow_custom_amount : false;
    return (
    enableQuickDonationInCart && allowDonationsOnline &&
    quickdonation.get('donations').size ?
      <div className="quickdonation-panel an-panel">
        <h3><FormattedMessage {...selfMessages.title} /></h3>
        <div className="quickdonation-panel-form">
          <AAUIDropdown
            placeholder={messages[selfMessages.placeholderCampaign.id]}
            value={selectedCampaignValue}
            data={quickdonation.get('donations').toJS()}
            onChange={({ value }) => {
              if (value !== selectedCampaignValue) this.onCompaignChange(value);
            }}
            maxHeight="150"
          />
          <span className="currency-flag">$</span>
          <div className="input-group">
            <InputNumeric
              textAlign="right"
              listMaxHeight="150px"
              aria-label="Drop down list/Entry field"
              placeHolder="0.00"
              disabled={!selectedCampaign}
              readonly={!allowCustomAmount}
              allowKeySpin={allowCustomAmount}
              items={map(donationAmounts, item => item.amount)}
              onValueChange={({ value }) => changeAmountAction(value)}
              value={amount}
              showTrigger={size(donationAmounts) > 0 && selectedCampaign}
              listPopupOptions={{ showShadow: false }}
            />
          </div>
        </div>
        <div className="an-col-right">
          <Button type="primary" size="sm" disabled={!(parseFloat(amount) > 0)} onClick={this.props.submitQuickDonationAction}>
            <FormattedMessage {...buttonsMessages.donate} />
          </Button>
        </div>
      </div> : null
    );
  }
}

export default connect(
  null,
  {
    ...quickDonationActions
  }
)(injectIntl(QuickDonation));
