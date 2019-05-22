import React from 'react';
import classNames from 'classnames';
import PropertyList from '../../src/components/PropertyList';
import Checkbox from '../../src/components/Checkbox';

import '../base.less';
import '../layout.less';
import './index.less';

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
    phone: 15882356748
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

const itemData = getData();

const items = [
  {
    name: 'Company Name',
    value: itemData.companyName,
    className: 'item-class-test'
  },
  {
    name: 'Customer Type',
    value: itemData.customerType,
    onRenderValue: item => (<span>{item.value || '-'}</span>)
  },
  {
    name: 'Company Address',
    value: itemData.companyAddress
  },
  { name: 'Profession', value: itemData.profession },
  { name: 'Phone', value: itemData.phone },
  { name: 'Address', value: '', showNullName: true }
];

class App extends React.PureComponent {
  state = {
    data: {
      right: true,
      bold: false,
      showColon: false
    }
  }

  handleChange = (e) => {
    const { data } = this.state;
    data[e.target.name] = e.target.checked;
    this.setState({ data: { ...data } });
  }

  render() {
    const { data } = this.state;
    const className = classNames({ 'label-align-right': data.right }, { 'label-bold': data.bold });
    return (
      <div>
        <div className="waiver">
          <div className="sample-content">
            <div>
              <PropertyList
                className={className}
                showColon={data.showColon}
                items={items}
              />
            </div>
          </div>
        </div>
        <div className="side-bar">
          <div className="options">
            <div className="row">
              <Checkbox
                defaultChecked
                name="right"
                onChange={this.handleChange}
              >
                label-align-right
              </Checkbox>
            </div>
            <div className="row">
              <Checkbox
                name="bold"
                onChange={this.handleChange}
              >
                label-bold
              </Checkbox>
            </div>
            <div className="row">
              <Checkbox
                name="showColon"
                onChange={this.handleChange}
              >
                showColon
              </Checkbox>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
