import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PageFooter from 'shared/components/PageFooter';
import { FormattedMessage } from 'shared/translation/formatted';
import { Sticky, StickyContainer } from 'react-base-ui/lib/components/Sticky';
import { withResponsiveProvider } from 'react-base-ui/lib/services/responsive';
import { tealiumService } from 'shared/services';
import TealiumPages from 'shared/services/tealium/consts/pages';

import OrderSummary from './components/OrderSummary';
import PrimaryPayment from './components/PrimaryPayment';
import SecondaryPayment from './components/SecondaryPayment';
import BillingAddress from './components/BillingAddress';
import FutureCharges from './components/FutureCharges';
import PaymentModules from './consts/paymentModules';
import { paymentTypes } from './consts';

import {
  fetchPaymentDataAction,

  getCountryStateAction,
  onCreateBillingAddressAction,
  onUpdateBillingAddressAction,
  createBillingAddressAction,
  updateBillingAddressAction,
  getBillingAddressAction,
  selectBillingAddressAction,
  showBillingAddressFormAction,
  hideBillingAddressFormAction,
  selectCountryAction,
  changeFormFieldAction,
  submitAction,
  cancelAction,
  uiSetIsInternationalAction,
  validateFormFieldAction,

  getFutureChargesAction,
  clickChargeAction
} from './actions';

import selfMessages from './translations';

import './index.less';

export class Checkout extends React.PureComponent {

  static contextTypes = {
    configurations: PropTypes.object
  }

  constructor(props) {
    super(props);
    this.state = {
      isSticky: false
    };
  }

  componentWillMount() {
    this.props.fetchPaymentDataAction();
  }

  componentDidMount() {
    tealiumService.sendView(TealiumPages.CHECKOUT);
  }

  handleChange = ({ isSticky }) => {
    this.setState({
      isSticky
    });
  }

  render() {
    const { configurations } = this.context;
    const { isSticky } = this.state;
    const {
      paymentManager,
      billingAddress,
      applyGiftCard,
      futureCharges,
      responsive: { isSm, isMd }
    } = this.props;
    const isMobileOrTablet = isSm || isMd;

    // get configs of billing address
    const billingAddressConfig = {
      hideBilling: configurations.get('hide_billing_name_address_on_confirmation'),
      canCreate: configurations.get('add_payer_online'),
      canUpdate: configurations.get('online_cust_addr_change'),
      isInternational: configurations.get('international_addr'),
      useAddressVerification: configurations.get('verisign_use_avs')
    };
    const billingAddressActions = {
      getCountryStateAction: this.props.getCountryStateAction,
      getBillingAddressAction: this.props.getBillingAddressAction,
      selectBillingAddressAction: this.props.selectBillingAddressAction,
      onUpdateBillingAddressAction: this.props.onUpdateBillingAddressAction,

      onCreateBillingAddressAction: this.props.onCreateBillingAddressAction,
      selectCountryAction: this.props.selectCountryAction,
      changeFormFieldAction: this.props.changeFormFieldAction,
      hideBillingAddressFormAction: this.props.hideBillingAddressFormAction,
      submitAction: this.props.submitAction,
      cancelAction: this.props.cancelAction,
      uiSetIsInternationalAction: this.props.uiSetIsInternationalAction,
      validateFormFieldAction: this.props.validateFormFieldAction
    };

    const futureChargesConfig = {
      hideFutureCharges: configurations.get('hide_payplan_details_for_online_checkout')
    };

    const selectedType = paymentManager.getIn(['modules', PaymentModules.PRIMARY, 'selectedType']);
    const typeValue = paymentManager.getIn(['modules', PaymentModules.PRIMARY, 'types', selectedType]);
    const hasPrimaryPaymentSet =
      selectedType === paymentTypes.CREDIT_CARD || (typeValue && typeValue.size && typeValue.get('list').size);

    return (
      <div className="module-checkout">
        <StickyContainer>
          <div className="an-grid an-col-mg-30">
            <div className="an-col an-col-8-12 an-md-col-1-1 an-sm-col-1-1 an-md-col-order-1 an-sm-col-order-1">
              <div className="an-panel module-checkout-payment">
                <h2><FormattedMessage {...selfMessages.payment_title} /></h2>
                <PrimaryPayment paymentManager={paymentManager} />

                <BillingAddress
                  data={billingAddress}
                  config={billingAddressConfig}
                  {...billingAddressActions}
                />

                <FutureCharges
                  data={futureCharges.get('data')}
                  primaryPayment={paymentManager.getIn(['modules', 'primary'])}
                  config={futureChargesConfig}
                  clickChargeAction={this.props.clickChargeAction}
                  getFutureChargesAction={this.props.getFutureChargesAction}
                />
                <SecondaryPayment paymentManager={paymentManager} futureCharges={futureCharges.get('data')} />
              </div>
            </div>
            <div className="an-col an-col-4-12 an-md-col-1-1 an-sm-col-1-1 an-lg-col-order-1">
              <Sticky
                topOffset={isMobileOrTablet ? 0 : -30}
                fullScreen={isMobileOrTablet}
                onChange={this.handleChange}
              >
                <div className="ordersummary-wrapper">
                  <OrderSummary
                    applyGiftCard={applyGiftCard}
                    isMobileOrTablet={isMobileOrTablet}
                    isSticky={isSticky}
                    hasPrimaryPaymentSet={hasPrimaryPaymentSet}
                  />
                </div>
              </Sticky>
            </div>
          </div>
        </StickyContainer>
        <PageFooter specificContent={configurations.get('page_newcuicheckout_footer')} />
      </div>
    );
  }

}


export default withResponsiveProvider(connect(
  state => ({
    applyGiftCard: state.modules.Cart.Checkout.applyGiftCard,
    billingAddress: state.modules.Cart.Checkout.billingAddress,
    paymentManager: state.modules.Cart.Checkout.paymentManager,
    futureCharges: state.modules.Cart.Checkout.futureCharges
  }),
  {
    fetchPaymentDataAction,

    getCountryStateAction,
    onCreateBillingAddressAction,
    onUpdateBillingAddressAction,
    createBillingAddressAction,
    updateBillingAddressAction,
    getBillingAddressAction,
    selectBillingAddressAction,
    showBillingAddressFormAction,
    hideBillingAddressFormAction,
    selectCountryAction,
    changeFormFieldAction,
    submitAction,
    cancelAction,
    uiSetIsInternationalAction,
    validateFormFieldAction,

    getFutureChargesAction,
    clickChargeAction
  }
)(Checkout));
