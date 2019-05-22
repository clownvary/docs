import React from 'react';
import { mount } from 'enzyme';
import StepItemTitle from 'index/StageSequence/components/StepItemTitle';
import StepItemForm from 'index/StageSequence/components/StepItemForm';

describe('index/StageSequence/components/StepItemTitle', () => {
  test('StepItemTitle show component works correctly', () => {
    const data = {
      comments: 'has component',
      stageName: 'test',
      approvalUserID: '1',
      status: 3
    };

    const defaultProps = {
      item: data,
      systemUserID: 2,
      isApproveAllStages: false
    };

    const component = mount(<StepItemTitle {...defaultProps} />);
    const instance = component.instance();
    component.find('.icon-sms').simulate('click');
    expect(instance.state.showComment).toBeTruthy();
    expect(component.find('.commment-button').hasClass('is-extend')).toBeTruthy();
    expect(component.find('.icon-email-wring').hasClass('is-hidden')).toBeTruthy();
    expect(component.find('.change-custom')).toHaveLength(0);
    expect(component.find(StepItemForm)).toHaveLength(0);
    component.unmount();
  });

  test('StepItemTitle show StepItemForm works correctly', () => {
    const data = {
      comments: 'has component',
      stageName: 'test',
      approvalUserID: 1,
      status: 2
    };

    const defaultProps = {
      item: data,
      isAddStatus: false,
      systemUserID: 1,
      isApproveAllStages: false
    };

    const component = mount(<StepItemTitle {...defaultProps} />);
    expect(component.find('.commment-button')).toHaveLength(0);
    expect(component.find(StepItemForm)).toHaveLength(1);
  });

  test('StepItemTitle show StepItemForm reset button works correctly', () => {
    const data = {
      comments: 'has component',
      stageName: 'test',
      approvalUserID: 1,
      status: 4
    };

    const defaultProps = {
      item: data,
      systemUserID: 1,
      isAddStatus: false,
      isApproveAllStages: false,
      permitStatus: 3,
      isNotSingleStage: true
    };

    const component = mount(<StepItemTitle {...defaultProps} />);
    expect(component.find('.commment-button')).toHaveLength(0);
    expect(component.find(StepItemForm)).toHaveLength(1);
    expect(component.find('.icon-stage-status')).toHaveLength(1);
  });

  test('StepItemTitle question icon works correctly', () => {
    const data = {
      comments: 'has component',
      stageName: 'test',
      approvalUserID: 1,
      status: 2,
      approvalUserName: 'test name'
    };

    const defaultProps = {
      item: data,
      systemUserID: 1,
      nowStepItemStatus: 'process',
      isApproveAllStages: false,
      permitStatus: 3,
      isChangeStageCustomer: true,
      isNotSingleStage: true
    };

    const component = mount(<StepItemTitle {...defaultProps} />);
    expect(component.find('.icon-question')).toHaveLength(1);
    expect(component.find('.process-stage-owner')).toHaveLength(1);
  });

  test('StepItemTitle change user should works correctly', () => {
    const data = {
      comments: 'has component',
      stageName: 'test',
      approvalUserID: 1,
      status: 2,
      approvalUserName: 'test name'
    };

    const defaultProps = {
      item: data,
      isChangeStageCustomer: false,
      systemUserID: 1,
      nowStepItemStatus: 'process',
      isApproveAllStages: false,
      permitStatus: 3,
      isNotSingleStage: true,
      changeStageUser: jest.fn()
    };

    const component = mount(<StepItemTitle {...defaultProps} />);
    component.find('.change-custom span').at(1).simulate('click');
    window.__searchUserList();
    expect(defaultProps.changeStageUser).not.toBeCalled();
    const instance = component.instance();
    instance.quickResReferenceId = { value: 1 };
    window.__searchUserList();
    expect(defaultProps.changeStageUser).toBeCalled();
  });

  test('StepItemTitle isShowChangeLink is false change user should works correctly', () => {
    const data = {
      comments: 'has component',
      stageName: 'test',
      approvalUserID: 1,
      status: 3,
      approvalUserName: 'test name'
    };

    const defaultProps = {
      item: data,
      isChangeStageCustomer: false,
      systemUserID: 1,
      nowStepItemStatus: 'process',
      isApproveAllStages: false,
      permitStatus: 3,
      isNotSingleStage: true,
      changeStageUser: jest.fn()
    };

    const component = mount(<StepItemTitle {...defaultProps} />);
    const instance = component.instance();
    instance.quickResReferenceId = { value: 1 };
    window.__searchUserList();
    expect(defaultProps.changeStageUser).not.toHaveBeenCalled();
  });
});

