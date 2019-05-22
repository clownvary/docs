import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';

import BillingAddressList from './BillingAddressList';
import BillingAddressForm from './BillingAddressForm';

export class BillingAddress extends React.PureComponent {
  static propTypes = {
    data: PropTypes.shape({
      toJS: PropTypes.func
    }).isRequired,
    config: PropTypes.shape({
      canUpdate: PropTypes.bool.isRequired,
      useAddressVerification: PropTypes.bool.isRequired,
      canCreate: PropTypes.bool.isRequired,
      hideBilling: PropTypes.bool.isRequired,
      isInternational: PropTypes.bool.isRequired
    }).isRequired,

    selectBillingAddressAction: PropTypes.func.isRequired,
    onUpdateBillingAddressAction: PropTypes.func.isRequired,

    onCreateBillingAddressAction: PropTypes.func.isRequired,
    selectCountryAction: PropTypes.func.isRequired,
    changeFormFieldAction: PropTypes.func.isRequired,
    hideBillingAddressFormAction: PropTypes.func.isRequired,
    submitAction: PropTypes.func.isRequired,
    cancelAction: PropTypes.func.isRequired,
    uiSetIsInternationalAction: PropTypes.func.isRequired,
    validateFormFieldAction: PropTypes.func.isRequired
  };

  componentWillMount() {
    const {
      config: { isInternational },
      getCountryStateAction,
      getBillingAddressAction,
      uiSetIsInternationalAction
    } = this.props;
    getCountryStateAction(isInternational)
      .then(() => getBillingAddressAction())
      .then(() => uiSetIsInternationalAction({ isInternational }));
  }

  componentWillUnmount() {
    // need reset unsaved state
    this.props.cancelAction();
  }

  render() {
    const { config, data } = this.props;

    return (
      !config.hideBilling ?
        <div className="billingaddress-wrapper layout-width-limited">
          <BillingAddressList
            data={data}
            config={config}

            onChange={this.props.selectBillingAddressAction}
            onUpdate={this.props.onUpdateBillingAddressAction}
          />
          <BillingAddressForm
            data={data}
            config={config}

            onCreate={this.props.onCreateBillingAddressAction}
            onChangeCountry={this.props.selectCountryAction}
            onChange={this.props.changeFormFieldAction}
            onHide={this.props.hideBillingAddressFormAction}
            onSubmit={this.props.submitAction}
            onCancel={this.props.cancelAction}
            onValidate={this.props.validateFormFieldAction}
          />
        </div>
        : null
    );
  }
}


export default injectIntl(BillingAddress);
