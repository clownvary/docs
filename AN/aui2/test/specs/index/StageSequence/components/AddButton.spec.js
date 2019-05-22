import React from 'react';
import { mount } from 'enzyme';
import AddButton from 'index/StageSequence/components/AddButton';


describe('index/StageSequence/components/AddButton', () => {
  test('AddButton works correctly', () => {
    const props = {
      isEnableAdd: true,
      hasAddableStagesequence: true,
      loadAddAbleStageSequences: jest.fn()
    };

    const component = mount(<AddButton {...props} />);
    const linkButton = component.find('.header-section__add-link');
    expect(linkButton).toHaveLength(1);

    expect(linkButton.hasClass('icon--disabled')).toBeFalsy();
    linkButton.simulate('click');
    expect(props.loadAddAbleStageSequences).toHaveBeenCalled();
  });

  test('AddButton works correctly', () => {
    const props = {
      isEnableAdd: false,
      hasAddableStagesequence: true,
      loadAddAbleStageSequences: jest.fn()
    };

    const component = mount(<AddButton {...props} />);
    const linkButton = component.find('.header-section__add-link');
    expect(linkButton.hasClass('icon--disabled')).toBeTruthy();
    linkButton.simulate('click');
    expect(props.loadAddAbleStageSequences).not.toHaveBeenCalled();
  });
});

