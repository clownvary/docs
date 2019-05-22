import React from 'react';
import { mount } from 'enzyme';
import { fromJS } from 'immutable';
import moment from 'moment';
import DatePicker from 'react-base-ui/lib/components/InputDate';
import TimePicker from 'react-base-ui/lib/components/InputTime';
import Dropdown from 'react-base-ui/lib/components/Dropdown';
import InputNumeric from 'react-base-ui/lib/components/InputNumeric';
import BookingDetailItem from 'index/Resource/components/BookingInformation/BookingDetailItem';
import { Authority } from 'shared/authorities';

Authority.init();
Authority.is('test');
Authority.typeIn('test');

const item = {
  currentEvent: true,
  recurringExceptions: [],
  hasRecurring: true,
  baseBookingID: '',
  rentalBlockID: 7,
  recurringEnabled: true,
  ignoreConflict: false,
  startEventTime: '2:00 AM',
  bookingAssignment: 0,
  reservationType: 0,
  resourceBookingID: 0,
  startEventDate: '2016 Dec 21',
  pendingRemoveFromRecurringGroup: 'ds',
  attendance: 2,
  dateRangeID: 22,
  recurringReservationGroupID: 0,
  isDeleteSchedule: false,
  endEventTime: '3:00 AM',
  endEventDate: '2016 Dec 21',
  reservationPeriodUnit: 7,
  pendingID: 'pending_1424_4486',
  isRecurring: true,
  startEventDatetime: '12/21/2016 2:00 AM',
  ignoreClosetime: false,
  ownerPendingReceipt: true,
  masterFacilityScheduleID: null,
  transactionID: -1,
  expanded: false,
  endEventDatetime: '12/21/2016 3:00 AM',
  ignoreSkipdate: true
};

const resourceItem = {
  setupMinutes: 0,
  definedDateRange: [
    {
      id: 22,
      name: '2018 Oct 1 to 2018 Oct 2',
      selected: false
    },
    {
      id: 23,
      name: '2018 Oct 3 to 2018 Oct 6',
      selected: false
    },
    {
      id: 24,
      name: '2018 Oct 9 to 2018 Oct 11',
      selected: false
    }
  ],
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
      dateRangeID: 22,
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
  eventTypeID: 36,
  reservationPeriodUnit: 7,
  eventType: '\'South West Hub',
  prepCodeID: -1,
  resourceNumber: '',
  resourceName: 'kaely test human',
  cleanupMinutes: 0,
  eventTypes: [
    {
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
    },
    {
      id: 36,
      name: 'incididunt irure',
      selected: false,
      text: 'incididunt irure',
      value: 36
    },
    {
      id: 56,
      name: 'lillian_eventype',
      selected: false,
      text: 'lillian_eventype',
      value: 56
    }
  ]
};

const booking = {
  currentEvent: true,
  recurringExceptions: [],
  hasRecurring: false,
  baseBookingID: 'pending_775_7161',
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
  dateRangeID: 22,
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
};

const bookings = (bookingData = booking) => ([
  bookingData
]);

const errors = {
  conflict: '2323error',
  conflictReason: 'conflictReason error',
  conflictType: 'conflictType',
  datetime: '8:00 AM'
};

const initialData = { timeFormat: 'h:mm a' };

const props = {
  item: fromJS(item),
  resourceItem: fromJS(resourceItem),
  bookings: fromJS(bookings(booking)),
  updateBookingInfoDetail: jest.fn(),
  deleteBookingInfoDetail: jest.fn(),
  syncDataFromBookingInfoToCalendar: jest.fn(),
  setClearRecurring: jest.fn(),
  changeResoureInfoAutoFill: jest.fn(),
  startRecurringBooking: jest.fn(),
  overrideRentalBlockErrors: [],
  disableOverrideRentalBlock: true,
  resetOverrideRentalBlock: jest.fn(),
  setOverrideRentalBlock: jest.fn(),
  setOverrideRentalBlockError: jest.fn(),
  setEditingRentalBlock: jest.fn(),
  applyToAllRecurrings: jest.fn(),
  setBaseBookingApplyAbility: jest.fn(),
  initialData,
  resourceIndex:1,
  index:1
};

describe('index/resource/components/BookingInformation/BookingDetailItem', () => {
  const setup = initProps => mount(<BookingDetailItem {...initProps} />);

  it('BookingDetailItem should render without errors', () => {
    const component = setup(props);

    expect(component.find('div.weekday')).toHaveLength(1);

    const wrapDatePicker = component.find(DatePicker);
    wrapDatePicker.at(0).node.props.onFocus({ target: { value: 1 } });
    wrapDatePicker.at(0).node.props.onValueChange({ nativeDate: '2016 Dec 21' }, );
    wrapDatePicker.at(0).node.props.onValueChange({ value: moment() }, '2016 Dec 21');

    expect(props.updateBookingInfoDetail).toHaveBeenCalled();
    item.id = '111';
    const nextItem = { ...item, ...{ isDeleteSchedule: true, isRecurring: true, expanded: true } };
    const nextProps = {
      item: fromJS(nextItem),
      resourceItem: fromJS(resourceItem),
      errors: { ...errors, ...{ conflictIgnoreEnable: true } },
      bookingApplyAbility: fromJS({
        111: true
      })
    };

    component.setProps(nextProps);
    expect(component.find('.detail-item').hasClass('u-hidden')).toBe(true);
    expect(component.find('.detail-item').hasClass('recurring')).toBe(true);
    component.find('.conflict-button a').simulate('click');
    const applyBtns = component.find('.apply-btn');
    expect(applyBtns.length).toBe(1);
    applyBtns.at(0).simulate('click');

    expect(props.applyToAllRecurrings).toHaveBeenCalled();

    const nextPropsOne = {
      item: fromJS(nextItem),
      resourceItem: fromJS(resourceItem),
      errors: { ...errors, ...{ conflictIgnoreEnable: false, conflict: '' } }
    };
    component.setProps(nextPropsOne);

    expect(component.find('.icon-conflict').hasClass('override-disable')).toBe(true);
    expect(component.find('.icon-conflict').hasClass('override')).toBe(true);
    component.find('.icon-close').simulate('click');
    expect(props.deleteBookingInfoDetail).toHaveBeenCalled();
  });


  it('BookingDetailItem should render without render apply button', () => {
    const item = {
      currentEvent: true,
      recurringExceptions: [],
      hasRecurring: true,
      baseBookingID: 'dsadsdsaas',
      rentalBlockID: 7,
      recurringEnabled: true,
      ignoreConflict: false,
      startEventTime: '2:00 AM',
      bookingAssignment: 0,
      reservationType: 0,
      resourceBookingID: 0,
      startEventDate: '2016 Dec 21',
      pendingRemoveFromRecurringGroup: 'ds',
      attendance: 2,
      dateRangeID: 22,
      recurringReservationGroupID: 0,
      isDeleteSchedule: false,
      endEventTime: '3:00 AM',
      endEventDate: '2016 Dec 21',
      reservationPeriodUnit: 7,
      pendingID: 'pending_1424_4486',
      isRecurring: true,
      startEventDatetime: '12/21/2016 2:00 AM',
      ignoreClosetime: false,
      ownerPendingReceipt: true,
      masterFacilityScheduleID: null,
      transactionID: -1,
      expanded: false,
      endEventDatetime: '12/21/2016 3:00 AM',
      ignoreSkipdate: true
    };
    const props = {
      item: fromJS(item),
      resourceItem: fromJS(resourceItem),
      bookings: fromJS(bookings(booking)),
      updateBookingInfoDetail: jest.fn(),
      deleteBookingInfoDetail: jest.fn(),
      syncDataFromBookingInfoToCalendar: jest.fn(),
      setClearRecurring: jest.fn(),
      changeResoureInfoAutoFill: jest.fn(),
      startRecurringBooking: jest.fn(),
      overrideRentalBlockErrors: [],
      disableOverrideRentalBlock: true,
      resetOverrideRentalBlock: jest.fn(),
      setOverrideRentalBlock: jest.fn(),
      setOverrideRentalBlockError: jest.fn(),
      setEditingRentalBlock: jest.fn(),
      setBaseBookingApplyAbility: jest.fn(),
      initialData,
      resourceIndex:1,
      index:1
    };
    const component = setup(props);

    expect(component.find('div.weekday')).toHaveLength(1);

    const wrapDatePicker = component.find(DatePicker);
    wrapDatePicker.at(0).node.props.onFocus({ target: { value: 1 } });
    wrapDatePicker.at(0).node.props.onValueChange({ nativeDate: '2016 Dec 21' }, );
    wrapDatePicker.at(0).node.props.onValueChange({ value: moment() }, '2016 Dec 21');

    expect(props.updateBookingInfoDetail).toHaveBeenCalled();

    const nextItem = { ...item, ...{ isDeleteSchedule: true, isRecurring: true, expanded: true } };
    const nextProps = {
      item: fromJS(nextItem),
      resourceItem: fromJS(resourceItem),
      errors: { ...errors, ...{ conflictIgnoreEnable: true } }
    };

    component.setProps(nextProps);
    expect(component.find('.detail-item').hasClass('u-hidden')).toBe(true);
    expect(component.find('.detail-item').hasClass('recurring')).toBe(true);
    component.find('.conflict-button a').simulate('click');

    const applyBtns = component.find('.apply-btn');
    expect(applyBtns.length).toBe(0);
  });

  it('The BookingDetailItem isRecurring,isRecurring,expanded equal to true should render without error', () => {
    const nextItem = { ...item, ...{ isDeleteSchedule: true, isRecurring: true, expanded: true } };
    const nextProps = {
      ...props,
      item: fromJS(nextItem),
      resourceItem: fromJS({ ...resourceItem, ...{ reservationPeriodUnit: '' } }),
      errors: { ...errors, ...{ conflictIgnoreEnable: true } }
    };

    const component = setup(nextProps);

    const e = {
      target: {
        value: 'ddd'
      }
    };

    const wrapDatePicker = component.find(DatePicker);
    wrapDatePicker.at(0).node.props.onFocus(e);
    wrapDatePicker.at(0).node.props.onValueChange({ value: moment() });

    const value = '8:00 AM';
    const wrapTimePicker = component.find(TimePicker);
    wrapTimePicker.at(0).node.props.onValueChange({ value: moment() });

    wrapDatePicker.at(1).node.props.onFocus(e);
    wrapDatePicker.at(1).node.props.onValueChange({ value: moment() });

    wrapTimePicker.at(1).node.props.onValueChange({ value: moment() });

    expect(props.updateBookingInfoDetail).toHaveBeenCalled();
    expect(component.find('.booking-item__qty')).toHaveLength(1);
  });

  it('The BookingDetailItem isRecurring,isRecurring,expanded equal to true should render well when endTIme is emariler than startTime', () => {
    let tempItem = item;
    tempItem.reservationPeriodUnit = 1;
    const nextItem = { ...tempItem, ...{ isDeleteSchedule: true, isRecurring: true, expanded: true } };
    const nextProps = {
      ...props,
      item: fromJS(nextItem),
      resourceItem: fromJS({ ...resourceItem, ...{ reservationPeriodUnit: '' } }),
      errors: { ...errors, ...{ conflictIgnoreEnable: true } },
      setBaseBookingApplyAbility: jest.fn()
    };

    const component = setup(nextProps);

    const e = {
      target: {
        value: 'ddd'
      }
    };

    const wrapDatePicker = component.find(DatePicker);
    wrapDatePicker.at(0).node.props.onFocus(e);
    wrapDatePicker.at(0).node.props.onValueChange({ value: moment() });

    const value = '8:00 AM';
    const wrapTimePicker = component.find(TimePicker);
    const inputTime0 = wrapTimePicker.at(0);
    inputTime0.node.props.onValueChange({ value: inputTime0.node.props.value });
    const inputTime1 = wrapTimePicker.at(1);
    inputTime1.node.props.onValueChange({ value: moment('2016-12-21T16:06:00.000') });
    inputTime1.node.props.onValueChange({ value: moment('8:00 AM') });

    wrapDatePicker.at(1).node.props.onValueChange({ nativeDate: moment('2016-12-17') });

    expect(props.updateBookingInfoDetail).toHaveBeenCalled();
  });

  it('render BookingDetailItem datetime equal to "" should render without error', () => {
    const nextItem = { ...item, ...{ isDeleteSchedule: true, isRecurring: true, expanded: true } };
    const nextProps = {
      ...props,
      item: fromJS(nextItem),
      resourceItem: fromJS({ ...resourceItem, ...{ reservationPeriodUnit: '' } }),
      errors: { ...errors, ...{ conflictIgnoreEnable: true, datetime: '', startDatetimeBigger: 'ddd' } }
    };

    const component = setup(nextProps);

    expect(component.find('.booking-item__date').at(0).hasClass('error-field')).toBe(true);
  });

  it('BookingDetailItem isRecurring equal to false and hasRecurring equal to true should render without error', () => {
    const nextItem = { ...item, ...{ pendingID: 'pending_775_7161', isDeleteSchedule: false, isRecurring: false, expanded: true, hasRecurring: true } };
    const bookingData = { ...booking, ...{ baseBookingID: 'pending_775_7161', isRecurring: true } };
    const bookingsData = bookings(bookingData);
    const nextProps = {
      ...props,
      item: fromJS(nextItem),
      resourceItem: fromJS({ ...resourceItem, ...{ reservationPeriodUnit: '' } }),
      bookings: fromJS(bookingsData),
      errors: { ...errors, ...{ conflictIgnoreEnable: true, datetime: '', attendance: 'dfd' } }
    };

    const component = setup(nextProps);

    component.find('.icon-close').at(0).simulate('click');

    expect(props.setClearRecurring).toHaveBeenCalled();
  });

  it('BookingDetailItem conflictIgnoreType equal to disable_for_conflict_permisson should render without error', () => {
    const nextItem = { ...item, ...{ isDeleteSchedule: true, isRecurring: false, expanded: true, hasRecurring: true } };
    const bookingData = { ...booking, ...{ isDeleteSchedule: false, isRecurring: true } };
    const bookingsData = bookings(bookingData);
    const nextProps = {
      ...props,
      item: fromJS(nextItem),
      bookings: fromJS(bookingsData),
      resourceItem: fromJS(resourceItem),
      errors: { ...errors, ...{ conflictIgnoreEnable: false, conflictIgnoreType: 'disable_for_conflict_permisson' } }
    };

    const component = setup(nextProps);

    const wrapDropdown = component.find(Dropdown);
    wrapDropdown.at(0).node.props.onChange({}, { value: 'd' });
    component.find('.icon-repeat-m').at(0).simulate('click');

    const nextErrors = { ...errors, ...{ conflictIgnoreEnable: false, conflictIgnoreType: 'disable_for_closetime_permisson', conflict: '' } };

    const nextPropsOne = { ...nextProps, ...{ errors: nextErrors } };
    component.setProps(nextPropsOne);
    component.find('.icon-repeat-m').at(0).simulate('click');

    const nextErrorsTwo = { ...errors, ...{ conflictIgnoreEnable: false, conflictIgnoreType: 'disable_for_conflict_permisson_and_facility_setting' } };
    const nextPropTwo = { ...nextProps, ...{ errors: nextErrorsTwo } };
    component.setProps(nextPropTwo);

    const nextErrorsThree = { ...errors, ...{ conflictIgnoreEnable: false, conflictIgnoreType: '333' } };
    const nextPropThree = { ...nextProps, ...{ errors: nextErrorsThree } };
    component.setProps(nextPropThree);
  });


  it('BookingDetailItem reservationPeriodUnit equal to 6 should render without error', () => {
    const nextItem = { ...item, ...{ isDeleteSchedule: true, isRecurring: true, expanded: true } };
    const nextProps = {
      ...props,
      item: fromJS(nextItem),
      resourceItem: fromJS({ ...resourceItem, ...{ reservationPeriodUnit: 6 } }),
      errors: { ...errors, ...{ conflictIgnoreEnable: true, datetime: '', attendance: 'attendance', startDatetimeBigger: 'ddd' } }
    };

    const component = setup(nextProps);
    const wrapDropdown = component.find(Dropdown);
    wrapDropdown.at(0).node.props.onChange({}, { value: 23 });

    expect(props.updateBookingInfoDetail).toHaveBeenCalled();
  });

  it('BookingDetailItem render rental block without errors', () => {
    const nextItem = { ...item, ...{ isDeleteSchedule: true, isRecurring: true, expanded: true }, isRentalBlockOverride: false };
    const nextProps = {
      ...props,
      item: fromJS(nextItem),
      resourceItem: fromJS({ ...resourceItem, ...{ reservationPeriodUnit: 7 } }),
      errors: { ...errors, ...{ conflictIgnoreEnable: true, datetime: '', attendance: 'attendance', startDatetimeBigger: 'ddd' } }
    };

    const component = setup(nextProps);
    const wrapDropdown = component.find(Dropdown);
    wrapDropdown.at(0).node.props.onChange({}, { value: 'd' });

    expect(props.updateBookingInfoDetail).toHaveBeenCalled();

    expect(component.find('i.icon-sign-m.disabled')).toHaveLength(1);
  });

  it('BookingDetailItem render override rental block without errors', () => {
    const overrideID = Date.now();
    const overrideRentalBlockItemProps = {
      isRentalBlockOverride: true,
      overrideRentalBlock: {
        id: overrideID,
        name: `${item.startEventTime} to ${item.endEventTime}`,
        selected: false
      },
      rentalBlockID: overrideID,
      isRecurring: true,
      pendingRemoveFromRecurringGroup: false
    };
    const nextItem = { ...item, ...{ isDeleteSchedule: true, isRecurring: true, expanded: true }, ...overrideRentalBlockItemProps };
    const nextProps = {
      ...props,
      disableOverrideRentalBlock: false,
      item: fromJS(nextItem),
      resourceItem: fromJS({ ...resourceItem, ...{ reservationPeriodUnit: 7 } }),
      errors: { ...errors, ...{ conflictIgnoreEnable: true, datetime: '', attendance: 'attendance', startDatetimeBigger: 'ddd' } }
    };

    const component = setup(nextProps);
    const instance = component.instance();
    expect(component.find('i.icon-sign-m.disabled')).toHaveLength(0);
    expect(component.find('i.icon-sign-m')).toHaveLength(1);

    const wrapDropdown = component.find(Dropdown);
    const options = wrapDropdown.find('li');
    expect(options).toHaveLength(5);
    expect(options.at(0).text()).toEqual(overrideRentalBlockItemProps.overrideRentalBlock.name);
    expect(instance.state.rentalBlockEditMode).toBeFalsy();

    component.find('i.icon-sign-m').simulate('click');
    expect(instance.state.rentalBlockEditMode).toBeTruthy();
    expect(component.find('i.icon-check-thin')).toHaveLength(1);
    expect(component.find('i.icon-close-thin')).toHaveLength(1);

    let timeInputs = component.find(TimePicker);
    expect(timeInputs).toHaveLength(2);
    timeInputs.nodes[0].value = moment('2016-12-21T16:00:00.000');
    timeInputs.nodes[1].props.onValueChange();
    expect(props.resetOverrideRentalBlock).toHaveBeenCalled();
    expect(props.setBaseBookingApplyAbility).toHaveBeenCalled();
    component.find('i.icon-check-thin').simulate('click');
    expect(props.setOverrideRentalBlockError).toHaveBeenCalled();
    expect(props.setOverrideRentalBlock).not.toHaveBeenCalled();

    timeInputs.nodes[1].value = moment('2016-12-21T18:00:00.000');
    component.find('i.icon-check-thin').simulate('click');
    expect(props.setOverrideRentalBlock).toHaveBeenCalled();
    expect(instance.state.rentalBlockEditMode).toBeFalsy();

    component.find('i.icon-sign-m').simulate('click');
    timeInputs = component.find(TimePicker);
    timeInputs.nodes[0].value = moment('2016-12-21T16:06:00.000');
    timeInputs.nodes[1].value = moment('2016-12-21T18:00:00.000');
    component.find('i.icon-check-thin').simulate('click');

    nextProps.overrideRentalBlockErrors = [ item.id ];
    component.setProps(nextProps);
    component.find('i.icon-sign-m').simulate('click');
    expect(component.find('.error-field')).toHaveLength(5);
    component.find('i.icon-close-thin').simulate('click');
  });

  it("onAttendanceChange should be called when change attendance's value",()=>{
    const tempProps = props;
    tempProps.resourceItem = fromJS(Object.assign(resourceItem, {
      reservationPeriodUnit: 0
    }));
   const component = setup(tempProps);
   const onAttendanceChangeSpy = jest.spyOn(component.instance(),'onAttendanceChange');
   const wrapInputNumeric = component.find(InputNumeric);
   const args = {"bookingIndex": 1, "key": "attendance", "resourceIndex": 1, "value": 3};
   wrapInputNumeric.at(0).node.props.onBlur({ value: 3,text:3});
   expect(onAttendanceChangeSpy).toHaveBeenCalledWith(1,1,3);
   expect(props.updateBookingInfoDetail).toHaveBeenCalledWith(args);
   expect(props.changeResoureInfoAutoFill).toHaveBeenCalledWith(args);
  });

  it('BookingDetailItem has advancedError should render without errors', () => {
    Authority.init([
      {
        authorityType:"enabled",
        id:"overrideMaxAdvancedSetting",
        name: "Override Maximum Advanced Reservation Setting"
      },
      {
        authorityType:"enabled",
        id:"overrideMinAdvancedSetting",
        name: "Override Minimum Advanced Reservation Setting"
      }
    ]);
    const component = setup({
      ...props,
      errors: {
        advancedError: true,
        advancedType: 'over_advance_maximum',
        advancedReason: 'edmund test bug cannot be booked more than 3 day(s) in advance.',
        isOverrideAdvance: false
      }
    });

    component.find('.advanced-button a').simulate('click');
    expect(props.updateBookingInfoDetail).toHaveBeenCalled();

    component.setProps({ errors: {
      advancedError: true,
      advancedType: 'below_advance_minimum',
      advancedReason: 'edmund test bug must be booked at least 1 day(s) in advance.',
      isOverrideAdvance: false
    }})

    component.find('.advanced-button a').simulate('click');
    expect(props.updateBookingInfoDetail).toHaveBeenCalled();
  });

  it('BookingDetailItem has advancedError and no permission should render without errors', () => {
    Authority.init([
      {
        authorityType:"disabled",
        id:"overrideMaxAdvancedSetting",
        name: "Override Maximum Advanced Reservation Setting"
      },
      {
        authorityType:"disabled",
        id:"overrideMinAdvancedSetting",
        name: "Override Minimum Advanced Reservation Setting"
      }
    ]);
    const component = setup({
      ...props,
      errors: {
        advancedError: true,
        advancedType: 'over_advance_maximum',
        advancedReason: 'edmund test bug cannot be booked more than 3 day(s) in advance.',
        isOverrideAdvance: false
      }
    });

    component.find('.advanced-button a').simulate('click');
  });

  describe('updateQunatityInfo method:',()=>{
    it('Change date or time should not trigger updateQunatityInfo method\'s logic when resourceType is not equipment',()=>{
     const component = setup(props);
     const updateQuantityInfoSpy = jest.spyOn(component.instance(),'updateQuantityInfo');
     const wrapDatePicker = component.find(DatePicker);
     const args = {"bookingIndex": 1, "key": "attendance", "resourceIndex": 1, "value": 2};
      wrapDatePicker.at(0).node.props.onFocus({ target: { value: 1 } });
      wrapDatePicker.at(0).node.props.onValueChange({ nativeDate: '2016 Dec 21' }, );
      wrapDatePicker.at(0).node.props.onValueChange({ value: moment() }, '2016 Dec 21');

      expect(updateQuantityInfoSpy).toHaveBeenCalledWith(1,1);
      expect(props.updateBookingInfoDetail).not.toHaveBeenCalledWith(args);
      expect(props.changeResoureInfoAutoFill).not.toHaveBeenCalledWith(args);
    });
    it('Change date or time should trigger updateQunatityInfo method\'s logic when resourceType is equipment',()=>{
      const tempProps = props;
      tempProps.resourceItem = fromJS(Object.assign(resourceItem, {
        resourceType: 1,
        reservationPeriodUnit: 0
      }));
     const component = setup(tempProps);
     const updateQuantityInfoSpy = jest.spyOn(component.instance(),'updateQuantityInfo');
     const wrapDatePicker = component.find(DatePicker);
     const args = {"bookingIndex": 1, "key": "attendance", "resourceIndex": 1, "value": 2};
      wrapDatePicker.at(0).node.props.onFocus({ target: { value: 1 } });
      wrapDatePicker.at(0).node.props.onValueChange({ nativeDate: '2016 Dec 21' }, );
      wrapDatePicker.at(0).node.props.onValueChange({ value: moment() }, '2016 Dec 21');

      expect(updateQuantityInfoSpy).toHaveBeenCalledWith(1,1);
      expect(props.updateBookingInfoDetail).toHaveBeenCalledWith(args);
      expect(props.changeResoureInfoAutoFill).toHaveBeenCalledWith(args);
    });
  });
});
