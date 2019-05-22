import { defineMessages } from 'react-intl';

const PREFIX = 'app.modules.cart.Checkout.PaymentComponent.ECheck';

export default defineMessages({
  tabTitle: {
    id: `${PREFIX}.tabTitle`,
    defaultMessage: 'Electronic {checkLabel}'
  },
  checking: {
    id: `${PREFIX}.checking`,
    defaultMessage: 'Checking'
  },
  savings: {
    id: `${PREFIX}.savings`,
    defaultMessage: 'Savings'
  },
  routingNumber: {
    id: `${PREFIX}.routingNumber`,
    defaultMessage: 'Routing Number'
  },
  useNewEcpText: {
    id: `${PREFIX}.useNewEcpText`,
    defaultMessage: 'Use a new electronic {checkLabel}'
  },
  formLabelAccountType: {
    id: `${PREFIX}.formLabelAccountType`,
    defaultMessage: 'Account Type'
  },
  formLabelAccountNumber: {
    id: `${PREFIX}.formLabelAccountNumber`,
    defaultMessage: 'Account Number'
  },
  formLabelRoutingNumber: {
    id: `${PREFIX}.formLabelRoutingNumber`,
    defaultMessage: 'Routing Number'
  },
  placeholderOfAccountType: {
    id: `${PREFIX}.placeholderOfAccountType`,
    defaultMessage: 'Select account type'
  },
  formGuaranteeTitle: {
    id: `${PREFIX}.formGuaranteeTitle`,
    defaultMessage: 'Saving Electronic {checkLabel} Security Guarantee'
  },
  ecpSavedForFurtureUse: {
    id: `${PREFIX}.ecpSavedForFurtureUse`,
    defaultMessage: 'Save the electronic {checkLabel} for future use'
  },
  formGuaranteeText: {
    id: `${PREFIX}.formGuaranteeText`,
    defaultMessage: 'Rest assured that your electronic {checkLabel} information is safe with {activeCompanyName}. To protect your information ACTIVE complies with the strict {activePaymentGuidelines}. Your electronic {checkLabel} number will be fully encrypted, and will never be shown in its entirety; only the last four digits will ever be displayed.'
  },
  activeCompanyName: {
    id: `${PREFIX}.activeCompanyName`,
    defaultMessage: 'ACTIVE Network'
  },
  activePaymentGuidelines: {
    id: `${PREFIX}.activePaymentGuidelines`,
    defaultMessage: 'Payment Card Industry (PCI) Data Security Standards guidelines'
  }
});
