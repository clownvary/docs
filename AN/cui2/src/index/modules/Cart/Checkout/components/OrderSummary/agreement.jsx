import React from 'react';
import PropTypes from 'prop-types';
import { fromJS } from 'immutable';
import { injectIntl } from 'react-intl';
import { FormattedHtmlMessage } from 'shared/translation/formatted';
import DialogScrollContainer from 'shared/components/DialogScrollContainer/DialogScrollContainer';
import PaymentPlan from './paymentPlan';
import selfMessages from './translations';
import { getAgreementType } from '../../utils/agreement';

import './agreement.less';
/* eslint-disable no-script-url */

export class Agreement extends React.PureComponent {
  static contextTypes = {
    configurations: PropTypes.object
  }

  static propTypes = {
    data: PropTypes.shape({}).isRequired,
    intl: PropTypes.shape({
      messages: PropTypes.shape({}).isRequired
    }).isRequired
  };

  static replaceAll(str, replaced, replacement) {
    const reg = new RegExp(replaced, 'g');
    str = str.replace(reg, replacement);
    return str;
  }

  fillValueIntoAgreement() {
    const data = this.props.data;
    const { configurations } = this.context;

    const agencyName = configurations.get('organization_name');
    const payerName = data.get('payer_name');
    const siteInfo = data.get('site_info') || fromJS({});
    let address = siteInfo.get('address1') || '';
    if (address.length > 0 && siteInfo.get('address2').length > 0) {
      address = `${address}<br/>${siteInfo.get('address2')}`;
    }

    const agencyInfo = `${agencyName}<br/>${address}<br/>${siteInfo.get('city')}<br/>${siteInfo.get('state')}<br/>${siteInfo.get('zip')}<br/>${siteInfo.get('phone')}<br/>`;

    const isShowPADAgreement = configurations.get('show_pad_agreement_for_ecp');
    let text = isShowPADAgreement ? configurations.get('pad_agreement_text') : configurations.get('ach_agreement_text');

    const replaceAllFun = this.constructor.replaceAll;

    text = replaceAllFun(text, '{agency_name}', agencyName);
    text = replaceAllFun(text, '{payer_name}', payerName);
    text = replaceAllFun(text, '{address}', address);
    text = replaceAllFun(text, '{agency_info}', agencyInfo);

    return text;
  }

  render() {
    const agreement = this.fillValueIntoAgreement();
    const splitAgreement = agreement.split('{payment_schedule}');
    const { messages } = this.props.intl;
    const { configurations } = this.context;
    const text = messages[selfMessages.agreementDesc.id];
    const agreementDesc = getAgreementType(configurations, text, false);
    return (
      <div className="agreement-panel">
        <DialogScrollContainer>
          <div className="agreement-panel__content">
            <a href="javascript:void(0);" className="fake-link">
              <div>
                <p>
                  <FormattedHtmlMessage value={splitAgreement[0]} />
                </p>
                <PaymentPlan data={this.props.data} />
                <p>
                  <FormattedHtmlMessage value={splitAgreement[1]} />
                </p>
              </div>
              <div className="desc">
                {agreementDesc}
              </div>
            </a>
          </div>
        </DialogScrollContainer>
      </div>
    );
  }
}

export default injectIntl(Agreement);
