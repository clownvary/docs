import React from 'react';
import { mount } from 'enzyme';
import HolderInfo from 'index/PermitContract/components/HolderInfo';

const permitInfo = {
  reservation_date: 'Dec 30, 1899 0:00',
  expiration_date: 'Jun 11, 2017',
  system_user: 'Admin Recware',
  site_name: null,
  permit_status: 'Tentative',
  permit_number: 9000903,
  customer_name: null,
  permit_id: 2920,
  event_name: null,
  outstanding_balance: 0,
  permit_start_date: null,
  payers: [
    'Seymour212 Skinner212'
  ],
  permit_end_date: null,
  booking_number: 0,
  event_number: 0,
  invoice_total: 100.00,
  status_id: 2
};

const signatures = {
  customer: {
    cell_phone: '+8613344445555',
    customer_id: 32436,
    customer_name: 'Company With Agent 1215',
    customer_type: 'students',
    email_address: 'sw@887.com',
    home_phone: '+1US4434467656',
    mailing_address1: 'Ef',
    mailing_address2: 'Gy',
    mailing_city: 'Boston',
    mailing_state: 'LA',
    mailing_zipcode: '77823',
    work_phone: '+1US9927330123'
  },
  org: {
    phone_number: '(234) 423-4323',
    site_logo: '<img src="downloadFile.sdi?uploadedfile_id=187" border=0 alt="Site Logo"/>',
    site_name: 'Signature_Site',
    fax_number: 'FX-99721',
    email_address: 'sd@887.com',
    mailing_address1: 'De',
    mailing_address2: 'Sw',
    mailing_city: 'Portland',
    mailing_state: 'CA',
    mailing_zipcode: '90005'
  }
};

const company = {
  company_id: 63,
  company_name: '3 Company With Agent',
  company_phone1: '+1US9927330123',
  company_phone2: '+8613344445555',
  customer_type: 'Ancien/Alumni',
  mailing_address1: 'De',
  mailing_address2: 'Sw',
  mailing_city: 'Portland',
  mailing_state: 'CA',
  mailing_zipcode: '90005'
};

const props = {
  permitInfo,
  signatures
};

const initialData = {
  mailingAddressLabel : 'Mailing AddressXXX',
  companyLabel : 'CompanyXXX',
  homeLabel : 'HomeXXX',
  workLabel : 'WorkXXX',
  cellLabel : 'CellXXX',
  showEmployee: true
}

const setup = initProps => mount(<HolderInfo {...initProps} initialData={initialData} />);

it('CustomerInformation should render without errors', () => {
  const component = setup(props);

  expect(component).toBeTruthy();
  expect(component.find('.customer-info')).toHaveLength(1);

  let signaturesData = Object.assign({}, signatures, { company });
  component.setProps({ permitInfo, signatures: signaturesData });

  expect(component.find('.an-property-list')).toHaveLength(6);

  let companyData = Object.assign({}, company, { mailing_address2: '' });
  signaturesData = Object.assign({}, signatures, { company: companyData });
  component.setProps({ permitInfo, signatures: signaturesData });
  expect(component.find('.an-property-list')).toHaveLength(6);

  companyData = Object.assign({}, company, { mailing_address2: '' });
  signaturesData = Object.assign({}, signatures, { company: companyData });
  component.setProps({ permitInfo, signatures: signaturesData });
  expect(component.find('.an-property-list')).toHaveLength(6);

  companyData = Object.assign({}, company, { mailing_address1: '', mailing_state: null, mailing_zipcode: null });
  signaturesData = Object.assign({}, signatures, { company: companyData });
  component.setProps({ permitInfo, signatures: signaturesData });
  expect(component.find('.an-property-list')).toHaveLength(6);

});


it('payers is null should render without errors', () => {

  const permitInfoData = Object.assign({}, permitInfo, { payers: null });

  const component = setup({ permitInfo: permitInfoData, signatures });
  expect(component).toBeTruthy();
  expect(component.find('.an-property-list')).toHaveLength(4);

});

it('employeeId should be render correctly', () => {
  const permitInfoData = Object.assign({}, permitInfo, {
    employee_id: 'test',
    payers: null
  });
  const signaturesData = Object.assign({}, signatures, {
   customer:null
  });

  const component = setup({
    permitInfo: permitInfoData,
    signatures: signaturesData
  });
  const employeeId = component.find('.an-property-list').at(2);
  expect(employeeId.text()).toEqual('System Usertest');
});

it('customer residential address shall be displayed when the customer do not have no mailing address', () => {
  const customerInfoWithResidentialAddr = {
    cell_phone: '+8613344445555',
      customer_id: 32436,
      customer_name: 'Company With Agent 1215',
      customer_type: 'students',
      email_address: 'sw@887.com',
      home_phone: '+1US4434467656',
      address1: 'residential address1',
      address2: 'residential address2',
      city: 'Washington',
      state: 'CA',
      zipcode: '42613',
      work_phone: '+1US9927330123'
  };

  const component = setup({
    permitInfo,
    signatures: Object.assign({}, signatures, { customer: customerInfoWithResidentialAddr })
  });

  const residentialAddressDiv = component.find('.an-property-list__item__list');
  expect(residentialAddressDiv).toHaveLength(1);

  const spans = residentialAddressDiv.find('span');
  expect(spans.at(0).text()).toEqual(customerInfoWithResidentialAddr.address1);
  expect(spans.at(1).text()).toEqual(customerInfoWithResidentialAddr.address2);
  expect(spans.at(2).text()).toEqual('Washington, CA 42613');
});
