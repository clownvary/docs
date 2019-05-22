import React from 'react';
import { mount } from 'enzyme';
import { fromJS } from 'immutable';
import AddStageItem from 'index/StageSequence/components/AddStageItem';
import Checkbox from 'react-base-ui/lib/components/Checkbox';

describe('index/StageSequence/components/AddStageItem', () => {
  test('AddStageItem works correctly', () => {
    const props = {
      stageItem: fromJS({
        checked: true,
        stageSequenceName: 'name',
        associations: []
      }),
      updateStageSequenceAsyncAction: jest.fn()
    };

    const component = mount(<AddStageItem {...props} />);
    expect(component.find('.add-stage-item')).toHaveLength(1);
    expect(component.find(Checkbox)).toHaveLength(1);
    expect(component.find('.custom-title')).toHaveLength(1);
    component.find('.add-stage-item').simulate('click');
    expect(props.updateStageSequenceAsyncAction).toHaveBeenCalled();
  });
});

