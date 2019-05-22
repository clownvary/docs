import React from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { FormattedMessage, FormattedDyncMessage } from 'shared/translation/formatted';
import orderSummaryMessages from 'shared/translation/messages/Cart/orderSummary';
import WCAGHiddenLabel from 'shared/components/WCAG/WCAGHiddenLabel';
import decodeHtmlStr from 'react-base-ui/lib/utils/decodeHtmlStr';
import { Icon } from 'react-base-ui/lib/components/SVG';
import classNames from 'classnames';
import Input from 'react-base-ui/lib/components/Input';
import Checkbox from 'react-base-ui/lib/components/Checkbox';
import { confirm } from 'react-base-ui/lib/services/dialog';
import DialogScrollContainer from 'shared/components/DialogScrollContainer/DialogScrollContainer';
import { uiChangeAgreementEntryAction, changeAgreementEntryAction } from '../../actions/waiver';

import selfMessages, { PREFIX } from './translations';

export class Attachment extends React.PureComponent {

  isInvalidEntry() {
    const {
      itemData: { id },
      waiversAgreements, checkout
    } = this.props;
    const { needValidate } = checkout.toJS();
    const agreement = waiversAgreements[id];
    return needValidate && agreement && agreement.error;
  }
  capitalize = (str) => {
    if (str.length > 0) {
      return str.replace(/[a-zA-Z]/, x => x.toUpperCase());
    }
    return str;
  }


  render() {
    const {
      itemData: {
        stage,
      id,
      description,
      attachment_link: attachmentLink,
      require_initials_online: requireInitialsOnline,
      required_before_completing_transaction: requiredBeforeCompletingTransaction
      },
      intl: { messages }, waiversAgreements } = this.props;

    return (
      <div>
        <div className="attachment">
          <div
            className={classNames(
              'attachment-form-item',
              {
                'form-item-input-required': requiredBeforeCompletingTransaction && requireInitialsOnline,
                'form-item-checkout-required': requiredBeforeCompletingTransaction && !requireInitialsOnline,
                'form-item-initial': requireInitialsOnline,
                'form-item-checkbox': !requireInitialsOnline
              },
            )}
          >
            {requireInitialsOnline ?
              <Input
                required
                aria-required
                aria-label={messages[selfMessages.wcag_input_label.id]}
                errored={this.isInvalidEntry()} type="text" maxLength="4" size="m"
                value={waiversAgreements[id].value} placeholder={messages[selfMessages.initials.id]}
                onInput={(e) => {
                  this.props.uiChangeAgreementEntryAction({
                    id,
                    value: e.target.value
                  });
                }}
                onBlur={(e) => {
                  this.props.changeAgreementEntryAction({
                    id,
                    value: e.target.value
                  });
                }}
              /> :
              <Checkbox
                onChange={(e) => {
                  this.props.changeAgreementEntryAction({
                    id,
                    value: e.target.checked
                  });
                }} aria-hidden={false} aria-label={messages[selfMessages.wcag_checkbox_label.id]} checked={waiversAgreements[id].value} size="m" defaultChecked={false} value="agree"
                required
                aria-required
              >
                <WCAGHiddenLabel value={messages[selfMessages.wcag_checkbox_label.id]} />
              </Checkbox>
              }
          </div>
          <div className="attachment-content">
            <div className="attachment-content-title">
              <b>
                <FormattedMessage {...selfMessages.have_reade_text} />{' '}
                {stage.item_type === 0 ?
                  <FormattedDyncMessage value={description} /> :
                  <a
                    href="#hash" onClick={(e) => {
                      confirm(
                        (
                          <div className="waiver-attachment-alert-message">
                            <h3>
                              <FormattedDyncMessage value={this.capitalize(stage.description)} />
                            </h3>
                            <DialogScrollContainer>
                              <div className="atch-msg-content" dangerouslySetInnerHTML={{ __html: decodeHtmlStr(stage.item_text) }} />
                            </DialogScrollContainer>
                          </div>
                        ),
                        {
                          title: messages[`${PREFIX}.title`],
                          className: 'waiver-dialog'
                        }
                      );
                      e.preventDefault();
                    }}
                  >
                    <FormattedDyncMessage value={description} />
                  </a>}{'.'}
              </b>
            </div>
            <div className="attachment-content-href">
              {stage.uploaded_file_href_text ?
                <b>
                  <span>
                    <a href={attachmentLink} target="_blank" rel="noopener noreferrer">
                      <Icon name="file-o" aria-label="file icon" type="link" />
                      {' '}
                      <FormattedMessage {...selfMessages.view_attachment} />
                      {' '}
                    </a>
                    <Icon name="ex-link-m" aria-label="open attachment" />
                  </span></b> : null}
            </div>
          </div>
        </div>
        {
          this.isInvalidEntry() ? <span className="validationMsg u-color-errortext"><FormattedMessage {...orderSummaryMessages.required} /></span> : null
        }
      </div>
    );
  }

}
export default injectIntl(connect(
  null,
  {
    uiChangeAgreementEntryAction,
    changeAgreementEntryAction
  }
)(Attachment));
