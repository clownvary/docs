import ReactDOM from 'react-dom';
import React, { PropTypes } from 'react';
import { injectIntl } from 'react-intl';
import PCIIframe from 'react-base-ui/lib/components/PCI';
import { isIE } from 'react-base-ui/lib/utils/browser';
import { Icon } from 'react-base-ui/lib/components/SVG';

import { FormattedMessage } from 'shared/translation/formatted';

import selfMessages from './translations';
import Tab from './Tab';

import './index.less';

export {
  Tab
};

export const name = 'CreditCard';

const getSecurityGuaranteeContent = () => (
  <div className="security-guarantee-content">
    <FormattedMessage
      {...selfMessages.form_guarantee_text} values={{
        active_company_name: (
          <span>
            <a target="activenetwork" href="http://www.activenetwork.com/">
              <FormattedMessage {...selfMessages.active_company_name} />
            </a>
            <Icon
              name="ex-link-m"
              aria-label="link icon"
            />
          </span>
        ),
        active_payment_guidelines: (
          <span>
            <a target="pcicomplianceguide" href="http://www.pcicomplianceguide.org/">
              <FormattedMessage {...selfMessages.active_payment_guidelines} />
            </a>
            <Icon
              name="ex-link-m"
              aria-label="link icon"
            />
          </span>
        )
      }}
    />
  </div>
);

export class CreditCard extends React.Component {

  static propTypes = {
    name: PropTypes.string.isRequired,
    typeName: PropTypes.string.isRequired
  }

  static contextTypes = {
    configurations: React.PropTypes.object
  }

  constructor(props) {
    super(props);
    this.state = {
      showGuarantee: false
    };

    this.instancePCIIframe = null;
  }

  componentWillUnmount() {
    const setInstanceOfPCIAction = this.props.data.get('setInstanceOfPCIAction');
    const iframeWrapperDom = ReactDOM.findDOMNode(this.iframeWrapper);// eslint-disable-line
    if (isIE() && iframeWrapperDom) {
      const iframeDom = iframeWrapperDom.querySelector('iframe');
      iframeDom.src = 'about:blank';
    }

    return setInstanceOfPCIAction && setInstanceOfPCIAction(
      this.props.name,
      this.props.typeName,
      null
    );
  }

  /**
   * Need a proper approach to trigger event from PCIIframe,
   * so ignore ut cover temporarily.
   */
  onPCIInstance = /* istanbul ignore next */(instance) => {
    const setInstanceOfPCIAction = this.props.data.get('setInstanceOfPCIAction');
    this.instancePCIIframe = instance;
    return setInstanceOfPCIAction && setInstanceOfPCIAction(
      this.props.name,
      this.props.typeName,
      instance
    );
  }

  /**
   * Need a proper approach to trigger event from PCIIframe,
   * so ignore ut cover temporarily.
   */
  onFetchPCILocation = /* istanbul ignore next */() => {
    const getPCILocationOfCCAsyncAction = this.props.data.get('getPCILocationOfCCAsyncAction');
    return getPCILocationOfCCAsyncAction && getPCILocationOfCCAsyncAction(this.props.name);
  }

  onTriggerGuarantee = () => {
    const { showGuarantee } = this.state;
    this.setState({ showGuarantee: !showGuarantee });
  }

  onIframeRef = (ref) => {
    this.iframeWrapper = ref;
  }

  render() {
    const { data, selectedType, typeName } = this.props;
    const { showGuarantee } = this.state;
    const showPriorCc = this.context.configurations.get('show_prior_cc');

    return (
      <div>
        <div className="merchant-name layout-width-limited u-color-secondarytext">
          {
            data.get('merchantName') ?
              <FormattedMessage
                {...selfMessages.merchant_name}
                values={{
                  merchant_name: data.get('merchantName')
                }}
              /> : <FormattedMessage {...selfMessages.no_merchant_name} />
          }
        </div>
        <div className="payment-iframe layout-width-limited">
          {
            (selectedType === typeName ||
              (this.instancePCIIframe && this.instancePCIIframe.originalInstance.iframeLoaded)) &&
              <PCIIframe
                source="an-cui"
                ref={this.onIframeRef}
                getInstance={this.onPCIInstance}
                getPCICheckoutIframeUrl={this.onFetchPCILocation}
              />
          }
        </div>
        {/* Show 'Saving Electronic Check Security Guarantee' row */}
        {
          !data.get('disableGuarantee') && showPriorCc ?
            <div className="form__control an-col an-col-1-1 layout-width-limited">
              <div className="collapseTrigger">
                <a
                  href="javascript:void(0);"// eslint-disable-line
                  className="security-guarantee"
                  onClick={this.onTriggerGuarantee}
                >
                  <FormattedMessage {...selfMessages.form_guarantee_title} />
                  <Icon
                    type="link"
                    name={`chevron-${showGuarantee ? 'up' : 'down'}`}
                    aria-label={`chevron ${showGuarantee ? 'up' : 'down'} icon`}
                  />
                </a>
              </div>
              {
                showGuarantee ? getSecurityGuaranteeContent() : null
              }
            </div> : null
        }
      </div>
    );
  }
}

export default injectIntl(CreditCard);
