import React from 'react';
import { mount } from 'enzyme';
import { fromJS } from 'immutable';
import EventResource from 'index/Resource/components/BookingInformation/EventResource';
import EventResourceItem from 'index/Resource/components/BookingInformation/EventResourceItem';
import BookingDetailItem from 'index/Resource/components/BookingInformation/BookingDetailItem';

const setup = props => mount(<EventResource {...props} />);
const eventTypes = fromJS([
  { id: 12, text: 'deserunt et', value: 12 },
  { id: 13, text: 'incididunt irure', value: 13 },
  { id: 14, text: 'aliqua aute', value: 14 },
  { id: 15, text: 'proident', value: 15 },
  { id: 16, text: 'sed eiusmod deserun', value: 16 }
]);
const prepCodeList = fromJS([
  { id: 6, text: 'edc5a12', value: 6 },
  { id: 7, text: '5604a49', value: 7 },
  { id: 8, text: 'f760c9c', value: 8 },
  { id: 9, text: '313f696', value: 9 }
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
const bookingDetails1 = [
  {
    startEventDate: '01/09/2017',
    endEventDate: '01/09/2017',
    startEventTime: '2:00 AM',
    endEventTime: '5:00 AM',
    attendance: 3,
    transactionID: 1028,
    isDeleteSchedule: false
  }];
const bookingDetails2 = [
  {
    startEventDate: '01/10/2017',
    endEventDate: '01/10/2017',
    startEventTime: '2:00 AM',
    endEventTime: '5:00 AM',
    attendance: 4,
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
    pendingID: 'pending_0_9613',
    isDeleteSchedule: false
  }
];
const bookingDetails3 = [
  {
    startEventDate: '01/10/2017',
    endEventDate: '01/10/2017',
    startEventTime: '2:00 AM',
    endEventTime: '5:00 AM',
    attendance: 4,
    transactionID: 1033,
    isDeleteSchedule: true
  }
];
const initialData = { timeFormat: 'h:mm a' };

describe('index/resource/components/BookingInformation/EventResource', () => {
  it('render event resource items with values', () => {
    const props = {
      bookingInfo: fromJS({
        prepCodeList,
        setUpList,
        cleanUpList,
        data: {
          eventResource: [
            {
              resourceID: 54,
              resourceName: 'Party Room #1',
              eventTypeID: 15,
              eventTypes,
              prepCodeID: 7,
              setupMinutes: 10,
              cleanupMinutes: 15,
              reservationPeriodUnit: 2,
              resourceType: 2,
              bookingDetail: bookingDetails1
            },
            {
              resourceID: 55,
              resourceName: 'Party Room #3',
              eventTypeID: 13,
              eventTypes,
              prepCodeID: 8,
              setupMinutes: 5,
              cleanupMinutes: 10,
              reservationPeriodUnit: 2,
              resourceType: 2,
              bookingDetail: bookingDetails2
            }
          ]
        },
        error: { entity: { eventResource: [] } }
      }),
      initialData
    };

    const component = setup(props);
    const container = component.find('.section-details');
    expect(container).toHaveLength(1);
    expect(container.find('ul.detail-list')).toHaveLength(1);
    expect(container.find('ul.detail-list').node.className.trim()).toEqual('detail-list');

    expect(container.find('li.detail-list-group')).toHaveLength(2);
    expect(container.find('label.name')).toHaveLength(2);
    expect(container.find('label.name').get(0).textContent).toEqual('Party Room #1');
    expect(container.find('label.name').get(1).textContent).toEqual('Party Room #3');

    expect(container.find('div.event-type')).toHaveLength(2);
    expect(container.find('div.prep-code')).toHaveLength(2);
    expect(container.find('div.setup-dropdown')).toHaveLength(4);

    expect(component.find(EventResourceItem)).toHaveLength(2);
    expect(component.find(BookingDetailItem)).toHaveLength(3);
  });

  it('render empty event resource items with deleted values', () => {
    const props = {
      bookingInfo: fromJS({
        eventTypes,
        prepCodeList,
        setUpList,
        cleanUpList,
        data: {
          eventResource: [
            {
              resourceID: 59,
              resourceName: 'Party Room #4',
              eventTypeID: 15,
              eventTypes,
              prepCodeID: 7,
              setupMinutes: 10,
              cleanupMinutes: 15,
              reservationPeriodUnit: 2,
              resourceType: 2,
              bookingDetail: bookingDetails3
            }
          ]
        },
        error: { entity: { eventResource: [] } }
      }),
      initialData
    };

    const component = setup(props);
    const container = component.find('.section-details');
    expect(container).toHaveLength(1);
    expect(container.find('ul.detail-list')).toHaveLength(1);
    expect(container.find('ul.detail-list').hasClass('no-item')).toBe(true);

    expect(container.find('li.detail-list-group')).toHaveLength(0);
    expect(container.find('label.name')).toHaveLength(0);
    expect(container.find('div.event-type')).toHaveLength(0);
    expect(container.find('div.prep-code')).toHaveLength(0);
    expect(container.find('div.setup-dropdown')).toHaveLength(0);
    expect(component.find(EventResourceItem)).toHaveLength(0);
    expect(component.find(BookingDetailItem)).toHaveLength(0);
  });
});
