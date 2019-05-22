import React from 'react';
import { mount } from 'enzyme';
import Toasts, { Toast } from 'src/components/Toast';

const defaultProps = {
  prefixCls: 'test'

};

describe('Toasts Component', () => {
  it('Toasts render without errors', () => {
    const component = mount(<Toasts
      {...defaultProps} style={{}}
      zIndex={100}
      maxCount={5}
    />);
    const instance = component.instance();
    instance.add({ notice: 'test message', updateKey: '32' });
    const ToastComponent = component.find(Toast);
    expect(ToastComponent).toHaveLength(1);
    ToastComponent.node.props.onClose();
  });

  it('Toasts updateKey is null render without errors', () => {
    const component = mount(<Toasts
      {...defaultProps} style={{}}
      maxCount={5}
    />);
    const onClose = jest.fn();
    const instance = component.instance();
    instance.add({ notice: 'test message', key: '23', closable: true, onClose: () => instance.onClose({ onClose }) });
    const a = component.find('a');
    a.simulate('click');
    expect(onClose).toHaveBeenCalled();
  });

  it('Toasts create function should work fine', () => {
    Toasts.create({ container: document.body }).then((instance) => {
      instance.show();
      instance.show({ notice: 'test message', updateKey: '32' });
      instance.hide('32');
      instance.clear();
    });
  });

  it('if noticeIndex !== -1 Toasts add function should work fine', () => {
    const component = mount(<Toasts
      {...defaultProps} style={{}}
      maxCount={5}
    />);
    const instance = component.instance();
    instance.add({ notice: 'test message', key: '1' });
    instance.add({ notice: 'test message', key: '1' });
    expect(instance.state).toEqual({ notices: [{ key: '1', notice: 'test message' }] });
  });

  it('if noticeIndex === -1 Toasts add function should work fine', () => {
    const component = mount(<Toasts
      {...defaultProps} style={{}}
      maxCount={1}
    />);
    const instance = component.instance();
    instance.add({ notice: 'test message', key: '1' });
    instance.add({ notice: 'test message', key: '2' });
    expect(instance.state).toEqual({ notices: [{ key: '2', notice: 'test message', updateKey: '1' }] });
  });
});
