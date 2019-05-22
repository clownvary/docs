import React from 'react';
import decodeHtmlStr from 'react-base-ui/lib/utils/decodeHtmlStr';
import PropertyList from 'react-base-ui/lib/components/PropertyList';
import './index.less';

const renderPhoneInfo = (customerInfo, homeLabel, workLabel, cellLabel) => {
  const emailAddress = customerInfo.email_address;
  /* istanbul ignore next */
  const items = [
    { name: `${decodeHtmlStr(workLabel) || 'Work'} Phone Number`, value: customerInfo.work_phone },
    { name: `${decodeHtmlStr(homeLabel) || 'Home'} Phone Number`, value: customerInfo.home_phone },
    { name: `${decodeHtmlStr(cellLabel) || 'Cell'} Phone Number`, value: customerInfo.cell_phone },
    {
      name: 'Email Address',
      className: 'email-item',
      onRenderValue: () => {
        if (emailAddress) {
          return (<a href={`mailto:${emailAddress}`} className="email">{emailAddress}</a>);
        }

        return null;
      }
    }
  ];

  return (
    <PropertyList className="label-bold label-align-right" items={items} />
  );
};

const renderCompanyPhone = (companyInfo, companyLabel) => {
  /* istanbul ignore next */
  const items = [
    { name: `${decodeHtmlStr(companyLabel) || 'Company'} Phone 1 Number`, value: companyInfo.company_phone1 },
    { name: `${decodeHtmlStr(companyLabel) || 'Company'} Phone 2 Number`, value: companyInfo.company_phone2 }
  ];
  return <PropertyList className="company-phone label-bold label-align-right" items={items} />;
};

const renderCustomerContent = (customerInfo, homeLabel, workLabel, cellLabel) => {
  const items = [
    { name: 'Agent Name', value: customerInfo.customer_name }
  ];
  return (
    <div className="customer-content u-clearfix">
      <PropertyList className="label-bold label-align-right" items={items} />
      {renderPhoneInfo(customerInfo, homeLabel, workLabel, cellLabel)}
    </div>
  );
};

const formatAddressData = (data, prefix = '') => {
  const addresses = [];
  const {
    [`${prefix}address1`]: address1,
    [`${prefix}address2`]: address2
  } = data;

  let {
    [`${prefix}city`]: mailingCity,
    [`${prefix}state`]: mailingState,
    [`${prefix}zipcode`]: mailingZipcode
  } = data;

  if (address1) {
    addresses.push(address1);
  }

  if (address2) {
    addresses.push(address2);
  }

  if ((mailingState || mailingZipcode) && mailingCity) {
    mailingCity = `${mailingCity}, `;
  } else if (!mailingCity) {
    mailingCity = '';
  }

  if (mailingState && mailingZipcode) {
    mailingState = `${mailingState} `;
  } /* istanbul ignore next */ else if (!mailingState) {
    mailingState = '';
  }

  mailingZipcode = mailingZipcode ? `${mailingZipcode}` : '';

  const mailingAddress = `${mailingCity}${mailingState}${mailingZipcode}`;

  if (mailingAddress) {
    addresses.push(mailingAddress);
  }

  return addresses;
};

const formatCustomerAddressData = (customerInfo) => {
  const mailingAddress = formatAddressData(customerInfo, 'mailing_');
  if (mailingAddress.length > 0) {
    return mailingAddress;
  }
  return formatAddressData(customerInfo);
};

export default class HolderInfo extends React.PureComponent {
  render() {
    const {
      permitInfo,
      signatures,
      initialData: {
        mailingAddressLabel,
        companyLabel,
        homeLabel,
        workLabel,
        cellLabel,
        showEmployee
      }
    } = this.props;
    const companyInfo = signatures.company || {};
    const customerInfo = signatures.customer || {};

    const isCompany = !!signatures.company;

    let name;
    if (isCompany) {
      /* istanbul ignore next */
      name = companyInfo.company_name ? `${companyInfo.company_name} - ${companyInfo.company_id}` : '';
    } else {
      /* istanbul ignore next */
      name = customerInfo.customer_name ? `${customerInfo.customer_name} - ${customerInfo.customer_id}` : '';
    }

    /* istanbul ignore next */
    const itemsInfo = [
      {
        name: isCompany ? `${decodeHtmlStr(companyLabel) || 'Company'} Name` : 'Customer Name',
        value: name
      },
      {
        name: 'Customer Type',
        value: isCompany ? companyInfo.customer_type : customerInfo.customer_type
      },
      {
        name: isCompany ? `${decodeHtmlStr(companyLabel) || 'Company'} Address` : decodeHtmlStr(mailingAddressLabel) || 'Mailing Address',
        value: isCompany ? formatAddressData(companyInfo, 'mailing_') : formatCustomerAddressData(customerInfo)
      }
    ];

    let payers;
    if (permitInfo.payers) {
      payers = decodeHtmlStr(permitInfo.payers.join());
    }

    return (
      <div className="customer-info">
        <div className="u-clearfix">
          <div>
            <PropertyList className="label-bold label-align-right" items={itemsInfo} />
          </div>
          {
            isCompany ?
              renderCompanyPhone(companyInfo, companyLabel)
            :
              renderPhoneInfo(customerInfo, homeLabel, workLabel, cellLabel)
          }
        </div>
        {
          isCompany && renderCustomerContent(customerInfo, homeLabel, workLabel, cellLabel)
        }
        <div className="u-clearfix">
          {
            showEmployee && permitInfo.employee_id ?
              <PropertyList className="label-bold label-align-right" items={[{ name: 'System User', value: decodeHtmlStr(permitInfo.employee_id) }]} /> :
              <PropertyList className="label-bold label-align-right" items={[{ name: 'System User', value: decodeHtmlStr(permitInfo.system_user) }]} />
          }
          <PropertyList className="label-bold label-align-right" items={[{ name: 'Payer', value: payers }]} />
        </div>
      </div>
    );
  }
}
