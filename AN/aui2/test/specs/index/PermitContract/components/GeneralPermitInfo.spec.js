import React from 'react';
import { mount } from 'enzyme';
import GeneralPermitInfo from 'index/PermitContract/components/GeneralPermitInfo';

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

const orgInfo = {
  site_name: 'Central Community Center',
  site_logo: '<a href=" http://localcui.apm.activenet.com/Home" target="_window"><img class="bannerLogo" src="downloadFile.sdi?uploadedfile_id=16"  alt="banner_logo" border="0" vspace="0" hspace="0"></a>',
  site_address: 'Central Community Center\n937 Enterprise Dr\nSacramento, CA, CA\n95825\n',
  email_address: 'yanbei0391@yahoo.com.cn',
  phone_number: '(111) 111-1111',
  fax_number: '(916) 925-0649'
};

const props = {
  permitInfo,
  orgInfo
};

const setup = initProps => mount(<GeneralPermitInfo {...initProps} />);

it('GeneralPermitInfo should render without errors', () => {
  const component = setup(props);

  expect(component).toBeTruthy();
  expect(component.find('.an-property-list__item')).toHaveLength(9);

  const orgInfoData = {
    site_name: 'Central Community Center',
    site_logo: '<a href=" http://localcui.apm.activenet.com/Home" target="_window"><img class="bannerLogo" src="downloadFile.sdi?uploadedfile_id=16"  alt="banner_logo" border="0" vspace="0" hspace="0"></a>',
    site_address: '',
    email_address: '',
    phone_number: '(111) 111-1111',
    fax_number: '(916) 925-0649'
  };

  const newProps = Object.assign({}, props, { orgInfo: orgInfoData });

  component.setProps(newProps);
  expect(component.find('.an-property-list__item')).toHaveLength(6);

  const newPermitInfo = Object.assign({}, permitInfo, { permit_status: '' });
  const newPropsOne = Object.assign({}, { orgInfo }, { permitInfo: newPermitInfo });
  component.setProps(newPropsOne);
  expect(component.find('.an-property-list__item')).toHaveLength(7);
});
