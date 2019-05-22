import React from 'react';
import { mount } from 'enzyme';
import StepItemForm from 'index/StageSequence/components/StepItemForm';
import TextArea from 'react-base-ui/lib/components/TextArea';

describe('index/StageSequence/components/StepItemForm', () => {
  test('StepItemForm works correctly', () => {
    const transactionStageseAsyncAction = jest.fn();

    const defaultProps = {
      stageItem: {
        comments: 'has components',
        status: 2
      },
      stageSequenceID: 2,
      transactionStageseAsyncAction
    };

    const component = mount(<StepItemForm {...defaultProps} />);
    expect(component.find('.step-item-form')).toHaveLength(1);
    const buttonList = component.find('button');
    expect(buttonList).toHaveLength(2);

    buttonList.at(0).simulate('click');
    buttonList.at(1).simulate('click');
    expect(transactionStageseAsyncAction).toHaveBeenCalledTimes(2);
  });

  test('StepItemForm reset button works correctly', () => {
    const transactionStageseAsyncAction = jest.fn();

    const defaultProps = {
      stageItem: {
        comments: '',
        status: 4
      },
      stageSequenceID: 2,
      transactionStageseAsyncAction
    };

    const component = mount(<StepItemForm {...defaultProps} />);
    const instance = component.instance();
    const buttonList = component.find('button');
    expect(buttonList).toHaveLength(1);
    buttonList.at(0).simulate('click');
    expect(transactionStageseAsyncAction).toHaveBeenCalled();

    component.setProps({ stageItem: { comments: 'has components' } });
    expect(instance.state.statusText).toEqual('has components');
  });

  test('StepItemForm statusText is null should works correctly', () => {
    const transactionStageseAsyncAction = jest.fn();
    const defaultProps = {
      stageItem: {
        comments: '',
        status: 2
      },
      stageSequenceID: 2,
      transactionStageseAsyncAction
    };

    const component = mount(<StepItemForm {...defaultProps} />);
    const instance = component.instance();

    const buttonList = component.find('button');
    expect(buttonList).toHaveLength(2);
    buttonList.at(0).simulate('click');
    expect(component.find('.step-item-form__error')).toHaveLength(1);
    expect(transactionStageseAsyncAction).not.toHaveBeenCalled();
    component.setProps({ stageItem: { comments: 'has components' } });
    component.setProps({ stageItem: { comments: 'has components' } });
    expect(instance.state.statusText).toEqual('has components');
    expect(component.find('.step-item-form__error')).toHaveLength(0);

    component.setProps({ stageItem: { comments: '' } });
    expect(instance.state.statusText).toEqual('');
    buttonList.at(0).simulate('click');

    component.find(TextArea).node.props.onChange({ target: { value: 'component' } });
    expect(component.find('.step-item-form__error')).toHaveLength(0);
  });
});

