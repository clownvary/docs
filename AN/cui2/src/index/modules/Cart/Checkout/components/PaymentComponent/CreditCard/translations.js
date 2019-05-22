import { defineMessages } from 'react-intl';

const PREFIX = 'app.modules.cart.Checkout.PaymentComponent.CreditCard';

export default defineMessages({
  tab_title: {
    id: `${PREFIX}.tab_title`,
    defaultMessage: 'Credit Card'
  },
  merchant_name: {
    id: `${PREFIX}.merchant_name`,
    defaultMessage: 'ACT* {merchant_name} or Active Network will show up on your credit card statement for this payment.'
  },
  no_merchant_name: {
    id: `${PREFIX}.no_merchant_name`,
    defaultMessage: 'ACT* or Active Network will show up on your credit card statement for this payment.'
  },
  credit_card_type_0: {
    id: `${PREFIX}.credit_card_type_0`,
    defaultMessage: 'Other Credit Card'
  },
  credit_card_type_1: {
    id: `${PREFIX}.credit_card_type_1`,
    defaultMessage: 'Visa'
  },
  credit_card_type_2: {
    id: `${PREFIX}.credit_card_type_2`,
    defaultMessage: 'MasterCard'
  },
  credit_card_type_3: {
    id: `${PREFIX}.credit_card_type_3`,
    defaultMessage: 'Other'
  },
  credit_card_type_4: {
    id: `${PREFIX}.credit_card_type_4`,
    defaultMessage: 'Diners'
  },
  credit_card_type_5: {
    id: `${PREFIX}.credit_card_type_5`,
    defaultMessage: 'Discover'
  },
  credit_card_type_6: {
    id: `${PREFIX}.credit_card_type_6`,
    defaultMessage: 'JCB'
  },
  credit_card_type_7: {
    id: `${PREFIX}.credit_card_type_7`,
    defaultMessage: 'Other Payment'
  },
  use_new_card_text: {
    id: `${PREFIX}.use_new_card_text`,
    defaultMessage: 'Use a new card'
  },
  form_label_card_number: {
    id: `${PREFIX}.form_label_card_number`,
    defaultMessage: 'Card Number'
  },
  form_label_expiration_date: {
    id: `${PREFIX}.form_label_expiration_date`,
    defaultMessage: 'Expiration Date'
  },
  form_label_CVVandCVC: {
    id: `${PREFIX}.form_label_CVVandCVC`,
    defaultMessage: 'CVV/CVC'
  },
  form_guarantee_title: {
    id: `${PREFIX}.form_guarantee_title`,
    defaultMessage: 'Saving Credit Card Security Guarantee'
  },
  form_guarantee_text: {
    id: `${PREFIX}.form_guarantee_text`,
    defaultMessage: 'Rest assured that your credit card information is safe with {active_company_name}. To protect your information ACTIVE complies with the strict {active_payment_guidelines}. Your credit card number will be fully encrypted, and will never be shown in its entirety; only the last four digits will ever be displayed. Additionally, ACTIVE never saves your security code.'
  },
  active_company_name: {
    id: `${PREFIX}.active_company_name`,
    defaultMessage: 'ACTIVE Network'
  },
  active_payment_guidelines: {
    id: `${PREFIX}.active_payment_guidelines`,
    defaultMessage: 'Payment Card Industry (PCI) Data Security Standards guidelines'
  },
  save_card_for_furture: {
    id: `${PREFIX}.save_card_for_furture`,
    defaultMessage: 'Save the card for future use'
  },
  add_button: {
    id: `${PREFIX}.add_button`,
    defaultMessage: 'Add'
  },
  placeholder_expiration_month: {
    id: `${PREFIX}.placeholder_expiration_month`,
    defaultMessage: 'Select month'
  },
  placeholder_expiration_year: {
    id: `${PREFIX}.placeholder_expiration_year`,
    defaultMessage: 'Select year'
  },
  cvv_cvc_help_text: {
    id: `${PREFIX}.cvv_cvc_help_text`,
    defaultMessage: `The last 3 digits on the back of the credit card or for AE, the 4 digits on the front of the card.
                    For your protection, we do not keep it after the transaction is completed.`
  },
  error_cc_required: {
    id: `${PREFIX}.error_cc_required`,
    defaultMessage: 'Required'
  },
  error_cc_card_type_invalid: {
    id: `${PREFIX}.error_cc_card_type_invalid`,
    defaultMessage: 'Invalid card type or card type is not accepted.'
  },
  error_cc_card_type_undetermined: {
    id: `${PREFIX}.error_cc_card_type_undetermined`,
    defaultMessage: 'Cannot determine the type of credit card.'
  },
  error_cc_expiry_overtime: {
    id: `${PREFIX}.error_cc_expiry_overtime`,
    defaultMessage: 'Expiration year is more than 10 years in the future.'
  },
  error_cc_expiry_past: {
    id: `${PREFIX}.error_cc_expiry_past`,
    defaultMessage: 'Expiration is in the past.'
  },
  error_cc_cvv_cvc_digit3: {
    id: `${PREFIX}.error_cc_cvv_cvc_digit3`,
    defaultMessage: 'Security Code: accepts only 3 digits for this card type.'
  },
  error_cc_cvv_cvc_digit4: {
    id: `${PREFIX}.error_cc_cvv_cvc_digit4`,
    defaultMessage: 'Security Code: accepts only 4 digits for this card type.'
  }
});
