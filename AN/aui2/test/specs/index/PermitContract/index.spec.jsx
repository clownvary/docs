import React from 'react';
import { fromJS } from 'immutable';
import { mount } from 'enzyme';
import configureStore from 'redux-mock-store';
import middlewares from 'shared/api/middlewares';

import ActionBar from 'index/PermitContract/components/ActionBar';
import GeneralPermitInfo from 'index/PermitContract/components/GeneralPermitInfo';
import HolderInfo from 'index/PermitContract/components/HolderInfo';
import HeaderAndFooter from 'index/PermitContract/components/HeaderAndFooter';
import RentalChargesSummary from 'index/PermitContract/components/RentalChargesSummary';
import EventInfo from 'index/PermitContract/components/EventInfo';
import Deposit from 'index/PermitContract/components/Deposit';
import PaymentRefund from 'index/PermitContract/components/PaymentRefund';
import Schedule from 'index/PermitContract/components/Schedule';
import SignatureLine from 'index/PermitContract/components/SignatureLine';
import PaymentSchedules from 'index/PermitContract/components/PaymentSchedules';
import Amendment from 'index/PermitContract/components/Amendment';
import PermitContract from 'index/PermitContract';

const permitContractData = {
  permitSchedules: [],
  amendments: [],
  permitInfo: {},
  header: 'header',
  orgInfo: {
    site_logo: '<a href=" http://localcui.apm.activenet.com/Home" target="_window"><img class="bannerLogo" src="downloadFile.sdi?uploadedfile_id=16"  alt="banner_logo" border="0" vspace="0" hspace="0"></a>'
  },
  chargeSummary: {},
  deposits: [],
  paymentRefunds: [],
  attachedFiles: [
    {
      display_name: 'Test Attachment',
      file_type: 'jpeg',
      uploadedfile_id: 'C1890D8A0C',
      upload_date: 'Mar 13, 2018 10:33',
      file_size: '102.19kb'
    }
  ],
  paymentSchedules: {
    original_balance: 100,
    schedules: [],
    current_balance: 100
  },
  events: [{
    eventID: 1,
    eventName: '2016 Annual Party',
    resourceCount: 1,
    bookingCount: 2
  }],
  footer: 'footer',
  signatures: {}
};

const error = fromJS({
  list: [],
  systemErrors: [],
  businessErrors: []
});

const helpLink = {
  data: {}
};

const initialData = {
  permitLabel: 'permitXXX',
  showSignature4PermitHolder: true,
  showSignature4AdditionalCustomer: true,
  showSignature4Organization: true,
  showEmail: true,
  isFromCui: false
};

const defaultProps = {
  permitContract: fromJS(permitContractData),
  helpLink: fromJS(helpLink),
  error,
  initialData
};

const actions = {
  fetchPermitContract: jest.fn(),
  fetchPermitSchedule: jest.fn(),
  fetchAmendment: jest.fn(),
  savePdfAction: jest.fn(),
  emailContract: jest.fn()
};

describe('index/PermitContract/index', () => {
  let store = null;

  function setup(props = defaultProps) {
    const mockStore = configureStore(middlewares);

    store = mockStore(Object.assign({}, props));

    const component = mount(
      <PermitContract
        {...props}
        {...actions}
      />,
      { context: { store } }
    );

    return {
      component,
      permitTitle: component.find('.permit__title'),
      scheduleTitle: component.find('.schedule__title'),
      amendmentTitle: component.find('.amendment__title'),
      ActionBar: component.find(ActionBar),
      GeneralPermitInfo: component.find(GeneralPermitInfo),
      HeaderAndFooter: component.find(HeaderAndFooter),
      HolderInfo: component.find(HolderInfo),
      RentalChargesSummary: component.find(RentalChargesSummary),
      EventInfo: component.find(EventInfo),
      Deposit: component.find(Deposit),
      PaymentRefund: component.find(PaymentRefund),
      PaymentSchedules: component.find(PaymentSchedules),
      Schedule: component.find(Schedule),
      Amendment: component.find(Amendment),
      SignatureLine: component.find(SignatureLine),
      actions
    };
  }

  test('component and initialization works fine', () => {
    const {
      component,
      permitTitle,
      scheduleTitle,
      amendmentTitle,
      ActionBar,
      GeneralPermitInfo,
      HeaderAndFooter,
      HolderInfo,
      RentalChargesSummary,
      EventInfo,
      Deposit,
      PaymentRefund,
      PaymentSchedules,
      Schedule,
      Amendment,
      SignatureLine
    } = setup();

    expect(component).toHaveLength(1);
    expect(permitTitle).toHaveLength(1);
    expect(scheduleTitle).toHaveLength(1);
    expect(amendmentTitle).toHaveLength(1);
    expect(ActionBar).toHaveLength(1);
    expect(GeneralPermitInfo).toHaveLength(1);
    expect(HeaderAndFooter).toHaveLength(2);
    expect(HolderInfo).toHaveLength(1);
    expect(RentalChargesSummary).toHaveLength(1);
    expect(EventInfo).toHaveLength(1);
    expect(Deposit).toHaveLength(1);
    expect(PaymentRefund).toHaveLength(1);
    expect(PaymentSchedules).toHaveLength(0);
    expect(Schedule).toHaveLength(0);
    expect(Amendment).toHaveLength(0);
    expect(SignatureLine).toHaveLength(1);

    expect(component.find('h1.permit__title').text()).toEqual('permitXXX');
    expect(component.find('.permit-logo')).toHaveLength(1);
  });

  test('component and initialization works fine, add schedules and amendments data', () => {
    const data = Object.assign({}, permitContractData, {
      paymentSchedules: {
        original_balance: 100,
        schedules: [{
          due_date: '2017 Aug 2',
          amount: 5,
          paid: 0,
          withdrawn_adjustment: 4,
          balance: 33.33
        }, {
          due_date: '2017 Aug 9',
          amount: 10,
          paid: 5,
          withdrawn_adjustment: 10,
          balance: 20
        }],
        current_balance: 100
      },
      permitSchedules: [{
        resource_name: 'zack facility minutes',
        center_name: '',
        event_name: 'Test Recurring',
        start_date: '29 Jul 2017',
        end_date: '30 Jul 2017',
        schedules: [{
          resource_name: 'zack facility minutes',
          center_name: '*lillian_center1',
          event_name: 'Test Recurring',
          start_date: '30 Jul 2017',
          end_date: '30 Jul 2017',
          end_day_of_week: 'Sun',
          start_time: '1:00 AM',
          end_time: '1:30 AM',
          start_day_of_week: 'Sun',
          recurring_indicator: false,
          occurrences: 0
        }],
        exceptions: [{
          date: '8 Aug 2017'
        }],
        end_day_of_week: 'Sun',
        start_time: '1:00 AM',
        end_time: '1:30 AM',
        start_day_of_week: 'Sun',
        recurring_indicator: true,
        occurrences: 9
      }],
      amendments: [{
        amendment_id: 8,
        amendment_time: '30 Dec 2017 12:00 AM',
        old_total_fee: 20.16,
        new_total_fee: 11.17,
        amendment_note: ' Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        amendment_details: {
          change_permit_holder: [],
          change_agent: [],
          delete_event: [],
          add_event: [],
          edit_event: [],
          change_status: [],
          change_expiration_date: []
        },
        modify_user_name: 'Trainer User'
      }]
    });

    const props = {
      permitContract: fromJS(data),
      helpLink: fromJS(helpLink),
      error,
      initialData
    };

    const {
      PaymentSchedules,
      Schedule,
      Amendment
    } = setup(props);

    expect(PaymentSchedules).toHaveLength(1);
    expect(Schedule).toHaveLength(1);
    expect(Amendment).toHaveLength(1);
  });
});
