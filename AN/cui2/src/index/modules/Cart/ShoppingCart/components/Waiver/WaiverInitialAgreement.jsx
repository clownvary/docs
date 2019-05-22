import React from 'react';
import { connect } from 'react-redux';
import decodeHtmlStr from 'react-base-ui/lib/utils/decodeHtmlStr';
import orderSummaryMessages from 'shared/translation/messages/Cart/orderSummary';
import { FormattedMessage } from 'shared/translation/formatted';
import Input from 'react-base-ui/lib/components/Input';
import { injectIntl } from 'react-intl';
import { confirm } from 'react-base-ui/lib/services/dialog';
import DialogScrollContainer from 'shared/components/DialogScrollContainer/DialogScrollContainer';
import { uiChangeAgreementEntryAction, changeAgreementEntryAction } from '../../actions/waiver';
import * as waiverTypes from '../../consts/waiverTypes';

import selfMessages from './translations';

export class WaiverInitialAgreement extends React.PureComponent {

  static contextTypes = {
    configurations: React.PropTypes.object
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
    const { waivers, waiversAgreements, intl: { messages } } = this.props;
    const {
          waiver_initials_online_text: waiverInitialsOnlineText
    } = waivers;
    return (
      waiverInitialsOnlineText ?
        <div>
          <div className="final-agreement attachment">
            <div className="attachment-form-item form-item-input-required">
              <Input
                required
                aria-required
                aria-label={messages[selfMessages.wcag_input_label.id]}
                errored={this.isInvalidEntry(waiverTypes.FINAL_INITIALS_WAIVER)}
                type="text" maxLength="4" size="m"
                value={waiversAgreements[waiverTypes.FINAL_INITIALS_WAIVER].value}
                placeholder={messages[selfMessages.initials.id]}
                onInput={(e) => {
                  this.props.uiChangeAgreementEntryAction({
                    id: waiverTypes.FINAL_INITIALS_WAIVER,
                    value: e.target.value
                  });
                }}
                onBlur={(e) => {
                  this.props.changeAgreementEntryAction({
                    id: waiverTypes.FINAL_INITIALS_WAIVER,
                    value: e.target.value
                  });
                }}
              />
            </div>
            <div className="attachment-content">
              <b>
                <FormattedMessage {...selfMessages.have_reade_text} />{' '}
                <a
                  href="#hash" onClick={(e) => {
                    confirm(
                      (
                        <div className="waiver-attachment-alert-message">
                          <h3>
                            {messages[selfMessages.default_name.id]}
                          </h3>
                          <DialogScrollContainer>
                            <div className="atch-msg-content" dangerouslySetInnerHTML={{ __html: decodeHtmlStr(waiverInitialsOnlineText) }} />
                          </DialogScrollContainer>
                        </div>
                      ),
                      {
                        title: messages[selfMessages.title.id],
                        className: 'waiver-dialog'
                      }
                    );
                    e.preventDefault();
                  }}
                >
                  <FormattedMessage {...selfMessages.title} />
                </a>{'.'}
              </b>
            </div>
          </div>
          {
            this.isInvalidEntry(waiverTypes.FINAL_INITIALS_WAIVER) ?
              <span className="validationMsg u-color-errortext"><FormattedMessage {...orderSummaryMessages.required} /></span> : null
          }
        </div> : null
    );
  }
}

export default injectIntl(connect(
  null,
  {
    uiChangeAgreementEntryAction,
    changeAgreementEntryAction
  }
)(WaiverInitialAgreement));
