import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';
import Choice from 'src/components/Select/SelectChoice';

describe('components/Select/SelectChoice', () => {
  it('component renders fine', () => {
    const props = {
      prefixCls: 'test-choice',
      last: true,
      text: 'mutli-select choice1',
      value: 'msc1'
    };
    const snapshot = renderer.create(<Choice {...props} />).toJSON();
    expect(snapshot).toMatchSnapshot();
  });

  it('component renders fine with customize choice renderer', () => {
    const props = {
      text: 'mutli-select choice2',
      value: 'msc2',
      choiceRenderer: choiceProps => (<div className="customize-choice">{choiceProps.text} {choiceProps.value}</div>)
    };
    const snapshot = renderer.create(<Choice {...props} />).toJSON();
    expect(snapshot).toMatchSnapshot();
  });

  it('component works fine', () => {
    const onChoiceRemove = jest.fn();
    const props = {
      prefixCls: 'test-choice',
      last: true,
      text: 'mutli-select choice3',
      value: 'msc3',
      onChoiceRemove
    };

    const component = mount(<Choice {...props} />);
    const instance = component.instance();

    instance.onChoiceRemove({ preventDefault: () => {}, stopPropagation: () => {} });
    expect(onChoiceRemove).toHaveBeenCalled();
  });
});
