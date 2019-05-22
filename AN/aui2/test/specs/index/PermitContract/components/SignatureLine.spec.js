import React from 'react';
import { mount } from 'enzyme';
import SignatureLine from 'index/PermitContract/components/SignatureLine';

const company = {
  company_id: 63,
  company_name: "3 Company With Agent",
  company_phone1: "+1US9927330123",
  company_phone2: "+8613344445555",
  customer_type: "Ancien/Alumni",
  mailing_address1: "De",
  mailing_address2: "Sw",
  mailing_city: "Portland",
  mailing_state: "CA",
  mailing_zipcode: "90005"
};
const customer = {
  cell_phone: "+8613344445555",
  customer_id: 32436,
  customer_name: "Company With Agent 1215",
  email_address: "sw@887.com",
  home_phone: "+1US4434467656",
  mailing_address1: "Ef",
  mailing_address2: "Gy",
  mailing_city: "Boston",
  mailing_state: "LA",
  mailing_zipcode: "77823",
  work_phone: "+1US9927330123"
};
const org = {
  phone_number: "(234) 423-4323",
  site_logo: "<img src=\"downloadFile.sdi?uploadedfile_id=187\" border=0 alt=\"Site Logo\"/>",
  site_name: "Signature_Site",
  fax_number: "FX-99721",
  email_address: "sd@887.com",
  mailing_address1: "De",
  mailing_address2: "Sw",
  mailing_city: "Portland",
  mailing_state: "CA",
  mailing_zipcode: "90005"
};

const permitHolder = {
  showSignature4AdditionalCustomer: true,
  showSignature4Organization: true,
  showSignature4PermitHolder: true
}

const initialData = {
  mailingAddressLabel : 'Mailing AddressXXX',
  companyLabel : 'CompanyXXX',
  homeLabel : 'HomeXXX',
  workLabel : 'WorkXXX',
  cellLabel : 'CellXXX'
}

const setup = props => mount(<SignatureLine {...props} initialData={initialData}/>);

it('SignatureLine should render company customer without errors', () => {
  const component = setup({
    signatures: { org, company, customer},
    ...permitHolder
  });

  expect(component).toBeTruthy();
  expect(component.find('section.signature')).toHaveLength(1);

  const signatureContainers = component.find('.signature-container');
  expect(signatureContainers).toHaveLength(2);

  const orgSignatureContainer = signatureContainers.at(0);
  expect(orgSignatureContainer.find('.signature-line')).toHaveLength(1);
  expect(orgSignatureContainer.find('.signature-line').text()).toEqual('X:');
  expect(orgSignatureContainer.find('.signature-date')).toHaveLength(1);
  expect(orgSignatureContainer.find('.signature-date').text()).toEqual('Date:');
  expect(orgSignatureContainer.find('.signature-info')).toHaveLength(1);
  expect(orgSignatureContainer.find('.break-all')).toHaveLength(1);
  expect(orgSignatureContainer.find('.signature-info-name')).toHaveLength(1);
  expect(orgSignatureContainer.find('.signature-info-name').text()).toEqual('Signature_Site');
  expect(orgSignatureContainer.find('p')).toHaveLength(6);

  const companySignatureContainer = signatureContainers.at(1);
  expect(companySignatureContainer.find('.signature-line')).toHaveLength(2);
  expect(companySignatureContainer.find('.signature-line').at(0).text()).toEqual('X:');
  expect(companySignatureContainer.find('.signature-date')).toHaveLength(2);
  expect(companySignatureContainer.find('.signature-date').at(1).text()).toEqual('Date:');
  expect(companySignatureContainer.find('.signature-info')).toHaveLength(1);
  expect(companySignatureContainer.find('.signature-info').find('p')).toHaveLength(12);
  expect(companySignatureContainer.find('.break-all')).toHaveLength(1);
  expect(companySignatureContainer.find('.signature-info-name')).toHaveLength(1);
  expect(companySignatureContainer.find('.signature-info-name').text()).toEqual('3 Company With Agent');

  const additionalCustomerSignatureContainer = companySignatureContainer.find('.signature-container-additional')
  expect(additionalCustomerSignatureContainer.find('.signature-line')).toHaveLength(1);
  expect(additionalCustomerSignatureContainer.find('.signature-line').text()).toEqual('X:');
  expect(additionalCustomerSignatureContainer.find('.signature-date')).toHaveLength(1);
  expect(additionalCustomerSignatureContainer.find('.signature-date').text()).toEqual('Date:');
});

it('SignatureLine should render individual customer without errors', () => {
  const component = setup({
    signatures: { org, customer },
    ...permitHolder,
    showSignature4AdditionalCustomer: false
  });

  expect(component).toBeTruthy();
  expect(component.find('section.signature')).toHaveLength(1);

  const signatureContainers = component.find('.signature-container');
  expect(signatureContainers).toHaveLength(2);

  const orgSignatureContainer = signatureContainers.at(0);
  expect(orgSignatureContainer.find('.signature-line')).toHaveLength(1);
  expect(orgSignatureContainer.find('.signature-line').text()).toEqual('X:');
  expect(orgSignatureContainer.find('.signature-date')).toHaveLength(1);
  expect(orgSignatureContainer.find('.signature-date').text()).toEqual('Date:');
  expect(orgSignatureContainer.find('.signature-info')).toHaveLength(1);
  expect(orgSignatureContainer.find('.signature-info-name')).toHaveLength(1);
  expect(orgSignatureContainer.find('.break-all')).toHaveLength(1);
  expect(orgSignatureContainer.find('.signature-info-name').text()).toEqual('Signature_Site');
  expect(orgSignatureContainer.find('p')).toHaveLength(6);

  const customerSignatureContainer = signatureContainers.at(1);
  expect(customerSignatureContainer.find('.signature-line')).toHaveLength(1);
  expect(customerSignatureContainer.find('.signature-line').at(0).text()).toEqual('X:');
  expect(customerSignatureContainer.find('.signature-date')).toHaveLength(1);
  expect(customerSignatureContainer.find('.signature-date').at(0).text()).toEqual('Date:');
  expect(customerSignatureContainer.find('.signature-info')).toHaveLength(1);
  expect(customerSignatureContainer.find('.signature-info').find('p')).toHaveLength(8);
  expect(customerSignatureContainer.find('.break-all')).toHaveLength(1);
  expect(customerSignatureContainer.find('.signature-info-name')).toHaveLength(1);
  expect(customerSignatureContainer.find('.signature-info-name').text()).toEqual('Company With Agent 1215');
});

it('SignatureLine should render empty holder without errors', () => {
  const component = setup({
    signatures: { },
    ...permitHolder,
    showSignature4AdditionalCustomer: false,
    showSignature4Organization: false,
    showSignature4PermitHolder: false,
  });

  expect(component).toBeTruthy();
  expect(component.find('section.signature')).toHaveLength(1);

  const signatureContainers = component.find('.signature-container');
  expect(signatureContainers).toHaveLength(2);

  const orgSignatureContainer = signatureContainers.at(0);
  expect(orgSignatureContainer.find('.signature-line')).toHaveLength(0);
  expect(orgSignatureContainer.find('.signature-date')).toHaveLength(0);
  expect(orgSignatureContainer.find('.signature-info')).toHaveLength(0);

  const customerSignatureContainer = signatureContainers.at(1);
  expect(customerSignatureContainer.find('.signature-line')).toHaveLength(0);
  expect(customerSignatureContainer.find('.signature-date')).toHaveLength(0);
  expect(customerSignatureContainer.find('.signature-info')).toHaveLength(0);
  expect(customerSignatureContainer.find('.signature-container-additional')).toHaveLength(0);
});
