import React from 'react';
import { mount } from 'enzyme';
import EmptyState from 'shared/components/EmptyState';
import NoStage from 'index/StageSequence/components/NoStage';
import AddButton from 'index/StageSequence/components/AddButton';

describe('index/StageSequence/components/NoStage', () => {
  test('NoStage works correctly', () => {
    const component = mount(<NoStage hasAddableStagesequence />);
    expect(component.find('.no-stage')).toHaveLength(1);
    expect(component.find(EmptyState)).toHaveLength(1);
    expect(component.find(AddButton)).toHaveLength(1);
  });

  test('NoStage hasAddableStagesequence is false works correctly', () => {
    const component = mount(<NoStage hasAddableStagesequence={false} />);
    expect(component.find('.no-stage')).toHaveLength(1);
    expect(component.find(EmptyState)).toHaveLength(1);
    expect(component.find(AddButton)).toHaveLength(0);
  });
});

