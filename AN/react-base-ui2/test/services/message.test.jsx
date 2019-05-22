import React from 'react';
import { mount } from 'enzyme';
import toJSON from 'enzyme-to-json';
import Message from 'src/common/message/Message';
import MessageType from 'src/common/message/consts/MessageType';

import {
  configMessageService,
  showSuccess,
  showInfo,
  showWarning,
  showError,
  clearAll
} from 'src/services/message';

import MessageBoard from 'src/components/MessageBoard';

describe('services/message', () => {
  test('showMessage', () => {
    jest.useFakeTimers();
    const wrapper = mount(<MessageBoard />);

    configMessageService({ noDuplicated: true });

    showSuccess('test success');
    showInfo('test info');
    showWarning('test warning');
    showError(new Message(MessageType.ERROR, 'test error', 'error'));

    jest.runAllTimers();
    expect(toJSON(wrapper)).toMatchSnapshot();

    clearAll('test success');
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
