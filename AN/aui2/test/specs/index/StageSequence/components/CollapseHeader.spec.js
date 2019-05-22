import React from 'react';
import { mount } from 'enzyme';
import CollapseHeader from 'index/StageSequence/components/CollapseHeader';
import Associations from 'index/StageSequence/components/Associations';

const data = {
  associations: [],
  status: 'error'
};

const defaultProps = {
  isEnableDelete: true,
  data,
  onToggleClick: jest.fn()
};


describe('index/StageSequence/components/CollapseHeader', () => {
  test('CollapseHeader works correctly', () => {
    const deleteStageSequence = jest.fn();

    const component = mount(<CollapseHeader {...defaultProps} deleteStageSequence={deleteStageSequence} />);
    expect(component.find('.stage-collapse-header')).toHaveLength(1);
    expect(component.find(Associations)).toHaveLength(1);
    component.find('.icon-chevron-down').simulate('click');
    expect(defaultProps.onToggleClick).toHaveBeenCalled();
    component.find('.icon-delete-m').simulate('click');
    expect(deleteStageSequence).toHaveBeenCalled();
  });

  test('CollapseHeader isEnableDelete is false works correctly', () => {
    const props = {
      ...defaultProps,
      isEnableDelete: false
    };
    const deleteStageSequence = jest.fn();
    const component = mount(<CollapseHeader {...props} deleteStageSequence={deleteStageSequence} />);
    component.find('.icon-delete-m').simulate('click');
    expect(component.find('.icon-delete-m').hasClass('icon--disabled')).toBeTruthy();
    expect(deleteStageSequence).not.toHaveBeenCalled();
  });
});
