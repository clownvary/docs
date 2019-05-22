export function extractHolderInfo(data) {
  const { general_information: {
    company_id: companyId,
    company_name: companyName,
    customer_id: customerId,
    customer_name: customerName,
    customer_type: customerType,
    customer_phone: customerPhone,
    customer_email: customerEmail,
    available_company_agents: availableCompanyAgents
  } } = data;

  return {
    companyId,
    companyName,
    customerId,
    customerName,
    customerType,
    customerPhone,
    customerEmail,
    availableCompanyAgents
  };
}
