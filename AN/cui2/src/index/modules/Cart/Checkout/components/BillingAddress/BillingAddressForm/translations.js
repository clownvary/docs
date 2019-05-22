import {
  defineMessages
} from 'react-intl';

const PREFIX = 'app.modules.cart.Checkout.components.BillingAddressForm';

export default defineMessages({
  labelAdd: {
    id: `${PREFIX}.labelAdd`,
    defaultMessage: 'Use a new billing address'
  },
  labelFirstName: {
    id: `${PREFIX}.labelFirstName`,
    defaultMessage: 'First Name'
  },
  labelLastName: {
    id: `${PREFIX}.labelLastName`,
    defaultMessage: 'Last Name'
  },
  labelMailingName: {
    id: `${PREFIX}.labelMailingName`,
    defaultMessage: 'Name'
  },
  labelStreetAddress: {
    id: `${PREFIX}.labelStreetAddress`,
    defaultMessage: 'Street Address'
  },
  secondaryStreetAddress: {
    id: `${PREFIX}.secondaryStreetAddress`,
    defaultMessage: 'Secondary Street Address'
  },
  labelCountry: {
    id: `${PREFIX}.labelCountry`,
    defaultMessage: 'Country'
  },
  labelStateProvince: {
    id: `${PREFIX}.labelStateProvince`,
    defaultMessage: 'State/Province'
  },
  labelCity: {
    id: `${PREFIX}.labelCity`,
    defaultMessage: 'City'
  },
  labelZipCode: {
    id: `${PREFIX}.labelZipCode`,
    defaultMessage: 'Zip/Post Code'
  },
  buttonAdd: {
    id: `${PREFIX}.buttonAdd`,
    defaultMessage: 'Add'
  },
  buttonSave: {
    id: `${PREFIX}.buttonSave`,
    defaultMessage: 'Save'
  },
  buttonCancel: {
    id: `${PREFIX}.buttonCancel`,
    defaultMessage: 'Cancel'
  },
  placeholderCountry: {
    id: `${PREFIX}.placeholderCountry`,
    defaultMessage: 'Select country'
  },
  placeholderCStateProvince: {
    id: `${PREFIX}.placeholderCStateProvince`,
    defaultMessage: 'Select state/province'
  },
  errorMessageRequired: {
    id: `${PREFIX}.errorMessageRequired`,
    defaultMessage: 'Required'
  }

});
