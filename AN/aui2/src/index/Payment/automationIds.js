const PREFIX = 'payment-';

const payer = {
  customer: `${PREFIX}payer-customer`,
  customerList: `${PREFIX}payer-customerList`,
  organization: `${PREFIX}payer-organization`,
  organizationList: `${PREFIX}payer-organizationList`,
  agents: `${PREFIX}payer-agents`
};

const paymentAction = {
  action: `${PREFIX}paymentAction-action`,
  actionItem: `${PREFIX}paymentAction-actionItem`
};

const paymentPlan = {
  plan: `${PREFIX}paymentPlan-plan`,
  actionItem: `${PREFIX}paymentPlan-actionItem`,
  select: `${PREFIX}paymentPlan-select`,
  frequency: `${PREFIX}paymentPlan-frequency`,
  number: `${PREFIX}paymentPlan-number`,
  firstDate: `${PREFIX}paymentPlan-firstDate`,
  setup: `${PREFIX}paymentPlan-setup`,
  creditCard: `${PREFIX}paymentPlan-creditCard`,
  chooseCard: `${PREFIX}paymentPlan-chooseCard`,
  electronicCheck: `${PREFIX}paymentPlan-electronicCheck`,
  chooseElectronic: `${PREFIX}paymentPlan-chooseElectronic`
};
const paymentSchedulesEdit = {
  dueDate: `${PREFIX}paymentSchedulesEdit-dueDate`,
  amount: `${PREFIX}paymentSchedulesEdit-amount`
};
const modals = {
  accountNumber: `${PREFIX}modals-accountNumber`,
  routingNumber: `${PREFIX}modals-routingNumber`,
  accountType: `${PREFIX}modals-accountType`,
  saveInformation: `${PREFIX}modals-saveInformation`
};

const paymentOption = {
  payNow: `${PREFIX}paymentOption-payNow`,
  optionList: `${PREFIX}paymentOption-optionList`,
  optionMethod: `${PREFIX}paymentOption-optionMethod`,
  optionAmount: `${PREFIX}paymentOption-optionAmount`,
  checkNumber: `${PREFIX}paymentOption-checkNumber`,
  creditCardList: `${PREFIX}paymentOption-creditCardList`,
  echeckList: `${PREFIX}paymentOption-echeckList`,
  giftCardList: `${PREFIX}paymentOption-giftCardList`
};

const creditCardModal = {
  number: `${PREFIX}creditCardModal-number`,
  cardType: `${PREFIX}creditCardModal-cardType`,
  dateMonth: `${PREFIX}creditCardModal-dateMonth`,
  dateYear: `${PREFIX}creditCardModal-dateYear`,
  saved: `${PREFIX}creditCardModal-saved`
};

export default {
  payer,
  paymentAction,
  paymentPlan,
  paymentSchedulesEdit,
  modals,
  paymentOption,
  creditCardModal
};
