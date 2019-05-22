import {
  defineMessages
} from 'react-intl';

const PREFIX = 'app.modules.cart.Checkout.components.FutureCharges';

export default defineMessages({
  title: {
    id: `${PREFIX}.title`,
    defaultMessage: 'Future Charges'
  },
  preAuthorize: {
    id: `${PREFIX}.preAuthorize`,
    defaultMessage: 'Pre-authorize'
  },
  lastDueLabel: {
    id: `${PREFIX}.lastDueLabel`,
    defaultMessage: 'Last Due'
  },
  nextDueLabel: {
    id: `${PREFIX}.nextDueLabel`,
    defaultMessage: 'Next Due'
  },
  selectCard: {
    id: `${PREFIX}.selectCard`,
    defaultMessage: 'select a payment method'
  },
  fixedCCLable: {
    id: `${PREFIX}.fixedCCLable`,
    defaultMessage: 'your selected credit card'
  }
});
