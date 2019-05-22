/**
 * todo: refactor dependency resolver inside karma.conf.js
 * so we can properly resolve linting errors that occur when
 * importing from json/** directory
 */

/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/no-unresolved */

import React from 'react';
import { mount } from 'enzyme';
import { fromJS } from 'immutable';
import merge from 'lodash/merge';
import FacilityItem from 'shared/components/PermitFee/FacilityItem';
import FacilityItemDetail from 'shared/components/PermitFee/FacilityItemDetail';

const props = {
  key: 'facility_11_schedule_0',
  facilityKey: 'facility_0_schedule_0',
  facilityID: 11,
  transactionID: 123,
  scheduleFee: {
    facilityScheduleId: 23523,
    masterFacilityScheduleId: 0,
    facilitySchedule: {
      startDate: "14 Feb 2017",
      startTime: "4:00 AM",
      endDate: "14 Feb 2017",
      endTime: "5:00 AM"
    },
    scheduleAmount: 0,
    facilityCharges: [{
      facilityChargeId: 5,
      chargeName: "FaciltiyPer hour",
      quantity: 1,
      unitFee: 20,
      abbrevUnitOfMeasure: "/ hr",
      amount: 16.66,
      permitId: 0,
      receiptDetailId: 0,
      facilityScheduleId: 23524,
      isPercentageDiscount: false,
      applicableToAllBookings: true
    }]
  },
  feeActionStatus: {
    allowAddFee: true,
    allowEditFee: false,
    allowDeleteFee: false
  },
  newEntryID: 0
};

function setup(_props = props) {
  const actions = {
    fetchPermitFee: jest.fn(),
    permitDetailsChanged: jest.fn(),
    showWaringAlert: jest.fn()
  };

  const component = mount(
    <FacilityItem {..._props} {...actions}></FacilityItem>
  );

  return {
    component,
    recurringList: component.find('.recurring-list'),
    recurringDateTime: component.find('.recurring-datetime'),
    facilityChargeReviewIcon: component.find('.icon-chevron-down'),
    addFeeIcon: component.find('.icon-plus'),
    actions
  };
}

describe('shared/components/PermitFee/FacilityItemDetail', function () {
  it('should not be able to edit and delete fee and the fee detail show correctly', function () {
    let {
      recurringList,
      recurringDateTime,
      facilityChargeReviewIcon,
      addFeeIcon,
      actions,
      component
    } = setup();

    expect(recurringList.length).toEqual(0);
    expect(recurringDateTime.length).toEqual(0);
    expect(facilityChargeReviewIcon.length).toEqual(1);
    facilityChargeReviewIcon.simulate('click');
    expect(addFeeIcon.length).toEqual(1);
    addFeeIcon.simulate('click');
    __feeAddNewCharge();
    expect(actions.fetchPermitFee).toHaveBeenCalled();
    expect(actions.permitDetailsChanged).toHaveBeenCalled();
    component.unmount();
  });

  it('should render correctly if start and end is not same day',function() {
    let {
      recurringList,
      recurringDateTime,
      facilityChargeReviewIcon,
      addFeeIcon,
      actions,
      component
    } = setup({
      ...props,
      fetchPermitFee: jest.fn(),
      scheduleFee: {
        facilityScheduleId: 23523,
        masterFacilityScheduleId: 0,
        facilitySchedule: {
          startDate: "14 Feb 2017",
          startTime: "4:00 AM",
          endDate: "16 Feb 2017",
          endTime: "5:00 AM"
        },
        scheduleAmount: 0,
        facilityCharges: [{
          facilityChargeId: 5,
          chargeName: "FaciltiyPer hour",
          quantity: 1,
          unitFee: 10,
          abbrevUnitOfMeasure: "/ hr",
          amount: 250,
          permitId: 1,
          receiptDetailId: 1,
          facilityScheduleId: 23524,
          isPercentageDiscount: false
        }]
      }
    });
    expect(component.find('.fee-padding-lef')).toBeDefined();
  });
  it('initShowButton should work fine',()=>{
    const applyToAllSpy = jest.fn();
    const { component } = setup(merge(props,{applyToAll: applyToAllSpy}));
    const _ins = component.instance();
    const charges1 = [{ applicableToAllBookings: true }];
    const result1 = _ins.initShowButton(charges1);
    expect(result1[0].showButton).toBeTruthy();

    const charges2 = [{ applicableToAllBookings: false }];
    const result2 = _ins.initShowButton(charges2);
    expect(result2[0].showButton).toBeUndefined();

    const charges3 = [{ applicableToAllBookings: true }, { applicableToAllBookings: false }];
    const result3 = _ins.initShowButton(charges3);
    expect(result3[0].showButton).toBeTruthy();
  });

  it('applyToAll should work fine',()=> {
    const applyToAllSpy = jest.fn(() => Promise.resolve({ payload: { body: { status: 'success' } } }));
    const { component } = setup(merge(props, {applyToAll: applyToAllSpy}));
    const facilityItemDetail = component.find(FacilityItemDetail);
    facilityItemDetail.prop('applyToAll')();
    expect(applyToAllSpy).toHaveBeenCalledWith(undefined,0,123);
  });
});

