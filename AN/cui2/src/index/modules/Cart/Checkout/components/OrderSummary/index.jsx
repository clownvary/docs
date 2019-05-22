import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import Button from 'react-base-ui/lib/components/Button';
import Checkbox from 'react-base-ui/lib/components/Checkbox';
import Modal from 'react-base-ui/lib/components/Modal';
import { Icon } from 'react-base-ui/lib/components/SVG';
import classNames from 'classnames';
import orderSummaryMessages from 'shared/translation/messages/Cart/orderSummary';
import WCAGHiddenLabel from 'shared/components/WCAG/WCAGHiddenLabel';
import CommonOrderSummary from 'index/modules/Cart/shared/CommonOrderSummary';
import { FormattedMessage } from 'shared/translation/formatted';
import buttonsMessages from 'shared/translation/messages/button';
import selfMessages from './translations';
import Agreement from './agreement';
import { getAgreementType } from '../../utils/agreement';
import { fixScroll } from './fixStyle';

import {
  displayAgreementAction,
  signAgreementAction,
  commitOrderAsyncAction,
  payAsyncAction
} from '../../actions/agreement';

import ApplyGiftCard from '../ApplyGiftCard';

import './index.less';

/* eslint-disable no-script-url */

export class OrderSummary extends React.PureComponent {

  static contextTypes = {
    configurations: PropTypes.object
  }

  static propTypes = {
    isSticky: PropTypes.bool,
    isMobileOrTablet: PropTypes.bool,
    hasPrimaryPaymentSet: PropTypes.bool.isRequired,
    applyGiftCard: PropTypes.shape({}),
    orderSummary: PropTypes.shape({
      data: PropTypes.shape({}).isRequired
    }).isRequired,
    agreement: PropTypes.shape({
      isDisplayAgreement: PropTypes.bool.isRequired,
      isSignedAgreement: PropTypes.bool.isRequired,
      agreement: PropTypes.shape({}).isRequired
    }).isRequired,
    intl: PropTypes.shape({
      messages: PropTypes.shape({}).isRequired
    }).isRequired,
    payAsyncAction: PropTypes.func.isRequired,
    displayAgreementAction: PropTypes.func.isRequired,
    signAgreementAction: PropTypes.func.isRequired,
    commitOrderAsyncAction: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      expanded: !props.isMobileOrTablet
    };
  }

  componentDidUpdate(prevProps) {
    const { isMobileOrTablet, agreement: nextAgreement } = this.props;
    const { agreement: prevAgreement } = prevProps;
    const { expanded } = this.state;
    if (isMobileOrTablet && expanded) {
      fixScroll();
    }
    /* istanbul ignore if*/
    if (prevAgreement.get('isSignedAgreement') !== nextAgreement.get('isSignedAgreement')) {
      this.authorizationModal.updateTabHandler();
    }
  }

  onClickContinueBtn() {
    const parameters = {
      payment_type: 9,
      ecp_agreement: true
    };

    this.props.commitOrderAsyncAction(parameters);
    this.displayAgreement();
  }

  triggerCollapse() {
    const { expanded } = this.state;
    const { isMobileOrTablet } = this.props;
    isMobileOrTablet && this.setState({ expanded: !expanded });
  }

  displayAgreement() {
    this.props.displayAgreementAction();
  }

  pay() {
    const { messages } = this.props.intl;
    const unselectedCardMessage = messages[selfMessages.unselectedCard.id];
    const unselectedSecondaryCardMessage = messages[selfMessages.unselectedSecondaryCard.id];
    this.props.payAsyncAction(unselectedCardMessage, unselectedSecondaryCardMessage);
  }

  render() {
    const {
      isSticky,
      isMobileOrTablet,
      orderSummary,
      agreement,
      applyGiftCard: applyGiftCardData,
      intl,
      hasPrimaryPaymentSet
    } = this.props;

    const data = orderSummary.get('data');
    const isDisplayAgreement = agreement.get('isDisplayAgreement');
    const isSignedAgreement = agreement.get('isSignedAgreement');
    const { messages } = intl;
    const { configurations } = this.context;
    const { expanded } = this.state;

    const text = messages[selfMessages.contuneButtonLabel.id];
    const checkboxLabel = getAgreementType(configurations, text, true);

    const isShowPADAgreement = configurations.get('show_pad_agreement_for_ecp');
    const agreementTitle = isShowPADAgreement ?
      messages[selfMessages.PADAgreementTitle.id] :
      messages[selfMessages.ACHAgreementTitle.id];

    const hasDueNowPayment = data.get('due_now') !== 0;
    const hasFuturePayment = data.get('payment_plan_deferred') !== 0;

    return (
      <div
        className={classNames('ordersummary-panel an-panel', {
          'is-sticky': isSticky
        })}
      >
        <div className="ordersummary-title">
          <h3>
            <a onClick={() => this.triggerCollapse()} className="ordersummary-title__collapse-trigger">
              <FormattedMessage {...orderSummaryMessages.title} />
              <Icon
                type="link"
                name={`chevron-${expanded ? 'up' : 'down'}`}
                className="ordersummary-title__icon-trigger"
                aria-label={`chevron ${expanded ? 'up icon' : 'down icon'}`}
              />
            </a>
          </h3>
        </div>
        <div
          className={classNames('an-split-line ordersummary-title__split-line', {
            'is-show': expanded
          })}
        />
        <CommonOrderSummary data={data} expanded={isMobileOrTablet ? expanded : true} />
        <ApplyGiftCard
          orderSummaryData={data}
          applyGiftCardData={applyGiftCardData}
          isMobileOrTablet={isMobileOrTablet}
          expanded={isMobileOrTablet ? expanded : true}
        />
        <Button
          type="strong"
          className={classNames('pay__button', { 'is-expanded': expanded })}
          onClick={() => { this.pay(); }}
          disabled={(hasDueNowPayment || hasFuturePayment) && !hasPrimaryPaymentSet}
        >
          <FormattedMessage {...buttonsMessages.pay} />
        </Button>
        <Modal
          title={agreementTitle}
          shown={isDisplayAgreement}
          onClose={() => { this.displayAgreement(); }}
          ref={(ref) => { this.authorizationModal = ref; }}
        >
          <div className="modal-body">
            <Agreement data={this.props.agreement.get('agreement')} />
          </div>

          <div className="modal-footer">
            <div className="sign-warpper">
              <div className="checkbox-warpper">
                <Checkbox
                  aria-label="checkbox"
                  className="agreement-checkbox"
                  onChange={() => { this.props.signAgreementAction(); }}
                  size="m"
                  checked={isSignedAgreement}
                >
                  <WCAGHiddenLabel value={messages[selfMessages.wcag_checkbox_label.id]} />
                </Checkbox>
              </div>
              <div className="checkbox-label">
                <a href="javascript:void(0);">
                  {checkboxLabel}
                </a>
              </div>
            </div>
            <div>
              <Button
                className="btn-continue"
                type="strong"
                disabled={!isSignedAgreement}
                onClick={() => { this.onClickContinueBtn(); }}
              >
                <FormattedMessage {...buttonsMessages.continue} />
              </Button>
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}

export default injectIntl(connect(
// istanbul ignore next
  state => ({
    orderSummary: state.modules.Cart.Checkout.orderSummary,
    agreement: state.modules.Cart.Checkout.agreement
  }),
  {
    displayAgreementAction,
    signAgreementAction,
    commitOrderAsyncAction,
    payAsyncAction
  }
)(OrderSummary));
