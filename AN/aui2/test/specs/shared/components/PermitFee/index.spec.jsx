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
import { PermitFee } from 'shared/components/PermitFee';
import FacilityList from 'shared/components/PermitFee/FacilityList';

jest.mock('react-base-ui/lib/services/dialog', ()=>{
  return {
    confirm: jest.fn().mockReturnValue(Promise.resolve())
  }
});
const feeActionStatus = {
  allowAddFee: true,
  allowEditFee: true,
  allowDeleteFee: true,
  allowResetFees: true
};

const defaultProps = {
  permitFeeData: fromJS({
    dueNow: null,
    allFacilities: {},
    subTotal: 127.5,
    amountPaid: null,
    total: 170.53,
    eventFee: {
      eventID: 0,
      eventName: "adsaa",
      permitID: 0,
      resourceCount: 2,
      bookingCount: 3,
      eventFeeTotal: 127.5
    },
    refundAmount: null,
    facilityFees: [{
      facilityID: 36,
      transactionID: 0,
      facilityName: "Gym 1",
      scheduleFees: [{
        facilityScheduleID: 23523,
        masterFacilityScheduleID: 0,
        facilitySchedule: {
          startDate: "14 Feb 2017",
          startTime: "4:00 AM",
          endDate: "14 Feb 2017",
          endTime: "5:00 AM"
        },
        scheduleAmount: 0,
        facilityCharges: []
      }],
      additionalFees: {
        facilityScheduleID: 0,
        masterFacilityScheduleID: 0,
        facilitySchedule: null,
        scheduleAmount: 0,
        facilityCharges: []
      }
    }],
    taxes: [{
      name: "Tax8",
      amount: 12.75
    }],
    description: ""
  }),
  initialData: {
    batchID: '1111111',
    receiptID: '2222222',
    receiptEntryID: '3333333'
  },
  pagination: fromJS({
    paginations: fromJS([])
  })
}

function setup(props = defaultProps) {
  const actions = {
    permitDetailsChanged: jest.fn(),
    fetchPermitFee: jest.fn(),
    deletePermitFeeDetail: jest.fn(),
    resetFeeAsyncAction: jest.fn().mockReturnValue(Promise.resolve()),
    detectSameCharge: jest.fn().mockReturnValue(Promise.resolve({payload:{body:{status:'success'}}}))
  };

  const component = mount(
    <PermitFee {...props} {...actions}></PermitFee>
  );
  const instance = component.instance();

  return {
    component,
    facilityList: component.find('.facility-list'),
    taxes: component.find('.tax-label'),
    feeReset: component.find('.permit-fee__reset'),
    actions,
    instance
  };
}

describe('shared/components/PermitFee/FacilityList', function () {
  it('should render permit schedules correctly', function () {
    let {
      facilityList,
      taxes,
      actions,
      instance,
      feeReset,
      component
    } = setup();

    expect(facilityList.length).toEqual(1);
    expect(taxes.length).toEqual(1);
    expect(actions.fetchPermitFee).toHaveBeenCalled();
    instance.onConfirm();
    expect(actions.deletePermitFeeDetail).toHaveBeenCalled();
    expect(actions.permitDetailsChanged).toHaveBeenCalled();
    instance.showWaringAlert({});
    expect(feeReset.hasClass('disabled')).toBe(true);
    feeReset.simulate('click');
    expect(actions.resetFeeAsyncAction).not.toHaveBeenCalled();
    expect(actions.fetchPermitFee).toHaveBeenCalledTimes(1);
    component.setProps({
      ...defaultProps,
      permitFeeData: defaultProps.permitFeeData.set('feeActionStatus', feeActionStatus)
    });
    expect(feeReset.hasClass('disabled')).toBe(false);
    feeReset.simulate('click');
    expect(actions.resetFeeAsyncAction).toHaveBeenCalledTimes(1);
  });
  it('confirm should render and work fine',()=>{
    let {
      actions,
      component
    } = setup();
    const list = component.find(FacilityList);
    list.prop('showWaringAlert')({});
    expect(actions.detectSameCharge).toHaveBeenCalled();
  });
});
