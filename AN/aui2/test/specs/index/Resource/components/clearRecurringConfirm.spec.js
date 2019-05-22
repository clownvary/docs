import React from 'react';
import { mount } from 'enzyme';
import { fromJS } from 'immutable';
import configureStore from 'redux-mock-store';
import ClearRecurringConfirm from 'index/Resource/components/ClearRecurringConfirm';

const bookingData = {
  permitID: -1,
  eventName: 'aa',
  scheduleTypeID: 7,
  scheduleType: '3 schedule type',
  checkForWaitlistConflict: true,
  eventResource: [
    {
      setupMinutes: 0,
      isTemplate: true,
      definedDateRange: [
        {
          id: 3,
          name: '2016 Jun 01 to 2016 Jun 03',
          selected: false,
          parent_id: 4,
          text: '2016 Jun 01 to 2016 Jun 03',
          value: 3
        }
      ],
      resourceType: 0,
      resourceID: 2,
      rentalBlock: [],
      bookingDetail: [
        {
          currentEvent: true,
          recurringExceptions: [],
          hasRecurring: false,
          baseBookingID: '',
          rentalBlockID: 0,
          recurringEnabled: false,
          ignoreConflict: false,
          startEventTime: '2:00 AM',
          bookingAssignment: 0,
          reservationType: 0,
          resourceBookingID: 0,
          startEventDate: '2016 Dec 21',
          pendingRemoveFromRecurringGroup: '',
          attendance: 2,
          dateRangeID: 4,
          recurringReservationGroupID: 0,
          isDeleteSchedule: false,
          endEventTime: '3:00 AM',
          endEventDate: '2016 Dec 21',
          reservationPeriodUnit: 6,
          pendingID: 'pending_775_7160',
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
      eventTypeID: 36,
      reservationPeriodUnit: 6,
      eventType: '\'South West Hub',
      prepCodeID: -1,
      resourceNumber: '',
      resourceName: 'kaely test equipment &amp;',
      cleanupMinutes: 0,
      eventTypes: [
        {
          id: 34,
          name: 'South West Hub',
          selected: false,
          text: 'South West Hub',
          value: 34
        }
      ]
    }
  ]
};

describe('index/Resource/components/ClearRecurringConfirm', () => {
  const setup = (initProps, store) => mount(<ClearRecurringConfirm {...initProps} />, { context: { store } });
  const data = {
    base: {
      bookingIndex: -1,
      resourceIndex: -1
    },
    clear: {
      bookingIndex: 0,
      clearAll: false,
      resourceIndex: 1,
      visible: true
    }
  };

  const props = {
    recurring: fromJS(data),
    changeBodyScrollStyle: jest.fn()
  };

  const mockStore = configureStore();

  it('ClearRecurringConfirm click No should render without errors', () => {
    const store = mockStore({});
    const component = setup(props, store);
    component.find('input').at(1).simulate('click');

    expect(component.find('.modal').hasClass('is-open')).toBe(true);
    component.find('.modal-footer button').at(0).simulate('click');
  });

  it('ClearRecurringConfirm click yes should render without errors', () => {
    const store = mockStore({
      bookingInfo: fromJS({ data: bookingData })
    });
    const component = setup(props, store);
    component.find('.modal-footer button').at(1).simulate('click');
  });

  it('ClearRecurringConfirm click close icon should render without errors', () => {
    const store = mockStore({});
    const component = setup(props, store);
    expect(component.find('.modal').hasClass('is-open')).toBe(true);

    component.find('.modal-close').simulate('click');
  });

  it('ClearRecurringConfirm clearAll equal to true should render without errors', () => {
    const store = mockStore({
      bookingInfo: fromJS({ data: bookingData })
    });
    const nextData = {
      base: {
        bookingIndex: -1,
        resourceIndex: -1
      },
      clear: {
        bookingIndex: 0,
        clearAll: true,
        resourceIndex: 1,
        visible: true
      }
    };
    const newProps = Object.assign({}, props, { recurring: fromJS(nextData) });

    const component = setup(newProps, store);
    component.find('input').at(0).simulate('click');
    component.find('.modal-footer button').at(1).simulate('click');
  });
});
