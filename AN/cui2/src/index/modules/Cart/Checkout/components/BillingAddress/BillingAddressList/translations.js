import {
  defineMessages
} from 'react-intl';

const PREFIX = 'app.modules.cart.Checkout.components.BillingAddressList';

export default defineMessages({
  title: {
    id: `${PREFIX}.title`,
    defaultMessage: 'Billing Address'
  },
  placeHolder: {
    id: `${PREFIX}.placeHolder`,
    defaultMessage: 'Choose Billing Address'
  },
  edit: {
    id: `${PREFIX}.edit`,
    defaultMessage: 'Edit'
  },
  tip: {
    id: `${PREFIX}.tip`,
    defaultMessage: 'Please be sure the billing information matches the cardholder of the credit card.'
  },
  mailingName: {
    id: `${PREFIX}.mailingName`,
    defaultMessage: 'Mailing Name  '
  },
  address: {
    id: `${PREFIX}.address`,
    defaultMessage: 'Address  '
  },
  noMailingName: {
    id: `${PREFIX}.noMailingName`,
    defaultMessage: 'No mailing name'
  },
  noAddress: {
    id: `${PREFIX}.noAddress`,
    defaultMessage: 'No address'
  }

});
