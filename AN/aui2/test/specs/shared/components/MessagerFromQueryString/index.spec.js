import React from 'react';
import { mount } from 'enzyme';
import Alert from 'react-base-ui/lib/components/Alert';
import Messager from 'shared/components/MessagerFromQueryString';

const props = {
  isDisplay: true
};

describe('shared/components/MessagerFromQueryString', () => {
  test('component and initialization works fine 1', () => {
    Object.defineProperty(location, 'search', {
      writable: true,
      value: 'message_code'
    })

    window.location.search = '';
    const component = mount(<Messager {...props} />);
    expect(component).toHaveLength(1);
    expect(component.find(Alert)).toHaveLength(0);

    window.location.search = 'message_code=1';
    component.setProps({
      isDisplay: false
    });
    expect(component.find(Alert)).toHaveLength(1);

    const msgAlert = component.find('Alert').at(0);
    expect(msgAlert.find('.close').length).toBe(1);

    msgAlert.node.props.onClose();
    expect(msgAlert.find('.close').length).toBe(0);
  });
});
