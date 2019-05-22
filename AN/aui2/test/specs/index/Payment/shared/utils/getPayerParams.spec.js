import getPayerParams from 'index/Payment/utils/getPayerParams';
import { CUSTOMER_TYPE_VALUE, COMPANY_TYPE_VALUE } from 'index/Payment/consts/payerConfig';

describe('index/Payment/utils/eCheckHelper', () => {
  it('getPayerParams method should work fine for customer', () => {
    const customerPayer = {
      payerType: CUSTOMER_TYPE_VALUE,
      customers: { selected: 882 }
    };
    expect(getPayerParams(customerPayer).customerId).toEqual(882);
  });

  it('getPayerParams method should work fine for company', () => {
    const companyPayer = {
      payerType: COMPANY_TYPE_VALUE,
      company: {
        selected: 882,
        data: [
          { id: 882, agents: { selected: 0 } }
        ]
      },
    };
    expect(getPayerParams(companyPayer).companyId).toEqual(882);
    expect(getPayerParams(companyPayer).agentId).toEqual(0);
  });

  it('getPayerParams method should work fine for invalid type', () => {
    expect(getPayerParams({})).toEqual({ companyId: 0, agentId: 0, customerId: 0, selectedPayerId: 0, isCustomerNotCompany: false });
  });
});
