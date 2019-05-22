import {
  CUSTOMER_TYPE_VALUE,
  COMPANY_TYPE_VALUE
} from '../consts/payerConfig';

export default function (payer) {
  const payerType = payer.payerType;
  let companyId = 0;
  let agentId = 0;
  let customerId = 0;
  let selectedCompany = null;
  let selectedPayerId = 0;
  let isCustomerNotCompany = false;

  switch (payerType) {
    case CUSTOMER_TYPE_VALUE:
      customerId = payer.customers.selected;
      selectedPayerId = customerId;
      isCustomerNotCompany = true;
      break;
    case COMPANY_TYPE_VALUE:
      companyId = payer.company.selected;
      selectedCompany = payer.company.data.filter(item => item.id === companyId)[0];
      agentId = (selectedCompany && selectedCompany.agents.selected) || 0;
      selectedPayerId = companyId;
      break;
    default:
      break;
  }

  return {
    companyId,
    agentId,
    customerId,
    selectedPayerId,
    isCustomerNotCompany
  };
}
