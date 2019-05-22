import React from 'react';
import { mount } from 'enzyme';
import MessageBoard from 'src/components/MessageBoard';

const props = {
  autoEnable: false
};

const setup = initProps => mount(<MessageBoard {...initProps} />);
describe('MessageBoard Component', () => {
  let clock;
  beforeEach(() => {
    clock = jest.useFakeTimers();
  });

  afterEach(() => {
    clock.clearAllTimers();
  });

  it('MessageBoard if autoEnable equal to true  should render without errors', () => {
    const component = setup({});
    component.unmount();
  });

  it('MessageBoard should render without errors', () => {
    const component = setup(props);
    const message = {
      title: 'testMessagePad',
      type: 'error',
      details: ['out of memory', 'asfsdfsdf', 1]
    };
    component.instance().add(message);
    component.instance().add(message, {
      dismissable: true,
      noDuplicated: true
    });
    component.instance().add(message);
    component.instance()._add(message);
    component.instance()._clear();
    component.instance().clear('error');
    component.instance().clear();
    clock.runTimersToTime(0);
    component.instance().onClose();
    component.unmount();
  });
});
