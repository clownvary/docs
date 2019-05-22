import React from 'react';
import { mount } from 'enzyme';
import configureStore from 'redux-mock-store';
import moment from 'moment';
import DatePicker from 'react-base-ui/lib/components/DatePicker';
import InputDate from 'react-base-ui/lib/components/InputDate';
import Modal from 'react-base-ui/lib/components/Modal';
import Radio from 'react-base-ui/lib/components/Radio';
import Input from 'react-base-ui/lib/components/Input';
import Dropdown from 'react-base-ui/lib/components/Dropdown';
import { fromJS } from 'immutable';

jest.mock('index/Resource/actions/recurringPattern', () => ({
  setEnd: jest.fn(),
  setEndType: jest.fn(),
  clearError: jest.fn(),
  setFrequency: jest.fn(),
  setRecurringType: jest.fn(),
  setSelectedDates: jest.fn(),
  setMonthlyFrequencyType: jest.fn(),
  closeRecurringPatternModal: jest.fn(),
  generateRecurringBookings: jest.fn(() => Promise.resolve())
}))

import RecurringPatternModal from 'index/Resource/components/RecurringPatternModal';

const recurringPattern = {
  monthlyFrequencyType: 0,
  selectedDates: [1, 2, 3, 4, 5, 6],
  errors: ['errormsg1'],
  base: {
    booking: {
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
    },
    resource: {
      setupMinutes: 0,
      definedDateRange: [],
      resourceType: 0,
      resourceID: 3,
      rentalBlock: [{
          id: 2,
          name: '9:00 AM to 12:00 PM',
          selected: false,
          parent_id: 6,
          text: '9:00 AM to 12:00 PM',
          value: 2
        },
        {
          id: 3,
          name: '8:00 PM to 9:00 PM',
          selected: false,
          parent_id: 6,
          text: '8:00 PM to 9:00 PM',
          value: 3
        },
        {
          id: 5,
          name: '1:20 PM to 2:50 PM',
          selected: false,
          parent_id: 6,
          text: '1:20 PM to 2:50 PM',
          value: 5
        },
        {
          id: 7,
          name: '4:06 PM to 6:00 PM',
          selected: false,
          parent_id: 6,
          text: '4:06 PM to 6:00 PM',
          value: 7
        }
      ],
      bookingDetail: [{
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
      }],
      eventTypeID: 36,
      reservationPeriodUnit: 7,
      eventType: '\'South West Hub',
      prepCodeID: -1,
      resourceNumber: '',
      resourceName: 'kaely test human',
      cleanupMinutes: 0,
      eventTypes: [{
          id: 34,
          name: 'South West Hub',
          selected: false,
          text: 'South West Hub',
          value: 34
        },
        {
          id: 35,
          name: 'deserunt et',
          selected: false,
          text: 'deserunt et',
          value: 35
        }
      ]
    }
  },
  visible: true,
  endType: 0,
  types: [{
      value: 1,
      text: 'Daily',
      selected: true
    },
    {
      value: 2,
      text: 'Weekly',
      selected: false
    },
    {
      value: 3,
      text: 'Monthly',
      selected: false
    },
    {
      value: 4,
      text: 'On Selected Dates',
      selected: false
    }
  ],
  type: 1,
  end: {
    1: {
      0: 1,
      1: 2
    },
    2: {
      0: '',
      1: 2
    },
    3: {
      0: 1,
      1: 2
    }
  },
  frequency: {
    1: 1,
    2: 1,
    3: {
      0: 1,
      1: ''
    }
  }
};

const eventResourceData = [{
  setupMinutes: 0,
  isTemplate: true,
  definedDateRange: [{
      id: 3,
      name: '2016 Jun 01 to 2016 Jun 03',
      selected: false,
      parent_id: 4,
      text: '2016 Jun 01 to 2016 Jun 03',
      value: 3
    },
    {
      id: 9,
      name: '2016 Jun 05 to 2016 Jun 07',
      selected: false,
      parent_id: 1,
      text: '2016 Jun 05 to 2016 Jun 07',
      value: 9
    }
  ],
  resourceType: 0,
  resourceID: 2,
  rentalBlock: [

  ],
  bookingDetail: [{
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
  }],
  eventTypeID: 36,
  reservationPeriodUnit: 6,
  eventType: '\'South West Hub',
  prepCodeID: -1,
  resourceNumber: '',
  resourceName: 'kaely test equipment &amp;',
  cleanupMinutes: 0,
  eventTypes: [{
      id: 34,
      name: 'South West Hub',
      selected: false,
      text: 'South West Hub',
      value: 34
    },
    {
      id: 35,
      name: 'deserunt et',
      selected: false,
      text: 'deserunt et',
      value: 35
    }
  ]
}];

const props = {
  recurringPattern: fromJS(recurringPattern),
  bookingInfo: fromJS({
    data: {
      eventResource: eventResourceData
    }
  }),
  changeBodyScrollStyle: jest.fn(),
  initialData: {
    permitID: -1,
    eventID: 2,
    batchID: '1111111',
    receiptID: '2222222',
    receiptEntryID: '3333333'
  }
};

describe('index/Resource/components/RecurringPatternModal', () => {
  const setup = (initProps, store) => mount(<RecurringPatternModal {...initProps} />, { context: { store } });
  const mockStore = configureStore();

  it('The RecurringPatternModal should have bookingAssignment equal to 0 should render without errors', () => {
    const store = mockStore({ ...props });
    const component = setup(props, store);

    const warpInput = component.find(Input);
    const e = {
      target: {
        value: '23'
      }
    };
    warpInput.at(0).node.props.onChange(e);
    warpInput.at(0).node.props.onBlur(e);

    warpInput.at(1).node.props.onFocus(e);
    warpInput.at(1).node.props.onChange(e);
    warpInput.at(1).node.props.onChange({ target: { value: '1' } });
    warpInput.at(1).node.props.onChange({ target: { value: '0' } });

    const warpModal = component.find(Modal);
    const warpDropdown = component.find(Dropdown);
    warpModal.node.props.onClose();
    warpDropdown.at(0).node.props.onChange({ value: 1 });

    const warpRadio = component.find(Radio);
    warpRadio.node.props.onClick();

    warpRadio.at(0).node.props.onClick();
    warpRadio.at(1).node.props.onClick();

    const warpDatePicker = component.find(InputDate);
    warpDatePicker.node.props.onFocus();
    warpDatePicker.node.props.onValueChange({ value: moment() });

    const warpFooterButton = component.find('.modal-footer button');
    warpFooterButton.at(0).simulate('click');
  });

  it('componentWillReceiveProps should work', () => {
    const nextProps = { ...props, ...{ recurringPattern: fromJS({ ...recurringPattern }) } };
    const store = mockStore({ ...nextProps });

    const component = setup(nextProps, store);
    let newRecurringPattern = { recurringPattern: fromJS({...recurringPattern, visible: false }) };
    component.setProps(newRecurringPattern);
    expect(props.changeBodyScrollStyle).toHaveBeenCalledTimes(1);

    newRecurringPattern = { recurringPattern: fromJS({...recurringPattern, visible: true }) };
    component.setProps(newRecurringPattern);
    expect(props.changeBodyScrollStyle).toHaveBeenCalledTimes(2);
  });

  it('The RecurringPatternModal bookingAssignment equal to 2 should render without errors', () => {
    const nextRecurringPattern = { ...recurringPattern, ...{ type: 2, error: 'error msg' } };

    const nextProps = { ...props, ...{ recurringPattern: fromJS(nextRecurringPattern) } };
    const store = mockStore({ ...nextProps });

    const component = setup(nextProps, store);

    const warpInput = component.find(Input);
    const e = {
      target: {
        value: '1'
      }
    };

    warpInput.node.props.onChange(e);
    warpInput.node.props.onBlur(e);
    expect(component.find('.recurring-pattern__body').hasClass('error')).toBe(true);
  });

  it('The RecurringPatternModal bookingAssignment equal to 3 should render without errors', () => {
    const nextRecurringPattern = { ...recurringPattern, ...{ type: 3 } };
    const nextProps = { ...props, ...{ recurringPattern: fromJS(nextRecurringPattern) } };
    const store = mockStore({ ...nextProps });
    const component = setup(nextProps, store);

    const warpRadio = component.find(Radio);
    warpRadio.at(0).node.props.onClick();
    warpRadio.at(1).node.props.onClick();

    const warpInput = component.find(Input);
    warpInput.at(0).node.props.onFocus();

    const e = {
      target: {
        value: 'dd'
      }
    };
    warpInput.at(0).node.props.onChange(e);
    warpInput.at(0).node.props.onBlur(e);
    warpInput.at(1).node.props.onFocus();
    warpInput.at(1).node.props.onChange(e);
    warpInput.at(1).node.props.onBlur(e);
    expect(warpRadio.length).toEqual(4);

    const warpFooterButton = component.find('.modal-footer button');
    warpFooterButton.at(1).simulate('click');

    expect(component).toBeTruthy();
  });

  it('The RecurringPatternModal bookingAssignment equal to 1 should render without errors, if endType is "ByDate"', () => {
    const nextRecurringPattern = { ...recurringPattern, ...{ type: 1, endType: 1} };
    const nextProps = { ...props, ...{ recurringPattern: fromJS(nextRecurringPattern) } };
    const store = mockStore({ ...nextProps });
    const component = setup(nextProps, store);

    const warpRadio = component.find(Radio);
    warpRadio.at(0).node.props.onClick();
    warpRadio.at(1).node.props.onClick();

    const warpFooterButton = component.find('.modal-footer button');
    warpFooterButton.at(1).simulate('click');

    expect(component).toBeTruthy();
  });

  it('The RecurringPatternModal bookingAssignment equal to 4 should render without errors', () => {
    const nextRecurringPattern = {
      ...recurringPattern, ...{
        type: 4,
        base: {
          ...recurringPattern.base,
          booking: {
            ...recurringPattern.base.booking,
            attendance: 0,
            rentalBlockID: 0
          },
          resource: {
            ...recurringPattern.base.resource,
            reservationPeriodUnit: 1
          }
        }
      }
    };
    const nextProps = { ...props, ...{ recurringPattern: fromJS(nextRecurringPattern) } };
    const store = mockStore({ ...nextProps });

    const component = setup(nextProps, store);

    const warpNewDatePicker = component.find(DatePicker);
    warpNewDatePicker.node.props.onValueChange({ value: [3] });
    warpNewDatePicker.node.props.formatTextValue({ value: [3] });
    component.find('.dates-clear').simulate('click');

    expect(warpNewDatePicker.length).toEqual(1);
    const warpFooterButton = component.find('.modal-footer button');
    warpFooterButton.at(1).simulate('click');
  });

  it('The RecurringPatternModal bookingAssignment equal to 1 should render without errors', () => {
    const nextRecurringPattern = {
      ...recurringPattern, ...{
        type: 4,
        base: {
          ...recurringPattern.base,
          booking: {
            ...recurringPattern.base.booking,
            attendance: 0,
            rentalBlockID: 0
          },
          resource: {
            ...recurringPattern.base.resource,
            reservationPeriodUnit: 1
          }
        }
      }
    };
    const nextProps = { ...props, ...{ recurringPattern: fromJS(nextRecurringPattern) } };
    const store = mockStore({ ...nextProps });

    const component = setup(nextProps, store);

    const warpNewDatePicker = component.find(DatePicker);
    warpNewDatePicker.node.props.onValueChange({ value: [3] });
    warpNewDatePicker.node.props.formatTextValue({ value: [3] });
    component.find('.dates-clear').simulate('click');

    expect(warpNewDatePicker.length).toEqual(1);
    const warpFooterButton = component.find('.modal-footer button');
    warpFooterButton.at(1).simulate('click');
  });

  it('The RecurringPatternModal bookingAssignment equal to 4 and selectedDates equal null should render without errors',
    () => {
      const nextRecurringPattern = { ...recurringPattern, ...{ type: 4, selectedDates: [] } };
      const nextProps = { ...props, ...{ recurringPattern: fromJS(nextRecurringPattern) } };
      const store = mockStore({ ...nextProps });
      const component = setup(nextProps, store);
      expect(component.find(DatePicker).length).toEqual(1);
  });
});
