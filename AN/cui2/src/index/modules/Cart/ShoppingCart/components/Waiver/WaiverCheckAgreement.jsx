import React from 'react';
import { connect } from 'react-redux';
import orderSummaryMessages from 'shared/translation/messages/Cart/orderSummary';
import { FormattedMessage } from 'shared/translation/formatted';
import WCAGHiddenLabel from 'shared/components/WCAG/WCAGHiddenLabel';
import Checkbox from 'react-base-ui/lib/components/Checkbox';
import { injectIntl } from 'react-intl';
import WarningAlert from 'react-base-ui/lib/components/Alert';
import CheckScrollModal from './CheckScrollModal';
import { hideWarningAlertAction, changeAgreementEntryAction } from '../../actions/waiver';
import * as waiverTypes from '../../consts/waiverTypes';

import selfMessages from './translations';

export class WaiverCheckAgreement extends React.PureComponent {

  static contextTypes = {
    configurations: React.PropTypes.object
  }

  constructor(props) {
    super(props);
    this.state = {
      checkScrollModalShown: false
    };
  }

  isInvalidEntry(id) {
    const {
      waiversAgreements, checkout
    } = this.props;
    const { needValidate } = checkout.toJS();
    const agreement = waiversAgreements[id];
    return needValidate && agreement && agreement.error;
  }

  render() {
    const { checkScrollModalShown } = this.state;
    const {
      waivers,
      waiversAgreements,
      warningAlertShown,
      intl: { messages }
    } = this.props;

    const {
      waiver_text: waiverText,
      waiver_text_donation: waiverTextDonation
    } = waivers;
    return (
      waiverText || waiverTextDonation ?
        <div>
          <div className="final-agreement attachment">
            <div className="attachment-form-item form-item-checkout-required">
              <Checkbox
                onChange={(e) => {
                  this.props.changeAgreementEntryAction({
                    id: waiverTypes.FINAL_SYSTEM_WAIVER,
                    value: e.target.checked
                  });
                }} disabled={warningAlertShown} aria-hidden={false} aria-label={messages[selfMessages.wcag_checkbox_label.id]} checked={waiversAgreements[waiverTypes.FINAL_SYSTEM_WAIVER].value} size="m" defaultChecked={false} value="agree"
                required
                aria-required
              >
                <WCAGHiddenLabel value={messages[selfMessages.wcag_checkbox_label.id]} />
              </Checkbox>
            </div>
            <div className="attachment-content">
              <b>
                <FormattedMessage {...selfMessages.have_reade_text} />{ ' ' }
                <a
                  href="#hash" onClick={(e) => {
                    this.setState({
                      checkScrollModalShown: true
                    });
                    e.preventDefault();
                  }}
                >
                  <FormattedMessage {...selfMessages.title} />
                </a>{ '.' }
              </b>
            </div>
          </div>
          {
            this.isInvalidEntry(waiverTypes.FINAL_SYSTEM_WAIVER) ?
              <span className="validationMsg u-color-errortext"><FormattedMessage {...orderSummaryMessages.required} /></span> : null
            }
          { warningAlertShown ?
            <WarningAlert type="warning" noClose>
              <FormattedMessage {...selfMessages.warning_text} />
            </WarningAlert> : null }
          <CheckScrollModal
            shown={checkScrollModalShown}
            waiverText={waiverText || waiverTextDonation} onClose={() => this.setState({
              checkScrollModalShown: false
            })} onScrollToBottom={() => {
              this.props.hideWarningAlertAction();
            }}
            warningAlertShown={warningAlertShown}
          />
        </div> : null
    );
  }
}

export default injectIntl(connect(
  null,
  {
    hideWarningAlertAction,
    changeAgreementEntryAction
  }
)(WaiverCheckAgreement));
