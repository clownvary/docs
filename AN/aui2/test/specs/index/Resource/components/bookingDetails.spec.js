import React from 'react';
import { mount } from 'enzyme';
import { fromJS } from 'immutable';
import BookingDetails from 'index/Resource/components/BookingInformation/BookingDetails';
import BookingDetailItem from 'index/Resource/components/BookingInformation/BookingDetailItem';

const setup = props => mount(<BookingDetails {...props} />);
const initialData = { timeFormat: 'h:mm a' };

describe('index/resource/components/BookingInformation/BookingDetails', () => {
  it('render booking detail items', () => {
    const props = {
      resourceIndex: 0,
      resourceItem: fromJS({
        reservationPeriodUnit: 2,
        resourceType: 2,
        bookingDetail: [
          {
            startEventDate: '01/09/2017',
            endEventDate: '01/09/2017',
            startEventTime: '2:00 AM',
            endEventTime: '5:00 AM',
            attendance: 3,
            pendingID: -1,
            resourceBookingID: 0,
            transactionID: 1028,
            isDeleteSchedule: false
          },
          {
            startEventDate: '01/10/2017',
            endEventDate: '01/10/2017',
            startEventTime: '2:00 AM',
            endEventTime: '5:00 AM',
            attendance: 4,
            pendingID: -1,
            resourceBookingID: 0,
            transactionID: 1029,
            isDeleteSchedule: false
          },
          {
            startEventDate: '01/11/2017',
            endEventDate: '01/11/2017',
            startEventTime: '2:00 AM',
            endEventTime: '5:00 AM',
            attendance: 5,
            transactionID: -1,
            resourceBookingID: 1,
            pendingID: 'pending_0_9613',
            isDeleteSchedule: false
          }
        ]
      }),
      initialData
    };
    const component = setup(props);
    expect(component.find('.detail-item')).toHaveLength(3);
    expect(component.find('.booking-item__weekday')).toHaveLength(3);
    expect(component.find('.booking-item__date')).toHaveLength(6);
    expect(component.find('.booking-item__dashed')).toHaveLength(3);
    expect(component.find('.booking-item__time')).toHaveLength(6);
    expect(component.find('.icon-people-m')).toHaveLength(3);
    expect(component.find('.icon-repeat-m')).toHaveLength(3);
    expect(component.find('.icon-close')).toHaveLength(3);

    expect(component.find(BookingDetailItem)).toHaveLength(3);
  });

  it('render empty booking detail items', () => {
    const props = {
      resourceIndex: 0,
      resourceItem: fromJS({
        reservationPeriodUnit: 2,
        resourceType: 2,
        bookingDetail: []
      }),
      initialData
    };
    const component = setup(props);

    expect(component.find('div')).toHaveLength(1);
    expect(component.find('.detail-item')).toHaveLength(0);
  });

  it('render date range booking detail items', () => {
    const props = {
      resourceIndex: 0,
      resourceItem: fromJS({
        reservationPeriodUnit: 6,
        resourceType: 2,
        definedDateRange: [
          { id: 3, text: '2017 Jan 03 to 2017 Jan 06', name: '2017 Jan 03 to 2017 Jan 06', value: 3 },
          { id: 4, text: '2017 Jan 07 to 2017 Jan 10', name: '2017 Jan 07 to 2017 Jan 10', value: 4 },
          { id: 5, text: '2017 Jan 11 to 2017 Jan 16', name: '2017 Jan 11 to 2017 Jan 16', value: 5 }
        ],
        bookingDetail: [
          {
            dateRangeID: 3,
            attendance: 3,
            transactionID: 1028,
            isDeleteSchedule: false
          },
          {
            dateRangeID: 0,
            attendance: 4,
            transactionID: -1,
            pendingID: 'pending_0_9613',
            isDeleteSchedule: false
          }
        ]
      }),
      initialData
    };
    const component = setup(props);
    expect(component.find('.detail-item')).toHaveLength(2);
    expect(component.find('.booking-item__weekday')).toHaveLength(2);
    expect(component.find('.booking-item__date')).toHaveLength(0);
    expect(component.find('.booking-item__dashed')).toHaveLength(0);
    expect(component.find('.booking-item__time')).toHaveLength(0);
    expect(component.find('.aaui-dropdown__button-text')).toHaveLength(2);
    expect(component.find('.icon-people-m')).toHaveLength(2);
    expect(component.find('.icon-repeat-m')).toHaveLength(2);
    expect(component.find('.icon-close')).toHaveLength(2);

    expect(component.find(BookingDetailItem)).toHaveLength(2);
  });

  it('render rental block booking detail items', () => {
    const props = {
      resourceIndex: 0,
      resourceItem: fromJS({
        reservationPeriodUnit: 7,
        resourceType: 2,
        rentalBlock: [
          { id: 5, name: '1:20 PM to 2:50 PM', value: 5 },
          { id: 6, name: '3:04 PM to 4:00 PM', value: 6 },
          { id: 7, name: '4:06 PM to 6:00 PM', value: 7 }
        ],
        bookingDetail: [
          {
            rentalBlockID: 7,
            startEventDate: '01/09/2017',
            attendance: 3,
            transactionID: 1028,
            isDeleteSchedule: false
          },
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
        ]
      }),
      detailsError: fromJS([{ pendingID: 'pending_775_7161', resourceBookingID: 0, errors: {} }]),
      overrideRentalBlockErrors: [],
      initialData
    };

    const component = setup(props);
    expect(component.find('.detail-item')).toHaveLength(2);
    expect(component.find('.booking-item__weekday')).toHaveLength(2);
    expect(component.find('.booking-item__date')).toHaveLength(2);
    expect(component.find('.booking-item__dashed')).toHaveLength(0);
    expect(component.find('.time')).toHaveLength(0);
    expect(component.find('.aaui-dropdown__button-text')).toHaveLength(2);
    expect(component.find('.icon-people-m')).toHaveLength(2);
    expect(component.find('.icon-repeat-m')).toHaveLength(2);
    expect(component.find('.icon-close')).toHaveLength(2);

    expect(component.find(BookingDetailItem)).toHaveLength(2);
  });

  it('bookingDetail is null the BookingDetails should render without errors', () => {
    const props = {
      resourceIndex: 0,
      resourceItem: fromJS({
        reservationPeriodUnit: 7,
        resourceType: 2,
        rentalBlock: [
          { id: 5, text: '1:20 PM to 2:50 PM', value: 5 },
          { id: 6, text: '3:04 PM to 4:00 PM', value: 6 },
          { id: 7, text: '4:06 PM to 6:00 PM', value: 7 }
        ],
        bookingDetail: null
      }),
      initialData
    };
    const component = setup(props);
    expect(component.find('.detail-item')).toHaveLength(0);
  });

  it('render deleted non-recurring booking correctly', () => {

    const props = {
      resourceIndex: 0,
      resourceItem: fromJS({
        reservationPeriodUnit: 7,
        resourceType: 2,
        rentalBlock: [],
        bookingDetail: [
          { isDeleteSchedule: true }
        ]
      }),
      initialData
    };
    const component = setup(props);
    expect(component.find('.detail-item')).toHaveLength(0);
  })
});
