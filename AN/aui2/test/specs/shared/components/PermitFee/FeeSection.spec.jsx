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
import FeeSection from 'shared/components/PermitFee/FeeSection';
import FacilityList from 'shared/components/PermitFee/FacilityList';

jest.mock('react-base-ui/lib/services/dialog',()=>{
  return {
    confirm: jest.fn(()=>{
      return Promise.resolve();
    })
  }
});

const defaultProps = {
  newEntryID: 0,
  facilityFees: [{
    facilityID: 36,
    transactionID: 0,
    facilityName: 'Gym 1',
    scheduleFees: [{
      facilityScheduleID: 23523,
      masterFacilityScheduleID: 0,
      facilitySchedule: {
        startDate: '14 Feb 2017',
        startTime: '4:00 AM',
        endDate: '14 Feb 2017',
        endTime: '5:00 AM'
      },
      scheduleAmount: 0,
      facilityCharges: [],
      recurringScheduleFees: [{
        facilityScheduleID: 23524,
        masterFacilityScheduleID: 23523,
        facilitySchedule: {
          startDate: '14 Feb 2017',
          startTime: '4:00 AM',
          endDate: '14 Feb 2017',
          endTime: '5:00 AM'
        },
        scheduleAmount: -10,
        facilityCharges: []
      }]
    }],
    additionalFees: {
      facilityScheduleID: 0,
      masterFacilityScheduleID: 0,
      facilitySchedule: null,
      scheduleAmount: 0,
      facilityCharges: []
    }
  }],
  addChargeAuth: false,
  deleteChargeAuth: false,
  editChargeAuth: false,
  feeActionStatus: {
    allowAddFee: false,
    allowDeleteFee: false,
    allowEditFee: false
  },
  allowResetFees: false,
  pagination: fromJS({
    paginations: fromJS([])
  })
};

function setup(props = defaultProps) {
  const actions = {
    fetchPermitFee: jest.fn(),
    permitDetailsChanged: jest.fn(),
    detectSameCharge: jest.fn(()=>{
      return new Promise((resolve, reject) => {
        resolve({payload:{body:{has_same_charge:true}}});
      })
    }),
    deleteReservationFeeDetail: () => {
      return new Promise((resolve, reject) => {
        resolve();
      })
    },
    resetFeeAsyncAction: jest.fn().mockReturnValue(Promise.resolve())
  };

  actions.deleteReservationFeeDetail.then = (callback) => {callback()};

  const component = mount(
    <FeeSection {...props} {...actions}></FeeSection>
  );

  const instance = component.instance();

  return {
    component,
    instance,
    facilityList: component.find('.facility-list'),
    actions,
    feeReset: component.find('.permit-fee__reset')
  };
}

describe('shared/components/PermitFee/FeeSection', function () {
  it('should not be able to edit and delete fee and the fee detail show correctly', function () {
    let {
      component,
      facilityList,
      actions,
      feeReset
    } = setup();

    expect(facilityList.length).toEqual(1);
    expect(feeReset.hasClass('disabled')).toBe(true);
    feeReset.simulate('click');
    expect(actions.resetFeeAsyncAction).not.toHaveBeenCalled();
    component.setProps({
      allowResetFees: true
    });
    expect(feeReset.hasClass('disabled')).toBe(false);
    feeReset.simulate('click');
    expect(actions.resetFeeAsyncAction).toHaveBeenCalledTimes(1);
  });
  it('showWaringAlert should be triggered correctly', () => {
    const { component, actions } = setup();
    const params = {
        facilityID:36,
        facilityChargeID: 23523,
        transactionID:0,
        receiptDetailID:1,
        newEntryID:0,
        batchID:0,
        receiptID:0,
        permitID:0,
        eventID:0,
        eventIndex:0
    }
    const calledParams =  {
      batch_id: params.batchID,
      receipt_id: params.receiptID,
      permit_id: params.permitID,
      transaction_id: params.transactionID,
      receipt_detail_id: params.receiptDetailID,
      facility_id: params.facilityID,
      facility_charge_id: params.facilityChargeID,
      new_entry_id: params.newEntryID
    };
    const facilityList = component.find(FacilityList);
    facilityList.prop('showWaringAlert')(params);
    expect(actions.detectSameCharge).toHaveBeenCalledWith(calledParams);
  });
});
