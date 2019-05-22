import React from 'react';
import { AAUIDropdown } from 'react-base-ui/lib/components/Dropdown';
import { Icon } from 'react-base-ui/lib/components/SVG';
import { injectIntl } from 'react-intl';
import PropTypes from 'prop-types';
import { FormattedDyncMessage, FormattedMessage } from 'shared/translation/formatted';

import selfMessages from './translations';
import './index.less';

/* eslint-disable no-script-url */
export class BillingAddressList extends React.PureComponent {
  static propTypes = {
    data: PropTypes.shape({
      toJS: PropTypes.func
    }).isRequired,
    config: PropTypes.shape({
      canUpdate: PropTypes.bool.isRequired,
      useAddressVerification: PropTypes.bool.isRequired
    }).isRequired,

    onChange: PropTypes.func.isRequired,
    onUpdate: PropTypes.func.isRequired
  };

  renderBillingAddressDetail = (selectedBillingAddress) => {
    const details = [
      selectedBillingAddress.address1,
      selectedBillingAddress.address2,
      selectedBillingAddress.city,
      selectedBillingAddress.state,
      selectedBillingAddress.country,
      selectedBillingAddress.zip_code
    ].filter(t => t && /[\S]/.test(t)).join(', ');
    const realMailingName = selectedBillingAddress.real_mailing_name;
    return (
      <div className="billingaddress__detail-list">
        <ul>
          <li>
            <FormattedMessage {...selfMessages.mailingName} />
          </li>
          {
            realMailingName ?
              <li>
                <FormattedDyncMessage value={realMailingName} />
              </li> :
              <li className="billingaddress--no-mailingname">
                <FormattedMessage {...selfMessages.noMailingName} />
              </li>
          }
        </ul>
        <ul>
          <li>
            <FormattedMessage {...selfMessages.address} />
          </li>
          {
            details ?
              <li>
                <FormattedDyncMessage value={details} />
              </li> :
              <li className="billingaddress--no-address u-color-secondarytext">
                <FormattedMessage {...selfMessages.noAddress} />
              </li>
          }
        </ul>
      </div>
    );
  }

  render() {
    const { data,
      config,
      intl: { messages }
    } = this.props;

    const billingAddresses = data.get('billingAddresses');
    const selectedBillingAddress = data.get('selectedBillingAddress');
    const isListDisplay = data.get('isListDisplay');
    return (
      <div className="billingaddress-list">
        <h4><FormattedMessage {...selfMessages.title} /></h4>
        {
          config.useAddressVerification ?
            <div className="billingaddress-list-tip u-color-secondarytext">
              <FormattedMessage {...selfMessages.tip} />
            </div>
            : null
        }

        {
          isListDisplay ?
            <div>
              <AAUIDropdown
                placeholder={messages[selfMessages.placeHolder.id]}
                value={selectedBillingAddress.get('customer_id')}
                data={billingAddresses.toJS()}
                onChange={({ value }) => { this.props.onChange(value); }}
                maxHeight="350px"
              />
              <div className="billingaddress-list-label">
                <div className="billingaddress-list-label-detail">
                  {this.renderBillingAddressDetail(selectedBillingAddress.toJS())}
                </div>
                {
                  config.canUpdate ?
                    <a
                      href="javascript:void(0);"
                      className="billingaddress-list-label-trigger is-edit"
                      onClick={this.props.onUpdate}
                    >
                      <Icon
                        name="pencil"
                        type="link"
                        aria-label="edit icon"
                      />
                      <FormattedMessage {...selfMessages.edit} />
                    </a>
                    : null
                }
              </div>
            </div>
            : null
        }
      </div>
    );
  }
}

export default injectIntl(BillingAddressList);
