import React from 'react';
import { mount } from 'enzyme';
import { MessagePad } from 'src/components/MessageBoard';
import Alert from 'src/components/Alert/Alert';

const props = {
  message: {
    title: 'testMessagePad',

    details: ['out of memory', 'asfsdfsdf', 1]
  },
  summary: '',
  onClose: jest.fn()
};

const setup = initProps => mount(<MessagePad {...initProps} />);
describe('MessagePad Component', () => {
  it('MessagePad should render without errors', () => {
    const component = setup(props);

    expect(component).toBeTruthy();
    expect(component.find('.message-pad')).toHaveLength(1);
    expect(component.find('.title')).toHaveLength(1);
    expect(component.find('li')).toHaveLength(3);
    component.find(Alert).node.props.onClose();

    const nextProps = {
      message: {
        id: 'idtest',
        type: 'error',
        details: ['out of memory']
      },
      onClose: jest.fn()
    };
    component.setProps(nextProps);
    expect(component.find('.single-line')).toHaveLength(1);

    const nextPropsTwo = {
      message: {
        id: 'idtest',
        type: 'error'
      },
      onClose: jest.fn()
    };
    component.setProps(nextPropsTwo);
    expect(component.find('li')).toHaveLength(0);
  });
});
