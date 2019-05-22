import React from 'react';
import { mount } from 'enzyme';
import PropertyList from 'src/components/PropertyList';

const companyData = {
  company_id: 63,
  company_name: '3 Company With Agent',
  company_phone1: '+1US9927330123',
  company_phone2: '+8613344445555',
  customer_type: 'Ancien/Alumni',
  mailing_address1: 'De',
  mailing_address2: 'Sw',
  mailing_city: 'Portland',
  mailing_state: 'CA',
  mailing_zipcode: 90005
};

const getData = () => {
  const data = {
    companyName: companyData.company_name,
    customerType: companyData.customer_type,
    age: 27,
    phone: 15882357846
  };

  data.companyAddress = [];
  const {
    mailing_address1: address1,
    mailing_address2: address2,
    mailing_zipcode: mailingZipcode = ''

  } = companyData;

  let {
    mailing_city: mailingCity,
    mailing_state: mailingState
  } = companyData;

  if (address1) {
    data.companyAddress.push(address1);
  }

  if (address2) {
    data.companyAddress.push(address2);
  }

  if ((mailingState || mailingZipcode) && mailingCity) {
    mailingCity = `${mailingCity}, `;
  } else if (!mailingCity) {
    mailingCity = '';
  }

  mailingState = mailingState ? `${mailingState} ` : '';

  if (mailingState && mailingZipcode) {
    mailingState = `${mailingState} `;
  } else if (!mailingState) {
    mailingState = '';
  }

  const mailingAddress = `${mailingCity}${mailingState}${mailingZipcode}`;

  if (mailingAddress) {
    data.companyAddress.push(mailingAddress);
  }

  return data;
};

const itemsData = getData();

const items = [
  {
    name: 'Company Name',
    value: itemsData.companyName,
    className: 'item-class-test'
  },
  {
    name: <p>Customer Type</p>,
    value: itemsData.customerType,
    onRenderValue: item => (<span>{item.value || '-'}</span>)
  },
  {
    name: 'Company Address',
    value: itemsData.companyAddress
  },
  { name: 'Profession', value: itemsData.profession },
  { name: 'Age', value: itemsData.age },
  { name: 'Phone', value: itemsData.phone, onRenderName: item => <span>{`work ${item.name}`}</span> },
  { name: 'Address', value: '', showNullname: true }
];

const props = {
  className: 'test-class',
  showColon: true,
  items
};

const setup = initProps => mount(<PropertyList {...initProps} />);

it('PropertyList should render without errors', () => {
  const component = setup(props);

  expect(component).toBeTruthy();
  expect(component.find('.an-property-list')).toHaveLength(1);
  expect(component.find('.an-property-list__item')).toHaveLength(5);
});

