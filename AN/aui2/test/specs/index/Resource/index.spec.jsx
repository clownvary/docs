import React from 'react';
import { fromJS } from 'immutable';
import { mount, shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import middlewares from 'shared/api/middlewares';
import Error from 'shared/components/Error';
import BreadCrumb from 'shared/components/BreadCrumb';
import HelpLink from 'shared/components/HelpLink';
import { Authority } from 'shared/authorities';
import Resources from 'index/Resource/components/FullCalendar';
import SearchBar from 'index/Resource/components/SearchBar';
import DateNav from 'index/Resource/components/DateNav';
import BookingInformation from 'index/Resource/components/BookingInformation';
import MonthView from 'index/Resource/components/MonthView';
import QuickView from 'index/Resource/components/QuickView';
import ResourceCalendar from 'index/Resource';
import ButtonBar from 'react-base-ui/lib/components/ButtonBar';
import Button from 'react-base-ui/lib/components/Button';

jest.mock('shared/components/Error', () => 'Error');
jest.mock('shared/components/HelpLink', () => 'HelpLink');
jest.mock('index/Resource/components/BookingInformation', () => 'BookingInformation');

const initialData = {
  permitID: -1,
  batchID: '1111111',
  receiptID: '2222222',
  facilityTypeLabel: 'FacilityXX',
  instructorLabel: 'Saj'
};

const filters = {
  centers: fromJS({
    "data": [{
      "name": "111111Lois Ce&amp;nter without Facility",
      "id": 138,
      "selected": false,
      "text": "111111Lois Ce&nter without Facility",
      "value": 138
    }],
    "selected": [],
    "errMsg": ""
  }),
  facilityTypes: fromJS({
    "data": [{
      "name": "faci&amp;lity type 1",
      "id": 0,
      "selected": true,
      "text": "faci&lity type 1",
      "value": 0
    }],
    "selected": [0]
  }),
  eventTypes: fromJS({
    "data": [{
      "id": 25,
      "name": "14.5 I&amp;map Fixed ET",
      "selected": false,
      "text": "14.5 I&map Fixed ET",
      "value": 25
    }],
    "selected": []
  }),
  resourceTypes: fromJS({
    "data": [{
      "name": "reco&amp;urce1",
      "id": 1,
      "type": 0,
      "selected": true,
      "text": "reco&urce1",
      "value": 1
    }],
    "selected": [1],
    "disabledFacilityType": true
  }),
  resources: fromJS({
    "totalSize": 10,
    "data": [{
      "name": "rec&amp;ource1",
      "id": 1,
      "type": 0,
      "selected": true,
      "text": "rec&amp;ource1",
      "value": 1
    }],
    "lastLoadingTimestamp": 0,
    "totalPage": 12,
    "pageNumber": 1,
    "isFetchData": true,
    "selected": [1],
    "loading": false,
    "errMsg": ""
  })
};

const bookingInfo = {
  "pendingBookingList": [{
    "resourceID": 2
  }],
  "scheduleTypes": [],
  "display": false,
  "cleanUpList": [],
  "isBookingChanged": false,
  "error": {
    "code": null,
    "clientMessages": [],
    "serverMessages": [],
    "conflictMessage": "",
    "eventNameDuplicateMessage": "",
    "entity": {
      "eventName": false,
      "eventNameDuplicate": false,
      "scheduleTypeID": false,
      "eventResource": []
    }
  },
  "data": {
    "permitID": -1,
    "eventName": "",
    "scheduleTypeID": -1,
    "scheduleType": "",
    "checkForWaitlistConflict": true,
    "eventResource": [{
      "resourceID": 1,
      "bookingDetail": [
        {
          "id": -1,
          "isDeleteSchedule": false
        }
      ]
    }]
  },
  "backFromPermitDetailPage": false,
  "templateState": "no_template",
  "prepCodeList": [],
  "setUpList": [],
  "permitBookingList": [],
  "recurring": {
    "base": {
      "resourceIndex": -1,
      "bookingIndex": -1
    },
    "clear": {
      "visible": false,
      "resourceIndex": -1,
      "bookingIndex": -1,
      "clearAll": false
    }
  }
};

const booking = {
  "resource_ids": [],
  "selected_date": "2016 Jun 04",
  "include_linked_resources": true,
  "resourceInfo": [{
    "rousrceID": 1,
    "resourceSkipDate": []
  }],
  "bookingInfo": [],
  "resize": false,
  "ready4Checkout": true,
  "inCart": false
};

const onboarding = {
  "hideIntro": true,
  "ready": false
};
const runningCart = {
  "cartList": [],
  "cartLoading": false,
  "error": false
};

const authority = [{
    "authorityType": "display",
    "id": "calendarPage",
    "name": "Calendar Page"
}];

const breadCrumb = {
  "batchID": "1111111",
  "receiptID": "2222222",
  "data": []
};
const error = {
  list: [],
  systemErrors: [],
  businessErrors: []
};

const quickView = fromJS({
        data: fromJS([{
            "id": '6',
            "name": "test1",
            "value": '6',
            "text": 'test1',
            "selected": false,
            "resource_ids": [
                10,
                11
            ]
          }]),
        selectedView: '6',
        showModel: false,
        name: '',
        errorMessage: ''
      });

const actions = {
  switchView: jest.fn(),
  changeResourceSelectedDate: jest.fn(),

};

const defaultProps = {
  monthView: fromJS({showDayView: true}),
  filters: filters,
  bookingInfo: fromJS(bookingInfo),
  booking: fromJS(booking),
  onboarding: fromJS(onboarding),
  runningCart: fromJS(runningCart),
  breadCrumb: fromJS(breadCrumb),
  error: fromJS(error),
  quickView,
  initialData
};

const helpLink = document.createElement('div');
helpLink.className='help-link';
const pageTitle = document.createElement('div');
pageTitle.className='page-title';
const sticky = document.createElement('div');
sticky.className='sticky';
document.body.appendChild(helpLink);
document.body.appendChild(pageTitle);
document.body.appendChild(sticky);

describe('index -> Resource -> index', () => {
  function setup(props = defaultProps, others = null) {
    const mockStore = configureStore(middlewares);
    const store = mockStore({
      resourceFilter: filters,
      resourceBooking: fromJS(booking),
      ...props,
      ...others
    });
    const component = mount(
      <ResourceCalendar
        store={store}
        {...props}
        {...actions}
      />,
      { context: { store }}
    );

    return {
      component
    }
  }

  test('component and initialization works fine', () => {
    Authority.init(authority);

    const {
      component
    } = setup();
    expect(component.find(Error)).toHaveLength(1);
    expect(component.find(BreadCrumb)).toHaveLength(0);
    expect(component.find(HelpLink)).toHaveLength(1);
    expect(component.find(Resources)).toHaveLength(1);
    expect(component.find(SearchBar)).toHaveLength(1);
    expect(component.find(BookingInformation)).toHaveLength(1);
    expect(component.find(MonthView)).toHaveLength(0);

    component.find(DateNav).node.props.onGotoDate();
  });

  test('component and initialization works fine, if the size of showDayView is false', () => {
    const bookingData = {
      "resource_ids": [],
      "selected_date": "2016 Jun 04",
      "include_linked_resources": true,
      "resourceInfo": [],
      "bookingInfo": [],
      "resize": false,
      "ready4Checkout": true,
      "inCart": false
    };

    Authority.init(authority);

    const {
      component
    } = setup(Object.assign({}, defaultProps, {
      monthView: fromJS({showDayView: false})
    }));

    expect(component.find(Resources)).toHaveLength(0);
    expect(component.find(MonthView)).toHaveLength(1);
  });

  test('component and initialization works fine, if the size of resourceInfo is 0', () => {
    const bookingData = {
      "resource_ids": [],
      "selected_date": "2016 Jun 04",
      "include_linked_resources": true,
      "resourceInfo": [],
      "bookingInfo": [],
      "resize": false,
      "ready4Checkout": true,
      "inCart": false
    };

    Authority.init(authority);

    const {
      component
    } = setup(Object.assign({}, defaultProps, {
      booking: fromJS(bookingData),
    }), {
      resourceBooking: fromJS(bookingData)
    });

    expect(component.find(Resources)).toHaveLength(0);
    expect(component.find('.no-resource-selected')).toHaveLength(1);
  });

  test('component and initialization works fine, if "hideIntro" is false', () => {
    const onboardingData = {
      "hideIntro": false,
      "ready": false
    };

    Authority.init(authority);

    const {
      component
    } = setup(Object.assign({}, defaultProps, {
      onboarding: fromJS(onboardingData)
    }));

    expect(component.find('.searchBarWrapper.static')).toHaveLength(1);
  });

  test('component and initialization works fine, if authorityType === "disable" and permitID > 0', () => {
    const authority= [{
      "authorityType": "disabled",
      "id": "calendarPage",
      "name": "Calendar Page"
    }];

    Authority.init(authority);

    const {
      component
    } = setup(Object.assign({}, defaultProps, {
      initialData: {
        ...initialData,
        permitID: ''
      }
    }));

    expect(component.find(Error)).toHaveLength(1);
    expect(component.find(BreadCrumb)).toHaveLength(0);
    expect(component.find(HelpLink)).toHaveLength(0);
    expect(component.find(Resources)).toHaveLength(0);
    expect(component.find(SearchBar)).toHaveLength(0);
    expect(component.find(BookingInformation)).toHaveLength(0);
  });

  test('QuickView should render well', () => {
    Authority.init(authority);

    const {
      component
    } = setup();

    const quickView = component.find(QuickView);
    expect(quickView).toHaveLength(1);
  });

  test('ButtonBar should render well', () => {
    Authority.init(authority);

    const {
      component
    } = setup();

    const buttonBar = component.find(ButtonBar);
    expect(buttonBar).toHaveLength(1);

    const buttons = buttonBar.find(Button);
    buttons.first().simulate('click', { e: {}, id: 'monthView' });
    buttons.last().simulate('click', { e: {}, id: 'dayView' });
    expect(buttons).toHaveLength(2);
  });
  describe('toggleBodyScroll method:', () => {

    test('overflow should be hidden when size of resourceInfo less than zero',()=>{
      const tempBooking = booking;
      const tempProps = defaultProps;
      tempBooking.resourceInfo = [];

      tempProps.booking = fromJS(tempBooking);
      Authority.init(authority);

      const { component } = setup(tempProps);
      expect(document.body.style.overflow).toEqual('hidden');
    });
    test('overflow should be null when size of resourceInfo more than zero',()=>{
      const tempBooking = booking;
      const tempProps = defaultProps;
      tempBooking.resourceInfo = [{ 'rousrceID': 1 }];

      tempProps.booking = fromJS(tempBooking);
      Authority.init(authority);

      const { component } = setup(tempProps);
      expect(document.body.style.overflow).toEqual('');
    });
  });
});
