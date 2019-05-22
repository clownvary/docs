import React from 'react';
import { mount } from 'enzyme';
import { fromJS } from 'immutable';
import SetupDropdown from 'shared/components/SetupDropdown';
import Dropdown from 'react-base-ui/lib/components/Dropdown';
import EventResourceItem from 'index/Resource/components/BookingInformation/EventResourceItem';

const prepCodeList = fromJS([
  { id: 6, text: 'edc5a12', value: 6 },
  { id: 7, text: '5604a49', value: 7 },
  { id: 8, text: 'f760c9c', value: 8 }
]);
const setUpList = fromJS([
  { id: 0, text: '0 Min', value: 0 },
  { id: 3, text: '3 Min', value: 3 },
  { id: 5, text: '5 Min', value: 5 },
  { id: 10, text: '10 Min', value: 10 },
  { id: 15, text: '16 Min', value: 15 }
]);
const cleanUpList = fromJS([
  { id: 0, text: '0 Min', value: 0 },
  { id: 3, text: '3 Min', value: 3 },
  { id: 5, text: '5 Min', value: 5 },
  { id: 10, text: '10 Min', value: 10 },
  { id: 15, text: '16 Min', value: 15 }
]);

const resourceItem = {
  setupMinutes: 0,
  definedDateRange: [],
  resourceType: 0,
  resourceID: 3,
  rentalBlock: [
    {
      id: 2,
      name: '9:00 AM to 12:00 PM',
      selected: false,
      parent_id: 6,
      text: '9:00 AM to 12:00 PM',
      value: 2
    }
  ],
  bookingDetail: [
    {
      currentEvent: true,
      recurringExceptions: [],
      hasRecurring: false,
      baseBookingID: '',
      rentalBlockID: 7,
      recurringEnabled: true,
      ignoreConflict: false,
      startEventTime: '2:00 AM',
      bookingAssignment: 0,
      reservationType: 0,
      resourceBookingID: 0,
      startEventDate: '2016 Dec 21',
      pendingRemoveFromRecurringGroup: '',
      attendance: 2,
      dateRangeID: 0,
      recurringReservationGroupID: 0,
      isDeleteSchedule: false,
      endEventTime: '3:00 AM',
      endEventDate: '2016 Dec 21',
      reservationPeriodUnit: 7,
      pendingID: 'pending_775_7161',
      isRecurring: false,
      startEventDatetime: '12/21/2016 2:00 AM',
      ignoreClosetime: false,
      ownerPendingReceipt: true,
      masterFacilityScheduleID: null,
      transactionID: -1,
      expanded: false,
      endEventDatetime: '12/21/2016 3:00 AM',
      ignoreSkipdate: false
    }
  ],
  eventTypeID: -1,
  reservationPeriodUnit: 7,
  eventType: '\'South West Hub',
  prepCodeID: -1,
  resourceNumber: '',
  resourceName: 'kaely test human',
  cleanupMinutes: 0,
  eventTypes: [
    {
      id: 1,
      name: 'South West Hub',
      selected: false,
      text: 'South West Hub',
      value: 32,
      schedule_type_id: 3
    },
    {
      id: 34,
      name: 'South West Hub',
      selected: false,
      text: 'South West Hub',
      value: 34
    }
  ]
};

const resourceError = fromJS({});

const props = {
  isFillSchedule: true,
  firstValidResourceIndex: 0,
  prepCodeList,
  setUpList,
  cleanUpList,
  resourceItem: fromJS(resourceItem),
  resourceIndex: 0,
  resourceError,
  updateBookingInfoDetail: jest.fn(),
  fetchPrepCode: jest.fn(() => new Promise((resolve, reject) => {
    resolve();
  })),
  syncDataFromBookingInfoToCalendar: jest.fn(),
  changeResourceInfoUpdateConflict: jest.fn(),
  changeResoureInfoAutoFill: jest.fn(),
  updatePrepCode: jest.fn(),
  updateBookingInfoEvent: jest.fn(),
  updateIsFillScheduleState: jest.fn(),
  overrideRentalBlockErrors: [],
  resetOverrideRentalBlock: jest.fn(),
  setOverrideRentalBlock: jest.fn(),
  setOverrideRentalBlockError: jest.fn(),
  initialData: {
    timeFormat: 'h:mm a'
  }
};

describe('index/resource/components/BookingInformation/EventResourceItem', () => {
  const setup = initProps => mount(<EventResourceItem {...initProps} />);

  it('EventResourceItem should be works fine', () => {
    const component = setup(props);
    const warpDropdown = component.find(Dropdown);
    warpDropdown.at(0).node.props.onChange({ value: 1 });
    expect(props.updateBookingInfoDetail).toHaveBeenCalled();
    expect(props.fetchPrepCode).toHaveBeenCalled();

    warpDropdown.at(1).node.props.onChange({ value: -1 });
    warpDropdown.at(1).node.props.onChange({ value: 36 });
    warpDropdown.at(1).node.props.onChange({ value: 1 });
    expect(props.updatePrepCode).toHaveBeenCalled();
    expect(props.changeResourceInfoUpdateConflict).toHaveBeenCalled();
    expect(props.changeResoureInfoAutoFill).toHaveBeenCalled();
    expect(props.syncDataFromBookingInfoToCalendar).toHaveBeenCalled();

    const warpSetupDropdown = component.find(SetupDropdown);

    warpSetupDropdown.at(0).node.props.onSelect({ value: 0 });
    warpSetupDropdown.at(0).node.props.onSelect({ value: 2 });
    warpSetupDropdown.at(0).node.props.onBlur({ value: 2 });

    expect(props.updateBookingInfoDetail).toHaveBeenCalled();
    expect(props.changeResourceInfoUpdateConflict).toHaveBeenCalled();
    expect(props.changeResoureInfoAutoFill).toHaveBeenCalled();
    expect(props.syncDataFromBookingInfoToCalendar).toHaveBeenCalled();

    warpSetupDropdown.at(1).node.props.onSelect({ value: 2 });
    warpSetupDropdown.at(1).node.props.onBlur({ value: 2 });
  });

  it('When EventResourceItem resourceError is not null should be works fine', () => {
    const nextProps = { ...props, resourceError: fromJS({ eventTypeID: '23' })  };
    const component = setup(nextProps);
    expect(component.find('.error-field')).toHaveLength(1);
  });
});
