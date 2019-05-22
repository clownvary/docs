import React from 'react';
import { injectIntl } from 'react-intl';
import { Icon } from 'react-base-ui/lib/components/SVG';
import { FormattedMessage } from 'shared/translation/formatted';
import { getCUIServerUrl } from 'shared/utils/getCUIServerUrl';
import { formatI18n } from 'shared/translation/formatI18n';
import SocialSharing from 'shared/components/SocialSharing';
import selfMessages from './translations';
import './index.less';

export class ReceiptCode extends React.PureComponent {
  static contextTypes = {
    configurations: React.PropTypes.object,
    systemSettings: React.PropTypes.object
  }

  getParameter() {
    const { configurations, systemSettings } = this.context;
    const url = systemSettings.get('original_base_url');
    const organizationName = configurations.get('organization_name');
    const { sharingActivityName, sharingActivityId } = this.props;
    const { messages } = this.props.intl;

    const prefixUrl = `${url}/Activity_Search?activity_id=`;

    const sharedText = formatI18n(
      messages[selfMessages.sharedText.id],
      {
        activityName: sharingActivityName
      }
    );

    const parameter = `${prefixUrl}${sharingActivityId}`;
    const twitterParameter = `${parameter}&text=${sharedText}&via=${organizationName}`;

    return {
      twitterParameter,
      facebookParameter: parameter
    };
  }

  render() {
    const { configurations } = this.context;
    const { receiptNumber, showWidgets } = this.props;
    const url = `${getCUIServerUrl(configurations)}/receipt`;

    return (
      <div className="receipt-code__pannel">
        <div className="an-panel receipt-pannel an-grid an-col-1">
          <h2>
            <FormattedMessage
              {...selfMessages.title} values={{
                item_number: receiptNumber
              }}
            />
          </h2>
          <div className="receipt__content">
            <span><FormattedMessage {...selfMessages.receiptMessage} /></span>
            <span className="receipt__descript">
              <a href={url} target="_blank" rel="noopener noreferrer">
                {' '}
                <FormattedMessage {...selfMessages.receiptPrint} />
              </a>
              <Icon
                name="ex-link-m"
                aria-label="open receipt icon"
              />
            </span>
          </div>

          {
            showWidgets ?
              <div className="receipt__share">
                <span><FormattedMessage {...selfMessages.receiptShare} /></span>
                <SocialSharing parameters={this.getParameter()} width={650} height={590} />
              </div>
            : null
          }
        </div>
      </div>
    );
  }
}

export default injectIntl(ReceiptCode);
