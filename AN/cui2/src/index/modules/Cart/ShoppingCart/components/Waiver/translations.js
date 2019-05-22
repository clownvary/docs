import { defineMessages } from 'react-intl';

export const PREFIX = 'app.modules.cart.ShoppingCart.Waiver';

export default defineMessages({
  title: {
    id: `${PREFIX}.title`,
    defaultMessage: 'Waiver'
  },
  default_name: {
    id: `${PREFIX}.default_name`,
    defaultMessage: 'Waiver'
  },
  description_01: {
    id: `${PREFIX}.description_01`,
    defaultMessage: 'Please read the following waivers and agreements carefully. '
  },
  description_02: {
    id: `${PREFIX}.description_02`,
    defaultMessage: 'They include releases of liability and waiver of legal rights, and deprive you of the ability to sue certain parties. By agreeing electronically, you acknowledge that you have both read and understood all text presented to you as part of the checkout process.'
  },
  have_reade_text: {
    id: `${PREFIX}.have_reade_text`,
    defaultMessage: 'I have read and agree to'
  },
  warning_text: {
    id: `${PREFIX}.warning_text`,
    defaultMessage: 'Read this waiver completely before you select the check box.'
  },
  view_attachment: {
    id: `${PREFIX}.view_attachment`,
    defaultMessage: 'View attachment'
  },
  initials: {
    id: `${PREFIX}.initials`,
    defaultMessage: 'Initials'
  },
  wcag_checkbox_label: {
    id: `${PREFIX}.wcag_checkbox_label`,
    defaultMessage: 'Agree to waiver'
  },
  wcag_input_label: {
    id: `${PREFIX}.wcag_input_label`,
    defaultMessage: 'Customer Initials for Agree to Waiver'
  },
  wcag_system_waiver_ok_button: {
    id: `${PREFIX}.wcag_system_waiver_ok_button`,
    defaultMessage: 'Go through full waiver content to enable the checkbox to agree'
  }
});
