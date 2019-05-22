import React from 'react';
import { FormattedMessage } from 'shared/translation/formatted';
import filter from 'lodash/filter';
import Attachments from './Attachments';
import WaiverCheckAgreement from './WaiverCheckAgreement';
import WaiverInitialAgreement from './WaiverInitialAgreement';
import selfMessages from './translations';

import './index.less';

export default class Waiver extends React.PureComponent {

  render() {
    const { waiver, checkout } = this.props;
    const { waivers, warningAlertShown, waiversAgreements } = waiver.toJS();
    const { attachments } = waivers || {};
    const initialAttachments = filter(attachments, item => item.require_initials_online);
    const checkAttachments = filter(attachments, item => !item.require_initials_online);

    return (
      waivers ?
        <div className="waiver-layouts an-panel waiver-panel" >
          <h2><FormattedMessage {...selfMessages.title} /></h2>
          <div aria-labelledby="waiver-content-text">
            <p id="waiver-content-text">
              <b><FormattedMessage {...selfMessages.description_01} /></b>
              <FormattedMessage {...selfMessages.description_02} />
            </p>
          </div>
          <div className="waiver-body">
            {initialAttachments.length > 0 ?
              <Attachments
                attachments={initialAttachments}
                waiversAgreements={waiversAgreements}
                checkout={checkout}
              /> : null
            }
            <WaiverInitialAgreement
              waivers={waivers} checkout={checkout}
              waiversAgreements={waiversAgreements}
            />

            {checkAttachments.length > 0 ?
              <Attachments
                attachments={checkAttachments}
                waiversAgreements={waiversAgreements}
                checkout={checkout}
              /> : null
            }
            <WaiverCheckAgreement
              waivers={waivers} checkout={checkout}
              waiversAgreements={waiversAgreements} warningAlertShown={warningAlertShown}
            />
          </div>
        </div> : null
    );
  }
}
