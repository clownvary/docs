import React from 'react';
import includes from 'lodash/includes';
import PropertyList from 'react-base-ui/lib/components/PropertyList';
import { count } from 'react-base-ui/lib/utils/dataAccess';
import decodeHtmlStr from 'react-base-ui/lib/utils/decodeHtmlStr';
import { permitStatesEnum } from '../../consts/permitStatesEnum';
import './index.less';

const formatOrgInfoData = (orgInfo) => {
  let siteAddresses = [];
  if (orgInfo.site_address) {
    siteAddresses = orgInfo.site_address.split('\n');
  }

  const siteAddressLength = siteAddresses.length;
  const cityIndex = siteAddressLength - 3;
  const zipCodeIndex = siteAddressLength - 2;
  const streetAddresses = [];
  siteAddresses.forEach((value, index) => {
    if (index < siteAddressLength - 3) {
      streetAddresses.push(value);
    }
  });

  const addresses = [];
  if (siteAddresses[cityIndex]) {
    addresses.push(siteAddresses[cityIndex]);
  }

  if (siteAddresses[zipCodeIndex]) {
    addresses.push(siteAddresses[zipCodeIndex]);
  }

  return {
    streetAddresses,
    address: count(addresses) !== 0 ? addresses.join(' ') : ''
  };
};


export default (props) => {
  const { permitInfo, orgInfo, permitLabel } = props;
  const permitStatus = permitInfo.permit_status;
  const expirationDateShow = includes(permitStatesEnum, permitStatus);
  const orgInfoData = formatOrgInfoData(orgInfo);

  const orgInfoItems = [
    { value: orgInfoData.streetAddresses },
    {
      value: orgInfoData.address
    }
  ];

  const emailAddress = orgInfo.email_address;
  const phoneItems = [
    { name: 'PHONE', value: orgInfo.phone_number },
    { name: 'FAX', value: orgInfo.fax_number },
    {
      name: 'EMAIL',
      onRenderValue: () => {
        if (emailAddress) {
          return (<a
            href={`mailto:${emailAddress}`}
            className="email"
          >
            <span>{decodeHtmlStr(emailAddress)}</span>
          </a>);
        }

        return null;
      }
    }
  ];

  const permitInfoItems = [
    {
      name: <span>{decodeHtmlStr(`${permitLabel} #`)}</span>,
      value: permitInfo.permit_number,
      className: 'permit-label'
    },
    {
      name: 'Status',
      onRenderValue: () => {
        if (permitStatus) {
          return (
            <span className="permit-status">
              {permitStatus}
            </span>
          );
        }

        return null;
      }
    },
    {
      name: 'Date',
      value: permitInfo.reservation_date
    },
    {
      name: 'Expiration Date',
      value: permitInfo.expiration_date,
      onRenderValue: (item) => {
        if (item.value && expirationDateShow) {
          return <span>{permitInfo.expiration_date}</span>;
        }

        return null;
      }
    }
  ];

  return (
    <div className="general-permit-info u-clearfix">
      <div className="org-container">
        <div className="org-info">
          <PropertyList items={orgInfoItems} />
          <PropertyList showColon items={phoneItems} />
        </div>
      </div>
      <div className="permit-info">
        <PropertyList className="label-bold" items={permitInfoItems} />
      </div>
    </div>
  );
};

